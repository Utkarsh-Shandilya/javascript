import generateUniqueId from './generateUniqueId';
import createDownloadableLink from './createDownloadableLink';
import formatCurrency from './formatCurrency';
import recordTransaction from './recordTransaction';

const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

export { generateUniqueId, createDownloadableLink, formatCurrency, recordTransaction, isNumeric };
