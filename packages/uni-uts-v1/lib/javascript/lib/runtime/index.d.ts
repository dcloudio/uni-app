declare function arrayAt<T>(array: T[], index: number): T | null;

declare function arrayFind<T>(array: T[], predicate: any): T | null;

declare function arrayFindLast<T>(array: T[], predicate: any): T | null;

declare function arrayPop<T>(array: T[]): T | null;

declare function arrayShift<T>(array: T[]): T | null;

declare function isInstanceOf(value: any, type: Function): boolean;

declare function mapGet<K, V>(map: Map<K, V>, key: K): V | null;

declare function stringCodePointAt(str: string, pos: number): number | null;

export declare const UTS: {
    arrayAt: typeof arrayAt;
    arrayFind: typeof arrayFind;
    arrayFindLast: typeof arrayFindLast;
    arrayPop: typeof arrayPop;
    arrayShift: typeof arrayShift;
    isInstanceOf: typeof isInstanceOf;
    mapGet: typeof mapGet;
    stringCodePointAt: typeof stringCodePointAt;
    weakMapGet: typeof weakMapGet;
    JSON: {
        parse: (text: string, reviver: (this: any, key: string, value: any) => any) => any;
        parseArray(text: string): any[] | null;
        parseObject(text: string): UTSJSONObject | null;
        stringify: (value: any) => string;
    };
};

declare class UTSJSONObject {
    [key: string]: any;
    constructor(content?: Record<string, any>);
    private _resolveKeyPath;
    private _getValue;
    get(key: string): any | null;
    set(key: string, value: any): void;
    getAny(key: string): any | null;
    getString(key: string): string | null;
    getNumber(key: string): number | null;
    getBoolean(key: string): boolean | null;
    getJSON(key: string): UTSJSONObject | null;
    getArray<T = any>(key: string): Array<T> | null;
    toMap(): Map<string, any>;
    forEach(callback: (value: any, key: string) => void): void;
}

declare function weakMapGet<K extends symbol | object, V>(map: WeakMap<K, V>, key: K): V | null;


export * from "tslib";

export { }
