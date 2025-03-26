import createDownloadableLink from '../utils/createDownloadableLink';

const exportAsJSON = (transactions) => {
    const jsonContent = JSON.stringify({ transactions }, null, 2);
    createDownloadableLink(jsonContent, 'json');
};

export default exportAsJSON;
