import { typeOf } from '../utils/type';
export function deepClone<T>(data: any): T {
    const type = typeOf(data)
    let obj
    if (type === 'Array') {
        obj = []
    } else if (type === 'Object') {
        obj = {}
    } else {
        // 不再具有下一层次
        return data
    }
    if (type === 'Array') {
        for (let i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]))
        }
    } else if (type === 'Object') {
        for (const key in data) {
            obj[key] = deepClone(data[key])
        }
    }
    return obj
}