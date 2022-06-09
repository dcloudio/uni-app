export declare function cache<T>(fn: (str: string) => T): (str: string) => T;
export declare function cacheStringFunction(fn: (string: string) => string): (str: string) => string;
export declare function getLen(str?: string): number;
export declare function addLeadingSlash(str: string): string;
export declare function removeLeadingSlash(str: string): string;
export declare const invokeArrayFns: (fns: Function[], arg?: any) => any;
export declare function updateElementStyle(element: HTMLElement, styles: Partial<CSSStyleDeclaration>): void;
export declare function once<T extends (...args: any[]) => any>(fn: T, ctx?: unknown): T;
export declare const sanitise: (val: unknown) => any;
export declare function formatDateTime({ date, mode }: {
    date?: Date | undefined;
    mode?: string | undefined;
}): string;
interface Options {
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
}
export declare function callOptions(options: Options, errMsg: string): void;
export declare function callOptions(options: Options, data: {
    [key: string]: any;
    errMsg: string;
}): void;
export declare function getValueByDataPath(obj: any, path: string): unknown;
export declare function sortObject<T>(obj: T): T;
export {};
