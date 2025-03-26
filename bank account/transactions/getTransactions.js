const getTransactions = (transactions, { type, value }) => {
    const validTypes = ['type', 'amount', 'lastBalance', 'balance', 'timestamp'];

    if (!validTypes.includes(type)) {
        return `Invalid type provided. Please use 'type', 'amount', 'lastBalance', 'balance', or 'timestamp'.`;
    }

    return transactions.filter(transaction =>
        String(transaction[type]).toLowerCase() === String(value).toLowerCase()
    );
};

export default getTransactions;
