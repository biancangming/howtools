# 数组相关操作

## columnData

### 简介

`columnData<T = unknown>(arr: T[], key: string)`

> 提取对象数组某一列数据

### 参数

- arr 对象数组
- key 对象中的某个键值

### 使用示例

```typescript
const obja = [
  { age: "18", name: "张三", gender: "男" },
  { name: "张si", age: "12", gender: "男" },
  { name: "张麦子", age: "12", gender: "女" },
];

columnData(obja, "name");

//输出 [ '张三', '张si', '张麦子' ]
```

## rows2columns

### 简介

```typescript
interface rows2columnsOptions {
    newColumns?: string[],//新列顺序
    originColumns?: string[],//原列顺序
}

rows2columns<T = unknown>(arr: T[], columns: rows2columnsOptions = {})
```

>  有时获取的数组不能直接展示，需要将行转化成列、将列转化为行。

### 参数

- `arr` 数组
- `rows2columnsOptions` 附加选项

### 使用示例

```typescript
const obja = [
  { age: "18", name: "张三", gender: "男" },
  { name: "张si", age: "12", gender: "男" },
  { name: "张麦子", age: "12", gender: "女" },
];

//默认模式
rows2columns(obja);

/**输出如下，默认情况下转换成行之后健用1，2，3...表示
 * [
  { '0': '18', '1': '12', '2': '12' },
  { '0': '张三', '1': '张si', '2': '张麦子' },
  { '0': '男', '1': '男', '2': '女' }
]
*/

//增加自定义键，自定义键建议使用英文，此处为了突出显示用中文表示.由于三行数据转换为列之后，是三列。所以需要指定三个新的列明
rows2columns(obja, {
  newColumns: ["张三", "张si", "张麦子"],
});

/**输出如下
 * [
  { '张三': '18', '张si': '12', '张麦子': '12' },
  { '张三': '张三', '张si': '张si', '张麦子': '张麦子' },
  { '张三': '男', '张si': '男', '张麦子': '女' }
]
*/

// originColumns 用于矫正新数组对象的读取顺序，默认按照第一个对象key值的顺序读取。通常无需指定
rows2columns(obja, {
  newColumns: ["张三", "张si", "张麦子"],
  originColumns: ["name", "age", "gender"],
});
```


## unique

### 简介

 `unique<T = unknown>(arr: T[], key?: string)`
 > 主要用于数组去重，对象数组去重

### 参数
- `arr` 数组
- `key` 对象数组key值，可选

### 使用示例

```ts
unique([1, 2, 34, 5, 6, 7, 2, 1]

//输出 [ 1, 2, 34, 5, 6, 7 ]

const obja = [
  { age: "18", name: "张三", gender: "男" },
  { name: "张si", age: "12", gender: "男" },
  { name: "张麦子", age: "12", gender: "女" },
];

unique(obja, "gender")

/**输出如下, 过滤掉性别相同的列。只保证列去重，而不能保证去除的是某一列
 * [
  { age: '18', name: '张三', gender: '男' },
  { name: '张麦子', age: '12', gender: '女' }
]
*/
```

> 获取

## arrSum

### 简介

- `arrSum<T>(arr: T[], key?: string): number`

> 数组求和，通常这样的数组只能是一个数字类型的数组。如果是对象数组，则需要传入key值，表示对象数组的某一列相加

### 参数

- `arr` 数组
- `key` 对象数组key值，可选。

### 使用示例

```ts
arrSum([1, 2, 34, 5, 6, 7, 2, 1])
//输出 58

const obja = [
  { age: "18", name: "张三", gender: "男" },
  { name: "张si", age: "12", gender: "男" },
  { name: "张麦子", age: "12", gender: "女" },
];


arrSum(obja, "age")
//输出 42

```

## arrGroupBy
### 简介

- `arrGroupBy<T>(arr: T[], key?: string | callbackFunc<T>): Object`

> 用于普通数组，对象数组分组

### 参数

- `arr` 数组
- `key` 对象数组的一个键值或回调函数 

### 使用示例

```ts
arrGroupBy([1, 2, 34, 5, 6, 7, 2, 1])
/**
 * 输出
 * {
  '1': [ 1, 1 ],
  '2': [ 2, 2 ],
  '5': [ 5 ],
  '6': [ 6 ],
  '7': [ 7 ],
  '34': [ 34 ]
}
*/

arrGroupBy(obja, "age")
/**
 * 输出
 * {
  '12': [
    { name: '张si', age: '12', gender: '男' },
    { name: '张麦子', age: '12', gender: '女' }
  ],
  '18': [ { age: '18', name: '张三', gender: '男' } ]
}
*/

```

## arrMedian

### 简介


> `arrMedian(arr: number[])`
> 求中位数

### 参数

- arr 数字数组

### 使用示例

```ts
const orgArr = [1, 10, 30, 2, 5, 6, 7]
arrMedian(orgArr)
//输出 6
```