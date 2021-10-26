import { rows2columns, unique, arrMedian, columnData, arrSum, arrGroupBy } from './array';
const obja = [
    {
        age: "18",
        name: "张三",
        gender: "男",
    },
    {
        name: "张si",
        age: "12",
        gender: "男"
    },
    {
        name: "张麦子",
        age: "12",
        gender: "女"
    }
]
// 获取数组列数据
console.log(columnData(obja, "name"))
console.log("==============行转列=====================")

console.log(rows2columns(obja))
console.log(rows2columns(obja, {
    newColumns: ["张三", "张si", "张麦子"],
}))
console.log(rows2columns(obja, {
    newColumns: ["张三", "张si", "张麦子"],
    originColumns: ["name", "age", "gender"]
}))

console.log("==============数组去重=====================")
console.log(unique(obja, "gender"))
console.log(unique([1, 2, 34, 5, 6, 7, 2, 1]))

console.log("==============数组求和=====================")
console.log(arrSum([1, 2, 34, 5, 6, 7, 2, 1]))
console.log(arrSum(obja, "age"))

console.log("==============数组分组=====================")
console.log(arrGroupBy([1, 2, 34, 5, 6, 7, 2, 1]))
console.log(arrGroupBy(obja, "age"))

console.log("==============数组中位数=====================")
const orgArr = [1, 10, 30, 2, 5, 6, 7]
console.log("数组中位数", arrMedian(orgArr))
console.log(orgArr)