import { isFunction } from "../utils/type";

/**
 * @param  {T[]} arr 对象的数组
 * @param  {string} key 列名称
 * @description 提取数组某一行
 */
export function columnData<T = unknown>(arr: T[], key: string) {
    return arr.map(it => it[key])
}


interface rows2columnsOptions {
    newColumns?: string[],//新列顺序
    originColumns?: string[],//原列顺序
}

/**
 * @param  {T[]} arr
 * @param  {rows2columnsOptions} columns
 */
export function rows2columns<T = unknown>(arr: T[], columns: rows2columnsOptions = {}) {
    const ret = []
    const _obj = arr[0]
    const originCol = columns.originColumns || Object.keys(_obj)
    originCol.forEach((key) => {
        const newCol = columns.newColumns || [];
        const newArr = columnData(arr, key)
        if (newCol.length == 0) {
            ret.push(Object.assign({}, newArr))
        }
        else {
            const newObj = {}
            for (const index in newArr) {
                newObj[newCol[index]] = newArr[index]
            }
            ret.push(newObj)
        }
    })
    return ret
}


/**
 * @param  {[]} arr 一个数组
 * @param  {string} key? 假如是对象数组，则传入要去重的key值
 * @description 数组去重
 */
export function unique<T = unknown>(arr: T[], key?: string) {
    const seen = new Map()
    if (!key) return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
    return arr.filter((a) => !seen.has(a[key]) && seen.set(a[key], 1))
}

/**
 * 数组求和
 * @param arr 对象数组 或者 数字数组
 * @param key 列名称
 */
export function arrSum<T>(arr: T[], key?: string): number {
    const tempArr = key ? columnData(arr, key) : arr;
    return tempArr.reduce((temp, cur) => {
        if (isNaN(cur)) throw new Error(`非数字不能进行求和计算!, 数组: ${tempArr}, key: ${key}`)
        return temp + Number(cur)
    }, 0)
}


type callbackFunc<T> = (data: T, idx?: number) => any;
/**
 * 数组分组
 * @param arr 对象数组 或者 基础类型数组
 * @param key 列名称 或者 函数
 */
export function arrGroupBy<T>(arr: T[], key?: string | callbackFunc<T>): Object {
    const ret = {}, isFunc = isFunction(key);
    arr.forEach((o, idx) => {
        const value = key ? isFunc ? (key as callbackFunc<T>)(o, idx) : o[key as string] : o;
        ret.hasOwnProperty(value) ? ret[value].push(o) : ret[value] = [o];
    })
    return ret;
}

/**
 * 求数组中位数
 * @param  {number[]} arr 数组
 */
export function arrMedian(arr: number[]) {
    //[...arr]复制中位数，防止修改外部列表
    const tempArr = [...arr].sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    })

    const len = tempArr.length

    if (len % 2 == 0) {
        return (tempArr[len / 2 - 1] + tempArr[len / 2]) / 2;
    } else {
        return tempArr[Math.floor(len / 2)];
    }
}


/**
 * @param  {T[]} arr
 * @param  {} size=0
 * @returns T
 * @description 将数组分割成大小为 size 的数组，组成新数组
 */
export function arrChunk<T = any>(arr: T[], size = 0): T[][] {
    if (size == 0) return [arr]
    let chunks = [];
    for (let i = 0; i < arr.length; i = i + size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks
}


/**
 * @param  {T[]} arr
 * @param  {} num=0
 * @returns T
 * @description 将数组分为num等份
 */
export function arrSplit<T = any>(arr: T[], num = 0): T[][] {
    if (arr.length <= 0) return [arr];

    let groupSize = Math.ceil(arr.length / num);
    return arrChunk<T>(arr, groupSize);
}