//对象相关操作

type Key = string | number | symbol
type UnknowObj = Record<Key, any>

/**
 * @param  {UnknowObj} obj
 * @description 返回一个对象的迭代器
 * for (const [key, value] of createObjIterator(origin)){
 *     
 * }
 */
export function objEntries(obj: UnknowObj) {
    let count = 0;//迭代计数器
    const keys = Object.keys(obj) //对象长度
    const len = keys.length
    return {
        [Symbol.iterator]: function () {
            return {
                next: function () {
                    const done = count >= len;
                    const key = keys[count]
                    count += 1
                    const value: [Key, any] = [key, obj[key]]
                    return {
                        done,
                        value
                    };
                }
            }
        }
    }
}

/**
 * @param  {UnknowObj} origin 原始对象
 * @param  {UnknowObj} fix? 修复默认值对象
 * @description 给对象创建默认值
 */
export function objDefVal<T extends UnknowObj>(origin: UnknowObj = {}, fix: UnknowObj = {}): T {
    const targetObj: UnknowObj = {}
    const originObjEntries = objEntries(origin)
    for (const [key] of originObjEntries) {
        targetObj[key] = fix[key] ? fix[key] : origin[key]
    }
    return targetObj
}

