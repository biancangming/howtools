/**
 * @param  {string} str 首字母大写
 */
export function firstToUpper(str: string) {
    return str.trim().replace(str[0], str[0].toUpperCase());
}

/**
 * @param  {string} str 首字母小写
 */
export function firstToLower(str: string) {
    return str.trim().replace(str[0], str[0].toUpperCase());
}