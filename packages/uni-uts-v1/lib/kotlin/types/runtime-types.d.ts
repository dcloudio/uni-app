/// <reference types="@dcloudio/uni-app-x/types/native-global" />
import { CreateVueComponent } from '@vue/runtime-core';

declare function padStyleMapOf(style: Map<string, any>): Map<string, Map<string, any>>;

type UniConfigOnReadyCallback = () => void;
declare class UniConfig$1 {
    realEntryPagePath: string;
    entryPagePath: string;
    globalStyle: Map<string, any>;
    tabBar: Map<string, any> | null;
    conditionUrl: string;
    uniIdRouter: Map<string, any>;
    themeConfig: Map<string, Map<string, any>>;
    _ready: boolean;
    callbacks: UniConfigOnReadyCallback[];
    onReady(callback: UniConfigOnReadyCallback): void;
    get ready(): boolean;
    set ready(value: boolean);
}

type UniPageMeta$1 = {
    isQuit: boolean;
};
type UniPageRoute$1 = {
    path: string;
    component: CreateVueComponent;
    meta: UniPageMeta$1;
    style: Map<string, any>;
    needLogin?: boolean | null;
};

export type UniPageRoute = UniPageRoute$1;
export type UniPageMeta = UniPageMeta$1;
export type UniConfig = UniConfig$1;
export type PadStyleMapOf = typeof padStyleMapOf;

