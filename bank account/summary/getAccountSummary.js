const getAccountSummary = (transactions, balance, cachedSummary, lastTransactionCount) => {
    if (cachedSummary && transactions.length === lastTransactionCount) return cachedSummary;

    const amountMemo = { deposits: 0, withdrawals: 0 };
    let totalAmount = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'deposit') {
            amountMemo.deposits += transaction.amount;
        } else if (transaction.type === 'withdrawal') {
            amountMemo.withdrawals += transaction.amount;
        }
    });

    totalAmount = amountMemo.deposits + amountMemo.withdrawals;

    const percentageDeposits = `${totalAmount ? ((amountMemo.deposits / totalAmount) * 100).toFixed(2) : 0}%`;
    const percentageWithdrawals = `${totalAmount ? ((amountMemo.withdrawals / totalAmount) * 100).toFixed(2) : 0}%`;

    cachedSummary = {
        ...amountMemo,
        currentBalance: balance,
        percentageDeposits,
        percentageWithdrawals,
    };

    lastTransactionCount = transactions.length;
    return cachedSummary;
};

export default getAccountSummary;
