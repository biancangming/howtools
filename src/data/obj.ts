import { Base64 } from '../utils/base64';
import { isJSON } from '../utils/util';
//对象相关操作

type Key = string | number | symbol
export type UnknowObj = Record<Key, any>

/**
 * @param  {UnknowObj} obj
 * @description 返回一个对象的迭代器
 * @deprecated 建议用ES6 Object.entries 代替
 * for (const [key, value] of createObjIterator(origin)){
 *     
 * }
 */
export function objEntries(obj: UnknowObj) {
    let count = 0;//迭代计数器
    const keys = Reflect.ownKeys(obj) //对象长度
    const len = keys.length
    return {
        [Symbol.iterator]: function () {
            return {
                next: function () {
                    const key = keys[count]
                    count += 1
                    return {
                        done: count > len,
                        value: [key, obj[key]]
                    };
                }
            }
        }
    }
}

/**
 * @param  {UnknowObj} target 原始对象
 * @param  {UnknowObj} source 修复默认值对象
 * @param  isFixSource ? 是否修改源数据
 * @description 给对象创建默认值
 */
export function objDefVal<T extends UnknowObj>(target: UnknowObj = {}, source: UnknowObj = {}, isFixSource = true): T {
    const _targetObj: UnknowObj = {}
    for (const [key] of Object.entries(target)) _targetObj[key] = source[key] ?? target[key]
    if (isFixSource) {
        return Object.assign(target, _targetObj)
    }
    return _targetObj
}

/**
 * @param  {T} data 传入的对象
 */
export function objToBase64<T extends object>(data: T) {
    return new Base64().encode(JSON.stringify(data))
}

/**
 * @param  {string} data 传入base64数据
 * @returns Partial
 */
export function base64Toobj<T extends object>(data: string): Partial<T> {
    const restJson = new Base64().decode(data)
    if (isJSON(restJson)) {
        return JSON.parse(restJson)
    }
    return {}
}