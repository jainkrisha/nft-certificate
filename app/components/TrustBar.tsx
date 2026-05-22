export function TrustBar() {
  return (
    <section className="relative py-10">
      <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.2),transparent_45%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_20px_80px_rgba(99,102,241,0.12)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Network</p>
            <p className="mt-4 text-xl font-semibold text-white">Base Sepolia</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_20px_80px_rgba(168,85,247,0.12)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Gas</p>
            <p className="mt-4 text-xl font-semibold text-white">Mock USD payments</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_20px_80px_rgba(56,189,248,0.12)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Standard</p>
            <p className="mt-4 text-xl font-semibold text-white">ERC-721 NFT</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_20px_80px_rgba(251,191,36,0.12)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Powered by</p>
            <p className="mt-4 text-xl font-semibold text-white">UGF Gasless Flow</p>
          </div>
        </div>
      </div>
    </section>
  );
}
