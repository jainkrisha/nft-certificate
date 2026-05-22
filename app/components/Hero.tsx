"use client";

import { motion } from "framer-motion";
import { useWallet } from "./WalletContext";

export function Hero() {
  const {
    address,
    truncatedAddress,
    isConnecting,
    txPending,
    lastTxHash,
    wrongNetwork,
    connect,
    switchNetwork,
    claimCertificate,
  } = useWallet();

  return (
    <section id="top" className="relative overflow-hidden bg-slate-950/80 py-20 sm:py-24">
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.24),transparent_30%)]" />
      <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
      <div className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-6 lg:flex-row lg:items-center lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center rounded-full border border-indigo-400/20 bg-white/5 px-4 py-2 text-sm text-indigo-200 shadow-sm shadow-indigo-500/10">
            <span className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-400" />
            Claim NFT certificates without ETH gas.
          </span>

          <h1 className="mt-8 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            Claim Your Academic Certificate Onchain
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
            Mint verifiable NFT certificates on Base Sepolia without needing ETH for gas.
            Secure wallet authentication and UGF gasless flow make it beginner-friendly.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={connect}
              disabled={isConnecting}
              className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
            <button
              onClick={async () => await claimCertificate()}
              disabled={!address || txPending || wrongNetwork}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {txPending ? "Claiming..." : "Claim Certificate"}
            </button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 px-5 py-4 text-sm text-slate-300 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
              <p className="text-slate-400">Network</p>
              <p className="mt-2 text-base font-semibold text-white">Base Sepolia</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 px-5 py-4 text-sm text-slate-300 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
              <p className="text-slate-400">Certificate</p>
              <p className="mt-2 text-base font-semibold text-white">ERC-721 NFT</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 px-5 py-4 text-sm text-slate-300 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
              <p className="text-slate-400">Gas</p>
              <p className="mt-2 text-base font-semibold text-white">Covered by UGF</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="absolute -left-10 top-8 h-24 w-24 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-14 w-14 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.55)]">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-violet-500/15 to-transparent" />
            <div className="relative rounded-[1.75rem] border border-white/10 bg-slate-900/90 p-7 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
              <div className="mb-7 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Certificate</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Academic NFT</h2>
                </div>
                <span className="inline-flex rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-200">
                  Verified
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl bg-slate-950/80 p-5">
                  <p className="text-sm text-slate-400">Student</p>
                  <p className="mt-2 text-base font-semibold text-white">
                    {address ? truncatedAddress ?? address : "0x0000...0000"}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-5">
                  <p className="text-sm text-slate-400">Issued</p>
                  <p className="mt-2 text-base font-semibold text-white">Gasless mint</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-5">
                  <p className="text-sm text-slate-400">Status</p>
                  <p className="mt-2 text-base font-semibold text-white">{txPending ? "Minting" : lastTxHash ? "Claimed" : "Ready"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 px-6 py-5 text-sm text-slate-300 shadow-[0_30px_80px_rgba(99,102,241,0.18)]">
            <p className="font-semibold text-white">Why it feels premium</p>
            <p className="mt-3 leading-7 text-slate-400">
              Soft glow cards, smooth motion, and a clean gasless onboarding story that welcomes new users.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
