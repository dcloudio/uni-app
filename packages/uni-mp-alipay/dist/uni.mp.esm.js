import { capitalize, hasOwn, isArray, toNumber, isPlainObject, isObject, isFunction, extend, NOOP, EMPTY_OBJ, camelize } from '@vue/shared';

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
        Object.defineProperty(instance, 'slots', {
            get() {
                return this.$scope && this.$scope.props.$slots;
            }
        });
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
    {
        return prop;
    }
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
        }
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
    Object.keys(properties).forEach(key => {
        props[key] = properties[key].value;
    });
    return {
        props
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
        childVues.forEach(relationOptions => {
            // 父子关系
            handleLink.call(mpInstance, {
                detail: relationOptions
            });
            const { mpInstance: childMPInstance, createComponent } = relationOptions;
            childMPInstance.$vm = createComponent(relationOptions.parent);
            initSpecialMethods(childMPInstance);
            if (relationOptions.parent) {
                handleRef.call(relationOptions.parent.$scope, childMPInstance);
            }
            initChildVues(childMPInstance);
            childMPInstance.$vm.$callHook('mounted');
            childMPInstance.$vm.$callHook('onReady');
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
            eventOpts
        }
    };
    handler({
        type: customize(type),
        target,
        currentTarget: target,
        detail
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
        Object.keys(prevProps).forEach(name => {
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
const handleLink$1 = (function () {
    if (isComponent2) {
        return function handleLink$1(detail) {
            return handleLink.call(this, {
                detail
            });
        };
    }
    return function handleLink$1(detail) {
        if (this.$vm && this.$vm.$.isMounted) {
            // 父已初始化
            return handleLink.call(this, {
                detail
            });
        }
        (this._$childVues || (this._$childVues = [])).unshift(detail);
    };
})();
function createVueComponent(mpType, mpInstance, vueOptions, parent) {
    return $createComponent({
        type: vueOptions,
        props: mpInstance.props
    }, {
        mpType,
        mpInstance,
        parentComponent: parent && parent.$,
        onBeforeSetup(instance, options) {
            initMocks(instance, mpInstance, mocks);
            initComponentInstance(instance, options);
        }
    });
}

function createPage(vueOptions) {
    vueOptions = vueOptions.default || vueOptions;
    const pageOptions = {
        onLoad(args) {
            // 初始化 vue 实例
            this.$vm = createVueComponent('page', this, vueOptions);
            initSpecialMethods(this);
            this.$vm.$callHook('onLoad', args);
        },
        onReady() {
            initChildVues(this);
            this.$vm.$callHook('mounted');
            this.$vm.$callHook('onReady');
        },
        onUnload() {
            if (this.$vm) {
                this.$vm.$callHook('onUnload');
                $destroyComponent(this.$vm);
            }
        },
        events: {
            // 支付宝小程序有些页面事件只能放在events下
            onBack() {
                this.$vm.$callHook('onBackPress');
            }
        },
        __r: handleRef,
        __e: handleEvent,
        __l: handleLink$1
    };
    if (__VUE_OPTIONS_API__) {
        pageOptions.data = initData(vueOptions);
    }
    initHooks(pageOptions, PAGE_HOOKS);
    initUnknownHooks(pageOptions, vueOptions);
    return Page(pageOptions);
}

function initComponentProps(rawProps) {
    const propertiesOptions = {
        properties: {}
    };
    initProps(propertiesOptions, rawProps, false);
    const properties = propertiesOptions.properties;
    const props = {
        onVueInit: function () { }
    };
    Object.keys(properties).forEach(key => {
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
        createComponent
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
function createComponent(vueOptions) {
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
            __l: handleLink$1,
            triggerEvent
        }
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
    return Component(mpComponentOptions);
}

const createApp = initCreateApp(parseAppOptions);

export { createApp, createComponent, createPage };
