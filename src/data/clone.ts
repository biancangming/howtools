import { typeOf } from '../utils/type';

/**
 * @param  {any} data
 * @returns T
 * @description 浅克隆
 */
export function shallowClone<T extends any>(data: T): T {
    let obj
    const t = typeOf(data)
    const reference = ["Set", "WeakSet", "Map", "WeakMap", "RegExp", "Date", "Error"];
    if (reference.includes(t)) {
        obj = Object.prototype.constructor(data)
    }

    switch (t) {
        case 'Array':
            obj = [];
            for (const val of data as []) {
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
export function deepClone<T extends any>(data: T): T {
    let obj
    const t = typeOf(data)
    const reference = ["Set", "WeakSet", "Map", "WeakMap", "RegExp", "Date", "Error"];
    if (reference.includes(t)) {
        obj = Object.prototype.constructor(data)
    }

    // 对象列表的拷贝
    switch (t) {
        case 'Array':
            obj = [];
            for (const val of data as []) {
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