import { getBudgets, deleteBudget, updateBudgetAmount, updateBudgetName } from "../api/finance/budgetAPI";

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

export const deleteBudgetService = async (categoryName) => {
    const deleteResponse = await deleteBudget({ category: categoryName });
    if (!deleteResponse.ok) {
        throw new Error("Failed to delete budget");
    }
    return true;
};

export const updateBudgetAmountService = async (categoryName, amount) => {
    const response = await updateBudgetAmount({ category: categoryName, amount });
    if (!response.ok) {
        throw new Error("Failed to update budget amount");
    }
    return true;
};

export const updateBudgetNameService = async (categoryName, newCategoryName) => {
    const response = await updateBudgetName({ category: categoryName, newCategory: newCategoryName });
    if (!response.ok) {
        throw new Error("Failed to update budget name");
    }
    return true;
};
