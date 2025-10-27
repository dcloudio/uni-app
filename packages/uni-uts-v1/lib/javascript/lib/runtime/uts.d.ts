declare function arrayAt<T>(array: T[], index: number): T | null;

declare function arrayFind<T>(array: T[], predicate: any): T | null;

declare function arrayFindLast<T>(array: T[], predicate: any): T | null;

declare function arrayPop<T>(array: T[]): T | null;

declare function arrayShift<T>(array: T[]): T | null;

declare interface Constructible {
    new (...args: any[]): any;
}

declare function isInstanceOf(value: any, type: Function): any;

declare function mapGet<K, V>(map: Map<K, V>, key: K): V | null;

declare function stringAt(str: string, pos: number): string | null;

declare function stringCodePointAt(str: string, pos: number): number | null;

export declare class UniError extends Error {
    errSubject: string;
    errCode: number;
    cause?: Error;
    data?: any;
    constructor(errSubject?: string, errCode?: number | Record<string, any>, errMsg?: string);
    set errMsg(msg: string);
    get errMsg(): string;
    toString(): string;
    toJSON(): Record<string, any>;
}

export declare const UTS: {
    arrayAt: typeof arrayAt;
    arrayFind: typeof arrayFind;
    arrayFindLast: typeof arrayFindLast;
    arrayPop: typeof arrayPop;
    arrayShift: typeof arrayShift;
    isInstanceOf: typeof isInstanceOf;
    UTSType: typeof UTSType;
    mapGet: typeof mapGet;
    stringAt: typeof stringAt;
    stringCodePointAt: typeof stringCodePointAt;
    weakMapGet: typeof weakMapGet;
    JSON: {
        parse: (text: string, reviver?: ((this: any, key: string, value: any) => any) | undefined, utsType?: Constructible | undefined) => any;
        parseArray(text: string, utsType?: typeof UTSType | undefined): any[] | null;
        parseObject(text: string, utsType?: typeof UTSType | undefined): any;
        stringify: (value: any, replacer?: any, space?: any) => string;
    };
};

declare enum UTS_CLASS_METADATA_KIND {
    CLASS = 0,
    INTERFACE = 1,
    TYPE = 2
}

export declare class UTSJSONObject {
    [key: string]: any;
    static keys(obj: UTSJSONObject): string[];
    static assign(target: UTSJSONObject, ...sources: UTSJSONObject[]): UTSJSONObject;
    constructor(content?: Map<string, any> | Record<string, any>);
    private _resolveKeyPath;
    private _getValue;
    get(key: string): any | null;
    set(key: string, value: any): void;
    getAny(key: string, defaultValue: any): any | null;
    getString(key: string, defaultValue: string): string | null;
    getNumber(key: string, defaultValue: number): number | null;
    getBoolean(key: string, defaultValue: boolean): boolean | null;
    getJSON(key: string, defaultValue: UTSJSONObject): UTSJSONObject | null;
    getArray<T = any>(key: string, defaultValue: Array<T>): Array<T> | null;
    toMap(): Map<string, any>;
    forEach(callback: (value: any, key: string) => void): void;
}

declare interface UTSMetadata {
    name: string;
    kind: UTS_CLASS_METADATA_KIND;
    interfaces?: Function[] | undefined;
    fields?: Record<string, UTSTypeFieldType>;
}

declare class UTSType {
    [key: string]: any;
    static get$UTSMetadata$(...args: any[]): UTSTypeMetadata;
    protected get $UTSMetadata$(): Required<UTSMetadata>;
    static withGenerics(parent: Constructible, generics: Array<any>, isJSONParse?: boolean): Constructible;
    constructor();
    static initProps(options: Record<string, any>, metadata: UTSTypeMetadata, isJSONParse?: boolean): Record<string, any>;
}

declare type UTSTypeFieldType = {
    type: Function;
    optional: boolean;
    jsonField?: string;
};

declare type UTSTypeMetadata = Required<UTSMetadata>;

export declare abstract class UTSValueIterable {
}

declare function weakMapGet<K extends symbol | object, V>(map: WeakMap<K, V>, key: K): V | null;

export { }
