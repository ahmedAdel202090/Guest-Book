export const required = (value) => value && value.length;

export const isName = (value) => {
    if(value == null) return false;
    const regex = /[A-Z][a-z]{2,}(\s[A-Z][a-z]{2,}|^$)/g;
    const matched = String(value).match(regex);
    return matched!=null && matched.length>0 && matched[0] === String(value);
};