import ResizeObserver from 'resize-observer-polyfill';
import { isServer } from './util';

/* istanbul ignore next */
function resizeHandler(entries: any[]) {
    for (const entry of entries) {
        const listeners = entry.target.__resizeListeners__ || [];
        if (listeners.length) {
            listeners.forEach((fn: () => any) => {
                fn();
            });
        }
    }
}


interface ResizeElement extends HTMLDivElement {
    __resizeListeners__: Function[];
    __ro__: any
}

/* istanbul ignore next */
export function addResizeListener(element: HTMLDivElement, fn: () => any) {
    if (isServer) {
        throw new Error("当前方法不适用于服务器环境")
    };

    const el = element as ResizeElement;
    if (!el.__resizeListeners__) {
        el.__resizeListeners__ = [];
        el.__ro__ = new ResizeObserver(resizeHandler);
        el.__ro__.observe(el);
    }
    el.__resizeListeners__.push(fn);
}

/* istanbul ignore next */
export function removeResizeListener(element: HTMLDivElement, fn: () => any) {
    const el = element as ResizeElement;
    if (!el || !el.__resizeListeners__) return;
    el.__resizeListeners__.splice(el.__resizeListeners__.indexOf(fn), 1);
    if (!el.__resizeListeners__.length) {
        el.__ro__.disconnect();
    }
}

export function triggerWindowResize() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, true);
    (event as any).eventType = 'message';
    window.dispatchEvent(event);
}
