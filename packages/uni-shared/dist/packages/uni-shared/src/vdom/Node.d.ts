import type { ComponentInternalInstance } from '@vue/runtime-core';
import { UniElement } from './Element';
import { UniEventListener, UniEventTarget } from './Event';
import { UniCSSStyleDeclarationJSON } from './Style';
export declare const NODE_TYPE_PAGE = 0;
export declare const NODE_TYPE_ELEMENT = 1;
export declare const NODE_TYPE_TEXT = 3;
export declare const NODE_TYPE_COMMENT = 8;
declare type UniNodeType = typeof NODE_TYPE_PAGE | typeof NODE_TYPE_ELEMENT | typeof NODE_TYPE_TEXT | typeof NODE_TYPE_COMMENT;
export interface IUniPageNode {
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
declare type DictArray = [number, number][];
export interface UniNodeJSONMinify {
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
export interface UniNodeJSON {
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
export declare const ATTR_CLASS = "class";
export declare const ATTR_STYLE = "style";
export declare const ATTR_INNER_HTML = "innerHTML";
export declare const ATTR_TEXT_CONTENT = "textContent";
export declare const ATTR_V_SHOW = ".vShow";
export declare const ATTR_V_OWNER_ID = ".vOwnerId";
export declare const ATTR_V_RENDERJS = ".vRenderjs";
export declare const ATTR_CHANGE_PREFIX = "change:";
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
export {};
