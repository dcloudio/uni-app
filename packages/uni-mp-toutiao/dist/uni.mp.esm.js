import { isPlainObject, isArray, hasOwn, isFunction, extend, camelize, isObject } from '@vue/shared';
import { injectHook, ref } from 'vue';

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

const MP_METHODS = [
    'createSelectorQuery',
    'createIntersectionObserver',
    'selectAllComponents',
    'selectComponent',
];
function createEmitFn(oldEmit, ctx) {
    return function emit(event, ...args) {
        const scope = ctx.$scope;
        if (scope && event) {
            const detail = { __args__: args };
            scope.triggerEvent(event, detail);
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
    const ctx = instance.ctx;
    MP_METHODS.forEach((method) => {
        ctx[method] = function (...args) {
            const mpInstance = ctx.$scope;
            if (mpInstance && mpInstance[method]) {
                return mpInstance[method].apply(mpInstance, args);
            }
        };
    });
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
            if (hook === 'onError') {
                return getApp().$vm.$callHook(hook, args);
            }
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

tt.appLaunchHooks = [];
function injectAppLaunchHooks(appInstance) {
    tt.appLaunchHooks.forEach((hook) => {
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
    const locale = ref(tt.getSystemInfoSync().language || 'zh-Hans');
    Object.defineProperty(appVm, '$locale', {
        get() {
            return locale.value;
        },
        set(v) {
            locale.value = v;
        },
    });
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
    });
}
function initRefs(instance, mpInstance) {
    Object.defineProperty(instance, 'refs', {
        get() {
            const $refs = {};
            selectAllComponents(mpInstance, '.v-r', $refs);
            const forComponents = mpInstance.selectAllComponents('.v-r-i-f');
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

// const PROP_TYPES = [String, Number, Boolean, Object, Array, null]
function createObserver(name) {
    return function observer(newVal) {
        if (this.$vm) {
            this.$vm.$.props[name] = newVal; // 为了触发其他非 render watcher
        }
    };
}
// function parsePropType(key: string, type: unknown, defaultValue: unknown) {
//   // [String]=>String
//   if (isArray(type) && type.length === 1) {
//     return type[0]
//   }
//   if ("mp-toutiao" === 'mp-baidu') {
//     if (
//       // [String,Boolean]=>Boolean
//       defaultValue === false &&
//       isArray(type) &&
//       type.length === 2 &&
//       type.indexOf(String) !== -1 &&
//       type.indexOf(Boolean) !== -1
//     ) {
//       return Boolean
//     }
//   }
//   return type
// }
function initDefaultProps(isBehavior = false) {
    const properties = {};
    if (!isBehavior) {
        properties.vI = {
            type: null,
            value: '',
        };
        {
            // 用于字节跳动小程序模拟抽象节点
            properties.generic = {
                type: Object,
            };
        }
        // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
        properties.vS = {
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
/**
 * 不再生成具体的 type 类型，因为微信首次初始化，值为 undefined 时，会告警：property received type-uncompatible value
 * @param mpComponentOptions
 * @param rawProps
 * @param isBehavior
 */
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
                // const type = (opts as any).type as any
                // ;(opts as any).type = parsePropType(key, type, value)
                properties[key] = createProperty(key, {
                    type: null,
                    value,
                });
            }
            else {
                // content:String
                // const type = parsePropType(key, opts, null)
                properties[key] = createProperty(key, {
                    type: null, //PROP_TYPES.indexOf(type) !== -1 ? type : null,
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

function provide(instance, key, value) {
    if (!instance) {
        if ((process.env.NODE_ENV !== 'production')) {
            console.warn(`provide() can only be used inside setup().`);
        }
    }
    else {
        let provides = instance.provides;
        // by default an instance inherits its parent's provides object
        // but when it needs to provide values of its own, it creates its
        // own provides object using parent provides object as prototype.
        // this way in `inject` we can simply look up injections from direct
        // parent and let the prototype chain do the work.
        const parentProvides = instance.parent && instance.parent.provides;
        if (parentProvides === provides) {
            provides = instance.provides = Object.create(parentProvides);
        }
        // TS doesn't allow symbol as index type
        provides[key] = value;
    }
}
function initProvide(instance) {
    const provideOptions = instance.$options.provide;
    if (!provideOptions) {
        return;
    }
    const provides = isFunction(provideOptions)
        ? provideOptions.call(instance)
        : provideOptions;
    const internalInstance = instance.$;
    for (const key in provides) {
        provide(internalInstance, key, provides[key]);
    }
}
function inject(instance, key, defaultValue, treatDefaultAsFactory = false) {
    if (instance) {
        // #2400
        // to support `app.use` plugins,
        // fallback to appContext's `provides` if the intance is at root
        const provides = instance.parent == null
            ? instance.vnode.appContext && instance.vnode.appContext.provides
            : instance.parent.provides;
        if (provides && key in provides) {
            // TS doesn't allow symbol as index type
            return provides[key];
        }
        else if (arguments.length > 1) {
            return treatDefaultAsFactory && isFunction(defaultValue)
                ? defaultValue()
                : defaultValue;
        }
        else if ((process.env.NODE_ENV !== 'production')) {
            console.warn(`injection "${String(key)}" not found.`);
        }
    }
    else if ((process.env.NODE_ENV !== 'production')) {
        console.warn(`inject() can only be used inside setup() or functional components.`);
    }
}
function initInjections(instance) {
    const injectOptions = instance.$options.inject;
    if (!injectOptions) {
        return;
    }
    const internalInstance = instance.$;
    const ctx = internalInstance.ctx;
    if (isArray(injectOptions)) {
        for (let i = 0; i < injectOptions.length; i++) {
            const key = injectOptions[i];
            ctx[key] = inject(internalInstance, key);
        }
    }
    else {
        for (const key in injectOptions) {
            const opt = injectOptions[key];
            if (isObject(opt)) {
                ctx[key] = inject(internalInstance, opt.from || key, opt.default, true /* treat default function as factory */);
            }
            else {
                ctx[key] = inject(internalInstance, opt);
            }
        }
    }
}

function initLifetimes$1({ mocks, isPage, initRelation, vueOptions, }) {
    return {
        attached() {
            const properties = this.properties;
            initVueIds(properties.vI, this);
            const relationOptions = {
                vuePid: this._$vuePid,
            };
            // 初始化 vue 实例
            const mpInstance = this;
            const mpType = isPage(mpInstance) ? 'page' : 'component';
            if (mpType === 'page' && !mpInstance.route && mpInstance.__route__) {
                mpInstance.route = mpInstance.__route__;
            }
            this.$vm = $createComponent({
                type: vueOptions,
                props: properties,
            }, {
                mpType,
                mpInstance,
                slots: properties.vS,
                parentComponent: relationOptions.parent && relationOptions.parent.$,
                onBeforeSetup(instance, options) {
                    initRefs(instance, mpInstance);
                    initMocks(instance, mpInstance, mocks);
                    initComponentInstance(instance, options);
                },
            });
            // 处理父子关系
            initRelation(this, relationOptions);
        },
        detached() {
            this.$vm && $destroyComponent(this.$vm);
        },
    };
}

const mocks = [
    '__route__',
    '__webviewId__',
    '__nodeId__',
    '__nodeid__' /* @Deprecated */,
];
function isPage(mpInstance) {
    return (mpInstance.__nodeId__ === 0 || mpInstance.__nodeid__ === 0);
}
const instances = Object.create(null);
function initRelation(mpInstance, detail) {
    // 头条 triggerEvent 后，接收事件时机特别晚，已经到了 ready 之后
    const nodeId = hasOwn(mpInstance, '__nodeId__')
        ? mpInstance.__nodeId__
        : mpInstance.__nodeid__;
    const webviewId = mpInstance.__webviewId__ + '';
    instances[webviewId + '_' + nodeId] = mpInstance.$vm;
    mpInstance.triggerEvent('__l', {
        vuePid: detail.vuePid,
        nodeId,
        webviewId,
    });
}
function handleLink({ detail: { vuePid, nodeId, webviewId }, }) {
    const vm = instances[webviewId + '_' + nodeId];
    if (!vm) {
        return;
    }
    let parentVm;
    if (vuePid) {
        parentVm = findVmByVueId(this.$vm, vuePid);
    }
    if (!parentVm) {
        parentVm = this.$vm;
    }
    vm.$.parent = parentVm.$;
    if (__VUE_OPTIONS_API__) {
        parentVm.$children.push(vm);
        const parent = parentVm.$;
        vm.$.provides = parent
            ? parent.provides
            : Object.create(parent.appContext.provides);
        initInjections(vm);
        initProvide(vm);
    }
    vm.$callCreatedHook();
    vm.$callHook('mounted');
    vm.$callHook(ON_READY);
}
function parse(componentOptions, { handleLink }) {
    componentOptions.methods.__l = handleLink;
}

var parseComponentOptions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    mocks: mocks,
    isPage: isPage,
    instances: instances,
    initRelation: initRelation,
    handleLink: handleLink,
    parse: parse,
    initLifetimes: initLifetimes$1
});

function initLifetimes(lifetimesOptions) {
    return extend(initLifetimes$1(lifetimesOptions), {
        ready() {
            if (this.$vm && lifetimesOptions.isPage(this)) {
                this.$vm.$callCreatedHook();
                this.$vm.$callHook('mounted');
                this.$vm.$callHook(ON_READY);
            }
            else {
                this.is && console.warn(this.is + ' is not ready');
            }
        },
        detached() {
            this.$vm && $destroyComponent(this.$vm);
            // 清理
            const webviewId = this.__webviewId__;
            webviewId &&
                Object.keys(instances).forEach((key) => {
                    if (key.indexOf(webviewId + '_') === 0) {
                        delete instances[key];
                    }
                });
        },
    });
}

var parsePageOptions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    mocks: mocks,
    isPage: isPage,
    initRelation: initRelation,
    handleLink: handleLink,
    parse: parse,
    initLifetimes: initLifetimes
});

const createApp = initCreateApp();
const createPage = initCreatePage(parsePageOptions);
const createComponent = initCreateComponent(parseComponentOptions);
tt.EventChannel = EventChannel;
tt.createApp = global.createApp = createApp;
tt.createPage = createPage;
tt.createComponent = createComponent;

export { createApp, createComponent, createPage };
