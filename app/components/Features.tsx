"use client";

import type { ReactNode } from "react";

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/8 bg-white/[0.03] p-7 transition hover:border-indigo-500/30 hover:bg-white/[0.06]">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 text-indigo-400 ring-1 ring-indigo-500/20 transition group-hover:ring-indigo-400/40">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{description}</p>
    </div>
  );
}

const features = [
  {
    title: "NFT Certificate Minting",
    description:
      "Each certificate is minted as a unique NFT directly to the student\u2019s wallet \u2014 forever verifiable on-chain.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    title: "Gasless Transactions with UGF",
    description:
      "No crypto needed to claim. UGF sponsored transactions let students mint certificates with zero gas fees.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Base Sepolia Testnet",
    description:
      "Built and tested on Base Sepolia for fast, low-cost deployments. Easy bridge from Ethereum and L2s.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-3.556a2.25 2.25 0 00-2.15-1.588 2.25 2.25 0 00-1.716.723l-.72.822-.723-.823a2.25 2.25 0 00-1.716-.724 2.25 2.25 0 00-2.15 1.588l-1.079 3.556a2.252 2.252 0 01-.42.585l-1.134 1.135a2.226 2.226 0 010 3.182l2.992 2.992a2.226 2.226 0 010 3.182l-1.135 1.135a2.252 2.252 0 01-.421.585m-9.202-7.116a2.25 2.25 0 00-.42.585L2.89 16.72l-.72.823a2.252 2.252 0 01-.421-.585m15.213 0l-2.977 2.977M9.11 6.086l-2.977-2.977a2.252 2.252 0 01-.42-.585M6.83 6.086l-1.135 1.135a2.252 2.252 0 01-.42-.585m0 0a2.25 2.25 0 00-1.716-.723l-.72.822-.823-.723a2.252 2.252 0 01-.421-.585m0 0a2.25 2.25 0 01-2.976-1.371l2.992-2.992" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section className="relative py-24">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-3">
            Features
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Built for the{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              future of education
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
