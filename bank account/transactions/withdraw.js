import recordTransaction from '../utils/recordTransaction';

const withdraw = (amount, transactions, balance) => {
    if (amount <= 0) return 'Withdraw amount must be greater than zero.';
    if (amount > balance) return 'Insufficient balance.';

    const newBalance = parseFloat((balance - amount).toFixed(2));
    recordTransaction('withdrawal', amount, balance, newBalance, transactions);
    return `Withdrawn: ${amount}. New balance: ${newBalance}`;
};

export default withdraw;
