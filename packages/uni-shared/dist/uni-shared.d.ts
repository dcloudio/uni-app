import { FontFaceDescriptors } from 'css-font-loading-module';

export declare function addFont(family: string, source: string, desc?: FontFaceDescriptors): Promise<void>;

export declare const BUILT_IN_TAGS: string[];

export declare function callOptions(options: Options, errMsg: string): void;

export declare function callOptions(options: Options, data: {
    [key: string]: any;
    errMsg: string;
}): void;

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

export declare function getCustomDataset(el: HTMLElement | HTMLElementWithDataset): DOMStringMap & Record<string, any>;

export declare function getEnvLocale(): string;

export declare function getLen(str?: string): number;

declare interface HTMLElementWithDataset extends HTMLElement {
    __uniDataset?: Record<string, any>;
}

export declare function initCustomDataset(): void;

export declare const invokeArrayFns: (fns: Function[], arg?: any) => any;

export declare function isBuiltInComponent(tag: string): boolean;

export declare function isCustomElement(tag: string): boolean;

export declare function isNativeTag(tag: string): boolean;

export declare interface IUniPageNode {
    pageId: number;
    genId: () => number;
    push: (...args: any[]) => void;
}

export declare const NAVBAR_HEIGHT = 44;

export declare const NODE_TYPE_COMMENT = 8;

export declare const NODE_TYPE_ELEMENT = 1;

export declare const NODE_TYPE_PAGE = 0;

export declare const NODE_TYPE_TEXT = 3;

export declare function normalizeDataset(el: Element): any;

export declare function normalizeTarget(el: HTMLElement): {
    id: string;
    dataset: DOMStringMap & Record<string, any>;
    offsetTop: number;
    offsetLeft: number;
};

export declare const ON_REACH_BOTTOM_DISTANCE = 50;

export declare function once<T extends (...args: any[]) => any>(fn: T, ctx?: unknown): T;

declare interface Options {
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
}

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

export declare const UNI_SSR_TITLE = "title";

export declare class UniBaseNode extends UniNode {
    attributes: Record<string, unknown>;
    style: UniCSSStyleDeclaration;
    protected _html: string | null;
    constructor(nodeType: UniNodeType, nodeName: string);
    get className(): string;
    set className(val: string);
    get innerHTML(): string;
    set innerHTML(html: string);
    addEventListener(type: string, listener: UniEventListener, options?: AddEventListenerOptions): void;
    removeEventListener(type: string, callback: UniEventListener, options?: EventListenerOptions): void;
    getAttribute(qualifiedName: string): unknown;
    removeAttribute(qualifiedName: string): void;
    setAttribute(qualifiedName: string, value: unknown): void;
    toJSON(): UniNodeJSON;
}

export declare class UniCommentNode extends UniNode {
    constructor(text: string);
}

declare class UniCSSStyleDeclaration {
    [name: string]: string | unknown;
    private _cssText;
    private _value;
    setProperty(property: string, value: string | null): void;
    getPropertyValue(property: string): string | string[];
    removeProperty(property: string): string;
    get cssText(): string;
    set cssText(cssText: string);
    toJSON(): UniCSSStyleDeclarationJSON;
}

declare type UniCSSStyleDeclarationJSON = string | null | Record<string, string | string[]> | [string, Record<string, string | string[]>];

export declare class UniElement extends UniBaseNode {
    tagName: string;
    constructor(nodeName: string);
}

export declare class UniEvent {
    type: string;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    timeStamp: number;
    _stop: boolean;
    _end: boolean;
    constructor(type: string, opts: UniEventOptions);
    preventDefault(): void;
    stopImmediatePropagation(): void;
    stopPropagation(): void;
}

export declare interface UniEventListener {
    (evt: UniEvent): void;
}

declare interface UniEventOptions {
    bubbles: boolean;
    cancelable: boolean;
}

declare class UniEventTarget {
    private _listeners;
    dispatchEvent(evt: UniEvent): boolean;
    addEventListener(type: string, listener: UniEventListener, options?: AddEventListenerOptions): void;
    removeEventListener(type: string, callback: UniEventListener, options?: EventListenerOptions): void;
}

export declare class UniInputElement extends UniElement {
    get value(): string | number;
    set value(val: string | number);
}

export declare class UniNode extends UniEventTarget {
    nodeId?: number;
    nodeType: UniNodeType;
    nodeName: string;
    childNodes: UniNode[];
    pageNode: IUniPageNode | null;
    parentNode: UniNode | null;
    protected _text: string | null;
    constructor(nodeType: UniNodeType, nodeName: string);
    get firstChild(): UniNode | null;
    get lastChild(): UniNode | null;
    get nextSibling(): UniNode | null;
    get textContent(): string;
    set textContent(text: string);
    get parentElement(): UniElement | null;
    get previousSibling(): UniNode | null;
    appendChild<T extends UniNode>(newChild: T): T;
    cloneNode(deep?: boolean): UniNode;
    insertBefore<T extends UniNode>(newChild: T, refChild: UniNode | null): T;
    removeChild<T extends UniNode>(oldChild: T): T;
}

export declare interface UniNodeJSON {
    /**
     * nodeId
     */
    i: number;
    /**
     * nodeName
     */
    n: string;
    /**
     * attributes
     */
    a: Record<string, unknown>;
    /**
     * style
     */
    s: UniCSSStyleDeclarationJSON;
    /**
     * text
     */
    t?: string;
}

declare type UniNodeType = typeof NODE_TYPE_PAGE | typeof NODE_TYPE_ELEMENT | typeof NODE_TYPE_TEXT | typeof NODE_TYPE_COMMENT;

export declare class UniTextAreaElement extends UniInputElement {
}

export declare class UniTextNode extends UniBaseNode {
    constructor(text: string);
    get nodeValue(): string;
    set nodeValue(text: string);
}

export declare function updateElementStyle(element: HTMLElement, styles: Partial<CSSStyleDeclaration>): void;

export { }
