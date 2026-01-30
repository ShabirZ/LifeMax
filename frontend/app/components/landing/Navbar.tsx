import { useState, useEffect } from "react";
import { Link } from "react-router"; 
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${
          scrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-md border-white/10 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="text-lg text-bold">LifeMax</div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">Philosophy</a>
            <div className="h-4 w-px bg-white/10 mx-2"></div>
            <Link to="/login" className="text-sm font-medium hover:text-indigo-400 transition-colors">Sign In</Link>
            <Link to="/signup" className="px-5 py-2.5 text-sm font-medium bg-white text-black rounded-full hover:bg-indigo-50 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">Start Free</Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0a] pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-xl">
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>Philosophy</a>
            <Link to="/login" className="text-indigo-400">Sign In</Link>
            <Link to="/signup" className="bg-indigo-600 px-4 py-2 rounded-lg text-center">Sign Up</Link>
          </div>
        </div>
      )}
    </>
  );
}