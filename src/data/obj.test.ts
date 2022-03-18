import { objDefVal, objEntries, objToBase64, base64Toobj } from './obj';
const obj = { a: '章口就来', b: "麻子哥", c: undefined }
console.log("=========测试对象迭代===============")
for (const [key, val] of objEntries(obj)) {
    console.log(key, val)
}
console.log("=========给对象创建默认值===============")
const fix = { c: '1' }
interface Obj {
    a: string,
    b: string,
    c: undefined | number
}
console.log(objDefVal<Obj>(obj, fix), obj)

console.log("=============对象base64互转===============")

const base = objToBase64(obj)
console.log({ base })
console.log("还原对象==>", base64Toobj(base))