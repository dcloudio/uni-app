import Vue from 'vue';

function parseData (data, vueComponentOptions) {
  if (!data) {
    return
  }
  vueComponentOptions.mpOptions.data = data;
}

function parseComponents (vueComponentOptions) {
  vueComponentOptions.components = global['__wxVueOptions'].components;
}

const _toString = Object.prototype.toString;
const hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn (fn) {
  return typeof fn === 'function'
}

function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

function noop () { }

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  const cache = Object.create(null);
  return function cachedFn (str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str))
  }
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g;
const camelize = cached((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
});

const SOURCE_KEY = '__data__';

const COMPONENT_LIFECYCLE = {
  'created': 'onServiceCreated',
  'attached': 'onServiceAttached',
  'ready': 'mounted',
  'moved': 'moved',
  'detached': 'destroyed'
};

const COMPONENT_LIFECYCLE_KEYS = Object.keys(COMPONENT_LIFECYCLE);

const PAGE_LIFETIMES = {
  show: 'onPageShow',
  hide: 'onPageHide',
  resize: 'onPageResize'
};

const PAGE_LIFETIMES_KEYS = Object.keys(PAGE_LIFETIMES);

const PAGE_LIFECYCLE = [
  'onLoad',
  'onShow',
  'onReady',
  'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage',
  'onPageScroll',
  'onResize',
  'onTabItemTap'
];

function parsePageMethods (mpComponentOptions, vueComponentOptions) {
  const methods = Object.create(null);
  Object.keys(mpComponentOptions).forEach(key => {
    const value = mpComponentOptions[key];
    if (isFn(value) && PAGE_LIFECYCLE.indexOf(key) === -1) {
      methods[key] = value;
    }
  });
  vueComponentOptions.methods = methods;
}

function parsePageLifecycle (mpComponentOptions, vueComponentOptions) {
  Object.keys(mpComponentOptions).forEach(key => {
    if (PAGE_LIFECYCLE.indexOf(key) !== -1) {
      vueComponentOptions[key] = mpComponentOptions[key];
    }
  });
}

function parsePage (mpComponentOptions) {
  const vueComponentOptions = {
    mixins: [],
    mpOptions: {}
  };

  parseComponents(vueComponentOptions);

  parseData(mpComponentOptions.data, vueComponentOptions);

  parsePageMethods(mpComponentOptions, vueComponentOptions);
  parsePageLifecycle(mpComponentOptions, vueComponentOptions);

  return vueComponentOptions
}

function parseProperties (properties, vueComponentOptions) {
  if (!properties) {
    return
  }
  vueComponentOptions.mpOptions.properties = properties;
}

function parseOptions (options, vueComponentOptions) {
  if (!options) {
    return
  }
  vueComponentOptions.mpOptions.options = options;
}

function parseMethods (methods, vueComponentOptions) {
  if (!methods) {
    return
  }
  if (methods.$emit) {
    console.warn(`Method "$emit" conflicts with an existing Vue instance method`);
    delete methods.$emit;
  }
  vueComponentOptions.methods = methods;
}

function parseLifecycle (mpComponentOptions, vueComponentOptions) {
  COMPONENT_LIFECYCLE_KEYS.forEach(name => {
    if (hasOwn(mpComponentOptions, name)) {
      (vueComponentOptions[COMPONENT_LIFECYCLE[name]] || (vueComponentOptions[COMPONENT_LIFECYCLE[name]] = []))
        .push(mpComponentOptions[name]);
    }
  });
}

const mpBehaviors = {
  'wx://form-field': {},
  'wx://component-export': {}
};

function callDefinitionFilter (mpComponentOptions) {
  const {
    behaviors,
    definitionFilter
  } = mpComponentOptions;

  const behaviorDefinitionFilters = [];

  if (Array.isArray(behaviors)) {
    behaviors.forEach(behavior => {
      behavior = typeof behavior === 'string' ? mpBehaviors[behavior] : behavior;
      if (behavior.definitionFilter) {
        behaviorDefinitionFilters.push(behavior.definitionFilter);
        behavior.definitionFilter.call(null, mpComponentOptions, []);
      }
    });
  }

  if (isFn(definitionFilter)) {
    return function (defFields) {
      definitionFilter(defFields, behaviorDefinitionFilters);
    }
  }
}

function parseDefinitionFilter (mpComponentOptions, vueComponentOptions) {
  callDefinitionFilter(mpComponentOptions);
}

function parseBehavior (behavior) {
  const {
    data,
    methods,
    behaviors,
    properties
  } = behavior;

  const vueComponentOptions = {
    watch: {},
    mpOptions: {
      mpObservers: []
    }
  };

  parseData(data, vueComponentOptions);
  parseMethods(methods, vueComponentOptions);
  parseBehaviors(behaviors, vueComponentOptions);
  parseProperties(properties, vueComponentOptions);

  parseLifecycle(behavior, vueComponentOptions);
  parseDefinitionFilter(behavior);

  return vueComponentOptions
}

const BEHAVIORS = {
  'wx://form-field': {
    beforeCreate () {
      const mpOptions = this.$options.mpOptions;
      if (!mpOptions.properties) {
        mpOptions.properties = Object.create(null);
      }

      const props = mpOptions.properties;
      // TODO form submit,reset
      if (!props.name) {
        props.name = {
          type: String
        };
      }
      if (!props.value) {
        props.value = {
          type: null
        };
      }
    }
  }
};

function parseBehaviors (behaviors, vueComponentOptions) {
  if (!behaviors) {
    return
  }
  behaviors.forEach(behavior => {
    if (typeof behavior === 'string') {
      BEHAVIORS[behavior] && vueComponentOptions.mixins.push(BEHAVIORS[behavior]);
    } else {
      vueComponentOptions.mixins.push(parseBehavior(behavior));
    }
  });
}

function parseSinglePath (path) {
  return path.split('.')
}

function parseMultiPaths (paths) {
  return paths.split(',').map(path => parseSinglePath(path))
}

function parseObservers (observers, vueComponentOptions) {
  if (!observers) {
    return
  }

  const {
    mpObservers
  } = vueComponentOptions.mpOptions;

  Object.keys(observers).forEach(path => {
    mpObservers.push({
      paths: parseMultiPaths(path),
      observer: observers[path]
    });
  });
}

function relative (from, to) {
  if (to.indexOf('/') === 0) {
    from = '';
  }
  const fromArr = from.split('/');
  const toArr = to.split('/');
  fromArr.pop();
  while (toArr.length) {
    const part = toArr.shift();
    if (part !== '' && part !== '.') {
      if (part !== '..') {
        fromArr.push(part);
      } else {
        fromArr.pop();
      }
    }
  }
  return fromArr.join('/')
}

function parseRelations (relations, vueComponentOptions) {
  if (!relations) {
    return
  }
  Object.keys(relations).forEach(name => {
    const relation = relations[name];
    relation.name = name;
    relation.target = relation.target ? String(relation.target) : relative(global['__wxRoute'], name);
  });
  vueComponentOptions.mpOptions.relations = relations;
}

function parseExternalClasses (externalClasses, vueComponentOptions) {
  if (!externalClasses) {
    return
  }
  if (!Array.isArray(externalClasses)) {
    externalClasses = [externalClasses];
  }
  vueComponentOptions.mpOptions.externalClasses = externalClasses;
  if (!vueComponentOptions.mpOptions.properties) {
    vueComponentOptions.mpOptions.properties = Object.create(null);
  }
  externalClasses.forEach(externalClass => {
    vueComponentOptions.mpOptions.properties[camelize(externalClass)] = {
      type: String,
      value: ''
    };
  });
}

function parseLifetimes (lifetimes, vueComponentOptions) {
  if (!lifetimes) {
    return
  }
  parseLifecycle(lifetimes, vueComponentOptions);
}

function parsePageLifetimes (pageLifetimes, vueComponentOptions) {
  if (!pageLifetimes) {
    return
  }
  PAGE_LIFETIMES_KEYS.forEach(key => {
    const lifetimeFn = pageLifetimes[key];
    isFn(lifetimeFn) && (vueComponentOptions[PAGE_LIFETIMES[key]] = lifetimeFn);
  });
}

function parseComponent (mpComponentOptions) {
  const {
    data,
    options,
    methods,
    behaviors,
    lifetimes,
    observers,
    relations,
    properties,
    pageLifetimes,
    externalClasses
  } = mpComponentOptions;

  const vueComponentOptions = {
    mixins: [],
    props: {},
    watch: {},
    mpOptions: {
      mpObservers: []
    }
  };

  parseComponents(vueComponentOptions);

  parseData(data, vueComponentOptions);
  parseOptions(options, vueComponentOptions);
  parseMethods(methods, vueComponentOptions);
  parseBehaviors(behaviors, vueComponentOptions);
  parseLifetimes(lifetimes, vueComponentOptions);
  parseObservers(observers, vueComponentOptions);
  parseRelations(relations, vueComponentOptions);
  parseProperties(properties, vueComponentOptions);
  parsePageLifetimes(pageLifetimes, vueComponentOptions);
  parseExternalClasses(externalClasses, vueComponentOptions);

  parseLifecycle(mpComponentOptions, vueComponentOptions);
  parseDefinitionFilter(mpComponentOptions);

  return vueComponentOptions
}

function initRelationHandlers (type, handler, target, ctx) {
  if (!handler) {
    return
  }
  const name = `_$${type}Handlers`;
  (ctx[name] || (ctx[name] = [])).push(function () {
    handler.call(ctx, target);
  });
}

function initLinkedHandlers (relation, target, ctx) {
  const type = 'linked';
  const name = relation.name;
  const relationNodes = ctx._$relationNodes || (ctx._$relationNodes = Object.create(null));
  (relationNodes[name] || (relationNodes[name] = [])).push(target);
  initRelationHandlers(type, relation[type], target, ctx);
}

function initUnlinkedHandlers (relation, target, ctx) {
  const type = 'unlinked';
  initRelationHandlers(type, relation[type], target, ctx);
}

function findParentRelation (parentVm, target, type) {
  const relations = parentVm &&
    parentVm.$options.mpOptions &&
    parentVm.$options.mpOptions.relations;

  if (!relations) {
    return []
  }
  const name = Object.keys(relations).find(name => {
    const relation = relations[name];
    return relation.target === target && relation.type === type
  });
  if (!name) {
    return []
  }
  return [relations[name], parentVm]
}

function initParentRelation (vm, childRelation, match) {
  const [parentRelation, parentVm] = match(vm, vm.$options.mpOptions.path);
  if (!parentRelation) {
    return
  }

  initLinkedHandlers(parentRelation, vm, parentVm);
  initLinkedHandlers(childRelation, parentVm, vm);

  initUnlinkedHandlers(parentRelation, vm, parentVm);
  initUnlinkedHandlers(childRelation, parentVm, vm);
}

function initRelation (relation, vm) {
  const type = relation.type;
  if (type === 'parent') {
    initParentRelation(vm, relation, function matchParent (vm, target) {
      return findParentRelation(vm.$parent, target, 'child')
    });
  } else if (type === 'ancestor') {
    initParentRelation(vm, relation, function matchAncestor (vm, target) {
      let $parent = vm.$parent;
      while ($parent) {
        const ret = findParentRelation($parent, target, 'descendant');
        if (ret.length) {
          return ret
        }
        $parent = $parent.$parent;
      }
      return []
    });
  }
}

function initRelations (vm) {
  const {
    relations
  } = vm.$options.mpOptions || {};
  if (!relations) {
    return
  }
  Object.keys(relations).forEach(name => {
    initRelation(relations[name], vm);
  });
}

function handleRelations (vm, type) {
  // TODO 需要移除 relationNodes
  const handlers = vm[`_$${type}Handlers`];
  if (!handlers) {
    return
  }
  handlers.forEach(handler => handler());
}

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function setDataByExprPath (exprPath, value, data) {
  const keys = exprPath.replace(/\[(\d+?)\]/g, '.$1').split('.');
  keys.reduce((obj, key, idx) => {
    if (idx === keys.length - 1) {
      obj[key] = value;
    } else {
      if (typeof obj[key] === 'undefined') {
        obj[key] = {};
      }
      return obj[key]
    }
  }, data);
  return keys.length === 1
}

function setData (data, callback) {
  if (!isPlainObject(data)) {
    return
  }
  Object.keys(data).forEach(key => {
    if (setDataByExprPath(key, data[key], this.data)) {
      !hasOwn(this, key) && proxy(this, SOURCE_KEY, key);
    }
  });
  this.$forceUpdate();
  isFn(callback) && this.$nextTick(callback);
}

/**
 * https://github.com/swan-team/swan-js/blob/61e2a63f7aa576b5daafbe77fdfa7c65b977060c/src/utils/index.js
 */

const _toString$1 = Object.prototype.toString;
/**
 * 深度assign的函数
 * @param {Object} targetObject 要被拷贝的目标对象
 * @param {Object} originObject 拷贝的源对象
 * @return {Object} merge后的对象
 */
const deepAssign = (targetObject = {}, originObject) => {
  const originType = _toString$1.call(originObject);
  if (originType === '[object Array]') {
    targetObject = originObject.slice(0);
    return targetObject
  } else if (originType === '[object Object]') {
    for (const key in originObject) {
      targetObject[key] = deepAssign(targetObject[key], originObject[key]);
    }
    return targetObject
  } else if (originType === '[object Date]') {
    return new Date(originObject.getTime())
  } else if (originType === '[object RegExp]') {
    const target = String(originObject);
    const lastIndex = target.lastIndexOf('/');
    return new RegExp(target.slice(1, lastIndex), target.slice(lastIndex + 1))
  }
  return originObject
};

/**
 * 深度拷贝逻辑，不同于lodash等库，但是与微信一致
 * @param {*} [originObj] 原对象
 * @return {Object|Array} 拷贝结果
 */
const deepClone = originObj => {
  return deepAssign(_toString$1.call(originObj) === '[object Array]' ? [] : {}, originObj)
};

const PROP_DEFAULT_VALUES = {
  [String]: '',
  [Number]: 0,
  [Boolean]: false,
  [Object]: null,
  [Array]: [],
  [null]: null
};

function getDefaultVal (propType) {
  return PROP_DEFAULT_VALUES[propType]
}

function getPropertyVal (options) {
  if (isPlainObject(options)) {
    if (hasOwn(options, 'value')) {
      return options.value
    }
    return getDefaultVal(options.type)
  }
  return getDefaultVal(options)
}

function getType (propOptions) {
  return isPlainObject(propOptions) ? propOptions.type : propOptions
}

function validateProp (key, propsOptions, propsData, vm) {
  let value = propsData[key];
  if (value !== undefined) {
    const propOptions = propsOptions[key];
    const type = getType(propOptions);
    if (type === Boolean) {
      value = !!value;
    }
    const observer = propOptions && propOptions.observer;
    if (observer) {
      // 初始化时,异步触发 observer,否则 observer 中无法访问 methods 或其他
      setTimeout(function () {
        observe(observer, vm, value);
      }, 4);
    }
    return value
  }
  return getPropertyVal(propsOptions[key])
}

function observe (observer, vm, newVal, oldVal) {
  try {
    if (typeof observer === 'function') {
      observer.call(vm, newVal, oldVal);
    } else if (typeof observer === 'string' &&
      typeof vm[observer] === 'function'
    ) {
      vm[observer](newVal, oldVal);
    }
  } catch (err) {
    console.error(`execute observer ${observer} callback fail! err: ${err}`);
  }
}

function initProperties (vm, instanceData) {
  const properties = vm.$options.mpOptions.properties;
  if (!properties) {
    return
  }

  const propsData = deepClone(vm.$options.propsData) || {};

  for (const key in properties) {
    const observer = isPlainObject(properties[key]) ? properties[key].observer : false;
    let value = validateProp(key, properties, propsData, vm);
    Object.defineProperty(instanceData, key, {
      enumerable: true,
      configurable: true,
      get () {
        return value
      },
      set (newVal) {
        const oldVal = value;
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal && value !== value)) {
          return
        }
        // TODO 临时方案,clone array
        value = Array.isArray(newVal) ? newVal.slice(0) : newVal;
        if (observer) {
          observe(observer, vm, newVal, oldVal);
        }
        // 触发渲染
        vm.$forceUpdate();
      }
    });
  }
}

function updateProperties (vm) {
  const properties = vm.$options.mpOptions && vm.$options.mpOptions.properties;
  const propsData = vm.$options.propsData;
  if (propsData && properties) {
    Object.keys(properties).forEach(key => {
      if (hasOwn(propsData, key)) {
        const type = getType(properties[key]);
        if (type === Boolean) {
          vm[key] = !!propsData[key];
        } else {
          vm[key] = propsData[key];
        }
      }
    });
  }
}

function initState (vm) {
  const instanceData = JSON.parse(JSON.stringify(vm.$options.mpOptions.data || {}));

  vm[SOURCE_KEY] = instanceData;

  const propertyDefinition = {
    get () {
      return vm[SOURCE_KEY]
    },
    set (value) {
      vm[SOURCE_KEY] = value;
    }
  };

  Object.defineProperties(vm, {
    data: propertyDefinition,
    properties: propertyDefinition
  });

  vm.setData = setData;

  initProperties(vm, instanceData);

  Object.keys(instanceData).forEach(key => {
    proxy(vm, SOURCE_KEY, key);
  });
}

function initMethods (vm) {
  const oldEmit = vm.$emit;
  vm.triggerEvent = (eventName, detail, options) => {
    const target = {
      dataset: vm.$el.dataset
    };

    const event = {
      target,
      currentTarget: target,
      detail,
      preventDefault: noop,
      stopPropagation: noop
    };

    oldEmit.call(vm, eventName, event);
  };
  // 主要是Vant 自己封装了 $emit,放到 methods 中会触发 Vue 的警告,索性,框架直接重写该方法
  vm.$emit = (...args) => {
    vm.triggerEvent(...args);
  };
  vm.getRelationNodes = (relationKey) => {
    /* eslint-disable  no-mixed-operators */
    return vm._$relationNodes && vm._$relationNodes[relationKey] || []
  };

  vm._$updateProperties = updateProperties;
}

function handleObservers (vm) {
  const watch = vm.$options.watch;
  if (!watch) {
    return
  }
  Object.keys(watch).forEach(name => {
    const observer = watch[name];
    if (observer.mounted) {
      const val = vm[name];
      let handler = observer.handler;
      if (typeof handler === 'string') {
        handler = vm[handler];
      }
      handler && handler.call(vm, val, val);
    }
  });
}

var polyfill = {
  beforeCreate () {
    // 取消 development 时的 Proxy,避免小程序组件模板中使用尚未定义的属性告警
    this._renderProxy = this;
  },
  created () { // properties 中可能会访问 methods,故需要在 created 中初始化
    initState(this);
    initMethods(this);
    initRelations(this);
  },
  mounted () {
    handleObservers(this);
  },
  beforeDestroy () {
    handleRelations(this, 'unlinked');
  }
};

global['__wxRoute'] = '';
global['__wxComponents'] = Object.create(null);
global['__wxVueOptions'] = Object.create(null);

function Page (options) {
  const pageOptions = parsePage(options);
  pageOptions.mixins.unshift(polyfill);
  pageOptions.mpOptions.path = global['__wxRoute'];
  global['__wxComponents'][global['__wxRoute']] = pageOptions;
}

function initRelationsHandler (vueComponentOptions) {
  // linked 需要在当前组件 attached 之后再执行
  if (!vueComponentOptions['onServiceAttached']) {
    vueComponentOptions['onServiceAttached'] = [];
  }
  vueComponentOptions['onServiceAttached'].push(function onServiceAttached () {
    handleRelations(this, 'linked');
  });
}

function Component (options) {
  const componentOptions = parseComponent(options);
  componentOptions.mixins.unshift(polyfill);
  componentOptions.mpOptions.path = global['__wxRoute'];
  initRelationsHandler(componentOptions);
  global['__wxComponents'][global['__wxRoute']] = componentOptions;
}

function Behavior (options) {
  return options
}

const nextTick = Vue.nextTick;

export default uni;
export { Behavior, Component, Page, nextTick };
