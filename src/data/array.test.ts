import { rows2columns, unique, arrMedian, columnData, arrSum, arrGroupBy, arrToTree, treeToArr, arrSort } from './array';
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
const na = [1, 2, 34, 5, 6, 7, 2, 1]
console.log(arrGroupBy(na))
console.log(arrGroupBy(obja, 'age'))

console.log("==============数组中位数=====================")
const orgArr = [1, 10, 30, 2, 5, 6, 7]
console.log("数组中位数", arrMedian(orgArr))
console.log(orgArr)

console.log("=============arr to tree=====================")
const arr = [
    { "menuId": "5f50c5fb8f0d74536bbfb7a4", "menuName": "菜单管理", "parentMenuId": "" },
    { "menuId": "5f524416ff216c2cbc554907", "menuName": "频道管理", "parentMenuId": "5f50c5fb8f0d74536bbfb7a4" },
    { "menuId": "5f576677d9588f3d78fbdb74", "menuName": "分类管理", "parentMenuId": "5f524416ff216c2cbc554907" },
    { "menuId": "5f588b22499cd2538411b98a", "menuName": "发布管理", "parentMenuId": "5f50c5fb8f0d74536bbfb7a4" },
    { "menuId": "5f588b85499cd2538411b98b", "menuName": "权限管理", "parentMenuId": "5f50c5fb8f0d74536bbfb7a4" },
    { "menuId": "5f588f8358bc0d3e647403a1", "menuName": "菜单管理", "parentMenuId": "5f588b85499cd2538411b98b" }
]
console.log(new Date())
const treeArr = arrToTree(arr,
    {
        id: 'menuId',
        pid: 'parentMenuId',
    }
)

console.log(treeArr)

const lineArr = treeToArr(treeArr)

console.log(JSON.stringify(lineArr))

arrSort(obja, { key: 'age' })
console.log(obja, '排序')
