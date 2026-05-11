import { useState, useMemo, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAllTransactions } from "~/services/transactionServices";

const WealthForecast = () => {
  const [targetYear, setTargetYear] = useState(40);
  const [startingBalance, setStartingBalance] = useState(0);
  const [avgMonthly, setAvgMonthly] = useState(0);

  useEffect(() => {
    getAllTransactions()
      .then(txns => {
        const investments = txns.filter(t => t.category?.toLowerCase() === "investing");
        if (investments.length === 0) return;
        const monthlyTotals = {};
        investments.forEach(t => {
          const key = t.transactionDate.substring(0, 7);
          monthlyTotals[key] = (monthlyTotals[key] || 0) + Math.abs(Number(t.amount));
        });
        const months = Object.values(monthlyTotals);
        const avg = months.reduce((sum, v) => sum + v, 0) / months.length;
        setAvgMonthly(Math.round(avg * 100) / 100);
      })
      .catch(console.error);
  }, []);

  const data = useMemo(() => {
    const r = 0.08;
    return Array.from({ length: 41 }, (_, i) => ({
      year: i,
      optimistic: Math.round(
        startingBalance * Math.pow(1 + r, i) +
        avgMonthly * 12 * (Math.pow(1 + r, i) - 1) / r
      ),
    }));
  }, [avgMonthly, startingBalance]);

  const visibleData = data.filter(d => d.year <= targetYear);
  const finalValue = visibleData[visibleData.length - 1]?.optimistic || 0;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-700">Wealth Projection</h3>
          <p className="text-slate-500 text-sm">(Assuming 8% annual return)</p>
        </div>
        <select
          value={targetYear}
          onChange={(e) => setTargetYear(Number(e.target.value))}
          className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-sm outline-none"
        >
          {[0, 10, 20, 25, 30, 40].map(year => <option key={year} value={year}>Year {year}</option>)}
        </select>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Current Balance:</span>
          <div className="flex items-center border border-slate-200 rounded px-2 py-1 bg-slate-50">
            <span className="text-slate-400 mr-1">$</span>
            <input
              type="number"
              min="0"
              value={startingBalance}
              onChange={(e) => setStartingBalance(Number(e.target.value))}
              className="w-24 bg-transparent outline-none text-slate-700"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Avg. Monthly Investment:</span>
          <span className="font-medium text-emerald-600">
            ${avgMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>

      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={visibleData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="year" label={{ value: "Years Invested", position: "insideBottom", offset: -2, fontSize: 12 }} />
            <YAxis tickFormatter={(val) => `$${val/1000}k`} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip formatter={(val) => [`$${val.toLocaleString()}`, 'Net Worth']} />
            <Area type="monotone" dataKey="optimistic" stroke="#10B981" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-3 bg-emerald-50 rounded-lg flex justify-between items-center">
        <span className="text-emerald-900 font-medium">Projected at Year {targetYear}</span>
        <span className="text-emerald-700 font-bold text-xl">${finalValue.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default WealthForecast;
