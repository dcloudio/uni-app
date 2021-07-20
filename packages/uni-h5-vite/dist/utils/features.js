"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefine = exports.initFeatures = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const shared_1 = require("@vue/shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const ssr_1 = require("./ssr");
function initProjectFeature({ command }) {
    const features = {};
    if (command === 'build') {
    }
    return features;
}
function initPagesFeature({ pagesJson, command, inputDir, ssr, }) {
    const features = {
        nvue: true,
        pages: true,
        tabBar: true,
        tabBarMidButton: true,
        topWindow: false,
        leftWindow: false,
        rightWindow: false,
        navigationBar: true,
        pullDownRefresh: false,
        navigationBarButtons: true,
        navigationBarSearchInput: true,
        navigationBarTransparent: true,
    };
    const { tabBar, pages, topWindow, leftWindow, rightWindow, globalStyle } = pagesJson;
    // ssr 时强制启用多页面（需要用到router）
    if (!ssr && pages && pages.length === 1) {
        features.pages = false;
    }
    if (!(tabBar && tabBar.list && tabBar.list.length)) {
        features.tabBar = false;
        features.tabBarMidButton = false;
    }
    if (features.tabBar && !tabBar.midButton) {
        features.tabBarMidButton = false;
    }
    if (topWindow && topWindow.path) {
        features.topWindow = true;
    }
    if (leftWindow && leftWindow.path) {
        features.leftWindow = true;
    }
    if (rightWindow && rightWindow.path) {
        features.rightWindow = true;
    }
    if (globalStyle.enablePullDownRefresh) {
        features.pullDownRefresh = true;
    }
    else {
        if (pages.find((page) => page.style && page.style.enablePullDownRefresh)) {
            features.pullDownRefresh = true;
        }
    }
    if (command === 'build') {
        if (!pages.find((page) => fs_1.default.existsSync(path_1.default.resolve(inputDir, page.path + '.nvue')))) {
            features.nvue = false;
        }
        let isNavigationCustom = false;
        if (globalStyle.navigationBar.style === 'custom') {
            isNavigationCustom = true; // 全局custom
            if (pages.find((page) => page.style.navigationBar.style === 'default')) {
                isNavigationCustom = false;
            }
        }
        else {
            // 所有页面均custom
            if (pages.every((page) => page.style.navigationBar.style === 'custom')) {
                isNavigationCustom = true;
            }
        }
        if (isNavigationCustom) {
            features.navigationBar = false;
            features.navigationBarButtons = false;
            features.navigationBarSearchInput = false;
            features.navigationBarTransparent = false;
        }
        else {
            if (!pages.find((page) => shared_1.isArray(page.style.navigationBar.buttons) &&
                page.style.navigationBar.buttons.length)) {
                features.navigationBarButtons = false;
            }
            if (!globalStyle.navigationBar.searchInput &&
                !pages.find((page) => page.style.navigationBar.searchInput)) {
                features.navigationBarSearchInput = false;
            }
            if (globalStyle.navigationBar.type !== 'transparent' &&
                !pages.find((page) => page.style.navigationBar.type === 'transparent')) {
                features.navigationBarTransparent = false;
            }
        }
    }
    return features;
}
function initManifestFeature({ manifestJson, command, platform, }) {
    const features = {
        wx: false,
        wxs: true,
        rpx: true,
        promise: false,
        longpress: true,
        routerMode: '"hash"',
        i18nEn: true,
        i18nEs: true,
        i18nFr: true,
        i18nZhHans: true,
        i18nZhHant: true,
        vueOptionsApi: true,
        vueProdDevTools: false,
    };
    if (command === 'build') {
        // TODO 需要预编译一遍？
        features.wxs = false;
        features.longpress = false;
    }
    if (manifestJson.h5 &&
        manifestJson.h5.router &&
        manifestJson.h5.router.mode === 'history') {
        features.routerMode = '"history"';
    }
    const platformJson = manifestJson[platform] || {};
    const manifestFeatures = platformJson.features;
    if (manifestFeatures) {
        const { i18n } = manifestFeatures;
        if (shared_1.isArray(i18n)) {
            if (!i18n.includes('en')) {
                features.i18nEn = false;
            }
            if (!i18n.includes('es')) {
                features.i18nEs = false;
            }
            if (!i18n.includes('fr')) {
                features.i18nFr = false;
            }
            if (!i18n.includes('zh-Hans')) {
                features.i18nZhHans = false;
            }
            if (!i18n.includes('zh-Hant')) {
                features.i18nZhHant = false;
            }
        }
    }
    // TODO other features
    return features;
}
function initFeatures(options) {
    const { wx, wxs, rpx, nvue, i18nEn, i18nEs, i18nFr, i18nZhHans, i18nZhHant, vueOptionsApi, vueProdDevTools, pages, tabBar, tabBarMidButton, promise, longpress, routerMode, topWindow, leftWindow, rightWindow, navigationBar, pullDownRefresh, navigationBarButtons, navigationBarSearchInput, navigationBarTransparent, } = shared_1.extend(initManifestFeature(options), initPagesFeature(options), initProjectFeature(options));
    const features = {
        // vue
        __VUE_OPTIONS_API__: vueOptionsApi,
        __VUE_PROD_DEVTOOLS__: vueProdDevTools,
        // uni
        __UNI_FEATURE_WX__: wx,
        __UNI_FEATURE_WXS__: wxs,
        __UNI_FEATURE_RPX__: rpx,
        __UNI_FEATURE_PROMISE__: promise,
        __UNI_FEATURE_LONGPRESS__: longpress,
        __UNI_FEATURE_I18N_EN__: i18nEn,
        __UNI_FEATURE_I18N_ES__: i18nEs,
        __UNI_FEATURE_I18N_FR__: i18nFr,
        __UNI_FEATURE_I18N_ZH_HANS__: i18nZhHans,
        __UNI_FEATURE_I18N_ZH_HANT__: i18nZhHant,
        // 以下特性，编译器已自动识别是否需要启用
        __UNI_FEATURE_NVUE__: nvue,
        __UNI_FEATURE_ROUTER_MODE__: routerMode,
        __UNI_FEATURE_PAGES__: pages,
        __UNI_FEATURE_TABBAR__: tabBar,
        __UNI_FEATURE_TABBAR_MIDBUTTON__: tabBarMidButton,
        __UNI_FEATURE_TOPWINDOW__: topWindow,
        __UNI_FEATURE_LEFTWINDOW__: leftWindow,
        __UNI_FEATURE_RIGHTWINDOW__: rightWindow,
        __UNI_FEATURE_RESPONSIVE__: topWindow || leftWindow || rightWindow,
        __UNI_FEATURE_NAVIGATIONBAR__: navigationBar,
        __UNI_FEATURE_PULL_DOWN_REFRESH__: pullDownRefresh,
        __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__: navigationBarButtons,
        __UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__: navigationBarSearchInput,
        __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__: navigationBarTransparent, // 是否启用透明标题栏
    };
    // ssr nodejs features
    if (options.ssr) {
        Object.keys(features).forEach((name) => {
            const value = features[name];
            shared_1.extend(globalThis, {
                [name]: shared_1.isString(value) ? JSON.parse(value) : value,
            });
        });
    }
    return features;
}
exports.initFeatures = initFeatures;
function createDefine(command, config) {
    const platform = process.env.UNI_PLATFORM;
    const inputDir = process.env.UNI_INPUT_DIR;
    return initFeatures({
        inputDir,
        command,
        platform,
        pagesJson: uni_cli_shared_1.parsePagesJsonOnce(inputDir, platform),
        manifestJson: uni_cli_shared_1.parseManifestJsonOnce(inputDir),
        ssr: ssr_1.isSsr(command, config) || ssr_1.isSsrManifest(command, config),
    });
}
exports.createDefine = createDefine;
