import {
    deposit,
    withdraw,
    getAllTransactions,
    getTransactionById,
    getTransactions,
} from './transactions';

import { getAccountSummary } from './summary';
import { exportTransactionHistory } from './exports';

function BankAccount(initialAmount = 0) {
    let balance = initialAmount;
    const transactions = [];
    let cachedSummary = null;
    let lastTransactionCount = 0;

    return {
        deposit: (amount) => deposit(amount, transactions, balance),
        withdraw: (amount) => withdraw(amount, transactions, balance),
        checkBalance: () => `Current Bank Account Balance: ${balance}`,
        getAllTransactions,
        getTransactionById,
        getTransactions,
        getAccountSummary: () => getAccountSummary(transactions, balance, cachedSummary, lastTransactionCount),
        exportTransactionHistory: (format) => exportTransactionHistory(transactions, format),
    };
}

export default BankAccount;
