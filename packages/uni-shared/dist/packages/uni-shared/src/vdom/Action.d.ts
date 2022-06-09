import { UniNodeJSON, UniNodeJSONMinify } from './Node';
export declare const ACTION_TYPE_PAGE_CREATE = 1;
export declare const ACTION_TYPE_PAGE_CREATED = 2;
export declare const ACTION_TYPE_CREATE = 3;
export declare const ACTION_TYPE_INSERT = 4;
export declare const ACTION_TYPE_REMOVE = 5;
export declare const ACTION_TYPE_SET_ATTRIBUTE = 6;
export declare const ACTION_TYPE_REMOVE_ATTRIBUTE = 7;
export declare const ACTION_TYPE_ADD_EVENT = 8;
export declare const ACTION_TYPE_REMOVE_EVENT = 9;
export declare const ACTION_TYPE_SET_TEXT = 10;
export declare const ACTION_TYPE_ADD_WXS_EVENT = 12;
export declare const ACTION_TYPE_PAGE_SCROLL = 15;
export declare const ACTION_TYPE_EVENT = 20;
export interface PageNodeOptions {
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
export interface PageCreateData extends PageNodeOptions {
}
export declare type PageCreateAction = [typeof ACTION_TYPE_PAGE_CREATE, PageCreateData];
export declare type PageCreatedAction = [typeof ACTION_TYPE_PAGE_CREATED];
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
/**
 * nodeId
 */
export declare type RemoveAction = [typeof ACTION_TYPE_REMOVE, number];
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
/**
 * nodeId
 * event
 */
export declare type RemoveEventAction = [
    typeof ACTION_TYPE_REMOVE_EVENT,
    number,
    string | number
];
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
 * name
 */
export declare type RemoveAttributeAction = [
    typeof ACTION_TYPE_REMOVE_ATTRIBUTE,
    number,
    string | number
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
/**
 * onReachBottomDistance
 */
export declare type PageScrollAction = [typeof ACTION_TYPE_PAGE_SCROLL, number];
export declare type PageUpdateAction = CreateAction | InsertAction | RemoveAction | AddEventAction | AddWxsEventAction | RemoveEventAction | SetAttributeAction | RemoveAttributeAction | SetTextAction;
export declare type PageAction = PageCreateAction | PageCreatedAction | PageUpdateAction | PageScrollAction;
