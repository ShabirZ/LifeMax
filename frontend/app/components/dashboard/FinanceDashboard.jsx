import React, { useState, useMemo, useEffect} from 'react';

import { TrendingUp, DollarSign, Wallet } from 'lucide-react';

import Modal from "../global/Modal";
import CsvUploader from "../global/CsvUploader";
import BudgetManager from "./FinanceComponents/BudgetManager";
import TransactionEntry from './FinanceComponents/TransactionEntry';
import TransactionHistory from './FinanceComponents/TransactionHistory';
import InvestedCard from './FinanceComponents/InvestedCard';
import BudgetAlerts from './FinanceComponents/BudgetAlerts';
import SpendingBreakdown from './FinanceComponents/SpendingBreakdown';
import SpendingTrend from './FinanceComponents/SpendingTrend';
import WealthForecast from './FinanceComponents/WeatherForecast';
import { fetchBudgets } from '~/services/budgetServices';
import { fetchTrendData, uploadTransactionsCsv } from '~/services/transactionServices';
// --- Mocks & Constants ---

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899'];

const ContributionGraph = () => (
  <div className="flex gap-1 h-32 items-end">
    {Array.from({ length: 30 }).map((_, i) => (
      <div 
        key={i} 
        className={`w-full rounded-sm ${Math.random() > 0.5 ? 'bg-emerald-400' : 'bg-slate-200'}`} 
        style={{ height: `${Math.random() * 100}%` }} 
      />
    ))}
  </div>
);


// --- Main Dashboard ---

/*
 future:
    - on startup fetch budgets
    - fetch transactions
    - fetch weekly spending data
    - fetch wealth forecast data

    - Allow updating or deleting  (transactions / budget)
    - uploading csv of transaction and updating 
*/

export const FinanceDashboard = () => {

  const [budgets, setBudgets] = useState([]);
  const [trendData, setTrendData] = useState([]);

 
  const [transactions, setTransactions] = useState([]);
  const [investedAmount] = useState(2450); // Mocked invested amount

  useEffect(() => {
    fetchBudgets().then(data => setBudgets(data)).catch(console.error);
    fetchTrendData().then(data => setTrendData(data)).catch(console.error);
  }, []);
  const mockWealthData = Array.from({ length: 40 }, (_, i) => ({
    age: 30 + i,
    optimistic: 145000 * Math.pow(1.07, i) + (2100 * 12 * i), 
  }));

  // Handlers
  const addNewBudget = (newBudget) => {
    setBudgets([...budgets, newBudget]);
  };

  const updateBudget = (updatedBudget) => {
    setBudgets(budgets.map(b => b.categoryName === updatedBudget.categoryName ? updatedBudget : b));
  };

  const deleteBudget = (categoryName) => {
    setBudgets(budgets.filter(b => b.categoryName !== categoryName));
  };

  const addTransaction = (txn) => {
    const updatedBudgets = budgets.map(b => {
      if (b.categoryName === txn.category) {
        const newSpent = b.spent + txn.amount;
        let status = 'ok';
        if (newSpent > b.budgetAmount) status = 'exceeded';
        else if (newSpent > b.budgetAmount * 0.85) status = 'warning';
        return { ...b, spent: newSpent, status };
      }
      return b;
    });
    setBudgets(updatedBudgets);
    setTransactions([txn, ...transactions]);
  };

  const handleCsvUpload = async (file) => {
    const result = await uploadTransactionsCsv(file);
    // Refresh trend data so the chart reflects newly imported transactions
    fetchTrendData().then(data => setTrendData(data)).catch(console.error);
    return result;
  };

  const chartData = useMemo(() => {
    const data = budgets.map(b => ({ name: b.categoryName, value: b.spent }));
    return data.filter(d => d.value > 0);
  }, [budgets]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-slate-50 min-h-screen font-sans">
      
      {/* Row 1: Alerts over spending */}
      <BudgetAlerts budgets={budgets} />

      {/* Row 2: shows total limit, spending and leftover */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm">Total Budget Limit</p>
          <div className="flex items-center gap-2 mt-2">
            <DollarSign className="text-emerald-500" />
            <span className="text-2xl font-bold text-slate-800">
              ${budgets.reduce((acc, curr) => acc + Number(curr.budgetAmount), 0).toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm">Total Spent (Month)</p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp className="text-rose-500" />
            <span className="text-2xl font-bold text-slate-800">
               ${budgets.reduce((acc, curr) => acc + curr.spent, 0).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm">Remaining</p>
          <div className="flex items-center gap-2 mt-2">
            <Wallet className="text-violet-500" />
            <span className="text-2xl font-bold text-slate-800">
               ${(budgets.reduce((a, c) => a + Number(c.budgetAmount), 0) - budgets.reduce((a, c) => a + c.spent, 0)).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Investment & Upload Row (2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-40">
        <InvestedCard amount={investedAmount} />
        <CsvUploader onUpload={handleCsvUpload} />
      </div>

      {/* 4. Budgeting Action Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <BudgetManager
            budgets={budgets}
            onAddBudget={addNewBudget}
            onUpdateBudget={updateBudget}
            onDeleteBudget={deleteBudget}
         />
         <TransactionEntry budgets={budgets} onAddTransaction={addTransaction} />
         <TransactionHistory recentTransactions={transactions} />
      </div>

      {/* 5. Main Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SpendingBreakdown data={chartData} />
        <WealthForecast data={mockWealthData} />
      </div>

      {/* 6. Spending Trend Graph */}
      <SpendingTrend data={trendData} />


      {/* 8. Consistency Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-700">Financial Consistency Streak</h3>
        </div>
        <ContributionGraph />
      </div>
    </div>
  );
};

export default FinanceDashboard;