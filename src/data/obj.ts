//对象相关操作

type Key = string | number | symbol
export type UnknowObj = Record<Key, any>

/**
 * @param  {UnknowObj} obj
 * @description 返回一个对象的迭代器
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
 * @param  {UnknowObj} origin 原始对象
 * @param  {UnknowObj} fix? 修复默认值对象
 * @param  isFixSource ? 是否修改源数据
 * @description 给对象创建默认值
 */
export function objDefVal<T extends UnknowObj>(origin: UnknowObj = {}, fix: UnknowObj = {}, isFixSource = true): T {
    const targetObj: UnknowObj = {}
    for (const [key] of objEntries(origin)) targetObj[key] = fix[key] ?? origin[key]
    if (isFixSource) {
        console.log({ targetObj })
        return Object.assign(origin, targetObj)
    }
    return targetObj
}

