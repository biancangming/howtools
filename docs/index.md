# 快速开始

## 简介
> `howtools` 中文名 好工具，一个简单、轻量、易使用的JavaScript工具包

- 轻量
- typescript 开发
- 友好的类型提示
- 分包导入

## 安装

> `npm i howtools --save`

## 使用

howtools 提供了全局导入方式（例如：`import { columnData } from "howtools"`）。但是推荐从分包导入对应的模块（例如：`import { columnData } from "howtools/data/array"`），在 howtools 开发种优先适配此导入方式。具体导入方式参照导入模块对照表

### 导入模块对照表

| 模块                            | 对应函数                                                                                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `howtools/data/array`           | `columnData`,`rows2columns`,`unique`,`arrSum`,`arrGroupBy`,`arrMedian`                                                                                        |
| `howtools/data/clone`           | `deepClone`                                                                                                                                                   |
| `howtools/utils/dom`            | `scriptLoader`,`fullScreen`,`exitScreen`                                                                                                                      |
| `howtools/utils/md5`            | `md5`                                                                                                                                                         |
| `howtools/utils/regex`            | `urlReg`,`ipv4Reg`,`ipv6Reg`,`mobilePhoneReg`,`emailReg`,`naturalNumberReg`,`numberAndWordReg`,`idCard1Reg`,`idCard2Reg`                                      |
| `howtools/utils/resizeObserver` | `addResizeListener`,`removeResizeListener`                                                                                                                    |
| `howtools/utils/type`           | `typeOf`,`isNumber`,`isString` ,`isBoolean` ,`isUndefined` ,`isNull` , `isSymbol` ,`isFunction`,`isObject` ,`isRegExp` , `isPromise` , `isElement` ,`isEmpty` |
| `howtools/utils/util`           | `md5`,`uuid`,`isJSON`,`randomColor`,`isBrowser`                                                                                                               |
| `howtools/files`                | `saveFileFromBlob`,`blob2Json`,`html2word`,`table2excel`                                                                                                      |

