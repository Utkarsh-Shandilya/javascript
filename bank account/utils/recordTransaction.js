import generateUniqueId from './generateUniqueId';

const recordTransaction = (type, amount, lastBalance, newBalance, transactions) => {
    const transaction = {
        id: generateUniqueId(),
        type,
        amount,
        lastBalance,
        balance: newBalance,
        timestamp: new Date().toLocaleString(),
    };
    transactions.push(transaction);
};

export default recordTransaction;
