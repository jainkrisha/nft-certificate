"use client";

import { useWallet } from "./WalletContext";

export function Navbar() {
  const { address, isConnecting, connect, disconnect, truncatedAddress, wrongNetwork, switchNetwork } =
    useWallet();

  return (
    <nav className="flex flex-col items-center gap-2 max-w-7xl mx-auto px-6 py-5">
      {/* Wrong-network alert */}
      {wrongNetwork && (
        <div
          className="flex w-full max-w-xl items-center justify-between gap-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-3"
          role="alert"
        >
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 shrink-0 text-amber-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <p className="text-sm text-amber-200">
              You&apos;re not on <span className="font-semibold">Base Sepolia</span>. Switch to continue.
            </p>
          </div>
          <button
            onClick={switchNetwork}
            className="shrink-0 rounded-full bg-amber-500 px-4 py-1.5 text-xs font-semibold text-black transition hover:bg-amber-400 active:scale-[0.97]"
          >
            Switch Network
          </button>
        </div>
      )}

      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight">UGF Cert</span>
        </div>

        {/* Wallet button */}
        {address ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-zinc-400">{truncatedAddress}</span>
            <button
              onClick={disconnect}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-white/25 hover:bg-white/10 active:scale-[0.97]"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={connect}
            disabled={isConnecting}
            className="flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Connect wallet"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
            </svg>
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </button>
        )}
      </div>
    </nav>
  );
}
