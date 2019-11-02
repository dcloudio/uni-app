function parseData (data, vueComponentOptions) {
  if (!data) {
    return
  }
  const dataJson = JSON.stringify(data);
  vueComponentOptions.data = function () {
    return JSON.parse(dataJson)
  };
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

function parseProperty (name, property, watch) {
  if (!isPlainObject(property)) {
    property = {
      type: property
    };
  }
  const type = [property.type];
  if (Array.isArray(property.optionalTypes)) {
    type.push(...property.optionalTypes);
  }
  const prop = Object.create(null);
  prop.type = type;
  if (hasOwn(property, 'value')) {
    prop['default'] = property.value;
  }
  if (hasOwn(property, 'observer')) {
    watch[name] = property.observer;
  }
  return prop
}

function parseProperties (properties, vueComponentOptions) {
  if (!properties) {
    return
  }
  const props = Object.create(null);
  const {
    watch
  } = vueComponentOptions;
  Object.keys(properties).forEach(name => {
    props[name] = parseProperty(name, properties[name], watch);
  });
  vueComponentOptions.props = props;
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
  vueComponentOptions.methods = methods;
}

const LIFECYCLE = {
  'created': 'created',
  'attached': 'created',
  'ready': 'mounted',
  'moved': 'moved',
  'detached': 'destroyed'
};
const LIFECYCLE_KEYS = Object.keys(LIFECYCLE);

function parseLifecycle (mpComponentOptions, vueComponentOptions) {
  Object.keys(LIFECYCLE_KEYS).forEach(name => {
    if (hasOwn(mpComponentOptions, name)) {
      vueComponentOptions[LIFECYCLE[name]] = mpComponentOptions[name];
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

function parseBehaviors (behaviors, vueComponentOptions) {
  if (!behaviors) {
    return
  }
  behaviors.forEach(behavior => {
    if (typeof behavior === 'string') {
      (vueComponentOptions.behaviors || (vueComponentOptions.behaviors = [])).push(behavior);
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

function parseRelations (relations, vueComponentOptions) {
  if (!relations) {
    return
  }
  vueComponentOptions.mpOptions.relations = relations;
}

function parseExternalClasses (externalClasses, vueComponentOptions) {
  if (!externalClasses) {
    return
  }
  vueComponentOptions.mpOptions.externalClasses = externalClasses;
}

function parseLifetimes (lifetimes, vueComponentOptions) {
  if (!lifetimes) {
    return
  }
  parseLifecycle(lifetimes, vueComponentOptions);
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
    watch: {},
    mpOptions: {
      mpObservers: []
    }
  };

  parseData(data, vueComponentOptions);
  parseOptions(options, vueComponentOptions);
  parseMethods(methods, vueComponentOptions);
  parseBehaviors(behaviors, vueComponentOptions);
  parseLifetimes(lifetimes, vueComponentOptions);
  parseObservers(observers, vueComponentOptions);
  parseRelations(relations, vueComponentOptions);
  parseProperties(properties, vueComponentOptions);
  parseExternalClasses(externalClasses, vueComponentOptions);

  parseLifecycle(mpComponentOptions, vueComponentOptions);
  parseDefinitionFilter(mpComponentOptions);

  return vueComponentOptions
}

var polyfill = {
  beforeCreate () {
    // TODO 先简单处理
    this.data = this;

    this.setData = (data, callback) => {
      // TODO data path: array[0].text,object.text
      Object.keys(data).forEach(name => {
        this[name] = data[name];
      });
    };

    const oldEmit = this.$emit;
    this.triggerEvent = (eventName, detail, options) => {
      oldEmit.call(this, eventName, {
        detail
      });
    };
  }
};

function Component (options) {
  const componentOptions = parseComponent(options);
  componentOptions.mixins.unshift(polyfill);
  global['__wxComponents'][global['__wxRoute']] = componentOptions;
}

function Behavior (options) {
  return options
}

export { Behavior, Component };
