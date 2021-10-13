/**
 * @param  {T[]} arr 对象的数组
 * @param  {string} key 列名称
 * @description 提取数组某一行
 */
export declare function columnData<T = unknown>(arr: T[], key: string): any[];
interface rows2columnsOptions {
    newColumns?: string[];
    originColumns?: string[];
}
/**
 * @param  {T[]} arr
 * @param  {rows2columnsOptions} columns
 */
export declare function rows2columns<T = unknown>(arr: T[], columns?: rows2columnsOptions): any[];
export {};
