
export declare const BUILT_IN_TAGS: string[];

export declare const COMPONENT_NAME_PREFIX = "VUni";

export declare function debounce(fn: Function, delay: number): {
    (this: any): void;
    cancel(): void;
};

export declare function isBuiltInComponent(tag: string): boolean;

export declare function isCustomElement(tag: string): boolean;

export declare const NAVBAR_HEIGHT = 44;

export declare function plusReady(callback: () => void): void;

export declare function stringifyQuery(obj?: Record<string, any>, encodeStr?: typeof encodeURIComponent): string;

export declare const TABBAR_HEIGHT = 50;

export declare const TAGS: string[];

export { }
