import { rows2columns, unique } from './array';

console.log("==============行转列=====================")
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

console.log(rows2columns(obja, {
    newColumns: ["张三", "张si"],
    originColumns: ["name", "age", "gender"]
}))

console.log("==============数组去重=====================")

console.log(unique(obja, "gender"))
console.log(unique([1, 2, 34, 5, 6, 7, 2, 1]))