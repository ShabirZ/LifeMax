import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero.jsx";
import Features from "../components/landing/Features";
import Footer from "../components/landing/Footer";
import { ProgressiveBlur } from "@/components/ui/progressive-blur"


export default function LifeMaxLanding() {
  const dashboardDemoUrl = "/dashboard";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden">
      <div>
        {/* Background Effects */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px]" />
        </div>

        <Navbar />
        <Hero dashboardDemoUrl={dashboardDemoUrl} />
        <Features />
        <Footer />
      </div>
    </div>
  );
}