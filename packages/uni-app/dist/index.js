"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onNavigationBarSearchInputClicked = exports.onNavigationBarSearchInputConfirmed = exports.onNavigationBarSearchInputChanged = exports.onBackPress = exports.onNavigationBarButtonTap = exports.onTabItemTap = exports.onResize = exports.onPageScroll = exports.onAddToFavorites = exports.onShareTimeline = exports.onShareAppMessage = exports.onReachBottom = exports.onPullDownRefresh = exports.onUnload = exports.onReady = exports.onLoad = exports.onInit = exports.onUniNViewMessage = exports.onThemeChange = exports.onUnhandledRejection = exports.onPageNotFound = exports.onError = exports.onLaunch = exports.onHide = exports.onShow = exports.initUtsPackageName = exports.initUtsClassName = exports.initUtsIndexClassName = exports.initUtsProxyFunction = exports.initUtsProxyClass = void 0;
var composition_api_1 = require("@vue/composition-api");
var app = require("./app");
var mp = require("./mp");
var uts_1 = require("./uts");
Object.defineProperty(exports, "initUtsProxyClass", { enumerable: true, get: function () { return uts_1.initUtsProxyClass; } });
Object.defineProperty(exports, "initUtsProxyFunction", { enumerable: true, get: function () { return uts_1.initUtsProxyFunction; } });
Object.defineProperty(exports, "initUtsIndexClassName", { enumerable: true, get: function () { return uts_1.initUtsIndexClassName; } });
Object.defineProperty(exports, "initUtsClassName", { enumerable: true, get: function () { return uts_1.initUtsClassName; } });
Object.defineProperty(exports, "initUtsPackageName", { enumerable: true, get: function () { return uts_1.initUtsPackageName; } });
var lifecycles = [];
var createLifeCycle = function (lifecycle) {
    lifecycles.push(lifecycle);
    var fn = (0, composition_api_1.createLifeCycle)(lifecycle);
    return function (callback, target) {
        return fn(callback, target);
    };
};
if (typeof plus === 'object') {
    app.init();
}
else if (typeof window === 'object' && 'document' in window) {
}
else {
    mp.init(lifecycles);
}
exports.onShow = createLifeCycle('onShow');
exports.onHide = createLifeCycle('onHide');
exports.onLaunch = createLifeCycle('onLaunch');
exports.onError = createLifeCycle('onError');
exports.onPageNotFound = createLifeCycle('onPageNotFound');
exports.onUnhandledRejection = createLifeCycle('onUnhandledRejection');
exports.onThemeChange = createLifeCycle('onThemeChange');
exports.onUniNViewMessage = createLifeCycle('onUniNViewMessage');
exports.onInit = createLifeCycle('onInit');
exports.onLoad = createLifeCycle('onLoad');
exports.onReady = createLifeCycle('onReady');
exports.onUnload = createLifeCycle('onUnload');
exports.onPullDownRefresh = createLifeCycle('onPullDownRefresh');
exports.onReachBottom = createLifeCycle('onReachBottom');
exports.onShareAppMessage = createLifeCycle('onShareAppMessage');
exports.onShareTimeline = createLifeCycle('onShareTimeline');
exports.onAddToFavorites = createLifeCycle('onAddToFavorites');
exports.onPageScroll = createLifeCycle('onPageScroll');
exports.onResize = createLifeCycle('onResize');
exports.onTabItemTap = createLifeCycle('onTabItemTap');
exports.onNavigationBarButtonTap = createLifeCycle('onNavigationBarButtonTap');
exports.onBackPress = createLifeCycle('onBackPress');
exports.onNavigationBarSearchInputChanged = createLifeCycle('onNavigationBarSearchInputChanged');
exports.onNavigationBarSearchInputConfirmed = createLifeCycle('onNavigationBarSearchInputConfirmed');
exports.onNavigationBarSearchInputClicked = createLifeCycle('onNavigationBarSearchInputClicked');
