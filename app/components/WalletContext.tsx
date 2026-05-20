"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState, useCallback } from "react";
import { BrowserProvider, formatEther } from "ethers";

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

/* ══ Base Sepolia chain config ════════════════════════════════════════ */
const BASE_SEPOLIA = {
  chainId: "0x14a34", // 84532 in decimal
  chainName: "Base Sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: ["https://sepolia.base.org"],
  blockExplorerUrls: ["https://sepolia.basescan.org"],
} as const;

/* ══ Types ══════════════════════════════════════════════════════════════ */
type WalletContextType = {
  address: string | null;
  isConnecting: boolean;
  balance: string | null;
  wrongNetwork: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType | null>(null);

/* ══ Helpers ═════════════════════════════════════════════════════════════ */
function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/* ══ Provider ════════════════════════════════════════════════════════════ */
export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);
  const [wrongNetwork, setWrongNetwork] = useState(false);

  const fetchBalance = useCallback(async (addr: string) => {
    if (!window.ethereum) return;
    const provider = new BrowserProvider(window.ethereum);
    const rawBalance = await provider.getBalance(addr);
    setBalance(formatEther(rawBalance));
  }, []);

  /** Check whether the currently connected chain matches Base Sepolia. */
  const checkNetwork = useCallback(async (): Promise<boolean> => {
    if (!window.ethereum) return false;
    const chainIdHex: string = (await window.ethereum.request({
      method: "eth_chainId",
    })) as string;
    const isCorrect = parseInt(chainIdHex, 16) === 84532;
    setWrongNetwork(!isCorrect);
    return isCorrect;
  }, []);

  /** Prompt MetaMask to switch (or add) Base Sepolia. */
  const switchNetwork = useCallback(async () => {
    if (!window.ethereum) return;

    try {
      await (window.ethereum as { request: (args: { method: string; params: unknown[] }) => Promise<unknown> })
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: BASE_SEPOLIA.chainId }],
        });
      setWrongNetwork(false);
      // Refresh balance on the new network
      if (address) {
        void fetchBalance(address);
      }
    } catch {
      // Chain hasn't been added yet — add it, then switch
      try {
        await (window.ethereum as { request: (args: { method: string; params: unknown[] }) => Promise<unknown> })
          .request({
            method: "wallet_addEthereumChain",
            params: [BASE_SEPOLIA],
          });
        setWrongNetwork(false);
        if (address) {
          void fetchBalance(address);
        }
      } catch (addErr) {
        console.error("Failed to add Base Sepolia network:", addErr);
      }
    }
  }, [address, fetchBalance]);

  /** Re-check network on every accounts change event. */
  const handleAccountsChanged = useCallback(
    async () => {
      if (address) {
        const correct = await checkNetwork();
        if (!correct) {
          setWrongNetwork(true);
        } else {
          await fetchBalance(address);
        }
      }
    },
    [address, checkNetwork, fetchBalance],
  );

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it to continue.");
      return;
    }

    try {
      setIsConnecting(true);
      const provider = new BrowserProvider(window.ethereum);

      // Subscribe to account changes (guarded so listener is only added once)
      (window.ethereum as { on?: (event: string, cb: (...args: unknown[]) => void) => void }).on?.(
        "accountsChanged",
        handleAccountsChanged,
      );

      const accounts: string[] = (await provider.send("eth_requestAccounts", [])) as string[];
      if (accounts.length === 0) return;

      setAddress(accounts[0]);

      // Check network immediately after connection
      const correct = await checkNetwork();
      if (correct) {
        void fetchBalance(accounts[0]);
      } else {
        await switchNetwork().catch(() => {
          setWrongNetwork(true);
        });
      }
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    } finally {
      setIsConnecting(false);
    }
  }, [checkNetwork, fetchBalance, handleAccountsChanged, switchNetwork]);

  const disconnect = useCallback(() => {
    setAddress(null);
    setBalance(null);
    setWrongNetwork(false);
    (window.ethereum as { removeListener?: (event: string, cb: (...args: unknown[]) => void) => void }).removeListener?.(
      "accountsChanged",
      handleAccountsChanged,
    );
  }, [handleAccountsChanged]);

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnecting,
        balance,
        wrongNetwork,
        connect,
        disconnect,
        switchNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

/* ══ Hook ════════════════════════════════════════════════════════════════ */
export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  const { address } = ctx;
  return { ...ctx, truncatedAddress: address ? truncateAddress(address) : null };
}
