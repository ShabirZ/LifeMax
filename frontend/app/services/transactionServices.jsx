import { getTransactions, importTransactions, createTransaction as apiCreateTransaction } from "~/api/finance/transactionAPI";

const toISODate = (date) => date.toISOString().split("T")[0];

export const getTransactionsByRange = async (start, end) => {
    const response = await getTransactions(toISODate(start), toISODate(end));
    if (!response.ok) throw new Error("Failed to fetch transactions");
    return response.json();
};

export const getMonthlyTransactions = async () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return getTransactionsByRange(start, end);
};

export const uploadTransactionsCsv = async (file) => {
    const response = await importTransactions(file);
    if (!response.ok) {
        throw new Error("Failed to import CSV");
    }
    return response.json(); // { imported: number, skipped: number }
};

export const fetchTrendData = async () => {
    /*

      const trendData = [
        { date: 'Week 1', amount: 450 }, { date: 'Week 2', amount: 920 }, 
        { date: 'Week 3', amount: 300 }, { date: 'Week 4', amount: 550 },
    ];

    */
    const monthlyTransactions = await getMonthlyTransactions();
    const weeklyData = [0, 0, 0, 0];
    monthlyTransactions.forEach(txn => {
        const txnDate = new Date(txn.transactionDate);
        const weekIndex = Math.floor((txnDate.getDate() - 1) / 7);
        weeklyData[weekIndex] += Number(txn.amount);
    });
    return weeklyData.map((amount, index) => ({
        date: `Week ${index + 1}`,
        amount,
    }));
}

export const getAllTransactions = async () => {
    const response = await getTransactions();
    if (!response.ok) throw new Error("Failed to fetch transactions");
    return response.json();
};

export const createTransaction = async (transaction) => {
    const response = await apiCreateTransaction(transaction);
    if (!response.ok) {
        throw new Error("Failed to add transaction");
    }
};

