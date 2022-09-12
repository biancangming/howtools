import { isObject, isArray } from './type';
import { deepClone } from '../data/clone';

/**
 * @param  {T} target
 * @param  {(...args:any[])=>void} notify
 * @description 定义一个观察者，观察一个对象改变，当改变之后通知另一个函数去进行一些动作
 */
export function defineObserve<T extends object>(target: T, notify: (...args: any[]) => void) {
  const _target = target //引入原有的对象，新对象
  const _old = deepClone(target) // 改变之前的旧对象
  
  function observe<T extends object>(target: T) {
    const handler = {
      get: (target, key, receiver) => {
        const cTarget = Reflect.get(target, key, receiver)

        // 处理对象和数组
        if (isObject(cTarget) || isArray(cTarget)) {
          return observe(cTarget)
        }

        return cTarget
      },
      set: (target, key, val, receiver) => {
        const res = Reflect.set(target, key, val, receiver);
        notify(_old, _target, Reflect.get(target, key))
        return res
      }
    }
    return new Proxy(target, handler)
  }

  return observe(target)
}