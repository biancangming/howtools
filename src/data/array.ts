import { isFunction, isEmpty } from '../utils/type';
import { deepClone } from './clone';

type callbackFunc<T> = (data: T, idx?: number) => any;

/**
 * @param  {T[]} arr 对象的数组
 * @param  {string} key 列名称
 * @description 提取数组某一行
 */
export function columnData<T extends object>(arr: T[], key: keyof T) {
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
export function rows2columns<T extends object>(arr: T[], columns: rows2columnsOptions = {}) {
    const ret = []
    const _obj = arr[0]
    const originCol = columns.originColumns || Object.keys(_obj)
    originCol.forEach((key) => {
        const newCol = columns.newColumns || [];
        const newArr = columnData(arr, key as keyof T)
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
export function arrSum<T extends object>(arr: T[], key?: T extends object ? keyof T : null): number {
    const tempArr = (key ? columnData(arr, key) : arr) as unknown[] as number[];

    return tempArr.reduce((previousValue, currentValue) => {
        if (isNaN(previousValue)) throw new Error(`非数字不能进行求和计算!, 数组: ${tempArr}, key: ${key}`)
        return previousValue + currentValue
    }, 0)
}

/**
 * 数组分组
 * @param arr 对象数组 或者 基础类型数组
 * @param key 列名称 或者 函数
 */
type GroupByCallbackfn<T> = (value: T, index: number) => boolean
export function arrGroupBy<T>(arr: T[], key?: T extends object ? keyof T | GroupByCallbackfn<T> : GroupByCallbackfn<T>) {
    const ret = {} as Record<string, T[]>, isFunc = isFunction(key);
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
export function arrChunk<T extends object>(arr: T[], size = 0): T[][] {
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
export function arrSplit<T extends object>(arr: T[], num = 0): T[][] {
    if (arr.length <= 0) return [arr];

    let groupSize = Math.ceil(arr.length / num);
    return arrChunk<T>(arr, groupSize);
}

/**
 * @param  {T[][]} ...args 传入多个数组
 * @description 将多个数组进行合并
 */
export function arrMerge<T extends object>(...args: T[][]) {
    return args.reduce((previousValue, currentValue) => [...previousValue, ...currentValue])
}

interface ArrToTreeOptions<T> {
    id?: keyof T;//主键
    pid?: keyof T;//父节点键
    children?: keyof T;//字集数组的键
}
/**
 * @param  {T[]} arr 原始数组
 * @param  {ArrToTreeOptions} options 替换列表中对应的主键、关联键、子数据集
 * @description 数组转换成树结构
 */
export function arrToTree<T extends object>(arr: T[], options: ArrToTreeOptions<T>): T[] {
    const { id = "id", pid = "pid", children = "children" } = options

    const _group = arrGroupBy(arr, pid as any)

    const top = _group['null'] || _group['undefined'] || _group['']

    if (Object.keys(_group).length <= 1) {
        console.warn("howtools, Check that your settings are correct , id / pid / children")
        return top
    }

    /**
     * @param  {any[]} _arr 上一层数据组成的数组
     */
    const _setChildren = (_arr) => {
        for (const _item of _arr) {
            _item[children] = _group[_item[id]] || []
            _setChildren(_item[children])
        }
    }

    _setChildren(top)
    return top
}

/**
 * @param  {T[]} arr 传入的数组
 * @param  {Pick<ArrToTreeOptions} options?
 * @param  {} 'children'> 替换列表中对应的主键、关联键、子数据集
 */
export function treeToArr<T>(arr: T[], options?: Pick<ArrToTreeOptions<T>, 'children'>): T[] {
    const { children = 'children' } = options || {}
    const result = []
    const _getChildren = (_arr) => {
        for (const _item of _arr) {
            const childrenArr = _item[children]
            if (!isEmpty(childrenArr)) _getChildren(childrenArr)
            const backItem = deepClone(_item)
            delete backItem[children]
            result.push(backItem)
        }
    }
    _getChildren(arr)
    return result
}

/**
 * 求数组排序
 * @param arr 数组
 * @param key 列名称, 数组或字符串不能为null
 * @param sort 排序方式 asc 升序 desc 降序 默认升序
 */
export function arrSort<T extends object | string | number | symbol>(
    arr: T[],
    options?: { key?: T extends object ? keyof T : undefined | null; sort?: 'desc' | 'asc' }) {

    if (isEmpty(arr)) return []

    const { key, sort = 'asc' } = options || {}
    const MARKER = sort === 'asc' ? 1 : -1

    const compareFn = ((a, b) => {
        const aValue = key ? a[key] : a;
        const bValue = key ? b[key] : b;
        if (aValue > bValue) {
            return MARKER
        } else if (aValue < bValue) {
            return -MARKER;
        } else {
            return MARKER - MARKER;
        }
    })

    arr.sort(compareFn)
}
