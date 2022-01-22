# howtools

> 好工具，一个力求简单的 js 工具库

# 安装方式

`npm i howtools`

# 简要文档说明

> 简单介绍函数作用，具体需要在`src`文件夹下查看函数的具体作用。

## 数据操作类

### src/data

#### 数组处理

- `columnData` 获取对象数组某一列数据
- `rows2columns` 行转列函数
- `unique` 数组去重，支持对象数组/一般数组
- `arrSum` 数组求和，支持对象数组/一般数组 [@chendongpo123](https://github.com/chendongpo123)
- `arrGroupBy` 数组分组，支持对象数组/一般数组 [@chendongpo123](https://github.com/chendongpo123)
- `arrMedian` 数组求中位数

#### 对象操作

- `objEntries` 对象for ... of ... 循环扩展
- `objDefVal`  对象设置默认值, 不改变原对象

#### 拷贝

- `deepClone` 深拷贝

## 文件操作

### src/files/blob

- `saveFileFromBlob` Blob 流保存为文件
- `blob2Json` Blob 文件转 json
- `html2word` 将 html 文件转化为 word [@chendongpo123](https://github.com/chendongpo123)
- `table2excel` 将原生 table 文件转化为 excel [@chendongpo123](https://github.com/chendongpo123)

## 其他工具

### src/utils

#### 节流防抖

- `debounce` 防抖函数
- `throttle` 节流函数

#### 类型验证

- `typeOf` 检测元素类型
- `isNumber` 验证是否是一个数字
- `isString` 验证是否是一个字符串
- `isBoolean` 验证是否是一个布尔值
- `isUndefined` 验证是否是一个 Undefined
- `isNull` 验证是否是一个 Null
- `isSymbol` 验证是否是一个 Symbol
- `isFunction` 验证是否是一个函数
- `isObject` 验证是否是一个 Object
- `isRegExp` 验证是否是一个正则
- `isPromise` 验证是否是一个 Promise
- `isElement` 验证是否是一个 dom 元素
- `isEmpty` 验证是否是一个空的对象，支持 `"",null,undefined,{},Array,Map,set`

#### 常用正则表达式

- `urlReg` url 正则表达式
- `ipv4Reg` IPv4
- `ipv6Reg` IPv6
- `mobilePhoneReg` 手机号正则
- `emailReg` 邮箱正则
- `naturalNumberReg` 自然数
- `numberAndWordReg` 数字字母正则
- `idCard1Reg` 一代身份证
- `idCard2Reg` 二代身份证

#### dom 相关

- `addResizeListener` 添加 dom 监听
- `removeResizeListener` 移除 dom 监听

#### 其他

- `md5` 生成一个 md5 字符串
- `uuid` 生成一个 uuid
- `isJSON` 判断是否为 json 字符串
- `randomColor` 随机十六进制颜色
- `isBrowser` 判断是否为浏览器环境


## 支持

> IIFE: 自执行函数, 可通过 `<script>` 标签加载
> 
> AMD: 浏览器端的模块规范, 可通过 RequireJS 可加载
> 
> CommonJS: Node 默认的模块规范, 可通过 Webpack 加载
> 
> UMD: 兼容 IIFE, AMD, CJS 三种模块规范
> 
> ESM: ES2015 Module 规范, 可用 Webpack, Rollup 加载