import type { App } from 'vue';
import type { ComponentInternalInstance } from '@vue/runtime-core';
import { ComponentOptionsBase } from '@vue/runtime-core';
import { ComponentOptionsBase as ComponentOptionsBase_2 } from 'vue';
import type { ComponentPublicInstance } from '@vue/runtime-core';
import { ComponentPublicInstance as ComponentPublicInstance_2 } from 'vue';
import { createApp } from 'vue';
import type { RendererNode } from '@vue/runtime-core';

export declare const ACTION_TYPE_ADD_EVENT = 8;

export declare const ACTION_TYPE_ADD_WXS_EVENT = 12;

export declare const ACTION_TYPE_CREATE = 3;

export declare const ACTION_TYPE_EVENT = 20;

export declare const ACTION_TYPE_INSERT = 4;

export declare const ACTION_TYPE_PAGE_CREATE = 1;

export declare const ACTION_TYPE_PAGE_CREATED = 2;

export declare const ACTION_TYPE_PAGE_SCROLL = 15;

export declare const ACTION_TYPE_REMOVE = 5;

export declare const ACTION_TYPE_REMOVE_ATTRIBUTE = 7;

export declare const ACTION_TYPE_REMOVE_EVENT = 9;

export declare const ACTION_TYPE_SET_ATTRIBUTE = 6;

export declare const ACTION_TYPE_SET_TEXT = 10;

/**
 * nodeId
 * event
 * flag
 */
export declare type AddEventAction = [
typeof ACTION_TYPE_ADD_EVENT,
number,
string | number,
number
];

export declare function addFont(family: string, source: string, desc?: FontFaceDescriptors): Promise<void>;

export declare function addLeadingSlash(str: string): string;

/**
 * nodeId
 * event
 * wxsEvent
 * flag
 */
export declare type AddWxsEventAction = [
typeof ACTION_TYPE_ADD_WXS_EVENT,
number,
string | number,
string | number,
number
];

export declare const ATTR_CHANGE_PREFIX = "change:";

export declare const ATTR_CLASS = "class";

export declare const ATTR_INNER_HTML = "innerHTML";

export declare const ATTR_STYLE = "style";

export declare const ATTR_TEXT_CONTENT = "textContent";

export declare const ATTR_V_OWNER_ID = ".vOwnerId";

export declare const ATTR_V_RENDERJS = ".vRenderjs";

export declare const ATTR_V_SHOW = ".vShow";

export declare const BACKGROUND_COLOR = "#f7f7f7";

export declare const borderStyles: {
    black: string;
    white: string;
};

export declare const BUILT_IN_TAG_NAMES: string[];

export declare const BUILT_IN_TAGS: string[];

export declare function cache<T>(fn: (str: string) => T): (str: string) => T;

export declare function cacheStringFunction(fn: (string: string) => string): (str: string) => string;

export declare function callOptions(options: Options, errMsg: string): void;

export declare function callOptions(options: Options, data: {
    [key: string]: any;
    errMsg: string;
}): void;

export declare const COMPONENT_NAME_PREFIX = "VUni";

export declare const COMPONENT_PREFIX: string;

export declare const COMPONENT_SELECTOR_PREFIX = "uni-";

/**
 * nodeId
 * tag
 * parentNodeId
 * refNodeId
 * nodeJson
 */
export declare type CreateAction = [
typeof ACTION_TYPE_CREATE,
number,
string | number,
number,
number,
Partial<UniNodeJSON | UniNodeJSONMinify>?
];

export declare function createIsCustomElement(tags?: string[]): (tag: string) => boolean;

export declare function createRpx2Unit(unit: string, unitRatio: number, unitPrecision: number): (val: string) => string;

export declare function createUniEvent(evt: Record<string, any>): UniEvent;

declare type CreateVueAppHook = (app: App) => void;

export declare function customizeEvent(str: string): string;

export declare const DATA_RE: RegExp;

/**
 * 需要手动传入 timer,主要是解决 App 平台的定制 timer
 */
export declare function debounce(fn: Function, delay: number, { clearTimeout, setTimeout }: Timer): {
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

export declare const defaultMiniProgramRpx2Unit: {
    unit: string;
    unitRatio: number;
    unitPrecision: number;
};

export declare const defaultNVueRpx2Unit: {
    unit: string;
    unitRatio: number;
    unitPrecision: number;
};

export declare const defaultRpx2Unit: {
    unit: string;
    unitRatio: number;
    unitPrecision: number;
};

declare type DictArray = [number, number][];

export declare function dynamicSlotName(name: string): string;

export declare interface Emitter {
    e: Record<string, unknown>;
    on: (name: EventName, callback: EventCallback, ctx?: any) => this;
    once: (name: EventName, callback: EventCallback, ctx?: any) => this;
    emit: (name: EventName, ...args: any[]) => this;
    off: (name: EventName, callback?: EventCallback) => this;
}

export declare const Emitter: new () => Emitter;

declare type EventCallback = Function;

export declare class EventChannel {
    id?: number;
    private listener;
    private emitCache;
    constructor(id?: number, events?: NavigateToOptionEvents);
    emit(eventName: string, ...args: any[]): number | undefined;
    on(eventName: string, fn: EventChannelListener['fn']): void;
    once(eventName: string, fn: EventChannelListener['fn']): void;
    off(eventName: string, fn: EventChannelListener['fn']): void;
    _clearCache(eventName?: string): void;
    _addListener(eventName: string, type: EventChannelListener['type'], fn: EventChannelListener['fn']): void;
}

declare interface EventChannelListener {
    type: 'on' | 'once';
    fn: (...args: any[]) => void;
}

export declare const EventModifierFlags: {
    stop: number;
    prevent: number;
    self: number;
};

declare type EventName = string;

export declare const forcePatchProp: (el: {
    nodeName: string;
}, key: string) => boolean;

export declare function formatDateTime({ date, mode }: {
    date?: Date | undefined;
    mode?: string | undefined;
}): string;

export declare function formatLog(module: string, ...args: any[]): string;

export declare function getCustomDataset(el: HTMLElement | HTMLElementWithDataset): DOMStringMap & Record<string, any>;

export declare function getEnvLocale(): string;

export declare function getLen(str?: string): number;

export declare function getValueByDataPath(obj: any, path: string): unknown;

declare interface HTMLElementWithDataset extends HTMLElement {
    __uniDataset?: Record<string, any>;
}

export declare const I18N_JSON_DELIMITERS: [string, string];

export declare const initCustomDatasetOnce: () => void;

/**
 * nodeId
 * parentNodeId
 * refNodeId
 * nodeJson
 */
export declare type InsertAction = [
typeof ACTION_TYPE_INSERT,
number,
number,
number,
Partial<UniNodeJSON | UniNodeJSONMinify>?
];

export declare const invokeArrayFns: (fns: Function[], arg?: any) => any;

export declare const invokeCreateErrorHandler: (app: App, createErrorHandler: (app: App) => App['config']['errorHandler']) => ((err: unknown, instance: ComponentPublicInstance_2<    {}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase_2<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => void) | undefined;

export declare function invokeCreateVueAppHook(app: App): void;

export declare function isAppNativeTag(tag: string): boolean;

export declare function isAppNVueNativeTag(tag: string): boolean;

export declare function isAppUVueNativeTag(tag: string): boolean;

export declare function isBuiltInComponent(tag: string): boolean;

export declare function isComponentInternalInstance(vm: unknown): vm is ComponentInternalInstance;

export declare function isComponentTag(tag: string): boolean;

export declare function isH5CustomElement(tag: string): boolean;

export declare function isH5NativeTag(tag: string): boolean;

export declare function isMiniProgramNativeTag(tag: string): boolean;

export declare function isRootHook(name: string): boolean;

export declare function isRootImmediateHook(name: string): boolean;

export declare function isUniLifecycleHook(name: string, value: unknown, checkType?: boolean): boolean;

export declare interface IUniPageNode {
    pageId: number;
    pageNode: IUniPageNode | null;
    isUnmounted: boolean;
    genId: () => number;
    push: (...args: any[]) => void;
    onCreate: (thisNode: UniNode, nodeName: string | number) => UniNode;
    onInsertBefore: (thisNode: UniNode, newChild: UniNode, refChild: UniNode | null) => UniNode;
    onRemoveChild: (oldChild: UniNode) => UniNode;
    onAddEvent: (thisNode: UniNode, name: string, flag: number) => void;
    onAddWxsEvent: (thisNode: UniNode, name: string, wxsEvent: string, flag: number) => void;
    onRemoveEvent: (thisNode: UniNode, name: string) => void;
    onSetAttribute: (thisNode: UniNode, qualifiedName: string, value: unknown) => void;
    onRemoveAttribute: (thisNode: UniNode, qualifiedName: string) => void;
    onTextContent: (thisNode: UniNode, text: string) => void;
    onNodeValue: (thisNode: UniNode, val: string | null) => void;
}

export declare const JSON_PROTOCOL = "json://";

export declare const LINEFEED = "\n";

export declare const MINI_PROGRAM_PAGE_RUNTIME_HOOKS: {
    readonly onPageScroll: 1;
    readonly onShareAppMessage: number;
    readonly onShareTimeline: number;
};

export declare const NAVBAR_HEIGHT = 44;

declare type NavigateToOptionEvents = Record<string, (...args: any[]) => void>;

export declare const NODE_TYPE_COMMENT = 8;

export declare const NODE_TYPE_ELEMENT = 1;

export declare const NODE_TYPE_PAGE = 0;

export declare const NODE_TYPE_TEXT = 3;

export declare function normalizeDataset(el: Element): any;

export declare function normalizeEventType(type: string, options?: AddEventListenerOptions): string;

export declare function normalizeStyles<T extends Object>(pageStyle: T, themeConfig?: UniApp.ThemeJson, mode?: UniApp.ThemeMode): T;

export declare function normalizeTabBarStyles(borderStyle?: string): string | undefined;

export declare function normalizeTarget(el: HTMLElement): {
    id: string;
    dataset: DOMStringMap & Record<string, any>;
    offsetTop: number;
    offsetLeft: number;
};

export declare function normalizeTitleColor(titleColor: string): "#000000" | "#ffffff";

export declare interface NVue {
    config: NVueConfigAPI;
    document: NVueDocument;
    requireModule: (name: string) => Record<string, unknown> | void;
    supports: (condition: string) => boolean | void;
    isRegisteredModule: (name: string, method?: string) => boolean;
    isRegisteredComponent: (name: string) => boolean;
}

export declare const NVUE_BUILT_IN_TAGS: string[];

export declare const NVUE_U_BUILT_IN_TAGS: string[];

export declare interface NVueConfigAPI {
    bundleUrl: string;
    bundleType: string;
    env: NVueEnvironment;
}

export declare interface NVueDocument {
    id: string;
    URL: string;
    taskCenter: NVueTaskCenter;
    open: () => void;
    close: () => void;
    createElement: (tagName: string, props?: Record<string, unknown>) => NVueElement;
    createText: (text: string) => Record<string, unknown>;
    createComment: (text: string) => Record<string, unknown>;
    fireEvent: (type: string) => void;
    destroy: () => void;
}

export declare interface NVueElement {
    nodeType: number;
    nodeId: string;
    type: string;
    ref: string;
    text?: string;
    attr: Record<string, unknown>;
    styleSheet: Record<string, Record<string, Record<string, unknown>>>;
    classList: string[];
    parentNode: NVueElement | null;
    children: Array<NVueElement>;
    previousSibling: NVueElement | null;
    nextSibling: NVueElement | null;
    appendChild: (node: NVueElement) => void;
    removeChild: (node: NVueElement, preserved?: boolean) => void;
    insertBefore: (node: NVueElement, before: NVueElement) => void;
    insertAfter: (node: NVueElement, after: NVueElement) => void;
    setAttr: (key: string, value: any, silent?: boolean) => void;
    setAttrs: (attrs: Record<string, unknown>, silent?: boolean) => void;
    setClassList: (classList: string[]) => void;
    setStyle: (key: string, value: any, silent?: boolean) => void;
    setStyles: (attrs: Record<string, unknown>, silent?: boolean) => void;
    setStyleSheet: (styleSheet: Record<string, Record<string, Record<string, unknown>>>) => void;
    addEvent: (type: string, handler: Function, args?: Array<any>) => void;
    removeEvent: (type: string) => void;
    fireEvent: (type: string) => void;
    destroy: () => void;
}

export declare interface NVueEnvironment {
    platform: string;
    osName: string;
    osVersion: string;
    appName: string;
    appVersion: string;
    deviceModel: string;
    deviceWidth: number;
    deviceHeight: number;
    scale: number;
    userAgent?: string;
    dpr?: number;
    rem?: number;
}

export declare interface NVueInstanceContext {
    Vue: Vue_2;
}

export declare interface NVueInstanceOption {
    instanceId: string;
    config: NVueConfigAPI;
    document?: NVueDocument;
    Vue?: Vue_2;
    app?: ComponentPublicInstance_2;
    data?: Record<string, unknown>;
}

export declare interface NVueRuntimeContext {
    nvue: NVue;
    service: Record<string, unknown>;
    BroadcastChannel?: Function;
    SharedObject: Record<string, unknown>;
}

export declare interface NVueTaskCenter {
    instanceId: string;
    callbackManager: unknown;
    send: (type: string, params: Record<string, unknown>, args: any[], options?: Record<string, unknown>) => void;
    registerHook: (componentId: string, type: string, hook: string, fn: Function) => void;
    updateData: (componentId: string, data: Record<string, unknown> | void, callback?: Function) => void;
}

export declare const OFF_THEME_CHANGE = "offThemeChange";

export declare const ON_ADD_TO_FAVORITES = "onAddToFavorites";

export declare const ON_APP_ENTER_BACKGROUND = "onAppEnterBackground";

export declare const ON_APP_ENTER_FOREGROUND = "onAppEnterForeground";

export declare const ON_BACK_PRESS = "onBackPress";

export declare const ON_ERROR = "onError";

export declare const ON_EXIT = "onExit";

export declare const ON_HIDE = "onHide";

export declare const ON_INIT = "onInit";

export declare const ON_KEYBOARD_HEIGHT_CHANGE = "onKeyboardHeightChange";

export declare const ON_LAUNCH = "onLaunch";

export declare const ON_LOAD = "onLoad";

export declare const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";

export declare const ON_NAVIGATION_BAR_CHANGE = "onNavigationBarChange";

export declare const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";

export declare const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";

export declare const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";

export declare const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";

export declare const ON_PAGE_NOT_FOUND = "onPageNotFound";

export declare const ON_PAGE_SCROLL = "onPageScroll";

export declare const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";

export declare const ON_REACH_BOTTOM = "onReachBottom";

export declare const ON_REACH_BOTTOM_DISTANCE = 50;

export declare const ON_READY = "onReady";

export declare const ON_RESIZE = "onResize";

export declare const ON_SAVE_EXIT_STATE = "onSaveExitState";

export declare const ON_SHARE_APP_MESSAGE = "onShareAppMessage";

export declare const ON_SHARE_TIMELINE = "onShareTimeline";

export declare const ON_SHOW = "onShow";

export declare const ON_TAB_ITEM_TAP = "onTabItemTap";

export declare const ON_THEME_CHANGE = "onThemeChange";

export declare const ON_UNHANDLE_REJECTION = "onUnhandledRejection";

export declare const ON_UNLOAD = "onUnload";

export declare const ON_WEB_INVOKE_APP_SERVICE = "onWebInvokeAppService";

export declare const ON_WXS_INVOKE_CALL_METHOD = "onWxsInvokeCallMethod";

export declare function once<T extends (...args: any[]) => any>(fn: T, ctx?: unknown): T;

/**
 * 提供 createApp 的回调事件，方便三方插件接收 App 对象，处理挂靠全局 mixin 之类的逻辑
 */
export declare function onCreateVueApp(hook: CreateVueAppHook): void;

declare interface Options {
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
}

export declare type PageAction = PageCreateAction | PageCreatedAction | PageUpdateAction | PageScrollAction;

export declare type PageCreateAction = [typeof ACTION_TYPE_PAGE_CREATE, PageCreateData];

export declare type PageCreatedAction = [typeof ACTION_TYPE_PAGE_CREATED];

export declare interface PageCreateData extends PageNodeOptions {
}

export declare interface PageNodeOptions {
    css: boolean;
    route: string;
    version: number;
    locale: string;
    platform: string;
    pixelRatio: number;
    windowWidth: number;
    disableScroll: boolean;
    onPageScroll: boolean;
    onPageReachBottom: boolean;
    onReachBottomDistance: number;
    statusbarHeight: number;
    windowTop: number;
    windowBottom: number;
}

/**
 * onReachBottomDistance
 */
export declare type PageScrollAction = [typeof ACTION_TYPE_PAGE_SCROLL, number];

export declare type PageUpdateAction = CreateAction | InsertAction | RemoveAction | AddEventAction | AddWxsEventAction | RemoveEventAction | SetAttributeAction | RemoveAttributeAction | SetTextAction;

export declare function parseEventName(name: string): [string, EventListenerOptions | undefined];

export declare function parseNVueDataset(attr?: Record<string, unknown>): Record<string, unknown>;

/**
 * https://github.com/vuejs/vue-router-next/blob/master/src/query.ts
 * @internal
 *
 * @param search - search string to parse
 * @returns a query object
 */
export declare function parseQuery(search: string): Record<string, any>;

export declare function parseUrl(url: string): {
    path: string;
    query: Record<string, any>;
};

export declare function passive(passive: boolean): {
    passive: boolean;
};

export declare const PLUS_RE: RegExp;

export declare function plusReady(callback: () => void): void;

export declare const PRIMARY_COLOR = "#007aff";

/**
 * nodeId
 */
export declare type RemoveAction = [typeof ACTION_TYPE_REMOVE, number];

/**
 * nodeId
 * name
 */
export declare type RemoveAttributeAction = [
typeof ACTION_TYPE_REMOVE_ATTRIBUTE,
number,
string | number
];

/**
 * nodeId
 * event
 */
export declare type RemoveEventAction = [
typeof ACTION_TYPE_REMOVE_EVENT,
number,
string | number
];

export declare function removeLeadingSlash(str: string): string;

export declare const RENDERJS_MODULES = "renderjsModules";

export declare function resolveComponentInstance(instance?: ComponentInternalInstance | ComponentPublicInstance): ComponentPublicInstance | undefined;

export declare function resolveOwnerEl(instance: ComponentInternalInstance, multi: true): RendererNode[];

export declare function resolveOwnerEl(instance: ComponentInternalInstance): RendererNode | null;

export declare function resolveOwnerVm(vm: ComponentInternalInstance): ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | undefined;

export declare const RESPONSIVE_MIN_WIDTH = 768;

export declare type Rpx2UnitOptions = typeof defaultRpx2Unit;

export declare const sanitise: (val: unknown) => any;

export declare const SCHEME_RE: RegExp;

declare function scrollTo_2(scrollTop: number | string, duration: number, isH5?: boolean): void;
export { scrollTo_2 as scrollTo }

export declare const SELECTED_COLOR = "#0062cc";

/**
 * nodeId
 * name
 * value
 */
export declare type SetAttributeAction = [
typeof ACTION_TYPE_SET_ATTRIBUTE,
number,
string | number,
unknown | number
];

/**
 * nodeId
 * text
 */
export declare type SetTextAction = [
typeof ACTION_TYPE_SET_TEXT,
number,
string | number
];

export declare const SLOT_DEFAULT_NAME = "d";

export declare function sortObject<T extends Object>(obj: T): T;

export declare function stringifyQuery(obj?: Record<string, any>, encodeStr?: typeof encodeURIComponent): string;

export declare const TABBAR_HEIGHT = 50;

export declare const TAGS: string[];

declare interface Timer {
    setTimeout: Function;
    clearTimeout: Function;
}

export declare const UNI_SSR = "__uniSSR";

export declare const UNI_SSR_DATA = "data";

export declare const UNI_SSR_GLOBAL_DATA = "globalData";

export declare const UNI_SSR_STORE = "store";

export declare const UNI_SSR_TITLE = "title";

export declare const UNI_STORAGE_LOCALE = "UNI_LOCALE";

export declare class UniBaseNode extends UniNode {
    attributes: Record<string, unknown>;
    style: null | string | Record<string, string | string[]>;
    vShow: null | boolean;
    protected _html: string | null;
    constructor(nodeType: UniNodeType, nodeName: string, container: UniElement | IUniPageNode);
    get className(): string;
    set className(val: string);
    get innerHTML(): string;
    set innerHTML(html: string);
    addEventListener(type: string, listener: UniEventListener, options?: AddEventListenerOptions): void;
    removeEventListener(type: string, callback: UniEventListener, options?: EventListenerOptions): void;
    getAttribute(qualifiedName: string): unknown;
    removeAttribute(qualifiedName: string): void;
    setAttribute(qualifiedName: string, value: unknown): void;
    toJSON({ attr, normalize, }?: {
        attr?: boolean;
        children?: boolean;
        normalize?: (val: any, includeValue?: boolean) => any | number;
    }): Partial<UniNodeJSON>;
}

export declare class UniCommentNode extends UniNode {
    constructor(text: string, container: UniElement | IUniPageNode);
    toJSON(opts?: {
        attr?: boolean;
    }): {
        i?: undefined;
    } | {
        i: number;
    };
}

declare type UniCSSStyleDeclarationJSON = string | null | Record<string, string | string[]> | [string, Record<string, string | string[]>];

export declare class UniElement extends UniBaseNode {
    tagName: string;
    constructor(nodeName: string, container: UniElement | IUniPageNode);
}

export declare class UniEvent {
    type: string;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    detail?: Record<string, any>;
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
    modifiers?: string[];
    wxsEvent?: string;
}

declare interface UniEventOptions {
    bubbles: boolean;
    cancelable: boolean;
}

declare class UniEventTarget {
    listeners: Record<string, UniEventListener[]>;
    dispatchEvent(evt: UniEvent): boolean;
    addEventListener(type: string, listener: UniEventListener, options?: AddEventListenerOptions): void;
    removeEventListener(type: string, callback: UniEventListener, options?: AddEventListenerOptions): void;
}

export declare class UniInputElement extends UniElement {
    get value(): string | number;
    set value(val: string | number);
}

export declare const UniLifecycleHooks: readonly ["onShow", "onHide", "onLaunch", "onError", "onThemeChange", "onPageNotFound", "onUnhandledRejection", "onExit", "onInit", "onLoad", "onReady", "onUnload", "onResize", "onBackPress", "onPageScroll", "onTabItemTap", "onReachBottom", "onPullDownRefresh", "onShareTimeline", "onAddToFavorites", "onShareAppMessage", "onSaveExitState", "onNavigationBarButtonTap", "onNavigationBarSearchInputClicked", "onNavigationBarSearchInputChanged", "onNavigationBarSearchInputConfirmed", "onNavigationBarSearchInputFocusChanged"];

export declare class UniNode extends UniEventTarget {
    nodeId?: number;
    nodeType: UniNodeType;
    nodeName: string;
    childNodes: UniNode[];
    pageNode: IUniPageNode | null;
    parentNode: UniNode | null;
    __vueParentComponent?: ComponentInternalInstance;
    protected _text: string | null;
    constructor(nodeType: UniNodeType, nodeName: string, container: UniElement | IUniPageNode);
    get firstChild(): UniNode | null;
    get lastChild(): UniNode | null;
    get nextSibling(): UniNode | null;
    get nodeValue(): string | null;
    set nodeValue(_val: string | null);
    get textContent(): string;
    set textContent(text: string);
    get parentElement(): UniElement | null;
    get previousSibling(): UniNode | null;
    appendChild(newChild: UniNode): UniNode;
    cloneNode(deep?: boolean): UniNode;
    insertBefore(newChild: UniNode, refChild: UniNode | null): UniNode;
    removeChild(oldChild: UniNode): UniNode;
}

export declare interface UniNodeJSON {
    /**
     * nodeId
     */
    i: number;
    /**
     * nodeName
     */
    n: string | number;
    /**
     * attributes
     */
    a: Record<string, unknown>;
    /**
     * listeners
     */
    e: Record<string, number>;
    /**
     * wxs listeners
     */
    w: Record<string, [string, number]>;
    /**
     * style
     */
    s?: UniCSSStyleDeclarationJSON;
    /**
     * text
     */
    t?: string;
}

declare interface UniNodeJSONMinify {
    /**
     * nodeId
     */
    i: number;
    /**
     * nodeName
     */
    n: string | number;
    /**
     * attributes
     */
    a: DictArray;
    /**
     * listeners
     */
    e: DictArray;
    /**
     * wxs listeners
     */
    w: [number, [number, number]][];
    /**
     * style
     */
    s?: DictArray;
    /**
     * text
     */
    t?: number;
}

declare type UniNodeType = typeof NODE_TYPE_PAGE | typeof NODE_TYPE_ELEMENT | typeof NODE_TYPE_TEXT | typeof NODE_TYPE_COMMENT;

export declare class UniTextAreaElement extends UniInputElement {
}

export declare class UniTextNode extends UniBaseNode {
    constructor(text: string, container: UniElement | IUniPageNode);
    get nodeValue(): string;
    set nodeValue(text: string);
}

export declare function updateElementStyle(element: HTMLElement, styles: Partial<CSSStyleDeclaration>): void;

export declare const UVUE_BUILT_IN_TAGS: string[];

declare interface Vue_2 {
    createApp: typeof createApp;
}
export { Vue_2 as Vue }

export declare const WEB_INVOKE_APPSERVICE = "WEB_INVOKE_APPSERVICE";

export declare const WXS_MODULES = "wxsModules";

export declare const WXS_PROTOCOL = "wxs://";

export { }
