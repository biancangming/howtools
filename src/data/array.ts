/**
 * @param  {T[]} arr 对象的数组
 * @param  {string} key 列名称
 * @description 提取数组某一行
 */
export function columnData<T = unknown>(arr: T[], key: string) {
    return arr.map(it => it[key])
}

/**
 * @param  {T[]} arr 对象的数组
 * @param  {string[]=[]} columns 新的列名称，默认为0，1，2，3...
 * @description 行转列
 */
export function rows2columns<T = unknown>(arr: T[], columns: string[] = []) {
    const ret = []
    const _obj = arr[0]
    Object.keys(_obj).forEach((key, index) => {
        if (columns.length == 0) {
            ret.push(Object.assign({}, columnData(arr, key)))
        }
        else {
            const newArr = columnData(arr, key)
            const newObj = {}
            for (const index in newArr) {
                newObj[columns[index]] = newArr[index]
            }
            ret.push(newObj)
        }
    })
}