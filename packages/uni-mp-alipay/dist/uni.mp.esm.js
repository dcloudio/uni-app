import { SLOT_DEFAULT_NAME, EventChannel, invokeArrayFns, MINI_PROGRAM_PAGE_RUNTIME_HOOKS, ON_LOAD, ON_SHOW, ON_HIDE, ON_UNLOAD, ON_RESIZE, ON_TAB_ITEM_TAP, ON_REACH_BOTTOM, ON_PULL_DOWN_REFRESH, ON_ADD_TO_FAVORITES, isUniLifecycleHook, ON_READY, ON_LAUNCH, ON_ERROR, ON_THEME_CHANGE, ON_PAGE_NOT_FOUND, ON_UNHANDLE_REJECTION, customizeEvent, addLeadingSlash, stringifyQuery, ON_BACK_PRESS } from '@dcloudio/uni-shared';
import { ref, findComponentPropsData, toRaw, updateProps, hasQueueJob, invalidateJob, getExposeProxy, EMPTY_OBJ, isRef, setTemplateRef, devtoolsComponentAdded, pruneComponentPropsCache } from 'vue';
import { isArray, isFunction, capitalize, hasOwn, extend, isPlainObject, isString } from '@vue/shared';
import { normalizeLocale, LOCALE_EN } from '@dcloudio/uni-i18n';

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
        {
            const props = scope.props;
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
    ctx.$mpPlatform = "mp-alipay";
    ctx.$scope = options.mpInstance;
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
        {
            if (my.canIUse('getOpenerEventChannel'))
                return options.mpInstance.getOpenerEventChannel();
        }
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
            {
                return my[method] && my[method].apply(my, args);
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
            isFunction(my.getEventChannel)) {
            this.__eventChannel__ = my.getEventChannel(args.__id__);
            delete args.__id__;
        }
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
        $vm: instance,
        onLaunch(options) {
            this.$vm = instance; // 飞书小程序可能会把 AppOptions 序列化，导致 $vm 对象部分属性丢失
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
            ctx.globalData = this.globalData;
            instance.$callHook(ON_LAUNCH, options);
        },
    };
    const { onError } = internalInstance;
    if (onError) {
        internalInstance.appContext.config.errorHandler = (err) => {
            instance.$callHook(ON_ERROR, err);
        };
    }
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
function initCreateSubpackageApp(parseAppOptions) {
    return function createApp(vm) {
        const appOptions = parseApp(vm, parseAppOptions);
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
            (my.$subpackages || (my.$subpackages = {}))[process.env.UNI_SUBPACKAGE] = {
                $vm: vm,
            };
        }
    };
}
function initAppLifecycle(appOptions, vm) {
    if (isFunction(appOptions.onLaunch)) {
        const args = my.getLaunchOptionsSync && my.getLaunchOptionsSync();
        appOptions.onLaunch(args);
    }
    if (isFunction(appOptions.onShow) && my.onAppShow) {
        my.onAppShow((args) => {
            vm.$callHook('onShow', args);
        });
    }
    if (isFunction(appOptions.onHide) && my.onAppHide) {
        my.onAppHide((args) => {
            vm.$callHook('onHide', args);
        });
    }
}
function initLocale(appVm) {
    const locale = ref(normalizeLocale(my.getSystemInfoSync().language) || LOCALE_EN);
    Object.defineProperty(appVm, '$locale', {
        get() {
            return locale.value;
        },
        set(v) {
            locale.value = v;
        },
    });
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
        properties.uS = {
            type: null,
            value: [],
            observer: function (newVal) {
                const $slots = Object.create(null);
                newVal &&
                    newVal.forEach((slotName) => {
                        $slots[slotName] = true;
                    });
                this.setData({
                    $slots,
                });
            },
        };
    }
    if (options.behaviors) {
        // wx://form-field
        if (options.behaviors.includes('my://form-field')) {
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
    {
        {
            properties.virtualHostStyle = {
                type: null,
                value: '',
            };
            properties.virtualHostClass = {
                type: null,
                value: '',
            };
        }
    }
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
function findPropsData(properties, isPage) {
    return ((isPage
        ? findPagePropsData(properties)
        : findComponentPropsData(properties.uP)) || {});
}
function findPagePropsData(properties) {
    const propsData = {};
    if (isPlainObject(properties)) {
        Object.keys(properties).forEach((name) => {
            if (builtInProps.indexOf(name) === -1) {
                propsData[name] = properties[name];
            }
        });
    }
    return propsData;
}

function initData(_) {
    return {};
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
            behaviors.push(behavior.replace('uni://', 'my://'));
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

let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
    if (process.env.UNI_MP_PLUGIN) {
        return my.$vm;
    }
    if (process.env.UNI_SUBPACKAGE) {
        return my.$subpackages[process.env.UNI_SUBPACKAGE].$vm;
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

function initCreatePluginApp(parseAppOptions) {
    return function createApp(vm) {
        initAppLifecycle(parseApp(vm, parseAppOptions), vm);
        if (process.env.UNI_MP_PLUGIN) {
            my.$vm = vm;
        }
    };
}

function onAliAuthError(method, $event) {
    $event.type = 'getphonenumber';
    $event.detail.errMsg =
        'getPhoneNumber:fail Error: ' + $event.detail.errorMessage;
    method($event);
}
function onAliGetAuthorize(method, $event) {
    my.getPhoneNumber({
        success: (res) => {
            $event.type = 'getphonenumber';
            const response = JSON.parse(res.response);
            $event.detail.errMsg = 'getPhoneNumber:ok';
            $event.detail.encryptedData = response.response;
            $event.detail.sign = response.sign;
            method($event);
        },
        fail: (res) => {
            $event.type = 'getphonenumber';
            $event.detail.errMsg = 'getPhoneNumber:fail Error: ' + JSON.stringify(res);
            method($event);
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

const isComponent2 = my.canIUse('component2');
const mocks = ['$id'];
function initRelation(mpInstance, detail) {
    // onVueInit
    mpInstance.props.onVI(detail);
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
        path = path.slice(1);
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
function handleRef(ref) {
    if (!ref) {
        return;
    }
    const refName = ref.props.uR; // data-ref
    const refInForName = ref.props.uRIF; // data-ref-in-for
    if (!refName && !refInForName) {
        return;
    }
    const instance = this.$vm.$;
    const refs = instance.refs === EMPTY_OBJ ? (instance.refs = {}) : instance.refs;
    const { setupState } = instance;
    const refValue = ref.$vm;
    if (refName) {
        if (isString(refName)) {
            refs[refName] = refValue;
            if (hasOwn(setupState, refName)) {
                setupState[refName] = refValue;
            }
        }
        else {
            setRef(refName, refValue, refs, setupState);
        }
    }
    else if (refInForName) {
        if (isString(refInForName)) {
            (refs[refInForName] || (refs[refInForName] = [])).push(refValue);
        }
        else {
            setRef(refInForName, refValue, refs, setupState);
        }
    }
}
function isTemplateRef(opts) {
    return !!(opts && opts.r);
}
function setRef(ref, refValue, refs, setupState) {
    if (isRef(ref)) {
        ref.value = refValue;
    }
    else if (isFunction(ref)) {
        const templateRef = ref(refValue, refs);
        if (isTemplateRef(templateRef)) {
            setTemplateRef(templateRef, refValue, setupState);
        }
    }
}
function triggerEvent(type, detail) {
    const handler = this.props[customizeEvent('on-' + type)];
    if (!handler) {
        return;
    }
    const target = {
        dataset: {},
    };
    handler({
        type: customizeEvent(type),
        target,
        currentTarget: target,
        detail,
    });
}
// const IGNORES = ['$slots', '$scopedSlots']
function createObserver(isDidUpdate = false) {
    return function observe(props) {
        const nextProps = isDidUpdate ? this.props : props;
        if (nextProps.uP) {
            updateComponentProps(nextProps.uP, this.$vm.$);
        }
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
        props: findPropsData(mpInstance.props, mpType === 'page'),
    }, {
        mpType,
        mpInstance,
        slots: mpInstance.props.uS || {},
        parentComponent: parent && parent.$,
        onBeforeSetup(instance, options) {
            initMocks(instance, mpInstance, mocks);
            initComponentInstance(instance, options);
        },
    });
}

function initCreatePage() {
    return function createPage(vueOptions) {
        vueOptions = vueOptions.default || vueOptions;
        const pageOptions = {
            onLoad(query) {
                this.options = query;
                this.$page = {
                    fullPath: addLeadingSlash(this.route + stringifyQuery(query)),
                };
                // 初始化 vue 实例
                this.props = query;
                this.$vm = createVueComponent('page', this, vueOptions);
                initSpecialMethods(this);
                this.$vm.$callHook(ON_LOAD, query);
            },
            onShow() {
                if (__VUE_PROD_DEVTOOLS__) {
                    devtoolsComponentAdded(this.$vm.$);
                }
                this.$vm.$callHook(ON_SHOW);
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
                onKeyboardHeight: ((res) => {
                    my.$emit('uni:keyboardHeightChange', res);
                }),
            },
            __r: handleRef,
            __l: handleLink,
        };
        if (isPlainObject(vueOptions.events)) {
            extend(pageOptions.events, vueOptions.events);
        }
        if (__VUE_OPTIONS_API__) {
            pageOptions.data = initData();
        }
        initHooks(pageOptions, PAGE_INIT_HOOKS);
        initUnknownHooks(pageOptions, vueOptions);
        initRuntimeHooks(pageOptions, vueOptions.__runtimeHooks);
        initWxsCallMethods(pageOptions, vueOptions.wxsCallMethods);
        return Page(pageOptions);
    };
}

// @ts-ignore
function initComponentProps(_rawProps) {
    const propertiesOptions = {
        properties: {},
    };
    initProps(propertiesOptions);
    const properties = propertiesOptions.properties;
    const props = {
        // onVueInit
        onVI: function () { },
    };
    Object.keys(properties).forEach((key) => {
        // vueSlots
        if (key !== 'uS') {
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
    initVueIds(properties.uI, mpInstance);
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
function initCreateComponent() {
    return function createComponent(vueOptions) {
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
                if (this.$vm) {
                    pruneComponentPropsCache(this.$vm.$.uid);
                    $destroyComponent(this.$vm);
                }
            },
            methods: {
                __r: handleRef,
                __l: handleLink,
                triggerEvent,
            },
        };
        if (__VUE_OPTIONS_API__) {
            mpComponentOptions.data = initData();
            mpComponentOptions.mixins = initBehaviors(vueOptions);
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
    };
}

const createApp = initCreateApp(parseAppOptions);
const createPage = initCreatePage();
const createComponent = initCreateComponent();
const createPluginApp = initCreatePluginApp(parseAppOptions);
const createSubpackageApp = initCreateSubpackageApp(parseAppOptions);
my.EventChannel = EventChannel;
my.createApp = createApp;
my.createPage = createPage;
my.createComponent = createComponent;
my.createPluginApp = createPluginApp;
my.createSubpackageApp = createSubpackageApp;

export { createApp, createComponent, createPage, createPluginApp, createSubpackageApp };
