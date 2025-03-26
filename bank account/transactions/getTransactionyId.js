const getTransactionById = (transactions, id) => {
    const transaction = transactions.find((txn) => txn.id === id);
    return transaction || `Transaction with ID ${id} not found.`;
};

export default getTransactionById;
