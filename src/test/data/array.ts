import { rows2columns } from "../.."

const obja = [
    {
        age: "18",
        name: "张三",
        gender: "男",
    },
    {
        name: "张si",
        age: "12",
        gender: "男1"
    }
]

console.log(rows2columns(obja, {
    newColumns: ["张三", "张si"],
    originColumns: ["name", "age", "gender"]
}))