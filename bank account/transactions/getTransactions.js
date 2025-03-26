import { isNumeric } from '../utils/index';

const getTransactionsFiltered = (filters = [], transactions = []) => {
    if (filters.length < 1 || transactions.length < 1) return transactions;

    const headers = ['type', 'amount', 'lastBalance', 'balance', 'timestamp'];

    filters.forEach(({ type, value, operator = 'eq' }) => {
        if (headers.includes(type)) {
            transactions = transactions.filter((transaction) => {
                const transactionValue = transaction[type];

                if (isNumeric(transactionValue) && isNumeric(value)) {
                    const numValue = parseFloat(value);
                    const numTransactionValue = parseFloat(transactionValue);

                    switch (operator) {
                        case '>':
                            return numTransactionValue > numValue;
                        case '<':
                            return numTransactionValue < numValue;
                        case '>=':
                            return numTransactionValue >= numValue;
                        case '<=':
                            return numTransactionValue <= numValue;
                        default:
                            return numTransactionValue === numValue;
                    }
                }

                const strTransactionValue = String(transactionValue).toLowerCase();
                const strValue = String(value).toLowerCase();

                return operator === 'contains'
                    ? strTransactionValue.includes(strValue)
                    : strTransactionValue === strValue;
            });
        }
    });

    return transactions;
};

const getTransactionsSorted = (sort = { type: 'timestamp', value: 'asc' }, transactions = []) => {
    if (transactions.length < 1) return transactions;

    const { type, value = 'asc' } = sort;
    const headers = ['type', 'amount', 'lastBalance', 'balance', 'timestamp'];

    if (!headers.includes(type)) {
        console.warn(`Invalid sort type: ${type}`);
        return transactions;
    }

    const sortedTransactions = [...transactions];

    sortedTransactions.sort((a, b) => {
        const aValue = a[type];
        const bValue = b[type];

        if (isNumeric(aValue) && isNumeric(bValue)) {
            return value === 'asc' ? aValue - bValue : bValue - aValue;
        }

        if (type === 'timestamp') {
            return value === 'asc'
                ? new Date(aValue) - new Date(bValue)
                : new Date(bValue) - new Date(aValue);
        }

        const aStrValue = String(aValue).toLowerCase();
        const bStrValue = String(bValue).toLowerCase();
        return value === 'asc' ? aStrValue.localeCompare(bStrValue) : bStrValue.localeCompare(aStrValue);
    });

    return sortedTransactions;
};

const getTransactionsPaginated = ({ pageNumber = 1, pageSize = 10 }, transactions = []) => {
    if (pageNumber < 1 || pageSize < 1) {
        console.warn(`Invalid pagination values. Using default pageNumber=1 and pageSize=10.`);
        pageNumber = 1;
        pageSize = 10;
    }

    const startIndex = (pageNumber - 1) * pageSize;
    const paginatedTransactions = transactions.slice(startIndex, startIndex + pageSize);

    return paginatedTransactions.length > 0 ? paginatedTransactions : [];
};

const getFilteredTransactions = (transactions, payload) => {
    const {
        filters = [],
        sort = { type: 'timestamp', value: 'asc' },
        pageNumber = 1,
        pageSize = 10,
    } = payload;

    let filteredTransactions = getTransactionsFiltered(filters, transactions);

    filteredTransactions = getTransactionsSorted(sort, filteredTransactions);

    const paginatedTransactions = getTransactionsPaginated(
        { pageNumber, pageSize },
        filteredTransactions
    );

    return {
        totalTransactions: filteredTransactions.length,
        totalPages: Math.ceil(filteredTransactions.length / pageSize),
        currentPage: pageNumber,
        transactions: paginatedTransactions,
    };
};

export default getFilteredTransactions;
