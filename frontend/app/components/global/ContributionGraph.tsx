import React from 'react';

export interface ContributionPoint {
  date: string;
  count: number;
}

// 1. Define available themes
export type GraphTheme = 'green' | 'blue' | 'purple' | 'orange' | 'red' | 'stone';

// 2. Update props to include theme
interface ContributionGraphProps {
  data?: ContributionPoint[];
  theme?: GraphTheme; 
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ 
  data = [], 
  theme = 'green' // Default theme
}) => {

  // 1. Configuration for the heatmap colors (Tailwind classes)
  const themeConfig: Record<GraphTheme, Record<number, string>> = {
    green: {
      0: 'bg-slate-100',
      1: 'bg-emerald-200',
      2: 'bg-emerald-400',
      3: 'bg-emerald-600',
      4: 'bg-emerald-800',
    },
    blue: {
      0: 'bg-slate-100',
      1: 'bg-blue-200',
      2: 'bg-blue-400',
      3: 'bg-blue-600',
      4: 'bg-blue-800',
    },
    purple: {
      0: 'bg-slate-100',
      1: 'bg-violet-200',
      2: 'bg-violet-400',
      3: 'bg-violet-600',
      4: 'bg-violet-800',
    },
    orange: {
      0: 'bg-slate-100',
      1: 'bg-orange-200',
      2: 'bg-orange-400',
      3: 'bg-orange-600',
      4: 'bg-orange-800',
    },
    red: {
      0: 'bg-slate-100',
      1: 'bg-red-200',
      2: 'bg-red-400',
      3: 'bg-red-600',
      4: 'bg-red-800',
    },
    stone: {
      0: 'bg-slate-100',
      1: 'bg-stone-200',
      2: 'bg-stone-400',
      3: 'bg-stone-600',
      4: 'bg-stone-800',
    }
  };

  // Select the active color scale based on the prop
  const colorScale = themeConfig[theme];

  // 2. Helper to determine color based on commit count
  const getLevel = (count: number) => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 10) return 3;
    return 4;
  };

  // 3. Generate a year of empty days if no data is provided (Skeleton state)
  const days = data.length > 0 ? data : Array.from({ length: 365 }, (_, i) => {
    // Create fake dates for demo
    const d = new Date();
    d.setDate(d.getDate() - (364 - i));
    return {
      date: d.toISOString().split('T')[0],
      count: Math.random() > 0.8 ? Math.floor(Math.random() * 12) : 0 // Random data
    };
  });

  return (
    <div className="w-full overflow-x-auto p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-700 capitalize">
          Activity
        </h3>
        <span className="text-xs text-slate-500">Last 365 Days</span>
      </div>
      
      {/* The Grid: 7 rows (days of week), flowing by column (weeks) */}
      <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
        {days.map((day, index) => {
          const level = getLevel(day.count);
          
          return (
            <div
              key={index}
              className={`w-3 h-3 rounded-sm ${colorScale[level]} transition-all hover:ring-2 hover:ring-slate-400 relative group`}
            >
              {/* Tooltip on Hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10 w-max">
                <div className="bg-slate-800 text-white text-xs rounded py-1 px-2 shadow-lg">
                  {day.count} contributions on {day.date}
                </div>
                {/* Tooltip Arrow */}
                <div className="w-2 h-2 bg-slate-800 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend - Now uses the dynamic colorScale instead of hardcoded classes */}
      <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
        <span>Less</span>
        <div className="flex gap-1">
          <div className={`w-3 h-3 rounded-sm ${colorScale[0]}`}></div>
          <div className={`w-3 h-3 rounded-sm ${colorScale[1]}`}></div>
          <div className={`w-3 h-3 rounded-sm ${colorScale[2]}`}></div>
          <div className={`w-3 h-3 rounded-sm ${colorScale[3]}`}></div>
          <div className={`w-3 h-3 rounded-sm ${colorScale[4]}`}></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default ContributionGraph;