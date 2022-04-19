// 可为null
export declare type Nullable<T> = T | null;

// null or other
export declare type NonNullable<T> = T extends null | undefined ? never : T;

export declare type Recordable<T = any> = Record<string | symbol, T>;

export declare type ReadonlyRecordable<T = any> = {
    readonly [key: string | symbol]: T;
};

// 键值可读对象
export declare type Indexable<T = any> = {
    [key: string | symbol]: T;
};

// input select 等事件
export declare interface ChangeEvent extends Event {
    target: HTMLInputElement;
}
