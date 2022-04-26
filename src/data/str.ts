/**
 * @param  {string} str 首字母大写
 */
export function firstToUpper(str: string) {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1)
}

/**
 * @param  {string} str 首字母小写
 */
export function firstToLower(str: string) {
    return str.charAt(0).toLocaleLowerCase() + str.slice(1)
}

/**
 * @param  {string} str 传入要翻转的字符串
 */
export function strReverse(str: string) {
    str.split('').reverse().join('');
}

/**
 * @param  {string} str 移除所有的空格
 */
export function strRemoveSpace(str: string) {
    return str.replace(/\ +/g, "")
}