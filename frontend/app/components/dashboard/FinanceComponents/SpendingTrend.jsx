import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SpendingTrend = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between mb-4">
         <h3 className="text-lg font-semibold text-slate-700">Spending Trend</h3>
         <select className="text-sm border-slate-200 rounded text-slate-500 outline-none">
            <option>Weekly</option>
            <option>Monthly</option>
         </select>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={3} 
              dot={{ r: 4, fill: '#3B82F6' }} activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingTrend;