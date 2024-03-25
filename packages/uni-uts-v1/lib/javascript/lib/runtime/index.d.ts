declare function arrayAt<T>(array: T[], index: number): T | null;

declare function arrayFind<T>(array: T[], predicate: any): T | null;

declare function arrayFindLast<T>(array: T[], predicate: any): T | null;

declare function arrayPop<T>(array: T[]): T | null;

declare function arrayShift<T>(array: T[]): T | null;

declare interface Constructible {
    new (...args: any[]): any;
}

declare function isInstanceOf(value: any, type: Function): boolean;

declare function mapGet<K, V>(map: Map<K, V>, key: K): V | null;

declare function stringAt(str: string, pos: number): string | null;

declare function stringCodePointAt(str: string, pos: number): number | null;

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
        stringify: (value: any) => string;
    };
};

declare enum UTS_CLASS_METADATA_KIND {
    CLASS = 0,
    INTERFACE = 1,
    TYPE = 2
}

declare interface UTSMetadata {
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

declare function weakMapGet<K extends symbol | object, V>(map: WeakMap<K, V>, key: K): V | null;


export * from "tslib";

export { }
