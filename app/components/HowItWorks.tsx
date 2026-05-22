"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Connect Wallet",
    detail: "Link MetaMask and join the gasless certificate flow in a few clicks.",
  },
  {
    title: "Sign Permission",
    detail: "Approve a secure wallet signature so UGF can process your mint.",
  },
  {
    title: "UGF Pays Gas",
    detail: "UGF sponsors the transaction with mock USD so you pay zero ETH.",
  },
  {
    title: "NFT Certificate Minted",
    detail: "Your on-chain academic certificate appears as a trustworthy NFT.",
  },
];

function StepCard({
  number,
  title,
  detail,
}: {
  number: number;
  title: string;
  detail: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.45)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
        {number}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-400">{detail}</p>
    </motion.div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-400 mb-3">How it Works</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            A simple gasless certificate flow.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <StepCard key={index} number={index + 1} title={step.title} detail={step.detail} />
          ))}
        </div>
      </div>
    </section>
  );
}
