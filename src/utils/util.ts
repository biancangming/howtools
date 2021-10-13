/**
 * @param  {Function} fn
 * @param  {} delay=500 延迟时间默认500 ms
 *  @description 节流函数
 */
export function throttle(fn: Function, delay = 500) {
    let timer: NodeJS.Timeout = null
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
    let timer: NodeJS.Timeout = null;
    return (...args: unknown[]) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, delay)
    }
}

//字符串是否可转化为JSON
export function isJSON(str: string) {
    if (typeof str == 'string') {
        try {
            const obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return true;
            } else {
                return false;
            }

        } catch (e) {
            console.warn('error：' + str.slice(0, 100) + '!!!' + e);
            return false;
        }
    }
}