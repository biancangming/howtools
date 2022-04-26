import { isBrowser } from './util';

type TypeString = 'Number' | 'String' | 'Boolean' | 'Undefined' | 'Null' | 'Symbol'
    | 'Function' | 'Array' | 'Object' | 'RegExp' | 'Promise'
    | 'Set' | 'WeakSet' | 'Map' | 'WeakMap'
    | 'Element'

enum TYPE {
    Number = 'Number',
    String = 'String',
    Boolean = 'Boolean',
    Undefined = 'Undefined',
    Null = 'Null',
    Symbol = 'Symbol',
    Function = 'Function',
    Array = 'Array',
    Set = 'Set',
    WeakSet = 'WeakSet',
    Map = 'Map',
    WeakMap = 'WeakMap',
    Object = 'Object',
    Element = 'Element',
    Promise = 'Promise',
    RegExp = 'RegExp',
}

/**
 * @param  {unknown} target 输入对象
 * @description 验证数据类型
 */
export function typeOf(target: unknown): TypeString {
    if (isBrowser && target instanceof Element) return 'Element' //判断是否为dom元素
    return Object.prototype.toString.call(target).slice(8, -1)
}

export const checkType = (target: unknown, type: TYPE) => typeOf(target) == type

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个数字
 */
export function isNumber(target: unknown): target is number {
    return checkType(target, TYPE.Number)
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个字符串
 */
export function isString(target: unknown): target is string {
    return checkType(target, TYPE.String)
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个布尔值
 */
export function isBoolean(target: unknown): target is boolean {
    return checkType(target, TYPE.Boolean)
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个Undefined
 */
export function isUndefined(target: unknown): target is undefined {
    return checkType(target, TYPE.Undefined)
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个Null
 */
export function isNull(target: unknown): target is null {
    return checkType(target, TYPE.Null)
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个Symbol
 */
export function isSymbol(target: unknown): target is symbol {
    return checkType(target, TYPE.Symbol)
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个Promise
 */
export function isPromise<T>(target: Promise<T> | unknown): target is Promise<T> {
    return checkType(target, TYPE.Promise)
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个函数
 */
export function isFunction(target: unknown): target is (...[]) => unknown {
    return checkType(target, TYPE.Function)
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个Array
 */
export function isArray(target: unknown): target is unknown[] {
    return checkType(target, TYPE.Array)
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个Object
 */
export function isObject(target: unknown): target is object {
    return checkType(target, TYPE.Object)
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个正则
 */
export function isRegExp(target: unknown): target is RegExp {
    return checkType(target, TYPE.RegExp)
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个正则
 */
export function isMap(target: unknown): target is Map<unknown, unknown> {
    return checkType(target, TYPE.Map)
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个正则
 */
export function isWeakMap<K, V>(target: unknown): target is WeakMap<object, unknown> {
    return checkType(target, TYPE.WeakMap)
}


/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个正则
 */
export function isSet(target: unknown): target is Set<unknown> {
    return checkType(target, TYPE.Set)
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个正则
 */
export function isWeakSet(target: unknown): target is WeakSet<object> {
    return checkType(target, TYPE.WeakSet)
}

/**
 * @param  {unknown} target 输入数据类型
 * @description 验证是否是一个dom元素
 */
export function isElement(target: unknown): target is Element {
    return checkType(target, TYPE.Element)
}

/**
 * @param  {unknown} target 输入对象
 * @description 验证是否是一个空的对象，支持 "",null,undefined,{},[]
 */
export function isEmpty(target: unknown): target is null | 0 {
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
