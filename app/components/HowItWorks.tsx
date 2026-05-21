"use client";

const steps = [
  {
    title: "Connect",
    detail: "Link your MetaMask or any compatible wallet to get started in seconds.",
  },
  {
  title: "Authorize",
  detail: "Sign a message to authenticate with UGF. No passwords, no ETH — just your wallet signature.",
  },
  {
    title: "Claim",
    detail: "Pick your certificate from the list and issue the claim \u2014 UGF pays the gas for you.",
  },
  {
    title: "Mint",
    detail: "Your NFT certificate is minted and appears in your wallet, forever on-chain.",
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
    <div className="relative rounded-2xl border border-white/8 bg-white/[0.02] p-7">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white ring-2 ring-indigo-500/30">
        {number}
      </span>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{detail}</p>

      {number < 4 && (
        <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
          <svg
            className="w-6 h-6 text-indigo-500/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="relative py-24">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-3">
            How it Works
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Four steps to your{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              digital credential
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <StepCard key={i} number={i + 1} title={step.title} detail={step.detail} />
          ))}
        </div>
      </div>
    </section>
  );
}
