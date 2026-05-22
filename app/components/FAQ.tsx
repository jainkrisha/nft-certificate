"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Do I need ETH?",
    answer:
      "No. UGF covers the gas, so students can mint certificates without holding ETH in their wallet.",
  },
  {
    question: "What is UGF?",
    answer:
      "UGF is a gasless transaction flow that sponsors the on-chain mint on your behalf, making onboarding easy and beginner-friendly.",
  },
  {
    question: "What network is used?",
    answer: "This app uses Base Sepolia testnet for fast, secure NFT certificate minting.",
  },
  {
    question: "Is this a real NFT?",
    answer: "Yes. Each certificate is minted as a standard ERC-721 NFT, verifiable on-chain and viewable in your wallet.",
  },
  {
    question: "Where can I view my transaction?",
    answer:
      "After minting, you can open the transaction on BaseScan using the provided link in the live activity section.",
  },
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950/90 via-transparent" />
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">FAQ</p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white">Frequently asked questions</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            Clear answers for beginners, with no blockchain jargon.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const open = index === activeIndex;
            return (
              <button
                type="button"
                key={item.question}
                onClick={() => setActiveIndex(open ? null : index)}
                className="w-full rounded-[2rem] border border-white/10 bg-slate-950/80 px-6 py-5 text-left shadow-[0_30px_80px_rgba(15,23,42,0.3)] transition hover:border-indigo-500/30"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-semibold text-white">{item.question}</span>
                  <span className={`text-2xl font-bold transition ${open ? "text-indigo-400" : "text-slate-500"}`}>
                    {open ? "−" : "+"}
                  </span>
                </div>
                {open && <p className="mt-4 text-sm leading-7 text-slate-300">{item.answer}</p>}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
