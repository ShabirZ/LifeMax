import { getTransactions } from "~/api/finance/transactionAPI";

export const getMonthlyTransactions = async () => {
    const response = await getTransactions();
    if (!response.ok) {
        throw new Error("Failed to fetch transactions");
    }
    const transactions = await response.json();

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(startOfMonth.getMonth() + 1);

    return transactions.filter(txn => {
        const txnDate = new Date(txn.transactionDate);
        return txnDate >= startOfMonth && txnDate < endOfMonth;
    });
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

