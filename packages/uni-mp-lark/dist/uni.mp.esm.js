import { VIRTUAL_HOST_ID, SLOT_DEFAULT_NAME, EventChannel, invokeArrayFns, MINI_PROGRAM_PAGE_RUNTIME_HOOKS, ON_LOAD, ON_SHOW, ON_HIDE, ON_UNLOAD, ON_RESIZE, ON_TAB_ITEM_TAP, ON_REACH_BOTTOM, ON_PULL_DOWN_REFRESH, ON_ADD_TO_FAVORITES, isUniLifecycleHook, ON_READY, once, ON_LAUNCH, ON_ERROR, ON_THEME_CHANGE, ON_PAGE_NOT_FOUND, ON_UNHANDLE_REJECTION, addLeadingSlash, stringifyQuery, customizeEvent } from '@dcloudio/uni-shared';
import { hasOwn, isArray, isFunction, extend, isPlainObject, isObject } from '@vue/shared';
import { nextTick, devtoolsComponentRemoved, devtoolsComponentAdded, injectHook, ref, findComponentPropsData, toRaw, updateProps, hasQueueJob, invalidateJob, getExposeProxy, pruneComponentPropsCache } from 'vue';
import { normalizeLocale, LOCALE_EN } from '@dcloudio/uni-i18n';

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
        const ref = component.properties.uR;
        $refs[ref] = component.$vm || component;
    });
}
function initRefs(instance, mpInstance) {
    Object.defineProperty(instance, 'refs', {
        get() {
            const $refs = {};
            selectAllComponents(mpInstance, '.r', $refs);
            const forComponents = mpInstance.selectAllComponents('.r-i-f');
            forComponents.forEach((component) => {
                const ref = component.properties.uR;
                if (!ref) {
                    return;
                }
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
function nextSetDataTick(mpInstance, fn) {
    // 随便设置一个字段来触发回调（部分平台必须有字段才可以，比如头条）
    mpInstance.setData({ r1: 1 }, () => fn());
}
function initSetRef(mpInstance) {
    if (!mpInstance._$setRef) {
        mpInstance._$setRef = (fn) => {
            nextTick(() => nextSetDataTick(mpInstance, fn));
        };
    }
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
            {
                scope.triggerEvent(event, detail);
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
    ctx.$mpPlatform = "mp-lark";
    const $scope = (ctx.$scope = options.mpInstance);
    // mergeVirtualHostAttributes
    Object.defineProperties(ctx, {
        // only id
        [VIRTUAL_HOST_ID]: {
            get() {
                return $scope.data[VIRTUAL_HOST_ID];
            },
        },
    });
    // TODO @deprecated
    ctx.$mp = {};
    if (__VUE_OPTIONS_API__) {
        ctx._self = {};
    }
    // slots
    instance.slots = {};
    if (isArray(options.slots) && options.slots.length) {
        options.slots.forEach((name) => {
            instance.slots[name] = true;
        });
        if (instance.slots[SLOT_DEFAULT_NAME]) {
            instance.slots.default = true;
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
            instance[mock] = ctx[mock] = mpInstance[mock];
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
    {
        if (name === 'onLoad' &&
            args &&
            args.__id__ &&
            isFunction(tt.getEventChannel)) {
            this.__eventChannel__ = tt.getEventChannel(args.__id__);
            delete args.__id__;
        }
    }
    // 处理飞书小程序页面切换uni-vue-devtools无法更新数据问题
    if (__VUE_PROD_DEVTOOLS__ &&
        name === 'onShow') {
        devtoolsComponentRemoved(this.$);
        devtoolsComponentAdded(this.$);
    }
    const hooks = this.$[name];
    return hooks && invokeArrayFns(hooks, args);
}

const PAGE_INIT_HOOKS = [
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
            if (isUniLifecycleHook(name, vueOptions[name])) {
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
            if (hook === 'onError') {
                return getApp().$vm.$callHook(hook, args);
            }
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
function initRuntimeHooks(mpOptions, runtimeHooks) {
    if (!runtimeHooks) {
        return;
    }
    const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
    hooks.forEach((hook) => {
        if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
            initHook(mpOptions, hook, []);
        }
    });
}
const findMixinRuntimeHooks = /*#__PURE__*/ once(() => {
    const runtimeHooks = [];
    const app = isFunction(getApp) && getApp({ allowDefault: true });
    if (app && app.$vm && app.$vm.$) {
        const mixins = app.$vm.$.appContext.mixins;
        if (isArray(mixins)) {
            const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
            mixins.forEach((mixin) => {
                hooks.forEach((hook) => {
                    if (hasOwn(mixin, hook) && !runtimeHooks.includes(hook)) {
                        runtimeHooks.push(hook);
                    }
                });
            });
        }
    }
    return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
    initHooks(mpOptions, findMixinRuntimeHooks());
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
    if (__VUE_PROD_DEVTOOLS__) {
        // 定制 App 的 $children
        Object.defineProperty(internalInstance.ctx, '$children', {
            get() {
                return getCurrentPages().map((page) => page.$vm);
            },
        });
    }
    const appOptions = {
        globalData: (instance.$options && instance.$options.globalData) || {},
        $vm: instance, // mp-alipay 组件 data 初始化比 onLaunch 早，提前挂载
        onLaunch(options) {
            this.$vm = instance; // 飞书小程序可能会把 AppOptions 序列化，导致 $vm 对象部分属性丢失
            const ctx = internalInstance.ctx;
            if (this.$vm && ctx.$scope && ctx.$callHook) {
                // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
                // $scope值在微信小程序混合分包情况下存在，额外用$callHook兼容判断处理
                return;
            }
            initBaseInstance(internalInstance, {
                mpType: 'app',
                mpInstance: this,
                slots: [],
            });
            ctx.globalData = this.globalData;
            instance.$callHook(ON_LAUNCH, options);
        },
    };
    const onErrorHandlers = tt.$onErrorHandlers;
    if (onErrorHandlers) {
        onErrorHandlers.forEach((fn) => {
            injectHook(ON_ERROR, fn, internalInstance);
        });
        onErrorHandlers.length = 0;
    }
    initLocale(instance);
    const vueOptions = instance.$.type;
    initHooks(appOptions, HOOKS);
    initUnknownHooks(appOptions, vueOptions);
    if (__VUE_OPTIONS_API__) {
        const methods = vueOptions.methods;
        methods && extend(appOptions, methods);
    }
    return appOptions;
}
function initCreateApp(parseAppOptions) {
    return function createApp(vm) {
        return App(parseApp(vm));
    };
}
function initCreateSubpackageApp(parseAppOptions) {
    return function createApp(vm) {
        const appOptions = parseApp(vm);
        const app = isFunction(getApp) &&
            getApp({
                allowDefault: true,
            });
        if (!app)
            return;
        vm.$.ctx.$scope = app;
        const globalData = app.globalData;
        if (globalData) {
            Object.keys(appOptions.globalData).forEach((name) => {
                if (!hasOwn(globalData, name)) {
                    globalData[name] = appOptions.globalData[name];
                }
            });
        }
        Object.keys(appOptions).forEach((name) => {
            if (!hasOwn(app, name)) {
                app[name] = appOptions[name];
            }
        });
        initAppLifecycle(appOptions, vm);
        if (process.env.UNI_SUBPACKAGE) {
            (tt.$subpackages || (tt.$subpackages = {}))[process.env.UNI_SUBPACKAGE] = {
                $vm: vm,
            };
        }
    };
}
function initAppLifecycle(appOptions, vm) {
    if (isFunction(appOptions.onLaunch)) {
        const args = tt.getLaunchOptionsSync && tt.getLaunchOptionsSync();
        appOptions.onLaunch(args);
    }
    if (isFunction(appOptions.onShow) && tt.onAppShow) {
        tt.onAppShow((args) => {
            vm.$callHook('onShow', args);
        });
    }
    if (isFunction(appOptions.onHide) && tt.onAppHide) {
        tt.onAppHide((args) => {
            vm.$callHook('onHide', args);
        });
    }
}
function initLocale(appVm) {
    const locale = ref(normalizeLocale(tt.getSystemInfoSync().language) || LOCALE_EN);
    Object.defineProperty(appVm, '$locale', {
        get() {
            return locale.value;
        },
        set(v) {
            locale.value = v;
        },
    });
}

const builtInProps = [
    // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
    // event-opts
    'eO',
    // 组件 ref
    'uR',
    // 组件 ref-in-for
    'uRIF',
    // 组件 id
    'uI',
    // 组件类型 m: 小程序组件
    'uT',
    // 组件 props
    'uP',
    // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
    'uS',
];
function initDefaultProps(options, isBehavior = false) {
    const properties = {};
    if (!isBehavior) {
        // 均不指定类型，避免微信小程序 property received type-uncompatible value 警告
        builtInProps.forEach((name) => {
            properties[name] = {
                type: null,
                value: '',
            };
        });
        // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
        function observerSlots(newVal) {
            const $slots = Object.create(null);
            newVal &&
                newVal.forEach((slotName) => {
                    $slots[slotName] = true;
                });
            this.setData({
                $slots,
            });
        }
        properties.uS = {
            type: null,
            value: [],
        };
        {
            properties.uS.observer = observerSlots;
        }
    }
    if (options.behaviors) {
        // wx://form-field
        if (options.behaviors.includes('tt' + '://form-field')) {
            if (!options.properties || !options.properties.name) {
                properties.name = {
                    type: null,
                    value: '',
                };
            }
            if (!options.properties || !options.properties.value) {
                properties.value = {
                    type: null,
                    value: '',
                };
            }
        }
    }
    return properties;
}
function initVirtualHostProps(options) {
    const properties = {};
    return properties;
}
/**
 *
 * @param mpComponentOptions
 * @param isBehavior
 */
function initProps(mpComponentOptions) {
    if (!mpComponentOptions.properties) {
        mpComponentOptions.properties = {};
    }
    extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
    // [String]=>String
    if (isArray(type) && type.length === 1) {
        return type[0];
    }
    return type;
}
function normalizePropType(type, defaultValue) {
    const res = parsePropType(type);
    return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
/**
 * 初始化页面 props，方便接收页面参数，类型均为String，默认值均为''
 * @param param
 * @param rawProps
 */
function initPageProps({ properties }, rawProps) {
    if (isArray(rawProps)) {
        rawProps.forEach((key) => {
            properties[key] = {
                type: String,
                value: '',
            };
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
                opts.type = normalizePropType(type);
                properties[key] = {
                    type: opts.type,
                    value,
                };
            }
            else {
                // content:String
                properties[key] = {
                    type: normalizePropType(opts),
                };
            }
        });
    }
}
function findPropsData(properties, isPage) {
    return ((isPage
        ? findPagePropsData(properties)
        : findComponentPropsData(resolvePropValue(properties.uP))) || {});
}
function findPagePropsData(properties) {
    const propsData = {};
    if (isPlainObject(properties)) {
        Object.keys(properties).forEach((name) => {
            if (builtInProps.indexOf(name) === -1) {
                propsData[name] = resolvePropValue(properties[name]);
            }
        });
    }
    return propsData;
}
function initFormField(vm) {
    // 同步 form-field 的 name,value 值
    const vueOptions = vm.$options;
    if (isArray(vueOptions.behaviors) &&
        vueOptions.behaviors.includes('uni://form-field')) {
        vm.$watch('modelValue', () => {
            vm.$scope &&
                vm.$scope.setData({
                    name: vm.name,
                    value: vm.modelValue,
                });
        }, {
            immediate: true,
        });
    }
}
function resolvePropValue(prop) {
    return prop;
}

function initData(_) {
    return {};
}
function initPropsObserver(componentOptions) {
    const observe = function observe() {
        const up = this.properties.uP;
        if (!up) {
            return;
        }
        if (this.$vm) {
            updateComponentProps(resolvePropValue(up), this.$vm.$);
        }
        else if (resolvePropValue(this.properties.uT) === 'm') {
            // 小程序组件
            updateMiniProgramComponentProperties(resolvePropValue(up), this);
        }
    };
    {
        componentOptions.properties.uP.observer = observe;
    }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
    const prevProps = mpInstance.properties;
    const nextProps = findComponentPropsData(up) || {};
    if (hasPropsChanged(prevProps, nextProps, false)) {
        mpInstance.setData(nextProps);
    }
}
function updateComponentProps(up, instance) {
    const prevProps = toRaw(instance.props);
    const nextProps = findComponentPropsData(up) || {};
    if (hasPropsChanged(prevProps, nextProps)) {
        updateProps(instance, nextProps, prevProps, false);
        if (hasQueueJob(instance.update)) {
            invalidateJob(instance.update);
        }
        {
            instance.update();
        }
    }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
    const nextKeys = Object.keys(nextProps);
    if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
        return true;
    }
    for (let i = 0; i < nextKeys.length; i++) {
        const key = nextKeys[i];
        if (nextProps[key] !== prevProps[key]) {
            return true;
        }
    }
    return false;
}
function initBehaviors(vueOptions) {
    const vueBehaviors = vueOptions.behaviors;
    let vueProps = vueOptions.props;
    if (!vueProps) {
        vueOptions.props = vueProps = [];
    }
    const behaviors = [];
    if (isArray(vueBehaviors)) {
        vueBehaviors.forEach((behavior) => {
            // 这里的 global 应该是个变量
            behaviors.push(behavior.replace('uni://', 'tt' + '://'));
            if (behavior === 'uni://form-field') {
                if (isArray(vueProps)) {
                    vueProps.push('name');
                    vueProps.push('modelValue');
                }
                else {
                    vueProps.name = {
                        type: String,
                        default: '',
                    };
                    vueProps.modelValue = {
                        type: [String, Number, Boolean, Array, Object, Date],
                        default: '',
                    };
                }
            }
        });
    }
    return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
    componentOptions.data = initData();
    componentOptions.behaviors = initBehaviors(vueOptions);
}

function parseComponent(vueOptions, { parse, mocks, isPage, isPageInProject, initRelation, handleLink, initLifetimes, }) {
    vueOptions = vueOptions.default || vueOptions;
    const options = {
        multipleSlots: true,
        // styleIsolation: 'apply-shared',
        addGlobalClass: true,
        pureDataPattern: /^uP$/,
    };
    if (isArray(vueOptions.mixins)) {
        vueOptions.mixins.forEach((item) => {
            if (isObject(item.options)) {
                extend(options, item.options);
            }
        });
    }
    if (vueOptions.options) {
        extend(options, vueOptions.options);
    }
    const mpComponentOptions = {
        options,
        lifetimes: initLifetimes({ mocks, isPage, initRelation, vueOptions }),
        pageLifetimes: {
            show() {
                if (__VUE_PROD_DEVTOOLS__) {
                    devtoolsComponentAdded(this.$vm.$);
                }
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
        applyOptions(mpComponentOptions, vueOptions);
    }
    initProps(mpComponentOptions);
    initPropsObserver(mpComponentOptions);
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
function getAppVm() {
    if (process.env.UNI_MP_PLUGIN) {
        return tt.$vm;
    }
    if (process.env.UNI_SUBPACKAGE) {
        return tt.$subpackages[process.env.UNI_SUBPACKAGE].$vm;
    }
    return getApp().$vm;
}
function $createComponent(initialVNode, options) {
    if (!$createComponentFn) {
        $createComponentFn = getAppVm().$createComponent;
    }
    const proxy = $createComponentFn(initialVNode, options);
    return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
    if (!$destroyComponentFn) {
        $destroyComponentFn = getAppVm().$destroyComponent;
    }
    return $destroyComponentFn(instance);
}

function parsePage(vueOptions, parseOptions) {
    const { parse, mocks, isPage, initRelation, handleLink, initLifetimes } = parseOptions;
    const miniProgramPageOptions = parseComponent(vueOptions, {
        mocks,
        isPage,
        isPageInProject: true,
        initRelation,
        handleLink,
        initLifetimes,
    });
    initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
    const methods = miniProgramPageOptions.methods;
    methods.onLoad = function (query) {
        {
            this.options = query;
        }
        this.$page = {
            fullPath: addLeadingSlash(this.route + stringifyQuery(query)),
        };
        return this.$vm && this.$vm.$callHook(ON_LOAD, query);
    };
    initHooks(methods, PAGE_INIT_HOOKS);
    {
        initUnknownHooks(methods, vueOptions);
    }
    initRuntimeHooks(methods, vueOptions.__runtimeHooks);
    initMixinRuntimeHooks(methods);
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
function initTriggerEvent(mpInstance) {
    const oldTriggerEvent = mpInstance.triggerEvent;
    const newTriggerEvent = function (event, ...args) {
        return oldTriggerEvent.apply(mpInstance, [
            customizeEvent(event),
            ...args,
        ]);
    };
    // 京东小程序triggerEvent为只读属性
    try {
        mpInstance.triggerEvent = newTriggerEvent;
    }
    catch (error) {
        mpInstance._triggerEvent = newTriggerEvent;
    }
}
function initMiniProgramHook(name, options, isComponent) {
    if (isComponent) {
        // fix by Lxh 字节自定义组件Component构造器文档上写有created，但是实测只触发了lifetimes上的created
        options = options.lifetimes || {};
    }
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
    initMiniProgramHook(ON_LOAD, options);
    return MPPage(options);
};
Component = function (options) {
    initMiniProgramHook('created', options, true);
    // 小程序组件
    const isVueComponent = options.properties && options.properties.uP;
    if (!isVueComponent) {
        initProps(options);
        initPropsObserver(options);
    }
    return MPComponent(options);
};

// @ts-expect-error
function initLifetimes$1({ mocks, isPage, initRelation, vueOptions, }) {
    function attached() {
        initSetRef(this);
        const properties = this.properties;
        initVueIds(resolvePropValue(properties.uI), this);
        const relationOptions = {
            vuePid: this._$vuePid,
        };
        // 初始化 vue 实例
        const mpInstance = this;
        const mpType = isPage(mpInstance) ? 'page' : 'component';
        if (mpType === 'page' && !mpInstance.route && mpInstance.__route__) {
            mpInstance.route = mpInstance.__route__;
        }
        const props = findPropsData(properties, mpType === 'page');
        this.$vm = $createComponent({
            type: vueOptions,
            props,
        }, {
            mpType,
            mpInstance,
            slots: resolvePropValue(properties.uS) || {}, // vueSlots
            parentComponent: relationOptions.parent && relationOptions.parent.$,
            onBeforeSetup(instance, options) {
                initRefs(instance, mpInstance);
                initMocks(instance, mpInstance, mocks);
                initComponentInstance(instance, options);
            },
        });
        if (process.env.UNI_DEBUG) {
            console.log('uni-app:[' +
                Date.now() +
                '][' +
                (mpInstance.is || mpInstance.route) +
                '][' +
                this.$vm.$.uid +
                ']attached');
        }
        if (mpType === 'component') {
            initFormField(this.$vm);
        }
        {
            // 处理父子关系
            initRelation(this, relationOptions);
        }
    }
    function ready() {
        if (process.env.UNI_DEBUG) {
            console.log('uni-app:[' + Date.now() + '][' + (this.is || this.route) + ']ready');
        }
        if (this.$vm) {
            if (isPage(this)) {
                if (this.pageinstance) {
                    this.__webviewId__ = this.pageinstance.__pageId__;
                }
                {
                    this.$vm.$callCreatedHook();
                }
                nextSetDataTick(this, () => {
                    this.$vm.$callHook('mounted');
                    this.$vm.$callHook(ON_READY);
                });
            }
        }
        else {
            this.is && console.warn(this.is + ' is not ready');
        }
    }
    function detached() {
        if (this.$vm) {
            pruneComponentPropsCache(this.$vm.$.uid);
            $destroyComponent(this.$vm);
        }
    }
    {
        return { attached, ready, detached };
    }
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
    var _a, _b, _c;
    // 头条 triggerEvent 后，接收事件时机特别晚，已经到了 ready 之后
    const nodeId = (hasOwn(mpInstance, '__nodeId__')
        ? mpInstance.__nodeId__
        : mpInstance.__nodeid__);
    const webviewId = mpInstance.__webviewId__ + '';
    instances[webviewId + '_' + nodeId] = mpInstance.$vm;
    // 使用 virtualHost 后，头条不支持 triggerEvent，通过主动调用方法抹平差异
    if (((_c = (_b = (_a = mpInstance === null || mpInstance === void 0 ? void 0 : mpInstance.$vm) === null || _a === void 0 ? void 0 : _a.$options) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.virtualHost)) {
        nextSetDataTick(mpInstance, () => {
            handleLink.apply(mpInstance, [
                {
                    detail: {
                        vuePid: detail.vuePid,
                        nodeId,
                        webviewId,
                        // 如果是 virtualHost，则需要找到页面 vm 传递给 handleLink，因为此时的上下文是不对的，需要从页面 vm 递归查找
                        // 目前测试来看，页面的 nodeId 是 0
                        pageVm: instances[webviewId + '_0'],
                    },
                },
            ]);
        });
    }
    else {
        mpInstance.triggerEvent('__l', {
            vuePid: detail.vuePid,
            nodeId,
            webviewId,
        });
    }
}
function handleLink({ detail: { vuePid, nodeId, webviewId, pageVm }, }) {
    const vm = instances[webviewId + '_' + nodeId];
    if (!vm) {
        return;
    }
    let parentVm;
    if (vuePid) {
        parentVm = findVmByVueId(pageVm || this.$vm, vuePid);
    }
    else {
        // 如果 vuePid 不存在，则认为当前组件的父是页面，目前测试来看，页面的 nodeId 是 0
        parentVm = instances[webviewId + '_0'];
    }
    if (parentVm) {
        vm.$.parent = parentVm.$;
    }
    // 不再需要下述逻辑
    // if (this.$vm?.$options?.options?.virtualHost) {
    //   // 抖音小程序下 form 组件开启 virtualHost 出现 infinite loop. see: https://github.com/vuejs/core/blob/32a1433e0debd538c199bde18390bb903b4cde5a/packages/runtime-core/src/componentProps.ts#L227
    //   // vm.$.parent = null
    // } else {
    //   vm.$.parent = parentVm.$
    // }
    if (__VUE_OPTIONS_API__ && parentVm) {
        parentVm.$children.push(vm);
    }
    vm.$callCreatedHook();
    // TODO 字节小程序父子组件关系建立的较晚，导致 inject 和 provide 初始化变慢
    // 由此引发在 setup 中暂不可用，只能通过 options 方式配置
    // 初始化完 inject 后，再次调用 update，触发一次更新
    if (vm.$options.inject) {
        vm.$.update();
    }
    nextSetDataTick(this, () => {
        vm.$callHook('mounted');
        vm.$callHook(ON_READY);
    });
}
function parse(componentOptions, { handleLink }) {
    componentOptions.methods.__l = handleLink;
}

var parseComponentOptions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  handleLink: handleLink,
  initLifetimes: initLifetimes$1,
  initRelation: initRelation,
  instances: instances,
  isPage: isPage,
  mocks: mocks,
  parse: parse
});

function initLifetimes(lifetimesOptions) {
    return extend(initLifetimes$1(lifetimesOptions), {
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
  handleLink: handleLink,
  initLifetimes: initLifetimes,
  initRelation: initRelation,
  isPage: isPage,
  mocks: mocks,
  parse: parse
});

const createApp = initCreateApp();
const createPage = initCreatePage(parsePageOptions);
const createComponent = initCreateComponent(parseComponentOptions);
const createSubpackageApp = initCreateSubpackageApp();
tt.EventChannel = EventChannel;
tt.createApp = global.createApp = createApp;
tt.createPage = createPage;
tt.createComponent = createComponent;
tt.createSubpackageApp = global.createSubpackageApp =
    createSubpackageApp;

export { createApp, createComponent, createPage, createSubpackageApp };
