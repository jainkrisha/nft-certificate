"use client";

import { useCallback, useState } from "react";
import { createContext, useContext } from "react";
import { BrowserProvider, formatEther } from "ethers";
import { sendGaslessTx, buildTxObject, encodeSafeMint, type GaslessTxResult } from "@/lib/ugf";
import type { ToastMessage } from "./Toast";

/* ══ Ambient type augmentation ════════════════════════════════════════ */
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      isMetaMask?: boolean;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
    };
  }
}

/* ══ Base Sepolia chain config (also in lib/ugf.ts, kept here for the alert) ══ */
const BASE_SEPOLIA_HEX = "0x14a34"; // 84532

/* ══ Wallet context types ═════════════════════════════════════════════ */
type WalletContextType = {
  address: string | null;
  isConnecting: boolean;
  balance: string | null;
  wrongNetwork: boolean;
  txPending: boolean;
  lastTxHash: string | null;
  toasts: ToastMessage[];
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: () => Promise<void>;
  /**
   * Send a gasless transaction to an arbitrary destination.
   * @param onHash — optional callback fired with the on-chain hash once confirmed
   */
  sendGaslessTx: (params: {
    to: string;
    data: string;
    value?: string;
    onHash?: (hash: string) => void;
  }) => Promise<void>;
  /**
   * Trigger the full UGF lifecycle to mint the connected wallet's certificate NFT.
   * Requires `NEXT_PUBLIC_CERTIFICATE_CONTRACT_ADDRESS` to be set in the environment.
   * @param onHash — optional callback fired with the on-chain hash once confirmed
   */
  claimCertificate: (onHash?: (hash: string) => void) => Promise<void>;
  removeToast: (id: string) => void;
};

const WalletContext = createContext<WalletContextType | null>(null);

/* ══ Provider ════════════════════════════════════════════════════════════ */
export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [txPending, setTxPending] = useState(false);
  const [lastTxHash, setLastTxHash] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  /* ── Toast helpers ────────────────────────────────────────────────── */
  const addToast = useCallback((message: string, type: "success" | "error" | "info" = "info", duration = 5000) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /* ── Balance ───────────────────────────────────────────────────────── */
  const fetchBalance = useCallback(async (addr: string) => {
    if (!window.ethereum) return;
    const provider = new BrowserProvider(window.ethereum);
    const rawBalance = await provider.getBalance(addr);
    setBalance(formatEther(rawBalance));
  }, []);

  /* ── Network check ─────────────────────────────────────────────────── */
  const checkNetwork = useCallback(async (): Promise<boolean> => {
    if (!window.ethereum) return false;
    const chainIdHex: string = (await window.ethereum.request({ method: "eth_chainId" })) as string;
    const isCorrect = parseInt(chainIdHex, 16) === 84532;
    setWrongNetwork(!isCorrect);
    return isCorrect;
  }, []);

  /* ── Network switch ────────────────────────────────────────────────── */
  const switchNetwork = useCallback(async () => {
    if (!window.ethereum) return;
    const eth = window.ethereum as { request: (args: { method: string; params: unknown[] }) => Promise<unknown> };

    try {
      await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: BASE_SEPOLIA_HEX }] });
      setWrongNetwork(false);
      if (address) await fetchBalance(address);
    } catch {
      /* Chain not added yet — try to add it */
      try {
        await eth.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: BASE_SEPOLIA_HEX,
            chainName: "Base Sepolia",
            nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
            rpcUrls: ["https://sepolia.base.org"],
            blockExplorerUrls: ["https://sepolia.basescan.org"],
          }],
        });
        setWrongNetwork(false);
        if (address) await fetchBalance(address);
      } catch (addErr) {
        console.error("Failed to add Base Sepolia network:", addErr);
      }
    }
  }, [address, fetchBalance]);

  /* ── Accounts listener ─────────────────────────────────────────────── */
  const handleAccountsChanged = useCallback(async () => {
    if (address) {
      const correct = await checkNetwork();
      if (!correct) { setWrongNetwork(true); return; }
      await fetchBalance(address);
    }
  }, [address, checkNetwork, fetchBalance]);

  /* ── Connect ───────────────────────────────────────────────────────── */
  const connect = useCallback(async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it to continue.");
      return;
    }

    try {
      setIsConnecting(true);
      const provider = new BrowserProvider(window.ethereum);
      (window.ethereum as { on?: (ev: string, cb: (...a: unknown[]) => void) => void }).on?.(
        "accountsChanged", handleAccountsChanged,
      );
      const accounts: string[] = (await provider.send("eth_requestAccounts", [])) as string[];
      if (accounts.length === 0) return;
      setAddress(accounts[0]);
      const correct = await checkNetwork();
      if (correct) { await fetchBalance(accounts[0]); }
      else { await switchNetwork().catch(() => setWrongNetwork(true)); }
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      addToast("Failed to connect wallet", "error");
    } finally {
      setIsConnecting(false);
    }
  }, [checkNetwork, fetchBalance, handleAccountsChanged, switchNetwork, addToast]);

  /* ── Disconnect ────────────────────────────────────────────────────── */
  const disconnect = useCallback(() => {
    setAddress(null);
    setBalance(null);
    setWrongNetwork(false);
    setLastTxHash(null);
    (window.ethereum as { removeListener?: (ev: string, cb: (...a: unknown[]) => void) => void })
      .removeListener?.("accountsChanged", handleAccountsChanged);
  }, [handleAccountsChanged]);

  /* ── Gasless transaction (explicit user action) ────────────────────── */
  const sendGaslessTxWrapped = useCallback(async ({
    to,
    data,
    value = "0",
    onHash,
  }: {
    to: string;
    data: string;
    value?: string;
    onHash?: (hash: string) => void;
  }) => {
    try {
      if (!wrongNetwork) { await checkNetwork(); }
      if (wrongNetwork) { throw new Error("Please switch to Base Sepolia before sending a gasless transaction."); }
      if (!address)   { throw new Error("Connect your wallet first."); }

      setTxPending(true);
      const signer = await new BrowserProvider(window.ethereum!).getSigner();
      const txObjectJson = buildTxObject({ from: await signer.getAddress(), to, data, value });
      const result: GaslessTxResult = await sendGaslessTx({ signer, txObjectJson });
      setLastTxHash(result.userTxHash);
      onHash?.(result.userTxHash);
    } catch (err: any) {
      console.error("Failed to send gasless tx:", err);
      addToast(err.message || "Failed to send gasless tx", "error");
    } finally {
      setTxPending(false);
    }
  }, [address, wrongNetwork, checkNetwork, addToast]);

  /* ── Claim certificate as gasless NFT ──────────────────────────────── */
  const claimCertificate = useCallback(
    async (onHash?: (hash: string) => void) => {
      const contractAddress = process.env.NEXT_PUBLIC_CERTIFICATE_CONTRACT_ADDRESS;

      try {
        if (!address) throw new Error("Connect your wallet first.");
        if (!wrongNetwork) await checkNetwork();
        if (wrongNetwork) throw new Error("Please switch to Base Sepolia first.");
        if (!contractAddress) {
          throw new Error(
            "Certificate contract address is not configured yet. Ask the team to deploy and set NEXT_PUBLIC_CERTIFICATE_CONTRACT_ADDRESS.",
          );
        }

        setTxPending(true);
        const signer = await new BrowserProvider(window.ethereum!).getSigner();
        const signerAddress = await signer.getAddress();
        console.log("🎯 Claiming certificate for address:", signerAddress);
        console.log("📋 Contract address:", contractAddress);
        const calldata = encodeSafeMint(address as `0x${string}`);
        console.log("📝 Encoded calldata:", calldata);
        const txObjectJson = buildTxObject({
          from: signerAddress,
          to: contractAddress,
          data: calldata,
          value: "0",
        });
        console.log("📦 TX Object JSON:", txObjectJson);
        const result: GaslessTxResult = await sendGaslessTx({ signer, txObjectJson });
        setLastTxHash(result.userTxHash);
        addToast(`✨ Certificate successfully claimed! TX: ${result.userTxHash.slice(0, 10)}...`, "success", 7000);
        onHash?.(result.userTxHash);
      } catch (err: any) {
        console.error("Failed to claim certificate:", err);
        addToast(err.message || "Failed to claim certificate", "error");
      } finally {
        setTxPending(false);
      }
    },
    [address, wrongNetwork, checkNetwork, addToast],
  );


  /* ══ Hook return ══════════════════════════════════════════════════════ */
  return (
    <WalletContext.Provider
      value={{
        address,
        isConnecting,
        balance,
        wrongNetwork,
        txPending,
        lastTxHash,
        toasts,
        connect,
        disconnect,
        switchNetwork,
        sendGaslessTx: sendGaslessTxWrapped,
        claimCertificate,
        removeToast,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

/* ══ Hook ════════════════════════════════════════════════════════════════ */
export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within a WalletProvider");
  const { address } = ctx;
  return { ...ctx, truncatedAddress: address ? `${address.slice(0, 6)}…${address.slice(-4)}` : null };
}
