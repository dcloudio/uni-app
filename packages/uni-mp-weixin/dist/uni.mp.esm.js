import { isPlainObject, hasOwn, isArray, extend, hyphenate, isObject, toNumber, isFunction, NOOP, camelize } from '@vue/shared';
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
const ON_TAB_ITEM_TAP = 'onTabItemTap';
const ON_REACH_BOTTOM = 'onReachBottom';
const ON_PULL_DOWN_REFRESH = 'onPullDownRefresh';
const ON_ADD_TO_FAVORITES = 'onAddToFavorites';

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

function initBehavior(options) {
    return Behavior(options);
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
const EXTRAS = ['externalClasses'];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
    EXTRAS.forEach((name) => {
        if (hasOwn(vueOptions, name)) {
            miniProgramComponentOptions[name] = vueOptions[name];
        }
    });
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
function selectAllComponents(mpInstance, selector, $refs) {
    const components = mpInstance.selectAllComponents(selector);
    components.forEach((component) => {
        const ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
        {
            if (component.dataset.vueGeneric === 'scoped') {
                component
                    .selectAllComponents('.scoped-ref')
                    .forEach((scopedComponent) => {
                    selectAllComponents(scopedComponent, selector, $refs);
                });
            }
        }
    });
}
function initRefs(instance, mpInstance) {
    Object.defineProperty(instance, 'refs', {
        get() {
            const $refs = {};
            selectAllComponents(mpInstance, '.vue-ref', $refs);
            const forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
            forComponents.forEach((component) => {
                const ref = component.dataset.ref;
                if (!$refs[ref]) {
                    $refs[ref] = [];
                }
                $refs[ref].push(component.$vm || component);
            });
            return $refs;
        },
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
        instance.slots = {};
        if (isArray(options.slots) && options.slots.length) {
            options.slots.forEach((name) => {
                instance.slots[name] = true;
            });
        }
    }
    ctx.getOpenerEventChannel = function () {
        // 微信小程序使用自身getOpenerEventChannel
        {
            return options.mpInstance.getOpenerEventChannel();
        }
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
function initHook$1(mpOptions, hook, excludes) {
    if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
        mpOptions[hook] = function (args) {
            return this.$vm && this.$vm.$callHook(hook, args);
        };
    }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
    hooks.forEach((hook) => initHook$1(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
    findHooks(vueOptions).forEach((hook) => initHook$1(mpOptions, hook, excludes));
}

wx.appLaunchHooks = [];
function injectAppLaunchHooks(appInstance) {
    wx.appLaunchHooks.forEach((hook) => {
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
    const locale = ref(wx.getSystemInfoSync().language || 'zh-Hans');
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
function createObserver(name) {
    return function observer(newVal) {
        if (this.$vm) {
            this.$vm.$.props[name] = newVal; // 为了触发其他非 render watcher
        }
    };
}
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
    prop.observer = createObserver(key);
    return prop;
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
function applyOptions(componentOptions, vueOptions, initBehavior) {
    componentOptions.data = initData(vueOptions);
    componentOptions.behaviors = initBehaviors(vueOptions, initBehavior);
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

function parseComponent(vueOptions, { parse, mocks, isPage, initRelation, handleLink, initLifetimes, }) {
    vueOptions = vueOptions.default || vueOptions;
    const options = {
        multipleSlots: true,
        addGlobalClass: true,
    };
    if (vueOptions.options) {
        extend(options, vueOptions.options);
    }
    const mpComponentOptions = {
        options,
        lifetimes: initLifetimes({ mocks, isPage, initRelation, vueOptions }),
        pageLifetimes: {
            show() {
                this.$vm && this.$vm.$callHook('onPageShow');
            },
            hide() {
                this.$vm && this.$vm.$callHook('onPageHide');
            },
            resize(size) {
                this.$vm && this.$vm.$callHook('onPageResize', size);
            },
        },
        methods: {
            __l: handleLink,
            __e: handleEvent,
        },
    };
    if (__VUE_OPTIONS_API__) {
        applyOptions(mpComponentOptions, vueOptions, initBehavior);
    }
    initProps(mpComponentOptions, vueOptions.props, false);
    initExtraOptions(mpComponentOptions, vueOptions);
    initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
    if (parse) {
        parse(mpComponentOptions, { handleLink });
    }
    return mpComponentOptions;
}
function initCreateComponent(parseOptions) {
    return function createComponent(vueComponentOptions) {
        return Component(parseComponent(vueComponentOptions, parseOptions));
    };
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

function parsePage(vueOptions, parseOptions) {
    const { parse, mocks, isPage, initRelation, handleLink, initLifetimes } = parseOptions;
    const miniProgramPageOptions = parseComponent(vueOptions, {
        mocks,
        isPage,
        initRelation,
        handleLink,
        initLifetimes,
    });
    const methods = miniProgramPageOptions.methods;
    methods.onLoad = function (query) {
        this.options = query;
        this.$page = {
            fullPath: '/' + this.route + stringifyQuery(query),
        };
        return this.$vm && this.$vm.$callHook(ON_LOAD, query);
    };
    initHooks(methods, PAGE_HOOKS);
    initUnknownHooks(methods, vueOptions);
    parse && parse(miniProgramPageOptions, { handleLink });
    return miniProgramPageOptions;
}
function initCreatePage(parseOptions) {
    return function createPage(vuePageOptions) {
        return Component(parsePage(vuePageOptions, parseOptions));
    };
}

const MPPage = Page;
const MPComponent = Component;
const customizeRE = /:/g;
function customize(str) {
    return camelize(str.replace(customizeRE, '-'));
}
function initTriggerEvent(mpInstance) {
    const oldTriggerEvent = mpInstance.triggerEvent;
    mpInstance.triggerEvent = function (event, ...args) {
        return oldTriggerEvent.apply(mpInstance, [customize(event), ...args]);
    };
}
function initHook(name, options) {
    const oldHook = options[name];
    if (!oldHook) {
        options[name] = function () {
            initTriggerEvent(this);
        };
    }
    else {
        options[name] = function (...args) {
            initTriggerEvent(this);
            return oldHook.apply(this, args);
        };
    }
}
Page = function (options) {
    initHook(ON_LOAD, options);
    return MPPage(options);
};
Component = function (options) {
    initHook('created', options);
    return MPComponent(options);
};

function initLifetimes({ mocks, isPage, initRelation, vueOptions, }) {
    return {
        attached() {
            const properties = this.properties;
            initVueIds(properties.vueId, this);
            const relationOptions = {
                vuePid: this._$vuePid,
            };
            // 处理父子关系
            initRelation(this, relationOptions);
            // 初始化 vue 实例
            const mpInstance = this;
            this.$vm = $createComponent({
                type: vueOptions,
                props: properties,
            }, {
                mpType: isPage(mpInstance) ? 'page' : 'component',
                mpInstance,
                slots: properties.vueSlots,
                parentComponent: relationOptions.parent && relationOptions.parent.$,
                onBeforeSetup(instance, options) {
                    initRefs(instance, mpInstance);
                    initMocks(instance, mpInstance, mocks);
                    initComponentInstance(instance, options);
                },
            });
        },
        ready() {
            // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
            // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
            if (this.$vm) {
                this.$vm.$callHook('mounted');
                this.$vm.$callHook(ON_READY);
            }
        },
        detached() {
            this.$vm && $destroyComponent(this.$vm);
        },
    };
}

const mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function isPage(mpInstance) {
    return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
    mpInstance.triggerEvent('__l', detail);
}
function handleLink(event) {
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

var parseOptions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    mocks: mocks,
    isPage: isPage,
    initRelation: initRelation,
    handleLink: handleLink,
    initLifetimes: initLifetimes
});

const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

export { createApp, createComponent, createPage };
