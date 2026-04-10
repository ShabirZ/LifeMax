import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { createTransaction } from "~/services/transactionServices";

const TransactionEntry = ({ budgets, onAddTransaction }) => {
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (budgets.length > 0 && !selectedCat) {
      setSelectedCat(budgets[0].categoryName);
    }
  }, [budgets, selectedCat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !selectedCat || submitting) return;

    const today = new Date();
    const transactionDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    setSubmitting(true);
    setError(null);
    try {
      await createTransaction({
        amount: parseFloat(amount),
        category: selectedCat,
        description: desc || null,
        transactionDate,
      });
      onAddTransaction({
        amount: parseFloat(amount),
        category: selectedCat,
        description: desc || null,
        transactionDate,
      });
      setAmount('');
      setDesc('');
    } catch (err) {
      setError('Failed to save transaction');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-700">New Transaction</h3>
        <p className="text-slate-500 text-sm">Log an expense manually</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        <div>
            <div className="relative">
                <FileText className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Description (e.g. Starbucks)" 
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-sans">$</span>
                <input 
                    type="number" 
                    placeholder="0.00" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
            </div>
            <div>
                <select 
                    value={selectedCat}
                    onChange={(e) => setSelectedCat(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                    {budgets.map((b, i) => (
                        <option key={i} value={b.categoryName}>{b.categoryName}</option>
                    ))}
                </select>
            </div>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <InteractiveHoverButton
          type="submit"
          disabled={submitting}
          className="w-full mt-2 text-black text-sm font-medium py-2.5 rounded-lg hover:bg-slate-700 transition flex flex-col items-center justify-center gap-2 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : 'Add Transaction'}
        </InteractiveHoverButton>
      </form>
    </div>
  );
};

export default TransactionEntry;