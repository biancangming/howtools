import { typeOf } from '../utils/type';

/**
 * @param  {any} data
 * @returns T
 * @description 浅克隆
 */
export function shallowClone<T = unknown>(data: any): T {
    let obj
    switch (typeOf(data)) {
        case 'Array':
            obj = [];
            for (const val of data) {
                obj.push(val)
            }
            break;
        case 'Object':
            obj = {};
            for (const [key, val] of Object.entries(data)) {
                obj[key] = val
            }
            break;
        default:
            obj = data
    }
    return obj
}
/**
 * @param  {any} data
 * @returns T
 * @description 深克隆
 */
export function deepClone<T>(data: any): T {
    let obj
    switch (typeOf(data)) {
        case 'Array':
            obj = [];
            for (const val of data) {
                obj.push(deepClone(val))
            }
            break;
        case 'Object':
            obj = {};
            for (const [key, val] of Object.entries(data)) {
                obj[key] = deepClone(val)
            }
            break;
        default:
            obj = data
    }
    return obj
}