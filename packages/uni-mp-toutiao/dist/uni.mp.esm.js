import { isArray, hasOwn, toNumber, isPlainObject, isObject, isFunction, extend, NOOP, camelize } from '@vue/shared';

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
    'selectComponent'
];
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
    const hooks = this.$[name];
    let ret;
    if (hooks) {
        for (let i = 0; i < hooks.length; i++) {
            ret = hooks[i](args);
        }
    }
    return ret;
}
function createEmitFn(oldEmit, ctx) {
    return function emit(event, ...args) {
        if (ctx.$scope && event) {
            ctx.$scope.triggerEvent(event, { __args__: args });
        }
        return oldEmit.apply(this, [event, ...args]);
    };
}
function set(target, key, val) {
    return (target[key] = val);
}
function initBaseInstance(instance, options) {
    const ctx = instance.ctx;
    // mp
    ctx.mpType = options.mpType; // @deprecated
    ctx.$mpType = options.mpType;
    ctx.$scope = options.mpInstance;
    // TODO @deprecated
    ctx.$mp = {};
    ctx._self = {};
    // $vm
    ctx.$scope.$vm = instance.proxy;
    // slots
    {
        instance.slots = {};
        if (isArray(options.slots) && options.slots.length) {
            options.slots.forEach(name => {
                instance.slots[name] = true;
            });
        }
    }
    if (__VUE_OPTIONS_API__) {
        // $set
        ctx.$set = set;
    }
    // $emit
    instance.emit = createEmitFn(instance.emit, ctx);
    // $callHook
    ctx.$hasHook = hasHook;
    ctx.$callHook = callHook;
}
function initComponentInstance(instance, options) {
    initBaseInstance(instance, options);
    const ctx = instance.ctx;
    MP_METHODS.forEach(method => {
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
    // ctx.__get_style = getStyle
    ctx.__map = map;
}
function initMocks(instance, mpInstance, mocks) {
    const ctx = instance.ctx;
    mocks.forEach(mock => {
        if (hasOwn(mpInstance, mock)) {
            ctx[mock] = mpInstance[mock];
        }
    });
}

const PAGE_HOOKS = [
    'onLoad',
    'onShow',
    // 'onReady', // lifetimes.ready
    'onHide',
    'onUnload',
    'onResize',
    // 'onPageScroll', // 影响性能，开发者手动注册
    'onTabItemTap',
    'onReachBottom',
    'onPullDownRefresh',
    // 'onShareTimeline', // 右上角菜单，开发者手动注册
    'onAddToFavorites'
    // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = new Set()) {
    if (vueOptions) {
        Object.keys(vueOptions).forEach(name => {
            if (name.indexOf('on') === 0 && isFunction(vueOptions[name])) {
                hooks.add(name);
            }
        });
        if (__VUE_OPTIONS_API__) {
            const { extends: extendsOptions, mixins } = vueOptions;
            if (mixins) {
                mixins.forEach(mixin => findHooks(mixin, hooks));
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
            if ( hook === 'onError') {
                return getApp().$vm.$callHook(hook, args);
            }
            return this.$vm && this.$vm.$callHook(hook, args);
        };
    }
}
const EXCLUDE_HOOKS = ['onReady'];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
    hooks.forEach(hook => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
    findHooks(vueOptions).forEach(hook => initHook(mpOptions, hook, excludes));
}

const HOOKS = [
    'onShow',
    'onHide',
    'onError',
    'onThemeChange',
    'onPageNotFound',
    'onUnhandledRejection'
];
function parseApp(instance, parseAppOptions) {
    const internalInstance = instance.$;
    const appOptions = {
        globalData: (instance.$options && instance.$options.globalData) || {},
        $vm: instance,
        onLaunch(options) {
            const ctx = internalInstance.ctx;
            if (this.$vm && ctx.$callHook) {
                // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
                return;
            }
            initBaseInstance(internalInstance, {
                mpType: 'app',
                mpInstance: this,
                slots: []
            });
            ctx.globalData = this.globalData;
            instance.$callHook('onLaunch', options);
        }
    };
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
    EXTRAS.forEach(name => {
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
function initRefs(instance, mpInstance) {
    Object.defineProperty(instance, 'refs', {
        get() {
            const $refs = {};
            const components = mpInstance.selectAllComponents('.vue-ref');
            components.forEach(component => {
                const ref = component.dataset.ref;
                $refs[ref] = component.$vm || component;
            });
            const forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
            forComponents.forEach(component => {
                const ref = component.dataset.ref;
                if (!$refs[ref]) {
                    $refs[ref] = [];
                }
                $refs[ref].push(component.$vm || component);
            });
            return $refs;
        }
    });
}
function findVmByVueId(instance, vuePid) {
    // TODO vue3 中 没有 $children
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
            value: ''
        };
        {
            // 用于字节跳动小程序模拟抽象节点
            properties.generic = {
                type: Object
            };
        }
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
                    $slots
                });
            }
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
        rawProps.forEach(key => {
            properties[key] = createProperty(key, {
                type: null
            });
        });
    }
    else if (isPlainObject(rawProps)) {
        Object.keys(rawProps).forEach(key => {
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
                    value
                });
            }
            else {
                // content:String
                const type = parsePropType(key, opts);
                properties[key] = createProperty(key, {
                    type: PROP_TYPES.indexOf(type) !== -1 ? type : null
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
            const appConfig = getApp().$vm.$.appContext
                .config;
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
        vueBehaviors.forEach(behavior => {
            behaviors.push(behavior.replace('uni://', `${__PLATFORM_PREFIX__}://`));
            if (behavior === 'uni://form-field') {
                if (isArray(vueProps)) {
                    vueProps.push('name');
                    vueProps.push('value');
                }
                else {
                    vueProps.name = {
                        type: String,
                        default: ''
                    };
                    vueProps.value = {
                        type: [String, Number, Boolean, Array, Object, Date],
                        default: ''
                    };
                }
            }
        });
    }
    if (isPlainObject(vueExtends) && vueExtends.props) {
        const behavior = {};
        initProps(behavior, vueExtends.props, true);
        behaviors.push(initBehavior(behavior));
    }
    if (isArray(vueMixins)) {
        vueMixins.forEach(vueMixin => {
            if (isPlainObject(vueMixin) && vueMixin.props) {
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

function getValue(obj, path) {
    const parts = path.split('.');
    let key = parts[0];
    if (key.indexOf('__$n') === 0) {
        //number index
        key = parseInt(key.replace('__$n', ''));
    }
    if (parts.length === 1) {
        return obj[key];
    }
    return getValue(obj[key], parts.slice(1).join('.'));
}
function getExtraValue(instance, dataPathsArray) {
    let context = instance;
    dataPathsArray.forEach(dataPathArray => {
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
                    vFor = getValue(context, dataPath);
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
                    context = vFor.find(vForItem => {
                        return getValue(vForItem, propPath) === value;
                    });
                }
                else if (isPlainObject(vFor)) {
                    context = Object.keys(vFor).find(vForKey => {
                        return getValue(vFor[vForKey], propPath) === value;
                    });
                }
                else {
                    console.error('v-for 暂不支持循环数据：', vFor);
                }
            }
            if (valuePath) {
                context = getValue(context, valuePath);
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
                        extraObj['$' + index] = getValue(event, dataPath.replace('$event.', ''));
                    }
                    else {
                        extraObj['$' + index] = getValue(instance, dataPath);
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
    args.forEach(arg => {
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
        event.target = Object.assign({}, event.target, event.detail);
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
                    ret.push(handler.apply(handlerCtx, processEventArgs(this.$vm, event, eventArray[1], eventArray[2], isCustom, methodName)));
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

function parseComponent(vueOptions, { parse, mocks, isPage, initRelation, handleLink, initLifetimes }) {
    vueOptions = vueOptions.default || vueOptions;
    const options = {
        multipleSlots: true,
        addGlobalClass: true
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
            }
        },
        methods: {
            __l: handleLink,
            __e: handleEvent
        }
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
        initLifetimes
    });
    const methods = miniProgramPageOptions.methods;
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
function initHook$1(name, options) {
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
    initHook$1('onLoad', options);
    return MPPage(options);
};
Component = function (options) {
    initHook$1('created', options);
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
function inject(instance, key, defaultValue) {
    if (instance) {
        const provides = instance.provides;
        if (key in provides) {
            // TS doesn't allow symbol as index type
            return provides[key];
        }
        else if (arguments.length > 1) {
            return defaultValue;
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
                ctx[key] = inject(internalInstance, opt.from, opt.default);
            }
            else {
                ctx[key] = inject(internalInstance, opt);
            }
        }
    }
}

function initLifetimes({ mocks, isPage, initRelation, vueOptions }) {
    return {
        attached() {
            const properties = this.properties;
            initVueIds(properties.vueId, this);
            const relationOptions = {
                vuePid: this._$vuePid
            };
            // 初始化 vue 实例
            const mpInstance = this;
            const mpType = isPage(mpInstance) ? 'page' : 'component';
            if (mpType === 'page' && !mpInstance.route && mpInstance.__route__) {
                mpInstance.route = mpInstance.__route__;
            }
            this.$vm = $createComponent({
                type: vueOptions,
                props: properties
            }, {
                mpType,
                mpInstance,
                slots: properties.vueSlots,
                parentComponent: relationOptions.parent && relationOptions.parent.$,
                onBeforeSetup(instance, options) {
                    initRefs(instance, mpInstance);
                    initMocks(instance, mpInstance, mocks);
                    initComponentInstance(instance, options);
                }
            });
            // 处理父子关系
            initRelation(this, relationOptions);
        },
        detached() {
            this.$vm && $destroyComponent(this.$vm);
        }
    };
}

const mocks = [
    '__route__',
    '__webviewId__',
    '__nodeId__',
    '__nodeid__' /* @Deprecated */
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
        webviewId
    });
}
function handleLink({ detail: { vuePid, nodeId, webviewId } }) {
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
    vm.$callSyncHook('created');
    vm.$callHook('mounted');
    vm.$callHook('onReady');
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
  initLifetimes: initLifetimes
});

function initLifetimes$1(lifetimesOptions) {
    return extend(initLifetimes(lifetimesOptions), {
        ready() {
            if (this.$vm && lifetimesOptions.isPage(this)) {
                this.$vm.$callSyncHook('created');
                this.$vm.$callHook('mounted');
                this.$vm.$callHook('onReady');
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
                Object.keys(instances).forEach(key => {
                    if (key.indexOf(webviewId + '_') === 0) {
                        delete instances[key];
                    }
                });
        }
    });
}

var parsePageOptions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  mocks: mocks,
  isPage: isPage,
  initRelation: initRelation,
  handleLink: handleLink,
  parse: parse,
  initLifetimes: initLifetimes$1
});

const createApp = initCreateApp();
const createPage = initCreatePage(parsePageOptions);
const createComponent = initCreateComponent(parseComponentOptions);

export { createApp, createComponent, createPage };
