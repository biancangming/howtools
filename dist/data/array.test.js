"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var array_1 = require("./array");
console.log("==============行转列=====================");
var obja = [
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
];
console.log(array_1.rows2columns(obja, {
    newColumns: ["张三", "张si"],
    originColumns: ["name", "age", "gender"]
}));
console.log("==============数组去重=====================");
console.log(array_1.unique(obja, "gender"));
console.log(array_1.unique([1, 2, 34, 5, 6, 7, 2, 1]));
