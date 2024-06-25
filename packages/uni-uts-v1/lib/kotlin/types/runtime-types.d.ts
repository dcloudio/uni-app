import { CreateVueComponent } from '@vue/runtime-core';

export type UniPageMeta = {
    isQuit: boolean;
};
export type UniPageRoute = {
    path: string;
    component: CreateVueComponent;
    meta: UniPageMeta;
    style: Map<string, any>;
    needLogin?: boolean | null;
};
declare const __uniRoutes: UniPageRoute[];

type ConfigOnReadyCallback = () => void;
declare class Config {
    realEntryPagePath: string;
    entryPagePath: string;
    globalStyle: Map<string, any>;
    tabBar: Map<string, any> | null;
    conditionUrl: string;
    uniIdRouter: Map<string, any>;
    themeConfig: Map<string, Map<string, any>>;
    _ready: boolean;
    callbacks: ConfigOnReadyCallback[];
    onReady(callback: ConfigOnReadyCallback): void;
    get ready(): boolean;
    set ready(value: boolean);
}
declare const __uniConfig: Config;

/**
 * For converting {{ interpolation }} values to displayed strings.
 * 目前 JSON.stringify 不支持第二个参数 replace，所以这里先简单的实现
 * @private
 */
export declare function toDisplayString(value: any | null): string;

export declare function utsMapOf(obj: Record<string, any>): Map<string, any | null>;
export declare function utsMapOf<K, V>(obj: Array<Array<any>>): Map<string, any | null>;
export declare function padStyleMapOf(style: Map<string, any>): Map<string, Map<string, any>>;

export { __uniConfig, __uniRoutes,  };
