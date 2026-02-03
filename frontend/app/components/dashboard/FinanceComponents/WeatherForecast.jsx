import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WealthForecast = ({ data }) => {
  const [targetAge, setTargetAge] = useState(65);
  const visibleData = data.filter(d => d.age <= targetAge);
  const finalValue = visibleData[visibleData.length - 1]?.optimistic || 0;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-700">Wealth Projection</h3>
          <p className="text-slate-500 text-sm">Optimistic vs Conservative</p>
        </div>
        <select 
          value={targetAge} 
          onChange={(e) => setTargetAge(Number(e.target.value))}
          className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-sm outline-none"
        >
          {[40, 50, 60, 65, 70, 80].map(age => <option key={age} value={age}>Age {age}</option>)}
        </select>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={visibleData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="age" />
            <YAxis tickFormatter={(val) => `$${val/1000}k`} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip formatter={(val) => [`$${val.toLocaleString()}`, 'Net Worth']} />
            <Area type="monotone" dataKey="optimistic" stroke="#10B981" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-3 bg-emerald-50 rounded-lg flex justify-between items-center">
        <span className="text-emerald-900 font-medium">Projected at {targetAge}</span>
        <span className="text-emerald-700 font-bold text-xl">${finalValue.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default WealthForecast;