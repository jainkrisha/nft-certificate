import { Footer, Features, Hero, HowItWorks, LiveStatus, Navbar, FAQ, TrustBar } from "./components";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Features />
      <LiveStatus />
      <FAQ />
      <Footer />
    </div>
  );
}
