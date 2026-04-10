import { useState, useEffect } from "react";
import { History, DollarSign, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import Modal from "../../global/Modal";
import { getTransactionsByRange } from "~/services/transactionServices";

const CATEGORY_COLORS = [
  "bg-emerald-100 text-emerald-700",
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-pink-100 text-pink-700",
];

const categoryColor = (category) => {
  let hash = 0;
  for (let i = 0; i < category.length; i++) hash = category.charCodeAt(i) + ((hash << 5) - hash);
  return CATEGORY_COLORS[Math.abs(hash) % CATEGORY_COLORS.length];
};

const toInputDate = (date) => date.toISOString().split("T")[0];

const PRESETS = [
  { label: "This Month", getRange: () => {
    const now = new Date();
    return { start: new Date(now.getFullYear(), now.getMonth(), 1), end: new Date(now.getFullYear(), now.getMonth() + 1, 0) };
  }},
  { label: "Last Month", getRange: () => {
    const now = new Date();
    return { start: new Date(now.getFullYear(), now.getMonth() - 1, 1), end: new Date(now.getFullYear(), now.getMonth(), 0) };
  }},
  { label: "Last 3 Months", getRange: () => {
    const now = new Date();
    return { start: new Date(now.getFullYear(), now.getMonth() - 2, 1), end: new Date(now.getFullYear(), now.getMonth() + 1, 0) };
  }},
  { label: "This Year", getRange: () => {
    const now = new Date();
    return { start: new Date(now.getFullYear(), 0, 1), end: new Date(now.getFullYear(), 11, 31) };
  }},
  { label: "Custom", getRange: null },
];

const TransactionHistory = ({ recentTransactions = [] }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState("idle");
  const [activePreset, setActivePreset] = useState(0); // index into PRESETS
  const [customStart, setCustomStart] = useState(toInputDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1)));
  const [customEnd, setCustomEnd] = useState(toInputDate(new Date()));

  const isCustom = activePreset === PRESETS.length - 1;

  const loadTransactions = async (start, end) => {
    setStatus("loading");
    try {
      const data = await getTransactionsByRange(start, end);
      setTransactions(data.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)));
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  const handleOpen = () => {
    setModalOpen(true);
    const { start, end } = PRESETS[activePreset].getRange();
    loadTransactions(start, end);
  };

  const handlePresetClick = (index) => {
    setActivePreset(index);
    if (PRESETS[index].getRange) {
      const { start, end } = PRESETS[index].getRange();
      loadTransactions(start, end);
    }
  };

  const handleCustomApply = () => {
    if (!customStart || !customEnd) return;
    loadTransactions(new Date(customStart), new Date(customEnd));
  };

  // Merge locally added transactions into the fetched list (deduped)
  const allTransactions = [
    ...recentTransactions,
    ...transactions.filter(t => !recentTransactions.some(r => r.transactionId === t.transactionId)),
  ].sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));

  const totalSpent = allTransactions.reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <>
      <div
        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-full group hover:border-violet-300 transition-all cursor-pointer"
        onClick={handleOpen}
      >
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-slate-700">Transaction History</h3>
              <p className="text-slate-500 text-sm">This month's activity</p>
            </div>
            <div className="bg-violet-100 p-2 rounded-lg text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors">
              <History size={20} />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {recentTransactions.slice(0, 3).map((t, i) => (
              <div key={i} className="flex justify-between text-xs text-slate-600 bg-slate-50 p-2 rounded">
                <span className="truncate max-w-[60%]">{t.description || t.category}</span>
                <span className="font-medium text-rose-500">-${Number(t.amount).toFixed(2)}</span>
              </div>
            ))}
            {recentTransactions.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-2">No transactions yet</p>
            )}
          </div>
        </div>

        <div className="mt-4 text-violet-600 text-sm font-medium flex items-center gap-1">
          View All <ChevronRight size={16} />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Transaction History">
        {/* Preset tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {PRESETS.map((p, i) => (
            <button
              key={p.label}
              onClick={() => handlePresetClick(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activePreset === i
                  ? "bg-violet-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Custom date inputs */}
        {isCustom && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="flex-1 border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
            />
            <span className="text-slate-400 text-sm">to</span>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="flex-1 border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
            />
            <button
              onClick={handleCustomApply}
              className="bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
            >
              Apply
            </button>
          </div>
        )}

        {status === "loading" && (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-400">
            <Loader2 size={28} className="animate-spin" />
            <span className="text-sm">Loading transactions...</span>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-red-400">
            <AlertCircle size={28} />
            <span className="text-sm">Failed to load transactions</span>
          </div>
        )}

        {status === "idle" && (
          <>
            <div className="flex justify-between items-center mb-4 p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-500">{allTransactions.length} transaction{allTransactions.length !== 1 ? "s" : ""}</span>
              <span className="font-bold text-slate-800">
                ${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {allTransactions.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <DollarSign size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No transactions in this period</p>
              </div>
            ) : (
              <div className="space-y-2">
                {allTransactions.map((t, i) => (
                  <div
                    key={t.transactionId ?? i}
                    className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="bg-white p-2 rounded-full border border-slate-200 shrink-0">
                        <DollarSign size={14} className="text-slate-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-700 text-sm truncate">{t.description || "—"}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColor(t.category)}`}>
                            {t.category}
                          </span>
                          <span className="text-xs text-slate-400">{t.transactionDate}</span>
                        </div>
                      </div>
                    </div>
                    <span className="font-bold text-slate-700 text-sm shrink-0 ml-3">
                      -${Number(t.amount).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default TransactionHistory;
