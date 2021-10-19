import { isBrowser } from './util';
/**
 * @param  {unknown} target 输入对象
 * @description 验证数据类型
 */
export function typeOf(target: unknown): 'Number' | 'String' | 'Boolean' | 'Undefined' | 'Null' | 'Symbol' | 'Function' | 'Array' | 'Object' | 'RegExp' | 'Promise' | 'Element' {
    if (isBrowser && target instanceof Element) return 'Element' //判断是否为dom元素
    return Object.prototype.toString.call(target).slice(8, -1)
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个数字
 */
export function isNumber(target: unknown) {
    return typeOf(target) == 'Number'
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个字符串
 */
export function isString(target: unknown) {
    return typeOf(target) == 'String'
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个布尔值
 */
export function isBoolean(target: unknown) {
    return typeOf(target) == 'Boolean'
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个Undefined
 */
export function isUndefined(target: unknown) {
    return typeOf(target) == 'Undefined'
}
/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个Null
 */
export function isNull(target: unknown) {
    return typeOf(target) == 'Null'
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个Symbol
 */
export function isSymbol(target: unknown) {
    return typeOf(target) == 'Symbol'
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个Promise
 */
export function isPromise(target: unknown) {
    return typeOf(target) == 'Promise'
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个函数
 */
export function isFunction(target: unknown) {
    return typeOf(target) == 'Function'
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个Array
 */
export function isArray(target: unknown) {
    return typeOf(target) == 'Array'
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个Object
 */
export function isObject(target: unknown) {
    return typeOf(target) == 'Object'
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个正则
 */
export function isRegExp(target: unknown) {
    return typeOf(target) == 'RegExp'
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个dom元素
 */
export function isElement(target: unknown) {
    return typeOf(target) == 'Element'
}

/**
 * @param  {unknown} target 输入对象
 * @description 验证是否是一个空的对象，支持 "",null,undefined,{},[]
 */
export function isEmpty(target: unknown) {
    //验证是否是一个空对象
    if (isObject(target)) return Object.keys(target).length == 0
    //验证是否是一个空数组
    if (isArray(target)) return (target as unknown[]).length == 0
    //验证Map set是否为空
    if (target instanceof Map || target instanceof Set) {
        return target.size === 0;
    }
    //验证是否是一个空串/null/undefined
    return ["", null, undefined].includes(target as string | null | undefined)
}