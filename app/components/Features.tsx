"use client";

import { motion } from "framer-motion";
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
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group rounded-[2rem] border border-white/10 bg-slate-950/85 p-7 shadow-[0_30px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 text-indigo-200 ring-1 ring-indigo-500/15 transition group-hover:scale-105">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
    </motion.div>
  );
}

const features = [
  {
    title: "Gasless Experience",
    description: "Claim certificates without paying ETH gas. UGF covers the transaction fees.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
      </svg>
    ),
  },
  {
    title: "Beginner Friendly",
    description: "A simple onboarding flow designed for first-time Web3 users.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    title: "Verifiable NFT",
    description: "Your academic certificate is minted as a standard ERC-721 NFT.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 5h12l3 3v11a1 1 0 01-1 1H4a1 1 0 01-1-1V8l3-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l3 3 3-3" />
      </svg>
    ),
  },
  {
    title: "Built on Base",
    description: "Secure, fast, and easy-to-use minting on Base Sepolia.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5h15v15h-15z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15" />
      </svg>
    ),
  },
  {
    title: "Secure Wallet Auth",
    description: "Sign in with MetaMask to verify your identity securely.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v5M9 14h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8.5l7-4 7 4v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7z" />
      </svg>
    ),
  },
  {
    title: "Real Onchain Certificate",
    description: "The certificate lives on-chain and can be verified by anyone.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 4.5h12M6 19.5h12M6 4.5v15M18 4.5v15" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400 mb-3">Features</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Modern onboarding for learners and institutions.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
