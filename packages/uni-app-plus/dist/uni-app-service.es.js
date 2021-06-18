export function createServiceContext(Vue, weex, plus, UniServiceJSBridge,instanceContext){
const setTimeout = instanceContext.setTimeout;
const clearTimeout = instanceContext.clearTimeout;
const setInterval = instanceContext.setInterval;
const clearInterval = instanceContext.clearInterval;
const __uniConfig = instanceContext.__uniConfig;
const __uniRoutes = instanceContext.__uniRoutes;

var serviceContext = (function () {
    'use strict';

    /**
     * Make a map and return a function for checking if a key
     * is in that map.
     * IMPORTANT: all calls of this function must be prefixed with
     * \/\*#\_\_PURE\_\_\*\/
     * So that rollup can tree-shake them if necessary.
     */
    (process.env.NODE_ENV !== 'production')
        ? Object.freeze({})
        : {};
    (process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];
    const extend = Object.assign;
    const isString = (val) => typeof val === 'string';

    let isInitEntryPage = false;
    function initEntry() {
        if (isInitEntryPage) {
            return;
        }
        isInitEntryPage = true;
        let entryPagePath;
        let entryPageQuery;
        const weexPlus = weex.requireModule('plus');
        if (weexPlus.getRedirectInfo) {
            const info = weexPlus.getRedirectInfo() || {};
            entryPagePath = info.path;
            entryPageQuery = info.query ? '?' + info.query : '';
        }
        else {
            const argsJsonStr = plus.runtime.arguments;
            if (!argsJsonStr) {
                return;
            }
            try {
                const args = JSON.parse(argsJsonStr);
                entryPagePath = args.path || args.pathName;
                entryPageQuery = args.query ? '?' + args.query : '';
            }
            catch (e) { }
        }
        if (!entryPagePath || entryPagePath === __uniConfig.entryPagePath) {
            if (entryPageQuery) {
                __uniConfig.entryPageQuery = entryPageQuery;
            }
            return;
        }
        const entryRoute = '/' + entryPagePath;
        const routeOptions = __uniRoutes.find((route) => route.path === entryRoute);
        if (!routeOptions) {
            return;
        }
        if (!routeOptions.meta.isTabBar) {
            __uniConfig.realEntryPagePath =
                __uniConfig.realEntryPagePath || __uniConfig.entryPagePath;
        }
        __uniConfig.entryPagePath = entryPagePath;
        __uniConfig.entryPageQuery = entryPageQuery;
    }

    const cacheStringFunction = (fn) => {
        const cache = Object.create(null);
        return ((str) => {
            const hit = cache[str];
            return hit || (cache[str] = fn(str));
        });
    };
    const invokeArrayFns = (fns, arg) => {
        let ret;
        for (let i = 0; i < fns.length; i++) {
            ret = fns[i](arg);
        }
        return ret;
    };
    const TABBAR_HEIGHT = 50;
    const SCHEME_RE = /^([a-z-]+:)?\/\//i;
    const DATA_RE = /^data:.*,.*/;
    const WEB_INVOKE_APPSERVICE = 'WEB_INVOKE_APPSERVICE';

    function getRealRoute(fromRoute, toRoute) {
        if (toRoute.indexOf('/') === 0) {
            return toRoute;
        }
        if (toRoute.indexOf('./') === 0) {
            return getRealRoute(fromRoute, toRoute.substr(2));
        }
        const toRouteArray = toRoute.split('/');
        const toRouteLength = toRouteArray.length;
        let i = 0;
        for (; i < toRouteLength && toRouteArray[i] === '..'; i++) {
            // noop
        }
        toRouteArray.splice(0, i);
        toRoute = toRouteArray.join('/');
        const fromRouteArray = fromRoute.length > 0 ? fromRoute.split('/') : [];
        fromRouteArray.splice(fromRouteArray.length - i - 1, i + 1);
        return '/' + fromRouteArray.concat(toRouteArray).join('/');
    }

    function getCurrentPage() {
        const pages = getCurrentPages();
        const len = pages.length;
        if (len) {
            return pages[len - 1];
        }
    }
    function getCurrentPageVm() {
        const page = getCurrentPage();
        if (page) {
            return page.$vm;
        }
    }
    function invokeHook(vm, name, args) {
        if (isString(vm)) {
            args = name;
            name = vm;
            vm = getCurrentPageVm();
        }
        else if (typeof vm === 'number') {
            const page = getCurrentPages().find((page) => page.$page.id === vm);
            if (page) {
                vm = page.$vm;
            }
            else {
                vm = getCurrentPageVm();
            }
        }
        if (!vm) {
            return;
        }
        const hooks = vm.$[name];
        return hooks && invokeArrayFns(hooks, args);
    }

    function getRealPath(filepath) {
        // 无协议的情况补全 https
        if (filepath.indexOf('//') === 0) {
            return 'https:' + filepath;
        }
        // 网络资源或base64
        if (SCHEME_RE.test(filepath) || DATA_RE.test(filepath)) {
            return filepath;
        }
        if (isSystemURL(filepath)) {
            return 'file://' + normalizeLocalPath(filepath);
        }
        const wwwPath = 'file://' + normalizeLocalPath('_www');
        // 绝对路径转换为本地文件系统路径
        if (filepath.indexOf('/') === 0) {
            // 平台绝对路径 安卓、iOS
            if (filepath.startsWith('/storage/') ||
                filepath.includes('/Containers/Data/Application/')) {
                return 'file://' + filepath;
            }
            return wwwPath + filepath;
        }
        // 相对资源
        if (filepath.indexOf('../') === 0 || filepath.indexOf('./') === 0) {
            // @ts-expect-error app-view
            if (typeof __id__ === 'string') {
                // @ts-expect-error app-view
                return wwwPath + getRealRoute('/' + __id__, filepath);
            }
            else {
                const pages = getCurrentPages();
                if (pages.length) {
                    return (wwwPath + getRealRoute('/' + pages[pages.length - 1].route, filepath));
                }
            }
        }
        return filepath;
    }
    const normalizeLocalPath = cacheStringFunction((filepath) => {
        return plus.io
            .convertLocalFileSystemURL(filepath)
            .replace(/^\/?apps\//, '/android_asset/apps/')
            .replace(/\/$/, '');
    });
    function isSystemURL(filepath) {
        if (filepath.indexOf('_www') === 0 ||
            filepath.indexOf('_doc') === 0 ||
            filepath.indexOf('_documents') === 0 ||
            filepath.indexOf('_downloads') === 0) {
            return true;
        }
        return false;
    }

    const isIOS = plus.os.name === 'iOS';
    let config;
    /**
     * tabbar显示状态
     */
    let visible = true;
    let tabBar;
    /**
     * 设置角标
     * @param {string} type
     * @param {number} index
     * @param {string} text
     */
    function setTabBarBadge(type, index, text) {
        if (!tabBar) {
            return;
        }
        if (type === 'none') {
            tabBar.hideTabBarRedDot({
                index,
            });
            tabBar.removeTabBarBadge({
                index,
            });
        }
        else if (type === 'text') {
            tabBar.setTabBarBadge({
                index,
                text,
            });
        }
        else if (type === 'redDot') {
            tabBar.showTabBarRedDot({
                index,
            });
        }
    }
    /**
     * 动态设置 tabBar 某一项的内容
     */
    function setTabBarItem(index, text, iconPath, selectedIconPath) {
        const item = {
            index,
        };
        if (text !== undefined) {
            item.text = text;
        }
        if (iconPath) {
            item.iconPath = getRealPath(iconPath);
        }
        if (selectedIconPath) {
            item.selectedIconPath = getRealPath(selectedIconPath);
        }
        tabBar && tabBar.setTabBarItem(item);
    }
    /**
     * 动态设置 tabBar 的整体样式
     * @param {Object} style 样式
     */
    function setTabBarStyle(style) {
        tabBar && tabBar.setTabBarStyle(style);
    }
    /**
     * 隐藏 tabBar
     * @param {boolean} animation 是否需要动画效果
     */
    function hideTabBar(animation) {
        visible = false;
        tabBar &&
            tabBar.hideTabBar({
                animation,
            });
    }
    /**
     * 显示 tabBar
     * @param {boolean} animation 是否需要动画效果
     */
    function showTabBar(animation) {
        visible = true;
        tabBar &&
            tabBar.showTabBar({
                animation,
            });
    }
    const maskClickCallback = [];
    var tabBar$1 = {
        id: '0',
        init(options, clickCallback) {
            if (options && options.list.length) {
                config = options;
            }
            try {
                tabBar = weex.requireModule('uni-tabview');
            }
            catch (error) {
                console.log(`uni.requireNativePlugin("uni-tabview") error ${error}`);
            }
            tabBar.onMaskClick(() => {
                maskClickCallback.forEach((callback) => {
                    callback();
                });
            });
            tabBar &&
                tabBar.onClick(({ index }) => {
                    clickCallback(config.list[index], index);
                });
            tabBar &&
                tabBar.onMidButtonClick(() => {
                    // publish('onTabBarMidButtonTap', {})
                });
        },
        indexOf(page) {
            const itemLength = config && config.list && config.list.length;
            if (itemLength) {
                for (let i = 0; i < itemLength; i++) {
                    if (config.list[i].pagePath === page ||
                        config.list[i].pagePath === `${page}.html`) {
                        return i;
                    }
                }
            }
            return -1;
        },
        switchTab(page) {
            const index = this.indexOf(page);
            if (index >= 0) {
                tabBar &&
                    tabBar.switchSelect({
                        index,
                    });
                return true;
            }
            return false;
        },
        setTabBarBadge,
        setTabBarItem,
        setTabBarStyle,
        hideTabBar,
        showTabBar,
        append(webview) {
            tabBar &&
                tabBar.append({
                    id: webview.id,
                }, ({ code }) => {
                    if (code !== 0) {
                        setTimeout(() => {
                            this.append(webview);
                        }, 20);
                    }
                });
        },
        get visible() {
            return visible;
        },
        get height() {
            return ((config && config.height ? parseFloat(config.height) : TABBAR_HEIGHT) +
                plus.navigator.getSafeAreaInsets().deviceBottom);
        },
        // tabBar是否遮挡内容区域
        get cover() {
            const array = ['extralight', 'light', 'dark'];
            return isIOS && array.indexOf(config.blurEffect) >= 0;
        },
        setStyle({ mask }) {
            tabBar.setMask({
                color: mask,
            });
        },
        addEventListener(_name, callback) {
            maskClickCallback.push(callback);
        },
        removeEventListener(_name, callback) {
            const callbackIndex = maskClickCallback.indexOf(callback);
            maskClickCallback.splice(callbackIndex, 1);
        },
    };

    function initTabBar() {
        const len = __uniConfig.tabBar?.list?.length;
        if (!len) {
            return;
        }
        __uniConfig.tabBar.selectedIndex = 0;
        const selected = __uniConfig.tabBar.list.findIndex((page) => page.pagePath === __uniConfig.entryPagePath);
        tabBar$1.init(__uniConfig.tabBar, (item, index) => {
            uni.switchTab({
                url: '/' + item.pagePath,
                openType: 'switchTab',
                from: 'tabBar',
                success() {
                    invokeHook('onTabItemTap', {
                        index,
                        text: item.text,
                        pagePath: item.pagePath,
                    });
                },
            });
        });
        if (selected !== -1) {
            // 取当前 tab 索引值
            __uniConfig.tabBar.selectedIndex = selected;
            selected !== 0 && tabBar$1.switchTab(__uniConfig.entryPagePath);
        }
    }

    const callbacks = {};
    // 简单处理 view 层与 service 层的通知系统
    /**
     * 消费 view 层通知
     */
    function consumePlusMessage(type, args) {
        // 处理 web-view 组件发送的通知
        if (type === WEB_INVOKE_APPSERVICE) {
            UniServiceJSBridge.emit('onWebInvokeAppService', args.data, args.webviewIds);
            return true;
        }
        const callback = callbacks[type];
        if (callback) {
            callback(args);
            if (!callback.keepAlive) {
                delete callbacks[type];
            }
            return true;
        }
        return false;
    }

    function backbuttonListener() {
        uni.navigateBack({
            from: 'backbutton',
        });
    }

    function initGlobalEvent() {
        const plusGlobalEvent = plus.weexGlobalEvent;
        const weexGlobalEvent = weex.requireModule('weexGlobalEvent');
        const emit = UniServiceJSBridge.emit;
        if (weex.config.preload) {
            plus.key.addEventListener('backbutton', backbuttonListener);
        }
        else {
            plusGlobalEvent.addEventListener('splashclosed', () => {
                plus.key.addEventListener('backbutton', backbuttonListener);
            });
        }
        plusGlobalEvent.addEventListener('pause', () => {
            emit('onAppEnterBackground');
        });
        plusGlobalEvent.addEventListener('resume', () => {
            emit('onAppEnterForeground');
        });
        weexGlobalEvent.addEventListener('uistylechange', function (event) {
            const args = {
                theme: event.uistyle,
            };
            emit('onThemeChange', args);
        });
        plusGlobalEvent.addEventListener('plusMessage', onPlusMessage);
        // nvue webview post message
        plusGlobalEvent.addEventListener('WebviewPostMessage', onPlusMessage);
    }
    function onPlusMessage(e) {
        if (e.data && e.data.type) {
            const type = e.data.type;
            consumePlusMessage(type, e.data.args || {});
        }
    }

    let appCtx;
    const defaultApp = {
        globalData: {},
    };
    function registerApp(appVm) {
        appCtx = appVm;
        appCtx.$vm = appVm;
        extend(appCtx, defaultApp); // 拷贝默认实现
        const { $options } = appVm;
        if ($options) {
            appCtx.globalData = extend($options.globalData || {}, appCtx.globalData);
        }
        initEntry();
        initTabBar();
        initGlobalEvent();
    }

    var index = {
        __registerApp: registerApp,
    };

    return index;

}());
const uni = serviceContext.uni;
const getApp = serviceContext.getApp;
const getCurrentPages = serviceContext.getCurrentPages;
const __definePage = serviceContext.__definePage;
const __registerPage = serviceContext.__registerPage;
return serviceContext;
}
