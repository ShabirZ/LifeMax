import { AlertTriangle } from "lucide-react";


const BudgetAlerts = ({ budgets }) => {
  const critical = budgets.filter(b => b.status === 'warning' || b.status === 'exceeded');
  if (critical.length === 0) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-md animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="text-red-600" size={20} />
        <h3 className="font-bold text-red-800">Budget Attention Needed</h3>
      </div>
      <div className="mt-2 space-y-1">
        {critical.map((b, i) => (
          <div key={i} className="flex justify-between text-sm text-red-700">
            <span>{b.category}</span>
            <span className="font-medium">
              ${b.spent.toLocaleString()} / ${b.limit.toLocaleString()} ({b.status === 'exceeded' ? 'OVER' : 'Near Limit'})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BudgetAlerts;