import { FontFaceDescriptors } from 'css-font-loading-module';

export declare function addFont(family: string, source: string, desc?: FontFaceDescriptors): Promise<void>;

export declare const BUILT_IN_TAGS: string[];

export declare const COMPONENT_NAME_PREFIX = "VUni";

export declare const COMPONENT_PREFIX: string;

export declare const COMPONENT_SELECTOR_PREFIX = "uni-";

export declare function createRpx2Unit(unit: string, unitRatio: number, unitPrecision: number): (val: string) => string;

export declare function debounce(fn: Function, delay: number): {
    (this: any): void;
    cancel(): void;
};

/**
 * Decode text using `decodeURIComponent`. Returns the original text if it
 * fails.
 *
 * @param text - string to decode
 * @returns decoded string
 */
export declare function decode(text: string | number): string;

export declare function decodedQuery(query?: Record<string, any>): Record<string, string>;

export declare const defaultRpx2Unit: {
    unit: string;
    unitRatio: number;
    unitPrecision: number;
};

export declare function formatDateTime({ date, mode }: {
    date?: Date | undefined;
    mode?: string | undefined;
}): string;

export declare function getEnvLocale(): string;

export declare function getLen(str?: string): number;

export declare const invokeArrayFns: (fns: Function[], arg?: any) => any;

export declare function isBuiltInComponent(tag: string): boolean;

export declare function isCustomElement(tag: string): boolean;

export declare function isNativeTag(tag: string): boolean;

export declare const NAVBAR_HEIGHT = 44;

export declare function normalizeDataset(el: Element): any;

export declare function normalizeTarget(el: HTMLElement): {
    id: string;
    dataset: any;
    offsetTop: number;
    offsetLeft: number;
};

export declare const ON_REACH_BOTTOM_DISTANCE = 50;

export declare function once<T extends (...args: any[]) => any>(fn: T, ctx?: unknown): T;

/**
 * https://github.com/vuejs/vue-router-next/blob/master/src/query.ts
 * @internal
 *
 * @param search - search string to parse
 * @returns a query object
 */
export declare function parseQuery(search: string): Record<string, any>;

export declare function passive(passive: boolean): {
    passive: boolean;
};

export declare const PLUS_RE: RegExp;

export declare function plusReady(callback: () => void): void;

export declare const PRIMARY_COLOR = "#007aff";

export declare function removeLeadingSlash(str: string): string;

export declare const RESPONSIVE_MIN_WIDTH = 768;

export declare type Rpx2UnitOptions = typeof defaultRpx2Unit;

export declare const sanitise: (val: unknown) => any;

declare function scrollTo_2(scrollTop: number | string, duration: number): void;
export { scrollTo_2 as scrollTo }

export declare function stringifyQuery(obj?: Record<string, any>, encodeStr?: typeof encodeURIComponent): string;

export declare const TABBAR_HEIGHT = 50;

export declare const TAGS: string[];

export declare const UNI_SSR = "__uniSSR";

export declare const UNI_SSR_DATA = "data";

export declare const UNI_SSR_GLOBAL_DATA = "globalData";

export declare const UNI_SSR_STORE = "store";

export declare function updateElementStyle(element: HTMLElement, styles: Partial<CSSStyleDeclaration>): void;

export { }
