import exportAsCSV from './exportAsCSV';
import exportAsJSON from './exportAsJSON';

const exportTransactionHistory = (transactions, format) => {
    if (!['csv', 'json'].includes(format.toLowerCase())) {
        return `Unsupported format. Please use 'csv' or 'json'.`;
    }
    if (transactions.length === 0) {
        return `No transactions found!`;
    }
    format === 'json' ? exportAsJSON(transactions) : exportAsCSV(transactions);
    return `Preparing ${format.toUpperCase()} export...`;
};

export { exportAsCSV, exportAsJSON, exportTransactionHistory };
