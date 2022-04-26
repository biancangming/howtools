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
 * @description Promise 请求返回数据数组 
 */
export function promiseTo<T>(promise: Promise<T>) {
    return promise.then(data => [data, null]).catch(err => [null, err])
}

/**
 * @description 随机的十六进制颜色 
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


/**
 * @param  {string} text 复制文字到剪贴板, 支持浏览器端
 * @returns Boolean
 */
export function copyToClipboard(text: string) {
    return new Promise((resolve, reject) => {
        try {
            if (!isBrowser) {
                reject("Not a browser environment, not supported")
                return
            }

            // https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/clipboard
            if (navigator?.clipboard) {
                navigator.clipboard.writeText(text).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                });
            } else {
                const textarea = document.createElement('textarea');
                textarea.readOnly = true;
                textarea.style.position = 'absolute';
                textarea.style.top = '0px';
                textarea.style.left = '-9999px';
                textarea.style.display = '-9999';
                // 将要 copy 的值赋给 textarea 标签的 value 属性
                textarea.value = text
                // 将 textarea 插入到 body 中
                document.body.appendChild(textarea);

                // @ts-ignore 兼容IOS 没有 select() 方法
                if (textarea.createTextRange) {
                    textarea.select(); // 选中值并复制
                } else {
                    textarea.setSelectionRange(0, text.length);
                    textarea.focus();
                }
                //高版本浏览器已经废弃 参考 https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand
                document.execCommand('Copy')
                textarea.remove()
                resolve('')
            }
        } catch (err) {
            reject(err)
        }
    })
}

/**
 * @description 检测当前的环境是否是黑暗模式，它是一个布尔值
 */
export const isDarkMode = isBrowser && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : false


/**
 * @description 获取当前页面选中的文本
 */
export const getSelectedText = () => isBrowser ? window.getSelection().toString() : "";


