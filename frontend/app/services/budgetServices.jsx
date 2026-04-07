import { getBudgets } from "../api/finance/budgetAPI";
import { getTransactions } from "../api/finance/transactionAPI";

const getStartOfCurrentMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
};

export const fetchBudgets = async () => {
    /*
        const [budgets, setBudgets] = useState([
        { category: 'Food', limit: 600, spent: 450, status: 'ok' },
        { category: 'Transport', limit: 500, spent: 450, status: 'warning' },
        { category: 'Housing', limit: 2600, spent: 2500, status: 'ok' },
        ]);
    */
    const budgetRequest = await getBudgets();
    if (!budgetRequest.ok) {
        throw new Error("Failed to fetch budgets");
    }
    const budgetData = await budgetRequest.json();

    const transactionRequest = await getTransactions();
    if (!transactionRequest.ok) {
        throw new Error("Failed to fetch transactions");
    }
    const transactionData = await transactionRequest.json();

    const startOfMonth = getStartOfCurrentMonth();

    const budgetsWithSpending = budgetData.map(budget => {
        const spent = transactionData
            .filter(txn => txn.category === budget.categoryName)
            .filter(txn => new Date(txn.transactionDate) >= startOfMonth)
            .reduce((sum, txn) => sum + Number(txn.amount), 0);

        let status = "ok";
        if (spent > budget.budgetAmount) status = "exceeded";
        else if (spent > budget.budgetAmount * 0.85) status = "warning";

        return { ...budget, spent, status };
    });

    return budgetsWithSpending;
};
