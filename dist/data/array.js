"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unique = exports.rows2columns = exports.columnData = void 0;
/**
 * @param  {T[]} arr 对象的数组
 * @param  {string} key 列名称
 * @description 提取数组某一行
 */
function columnData(arr, key) {
    return arr.map(function (it) { return it[key]; });
}
exports.columnData = columnData;
/**
 * @param  {T[]} arr
 * @param  {rows2columnsOptions} columns
 */
function rows2columns(arr, columns) {
    if (columns === void 0) { columns = {}; }
    var ret = [];
    var _obj = arr[0];
    var originCol = columns.originColumns || Object.keys(_obj);
    originCol.forEach(function (key) {
        var newCol = columns.newColumns || [];
        var newArr = columnData(arr, key);
        if (newCol.length == 0) {
            ret.push(Object.assign({}, newArr));
        }
        else {
            var newObj = {};
            for (var index in newArr) {
                newObj[newCol[index]] = newArr[index];
            }
            ret.push(newObj);
        }
    });
    return ret;
}
exports.rows2columns = rows2columns;
/**
 * @param  {[]} arr 一个数组
 * @param  {string} key? 假如是对象数组，则传入要去重的key值
 * @description 数组去重
 */
function unique(arr, key) {
    var seen = new Map();
    if (!key)
        return arr.filter(function (a) { return !seen.has(a) && seen.set(a, 1); });
    return arr.filter(function (a) { return !seen.has(a[key]) && seen.set(a[key], 1); });
}
exports.unique = unique;
