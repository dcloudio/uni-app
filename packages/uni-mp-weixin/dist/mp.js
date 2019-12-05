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

function noop () {}

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
  'created': 'created',
  'attached': 'created',
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

const PROP_DEFAULT_VALUES = {
  String: '',
  Number: 0,
  Boolean: false,
  Object: null,
  Array: [],
  null: null
};

const PROP_DEFAULT_KEYS = Object.keys(PROP_DEFAULT_VALUES);

function getDefaultVal (type) {
  return PROP_DEFAULT_KEYS
    .filter(type => new RegExp(type).test(type + ''))
    .map(type => PROP_DEFAULT_VALUES[type])[0]
}

function getPropertyVal (options) {
  if (isPlainObject(options)) {
    if (hasOwn(options, 'value')) {
      return options.value
    }
    return getDefaultVal(options.type)
  }
  return getDefaultVal()
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
    observer && observe(observer, vm, value);
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
  const propsData = vm.$options.propsData || {};

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
        if (observer) {
          const oldVal = value;
          /* eslint-disable no-self-compare */
          if (newVal === value || (newVal !== newVal && value !== value)) {
            return
          }
          value = newVal;
          observe(observer, vm, newVal, oldVal);
        } else {
          value = newVal;
        }
      }
    });
  }
}

function updateProperties (vm) {
  const properties = vm.$options.mpOptions.properties;
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

  vm.setData = (data, callback) => {
    // TODO data path: array[0].text,object.text
    if (!isPlainObject(data)) {
      return
    }
    Object.keys(data).forEach(key => {
      vm.data[key] = data[key];
      if (!hasOwn(vm, key)) {
        proxy(vm, SOURCE_KEY, key);
      }
    });
    vm.$forceUpdate();
    isFn(callback) && vm.$nextTick(callback);
  };

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
    oldEmit.call(vm, eventName, {
      target,
      currentTarget: target,
      detail
    });
  };
  // 主要是Vant 自己封装了 $emit,放到 methods 中会触发 Vue 的警告,索性,框架直接重写该方法
  vm.$emit = (...args) => {
    vm.triggerEvent(...args);
  };
  vm.getRelationNodes = (relationKey) => {
    /* eslint-disable  no-mixed-operators */
    return vm._$relationNodes && vm._$relationNodes[relationKey] || []
  };
}

function initRelationHandlers (type, handler, target, ctx, handlerCtx) {
  if (!handler) {
    return
  }
  const name = `_$${type}Handlers`;
  (handlerCtx[name] || (handlerCtx[name] = [])).push(function () {
    handler.call(ctx, target);
  });
}

function initLinkedHandlers (relation, target, ctx, handlerCtx) {
  const type = 'linked';
  const name = relation.name;
  const relationNodes = ctx._$relationNodes || (ctx._$relationNodes = Object.create(null));
  (relationNodes[name] || (relationNodes[name] = [])).push(target);
  initRelationHandlers(type, relation[type], target, ctx, handlerCtx);
}

function initUnlinkedHandlers (relation, target, ctx, handlerCtx) {
  const type = 'unlinked';
  initRelationHandlers(type, relation[type], target, ctx, handlerCtx);
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
  // 先父后子
  initLinkedHandlers(parentRelation, vm, parentVm, vm);
  initLinkedHandlers(childRelation, parentVm, vm, vm);

  initUnlinkedHandlers(parentRelation, vm, parentVm, vm);
  initUnlinkedHandlers(childRelation, parentVm, vm, vm);
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
    initState(this);
    initMethods(this);
    initRelations(this);
  },
  created () {
    handleRelations(this, 'linked');
  },
  mounted () {
    handleObservers(this);
  },
  beforeUpdate () {
    updateProperties(this);
  },
  beforeDestroy () {
    handleRelations(this, 'unlinked');
  }
};

/**
 * wxs getRegExp
 */
function getRegExp () {
  const args = Array.prototype.slice.call(arguments);
  args.unshift(RegExp);
  return new (Function.prototype.bind.apply(RegExp, args))()
}

/**
 * wxs getDate
 */
function getDate () {
  const args = Array.prototype.slice.call(arguments);
  args.unshift(Date);
  return new (Function.prototype.bind.apply(Date, args))()
}

global['__wxRoute'] = '';
global['__wxComponents'] = Object.create(null);
global['__wxVueOptions'] = Object.create(null);

function Page (options) {
  const pageOptions = parsePage(options);
  pageOptions.mixins.unshift(polyfill);
  pageOptions.mpOptions.path = global['__wxRoute'];
  global['__wxComponents'][global['__wxRoute']] = pageOptions;
}

function Component (options) {
  const componentOptions = parseComponent(options);
  componentOptions.mixins.unshift(polyfill);
  componentOptions.mpOptions.path = global['__wxRoute'];
  global['__wxComponents'][global['__wxRoute']] = componentOptions;
}

function Behavior (options) {
  return options
}

export { Behavior, Component, Page, getDate, getRegExp };
