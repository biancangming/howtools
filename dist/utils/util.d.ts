/**
 * @param  {Function} fn
 * @param  {} delay=500 延迟时间默认500 ms
 *  @description 节流函数
 */
export declare function throttle(fn: Function, delay?: number): (...args: unknown[]) => void;
/**
 * @param  {Function} fn
 * @param  {} delay=500 延迟时间默认500 ms
 * @description 防抖函数
 */
export declare function debounce(fn: Function, delay?: number): (...args: unknown[]) => void;
