/**
 * @param  {Function} fn
 * @param  {} delay=500 延迟时间默认500 ms
 *  @description 节流函数
 */
export function throttle(fn: Function, delay = 500) {
    let timer: number = null
    return (...args: unknown[]) => {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
                timer = null;
            }, delay)
        }
    }
}
/**
 * @param  {Function} fn
 * @param  {} delay=500 延迟时间默认500 ms
 * @description 防抖函数
 */
 export function debounce(fn: Function, delay = 500) {
    let timer: number = null;
    return (...args: unknown[]) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, delay)
    }
}