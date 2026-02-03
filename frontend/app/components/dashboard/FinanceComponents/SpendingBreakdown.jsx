import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899'];
const SpendingBreakdown = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
      <h3 className="text-lg font-semibold text-slate-700 mb-4">Spending Distribution</h3>
      <div className="h-64 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(val) => `$${val.toLocaleString()}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-slate-500">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SpendingBreakdown;