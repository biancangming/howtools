"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = exports.throttle = void 0;
/**
 * @param  {Function} fn
 * @param  {} delay=500 延迟时间默认500 ms
 *  @description 节流函数
 */
function throttle(fn, delay) {
    var _this = this;
    if (delay === void 0) { delay = 500; }
    var timer = null;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!timer) {
            timer = setTimeout(function () {
                fn.apply(_this, args);
                timer = null;
            }, delay);
        }
    };
}
exports.throttle = throttle;
/**
 * @param  {Function} fn
 * @param  {} delay=500 延迟时间默认500 ms
 * @description 防抖函数
 */
function debounce(fn, delay) {
    var _this = this;
    if (delay === void 0) { delay = 500; }
    var timer = null;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(_this, args);
            timer = null;
        }, delay);
    };
}
exports.debounce = debounce;
