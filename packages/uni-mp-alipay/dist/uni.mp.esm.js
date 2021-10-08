import { isPlainObject, isArray, extend, hyphenate, isObject, hasOwn, toNumber, capitalize, isFunction, NOOP, EMPTY_OBJ, camelize } from '@vue/shared';
import { onUnmounted, injectHook, ref } from 'vue';

const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
    const res = obj
        ? Object.keys(obj)
            .map((key) => {
            let val = obj[key];
            if (typeof val === undefined || val === null) {
                val = '';
            }
            else if (isPlainObject(val)) {
                val = JSON.stringify(val);
            }
            return encodeStr(key) + '=' + encodeStr(val);
        })
            .filter((x) => x.length > 0)
            .join('&')
        : null;
    return res ? `?${res}` : '';
}

function cache(fn) {
    const cache = Object.create(null);
    return (str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
}
const invokeArrayFns = (fns, arg) => {
    let ret;
    for (let i = 0; i < fns.length; i++) {
        ret = fns[i](arg);
    }
    return ret;
};
// lifecycle
// App and Page
const ON_SHOW = 'onShow';
const ON_HIDE = 'onHide';
//App
const ON_LAUNCH = 'onLaunch';
const ON_ERROR = 'onError';
const ON_THEME_CHANGE = 'onThemeChange';
const ON_PAGE_NOT_FOUND = 'onPageNotFound';
const ON_UNHANDLE_REJECTION = 'onUnhandledRejection';
//Page
const ON_LOAD = 'onLoad';
const ON_READY = 'onReady';
const ON_UNLOAD = 'onUnload';
const ON_RESIZE = 'onResize';
const ON_BACK_PRESS = 'onBackPress';
const ON_TAB_ITEM_TAP = 'onTabItemTap';
const ON_REACH_BOTTOM = 'onReachBottom';
const ON_PULL_DOWN_REFRESH = 'onPullDownRefresh';
const ON_ADD_TO_FAVORITES = 'onAddToFavorites';
const ON_SHARE_APP_MESSAGE = 'onShareAppMessage';

class EventChannel {
    constructor(id, events) {
        this.id = id;
        this.listener = {};
        this.emitCache = {};
        if (events) {
            Object.keys(events).forEach((name) => {
                this.on(name, events[name]);
            });
        }
    }
    emit(eventName, ...args) {
        const fns = this.listener[eventName];
        if (!fns) {
            return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
        }
        fns.forEach((opt) => {
            opt.fn.apply(opt.fn, args);
        });
        this.listener[eventName] = fns.filter((opt) => opt.type !== 'once');
    }
    on(eventName, fn) {
        this._addListener(eventName, 'on', fn);
        this._clearCache(eventName);
    }
    once(eventName, fn) {
        this._addListener(eventName, 'once', fn);
        this._clearCache(eventName);
    }
    off(eventName, fn) {
        const fns = this.listener[eventName];
        if (!fns) {
            return;
        }
        if (fn) {
            for (let i = 0; i < fns.length;) {
                if (fns[i].fn === fn) {
                    fns.splice(i, 1);
                    i--;
                }
                i++;
            }
        }
        else {
            delete this.listener[eventName];
        }
    }
    _clearCache(eventName) {
        const cacheArgs = this.emitCache[eventName];
        if (cacheArgs) {
            for (; cacheArgs.length > 0;) {
                this.emit.apply(this, [eventName, ...cacheArgs.shift()]);
            }
        }
    }
    _addListener(eventName, type, fn) {
        (this.listener[eventName] || (this.listener[eventName] = [])).push({
            fn,
            type,
        });
    }
}

const eventChannels = {};
const eventChannelStack = [];
function getEventChannel(id) {
    if (id) {
        const eventChannel = eventChannels[id];
        delete eventChannels[id];
        return eventChannel;
    }
    return eventChannelStack.shift();
}

function initVueIds(vueIds, mpInstance) {
    if (!vueIds) {
        return;
    }
    const ids = vueIds.split(',');
    const len = ids.length;
    if (len === 1) {
        mpInstance._$vueId = ids[0];
    }
    else if (len === 2) {
        mpInstance._$vueId = ids[0];
        mpInstance._$vuePid = ids[1];
    }
}
function initWxsCallMethods(methods, wxsCallMethods) {
    if (!isArray(wxsCallMethods)) {
        return;
    }
    wxsCallMethods.forEach((callMethod) => {
        methods[callMethod] = function (args) {
            return this.$vm[callMethod](args);
        };
    });
}
function findVmByVueId(instance, vuePid) {
    // 标准 vue3 中 没有 $children，定制了内核
    const $children = instance.$children;
    // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
    for (let i = $children.length - 1; i >= 0; i--) {
        const childVm = $children[i];
        if (childVm.$scope._$vueId === vuePid) {
            return childVm;
        }
    }
    // 反向递归查找
    let parentVm;
    for (let i = $children.length - 1; i >= 0; i--) {
        parentVm = findVmByVueId($children[i], vuePid);
        if (parentVm) {
            return parentVm;
        }
    }
}
function getTarget(obj, path) {
    const parts = path.split('.');
    let key = parts[0];
    if (key.indexOf('__$n') === 0) {
        //number index
        key = parseInt(key.replace('__$n', ''));
    }
    if (!obj) {
        obj = {};
    }
    if (parts.length === 1) {
        return obj[key];
    }
    return getTarget(obj[key], parts.slice(1).join('.'));
}

function getValue(dataPath, target) {
    return getTarget(target || this, dataPath);
}
function getClass(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass);
}
function getStyle(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
        return '';
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle
        ? extend(staticStyle, dynamicStyleObj)
        : dynamicStyleObj;
    return Object.keys(styleObj)
        .map(function (name) {
        return hyphenate(name) + ':' + styleObj[name];
    })
        .join(';');
}
function toObject(arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i]);
        }
    }
    return res;
}
function normalizeStyleBinding(bindingStyle) {
    if (Array.isArray(bindingStyle)) {
        return toObject(bindingStyle);
    }
    if (typeof bindingStyle === 'string') {
        return parseStyleText(bindingStyle);
    }
    return bindingStyle;
}
var parseStyleText = cache(function parseStyleText(cssText) {
    var res = {};
    var listDelimiter = /;(?![^(]*\))/g;
    var propertyDelimiter = /:(.+)/;
    cssText.split(listDelimiter).forEach(function (item) {
        if (item) {
            var tmp = item.split(propertyDelimiter);
            tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
        }
    });
    return res;
});
function isDef(v) {
    return v !== undefined && v !== null;
}
function renderClass(staticClass, dynamicClass) {
    if (isDef(staticClass) || isDef(dynamicClass)) {
        return concat(staticClass, stringifyClass(dynamicClass));
    }
    /* istanbul ignore next */
    return '';
}
function concat(a, b) {
    return a ? (b ? a + ' ' + b : a) : b || '';
}
function stringifyClass(value) {
    if (Array.isArray(value)) {
        return stringifyArray(value);
    }
    if (isObject(value)) {
        return stringifyObject(value);
    }
    if (typeof value === 'string') {
        return value;
    }
    /* istanbul ignore next */
    return '';
}
function stringifyArray(value) {
    var res = '';
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
        if (isDef((stringified = stringifyClass(value[i]))) && stringified !== '') {
            if (res) {
                res += ' ';
            }
            res += stringified;
        }
    }
    return res;
}
function stringifyObject(value) {
    var res = '';
    for (var key in value) {
        if (value[key]) {
            if (res) {
                res += ' ';
            }
            res += key;
        }
    }
    return res;
}

function setModel(target, key, value, modifiers) {
    if (isArray(modifiers)) {
        if (modifiers.indexOf('trim') !== -1) {
            value = value.trim();
        }
        if (modifiers.indexOf('number') !== -1) {
            value = toNumber(value);
        }
    }
    if (!target) {
        target = this;
    }
    target[key] = value;
}
function setSync(target, key, value) {
    if (!target) {
        target = this;
    }
    target[key] = value;
}
function getOrig(data) {
    if (isPlainObject(data)) {
        return data.$orig || data;
    }
    return data;
}
function map(val, iteratee) {
    let ret, i, l, keys, key;
    if (isArray(val)) {
        ret = new Array(val.length);
        for (i = 0, l = val.length; i < l; i++) {
            ret[i] = iteratee(val[i], i);
        }
        return ret;
    }
    else if (isObject(val)) {
        keys = Object.keys(val);
        ret = Object.create(null);
        for (i = 0, l = keys.length; i < l; i++) {
            key = keys[i];
            ret[key] = iteratee(val[key], key, i);
        }
        return ret;
    }
    return [];
}
const MP_METHODS = [
    'createSelectorQuery',
    'createIntersectionObserver',
    'selectAllComponents',
    'selectComponent',
];
function createEmitFn(oldEmit, ctx) {
    return function emit(event, ...args) {
        if (ctx.$scope && event) {
            ctx.$scope.triggerEvent(event, { __args__: args });
        }
        {
            const vnode = this.$.vnode;
            const props = vnode && vnode.props;
            if (props && props[`on${capitalize(event)}`]) {
                return;
            }
        }
        return oldEmit.apply(this, [event, ...args]);
    };
}
function initBaseInstance(instance, options) {
    const ctx = instance.ctx;
    // mp
    ctx.mpType = options.mpType; // @deprecated
    ctx.$mpType = options.mpType;
    ctx.$scope = options.mpInstance;
    // TODO @deprecated
    ctx.$mp = {};
    if (__VUE_OPTIONS_API__) {
        ctx._self = {};
    }
    // $vm
    ctx.$scope.$vm = instance.proxy;
    // slots
    {
        Object.defineProperty(instance, 'slots', {
            get() {
                return this.$scope && this.$scope.props.$slots;
            },
        });
    }
    ctx.getOpenerEventChannel = function () {
        if (!this.__eventChannel__) {
            this.__eventChannel__ = new EventChannel();
        }
        return this.__eventChannel__;
    };
    ctx.$hasHook = hasHook;
    ctx.$callHook = callHook;
    // $emit
    instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
    initBaseInstance(instance, options);
    {
        initScopedSlotsParams(instance);
    }
    const ctx = instance.ctx;
    MP_METHODS.forEach((method) => {
        ctx[method] = function (...args) {
            const mpInstance = ctx.$scope;
            if (mpInstance && mpInstance[method]) {
                return mpInstance[method].apply(mpInstance, args);
            }
            {
                return my[method] && my[method].apply(my, args);
            }
        };
    });
    // TODO other
    ctx.__set_model = setModel;
    ctx.__set_sync = setSync;
    ctx.__get_orig = getOrig;
    // TODO
    ctx.__get_value = getValue;
    ctx.__get_class = getClass;
    ctx.__get_style = getStyle;
    ctx.__map = map;
}
function initMocks(instance, mpInstance, mocks) {
    const ctx = instance.ctx;
    mocks.forEach((mock) => {
        if (hasOwn(mpInstance, mock)) {
            ctx[mock] = mpInstance[mock];
        }
    });
}
function hasHook(name) {
    const hooks = this.$[name];
    if (hooks && hooks.length) {
        return true;
    }
    return false;
}
function callHook(name, args) {
    if (name === 'mounted') {
        callHook.call(this, 'bm'); // beforeMount
        this.$.isMounted = true;
        name = 'm';
    }
    else if (name === 'onLoad' && args && args.__id__) {
        this.__eventChannel__ = getEventChannel(args.__id__);
        delete args.__id__;
    }
    const hooks = this.$[name];
    return hooks && invokeArrayFns(hooks, args);
}
const center = {};
const parents = {};
function initScopedSlotsParams(instance) {
    const ctx = instance.ctx;
    ctx.$hasScopedSlotsParams = function (vueId) {
        const has = center[vueId];
        if (!has) {
            parents[vueId] = this;
            onUnmounted(() => {
                delete parents[vueId];
            }, instance);
        }
        return has;
    };
    ctx.$getScopedSlotsParams = function (vueId, name, key) {
        const data = center[vueId];
        if (data) {
            const object = data[name] || {};
            return key ? object[key] : object;
        }
        else {
            parents[vueId] = this;
            onUnmounted(() => {
                delete parents[vueId];
            }, instance);
        }
    };
    ctx.$setScopedSlotsParams = function (name, value) {
        const vueIds = instance.attrs.vueId;
        if (vueIds) {
            const vueId = vueIds.split(',')[0];
            const object = (center[vueId] = center[vueId] || {});
            object[name] = value;
            if (parents[vueId]) {
                parents[vueId].$forceUpdate();
            }
        }
    };
    onUnmounted(function () {
        const propsData = instance.attrs;
        const vueId = propsData && propsData.vueId;
        if (vueId) {
            delete center[vueId];
            delete parents[vueId];
        }
    }, instance);
}

const PAGE_HOOKS = [
    ON_LOAD,
    ON_SHOW,
    ON_HIDE,
    ON_UNLOAD,
    ON_RESIZE,
    ON_TAB_ITEM_TAP,
    ON_REACH_BOTTOM,
    ON_PULL_DOWN_REFRESH,
    ON_ADD_TO_FAVORITES,
    // 'onReady', // lifetimes.ready
    // 'onPageScroll', // 影响性能，开发者手动注册
    // 'onShareTimeline', // 右上角菜单，开发者手动注册
    // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = new Set()) {
    if (vueOptions) {
        Object.keys(vueOptions).forEach((name) => {
            if (name.indexOf('on') === 0 && isFunction(vueOptions[name])) {
                hooks.add(name);
            }
        });
        if (__VUE_OPTIONS_API__) {
            const { extends: extendsOptions, mixins } = vueOptions;
            if (mixins) {
                mixins.forEach((mixin) => findHooks(mixin, hooks));
            }
            if (extendsOptions) {
                findHooks(extendsOptions, hooks);
            }
        }
    }
    return hooks;
}
function initHook(mpOptions, hook, excludes) {
    if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
        mpOptions[hook] = function (args) {
            return this.$vm && this.$vm.$callHook(hook, args);
        };
    }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
    hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
    findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}

my.appLaunchHooks = [];
function injectAppLaunchHooks(appInstance) {
    my.appLaunchHooks.forEach((hook) => {
        injectHook(ON_LAUNCH, hook, appInstance);
    });
}

const HOOKS = [
    ON_SHOW,
    ON_HIDE,
    ON_ERROR,
    ON_THEME_CHANGE,
    ON_PAGE_NOT_FOUND,
    ON_UNHANDLE_REJECTION,
];
{
    HOOKS.push(ON_SHARE_APP_MESSAGE);
}
function parseApp(instance, parseAppOptions) {
    const internalInstance = instance.$;
    const appOptions = {
        globalData: (instance.$options && instance.$options.globalData) || {},
        $vm: instance,
        onLaunch(options) {
            const ctx = internalInstance.ctx;
            if (this.$vm && ctx.$scope) {
                // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
                return;
            }
            initBaseInstance(internalInstance, {
                mpType: 'app',
                mpInstance: this,
                slots: [],
            });
            injectAppLaunchHooks(internalInstance);
            ctx.globalData = this.globalData;
            instance.$callHook(ON_LAUNCH, extend({ app: this }, options));
        },
    };
    initLocale(instance);
    const vueOptions = instance.$.type;
    initHooks(appOptions, HOOKS);
    initUnknownHooks(appOptions, vueOptions);
    if (__VUE_OPTIONS_API__) {
        const methods = vueOptions.methods;
        methods && extend(appOptions, methods);
    }
    if (parseAppOptions) {
        parseAppOptions.parse(appOptions);
    }
    return appOptions;
}
function initCreateApp(parseAppOptions) {
    return function createApp(vm) {
        return App(parseApp(vm, parseAppOptions));
    };
}
function initLocale(appVm) {
    const locale = ref(my.getSystemInfoSync().language || 'zh-Hans');
    Object.defineProperty(appVm, '$locale', {
        get() {
            return locale.value;
        },
        set(v) {
            locale.value = v;
        },
    });
}

const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(key, type, defaultValue) {
    // [String]=>String
    if (isArray(type) && type.length === 1) {
        return type[0];
    }
    return type;
}
function initDefaultProps(isBehavior = false) {
    const properties = {};
    if (!isBehavior) {
        properties.vueId = {
            type: String,
            value: '',
        };
        // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
        properties.vueSlots = {
            type: null,
            value: [],
            observer: function (newVal) {
                const $slots = Object.create(null);
                newVal.forEach((slotName) => {
                    $slots[slotName] = true;
                });
                this.setData({
                    $slots,
                });
            },
        };
    }
    return properties;
}
function createProperty(key, prop) {
    {
        return prop;
    }
}
function initProps(mpComponentOptions, rawProps, isBehavior = false) {
    const properties = initDefaultProps(isBehavior);
    if (isArray(rawProps)) {
        rawProps.forEach((key) => {
            properties[key] = createProperty(key, {
                type: null,
            });
        });
    }
    else if (isPlainObject(rawProps)) {
        Object.keys(rawProps).forEach((key) => {
            const opts = rawProps[key];
            if (isPlainObject(opts)) {
                // title:{type:String,default:''}
                let value = opts.default;
                if (isFunction(value)) {
                    value = value();
                }
                const type = opts.type;
                opts.type = parsePropType(key, type);
                properties[key] = createProperty(key, {
                    type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
                    value,
                });
            }
            else {
                // content:String
                const type = parsePropType(key, opts);
                properties[key] = createProperty(key, {
                    type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
                });
            }
        });
    }
    mpComponentOptions.properties = properties;
}

function initData(vueOptions) {
    let data = vueOptions.data || {};
    if (typeof data === 'function') {
        try {
            const appConfig = getApp().$vm.$.appContext.config;
            data = data.call(appConfig.globalProperties);
        }
        catch (e) {
            if (process.env.VUE_APP_DEBUG) {
                console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data, e);
            }
        }
    }
    else {
        try {
            // 对 data 格式化
            data = JSON.parse(JSON.stringify(data));
        }
        catch (e) { }
    }
    if (!isPlainObject(data)) {
        data = {};
    }
    return data;
}
function initBehaviors(vueOptions, initBehavior) {
    const vueBehaviors = vueOptions.behaviors;
    const vueExtends = vueOptions.extends;
    const vueMixins = vueOptions.mixins;
    let vueProps = vueOptions.props;
    if (!vueProps) {
        vueOptions.props = vueProps = [];
    }
    const behaviors = [];
    if (isArray(vueBehaviors)) {
        vueBehaviors.forEach((behavior) => {
            behaviors.push(behavior.replace('uni://', `${__PLATFORM_PREFIX__}://`));
            if (behavior === 'uni://form-field') {
                if (isArray(vueProps)) {
                    vueProps.push('name');
                    vueProps.push('value');
                }
                else {
                    vueProps.name = {
                        type: String,
                        default: '',
                    };
                    vueProps.value = {
                        type: [String, Number, Boolean, Array, Object, Date],
                        default: '',
                    };
                }
            }
        });
    }
    if (vueExtends && vueExtends.props) {
        const behavior = {};
        initProps(behavior, vueExtends.props, true);
        behaviors.push(initBehavior(behavior));
    }
    if (isArray(vueMixins)) {
        vueMixins.forEach((vueMixin) => {
            if (vueMixin.props) {
                const behavior = {};
                initProps(behavior, vueMixin.props, true);
                behaviors.push(initBehavior(behavior));
            }
        });
    }
    return behaviors;
}

function getExtraValue(instance, dataPathsArray) {
    let context = instance;
    dataPathsArray.forEach((dataPathArray) => {
        const dataPath = dataPathArray[0];
        const value = dataPathArray[2];
        if (dataPath || typeof value !== 'undefined') {
            // ['','',index,'disable']
            const propPath = dataPathArray[1];
            const valuePath = dataPathArray[3];
            let vFor;
            if (Number.isInteger(dataPath)) {
                vFor = dataPath;
            }
            else if (!dataPath) {
                vFor = context;
            }
            else if (typeof dataPath === 'string' && dataPath) {
                if (dataPath.indexOf('#s#') === 0) {
                    vFor = dataPath.substr(3);
                }
                else {
                    vFor = getTarget(context, dataPath);
                }
            }
            if (Number.isInteger(vFor)) {
                context = value;
            }
            else if (!propPath) {
                context = vFor[value];
            }
            else {
                if (isArray(vFor)) {
                    context = vFor.find((vForItem) => {
                        return getTarget(vForItem, propPath) === value;
                    });
                }
                else if (isPlainObject(vFor)) {
                    context = Object.keys(vFor).find((vForKey) => {
                        return getTarget(vFor[vForKey], propPath) === value;
                    });
                }
                else {
                    console.error('v-for 暂不支持循环数据：', vFor);
                }
            }
            if (valuePath) {
                context = getTarget(context, valuePath);
            }
        }
    });
    return context;
}
function processEventExtra(instance, extra, event) {
    const extraObj = {};
    if (isArray(extra) && extra.length) {
        /**
         *[
         *    ['data.items', 'data.id', item.data.id],
         *    ['metas', 'id', meta.id]
         *],
         *[
         *    ['data.items', 'data.id', item.data.id],
         *    ['metas', 'id', meta.id]
         *],
         *'test'
         */
        extra.forEach((dataPath, index) => {
            if (typeof dataPath === 'string') {
                if (!dataPath) {
                    // model,prop.sync
                    extraObj['$' + index] = instance;
                }
                else {
                    if (dataPath === '$event') {
                        // $event
                        extraObj['$' + index] = event;
                    }
                    else if (dataPath === 'arguments') {
                        if (event.detail && event.detail.__args__) {
                            extraObj['$' + index] = event.detail.__args__;
                        }
                        else {
                            extraObj['$' + index] = [event];
                        }
                    }
                    else if (dataPath.indexOf('$event.') === 0) {
                        // $event.target.value
                        extraObj['$' + index] = getTarget(event, dataPath.replace('$event.', ''));
                    }
                    else {
                        extraObj['$' + index] = getTarget(instance, dataPath);
                    }
                }
            }
            else {
                extraObj['$' + index] = getExtraValue(instance, dataPath);
            }
        });
    }
    return extraObj;
}
function getObjByArray(arr) {
    const obj = {};
    for (let i = 1; i < arr.length; i++) {
        const element = arr[i];
        obj[element[0]] = element[1];
    }
    return obj;
}
function processEventArgs(instance, event, args = [], extra = [], isCustom, methodName) {
    let isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
    if (isCustom) {
        // 自定义事件
        isCustomMPEvent =
            event.currentTarget &&
                event.currentTarget.dataset &&
                event.currentTarget.dataset.comType === 'wx';
        if (!args.length) {
            // 无参数，直接传入 event 或 detail 数组
            if (isCustomMPEvent) {
                return [event];
            }
            return event.detail.__args__ || event.detail;
        }
    }
    const extraObj = processEventExtra(instance, extra, event);
    const ret = [];
    args.forEach((arg) => {
        if (arg === '$event') {
            if (methodName === '__set_model' && !isCustom) {
                // input v-model value
                ret.push(event.target.value);
            }
            else {
                if (isCustom && !isCustomMPEvent) {
                    ret.push(event.detail.__args__[0]);
                }
                else {
                    // wxcomponent 组件或内置组件
                    ret.push(event);
                }
            }
        }
        else {
            if (isArray(arg) && arg[0] === 'o') {
                ret.push(getObjByArray(arg));
            }
            else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
                ret.push(extraObj[arg]);
            }
            else {
                ret.push(arg);
            }
        }
    });
    return ret;
}
function wrapper(event) {
    event.stopPropagation = NOOP;
    event.preventDefault = NOOP;
    event.target = event.target || {};
    if (!hasOwn(event, 'detail')) {
        event.detail = {};
    }
    if (hasOwn(event, 'markerId')) {
        event.detail = typeof event.detail === 'object' ? event.detail : {};
        event.detail.markerId = event.markerId;
    }
    if (isPlainObject(event.detail)) {
        event.target = extend({}, event.target, event.detail);
    }
    return event;
}
const ONCE = '~';
const CUSTOM = '^';
function matchEventType(eventType, optType) {
    return (eventType === optType ||
        (optType === 'regionchange' &&
            (eventType === 'begin' || eventType === 'end')));
}
function handleEvent(event) {
    event = wrapper(event);
    // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
    const dataset = (event.currentTarget || event.target).dataset;
    if (!dataset) {
        return console.warn('事件信息不存在');
    }
    const eventOpts = (dataset.eventOpts ||
        dataset['event-opts']); // 支付宝 web-view 组件 dataset 非驼峰
    if (!eventOpts) {
        return console.warn('事件信息不存在');
    }
    // [['handle',[1,2,a]],['handle1',[1,2,a]]]
    const eventType = event.type;
    const ret = [];
    eventOpts.forEach((eventOpt) => {
        let type = eventOpt[0];
        const eventsArray = eventOpt[1];
        const isCustom = type.charAt(0) === CUSTOM;
        type = isCustom ? type.slice(1) : type;
        const isOnce = type.charAt(0) === ONCE;
        type = isOnce ? type.slice(1) : type;
        if (eventsArray && matchEventType(eventType, type)) {
            eventsArray.forEach((eventArray) => {
                const methodName = eventArray[0];
                if (methodName) {
                    let handlerCtx = this.$vm;
                    if (handlerCtx.$options.generic &&
                        handlerCtx.$parent &&
                        handlerCtx.$parent.$parent) {
                        // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
                        handlerCtx = handlerCtx.$parent.$parent;
                    }
                    if (methodName === '$emit') {
                        handlerCtx.$emit.apply(handlerCtx, processEventArgs(this.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
                        return;
                    }
                    const handler = handlerCtx[methodName];
                    if (!isFunction(handler)) {
                        throw new Error(` _vm.${methodName} is not a function`);
                    }
                    if (isOnce) {
                        if (handler.once) {
                            return;
                        }
                        handler.once = true;
                    }
                    let params = processEventArgs(this.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
                    params = Array.isArray(params) ? params : [];
                    // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
                    if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
                        // eslint-disable-next-line no-sparse-arrays
                        params = params.concat([, , , , , , , , , , event]);
                    }
                    ret.push(handler.apply(handlerCtx, params));
                }
            });
        }
    });
    if (eventType === 'input' &&
        ret.length === 1 &&
        typeof ret[0] !== 'undefined') {
        return ret[0];
    }
}

let $createComponentFn;
let $destroyComponentFn;
function $createComponent(initialVNode, options) {
    if (!$createComponentFn) {
        $createComponentFn = getApp().$vm.$createComponent;
    }
    return $createComponentFn(initialVNode, options);
}
function $destroyComponent(instance) {
    if (!$destroyComponentFn) {
        $destroyComponentFn = getApp().$vm.$destroyComponent;
    }
    return $destroyComponentFn(instance);
}

function onAliAuthError(method, $event) {
    $event.type = 'getphonenumber';
    $event.detail.errMsg =
        'getPhoneNumber:fail Error: ' +
            $event.detail.errorMessage(this)[method]($event);
}
function onAliGetAuthorize(method, $event) {
    my.getPhoneNumber({
        success: (res) => {
            $event.type = 'getphonenumber';
            const response = JSON.parse(res.response).response;
            if (response.code === '10000') {
                // success
                $event.detail.errMsg = 'getPhoneNumber:ok';
                $event.detail.encryptedData = res.response;
            }
            else {
                $event.detail.errMsg = 'getPhoneNumber:fail Error: ' + res.response;
            }
            this[method]($event);
        },
        fail: () => {
            $event.type = 'getphonenumber';
            $event.detail.errMsg = 'getPhoneNumber:fail';
            this[method]($event);
        },
    });
}
function parse(appOptions) {
    const oldOnLaunch = appOptions.onLaunch;
    appOptions.onLaunch = function onLaunch(options) {
        oldOnLaunch.call(this, options);
        if (!this.$vm) {
            return;
        }
        const globalProperties = this.$vm.$app.config.globalProperties;
        if (!globalProperties.$onAliAuthError) {
            globalProperties.$onAliAuthError = onAliAuthError;
            globalProperties.$onAliGetAuthorize = onAliGetAuthorize;
        }
    };
}

var parseAppOptions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    parse: parse
});

function handleLink$1(event) {
    // detail 是微信,value 是百度(dipatch)
    const detail = (event.detail ||
        event.value);
    const vuePid = detail.vuePid;
    let parentVm;
    if (vuePid) {
        parentVm = findVmByVueId(this.$vm, vuePid);
    }
    if (!parentVm) {
        parentVm = this.$vm;
    }
    detail.parent = parentVm;
}

function equal(a, b) {
    if (a === b)
        return true;
    if (a && b && typeof a === 'object' && typeof b === 'object') {
        const arrA = isArray(a);
        const arrB = isArray(b);
        let i, length, key;
        if (arrA && arrB) {
            length = a.length;
            if (length !== b.length)
                return false;
            for (i = length; i-- !== 0;) {
                if (!equal(a[i], b[i]))
                    return false;
            }
            return true;
        }
        if (arrA !== arrB)
            return false;
        const dateA = a instanceof Date;
        const dateB = b instanceof Date;
        if (dateA !== dateB)
            return false;
        if (dateA && dateB)
            return a.getTime() === b.getTime();
        const regexpA = a instanceof RegExp;
        const regexpB = b instanceof RegExp;
        if (regexpA !== regexpB)
            return false;
        if (regexpA && regexpB)
            return a.toString() === b.toString();
        const keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) {
            return false;
        }
        for (i = length; i-- !== 0;) {
            if (!hasOwn(b, keys[i]))
                return false;
        }
        for (i = length; i-- !== 0;) {
            key = keys[i];
            if (!equal(a[key], b[key]))
                return false;
        }
        return true;
    }
    return false;
}

const isComponent2 = my.canIUse('component2');
const mocks = ['$id'];
const customizeRE = /:/g;
function customize(str) {
    return camelize(str.replace(customizeRE, '-'));
}
function initBehavior({ properties }) {
    const props = {};
    Object.keys(properties).forEach((key) => {
        props[key] = properties[key].value;
    });
    return {
        props,
    };
}
function initRelation(mpInstance, detail) {
    mpInstance.props.onVueInit(detail);
}
function initSpecialMethods(mpInstance) {
    if (!mpInstance.$vm) {
        return;
    }
    let path = mpInstance.is || mpInstance.route;
    if (!path) {
        return;
    }
    if (path.indexOf('/') === 0) {
        path = path.substr(1);
    }
    const specialMethods = my.specialMethods && my.specialMethods[path];
    if (specialMethods) {
        specialMethods.forEach((method) => {
            if (isFunction(mpInstance.$vm[method])) {
                mpInstance[method] = function (event) {
                    if (hasOwn(event, 'markerId')) {
                        event.detail = typeof event.detail === 'object' ? event.detail : {};
                        event.detail.markerId = event.markerId;
                    }
                    // TODO normalizeEvent
                    mpInstance.$vm[method](event);
                };
            }
        });
    }
}
function initChildVues(mpInstance) {
    // 此时需保证当前 mpInstance 已经存在 $vm
    if (!mpInstance.$vm) {
        return;
    }
    const childVues = mpInstance._$childVues;
    if (childVues) {
        childVues.forEach((relationOptions) => {
            // 父子关系
            handleLink$1.call(mpInstance, {
                detail: relationOptions,
            });
            const { mpInstance: childMPInstance, createComponent } = relationOptions;
            childMPInstance.$vm = createComponent(relationOptions.parent);
            initSpecialMethods(childMPInstance);
            if (relationOptions.parent) {
                handleRef.call(relationOptions.parent.$scope, childMPInstance);
            }
            initChildVues(childMPInstance);
            childMPInstance.$vm.$callHook('mounted');
            childMPInstance.$vm.$callHook(ON_READY);
        });
    }
    delete mpInstance._$childVues;
}
// TODO vue3
function handleRef(ref) {
    if (!ref) {
        return;
    }
    const refName = ref.props['data-ref'];
    const refInForName = ref.props['data-ref-in-for'];
    if (!refName && !refInForName) {
        return;
    }
    const instance = this.$vm.$;
    const refs = instance.refs === EMPTY_OBJ ? (instance.refs = {}) : instance.refs;
    if (refName) {
        refs[refName] = ref.$vm || ref;
    }
    else if (refInForName) {
        (refs[refInForName] || (refs[refInForName] = [])).push(ref.$vm || ref);
    }
}
function triggerEvent(type, detail) {
    const handler = this.props[customize('on-' + type)];
    if (!handler) {
        return;
    }
    const eventOpts = this.props['data-event-opts'];
    const target = {
        dataset: {
            eventOpts,
        },
    };
    handler({
        type: customize(type),
        target,
        currentTarget: target,
        detail,
    });
}
const IGNORES = ['$slots', '$scopedSlots'];
function createObserver(isDidUpdate = false) {
    return function observe(props) {
        const prevProps = isDidUpdate ? props : this.props;
        const nextProps = isDidUpdate ? this.props : props;
        if (equal(prevProps, nextProps)) {
            return;
        }
        Object.keys(prevProps).forEach((name) => {
            if (IGNORES.indexOf(name) === -1) {
                const prevValue = prevProps[name];
                const nextValue = nextProps[name];
                if (!isFunction(prevValue) &&
                    !isFunction(nextValue) &&
                    !equal(prevValue, nextValue)) {
                    this.$vm.$.props[name] = nextProps[name];
                }
            }
        });
    };
}
const handleLink = (function () {
    if (isComponent2) {
        return function handleLink(detail) {
            return handleLink$1.call(this, {
                detail,
            });
        };
    }
    return function handleLink(detail) {
        if (this.$vm && this.$vm.$.isMounted) {
            // 父已初始化
            return handleLink$1.call(this, {
                detail,
            });
        }
        (this._$childVues || (this._$childVues = [])).unshift(detail);
    };
})();
function createVueComponent(mpType, mpInstance, vueOptions, parent) {
    return $createComponent({
        type: vueOptions,
        props: mpInstance.props,
    }, {
        mpType,
        mpInstance,
        parentComponent: parent && parent.$,
        onBeforeSetup(instance, options) {
            initMocks(instance, mpInstance, mocks);
            initComponentInstance(instance, options);
        },
    });
}

function createPage$1(vueOptions) {
    vueOptions = vueOptions.default || vueOptions;
    const pageOptions = {
        onLoad(query) {
            this.options = query;
            this.$page = {
                fullPath: '/' + this.route + stringifyQuery(query),
            };
            // 初始化 vue 实例
            this.$vm = createVueComponent('page', this, vueOptions);
            initSpecialMethods(this);
            this.$vm.$callHook(ON_LOAD, query);
        },
        onReady() {
            initChildVues(this);
            this.$vm.$callHook('mounted');
            this.$vm.$callHook(ON_READY);
        },
        onUnload() {
            if (this.$vm) {
                this.$vm.$callHook(ON_UNLOAD);
                $destroyComponent(this.$vm);
            }
        },
        events: {
            // 支付宝小程序有些页面事件只能放在events下
            onBack() {
                this.$vm.$callHook(ON_BACK_PRESS);
            },
        },
        __r: handleRef,
        __e: handleEvent,
        __l: handleLink,
    };
    if (__VUE_OPTIONS_API__) {
        pageOptions.data = initData(vueOptions);
    }
    initHooks(pageOptions, PAGE_HOOKS);
    initUnknownHooks(pageOptions, vueOptions);
    initWxsCallMethods(pageOptions, vueOptions.wxsCallMethods);
    return Page(pageOptions);
}

function initComponentProps(rawProps) {
    const propertiesOptions = {
        properties: {},
    };
    initProps(propertiesOptions, rawProps, false);
    const properties = propertiesOptions.properties;
    const props = {
        onVueInit: function () { },
    };
    Object.keys(properties).forEach((key) => {
        if (key !== 'vueSlots') {
            props[key] = properties[key].value;
        }
    });
    return props;
}
function initVm(mpInstance, createComponent) {
    if (mpInstance.$vm) {
        return;
    }
    const properties = mpInstance.props;
    initVueIds(properties.vueId, mpInstance);
    const relationOptions = {
        vuePid: mpInstance._$vuePid,
        mpInstance,
        createComponent,
    };
    if (isComponent2) {
        // 处理父子关系
        initRelation(mpInstance, relationOptions);
        // 初始化 vue 实例
        mpInstance.$vm = createComponent(relationOptions.parent);
    }
    else {
        // 处理父子关系
        initRelation(mpInstance, relationOptions);
        if (relationOptions.parent) {
            // 父组件已经初始化，直接初始化子，否则放到父组件的 didMount 中处理
            // 初始化 vue 实例
            mpInstance.$vm = createComponent(relationOptions.parent);
            handleRef.call(relationOptions.parent.$scope, mpInstance);
            initChildVues(mpInstance);
            mpInstance.$vm.$callHook('mounted');
        }
    }
}
function createComponent$1(vueOptions) {
    vueOptions = vueOptions.default || vueOptions;
    const mpComponentOptions = {
        props: initComponentProps(vueOptions.props),
        didMount() {
            const createComponent = (parent) => {
                return createVueComponent('component', this, vueOptions, parent);
            };
            if (my.dd) {
                // 钉钉小程序底层基础库有 bug,组件嵌套使用时,在 didMount 中无法及时调用 props 中的方法
                setTimeout(() => {
                    initVm(this, createComponent);
                }, 4);
            }
            else {
                initVm(this, createComponent);
            }
            initSpecialMethods(this);
            if (isComponent2) {
                this.$vm.$callHook('mounted');
            }
        },
        didUnmount() {
            $destroyComponent(this.$vm);
        },
        methods: {
            __r: handleRef,
            __e: handleEvent,
            __l: handleLink,
            triggerEvent,
        },
    };
    if (__VUE_OPTIONS_API__) {
        mpComponentOptions.data = initData(vueOptions);
        mpComponentOptions.mixins = initBehaviors(vueOptions, initBehavior);
    }
    if (isComponent2) {
        mpComponentOptions.onInit = function onInit() {
            initVm(this, (parent) => {
                return createVueComponent('component', this, vueOptions, parent);
            });
        };
        mpComponentOptions.deriveDataFromProps = createObserver();
    }
    else {
        mpComponentOptions.didUpdate = createObserver(true);
    }
    initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
    return Component(mpComponentOptions);
}

const createApp = initCreateApp(parseAppOptions);
my.EventChannel = EventChannel;
my.createApp = createApp;
my.createPage = createPage;
my.createComponent = createComponent;

export { createApp, createComponent$1 as createComponent, createPage$1 as createPage };
