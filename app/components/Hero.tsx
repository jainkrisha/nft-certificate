"use client";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[180px] pointer-events-none" />
      <div className="absolute left-1/3 top-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-zinc-400 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Live on Base Sepolia Testnet
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          <span className="bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Gasless
          </span>{" "}
          <span className="bg-gradient-to-br from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            NFT Certificates
          </span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-zinc-400 leading-relaxed">
          Students claim their certificates as verifiable NFTs — no gas fees
          required. Powered by{" "}
          <span className="text-indigo-400 font-medium">UGF</span> for truly
          gasless onboarding on Base Sepolia.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            className="flex items-center gap-2.5 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500 active:scale-[0.97]"
            aria-label="Connect wallet to get started"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
            </svg>
            Connect Wallet
          </button>
          <button
            className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-medium text-zinc-300 transition hover:border-white/25 hover:bg-white/10 active:scale-[0.97]"
            aria-label="Read the documentation"
          >
            Documentation
          </button>
        </div>
      </div>
    </section>
  );
}
