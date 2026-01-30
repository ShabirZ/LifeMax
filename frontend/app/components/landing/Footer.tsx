import { Activity, Wallet, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 bg-[#0a0a0a]">
       {/* ... (Copy the Footer code here) ... */}
       <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-300">LifeMax</span>
          </div>
          <div className="text-gray-500 text-sm">© 2026 LifeMax Inc. All rights reserved.</div>
       </div>
    </footer>
  );
}