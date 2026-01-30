import { Link } from "react-router";
import { Activity, Wallet, Zap, ArrowRight } from "lucide-react";
import "../../app.css"
import DashboardCard from "./DashboardCard";

import { useState, useEffect } from 'react';

const TypewriterHeadline = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = ["Health.", "Finances.", "Productivity.", "Everything."];

  // Helper to get color based on the current phrase index
  const getCurrentColor = () => {
    const i = loopNum % phrases.length;
    const currentPhrase = phrases[i];
    
    // We match the specific words to your requested Tailwind classes
    if (currentPhrase === "Health.") return "text-rose-500";     
    if (currentPhrase === "Finances.") return "text-emerald-500";    
    if (currentPhrase === "Productivity.") return "text-purple-500"; 
    return "text-stone-600"; // Default for "Everything."
  };

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500); 
      } 
      else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 h-[1.2em]">
      Track{" "}
      {/* We removed 'bg-clip-text' and 'text-transparent' because 
         we are now using solid colors (text-rose-500, etc.) 
      */}
      <span className={`${getCurrentColor()} transition-colors duration-300`}>
        {text}
      </span>
      <span className="animate-pulse text-gray-500">|</span>
    </h1>
  );
};
export default function Hero() {
  return (
    <section className="relative pt-48 pb-24 px-6 text-center">
      <div className="container mx-auto max-w-5xl">
        <TypewriterHeadline />

        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop switching between fitness apps, spreadsheets, and to-do lists. 
            LifeMax unifies your <span className="text-health">Health</span>, <span className="text-finance">Finances</span>, and <span className="text-productivity">Productivity</span> into a single source of truth.
        </p>
    
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20">
          <Link to="/signup" className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)]">
            Build Your Dashboard <ArrowRight size={18} />
          </Link>
          <button className="w-full md:w-auto px-8 py-4 bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 rounded-xl font-semibold transition-all">
            View Demo
          </button>
        </div>

        {/* Abstract Dashboard Graphic */}
        <DashboardPreview />
      </div>
    </section>
  );
}

// Sub-component specifically for the graphic to keep the Hero clean
function DashboardPreview() {
  return (
    <div className="relative mx-auto max-w-4xl group perspective-1000">
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent blur-[80px] -z-10" />
      <div className="bg-[#111] border border-white/10 rounded-2xl p-2 md:p-4 shadow-2xl transform transition-transform duration-700 hover:rotate-x-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[300px] md:h-[400px]">
  
  {/* 1. HEALTH CARD */}
  <DashboardCard 
    theme="health" 
    value="1,240" 
    label="Active Calories"
    topRight={<span className="text-xs text-gray-500">Today</span>}
  >
    {/* Health-specific Graph */}
    <div className="w-full h-12 bg-gray-800/50 rounded flex items-end gap-1 px-1 pb-1">
      {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
        <div 
          key={i} 
          style={{ height: `${h}%` }} 
          className="flex-1 bg-health/80 rounded-sm hover:bg-health transition-colors" 
        />
      ))}
    </div>
  </DashboardCard>


  {/* 2. FINANCE CARD */}
  <DashboardCard 
    theme="finance" 
    value="$14,230" 
    label="Net Worth"
    topRight={<span className="text-xs font-bold text-finance">+12%</span>}
  >
    {/* Finance-specific Progress Bar */}
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-gray-500">
        <span>Savings</span><span>$8.2k</span>
      </div>
      <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
        <div className="w-[70%] bg-finance h-full" />
      </div>
    </div>
  </DashboardCard>


  {/* 3. PRODUCTIVITY CARD */}
  <DashboardCard 
    theme="productivity" 
    value="4.2h" 
    label="Deep Work"
    topRight={<span className="text-xs bg-productivity/20 text-productivity px-2 py-1 rounded">Focus</span>}
  >
    {/* Productivity-specific Tags */}
    <div className="flex gap-2">
      {['Code', 'Write'].map((tag) => (
        <span key={tag} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
          {tag}
        </span>
      ))}
    </div>
  </DashboardCard>

</div>
      </div>
    </div>
  );
}