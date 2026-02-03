import { useState } from "react";
import { Plus, ChevronRight, ChevronLeft, Save, Trash2 } from "lucide-react";
import Modal from "../../global/Modal";



const BudgetManager = ({ budgets, onAddBudget, onUpdateBudget, onDeleteBudget }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [newCat, setNewCat] = useState('');
  const [newLimit, setNewLimit] = useState('');
  
  // Editing State
  const [editingCategory, setEditingCategory] = useState(null); 
  const [editLimit, setEditLimit] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCat || !newLimit) return;
    onAddBudget({ category: newCat, limit: parseFloat(newLimit), spent: 0, status: 'ok' });
    setNewCat('');
    setNewLimit('');
  };

  const startEditing = (budget) => {
    setEditingCategory(budget);
    setEditLimit(budget.limit);
  };

  const handleSaveEdit = () => {
    if (!editingCategory) return;
    onUpdateBudget({ ...editingCategory, limit: parseFloat(editLimit) });
    setEditingCategory(null);
  };

  const handleDelete = () => {
    if (!editingCategory) return;
    onDeleteBudget(editingCategory.category);
    setEditingCategory(null);
  };

  return (
    <>
      <div 
        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-full group hover:border-emerald-300 transition-all cursor-pointer" 
        onClick={() => setModalOpen(true)}
      >
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-slate-700">Budget Model</h3>
              <p className="text-slate-500 text-sm">Define categories & limits</p>
            </div>
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Plus size={20} />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {budgets.slice(0, 3).map((b, i) => (
              <div key={i} className="flex justify-between text-xs text-slate-600 bg-slate-50 p-2 rounded">
                <span>{b.category}</span>
                <span className="font-medium">${b.limit.toLocaleString()}</span>
              </div>
            ))}
            {budgets.length > 3 && <p className="text-xs text-center text-slate-400">+{budgets.length - 3} more</p>}
          </div>
        </div>
        <div className="mt-4 text-emerald-600 text-sm font-medium flex items-center gap-1">
          Manage Categories <ChevronRight size={16} />
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
            setModalOpen(false);
            setEditingCategory(null);
        }} 
        title={editingCategory ? `Edit ${editingCategory.category}` : "Manage Budget Categories"}
      >
        {!editingCategory ? (
          <div className="animate-in slide-in-from-left-4 duration-200">
            <form onSubmit={handleAdd} className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Add New Category</h4>
              <div className="flex gap-3 mb-3">
                <input 
                  className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Name"
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                />
                <input 
                  className="w-24 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Limit"
                  type="number"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium transition">
                Add Category
              </button>
            </form>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700">Active Categories (Click to Edit)</h4>
              {budgets.map((b, i) => (
                <div 
                    key={i} 
                    onClick={() => startEditing(b)}
                    className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-100 cursor-pointer group transition-colors"
                >
                  <span className="font-medium text-slate-700">{b.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Limit: ${b.limit.toLocaleString()}</span>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
                <button 
                    onClick={() => setEditingCategory(null)}
                    className="text-sm text-slate-500 flex items-center gap-1 hover:text-slate-800"
                >
                    <ChevronLeft size={16} /> Back to List
                </button>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Update Limit Amount</label>
                    <div className="flex gap-3">
                        <input 
                            type="number" 
                            value={editLimit}
                            onChange={(e) => setEditLimit(e.target.value)}
                            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                        <button 
                            onClick={handleSaveEdit}
                            className="bg-emerald-600 text-white px-4 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition"
                        >
                            <Save size={18} /> Save
                        </button>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-sm font-semibold text-red-600 mb-2">Danger Zone</h4>
                    <button 
                        onClick={handleDelete}
                        className="w-full border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                    >
                        <Trash2 size={16} /> Delete Category
                    </button>
                </div>
            </div>
        )}
      </Modal>
    </>
  );
};

export default BudgetManager