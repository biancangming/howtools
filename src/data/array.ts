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


/**
 * 求数组中位数
 * @param  {number[]} arr 数组
 */
export function arrMedian(arr: number[]) {
    arr.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    })

    const len = arr.length

    if (len % 2 == 0) {
        return (arr[len / 2 - 1] + arr[len / 2]) / 2;
    } else {
        return arr[Math.floor(len / 2)];
    }
};