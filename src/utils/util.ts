/**
 * @param  {Function} fn
 * @param  {} delay=500 延迟时间默认500 ms
 *  @description 节流函数
 */
export const throttle = (fn: Function, delay = 500) => {
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
export const debounce = (fn: Function, delay = 500) => {
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
            return false;
        }
    }
}
/**
 * @description 随机的颜色 
 */
export function randomColor() {
    let r, g, b;
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
    var hex =
        "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}


/**
 * @description UUID 生成
 */
export function uuid() {
    // 获取唯一值
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
        c
    ) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/**
 * @description 判断是否为浏览器环境
 */
export const isBrowser = typeof window !== 'undefined'


/**
 * @description 判断是否为服务器环境
 */
export const isServer = !isBrowser