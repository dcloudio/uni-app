import { CreateVueComponent } from '@vue/runtime-core';

type UniConfigOnReadyCallback = () => void;
declare class UniConfig {
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

type UniPageMetaOrigin = {
    isQuit: boolean;
};
type UniPageRouteOrigin = {
    path: string;
    component: CreateVueComponent;
    meta: UniPageMetaOrigin;
    style: Map<string, any>;
    needLogin?: boolean | null;
};

declare global {
    type UniPageRoute = UniPageRouteOrigin;
    type UniPageMeta = UniPageMetaOrigin;
    const __uniConfig: UniConfig;
    const __uniRoutes: UniPageRoute[];
    function utsMapOf(obj: Record<string, any>): Map<string, any | null>;
    function utsMapOf<K, V>(obj: Array<Array<any>>): Map<string, any | null>;
    function padStyleMapOf(style: Map<string, any>): Map<string, Map<string, any>>;
    namespace io {
        namespace dcloud {
            namespace uniapp {
                namespace appframe {
                    class AppConfig {
                        name: string;
                        appid: string;
                        versionName: string;
                        versionCode: string;
                        uniCompilerVersion: string;
                        singleThread: boolean;
                        flexDirection: string;
                        splashScreen: Map<string, any> | null;
                        isShowSplashAd: boolean;
                        darkmode: boolean;
                        defaultAppTheme: string;
                    }
                }
            }
        }
    }
}
