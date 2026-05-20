import { BrowserProvider, Signer } from "ethers";
import { BASE_SEPOLIA_CHAIN_ID, TYI_USD_PAYMENT_COIN, UGFClient, type QuoteResponse } from "@tychilabs/ugf-testnet-js";

/* ══ Gateway defaults ═══════════════════════════════════════════════════ */
const UGF_GATEWAY_URL = "https://api.ugf.tychilabs.com";

/* ══ Singleton UGF client ═══════════════════════════════════════════════ */
let _ugfClient: UGFClient | null = null;
function getClient(): UGFClient {
  if (!_ugfClient) _ugfClient = new UGFClient({ baseUrl: UGF_GATEWAY_URL });
  return _ugfClient;
}

/* ══ Re-exported constants ══════════════════════════════════════════════ */
export { BASE_SEPOLIA_CHAIN_ID, TYI_USD_PAYMENT_COIN };

/* ══ Types ═══════════════════════════════════════════════════════════════ */
export type GaslessTxResult = { userTxHash: string; digest: string };

export type CertificateMintRequest = {
  contractAddress: string;
  tokenId: string | bigint;
  to: string;
  data?: string;
};

/* ══ Helpers ══════════════════════════════════════════════════════════════ */

/** Encode `safeMint(address)` calldata. */
export function encodeSafeMint(toAddress: `0x${string}`): string {
  return "0x4e6ec247" + toAddress.replace(/^0x/, "").padStart(64, "0");
}

/** Build the `tx_object` JSON string UGF's `/quote` expects. */
export function buildTxObject(params: { from: string; to: string; data: string; value?: string }): string {
  return JSON.stringify({ from: params.from, to: params.to, data: params.data, value: params.value ?? "0" });
}

/** Signer backed by the injected MetaMask provider. */
export async function getInjectedSigner(): Promise<Signer> {
  if (!window.ethereum) throw new Error("No injected wallet found. Install MetaMask.");
  return new BrowserProvider(window.ethereum).getSigner();
}

/** Read the first connected address without triggering a MetaMask popup. */
export async function getConnectedAddress(): Promise<string> {
  if (!window.ethereum) throw new Error("No injected wallet found.");
  const accounts = await new BrowserProvider(window.ethereum).listAccounts();
  return (accounts[0] as { address: string }).address;
}

/** Authenticate signer with UGF — returns JWT. Safe to call repeatedly. */
export async function ugfAuthenticate(signer: Signer): Promise<string> {
  return getClient().auth.login(signer);
}

/**
 * Full UGF lifecycle: quote → settle (ERC-3009) → execute → tx hash.
 *
 * @throws Error normalised with `[UGF <code>]` prefix for stage-level diagnostics.
 */
export async function sendGaslessTx(params: {
  signer: Signer;
  txObjectJson: string;
  destChainId?: string;
  destChainType?: "evm";
  paymentCoin?: string;
}): Promise<GaslessTxResult> {
  const { signer, txObjectJson, destChainId, destChainType, paymentCoin } = params;
  const address = await signer.getAddress();

  try {
    // ── 1. Authenticate ───────────────────────────────────────────────
    await ugfAuthenticate(signer);

    // ── 2. Quote ──────────────────────────────────────────────────────
    const quote: QuoteResponse = await getClient().quote.get({
      payer_address: address,
      tx_object: txObjectJson,
      dest_chain_id: destChainId ?? BASE_SEPOLIA_CHAIN_ID,
      dest_chain_type: destChainType ?? "evm",
      payment_coin: paymentCoin ?? TYI_USD_PAYMENT_COIN,
    });

    // ── 3. Settle (ERC-3009 / x402) ───────────────────────────────────
    await getClient().payment.x402.execute({
      quote,
      signer,
      token: paymentCoin ?? TYI_USD_PAYMENT_COIN,
    });

    // ── 4. Execute — UGF sponsors gas, sends the real tx ───────────────
    const { to, data, value } = JSON.parse(txObjectJson);
    const { userTxHash } = await getClient().chains.evm.sponsorAndExecute(
      quote.digest,
      signer,
      async () => ({ to: to as string, data: data as `0x${string}`, value: BigInt(value ?? "0") }),
    );

    return { userTxHash, digest: quote.digest };
  } catch (err) {
    if (err instanceof Error && "code" in err) {
      const u = err as { code?: string };
      throw new Error(`[UGF ${u.code ?? "UNKNOWN"}] ${err.message}`);
    }
    if (err instanceof Error) throw err;
    throw new Error("An unknown error occurred during the gasless transaction.");
  }
}

/**
 * One-liner: mint an ERC-721 NFT as a fully gasless transaction.
 *
 * Calls `safeMint(recipient)` by default. Supply your own `data` (or
 * `tokenId`-aware calldata) to override.
 */
export async function mintCertificateGasless(params: CertificateMintRequest): Promise<GaslessTxResult> {
  const signer = await getInjectedSigner();
  const calldata = params.data ?? encodeSafeMint(params.to as `0x${string}`);

  const txObject = buildTxObject({
    from: await signer.getAddress(),
    to: params.contractAddress,
    data: calldata,
    value: "0",
  });

  return sendGaslessTx({
    signer,
    txObjectJson: txObject,
    destChainId: BASE_SEPOLIA_CHAIN_ID,
    paymentCoin: TYI_USD_PAYMENT_COIN,
  });
}
