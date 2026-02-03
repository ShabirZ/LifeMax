
const InvestedCard = ({ amount }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center h-full text-center">
      <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Total Invested This Month</p>
      <span className="text-5xl font-extrabold text-emerald-500">
        ${amount.toLocaleString()}
      </span>
    </div>
  );
};
export default InvestedCard;