"use client";

import { useState } from "react";
import { useWallet } from "./WalletContext";

const navItems = [
  { label: "Home", href: "#top" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Live Minting", href: "#live-status" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const { address, isConnecting, connect, disconnect, truncatedAddress, wrongNetwork, switchNetwork } =
    useWallet();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      {wrongNetwork && (
        <div className="flex items-center justify-center px-6 py-3 text-sm text-amber-200">
          <span className="mr-3">⚠️ You&apos;re not on Base Sepolia.</span>
          <button
            onClick={switchNetwork}
            className="rounded-full bg-amber-500 px-4 py-1.5 text-xs font-semibold text-black transition hover:bg-amber-400 active:scale-[0.97]"
          >
            Switch Network
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-6 py-4">
        <a href="#top" className="flex items-center gap-3 text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] shadow-lg shadow-violet-500/20">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 7-7 7-7-7 7-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-white">UGF Certificate</p>
            <p className="text-xs text-slate-400">Gasless NFT onboarding</p>
          </div>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          <div className="flex items-center gap-8 text-sm text-slate-300">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          {address ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-slate-400">{truncatedAddress}</span>
              <button
                onClick={disconnect}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connect}
              disabled={isConnecting}
              className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-slate-300 transition hover:bg-slate-900 md:hidden"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"} />
          </svg>
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-80" : "max-h-0"}`}>
        <div className="space-y-3 px-6 pb-5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {address ? (
            <button
              onClick={() => {
                disconnect();
                setMenuOpen(false);
              }}
              className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={() => {
                connect();
                setMenuOpen(false);
              }}
              disabled={isConnecting}
              className="w-full rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
