# 数组对象克隆

## deepClone

### 简介 

> `deepClone<T>(data: any): T` 一般用于数组和对象的克隆

### 参数

- data 数组或者对象 

### 使用示例

```ts
const a = {
    x: 1,
    y: [1, 2, 3],
    z: {
        p: 10,
        q: 50
    }
}
const b = deepClone<any>(a)

a.x = 2
a.y[0] = 100

console.log(a)
//输出 { x: 2, y: [ 100, 2, 3 ], z: { p: 10, q: 50 } }
console.log(b)
// 输出 { x: 1, y: [ 1, 2, 3 ], z: { p: 10, q: 50 } }
```