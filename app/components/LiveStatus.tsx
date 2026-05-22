"use client";

import { useWallet } from "./WalletContext";

export function LiveStatus() {
  const { address, lastTxHash, txPending } = useWallet();
  const hasActivity = Boolean(lastTxHash);
  const baseScanUrl = lastTxHash ? `https://sepolia.basescan.org/tx/${lastTxHash}` : "https://sepolia.basescan.org";

  return (
    <section id="live-status" className="relative py-24">
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-950/80 via-transparent" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">Live minting</p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white">Recent certificate activity</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            View the latest gasless mint and wallet status in real time. Simple, transparent, and ready for beginners.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.45)] backdrop-blur-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Latest mint</p>
                <p className="mt-2 text-2xl font-semibold text-white">{hasActivity ? "Certificate claimed" : "Awaiting first claim"}</p>
              </div>
              <div className="rounded-full bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 ring-1 ring-white/10">
                {txPending ? "Pending" : hasActivity ? "Live" : "Ready"}
              </div>
            </div>

            <div className="mt-8 space-y-5 text-sm text-slate-300">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Wallet</p>
                <p className="mt-2 text-base text-white">{address ?? "Not connected yet"}</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Transaction</p>
                <p className="mt-2 text-base text-white break-all">
                  {hasActivity ? lastTxHash : "No transaction hash available yet."}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950/60 to-slate-900/80 p-8 shadow-[0_20px_60px_rgba(74,222,128,0.12)] backdrop-blur-2xl">
            <div className="space-y-5">
              <div className="rounded-3xl bg-slate-900/70 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">BaseScan</p>
                <p className="mt-3 text-base text-slate-200">Open the transaction on BaseScan to verify the on-chain certificate.</p>
              </div>
              <a
                href={baseScanUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
              >
                View on BaseScan
              </a>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">How it works</p>
                <p className="mt-2 text-sm text-slate-300 leading-6">
                  Your wallet approves a gasless mint. UGF handles fees so you only claim the certificate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
