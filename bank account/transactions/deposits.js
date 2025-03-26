import recordTransaction from '../utils/recordTransaction';

const deposit = (amount, transactions, balance) => {
    if (amount <= 0) return 'Deposit amount must be greater than zero.';
    const newBalance = parseFloat((balance + amount).toFixed(2));
    recordTransaction('deposit', amount, balance, newBalance, transactions);
    return `Deposited: ${amount}. New balance: ${newBalance}`;
};

export default deposit;
