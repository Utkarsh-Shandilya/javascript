import createDownloadableLink from '../utils/createDownloadableLink';

const exportAsCSV = (transactions) => {
    const headers = ['ID', 'Type', 'Amount', 'Last Balance', 'Balance', 'Timestamp'];
    const csvRows = transactions.map(txn =>
        `${txn.id},${txn.type},${txn.amount},${txn.lastBalance},${txn.balance},"${txn.timestamp}"`
    );
    const csvContent = ['\uFEFF' + headers.join(','), ...csvRows].join('\n');
    createDownloadableLink(csvContent, 'csv');
};

export default exportAsCSV;
