const generateUniqueId = () => {
    return typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `txn_${Math.random().toString(36).substring(2, 15)}`;
};

export default generateUniqueId;
