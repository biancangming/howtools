export type EventType = string | symbol;
export type Handler<T = any> = (...args: T[]) => void;
export type EventMap = { [key: EventType]: Array<Handler> };
export type EmitDataMap = { [key: EventType]: Array<any> };

class Bus {
  private readonly map: EventMap;
  private readonly emitDataMap: EmitDataMap;
  
  constructor() {
    // 收集订阅信息,调度中心
    this.map = {} as EventMap;
    this.emitDataMap = {} as EmitDataMap;
  }

  // 订阅
  $on(name: EventType, fn: Handler) {
    this.map[name] = this.map[name] || [];
    this.map[name].push(fn);
    //对于先发布的，需要先执行一次发布
    if (Reflect.has(this.emitDataMap, name)) {
      this.emitDataMap[name].forEach((o: unknown[]) => this.$emit(name, ...o))
      Reflect.deleteProperty(this.emitDataMap, name)
    }
  }

  // 发布
  $emit(name: EventType, ...args: any[]) {
    if (this.map[name]) {
      this.map[name].forEach((fn: Handler) => {
        fn(...args);
      });
    } else {
      this.emitDataMap[name] = this.emitDataMap[name] || [];
      this.emitDataMap[name].push(args)
    }
  }

  // 取消订阅
  $off(name: EventType) {
    if (this.map[name]) {
      delete this.map[name];
    }
    if (Reflect.has(this.emitDataMap, name)) {
      Reflect.deleteProperty(this.emitDataMap, name)
    }
  }
}

export default Bus;
