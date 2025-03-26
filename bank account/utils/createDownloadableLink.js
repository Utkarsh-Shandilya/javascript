const createDownloadableLink = (content, format) => {
    const mimeTypes = { csv: 'text/csv', json: 'application/json' };
    const blob = new Blob([content], { type: mimeTypes[format] });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `transaction_history_${new Date().toISOString().replace(/[:.]/g, '-')}.${format}`;
    link.click();

    URL.revokeObjectURL(url);
};

export default createDownloadableLink;
