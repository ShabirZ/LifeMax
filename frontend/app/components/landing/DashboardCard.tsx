import { Activity, Wallet, Zap, type LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  theme: 'health' | 'finance' | 'productivity'; // Only these 3 strings are allowed
  value: string;
  label: string;
  topRight?: React.ReactNode; // The '?' means it is optional
  children: React.ReactNode;  // This allows passing JSX inside the component
}

const themeConfig: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  health: {
    icon: Activity,
    color: "text-health",
    bg: "bg-health/10",
  },
  finance: {
    icon: Wallet,
    color: "text-finance",
    bg: "bg-finance/10",
  },
  productivity: {
    icon: Zap,
    color: "text-productivity",
    bg: "bg-productivity/10",
  }
};

// 2. Apply the Props to the function
export default function DashboardCard({ 
  theme, 
  value, 
  label, 
  topRight, 
  children 
}: DashboardCardProps) {
  const currentTheme = themeConfig[theme];
  const Icon = currentTheme.icon;
  //bg-gradient-to-br from-gray-900 to-black
  return (
    <div className="bg-gradient-to-br from-slate-800 to-gray-950 border border-white/5 rounded-xl p-6 flex flex-col justify-between">
      
      {/* --- Header --- */}
      <div className="flex justify-between items-start">
        <div className={`p-2 rounded-lg ${currentTheme.bg}`}>
          {/* We apply the theme color to the icon */}
          <Icon className={currentTheme.color} size={20} />
        </div>
        {/* Render whatever specific badge/text is passed for the top right */}
        {topRight}
      </div>

      {/* --- Main Value --- */}
      <div>
        <div className="text-3xl font-bold text-white">{value}</div>
        <div className={`text-sm ${currentTheme.color}`}>{label}</div>
      </div>

      {/* --- Footer (The part that changes) --- */}
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}