export const setLocalData = (key, value) => {
    if (key === '' || value === '' || !key || !value) return
    localStorage.setItem(key, value);
}

export const getLocalData = (key) => {
    if (key === '' || !key) return
    return localStorage.getItem(key) ? localStorage.getItem(key) : null;
}