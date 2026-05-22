"use client";

import Link from "next/link";

const footerLinks = [
  { label: "GitHub", href: "https://github.com" },
  { label: "BaseScan", href: "https://sepolia.basescan.org" },
  { label: "UGF Docs", href: "https://docs.base.org" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] shadow-lg shadow-violet-500/20">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 7-7 7-7-7 7-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">UGF Certificate</p>
            <p className="text-xs text-slate-400">Gasless NFT certificates on Base Sepolia</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm text-slate-400 sm:items-end">
          <p>Built for Base Sepolia · Modern Web3 onboarding</p>
          <div className="flex flex-wrap gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
