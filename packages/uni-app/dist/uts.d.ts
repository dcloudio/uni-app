export declare function normalizeArg(arg: unknown): unknown;
interface Parameter {
    name: string;
    type: string;
}
interface ProxyFunctionOptions {
    main?: boolean;
    package: string;
    class: string;
    name: string;
    method?: string;
    companion?: boolean;
    params: Parameter[];
}
interface ProxyClassOptions {
    package: string;
    class: string;
    constructor: {
        params: Parameter[];
    };
    props: string[];
    staticProps: string[];
    methods: {
        [name: string]: {
            async?: boolean;
            params: Parameter[];
        };
    };
    staticMethods: {
        [name: string]: {
            async?: boolean;
            params: Parameter[];
        };
    };
}
declare function initUtsStaticMethod(async: boolean, opts: ProxyFunctionOptions): (...args: unknown[]) => unknown;
export declare const initUtsProxyFunction: typeof initUtsStaticMethod;
export declare function initUtsProxyClass({ package: pkg, class: cls, constructor: { params: constructorParams }, methods, props, staticProps, staticMethods, }: ProxyClassOptions): any;
export declare function initUtsPackageName(name: string, is_uni_modules: boolean): string;
export declare function initUtsIndexClassName(moduleName: string, is_uni_modules: boolean): string;
export declare function initUtsClassName(moduleName: string, className: string, is_uni_modules: boolean): string;
export {};
