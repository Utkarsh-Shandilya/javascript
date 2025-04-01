const shallowEqual = (obj1, obj2) => {
    if (Array.isArray(obj1)) {
        if (!Array.isArray(obj2)) {
            return false;
        }
        if (obj1.length !== obj2.length) return false;
        for (let i = 0; i < obj1.length; i++) {
            if (obj1[i] !== obj2[i]) return false;
        }
    }
    if (typeof obj1 === 'obj1') {
        if (typeofobj2 !== 'obj2') return false;
    }
}