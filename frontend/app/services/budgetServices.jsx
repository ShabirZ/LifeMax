import { getBudgets } from "../api/finance/budgetAPI";

const getStartOfCurrentMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
};

export const fetchBudgets = async (transactions) => {
    const budgetRequest = await getBudgets();
    if (!budgetRequest.ok) {
        throw new Error("Failed to fetch budgets");
    }
    const budgetData = await budgetRequest.json();

    const startOfMonth = getStartOfCurrentMonth();

    const budgetsWithSpending = budgetData.map(budget => {
        const spent = transactions
            .filter(txn => txn.category === budget.categoryName)
            .filter(txn => new Date(txn.transactionDate) >= startOfMonth)
            .reduce((sum, txn) => sum + Number(txn.amount), 0);

        let status = "ok";
        if (spent > budget.budgetAmount) status = "exceeded";
        else if (spent > budget.budgetAmount * 0.85) status = "warning";

        return { ...budget, spent, status };
    });
    console.log(budgetsWithSpending);
    return budgetsWithSpending;
};
