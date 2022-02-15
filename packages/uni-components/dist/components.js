import { createElementVNode, defineComponent, createVNode, mergeProps, getCurrentInstance, provide, watch, onUnmounted, shallowRef, reactive, watchEffect, ref, inject, onBeforeUnmount, computed, Text, isVNode, Fragment, onMounted } from "vue";
import { hasOwn, extend, isPlainObject } from "@vue/shared";
import { cacheStringFunction } from "@dcloudio/uni-shared";
const OPEN_TYPES = [
  "navigate",
  "redirect",
  "switchTab",
  "reLaunch",
  "navigateBack"
];
const navigatorProps = {
  hoverClass: {
    type: String,
    default: "navigator-hover"
  },
  url: {
    type: String,
    default: ""
  },
  openType: {
    type: String,
    default: "navigate",
    validator(value) {
      return Boolean(~OPEN_TYPES.indexOf(value));
    }
  },
  delta: {
    type: Number,
    default: 1
  },
  hoverStartTime: {
    type: [Number, String],
    default: 50
  },
  hoverStayTime: {
    type: [Number, String],
    default: 600
  },
  exists: {
    type: String,
    default: ""
  },
  hoverStopPropagation: {
    type: Boolean,
    default: false
  }
};
function createNavigatorOnClick(props) {
  return () => {
    if (props.openType !== "navigateBack" && !props.url) {
      console.error("<navigator/> should have url attribute when using navigateTo, redirectTo, reLaunch or switchTab");
      return;
    }
    switch (props.openType) {
      case "navigate":
        uni.navigateTo({
          url: props.url
        });
        break;
      case "redirect":
        uni.redirectTo({
          url: props.url,
          exists: props.exists
        });
        break;
      case "switchTab":
        uni.switchTab({
          url: props.url
        });
        break;
      case "reLaunch":
        uni.reLaunch({
          url: props.url
        });
        break;
      case "navigateBack":
        uni.navigateBack({
          delta: props.delta
        });
        break;
    }
  };
}
function useHoverClass(props) {
  if (props.hoverClass && props.hoverClass !== "none") {
    const hoverAttrs = { hoverClass: props.hoverClass };
    if (hasOwn(props, "hoverStartTime")) {
      hoverAttrs.hoverStartTime = props.hoverStartTime;
    }
    if (hasOwn(props, "hoverStayTime")) {
      hoverAttrs.hoverStayTime = props.hoverStayTime;
    }
    if (hasOwn(props, "hoverStopPropagation")) {
      hoverAttrs.hoverStopPropagation = props.hoverStopPropagation;
    }
    return hoverAttrs;
  }
  return {};
}
function createNVueTextVNode(text, attrs) {
  return createElementVNode("u-text", extend({ appendAsTree: true }, attrs), text);
}
const navigatorStyles = [{
  "navigator-hover": {
    backgroundColor: "rgba(0,0,0,0.1)",
    opacity: 0.7
  }
}];
var Navigator = defineComponent({
  name: "Navigator",
  props: navigatorProps,
  styles: navigatorStyles,
  setup(props, {
    slots
  }) {
    const onClick = createNavigatorOnClick(props);
    return () => {
      return createVNode("view", mergeProps(useHoverClass(props), {
        "onClick": onClick
      }), [slots.default && slots.default()]);
    };
  }
});
function PolySymbol(name) {
  return Symbol(process.env.NODE_ENV !== "production" ? "[uni-app]: " + name : name);
}
function useCurrentPageId() {
  return getCurrentInstance().root.proxy.$page.id;
}
const labelProps = {
  for: {
    type: String,
    default: ""
  }
};
const uniLabelKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniLabel" : "ul");
function useProvideLabel() {
  const handlers = [];
  provide(uniLabelKey, {
    addHandler(handler) {
      handlers.push(handler);
    },
    removeHandler(handler) {
      handlers.splice(handlers.indexOf(handler), 1);
    }
  });
  return handlers;
}
var Label = /* @__PURE__ */ defineComponent({
  name: "Label",
  props: labelProps,
  styles: [],
  setup(props, {
    slots
  }) {
    const pageId = useCurrentPageId();
    const handlers = useProvideLabel();
    const _onClick = ($event) => {
      const EventTarget = $event.target;
      const dataType = EventTarget.attr.dataUncType || "";
      let stopPropagation = /^uni-(checkbox|radio|switch)-/.test(dataType);
      if (!stopPropagation) {
        stopPropagation = /^uni-(checkbox|radio|switch|button)$/i.test(dataType);
      }
      if (stopPropagation) {
        return;
      }
      if (props.for) {
        UniViewJSBridge.emit(`uni-label-click-${pageId}-${props.for}`, $event, true);
      } else {
        handlers.length && handlers[0]($event, true);
      }
    };
    return () => createVNode("view", {
      "onClick": _onClick
    }, [slots.default && slots.default()]);
  }
});
function useListeners(props, listeners) {
  _addListeners(props.id, listeners);
  watch(() => props.id, (newId, oldId) => {
    _removeListeners(oldId, listeners, true);
    _addListeners(newId, listeners, true);
  });
  onUnmounted(() => {
    _removeListeners(props.id, listeners);
  });
}
function _addListeners(id, listeners, watch2) {
  const pageId = useCurrentPageId();
  if (watch2 && !id) {
    return;
  }
  if (!isPlainObject(listeners)) {
    return;
  }
  Object.keys(listeners).forEach((name) => {
    if (watch2) {
      if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) {
        UniViewJSBridge.on(`uni-${name}-${pageId}-${id}`, listeners[name]);
      }
    } else {
      if (name.indexOf("uni-") === 0) {
        UniViewJSBridge.on(name, listeners[name]);
      } else if (id) {
        UniViewJSBridge.on(`uni-${name}-${pageId}-${id}`, listeners[name]);
      }
    }
  });
}
function _removeListeners(id, listeners, watch2) {
  const pageId = useCurrentPageId();
  if (watch2 && !id) {
    return;
  }
  if (!isPlainObject(listeners)) {
    return;
  }
  Object.keys(listeners).forEach((name) => {
    if (watch2) {
      if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) {
        UniViewJSBridge.off(`uni-${name}-${pageId}-${id}`, listeners[name]);
      }
    } else {
      if (name.indexOf("uni-") === 0) {
        UniViewJSBridge.off(name, listeners[name]);
      } else if (id) {
        UniViewJSBridge.off(`uni-${name}-${pageId}-${id}`, listeners[name]);
      }
    }
  });
}
function entries(obj) {
  return Object.keys(obj).map((key) => [key, obj[key]]);
}
const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
const LISTENER_PREFIX = /^on[A-Z]+/;
const useAttrs = (params = {}) => {
  const { excludeListeners = false, excludeKeys = [] } = params;
  const instance = getCurrentInstance();
  const attrs = shallowRef({});
  const listeners = shallowRef({});
  const excludeAttrs = shallowRef({});
  const allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS);
  instance.attrs = reactive(instance.attrs);
  watchEffect(() => {
    const res = entries(instance.attrs).reduce((acc, [key, val]) => {
      if (allExcludeKeys.includes(key)) {
        acc.exclude[key] = val;
      } else if (LISTENER_PREFIX.test(key)) {
        if (!excludeListeners) {
          acc.attrs[key] = val;
        }
        acc.listeners[key] = val;
      } else {
        acc.attrs[key] = val;
      }
      return acc;
    }, {
      exclude: {},
      attrs: {},
      listeners: {}
    });
    attrs.value = res.attrs;
    listeners.value = res.listeners;
    excludeAttrs.value = res.exclude;
  });
  return { $attrs: attrs, $listeners: listeners, $excludeAttrs: excludeAttrs };
};
const buttonProps = {
  id: {
    type: String,
    default: ""
  },
  hoverClass: {
    type: String,
    default: "button-hover"
  },
  hoverStartTime: {
    type: [Number, String],
    default: 20
  },
  hoverStayTime: {
    type: [Number, String],
    default: 70
  },
  hoverStopPropagation: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: [Boolean, String],
    default: false
  },
  formType: {
    type: String,
    default: ""
  },
  openType: {
    type: String,
    default: ""
  },
  loading: {
    type: [Boolean, String],
    default: false
  },
  plain: {
    type: [Boolean, String],
    default: false
  }
};
const buttonStyle = [{
  ub: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingLeft: "5",
    paddingRight: "5",
    overflow: "hidden",
    color: "#000000",
    backgroundColor: "#f8f8f8",
    borderRadius: "5",
    borderStyle: "solid",
    borderWidth: "1",
    borderColor: "#dbdbdb"
  },
  "ub-t": {
    color: "#000000",
    fontSize: "18",
    textDecoration: "none",
    lineHeight: "46"
  },
  "ub-d": {
    backgroundColor: "#f8f8f8"
  },
  "ub-p": {
    backgroundColor: "#007aff",
    borderColor: "#0062cc"
  },
  "ub-w": {
    backgroundColor: "#e64340",
    borderColor: "#b83633"
  },
  "ub-d-t": {
    color: "#000000"
  },
  "ub-p-t": {
    color: "#ffffff"
  },
  "ub-w-t": {
    color: "#ffffff"
  },
  "ub-d-d": {
    backgroundColor: "#f7f7f7"
  },
  "ub-p-d": {
    backgroundColor: "#63acfc",
    borderColor: "#4f8aca"
  },
  "ub-w-d": {
    backgroundColor: "#ec8b89",
    borderColor: "#bd6f6e"
  },
  "ub-d-t-d": {
    color: "#cccccc"
  },
  "ub-p-t-d": {
    color: "rgba(255,255,255,0.6)"
  },
  "ub-w-t-d": {
    color: "rgba(255,255,255,0.6)"
  },
  "ub-d-plain": {
    borderColor: "#353535",
    backgroundColor: "rgba(0,0,0,0)"
  },
  "ub-p-plain": {
    borderColor: "#007aff",
    backgroundColor: "rgba(0,0,0,0)"
  },
  "ub-w-plain": {
    borderColor: "#e64340",
    backgroundColor: "rgba(0,0,0,0)"
  },
  "ub-d-t-plain": {
    color: "#353535"
  },
  "ub-p-t-plain": {
    color: "#007aff"
  },
  "ub-w-t-plain": {
    color: "#e64340"
  },
  "ub-d-d-plain": {
    borderColor: "#c6c6c6",
    backgroundColor: "rgba(0,0,0,0)"
  },
  "ub-p-d-plain": {
    borderColor: "#c6c6c6",
    backgroundColor: "rgba(0,0,0,0)"
  },
  "ub-w-d-plain": {
    borderColor: "#c6c6c6",
    backgroundColor: "rgba(0,0,0,0)"
  },
  "ub-d-t-d-plain": {
    color: "rgba(0,0,0,0.2)"
  },
  "ub-p-t-d-plain": {
    color: "rgba(0,0,0,0.2)"
  },
  "ub-w-t-d-plain": {
    color: "rgba(0,0,0,0.2)"
  },
  "ub-mini": {
    lineHeight: "30",
    fontSize: "13",
    paddingTop: 0,
    paddingRight: "17.5",
    paddingBottom: 0,
    paddingLeft: "17.5"
  },
  "ub-loading": {
    width: "18",
    height: "18",
    marginRight: "10"
  },
  "ub-d-loading": {
    color: "rgba(255,255,255,0.6)",
    backgroundColor: "rgba(0,0,0,0)"
  },
  "ub-p-loading": {
    color: "rgba(255,255,255,0.6)",
    backgroundColor: "rgba(0,0,0,0)"
  },
  "ub-w-loading": {
    color: "rgba(255,255,255,0.6)",
    backgroundColor: "rgba(0,0,0,0)"
  },
  "ub-d-loading-plain": {
    color: "#353535"
  },
  "ub-p-loading-plain": {
    color: "#007aff",
    backgroundColor: "#0062cc"
  },
  "ub-w-loading-plain": {
    color: "#e64340",
    backgroundColor: "rgba(0,0,0,0)"
  },
  "ub-d-hover": {
    opacity: 0.8,
    backgroundColor: "#dedede"
  },
  "ub-p-hover": {
    opacity: 0.8,
    backgroundColor: "#0062cc"
  },
  "ub-w-hover": {
    opacity: 0.8,
    backgroundColor: "#ce3c39"
  },
  "ub-d-t-hover": {
    color: "rgba(0,0,0,0.6)"
  },
  "ub-p-t-hover": {
    color: "rgba(255,255,255,0.6)"
  },
  "ub-w-t-hover": {
    color: "rgba(255,255,255,0.6)"
  },
  "ub-d-hover-plain": {
    color: "rgba(53,53,53,0.6)",
    borderColor: "rgba(53,53,53,0.6)",
    backgroundColor: "rgba(0,0,0,0)"
  },
  "ub-p-hover-plain": {
    color: "rgba(26,173,25,0.6)",
    borderColor: "rgba(0,122,255,0.6)",
    backgroundColor: "rgba(0,0,0,0)"
  },
  "ub-w-hover-plain": {
    color: "rgba(230,67,64,0.6)",
    borderColor: "rgba(230,67,64,0.6)",
    backgroundColor: "rgba(0,0,0,0)"
  }
}];
const TYPES = {
  default: "d",
  primary: "p",
  warn: "w"
};
var Button = defineComponent({
  inheritAttrs: false,
  name: "Button",
  props: extend(buttonProps, {
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: "default"
    }
  }),
  styles: buttonStyle,
  setup(props, {
    slots,
    attrs
  }) {
    const {
      $attrs,
      $excludeAttrs,
      $listeners
    } = useAttrs({
      excludeListeners: true
    });
    const type = props.type;
    const rootRef = ref(null);
    const onClick = (e2, isLabelClick) => {
      const _onClick = $listeners.value.onClick || (() => {
      });
      if (props.disabled) {
        return;
      }
      _onClick(e2);
    };
    const _getClass = (t2) => {
      let cl = "ub-" + TYPES[type] + t2;
      props.disabled && (cl += "-d");
      props.plain && (cl += "-plain");
      props.size === "mini" && t2 === "-t" && (cl += " ub-mini");
      return cl;
    };
    const _getHoverClass = (t2) => {
      if (props.disabled) {
        return "";
      }
      let cl = "ub-" + TYPES[type] + t2 + "-hover";
      props.plain && (cl += "-plain");
      return cl;
    };
    const uniLabel = inject(uniLabelKey, false);
    if (uniLabel) {
      uniLabel.addHandler(onClick);
      onBeforeUnmount(() => {
        uniLabel.removeHandler(onClick);
      });
    }
    useListeners(props, {
      "label-click": onClick
    });
    const _listeners = computed(() => {
      const obj = {};
      for (const eventName in $listeners.value) {
        const event = $listeners.value[eventName];
        if (eventName !== "onClick")
          obj[eventName] = event;
      }
      return obj;
    });
    const wrapSlots = () => {
      if (!slots.default)
        return [];
      const vnodes = slots.default();
      if (vnodes.length === 1 && vnodes[0].type === Text) {
        return [createNVueTextVNode(vnodes[0].children, {
          class: "ub-t " + _getClass("-t")
        })];
      }
      return vnodes;
    };
    return () => {
      const _attrs = extend({}, useHoverClass(props), {
        hoverClass: _getHoverClass("")
      }, $attrs.value, $excludeAttrs.value, _listeners.value);
      return createVNode("view", mergeProps({
        "ref": rootRef,
        "class": ["ub", _getClass("")],
        "onClick": onClick
      }, _attrs), [props.loading ? createVNode("loading-indicator", mergeProps({
        "class": ["ub-loading", `ub-${TYPES[type]}-loading`]
      }, {
        arrow: "false",
        animating: "true"
      }), null) : null, ...wrapSlots()]);
    };
  }
});
const movableAreaProps = {
  scaleArea: {
    type: Boolean,
    default: false
  }
};
function flatVNode(nodes) {
  const array = [];
  if (Array.isArray(nodes)) {
    nodes.forEach((vnode) => {
      if (isVNode(vnode)) {
        if (vnode.type === Fragment) {
          array.push(...flatVNode(vnode.children));
        } else {
          array.push(vnode);
        }
      } else if (Array.isArray(vnode)) {
        array.push(...flatVNode(vnode));
      }
    });
  }
  return array;
}
const getComponentSize = (el) => {
  const dom = weex.requireModule("dom");
  return new Promise((resolve) => {
    dom.getComponentRect(el, ({ size }) => {
      resolve(size);
    });
  });
};
var MovableArea = defineComponent({
  name: "MovableArea",
  props: movableAreaProps,
  styles: [{
    "uni-movable-area": {
      width: "10px",
      height: "10px"
    }
  }],
  setup(props, {
    slots
  }) {
    const width = ref(0);
    const height = ref(0);
    const top = ref(0);
    const left = ref(0);
    const _isMounted = ref(false);
    const rootRef = ref(null);
    const originMovableViewContexts = [];
    let touchMovableView = null;
    const setTouchMovableViewContext = (movableview) => {
      touchMovableView = movableview;
    };
    const _getWH = () => {
      return getComponentSize(rootRef.value).then(({
        width: _width,
        height: _height,
        top: _top,
        left: _left
      }) => {
        width.value = _width;
        height.value = _height;
        top.value = _top;
        left.value = _left;
      });
    };
    const _resize = () => {
      _getWH().then(() => {
        originMovableViewContexts.forEach(function(item) {
          item.setParent();
        });
      });
    };
    onMounted(() => {
      setTimeout(() => {
        _isMounted.value = true;
        _resize();
      }, 200);
    });
    const listeners = {
      onPanstart(e2) {
        touchMovableView && touchMovableView.touchstart(e2);
      },
      onPanmove(e2) {
        e2.stopPropagation();
        touchMovableView && touchMovableView.touchmove(e2);
      },
      onPanend(e2) {
        touchMovableView && touchMovableView.touchend(e2);
      }
    };
    const addMovableViewContext = (movableViewContext) => {
      originMovableViewContexts.push(movableViewContext);
    };
    const removeMovableViewContext = (movableViewContext) => {
      const index = originMovableViewContexts.indexOf(movableViewContext);
      if (index >= 0) {
        originMovableViewContexts.splice(index, 1);
      }
    };
    provide("_isMounted", _isMounted);
    provide("parentSize", {
      width,
      height,
      top,
      left
    });
    provide("addMovableViewContext", addMovableViewContext);
    provide("removeMovableViewContext", removeMovableViewContext);
    provide("setTouchMovableViewContext", setTouchMovableViewContext);
    return () => {
      const defaultSlots = slots.default && slots.default();
      const movableViewItems = flatVNode(defaultSlots);
      return createVNode("div", mergeProps({
        "ref": rootRef,
        "class": "uni-movable-area"
      }, listeners), [movableViewItems]);
    };
  }
});
function useTouchtrack(method) {
  const __event = {};
  function callback(type, $event) {
    if (__event[type]) {
      __event[type]($event);
    }
  }
  function addListener(type, callback2) {
    __event[type] = function($event) {
      if (typeof callback2 === "function") {
        $event.touches = $event.changedTouches;
        if (callback2($event) === false) {
          $event.stopPropagation();
        }
      }
    };
  }
  let x0 = 0;
  let y0 = 0;
  let x1 = 0;
  let y1 = 0;
  const fn = function($event, state, x, y) {
    if (method({
      target: $event.target,
      currentTarget: $event.currentTarget,
      stopPropagation: $event.stopPropagation.bind($event),
      touches: $event.touches,
      changedTouches: $event.changedTouches,
      detail: {
        state,
        x,
        y,
        dx: x - x0,
        dy: y - y0,
        ddx: x - x1,
        ddy: y - y1,
        timeStamp: $event.timeStamp || Date.now()
      }
    }) === false) {
      return false;
    }
  };
  let $eventOld = null;
  addListener("touchstart", function($event) {
    if (!$eventOld) {
      $eventOld = $event;
      x0 = x1 = $event.touches[0].pageX;
      y0 = y1 = $event.touches[0].pageY;
      return fn($event, "start", x0, y0);
    }
  });
  addListener("touchmove", function($event) {
    if ($eventOld) {
      const res = fn($event, "move", $event.touches[0].pageX, $event.touches[0].pageY);
      x1 = $event.touches[0].pageX;
      y1 = $event.touches[0].pageY;
      return res;
    }
  });
  addListener("touchend", function($event) {
    if ($eventOld) {
      $eventOld = null;
      return fn($event, "end", $event.changedTouches[0].pageX, $event.changedTouches[0].pageY);
    }
  });
  return {
    touchstart: function($event) {
      callback("touchstart", $event);
    },
    touchmove: function($event) {
      callback("touchmove", $event);
    },
    touchend: function($event) {
      callback("touchend", $event);
    }
  };
}
function useCustomEvent(ref2, emit) {
  return (name, detail) => {
    if (ref2.value) {
      emit(name, normalizeCustomEvent(name, ref2.value, detail || {}));
    }
  };
}
function normalizeCustomEvent(name, target, detail = {}) {
  target = processTarget(target);
  return {
    type: name,
    timeStamp: Date.now(),
    target,
    currentTarget: target,
    detail
  };
}
const firstLetterToLowerCase = cacheStringFunction((str) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
});
function processTarget(weexTarget) {
  const { offsetLeft, offsetTop } = weexTarget;
  const attr = weexTarget.attr;
  const dataset = {};
  Object.keys(attr || {}).forEach((key) => {
    if (key.indexOf("data") === 0) {
      dataset[firstLetterToLowerCase(key.replace("data", ""))] = attr[key];
    }
  });
  return {
    id: attr && attr.id || "",
    dataset,
    offsetLeft: offsetLeft || 0,
    offsetTop: offsetTop || 0
  };
}
function e(e2, t2, n) {
  return e2 > t2 - n && e2 < t2 + n;
}
function t(t2, n) {
  return e(t2, 0, n);
}
function Decline() {
}
Decline.prototype.x = function(e2) {
  return Math.sqrt(e2);
};
function Friction(e2, t2) {
  this._m = e2;
  this._f = 1e3 * t2;
  this._startTime = 0;
  this._v = 0;
}
Friction.prototype.setV = function(x, y) {
  const n = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
  this._x_v = x;
  this._y_v = y;
  this._x_a = -this._f * this._x_v / n;
  this._y_a = -this._f * this._y_v / n;
  this._t = Math.abs(x / this._x_a) || Math.abs(y / this._y_a);
  this._lastDt = null;
  this._startTime = new Date().getTime();
};
Friction.prototype.setS = function(x, y) {
  this._x_s = x;
  this._y_s = y;
};
Friction.prototype.s = function(t2) {
  if (t2 === void 0) {
    t2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  if (t2 > this._t) {
    t2 = this._t;
    this._lastDt = t2;
  }
  let x = this._x_v * t2 + 0.5 * this._x_a * Math.pow(t2, 2) + this._x_s;
  let y = this._y_v * t2 + 0.5 * this._y_a * Math.pow(t2, 2) + this._y_s;
  if (this._x_a > 0 && x < this._endPositionX || this._x_a < 0 && x > this._endPositionX) {
    x = this._endPositionX;
  }
  if (this._y_a > 0 && y < this._endPositionY || this._y_a < 0 && y > this._endPositionY) {
    y = this._endPositionY;
  }
  return {
    x,
    y
  };
};
Friction.prototype.ds = function(t2) {
  if (t2 === void 0) {
    t2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  if (t2 > this._t) {
    t2 = this._t;
  }
  return {
    dx: this._x_v + this._x_a * t2,
    dy: this._y_v + this._y_a * t2
  };
};
Friction.prototype.delta = function() {
  return {
    x: -1.5 * Math.pow(this._x_v, 2) / this._x_a || 0,
    y: -1.5 * Math.pow(this._y_v, 2) / this._y_a || 0
  };
};
Friction.prototype.dt = function() {
  return -this._x_v / this._x_a;
};
Friction.prototype.done = function() {
  const t2 = e(this.s().x, this._endPositionX) || e(this.s().y, this._endPositionY) || this._lastDt === this._t;
  this._lastDt = null;
  return t2;
};
Friction.prototype.setEnd = function(x, y) {
  this._endPositionX = x;
  this._endPositionY = y;
};
Friction.prototype.reconfigure = function(m, f) {
  this._m = m;
  this._f = 1e3 * f;
};
function Spring(m, k, c) {
  this._m = m;
  this._k = k;
  this._c = c;
  this._solution = null;
  this._endPosition = 0;
  this._startTime = 0;
}
Spring.prototype._solve = function(e2, t2) {
  const n = this._c;
  const i = this._m;
  const r = this._k;
  const o = n * n - 4 * i * r;
  if (o === 0) {
    const a = -n / (2 * i);
    const s = e2;
    const l = t2 / (a * e2);
    return {
      x: function(e3) {
        return (s + l * e3) * Math.pow(Math.E, a * e3);
      },
      dx: function(e3) {
        const t3 = Math.pow(Math.E, a * e3);
        return a * (s + l * e3) * t3 + l * t3;
      }
    };
  }
  if (o > 0) {
    const c = (-n - Math.sqrt(o)) / (2 * i);
    const u = (-n + Math.sqrt(o)) / (2 * i);
    const d = (t2 - c * e2) / (u - c);
    const h = e2 - d;
    return {
      x: function(e3) {
        let t3;
        let n2;
        if (e3 === this._t) {
          t3 = this._powER1T;
          n2 = this._powER2T;
        }
        this._t = e3;
        if (!t3) {
          t3 = this._powER1T = Math.pow(Math.E, c * e3);
        }
        if (!n2) {
          n2 = this._powER2T = Math.pow(Math.E, u * e3);
        }
        return h * t3 + d * n2;
      },
      dx: function(e3) {
        let t3;
        let n2;
        if (e3 === this._t) {
          t3 = this._powER1T;
          n2 = this._powER2T;
        }
        this._t = e3;
        if (!t3) {
          t3 = this._powER1T = Math.pow(Math.E, c * e3);
        }
        if (!n2) {
          n2 = this._powER2T = Math.pow(Math.E, u * e3);
        }
        return h * c * t3 + d * u * n2;
      }
    };
  }
  const p = Math.sqrt(4 * i * r - n * n) / (2 * i);
  const f = -n / 2 * i;
  const v2 = e2;
  const g2 = (t2 - f * e2) / p;
  return {
    x: function(e3) {
      return Math.pow(Math.E, f * e3) * (v2 * Math.cos(p * e3) + g2 * Math.sin(p * e3));
    },
    dx: function(e3) {
      const t3 = Math.pow(Math.E, f * e3);
      const n2 = Math.cos(p * e3);
      const i2 = Math.sin(p * e3);
      return t3 * (g2 * p * n2 - v2 * p * i2) + f * t3 * (g2 * i2 + v2 * n2);
    }
  };
};
Spring.prototype.x = function(e2) {
  if (e2 === void 0) {
    e2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  return this._solution ? this._endPosition + this._solution.x(e2) : 0;
};
Spring.prototype.dx = function(e2) {
  if (e2 === void 0) {
    e2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  return this._solution ? this._solution.dx(e2) : 0;
};
Spring.prototype.setEnd = function(e2, n, i) {
  if (!i) {
    i = new Date().getTime();
  }
  if (e2 !== this._endPosition || !t(n, 0.1)) {
    n = n || 0;
    let r = this._endPosition;
    if (this._solution) {
      if (t(n, 0.1)) {
        n = this._solution.dx((i - this._startTime) / 1e3);
      }
      r = this._solution.x((i - this._startTime) / 1e3);
      if (t(n, 0.1)) {
        n = 0;
      }
      if (t(r, 0.1)) {
        r = 0;
      }
      r += this._endPosition;
    }
    if (!(this._solution && t(r - e2, 0.1) && t(n, 0.1))) {
      this._endPosition = e2;
      this._solution = this._solve(r - this._endPosition, n);
      this._startTime = i;
    }
  }
};
Spring.prototype.snap = function(e2) {
  this._startTime = new Date().getTime();
  this._endPosition = e2;
  this._solution = {
    x: function() {
      return 0;
    },
    dx: function() {
      return 0;
    }
  };
};
Spring.prototype.done = function(n) {
  if (!n) {
    n = new Date().getTime();
  }
  return e(this.x(), this._endPosition, 0.1) && t(this.dx(), 0.1);
};
Spring.prototype.reconfigure = function(m, t2, c) {
  this._m = m;
  this._k = t2;
  this._c = c;
  if (!this.done()) {
    this._solution = this._solve(this.x() - this._endPosition, this.dx());
    this._startTime = new Date().getTime();
  }
};
Spring.prototype.springConstant = function() {
  return this._k;
};
Spring.prototype.damping = function() {
  return this._c;
};
Spring.prototype.configuration = function() {
  function e2(e3, t3) {
    e3.reconfigure(1, t3, e3.damping());
  }
  function t2(e3, t3) {
    e3.reconfigure(1, e3.springConstant(), t3);
  }
  return [
    {
      label: "Spring Constant",
      read: this.springConstant.bind(this),
      write: e2.bind(this, this),
      min: 100,
      max: 1e3
    },
    {
      label: "Damping",
      read: this.damping.bind(this),
      write: t2.bind(this, this),
      min: 1,
      max: 500
    }
  ];
};
function STD(e2, t2, n) {
  this._springX = new Spring(e2, t2, n);
  this._springY = new Spring(e2, t2, n);
  this._springScale = new Spring(e2, t2, n);
  this._startTime = 0;
}
STD.prototype.setEnd = function(e2, t2, n, i) {
  const r = new Date().getTime();
  this._springX.setEnd(e2, i, r);
  this._springY.setEnd(t2, i, r);
  this._springScale.setEnd(n, i, r);
  this._startTime = r;
};
STD.prototype.x = function() {
  const e2 = (new Date().getTime() - this._startTime) / 1e3;
  return {
    x: this._springX.x(e2),
    y: this._springY.x(e2),
    scale: this._springScale.x(e2)
  };
};
STD.prototype.done = function() {
  const e2 = new Date().getTime();
  return this._springX.done(e2) && this._springY.done(e2) && this._springScale.done(e2);
};
STD.prototype.reconfigure = function(e2, t2, n) {
  this._springX.reconfigure(e2, t2, n);
  this._springY.reconfigure(e2, t2, n);
  this._springScale.reconfigure(e2, t2, n);
};
const movableViewProps = {
  direction: {
    type: String,
    default: "none"
  },
  inertia: {
    type: [Boolean, String],
    default: false
  },
  outOfBounds: {
    type: [Boolean, String],
    default: false
  },
  x: {
    type: [Number, String],
    default: 0
  },
  y: {
    type: [Number, String],
    default: 0
  },
  damping: {
    type: [Number, String],
    default: 20
  },
  friction: {
    type: [Number, String],
    default: 2
  },
  disabled: {
    type: [Boolean, String],
    default: false
  },
  scale: {
    type: [Boolean, String],
    default: false
  },
  scaleMin: {
    type: [Number, String],
    default: 0.5
  },
  scaleMax: {
    type: [Number, String],
    default: 10
  },
  scaleValue: {
    type: [Number, String],
    default: 1
  },
  animation: {
    type: [Boolean, String],
    default: true
  }
};
function v(a, b) {
  return +((1e3 * a - 1e3 * b) / 1e3).toFixed(1);
}
function g(friction, execute, endCallback) {
  let record = {
    id: 0,
    cancelled: false
  };
  let cancel = function(record2) {
    if (record2 && record2.id) {
      cancelAnimationFrame(record2.id);
    }
    if (record2) {
      record2.cancelled = true;
    }
  };
  function fn(record2, friction2, execute2, endCallback2) {
    if (!record2 || !record2.cancelled) {
      execute2(friction2);
      let isDone = friction2.done();
      if (!isDone) {
        if (!record2.cancelled) {
          record2.id = requestAnimationFrame(fn.bind(null, record2, friction2, execute2, endCallback2));
        }
      }
      if (isDone && endCallback2) {
        endCallback2(friction2);
      }
    }
  }
  fn(record, friction, execute, endCallback);
  return {
    cancel: cancel.bind(null, record),
    model: friction
  };
}
let requesting = false;
function _requestAnimationFrame(e2) {
  if (!requesting) {
    requesting = true;
    requestAnimationFrame(function() {
      e2();
      requesting = false;
    });
  }
}
function requestAnimationFrame(callback) {
  return setTimeout(callback, 16);
}
function cancelAnimationFrame(id) {
  clearTimeout(id);
}
const animation = weex.requireModule("animation");
var MovableView = defineComponent({
  name: "MovableView",
  props: movableViewProps,
  emits: ["change", "scale"],
  styles: [{
    "uni-movable-view": {
      position: "absolute",
      top: "0px",
      left: "0px",
      width: "10px",
      height: "10px"
    }
  }],
  setup(props, {
    emit,
    slots
  }) {
    const rootRef = ref(null);
    const trigger = useCustomEvent(rootRef, emit);
    const setTouchMovableViewContext = inject("setTouchMovableViewContext", () => {
    });
    const touchStart = useMovableViewState(props, trigger, rootRef, setTouchMovableViewContext);
    return () => {
      const attrs = {
        preventGesture: true
      };
      return createVNode("view", mergeProps({
        "ref": rootRef,
        "onTouchstart": touchStart,
        "class": "uni-movable-view",
        "style": "transform-origin: center;"
      }, attrs), [slots.default && slots.default()]);
    };
  }
});
function useMovableViewState(props, trigger, rootRef, setTouchMovableViewContext) {
  const _isMounted = inject("_isMounted", ref(false));
  const parentSize = inject("parentSize", {
    width: ref(0),
    height: ref(0),
    top: ref(0),
    left: ref(0)
  });
  const addMovableViewContext = inject("addMovableViewContext", () => {
  });
  const removeMovableViewContext = inject("removeMovableViewContext", () => {
  });
  let movableViewContext = {
    touchstart: () => {
    },
    touchmove: () => {
    },
    touchend: () => {
    }
  };
  function _getPx(val) {
    return Number(val) || 0;
  }
  function _getScaleNumber(val) {
    val = Number(val);
    return isNaN(val) ? 1 : val;
  }
  const xSync = ref(_getPx(props.x));
  const ySync = ref(_getPx(props.y));
  const scaleValueSync = ref(_getScaleNumber(Number(props.scaleValue)));
  const width = ref(0);
  const height = ref(0);
  const minX = ref(0);
  const minY = ref(0);
  const maxX = ref(0);
  const maxY = ref(0);
  let _SFA = null;
  let _FA = null;
  const _offset = {
    x: 0,
    y: 0
  };
  const _scaleOffset = {
    x: 0,
    y: 0
  };
  let _scale = 1;
  let _translateX = 0;
  let _translateY = 0;
  let _isTouching = false;
  let __baseX;
  let __baseY;
  let _checkCanMove = null;
  let _firstMoveDirection = null;
  let _rect = {
    top: 0,
    left: 0,
    width: 0,
    height: 0
  };
  const _declineX = new Decline();
  const _declineY = new Decline();
  const __touchInfo = {
    historyX: [0, 0],
    historyY: [0, 0],
    historyT: [0, 0]
  };
  const dampingNumber = computed(() => {
    let val = Number(props.damping);
    return isNaN(val) ? 20 : val;
  });
  const frictionNumber = computed(() => {
    let val = Number(props.friction);
    return isNaN(val) || val <= 0 ? 2 : val;
  });
  const scaleMinNumber = computed(() => {
    let val = Number(props.scaleMin);
    return isNaN(val) ? 0.5 : val;
  });
  const scaleMaxNumber = computed(() => {
    let val = Number(props.scaleMax);
    return isNaN(val) ? 10 : val;
  });
  const xMove = computed(() => props.direction === "all" || props.direction === "horizontal");
  const yMove = computed(() => props.direction === "all" || props.direction === "vertical");
  const _STD = new STD(1, 9 * Math.pow(dampingNumber.value, 2) / 40, dampingNumber.value);
  const _friction = new Friction(1, frictionNumber.value);
  watch(() => props.x, (val) => {
    xSync.value = _getPx(val);
  });
  watch(() => props.y, (val) => {
    ySync.value = _getPx(val);
  });
  watch(() => props.scaleValue, (val) => {
    scaleValueSync.value = _getScaleNumber(Number(val));
  });
  watch(xSync, _setX);
  watch(ySync, _setY);
  watch(scaleValueSync, _setScaleValue);
  watch(scaleMinNumber, _setScaleMinOrMax);
  watch(scaleMaxNumber, _setScaleMinOrMax);
  function FAandSFACancel() {
    if (_FA) {
      _FA.cancel();
    }
    if (_SFA) {
      _SFA.cancel();
    }
  }
  function _setX(val) {
    if (xMove.value) {
      if (val + _scaleOffset.x === _translateX) {
        return _translateX;
      } else {
        if (_SFA) {
          _SFA.cancel();
        }
        _animationTo(val + _scaleOffset.x, ySync.value + _scaleOffset.y, _scale);
      }
    }
    return val;
  }
  function _setY(val) {
    if (yMove.value) {
      if (val + _scaleOffset.y === _translateY) {
        return _translateY;
      } else {
        if (_SFA) {
          _SFA.cancel();
        }
        _animationTo(xSync.value + _scaleOffset.x, val + _scaleOffset.y, _scale);
      }
    }
    return val;
  }
  function _setScaleMinOrMax() {
    if (!props.scale) {
      return false;
    }
    _updateScale(_scale, true);
  }
  function _setScaleValue(scale) {
    if (!props.scale) {
      return false;
    }
    scale = _adjustScale(scale);
    _updateScale(scale, true);
    return scale;
  }
  function __handleTouchStart() {
    {
      if (!props.disabled) {
        FAandSFACancel();
        __touchInfo.historyX = [0, 0];
        __touchInfo.historyY = [0, 0];
        __touchInfo.historyT = [0, 0];
        if (xMove.value) {
          __baseX = _translateX;
        }
        if (yMove.value) {
          __baseY = _translateY;
        }
        _checkCanMove = null;
        _firstMoveDirection = null;
        _isTouching = true;
      }
    }
  }
  function __handleTouchMove(event) {
    if (!props.disabled && _isTouching) {
      let x = _translateX;
      let y = _translateY;
      if (_firstMoveDirection === null) {
        _firstMoveDirection = Math.abs(event.detail.dx / event.detail.dy) > 1 ? "htouchmove" : "vtouchmove";
      }
      if (xMove.value) {
        x = event.detail.dx + __baseX;
        __touchInfo.historyX.shift();
        __touchInfo.historyX.push(x);
        if (!yMove.value && _checkCanMove === null) {
          _checkCanMove = Math.abs(event.detail.dx / event.detail.dy) < 1;
        }
      }
      if (yMove.value) {
        y = event.detail.dy + __baseY;
        __touchInfo.historyY.shift();
        __touchInfo.historyY.push(y);
        if (!xMove.value && _checkCanMove === null) {
          _checkCanMove = Math.abs(event.detail.dy / event.detail.dx) < 1;
        }
      }
      __touchInfo.historyT.shift();
      __touchInfo.historyT.push(event.detail.timeStamp);
      if (!_checkCanMove) {
        let source = "touch";
        if (x < minX.value) {
          if (props.outOfBounds) {
            source = "touch-out-of-bounds";
            x = minX.value - _declineX.x(minX.value - x);
          } else {
            x = minX.value;
          }
        } else if (x > maxX.value) {
          if (props.outOfBounds) {
            source = "touch-out-of-bounds";
            x = maxX.value + _declineX.x(x - maxX.value);
          } else {
            x = maxX.value;
          }
        }
        if (y < minY.value) {
          if (props.outOfBounds) {
            source = "touch-out-of-bounds";
            y = minY.value - _declineY.x(minY.value - y);
          } else {
            y = minY.value;
          }
        } else {
          if (y > maxY.value) {
            if (props.outOfBounds) {
              source = "touch-out-of-bounds";
              y = maxY.value + _declineY.x(y - maxY.value);
            } else {
              y = maxY.value;
            }
          }
        }
        _requestAnimationFrame(function() {
          _setTransform(x, y, _scale, source);
        });
      }
    }
  }
  function __handleTouchEnd() {
    if (!props.disabled && _isTouching) {
      _isTouching = false;
      if (!_checkCanMove && !_revise("out-of-bounds") && props.inertia) {
        const xv = 1e3 * (__touchInfo.historyX[1] - __touchInfo.historyX[0]) / (__touchInfo.historyT[1] - __touchInfo.historyT[0]);
        const yv = 1e3 * (__touchInfo.historyY[1] - __touchInfo.historyY[0]) / (__touchInfo.historyT[1] - __touchInfo.historyT[0]);
        _friction.setV(xv, yv);
        _friction.setS(_translateX, _translateY);
        const x0 = _friction.delta().x;
        const y0 = _friction.delta().y;
        let x = x0 + _translateX;
        let y = y0 + _translateY;
        if (x < minX.value) {
          x = minX.value;
          y = _translateY + (minX.value - _translateX) * y0 / x0;
        } else {
          if (x > maxX.value) {
            x = maxX.value;
            y = _translateY + (maxX.value - _translateX) * y0 / x0;
          }
        }
        if (y < minY.value) {
          y = minY.value;
          x = _translateX + (minY.value - _translateY) * x0 / y0;
        } else {
          if (y > maxY.value) {
            y = maxY.value;
            x = _translateX + (maxY.value - _translateY) * x0 / y0;
          }
        }
        _friction.setEnd(x, y);
        _FA = g(_friction, function() {
          let t2 = _friction.s();
          let x2 = t2.x;
          let y2 = t2.y;
          _setTransform(x2, y2, _scale, "friction");
        }, function() {
          _FA.cancel();
        });
      }
    }
  }
  function _getLimitXY(x, y) {
    let outOfBounds = false;
    if (x > maxX.value) {
      x = maxX.value;
      outOfBounds = true;
    } else {
      if (x < minX.value) {
        x = minX.value;
        outOfBounds = true;
      }
    }
    if (y > maxY.value) {
      y = maxY.value;
      outOfBounds = true;
    } else {
      if (y < minY.value) {
        y = minY.value;
        outOfBounds = true;
      }
    }
    return {
      x,
      y,
      outOfBounds
    };
  }
  function _updateOffset() {
    _offset.x = _rect.left - parentSize.left.value;
    _offset.y = _rect.top - parentSize.top.value;
  }
  function _updateWH(scale) {
    scale = scale || _scale;
    scale = _adjustScale(scale);
    height.value = _rect.height / _scale;
    width.value = _rect.width / _scale;
    let _height = height.value * scale;
    let _width = width.value * scale;
    _scaleOffset.x = (_width - width.value) / 2;
    _scaleOffset.y = (_height - height.value) / 2;
  }
  function _updateBoundary() {
    let x = 0 - _offset.x + _scaleOffset.x;
    let _width = parentSize.width.value - width.value - _offset.x - _scaleOffset.x;
    minX.value = Math.min(x, _width);
    maxX.value = Math.max(x, _width);
    let y = 0 - _offset.y + _scaleOffset.y;
    let _height = parentSize.height.value - height.value - _offset.y - _scaleOffset.y;
    minY.value = Math.min(y, _height);
    maxY.value = Math.max(y, _height);
  }
  function _updateScale(scale, animat) {
    if (props.scale) {
      scale = _adjustScale(scale);
      _updateWH(scale);
      _updateBoundary();
      const limitXY = _getLimitXY(_translateX, _translateY);
      const x = limitXY.x;
      const y = limitXY.y;
      if (animat) {
        _animationTo(x, y, scale, "", true, true);
      } else {
        _requestAnimationFrame(function() {
          _setTransform(x, y, scale, "", true, true);
        });
      }
    }
  }
  function _adjustScale(scale) {
    scale = Math.max(0.5, scaleMinNumber.value, scale);
    scale = Math.min(10, scaleMaxNumber.value, scale);
    return scale;
  }
  function _animationTo(x, y, scale, source, r, o) {
    FAandSFACancel();
    if (!xMove.value) {
      x = _translateX;
    }
    if (!yMove.value) {
      y = _translateY;
    }
    if (!props.scale) {
      scale = _scale;
    }
    let limitXY = _getLimitXY(x, y);
    x = limitXY.x;
    y = limitXY.y;
    if (!props.animation) {
      _setTransform(x, y, scale, source, r, o);
      return;
    }
    _STD._springX._solution = null;
    _STD._springY._solution = null;
    _STD._springScale._solution = null;
    _STD._springX._endPosition = _translateX;
    _STD._springY._endPosition = _translateY;
    _STD._springScale._endPosition = _scale;
    _STD.setEnd(x, y, scale, 1);
    _SFA = g(_STD, function() {
      let data = _STD.x();
      let x2 = data.x;
      let y2 = data.y;
      let scale2 = data.scale;
      _setTransform(x2, y2, scale2, source, r, o);
    }, function() {
      _SFA.cancel();
    });
  }
  function _revise(source) {
    let limitXY = _getLimitXY(_translateX, _translateY);
    let x = limitXY.x;
    let y = limitXY.y;
    let outOfBounds = limitXY.outOfBounds;
    if (outOfBounds) {
      _animationTo(x, y, _scale, source);
    }
    return outOfBounds;
  }
  function _setTransform(x, y, scale, source = "", r, o) {
    if (!(x !== null && x.toString() !== "NaN" && typeof x === "number")) {
      x = _translateX || 0;
    }
    if (!(y !== null && y.toString() !== "NaN" && typeof y === "number")) {
      y = _translateY || 0;
    }
    x = Number(x.toFixed(1));
    y = Number(y.toFixed(1));
    scale = Number(scale.toFixed(1));
    if (!(_translateX === x && _translateY === y)) {
      if (!r) {
        trigger("change", {
          x: v(x, _scaleOffset.x),
          y: v(y, _scaleOffset.y),
          source
        });
      }
    }
    if (!props.scale) {
      scale = _scale;
    }
    scale = _adjustScale(scale);
    scale = +scale.toFixed(3);
    if (o && scale !== _scale) {
      trigger("scale", {
        x,
        y,
        scale
      });
    }
    const transform = `translate(${x}px, ${y}px) scale(${scale})`;
    animation.transition(rootRef.value, {
      styles: {
        transform
      },
      duration: 0,
      delay: 0
    });
    _translateX = x;
    _translateY = y;
    _scale = scale;
  }
  function _updateRect() {
    return getComponentSize(rootRef.value).then((rect) => {
      _rect = rect;
    });
  }
  function setParent() {
    if (!_isMounted.value) {
      return;
    }
    FAandSFACancel();
    let scale = props.scale ? scaleValueSync.value : 1;
    _updateOffset();
    _updateWH(scale);
    _updateBoundary();
    _translateX = xSync.value + _scaleOffset.x;
    _translateY = ySync.value + _scaleOffset.y;
    let limitXY = _getLimitXY(_translateX, _translateY);
    let x = limitXY.x;
    let y = limitXY.y;
    _setTransform(x, y, scale, "", true);
  }
  onMounted(() => {
    movableViewContext = useTouchtrack((event) => {
      switch (event.detail.state) {
        case "start":
          __handleTouchStart();
          break;
        case "move":
          __handleTouchMove(event);
          break;
        case "end":
          __handleTouchEnd();
      }
    });
    setTimeout(() => {
      _updateRect().then(() => {
        setParent();
      });
    }, 100);
    _friction.reconfigure(1, frictionNumber.value);
    _STD.reconfigure(1, 9 * Math.pow(dampingNumber.value, 2) / 40, dampingNumber.value);
    const context = {
      setParent
    };
    addMovableViewContext(context);
    onUnmounted(() => {
      removeMovableViewContext(context);
    });
  });
  onUnmounted(() => {
    FAandSFACancel();
  });
  const touchStart = () => {
    setTouchMovableViewContext(movableViewContext);
  };
  return touchStart;
}
var components = {
  Navigator,
  Label,
  Button,
  MovableArea,
  MovableView
};
export { components as default };
