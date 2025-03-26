function BankAccount(initialAmount = 0) {
    let balance = initialAmount;
    const transactions = [];
    let cachedSummary = null;
    let lastTransactionCount = 0;

    function generateUniqueId() {
        return typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `txn_${Math.random().toString(36).substring(2, 15)}`;
    }

    function recordTransaction(type, amount, lastBalance, newBalance) {
        const transaction = { id: generateUniqueId(), type, amount, lastBalance, balance: newBalance, timestamp: new Date().toLocaleString() };
        transactions.push(transaction);
        balance = newBalance;
        cachedSummary = null;
    }

    function deposit(depositAmount) {
        if (depositAmount <= 0) {
            return `Deposit amount must be greater than zero.`;
        }
        const newBalance = parseFloat((balance + depositAmount).toFixed(2));
        recordTransaction('deposit', depositAmount, balance, newBalance);
        return `Deposited: ${depositAmount}.New balance: ${balance}`;
    }

    function withdraw(withdrawAmount) {
        if (withdrawAmount <= 0) {
            return 'Withdraw amount must be greater than zero.';
        }
        if (withdrawAmount > balance) {
            return 'Insufficient balance.';
        }
        const newBalance = parseFloat((balance - withdrawAmount).toFixed(2));
        recordTransaction('withdrawal', withdrawAmount, balance, newBalance);
        return `Withdrawn: ${withdrawAmount}. New balance: ${balance}`;
    }

    function checkBalance() {
        return `Current Bank Account Balance: ${balance}`;
    }

    function getAllTransactions() {
        return transactions;
    }

    function getTransactionById(id) {
        const transaction = transactions.find((txn) => txn.id === id);
        return transaction || `Transaction with ID ${id} not found.`;
    }

    function getTransactions({ type, value }) {
        if (!['type', 'amount', 'lastBalance', 'balance', 'timestamp'].includes(type)) {
            return `Invalid type provided. Please use 'type', 'amount', 'lastBalance', 'balance', or 'timestamp'.`;
        }
        return transactions.filter(transaction => String(transaction[type]).toLowerCase() === String(value).toLowerCase());
    }

    // function getTransactions(payload) {
    //     const { filters, sort, pageNumber, pageSize } = payload;

    // }

    function getAccountSummary() {
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
    }

    function exportTransactionHistoryAsCSV() {
        if (transactions.length === 0) return `No transactions found!`;
        const headers = ['ID', 'Type', 'Amount', 'Last Balance', 'Balance', 'Timestamp'];
        const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
        const csvRows = transactions.map(transaction =>
            `${transaction.id},${transaction.type},${formatCurrency(transaction.amount)},${formatCurrency(transaction.lastBalance)},${formatCurrency(transaction.balance)},"${transaction.timestamp}"`
        );
        const summary = getAccountSummary();
        const summaryRow = `Summary,Deposits: ${summary.deposits},Withdrawals: ${summary.withdrawals},Balance: ${summary.currentBalance},`;
        const csvContent = ['\uFEFF' + headers.join(','), ...csvRows, summaryRow].join('\n');
        createDownlableLink(csvContent, 'csv');
    }

    function exportTransactionHistoryAsJSON() {
        if (transactions.length === 0) return `No transactions found!`;
        const jsonContent = JSON.stringify({ transactions, summary: getAccountSummary() }, null, 2);
        createDownlableLink(jsonContent, 'json');
    }

    function createDownlableLink(content, format) {
        const memo = { csv: `text/csv`, json: `application/json` };
        const blob = new Blob([content], { type: memo[format] });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        const fileName = `transaction_history_${new Date().toISOString().replace(/[:.]/g, '-')}.${format.toLowerCase()}`;
        link.download = fileName;
        link.click();

        URL.revokeObjectURL(url);
        return `Transaction history exported as ${format.toUpperCase()}.`;
    }

    function exportTransactionHistory(format) {
        if (!['csv', 'json'].includes(format.toLowerCase())) return `Unsupported format. Please use 'csv' or 'json'.`;
        if (transactions.length === 0) return `No transactions found!`;
        setTimeout(() => {
            format === 'json' ? exportTransactionHistoryAsJSON() : exportTransactionHistoryAsCSV();
        }, 10);
        return `Preparing ${format.toUpperCase()} export...`;
    }

    return {
        deposit,
        withdraw,
        checkBalance,
        getAllTransactions,
        getTransactions,
        getAccountSummary,
        exportTransactionHistoryAsCSV,
        exportTransactionHistoryAsJSON,
        exportTransactionHistory,
        getTransactionById
    };
};