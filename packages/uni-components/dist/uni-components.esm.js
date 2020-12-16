import {isPlainObject, isFunction, hasOwn, hyphenate} from "@vue/shared";
import {plusReady, debounce} from "@dcloudio/uni-shared";
import {openBlock, createBlock, mergeProps, createVNode, toDisplayString, resolveComponent, toHandlers, renderSlot, createCommentVNode, withModifiers, withDirectives, vShow, vModelDynamic, Fragment, renderList, vModelText} from "vue";
function broadcast(componentName, eventName, ...params) {
  const children = this.$children;
  const len = children.length;
  for (let i2 = 0; i2 < len; i2++) {
    const child = children[i2];
    const name = child.$options.name && child.$options.name.substr(4);
    if (~componentName.indexOf(name)) {
      child.$emit.apply(child, [eventName].concat(params));
      return false;
    } else {
      if (broadcast.apply(child, [componentName, eventName].concat([params])) === false) {
        return false;
      }
    }
  }
}
var emitter = {
  methods: {
    $dispatch(componentName, eventName, ...params) {
      if (typeof componentName === "string") {
        componentName = [componentName];
      }
      let parent = this.$parent || this.$root;
      let name = parent.$options.name && parent.$options.name.substr(4);
      while (parent && (!name || !~componentName.indexOf(name))) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name && parent.$options.name.substr(4);
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    $broadcast(componentName, eventName, ...params) {
      if (typeof componentName === "string") {
        componentName = [componentName];
      }
      broadcast.apply(this, [componentName, eventName].concat(params));
    }
  }
};
var listeners = {
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  created() {
    this._addListeners(this.id);
    this.$watch("id", (newId, oldId) => {
      this._removeListeners(oldId, true);
      this._addListeners(newId, true);
    });
  },
  beforeDestroy() {
    this._removeListeners(this.id);
  },
  methods: {
    _addListeners(id, watch) {
      if (watch && !id) {
        return;
      }
      const {listeners: listeners2} = this.$options;
      if (!isPlainObject(listeners2)) {
        return;
      }
      Object.keys(listeners2).forEach((name) => {
        if (watch) {
          if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) {
            UniViewJSBridge.on(`uni-${name}-${this.$page.id}-${id}`, this[listeners2[name]]);
          }
        } else {
          if (name.indexOf("@") === 0) {
            this.$on(`uni-${name.substr(1)}`, this[listeners2[name]]);
          } else if (name.indexOf("uni-") === 0) {
            UniViewJSBridge.on(name, this[listeners2[name]]);
          } else if (id) {
            UniViewJSBridge.on(`uni-${name}-${this.$page.id}-${id}`, this[listeners2[name]]);
          }
        }
      });
    },
    _removeListeners(id, watch) {
      if (watch && !id) {
        return;
      }
      const {listeners: listeners2} = this.$options;
      if (!isPlainObject(listeners2)) {
        return;
      }
      Object.keys(listeners2).forEach((name) => {
        if (watch) {
          if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) {
            UniViewJSBridge.off(`uni-${name}-${this.$page.id}-${id}`, this[listeners2[name]]);
          }
        } else {
          if (name.indexOf("@") === 0) {
            this.$off(`uni-${name.substr(1)}`, this[listeners2[name]]);
          } else if (name.indexOf("uni-") === 0) {
            UniViewJSBridge.off(name, this[listeners2[name]]);
          } else if (id) {
            UniViewJSBridge.off(`uni-${name}-${this.$page.id}-${id}`, this[listeners2[name]]);
          }
        }
      });
    }
  }
};
var hover = {
  data() {
    return {
      hovering: false
    };
  },
  props: {
    hoverClass: {
      type: String,
      default: "none"
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false
    },
    hoverStartTime: {
      type: [Number, String],
      default: 50
    },
    hoverStayTime: {
      type: [Number, String],
      default: 400
    }
  },
  methods: {
    _hoverTouchStart(evt) {
      if (evt._hoverPropagationStopped) {
        return;
      }
      if (!this.hoverClass || this.hoverClass === "none" || this.disabled) {
        return;
      }
      if (evt.touches.length > 1) {
        return;
      }
      if (this.hoverStopPropagation) {
        evt._hoverPropagationStopped = true;
      }
      this._hoverTouch = true;
      this._hoverStartTimer = setTimeout(() => {
        this.hovering = true;
        if (!this._hoverTouch) {
          this._hoverReset();
        }
      }, this.hoverStartTime);
    },
    _hoverTouchEnd(evt) {
      this._hoverTouch = false;
      if (this.hovering) {
        this._hoverReset();
      }
    },
    _hoverReset() {
      requestAnimationFrame(() => {
        clearTimeout(this._hoverStayTimer);
        this._hoverStayTimer = setTimeout(() => {
          this.hovering = false;
        }, this.hoverStayTime);
      });
    },
    _hoverTouchCancel(evt) {
      this._hoverTouch = false;
      this.hovering = false;
      clearTimeout(this._hoverStartTimer);
    }
  }
};
var subscriber = {
  mounted() {
    this._toggleListeners("subscribe", this.id);
    this.$watch("id", (newId, oldId) => {
      this._toggleListeners("unsubscribe", oldId, true);
      this._toggleListeners("subscribe", newId, true);
    });
  },
  beforeDestroy() {
    this._toggleListeners("unsubscribe", this.id);
    if (this._contextId) {
      this._toggleListeners("unsubscribe", this._contextId);
    }
  },
  methods: {
    _toggleListeners(type, id, watch) {
      if (watch && !id) {
        return;
      }
      if (!isFunction(this._handleSubscribe)) {
        return;
      }
      UniViewJSBridge[type](this.$page.id + "-" + this.$options.name.replace(/VUni([A-Z])/, "$1").toLowerCase() + "-" + id, this._handleSubscribe);
    },
    _getContextInfo() {
      const id = `context-${this._uid}`;
      if (!this._contextId) {
        this._toggleListeners("subscribe", id);
        this._contextId = id;
      }
      return {
        name: this.$options.name.replace(/VUni([A-Z])/, "$1").toLowerCase(),
        id,
        page: this.$page.id
      };
    }
  }
};
function hideKeyboard() {
  document.activeElement.blur();
}
function iosHideKeyboard() {
}
var keyboard = {
  name: "Keyboard",
  props: {
    cursorSpacing: {
      type: [Number, String],
      default: 0
    },
    showConfirmBar: {
      type: [Boolean, String],
      default: "auto"
    },
    adjustPosition: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    focus(val) {
      if (val && false) {
        this.showSoftKeybord();
      }
    }
  },
  mounted() {
    if (this.autoFocus || this.focus) {
      this.showSoftKeybord();
    }
  },
  beforeDestroy() {
    this.onKeyboardHide();
  },
  methods: {
    initKeyboard(el) {
      el.addEventListener("focus", () => {
        this.hideKeyboardTemp = function() {
          hideKeyboard();
        };
        UniViewJSBridge.subscribe("hideKeyboard", this.hideKeyboardTemp);
        document.addEventListener("click", iosHideKeyboard, false);
      });
      el.addEventListener("blur", this.onKeyboardHide.bind(this));
    },
    showSoftKeybord() {
      plusReady(() => {
        plus.key.showSoftKeybord();
      });
    },
    setSoftinputTemporary() {
      plusReady(() => {
        const currentWebview = plus.webview.currentWebview();
        const style = currentWebview.getStyle() || {};
        const rect = this.$el.getBoundingClientRect();
        currentWebview.setSoftinputTemporary && currentWebview.setSoftinputTemporary({
          mode: style.softinputMode === "adjustResize" ? "adjustResize" : this.adjustPosition ? "adjustPan" : "nothing",
          position: {
            top: rect.top,
            height: rect.height + (Number(this.cursorSpacing) || 0)
          }
        });
      });
    },
    setSoftinputNavBar() {
      if (this.showConfirmBar === "auto") {
        delete this.__softinputNavBar;
        return;
      }
      plusReady(() => {
        const currentWebview = plus.webview.currentWebview();
        const {softinputNavBar} = currentWebview.getStyle() || {};
        const showConfirmBar = softinputNavBar !== "none";
        if (showConfirmBar !== this.showConfirmBar) {
          this.__softinputNavBar = softinputNavBar || "auto";
          currentWebview.setStyle({
            softinputNavBar: this.showConfirmBar ? "auto" : "none"
          });
        } else {
          delete this.__softinputNavBar;
        }
      });
    },
    resetSoftinputNavBar() {
      const softinputNavBar = this.__softinputNavBar;
      if (softinputNavBar) {
        plusReady(() => {
          const currentWebview = plus.webview.currentWebview();
          currentWebview.setStyle({
            softinputNavBar
          });
        });
      }
    },
    onKeyboardHide() {
      UniViewJSBridge.unsubscribe("hideKeyboard", this.hideKeyboardTemp);
      document.removeEventListener("click", iosHideKeyboard, false);
      if (String(navigator.vendor).indexOf("Apple") === 0) {
        document.documentElement.scrollTo(document.documentElement.scrollLeft, document.documentElement.scrollTop);
      }
    }
  }
};
function throttle(fn, wait) {
  let last = 0;
  let timeout;
  const newFn = function(...arg) {
    const now = Date.now();
    clearTimeout(timeout);
    const waitCallback = () => {
      last = now;
      fn.apply(this, arg);
    };
    if (now - last < wait) {
      timeout = setTimeout(waitCallback, wait - (now - last));
      return;
    }
    waitCallback();
  };
  newFn.cancel = function() {
    clearTimeout(timeout);
  };
  return newFn;
}
var baseInput = {
  name: "BaseInput",
  mixins: [emitter, keyboard],
  model: {
    prop: "value",
    event: "update:value"
  },
  props: {
    value: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      valueSync: this._getValueString(this.value)
    };
  },
  created() {
    const valueChange = this.__valueChange = debounce((val) => {
      this.valueSync = this._getValueString(val);
    }, 100);
    this.$watch("value", valueChange);
    this.__triggerInput = throttle(($event, detail) => {
      this.$emit("update:value", detail.value);
      this.$trigger("input", $event, detail);
    }, 100);
    this.$triggerInput = ($event, detail) => {
      this.__valueChange.cancel();
      this.__triggerInput($event, detail);
    };
  },
  beforeDestroy() {
    this.__valueChange.cancel();
    this.__triggerInput.cancel();
  },
  methods: {
    _getValueString(value) {
      return value === null ? "" : String(value);
    }
  }
};
let supportsPassive$1 = false;
try {
  const opts = {};
  Object.defineProperty(opts, "passive", {
    get() {
      supportsPassive$1 = true;
    }
  });
  window.addEventListener("test-passive", null, opts);
} catch (e2) {
}
const passiveOptions = supportsPassive$1 ? {passive: true} : false;
var script = {
  name: "Audio",
  mixins: [subscriber],
  props: {
    id: {
      type: String,
      default: ""
    },
    src: {
      type: String,
      default: ""
    },
    loop: {
      type: [Boolean, String],
      default: false
    },
    controls: {
      type: [Boolean, String],
      default: false
    },
    poster: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    author: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      playing: false,
      currentTime: this.getTime(0)
    };
  },
  watch: {
    src(val) {
      if (this.$refs.audio) {
        this.$refs.audio.src = this.$getRealPath(val);
      }
    }
  },
  mounted() {
    const audio = this.$refs.audio;
    audio.addEventListener("error", ($event) => {
      this.playing = false;
      this.$trigger("error", $event, {});
    });
    audio.addEventListener("play", ($event) => {
      this.playing = true;
      this.$trigger("play", $event, {});
    });
    audio.addEventListener("pause", ($event) => {
      this.playing = false;
      this.$trigger("pause", $event, {});
    });
    audio.addEventListener("ended", ($event) => {
      this.playing = false;
      this.$trigger("ended", $event, {});
    });
    audio.addEventListener("timeupdate", ($event) => {
      var currentTime = audio.currentTime;
      this.currentTime = this.getTime(currentTime);
      var duration = audio.duration;
      this.$trigger("timeupdate", $event, {
        currentTime,
        duration
      });
    });
    audio.src = this.$getRealPath(this.src);
  },
  methods: {
    _handleSubscribe({
      type,
      data = {}
    }) {
      var audio = this.$refs.audio;
      switch (type) {
        case "setSrc":
          audio.src = this.$getRealPath(data.src);
          this.$emit("update:src", data.src);
          break;
        case "play":
          audio.play();
          break;
        case "pause":
          audio.pause();
          break;
        case "seek":
          audio.currentTime = data.position;
          break;
      }
    },
    trigger() {
      if (this.playing) {
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
      }
    },
    getTime(time) {
      var h = Math.floor(time / 3600);
      var m = Math.floor(time % 3600 / 60);
      var s = Math.floor(time % 3600 % 60);
      h = (h < 10 ? "0" : "") + h;
      m = (m < 10 ? "0" : "") + m;
      s = (s < 10 ? "0" : "") + s;
      var str = m + ":" + s;
      if (h !== "00") {
        str = h + ":" + str;
      }
      return str;
    }
  }
};
const _hoisted_1 = {class: "uni-audio-default"};
const _hoisted_2 = {class: "uni-audio-right"};
const _hoisted_3 = {class: "uni-audio-time"};
const _hoisted_4 = {class: "uni-audio-info"};
const _hoisted_5 = {class: "uni-audio-name"};
const _hoisted_6 = {class: "uni-audio-author"};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-audio", mergeProps({
    id: $props.id,
    controls: !!$props.controls
  }, _ctx.$attrs), [
    createVNode("audio", {
      ref: "audio",
      loop: $props.loop,
      style: {display: "none"}
    }, null, 8, ["loop"]),
    createVNode("div", _hoisted_1, [
      createVNode("div", {
        style: "background-image: url(" + _ctx.$getRealPath($props.poster) + ");",
        class: "uni-audio-left"
      }, [
        createVNode("div", {
          class: [{play: !$data.playing, pause: $data.playing}, "uni-audio-button"],
          onClick: _cache[1] || (_cache[1] = (...args) => $options.trigger && $options.trigger(...args))
        }, null, 2)
      ], 4),
      createVNode("div", _hoisted_2, [
        createVNode("div", _hoisted_3, toDisplayString($data.currentTime), 1),
        createVNode("div", _hoisted_4, [
          createVNode("div", _hoisted_5, toDisplayString($props.name), 1),
          createVNode("div", _hoisted_6, toDisplayString($props.author), 1)
        ])
      ])
    ])
  ], 16, ["id", "controls"]);
}
script.render = render;
const pixelRatio = function() {
  const canvas = document.createElement("canvas");
  canvas.height = canvas.width = 0;
  const context = canvas.getContext("2d");
  const backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
  return (window.devicePixelRatio || 1) / backingStore;
}();
const forEach = function(obj, func) {
  for (const key in obj) {
    if (hasOwn(obj, key)) {
      func(obj[key], key);
    }
  }
};
const ratioArgs = {
  fillRect: "all",
  clearRect: "all",
  strokeRect: "all",
  moveTo: "all",
  lineTo: "all",
  arc: [0, 1, 2],
  arcTo: "all",
  bezierCurveTo: "all",
  isPointinPath: "all",
  isPointinStroke: "all",
  quadraticCurveTo: "all",
  rect: "all",
  translate: "all",
  createRadialGradient: "all",
  createLinearGradient: "all",
  setTransform: [4, 5]
};
const proto = CanvasRenderingContext2D.prototype;
proto.drawImageByCanvas = function(_super) {
  return function(canvas, srcx, srcy, srcw, srch, desx, desy, desw, desh, isScale) {
    if (!this.__hidpi__) {
      return _super.apply(this, arguments);
    }
    srcx *= pixelRatio;
    srcy *= pixelRatio;
    srcw *= pixelRatio;
    srch *= pixelRatio;
    desx *= pixelRatio;
    desy *= pixelRatio;
    desw = isScale ? desw * pixelRatio : desw;
    desh = isScale ? desh * pixelRatio : desh;
    _super.call(this, canvas, srcx, srcy, srcw, srch, desx, desy, desw, desh);
  };
}(proto.drawImage);
if (pixelRatio !== 1) {
  forEach(ratioArgs, function(value, key) {
    proto[key] = function(_super) {
      return function() {
        if (!this.__hidpi__) {
          return _super.apply(this, arguments);
        }
        let args = Array.prototype.slice.call(arguments);
        if (value === "all") {
          args = args.map(function(a2) {
            return a2 * pixelRatio;
          });
        } else if (Array.isArray(value)) {
          for (let i2 = 0; i2 < value.length; i2++) {
            args[value[i2]] *= pixelRatio;
          }
        }
        return _super.apply(this, args);
      };
    }(proto[key]);
  });
  proto.stroke = function(_super) {
    return function() {
      if (!this.__hidpi__) {
        return _super.apply(this, arguments);
      }
      this.lineWidth *= pixelRatio;
      _super.apply(this, arguments);
      this.lineWidth /= pixelRatio;
    };
  }(proto.stroke);
  proto.fillText = function(_super) {
    return function() {
      if (!this.__hidpi__) {
        return _super.apply(this, arguments);
      }
      const args = Array.prototype.slice.call(arguments);
      args[1] *= pixelRatio;
      args[2] *= pixelRatio;
      var font2 = this.font;
      this.font = font2.replace(/(\d+\.?\d*)(px|em|rem|pt)/g, function(w, m, u) {
        return m * pixelRatio + u;
      });
      _super.apply(this, args);
      this.font = font2;
    };
  }(proto.fillText);
  proto.strokeText = function(_super) {
    return function() {
      if (!this.__hidpi__) {
        return _super.apply(this, arguments);
      }
      var args = Array.prototype.slice.call(arguments);
      args[1] *= pixelRatio;
      args[2] *= pixelRatio;
      var font2 = this.font;
      this.font = font2.replace(/(\d+\.?\d*)(px|em|rem|pt)/g, function(w, m, u) {
        return m * pixelRatio + u;
      });
      _super.apply(this, args);
      this.font = font2;
    };
  }(proto.strokeText);
  proto.drawImage = function(_super) {
    return function() {
      if (!this.__hidpi__) {
        return _super.apply(this, arguments);
      }
      this.scale(pixelRatio, pixelRatio);
      _super.apply(this, arguments);
      this.scale(1 / pixelRatio, 1 / pixelRatio);
    };
  }(proto.drawImage);
}
function wrapper(canvas) {
  canvas.width = canvas.offsetWidth * pixelRatio;
  canvas.height = canvas.offsetHeight * pixelRatio;
  canvas.getContext("2d").__hidpi__ = true;
}
function resolveColor(color) {
  color = color.slice(0);
  color[3] = color[3] / 255;
  return "rgba(" + color.join(",") + ")";
}
function processTouches(target, touches) {
  return [].map.call(touches, (touch) => {
    var boundingClientRect = target.getBoundingClientRect();
    return {
      identifier: touch.identifier,
      x: touch.clientX - boundingClientRect.left,
      y: touch.clientY - boundingClientRect.top
    };
  });
}
var tempCanvas;
function getTempCanvas(width = 0, height = 0) {
  if (!tempCanvas) {
    tempCanvas = document.createElement("canvas");
  }
  tempCanvas.width = width;
  tempCanvas.height = height;
  return tempCanvas;
}
var script$1 = {
  name: "Canvas",
  mixins: [subscriber],
  props: {
    canvasId: {
      type: String,
      default: ""
    },
    disableScroll: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      actionsWaiting: false
    };
  },
  computed: {
    id() {
      return this.canvasId;
    },
    _listeners() {
      var $listeners = Object.assign({}, this.$listeners);
      var events = ["touchstart", "touchmove", "touchend"];
      events.forEach((event2) => {
        var existing = $listeners[event2];
        var eventHandler = [];
        if (existing) {
          eventHandler.push(($event) => {
            this.$trigger(event2, Object.assign({}, $event, {
              touches: processTouches($event.currentTarget, $event.touches),
              changedTouches: processTouches($event.currentTarget, $event.changedTouches)
            }));
          });
        }
        if (this.disableScroll && event2 === "touchmove") {
          eventHandler.push(this._touchmove);
        }
        $listeners[event2] = eventHandler;
      });
      return $listeners;
    }
  },
  created() {
    this._actionsDefer = [];
    this._images = {};
  },
  mounted() {
    this._resize({
      width: this.$refs.sensor.$el.offsetWidth,
      height: this.$refs.sensor.$el.offsetHeight
    });
  },
  beforeDestroy() {
    const canvas = this.$refs.canvas;
    canvas.height = canvas.width = 0;
  },
  methods: {
    _handleSubscribe({
      type,
      data = {}
    }) {
      var method = this[type];
      if (type.indexOf("_") !== 0 && typeof method === "function") {
        method(data);
      }
    },
    _resize() {
      var canvas = this.$refs.canvas;
      if (canvas.width > 0 && canvas.height > 0) {
        var context = canvas.getContext("2d");
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        wrapper(this.$refs.canvas);
        context.putImageData(imageData, 0, 0);
      } else {
        wrapper(this.$refs.canvas);
      }
    },
    _touchmove(event2) {
      event2.preventDefault();
    },
    actionsChanged({
      actions,
      reserve,
      callbackId
    }) {
      var self = this;
      if (!actions) {
        return;
      }
      if (this.actionsWaiting) {
        this._actionsDefer.push([actions, reserve, callbackId]);
        return;
      }
      var canvas = this.$refs.canvas;
      var c2d = canvas.getContext("2d");
      if (!reserve) {
        c2d.fillStyle = "#000000";
        c2d.strokeStyle = "#000000";
        c2d.shadowColor = "#000000";
        c2d.shadowBlur = 0;
        c2d.shadowOffsetX = 0;
        c2d.shadowOffsetY = 0;
        c2d.setTransform(1, 0, 0, 1, 0, 0);
        c2d.clearRect(0, 0, canvas.width, canvas.height);
      }
      this.preloadImage(actions);
      for (let index = 0; index < actions.length; index++) {
        const action = actions[index];
        let method = action.method;
        const data = action.data;
        if (/^set/.test(method) && method !== "setTransform") {
          const method1 = method[3].toLowerCase() + method.slice(4);
          let color;
          if (method1 === "fillStyle" || method1 === "strokeStyle") {
            if (data[0] === "normal") {
              color = resolveColor(data[1]);
            } else if (data[0] === "linear") {
              const LinearGradient = c2d.createLinearGradient(...data[1]);
              data[2].forEach(function(data2) {
                const offset = data2[0];
                const color2 = resolveColor(data2[1]);
                LinearGradient.addColorStop(offset, color2);
              });
              color = LinearGradient;
            } else if (data[0] === "radial") {
              const x = data[1][0];
              const y = data[1][1];
              const r = data[1][2];
              const LinearGradient = c2d.createRadialGradient(x, y, 0, x, y, r);
              data[2].forEach(function(data2) {
                const offset = data2[0];
                const color2 = resolveColor(data2[1]);
                LinearGradient.addColorStop(offset, color2);
              });
              color = LinearGradient;
            } else if (data[0] === "pattern") {
              const loaded = this.checkImageLoaded(data[1], actions.slice(index + 1), callbackId, function(image2) {
                if (image2) {
                  c2d[method1] = c2d.createPattern(image2, data[2]);
                }
              });
              if (!loaded) {
                break;
              }
              continue;
            }
            c2d[method1] = color;
          } else if (method1 === "globalAlpha") {
            c2d[method1] = data[0] / 255;
          } else if (method1 === "shadow") {
            var _ = ["shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor"];
            data.forEach(function(color_, method_) {
              c2d[_[method_]] = _[method_] === "shadowColor" ? resolveColor(color_) : color_;
            });
          } else {
            if (method1 === "fontSize") {
              c2d.font = c2d.font.replace(/\d+\.?\d*px/, data[0] + "px");
            } else {
              if (method1 === "lineDash") {
                c2d.setLineDash(data[0]);
                c2d.lineDashOffset = data[1] || 0;
              } else {
                if (method1 === "textBaseline") {
                  if (data[0] === "normal") {
                    data[0] = "alphabetic";
                  }
                  c2d[method1] = data[0];
                } else {
                  c2d[method1] = data[0];
                }
              }
            }
          }
        } else if (method === "fillPath" || method === "strokePath") {
          method = method.replace(/Path/, "");
          c2d.beginPath();
          data.forEach(function(data_) {
            c2d[data_.method].apply(c2d, data_.data);
          });
          c2d[method]();
        } else if (method === "fillText") {
          c2d.fillText.apply(c2d, data);
        } else if (method === "drawImage") {
          var A = function() {
            var dataArray = [...data];
            var url = dataArray[0];
            var otherData = dataArray.slice(1);
            self._images = self._images || {};
            if (!self.checkImageLoaded(url, actions.slice(index + 1), callbackId, function(image2) {
              if (image2) {
                c2d.drawImage.apply(c2d, [image2].concat([...otherData.slice(4, 8)], [...otherData.slice(0, 4)]));
              }
            }))
              return "break";
          }();
          if (A === "break") {
            break;
          }
        } else {
          if (method === "clip") {
            data.forEach(function(data_) {
              c2d[data_.method].apply(c2d, data_.data);
            });
            c2d.clip();
          } else {
            c2d[method].apply(c2d, data);
          }
        }
      }
      if (!this.actionsWaiting && callbackId) {
        UniViewJSBridge.publishHandler("onDrawCanvas", {
          callbackId,
          data: {
            errMsg: "drawCanvas:ok"
          }
        }, this.$page.id);
      }
    },
    preloadImage: function(actions) {
      var self = this;
      actions.forEach(function(action) {
        var method = action.method;
        var data = action.data;
        var src = "";
        if (method === "drawImage") {
          src = data[0];
          src = self.$getRealPath(src);
          data[0] = src;
        } else if (method === "setFillStyle" && data[0] === "pattern") {
          src = data[1];
          src = self.$getRealPath(src);
          data[1] = src;
        }
        if (src && !self._images[src]) {
          loadImage();
        }
        function loadImage() {
          self._images[src] = new Image();
          self._images[src].onload = function() {
            self._images[src].ready = true;
          };
          function loadBlob(blob) {
            self._images[src].src = (window.URL || window.webkitURL).createObjectURL(blob);
          }
          function loadFile(path) {
            var bitmap = new plus.nativeObj.Bitmap("bitmap" + Date.now());
            bitmap.load(path, function() {
              self._images[src].src = bitmap.toBase64Data();
              bitmap.clear();
            }, function() {
              bitmap.clear();
              console.error("preloadImage error");
            });
          }
          function loadUrl(url) {
            function plusDownload() {
              plus.downloader.createDownload(url, {
                filename: "_doc/uniapp_temp/download/"
              }, function(d, status) {
                if (status === 200) {
                  loadFile(d.filename);
                } else {
                  self._images[src].src = src;
                }
              }).start();
            }
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "blob";
            xhr.onload = function() {
              if (this.status === 200) {
                loadBlob(this.response);
              }
            };
            xhr.onerror = window.plus ? plusDownload : function() {
              self._images[src].src = src;
            };
            xhr.send();
          }
          if (window.plus && (!window.webkit || !window.webkit.messageHandlers)) {
            self._images[src].src = src;
          } else {
            if (window.plus && src.indexOf("http://") !== 0 && src.indexOf("https://") !== 0 && !/^data:.*,.*/.test(src)) {
              loadFile(src);
            } else if (/^data:.*,.*/.test(src)) {
              self._images[src].src = src;
            } else {
              loadUrl(src);
            }
          }
        }
      });
    },
    checkImageLoaded: function(src, actions, callbackId, fn) {
      var self = this;
      var image2 = this._images[src];
      if (image2.ready) {
        fn(image2);
        return true;
      } else {
        this._actionsDefer.unshift([actions, true]);
        this.actionsWaiting = true;
        image2.onload = function() {
          image2.ready = true;
          fn(image2);
          self.actionsWaiting = false;
          var actions2 = self._actionsDefer.slice(0);
          self._actionsDefer = [];
          for (var action = actions2.shift(); action; ) {
            self.actionsChanged({
              actions: action[0],
              reserve: action[1],
              callbackId
            });
            action = actions2.shift();
          }
        };
        return false;
      }
    },
    getImageData({
      x = 0,
      y = 0,
      width,
      height,
      destWidth,
      destHeight,
      hidpi = true,
      callbackId
    }) {
      var imgData;
      var canvas = this.$refs.canvas;
      if (!width) {
        width = canvas.offsetWidth - x;
      }
      if (!height) {
        height = canvas.offsetHeight - y;
      }
      try {
        if (!hidpi) {
          if (!destWidth && !destHeight) {
            destWidth = Math.round(width * pixelRatio);
            destHeight = Math.round(height * pixelRatio);
          } else if (!destWidth) {
            destWidth = Math.round(width / height * destHeight);
          } else if (!destHeight) {
            destHeight = Math.round(height / width * destWidth);
          }
        } else {
          destWidth = width;
          destHeight = height;
        }
        const newCanvas = getTempCanvas(destWidth, destHeight);
        const context = newCanvas.getContext("2d");
        context.__hidpi__ = true;
        context.drawImageByCanvas(canvas, x, y, width, height, 0, 0, destWidth, destHeight, false);
        imgData = context.getImageData(0, 0, destWidth, destHeight);
        newCanvas.height = newCanvas.width = 0;
        context.__hidpi__ = false;
      } catch (error) {
        if (!callbackId) {
          return;
        }
        UniViewJSBridge.publishHandler("onCanvasMethodCallback", {
          callbackId,
          data: {
            errMsg: "canvasGetImageData:fail"
          }
        }, this.$page.id);
        return;
      }
      if (!callbackId) {
        return {
          data: Array.prototype.slice.call(imgData.data),
          width: destWidth,
          height: destHeight
        };
      } else {
        UniViewJSBridge.publishHandler("onCanvasMethodCallback", {
          callbackId,
          data: {
            errMsg: "canvasGetImageData:ok",
            data: [...imgData.data],
            width: destWidth,
            height: destHeight
          }
        }, this.$page.id);
      }
    },
    putImageData({
      data,
      x,
      y,
      width,
      height,
      callbackId
    }) {
      try {
        if (!height) {
          height = Math.round(data.length / 4 / width);
        }
        const canvas = getTempCanvas(width, height);
        const context = canvas.getContext("2d");
        context.putImageData(new ImageData(new Uint8ClampedArray(data), width, height), 0, 0);
        this.$refs.canvas.getContext("2d").drawImage(canvas, x, y, width, height);
        canvas.height = canvas.width = 0;
      } catch (error) {
        UniViewJSBridge.publishHandler("onCanvasMethodCallback", {
          callbackId,
          data: {
            errMsg: "canvasPutImageData:fail"
          }
        }, this.$page.id);
        return;
      }
      UniViewJSBridge.publishHandler("onCanvasMethodCallback", {
        callbackId,
        data: {
          errMsg: "canvasPutImageData:ok"
        }
      }, this.$page.id);
    },
    getDataUrl({
      x = 0,
      y = 0,
      width,
      height,
      destWidth,
      destHeight,
      hidpi = true,
      fileType,
      qualit,
      callbackId
    }) {
      const res = this.getImageData({
        x,
        y,
        width,
        height,
        destWidth,
        destHeight,
        hidpi
      });
      if (!res.data || !res.data.length) {
        UniViewJSBridge.publishHandler("onCanvasMethodCallback", {
          callbackId,
          data: {
            errMsg: "canvasGetDataUrl:fail"
          }
        }, this.$page.id);
        return;
      }
      let imgData;
      try {
        imgData = new ImageData(new Uint8ClampedArray(res.data), res.width, res.height);
      } catch (error) {
        UniViewJSBridge.publishHandler("onCanvasMethodCallback", {
          callbackId,
          data: {
            errMsg: "canvasGetDataUrl:fail"
          }
        }, this.$page.id);
        return;
      }
      destWidth = res.width;
      destHeight = res.height;
      const canvas = getTempCanvas(destWidth, destHeight);
      const c2d = canvas.getContext("2d");
      c2d.putImageData(imgData, 0, 0);
      let base64 = canvas.toDataURL("image/png");
      canvas.height = canvas.width = 0;
      const img = new Image();
      img.onload = () => {
        const canvas2 = getTempCanvas(destWidth, destHeight);
        if (fileType === "jpeg" || fileType === "jpg") {
          fileType = "jpeg";
          c2d.fillStyle = "#fff";
          c2d.fillRect(0, 0, destWidth, destHeight);
        }
        c2d.drawImage(img, 0, 0);
        base64 = canvas2.toDataURL(`image/${fileType}`, qualit);
        canvas2.height = canvas2.width = 0;
        UniViewJSBridge.publishHandler("onCanvasMethodCallback", {
          callbackId,
          data: {
            errMsg: "canvasGetDataUrl:ok",
            base64
          }
        }, this.$page.id);
      };
      img.src = base64;
    }
  }
};
const _hoisted_1$1 = {
  ref: "canvas",
  width: "300",
  height: "150"
};
const _hoisted_2$1 = {style: {position: "absolute", top: "0", left: "0", width: "100%", height: "100%", overflow: "hidden"}};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_resize_sensor = resolveComponent("v-uni-resize-sensor");
  return openBlock(), createBlock("uni-canvas", mergeProps({
    "canvas-id": $props.canvasId,
    "disable-scroll": $props.disableScroll
  }, toHandlers($options._listeners)), [
    createVNode("canvas", _hoisted_1$1, null, 512),
    createVNode("div", _hoisted_2$1, [
      renderSlot(_ctx.$slots, "default")
    ]),
    createVNode(_component_v_uni_resize_sensor, {
      ref: "sensor",
      onResize: $options._resize
    }, null, 8, ["onResize"])
  ], 16, ["canvas-id", "disable-scroll"]);
}
script$1.render = render$1;
var script$2 = {
  name: "Checkbox",
  mixins: [emitter, listeners],
  props: {
    checked: {
      type: [Boolean, String],
      default: false
    },
    id: {
      type: String,
      default: ""
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: "#007aff"
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      checkboxChecked: this.checked,
      checkboxValue: this.value
    };
  },
  watch: {
    checked(val) {
      this.checkboxChecked = val;
    },
    value(val) {
      this.checkboxValue = val;
    }
  },
  listeners: {
    "label-click": "_onClick",
    "@label-click": "_onClick"
  },
  created() {
    this.$dispatch("CheckboxGroup", "uni-checkbox-group-update", {
      type: "add",
      vm: this
    });
    this.$dispatch("Form", "uni-form-group-update", {
      type: "add",
      vm: this
    });
  },
  beforeDestroy() {
    this.$dispatch("CheckboxGroup", "uni-checkbox-group-update", {
      type: "remove",
      vm: this
    });
    this.$dispatch("Form", "uni-form-group-update", {
      type: "remove",
      vm: this
    });
  },
  methods: {
    _onClick($event) {
      if (this.disabled) {
        return;
      }
      this.checkboxChecked = !this.checkboxChecked;
      this.$dispatch("CheckboxGroup", "uni-checkbox-change", $event);
    },
    _resetFormData() {
      this.checkboxChecked = false;
    }
  }
};
const _hoisted_1$2 = {class: "uni-checkbox-wrapper"};
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-checkbox", mergeProps({disabled: $props.disabled}, _ctx.$attrs, {
    onClick: _cache[1] || (_cache[1] = (...args) => $options._onClick && $options._onClick(...args))
  }), [
    createVNode("div", _hoisted_1$2, [
      createVNode("div", {
        class: [[$data.checkboxChecked ? "uni-checkbox-input-checked" : ""], "uni-checkbox-input"],
        style: {color: $props.color}
      }, null, 6),
      renderSlot(_ctx.$slots, "default")
    ])
  ], 16, ["disabled"]);
}
script$2.render = render$2;
var script$3 = {
  name: "CheckboxGroup",
  mixins: [emitter, listeners],
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      checkboxList: []
    };
  },
  listeners: {
    "@checkbox-change": "_changeHandler",
    "@checkbox-group-update": "_checkboxGroupUpdateHandler"
  },
  created() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "add",
      vm: this
    });
  },
  beforeDestroy() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "remove",
      vm: this
    });
  },
  methods: {
    _changeHandler($event) {
      const value = [];
      this.checkboxList.forEach((vm) => {
        if (vm.checkboxChecked) {
          value.push(vm.value);
        }
      });
      this.$trigger("change", $event, {
        value
      });
    },
    _checkboxGroupUpdateHandler($event) {
      if ($event.type === "add") {
        this.checkboxList.push($event.vm);
      } else {
        const index = this.checkboxList.indexOf($event.vm);
        this.checkboxList.splice(index, 1);
      }
    },
    _getFormData() {
      const data = {};
      if (this.name !== "") {
        const value = [];
        this.checkboxList.forEach((vm) => {
          if (vm.checkboxChecked) {
            value.push(vm.value);
          }
        });
        data.value = value;
        data.key = this.name;
      }
      return data;
    }
  }
};
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-checkbox-group", _ctx.$attrs, [
    renderSlot(_ctx.$slots, "default")
  ], 16);
}
script$3.render = render$3;
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
var block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");
var special = makeMap("script,style");
function HTMLParser(html, handler) {
  var index;
  var chars;
  var match;
  var stack = [];
  var last = html;
  stack.last = function() {
    return this[this.length - 1];
  };
  while (html) {
    chars = true;
    if (!stack.last() || !special[stack.last()]) {
      if (html.indexOf("<!--") == 0) {
        index = html.indexOf("-->");
        if (index >= 0) {
          if (handler.comment) {
            handler.comment(html.substring(4, index));
          }
          html = html.substring(index + 3);
          chars = false;
        }
      } else if (html.indexOf("</") == 0) {
        match = html.match(endTag);
        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(endTag, parseEndTag);
          chars = false;
        }
      } else if (html.indexOf("<") == 0) {
        match = html.match(startTag);
        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(startTag, parseStartTag);
          chars = false;
        }
      }
      if (chars) {
        index = html.indexOf("<");
        var text2 = index < 0 ? html : html.substring(0, index);
        html = index < 0 ? "" : html.substring(index);
        if (handler.chars) {
          handler.chars(text2);
        }
      }
    } else {
      html = html.replace(new RegExp("([\\s\\S]*?)</" + stack.last() + "[^>]*>"), function(all, text3) {
        text3 = text3.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
        if (handler.chars) {
          handler.chars(text3);
        }
        return "";
      });
      parseEndTag("", stack.last());
    }
    if (html == last) {
      throw "Parse Error: " + html;
    }
    last = html;
  }
  parseEndTag();
  function parseStartTag(tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase();
    if (block[tagName]) {
      while (stack.last() && inline[stack.last()]) {
        parseEndTag("", stack.last());
      }
    }
    if (closeSelf[tagName] && stack.last() == tagName) {
      parseEndTag("", tagName);
    }
    unary = empty[tagName] || !!unary;
    if (!unary) {
      stack.push(tagName);
    }
    if (handler.start) {
      var attrs = [];
      rest.replace(attr, function(match2, name) {
        var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";
        attrs.push({
          name,
          value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\"')
        });
      });
      if (handler.start) {
        handler.start(tagName, attrs, unary);
      }
    }
  }
  function parseEndTag(tag, tagName) {
    if (!tagName) {
      var pos = 0;
    } else {
      for (var pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos] == tagName) {
          break;
        }
      }
    }
    if (pos >= 0) {
      for (var i2 = stack.length - 1; i2 >= pos; i2--) {
        if (handler.end) {
          handler.end(stack[i2]);
        }
      }
      stack.length = pos;
    }
  }
}
function makeMap(str) {
  var obj = {};
  var items = str.split(",");
  for (var i2 = 0; i2 < items.length; i2++) {
    obj[items[i2]] = true;
  }
  return obj;
}
function divider(Quill) {
  const BlockEmbed = Quill.import("blots/block/embed");
  class Divider extends BlockEmbed {
  }
  Divider.blotName = "divider";
  Divider.tagName = "HR";
  return {
    "formats/divider": Divider
  };
}
function ins(Quill) {
  const Inline = Quill.import("blots/inline");
  class Ins extends Inline {
  }
  Ins.blotName = "ins";
  Ins.tagName = "INS";
  return {
    "formats/ins": Ins
  };
}
function align(Quill) {
  const {Scope, Attributor} = Quill.import("parchment");
  const config = {
    scope: Scope.BLOCK,
    whitelist: ["left", "right", "center", "justify"]
  };
  const AlignStyle = new Attributor.Style("align", "text-align", config);
  return {
    "formats/align": AlignStyle
  };
}
function direction(Quill) {
  const {Scope, Attributor} = Quill.import("parchment");
  const config = {
    scope: Scope.BLOCK,
    whitelist: ["rtl"]
  };
  const DirectionStyle = new Attributor.Style("direction", "direction", config);
  return {
    "formats/direction": DirectionStyle
  };
}
function list(Quill) {
  const Parchment = Quill.import("parchment");
  const Container = Quill.import("blots/container");
  const ListItem = Quill.import("formats/list/item");
  class List extends Container {
    static create(value) {
      const tagName = value === "ordered" ? "OL" : "UL";
      const node = super.create(tagName);
      if (value === "checked" || value === "unchecked") {
        node.setAttribute("data-checked", value === "checked");
      }
      return node;
    }
    static formats(domNode) {
      if (domNode.tagName === "OL")
        return "ordered";
      if (domNode.tagName === "UL") {
        if (domNode.hasAttribute("data-checked")) {
          return domNode.getAttribute("data-checked") === "true" ? "checked" : "unchecked";
        } else {
          return "bullet";
        }
      }
      return void 0;
    }
    constructor(domNode) {
      super(domNode);
      const listEventHandler = (e2) => {
        if (e2.target.parentNode !== domNode)
          return;
        const format = this.statics.formats(domNode);
        const blot = Parchment.find(e2.target);
        if (format === "checked") {
          blot.format("list", "unchecked");
        } else if (format === "unchecked") {
          blot.format("list", "checked");
        }
      };
      domNode.addEventListener("click", listEventHandler);
    }
    format(name, value) {
      if (this.children.length > 0) {
        this.children.tail.format(name, value);
      }
    }
    formats() {
      return {[this.statics.blotName]: this.statics.formats(this.domNode)};
    }
    insertBefore(blot, ref) {
      if (blot instanceof ListItem) {
        super.insertBefore(blot, ref);
      } else {
        const index = ref == null ? this.length() : ref.offset(this);
        const after = this.split(index);
        after.parent.insertBefore(blot, after);
      }
    }
    optimize(context) {
      super.optimize(context);
      const next = this.next;
      if (next != null && next.prev === this && next.statics.blotName === this.statics.blotName && next.domNode.tagName === this.domNode.tagName && next.domNode.getAttribute("data-checked") === this.domNode.getAttribute("data-checked")) {
        next.moveChildren(this);
        next.remove();
      }
    }
    replace(target) {
      if (target.statics.blotName !== this.statics.blotName) {
        const item = Parchment.create(this.statics.defaultChild);
        target.moveChildren(item);
        this.appendChild(item);
      }
      super.replace(target);
    }
  }
  List.blotName = "list";
  List.scope = Parchment.Scope.BLOCK_BLOT;
  List.tagName = ["OL", "UL"];
  List.defaultChild = "list-item";
  List.allowedChildren = [ListItem];
  return {
    "formats/list": List
  };
}
function background(Quill) {
  const {Scope} = Quill.import("parchment");
  const BackgroundStyle = Quill.import("formats/background");
  const BackgroundColorStyle = new BackgroundStyle.constructor("backgroundColor", "background-color", {
    scope: Scope.INLINE
  });
  return {
    "formats/backgroundColor": BackgroundColorStyle
  };
}
function box(Quill) {
  const {Scope, Attributor} = Quill.import("parchment");
  const config = {
    scope: Scope.BLOCK
  };
  const margin = [
    "margin",
    "marginTop",
    "marginBottom",
    "marginLeft",
    "marginRight"
  ];
  const padding = [
    "padding",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight"
  ];
  const result = {};
  margin.concat(padding).forEach((name) => {
    result[`formats/${name}`] = new Attributor.Style(name, hyphenate(name), config);
  });
  return result;
}
function font(Quill) {
  const {Scope, Attributor} = Quill.import("parchment");
  const config = {
    scope: Scope.INLINE
  };
  const font2 = [
    "font",
    "fontSize",
    "fontStyle",
    "fontVariant",
    "fontWeight",
    "fontFamily"
  ];
  const result = {};
  font2.forEach((name) => {
    result[`formats/${name}`] = new Attributor.Style(name, hyphenate(name), config);
  });
  return result;
}
function text(Quill) {
  const {Scope, Attributor} = Quill.import("parchment");
  const text2 = [
    {
      name: "lineHeight",
      scope: Scope.BLOCK
    },
    {
      name: "letterSpacing",
      scope: Scope.INLINE
    },
    {
      name: "textDecoration",
      scope: Scope.INLINE
    },
    {
      name: "textIndent",
      scope: Scope.BLOCK
    }
  ];
  const result = {};
  text2.forEach(({name, scope}) => {
    result[`formats/${name}`] = new Attributor.Style(name, hyphenate(name), {
      scope
    });
  });
  return result;
}
function image(Quill) {
  const Image2 = Quill.import("formats/image");
  const ATTRIBUTES = [
    "alt",
    "height",
    "width",
    "data-custom",
    "class",
    "data-local"
  ];
  Image2.sanitize = (url) => url;
  Image2.formats = function formats(domNode) {
    return ATTRIBUTES.reduce(function(formats2, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats2[attribute] = domNode.getAttribute(attribute);
      }
      return formats2;
    }, {});
  };
  const format = Image2.prototype.format;
  Image2.prototype.format = function(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      format.call(this, name, value);
    }
  };
}
function register(Quill) {
  const formats = {
    divider,
    ins,
    align,
    direction,
    list,
    background,
    box,
    font,
    text,
    image
  };
  const options = {};
  Object.values(formats).forEach((value) => Object.assign(options, value(Quill)));
  Quill.register(options, true);
}
var script$4 = {
  name: "Editor",
  mixins: [subscriber, emitter, keyboard],
  props: {
    id: {
      type: String,
      default: ""
    },
    readOnly: {
      type: [Boolean, String],
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    showImgSize: {
      type: [Boolean, String],
      default: false
    },
    showImgToolbar: {
      type: [Boolean, String],
      default: false
    },
    showImgResize: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      quillReady: false
    };
  },
  computed: {},
  watch: {
    readOnly(value) {
      if (this.quillReady) {
        const quill = this.quill;
        quill.enable(!value);
        if (!value) {
          quill.blur();
        }
      }
    },
    placeholder(value) {
      if (this.quillReady) {
        this.quill.root.setAttribute("data-placeholder", value);
      }
    }
  },
  mounted() {
    const imageResizeModules = [];
    if (this.showImgSize) {
      imageResizeModules.push("DisplaySize");
    }
    if (this.showImgToolbar) {
      imageResizeModules.push("Toolbar");
    }
    if (this.showImgResize) {
      imageResizeModules.push("Resize");
    }
    this.loadQuill(() => {
      if (imageResizeModules.length) {
        this.loadImageResizeModule(() => {
          this.initQuill(imageResizeModules);
        });
      } else {
        this.initQuill(imageResizeModules);
      }
    });
  },
  methods: {
    _handleSubscribe({
      type,
      data
    }) {
      const {options, callbackId} = data;
      const quill = this.quill;
      const Quill = window.Quill;
      let res;
      let range;
      let errMsg;
      if (this.quillReady) {
        switch (type) {
          case "format":
            {
              let {name = "", value = false} = options;
              range = quill.getSelection(true);
              let format = quill.getFormat(range)[name] || false;
              if (["bold", "italic", "underline", "strike", "ins"].includes(name)) {
                value = !format;
              } else if (name === "direction") {
                value = value === "rtl" && format ? false : value;
                const align2 = quill.getFormat(range).align;
                if (value === "rtl" && !align2) {
                  quill.format("align", "right", Quill.sources.USER);
                } else if (!value && align2 === "right") {
                  quill.format("align", false, Quill.sources.USER);
                }
              } else if (name === "indent") {
                const rtl = quill.getFormat(range).direction === "rtl";
                value = value === "+1";
                if (rtl) {
                  value = !value;
                }
                value = value ? "+1" : "-1";
              } else {
                if (name === "list") {
                  value = value === "check" ? "unchecked" : value;
                  format = format === "checked" ? "unchecked" : format;
                }
                value = format && format !== (value || false) || !format && value ? value : !format;
              }
              quill.format(name, value, Quill.sources.USER);
            }
            break;
          case "insertDivider":
            range = quill.getSelection(true);
            quill.insertText(range.index, "\n", Quill.sources.USER);
            quill.insertEmbed(range.index + 1, "divider", true, Quill.sources.USER);
            quill.setSelection(range.index + 2, Quill.sources.SILENT);
            break;
          case "insertImage":
            {
              range = quill.getSelection(true);
              const {src = "", alt = "", width = "", height = "", extClass = "", data: data2 = {}} = options;
              const path = this.$getRealPath(src);
              quill.insertEmbed(range.index, "image", path, Quill.sources.USER);
              const local = /^(file|blob):/.test(path) ? path : false;
              quill.formatText(range.index, 1, "data-local", local);
              quill.formatText(range.index, 1, "alt", alt);
              quill.formatText(range.index, 1, "width", width);
              quill.formatText(range.index, 1, "height", height);
              quill.formatText(range.index, 1, "class", extClass);
              quill.formatText(range.index, 1, "data-custom", Object.keys(data2).map((key) => `${key}=${data2[key]}`).join("&"));
              quill.setSelection(range.index + 1, Quill.sources.SILENT);
            }
            break;
          case "insertText":
            {
              range = quill.getSelection(true);
              const {text: text2 = ""} = options;
              quill.insertText(range.index, text2, Quill.sources.USER);
              quill.setSelection(range.index + text2.length, 0, Quill.sources.SILENT);
            }
            break;
          case "setContents":
            {
              const {delta, html} = options;
              if (typeof delta === "object") {
                quill.setContents(delta, Quill.sources.SILENT);
              } else if (typeof html === "string") {
                quill.setContents(this.html2delta(html), Quill.sources.SILENT);
              } else {
                errMsg = "contents is missing";
              }
            }
            break;
          case "getContents":
            res = this.getContents();
            break;
          case "clear":
            quill.setContents([]);
            break;
          case "removeFormat":
            {
              range = quill.getSelection(true);
              const parchment = Quill.import("parchment");
              if (range.length) {
                quill.removeFormat(range, Quill.sources.USER);
              } else {
                Object.keys(quill.getFormat(range)).forEach((key) => {
                  if (parchment.query(key, parchment.Scope.INLINE)) {
                    quill.format(key, false);
                  }
                });
              }
            }
            break;
          case "undo":
            quill.history.undo();
            break;
          case "redo":
            quill.history.redo();
            break;
        }
        this.updateStatus(range);
      } else {
        errMsg = "not ready";
      }
      if (callbackId) {
        UniViewJSBridge.publishHandler("onEditorMethodCallback", {
          callbackId,
          data: Object.assign({}, res, {
            errMsg: `${type}:${errMsg ? "fail " + errMsg : "ok"}`
          })
        }, this.$page.id);
      }
    },
    loadQuill(callback) {
      if (typeof window.Quill === "function") {
        if (typeof callback === "function") {
          callback();
        }
        return;
      }
      const script2 = document.createElement("script");
      script2.src = window.plus ? "./__uniappquill.js" : "https://unpkg.com/quill@1.3.7/dist/quill.min.js";
      document.body.appendChild(script2);
      script2.onload = callback;
    },
    loadImageResizeModule(callback) {
      if (typeof window.ImageResize === "function") {
        if (typeof callback === "function") {
          callback();
        }
        return;
      }
      const script2 = document.createElement("script");
      script2.src = window.plus ? "./__uniappquillimageresize.js" : "https://unpkg.com/quill-image-resize-mp@3.0.1/image-resize.min.js";
      document.body.appendChild(script2);
      script2.onload = callback;
    },
    initQuill(imageResizeModules) {
      const Quill = window.Quill;
      register(Quill);
      const options = {
        toolbar: false,
        readOnly: this.readOnly,
        placeholder: this.placeholder,
        modules: {}
      };
      if (imageResizeModules.length) {
        Quill.register("modules/ImageResize", window.ImageResize.default);
        options.modules.ImageResize = {
          modules: imageResizeModules
        };
      }
      const quill = this.quill = new Quill(this.$el, options);
      const $el = quill.root;
      const events = ["focus", "blur", "input"];
      events.forEach((name) => {
        $el.addEventListener(name, ($event) => {
          if (name === "input") {
            $event.stopPropagation();
          } else {
            this.$trigger(name, $event, this.getContents());
          }
        });
      });
      quill.on(Quill.events.TEXT_CHANGE, () => {
        this.$trigger("input", {}, this.getContents());
      });
      quill.on(Quill.events.SELECTION_CHANGE, this.updateStatus.bind(this));
      quill.on(Quill.events.SCROLL_OPTIMIZE, () => {
        const range = quill.selection.getRange()[0];
        this.updateStatus(range);
      });
      quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
        if (this.skipMatcher) {
          return delta;
        }
        delta.ops = delta.ops.filter(({insert}) => typeof insert === "string").map(({insert}) => ({insert}));
        return delta;
      });
      this.initKeyboard($el);
      this.quillReady = true;
      this.$trigger("ready", event, {});
    },
    getContents() {
      const quill = this.quill;
      const html = quill.root.innerHTML;
      const text2 = quill.getText();
      const delta = quill.getContents();
      return {
        html,
        text: text2,
        delta
      };
    },
    html2delta(html) {
      const tags = ["span", "strong", "b", "ins", "em", "i", "u", "a", "del", "s", "sub", "sup", "img", "div", "p", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "ol", "ul", "li", "br"];
      let content = "";
      let disable;
      HTMLParser(html, {
        start: function(tag, attrs, unary) {
          if (!tags.includes(tag)) {
            disable = !unary;
            return;
          }
          disable = false;
          const arrts = attrs.map(({name, value}) => `${name}="${value}"`).join(" ");
          const start = `<${tag} ${arrts} ${unary ? "/" : ""}>`;
          content += start;
        },
        end: function(tag) {
          if (!disable) {
            content += `</${tag}>`;
          }
        },
        chars: function(text2) {
          if (!disable) {
            content += text2;
          }
        }
      });
      this.skipMatcher = true;
      const delta = this.quill.clipboard.convert(content);
      this.skipMatcher = false;
      return delta;
    },
    updateStatus(range) {
      const status = range ? this.quill.getFormat(range) : {};
      const keys = Object.keys(status);
      if (keys.length !== Object.keys(this.__status || {}).length || keys.find((key) => status[key] !== this.__status[key])) {
        this.__status = status;
        this.$trigger("statuschange", {}, status);
      }
    }
  }
};
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-editor", mergeProps({
    id: $props.id,
    class: "ql-container"
  }, _ctx.$attrs), null, 16, ["id"]);
}
script$4.render = render$4;
var script$5 = {
  name: "Form",
  mixins: [listeners],
  data() {
    return {
      childrenList: []
    };
  },
  listeners: {
    "@form-submit": "_onSubmit",
    "@form-reset": "_onReset",
    "@form-group-update": "_formGroupUpdateHandler"
  },
  methods: {
    _onSubmit($event) {
      const data = {};
      this.childrenList.forEach((vm) => {
        if (vm._getFormData && vm._getFormData().key) {
          data[vm._getFormData().key] = vm._getFormData().value;
        }
      });
      this.$trigger("submit", $event, {
        value: data
      });
    },
    _onReset($event) {
      this.$trigger("reset", $event, {});
      this.childrenList.forEach((vm) => {
        vm._resetFormData && vm._resetFormData();
      });
    },
    _formGroupUpdateHandler($event) {
      if ($event.type === "add") {
        this.childrenList.push($event.vm);
      } else {
        const index = this.childrenList.indexOf($event.vm);
        this.childrenList.splice(index, 1);
      }
    }
  }
};
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-form", _ctx.$attrs, [
    createVNode("span", null, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 16);
}
script$5.render = render$5;
var script$6 = {
  name: "Icon",
  props: {
    type: {
      type: String,
      required: true,
      default: ""
    },
    size: {
      type: [String, Number],
      default: 23
    },
    color: {
      type: String,
      default: ""
    }
  },
  methods: {
    _converPx(value) {
      if (/^-?\d+[ur]px$/i.test(value)) {
        return value.replace(/(^-?\d+)[ur]px$/i, (text2, num) => {
          return `${uni.upx2px(parseFloat(num))}px`;
        });
      } else if (/^-?[\d\.]+$/.test(value)) {
        return `${value}px`;
      }
      return value || "";
    }
  }
};
function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-icon", _ctx.$attrs, [
    createVNode("i", {
      class: `uni-icon-${$props.type}`,
      style: {"font-size": $options._converPx($props.size), color: $props.color},
      role: "img"
    }, null, 6)
  ], 16);
}
script$6.render = render$6;
var script$7 = {
  name: "Image",
  props: {
    src: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      default: "scaleToFill"
    },
    lazyLoad: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      originalWidth: 0,
      originalHeight: 0,
      availHeight: ""
    };
  },
  computed: {
    ratio() {
      return this.originalWidth && this.originalHeight ? this.originalWidth / this.originalHeight : 0;
    },
    realImagePath() {
      return this.$getRealPath(this.src);
    },
    modeStyle() {
      let size = "auto";
      let position = "";
      const repeat = "no-repeat";
      switch (this.mode) {
        case "aspectFit":
          size = "contain";
          position = "center center";
          break;
        case "aspectFill":
          size = "cover";
          position = "center center";
          break;
        case "widthFix":
          size = "100% 100%";
          break;
        case "top":
          position = "center top";
          break;
        case "bottom":
          position = "center bottom";
          break;
        case "center":
          position = "center center";
          break;
        case "left":
          position = "left center";
          break;
        case "right":
          position = "right center";
          break;
        case "top left":
          position = "left top";
          break;
        case "top right":
          position = "right top";
          break;
        case "bottom left":
          position = "left bottom";
          break;
        case "bottom right":
          position = "right bottom";
          break;
        default:
          size = "100% 100%";
          position = "0% 0%";
          break;
      }
      return `background-position:${position};background-size:${size};background-repeat:${repeat};`;
    }
  },
  watch: {
    src(newValue, oldValue) {
      this._setContentImage();
      this._loadImage();
    },
    mode(newValue, oldValue) {
      if (oldValue === "widthFix") {
        this.$el.style.height = this.availHeight;
      }
      if (newValue === "widthFix" && this.ratio) {
        this._fixSize();
      }
    }
  },
  mounted() {
    this.availHeight = this.$el.style.height || "";
    this._setContentImage();
    if (!this.realImagePath) {
      return;
    }
    this._loadImage();
  },
  methods: {
    _resize() {
      if (this.mode === "widthFix") {
        this._fixSize();
      }
    },
    _fixSize() {
      const elWidth = this._getWidth();
      if (elWidth) {
        let height = elWidth / this.ratio;
        if (typeof navigator && navigator.vendor === "Google Inc." && height > 10) {
          height = Math.round(height / 2) * 2;
        }
        this.$el.style.height = height + "px";
      }
    },
    _setContentImage() {
      this.$refs.content.style.backgroundImage = this.src ? `url("${this.realImagePath}")` : "none";
    },
    _loadImage() {
      const _self = this;
      const img = new Image();
      img.onload = function($event) {
        _self.originalWidth = this.width;
        _self.originalHeight = this.height;
        if (_self.mode === "widthFix") {
          _self._fixSize();
        }
        _self.$trigger("load", $event, {
          width: this.width,
          height: this.height
        });
      };
      img.onerror = function($event) {
        _self.$trigger("error", $event, {
          errMsg: `GET ${_self.src} 404 (Not Found)`
        });
      };
      img.src = this.realImagePath;
    },
    _getWidth() {
      const computedStyle = window.getComputedStyle(this.$el);
      const borderWidth = (parseFloat(computedStyle.borderLeftWidth, 10) || 0) + (parseFloat(computedStyle.borderRightWidth, 10) || 0);
      const paddingWidth = (parseFloat(computedStyle.paddingLeft, 10) || 0) + (parseFloat(computedStyle.paddingRight, 10) || 0);
      return this.$el.offsetWidth - borderWidth - paddingWidth;
    }
  }
};
function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_resize_sensor = resolveComponent("v-uni-resize-sensor");
  return openBlock(), createBlock("uni-image", _ctx.$attrs, [
    createVNode("div", {
      ref: "content",
      style: $options.modeStyle
    }, null, 4),
    createVNode("img", {src: $options.realImagePath}, null, 8, ["src"]),
    $props.mode === "widthFix" ? (openBlock(), createBlock(_component_v_uni_resize_sensor, {
      key: 0,
      ref: "sensor",
      onResize: $options._resize
    }, null, 8, ["onResize"])) : createCommentVNode("", true)
  ], 16);
}
script$7.render = render$7;
const INPUT_TYPES = ["text", "number", "idcard", "digit", "password"];
const NUMBER_TYPES = ["number", "digit"];
var script$8 = {
  name: "Input",
  mixins: [baseInput],
  props: {
    name: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    password: {
      type: [Boolean, String],
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    placeholderStyle: {
      type: String,
      default: ""
    },
    placeholderClass: {
      type: String,
      default: "input-placeholder"
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    focus: {
      type: [Boolean, String],
      default: false
    },
    confirmType: {
      type: String,
      default: "done"
    }
  },
  data() {
    return {
      composing: false,
      wrapperHeight: 0,
      cachedValue: ""
    };
  },
  computed: {
    inputType: function() {
      let type = "";
      switch (this.type) {
        case "text":
          this.confirmType === "search" && (type = "search");
          break;
        case "idcard":
          type = "text";
          break;
        case "digit":
          type = "number";
          break;
        default:
          type = ~INPUT_TYPES.indexOf(this.type) ? this.type : "text";
          break;
      }
      return this.password ? "password" : type;
    },
    step() {
      return ~NUMBER_TYPES.indexOf(this.type) ? "0.000000000000000001" : "";
    }
  },
  watch: {
    focus(val) {
      this.$refs.input && this.$refs.input[val ? "focus" : "blur"]();
    },
    maxlength(value) {
      const realValue = this.valueSync.slice(0, parseInt(value, 10));
      realValue !== this.valueSync && (this.valueSync = realValue);
    }
  },
  created() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "add",
      vm: this
    });
  },
  mounted() {
    if (this.confirmType === "search") {
      const formElem = document.createElement("form");
      formElem.action = "";
      formElem.onsubmit = function() {
        return false;
      };
      formElem.className = "uni-input-form";
      formElem.appendChild(this.$refs.input);
      this.$refs.wrapper.appendChild(formElem);
    }
    let $vm = this;
    while ($vm) {
      const scopeId = $vm.$options._scopeId;
      if (scopeId) {
        this.$refs.placeholder.setAttribute(scopeId, "");
      }
      $vm = $vm.$parent;
    }
    this.initKeyboard(this.$refs.input);
  },
  beforeDestroy() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "remove",
      vm: this
    });
  },
  methods: {
    _onKeyup($event) {
      if ($event.keyCode === 13) {
        this.$trigger("confirm", $event, {
          value: $event.target.value
        });
      }
    },
    _onInput($event) {
      if (this.composing) {
        return;
      }
      if (~NUMBER_TYPES.indexOf(this.type)) {
        if (this.$refs.input.validity && !this.$refs.input.validity.valid) {
          $event.target.value = this.cachedValue;
          this.valueSync = $event.target.value;
          return;
        } else {
          this.cachedValue = this.valueSync;
        }
      }
      if (this.inputType === "number") {
        const maxlength = parseInt(this.maxlength, 10);
        if (maxlength > 0 && $event.target.value.length > maxlength) {
          $event.target.value = $event.target.value.slice(0, maxlength);
          this.valueSync = $event.target.value;
          return;
        }
      }
      this.$triggerInput($event, {
        value: this.valueSync
      });
    },
    _onFocus($event) {
      this.$trigger("focus", $event, {
        value: $event.target.value
      });
    },
    _onBlur($event) {
      this.$trigger("blur", $event, {
        value: $event.target.value
      });
    },
    _onComposition($event) {
      if ($event.type === "compositionstart") {
        this.composing = true;
      } else {
        this.composing = false;
      }
    },
    _resetFormData() {
      this.valueSync = "";
    },
    _getFormData() {
      return this.name ? {
        value: this.valueSync,
        key: this.name
      } : {};
    }
  }
};
const _hoisted_1$3 = {
  ref: "wrapper",
  class: "uni-input-wrapper"
};
function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-input", mergeProps({
    onChange: _cache[8] || (_cache[8] = withModifiers(() => {
    }, ["stop"]))
  }, _ctx.$attrs), [
    createVNode("div", _hoisted_1$3, [
      withDirectives(createVNode("div", {
        ref: "placeholder",
        style: $props.placeholderStyle,
        class: [$props.placeholderClass, "uni-input-placeholder"],
        textContent: toDisplayString($props.placeholder)
      }, null, 14, ["textContent"]), [
        [vShow, !($data.composing || _ctx.valueSync.length)]
      ]),
      withDirectives(createVNode("input", {
        ref: "input",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.valueSync = $event),
        disabled: $props.disabled,
        type: $options.inputType,
        maxlength: $props.maxlength,
        step: $options.step,
        autofocus: $props.focus,
        class: "uni-input-input",
        autocomplete: "off",
        onFocus: _cache[2] || (_cache[2] = (...args) => $options._onFocus && $options._onFocus(...args)),
        onBlur: _cache[3] || (_cache[3] = (...args) => $options._onBlur && $options._onBlur(...args)),
        onInput: _cache[4] || (_cache[4] = withModifiers((...args) => $options._onInput && $options._onInput(...args), ["stop"])),
        onCompositionstart: _cache[5] || (_cache[5] = (...args) => $options._onComposition && $options._onComposition(...args)),
        onCompositionend: _cache[6] || (_cache[6] = (...args) => $options._onComposition && $options._onComposition(...args)),
        onKeyup: _cache[7] || (_cache[7] = withModifiers((...args) => $options._onKeyup && $options._onKeyup(...args), ["stop"]))
      }, null, 40, ["disabled", "type", "maxlength", "step", "autofocus"]), [
        [vModelDynamic, _ctx.valueSync]
      ])
    ], 512)
  ], 16);
}
script$8.render = render$8;
var script$9 = {
  name: "Label",
  mixins: [emitter],
  props: {
    for: {
      type: String,
      default: ""
    }
  },
  computed: {
    pointer() {
      return this.for || this.$slots.default && this.$slots.default.length;
    }
  },
  methods: {
    _onClick($event) {
      let stopPropagation = /^uni-(checkbox|radio|switch)-/.test($event.target.className);
      if (!stopPropagation) {
        stopPropagation = /^uni-(checkbox|radio|switch|button)$/i.test($event.target.tagName);
      }
      if (stopPropagation) {
        return;
      }
      if (this.for) {
        UniViewJSBridge.emit("uni-label-click-" + this.$page.id + "-" + this.for, $event, true);
      } else {
        this.$broadcast(["Checkbox", "Radio", "Switch", "Button"], "uni-label-click", $event, true);
      }
    }
  }
};
function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-label", mergeProps({
    class: {"uni-label-pointer": $options.pointer}
  }, _ctx.$attrs, {
    onClick: _cache[1] || (_cache[1] = (...args) => $options._onClick && $options._onClick(...args))
  }), [
    renderSlot(_ctx.$slots, "default")
  ], 16);
}
script$9.render = render$9;
const addListenerToElement = function(element, type, callback, capture) {
  element.addEventListener(type, ($event) => {
    if (typeof callback === "function") {
      if (callback($event) === false) {
        $event.preventDefault();
        $event.stopPropagation();
      }
    }
  }, {
    passive: false
  });
};
var touchtrack = {
  beforeDestroy() {
    document.removeEventListener("mousemove", this.__mouseMoveEventListener);
    document.removeEventListener("mouseup", this.__mouseUpEventListener);
  },
  methods: {
    touchtrack: function(element, method, useCancel) {
      const self = this;
      let x0 = 0;
      let y0 = 0;
      let x1 = 0;
      let y1 = 0;
      const fn = function($event, state, x, y) {
        if (self[method]({
          target: $event.target,
          currentTarget: $event.currentTarget,
          preventDefault: $event.preventDefault.bind($event),
          stopPropagation: $event.stopPropagation.bind($event),
          touches: $event.touches,
          changedTouches: $event.changedTouches,
          detail: {
            state,
            x0: x,
            y0: y,
            dx: x - x0,
            dy: y - y0,
            ddx: x - x1,
            ddy: y - y1,
            timeStamp: $event.timeStamp
          }
        }) === false) {
          return false;
        }
      };
      let $eventOld = null;
      let hasTouchStart;
      let hasMouseDown;
      addListenerToElement(element, "touchstart", function($event) {
        hasTouchStart = true;
        if ($event.touches.length === 1 && !$eventOld) {
          $eventOld = $event;
          x0 = x1 = $event.touches[0].pageX;
          y0 = y1 = $event.touches[0].pageY;
          return fn($event, "start", x0, y0);
        }
      });
      addListenerToElement(element, "mousedown", function($event) {
        hasMouseDown = true;
        if (!hasTouchStart && !$eventOld) {
          $eventOld = $event;
          x0 = x1 = $event.pageX;
          y0 = y1 = $event.pageY;
          return fn($event, "start", x0, y0);
        }
      });
      addListenerToElement(element, "touchmove", function($event) {
        if ($event.touches.length === 1 && $eventOld) {
          const res = fn($event, "move", $event.touches[0].pageX, $event.touches[0].pageY);
          x1 = $event.touches[0].pageX;
          y1 = $event.touches[0].pageY;
          return res;
        }
      });
      const mouseMoveEventListener = this.__mouseMoveEventListener = function($event) {
        if (!hasTouchStart && hasMouseDown && $eventOld) {
          const res = fn($event, "move", $event.pageX, $event.pageY);
          x1 = $event.pageX;
          y1 = $event.pageY;
          return res;
        }
      };
      document.addEventListener("mousemove", mouseMoveEventListener);
      addListenerToElement(element, "touchend", function($event) {
        if ($event.touches.length === 0 && $eventOld) {
          hasTouchStart = false;
          $eventOld = null;
          return fn($event, "end", $event.changedTouches[0].pageX, $event.changedTouches[0].pageY);
        }
      });
      const mouseUpEventListener = this.__mouseUpEventListener = function($event) {
        hasMouseDown = false;
        if (!hasTouchStart && $eventOld) {
          $eventOld = null;
          return fn($event, "end", $event.pageX, $event.pageY);
        }
      };
      document.addEventListener("mouseup", mouseUpEventListener);
      addListenerToElement(element, "touchcancel", function($event) {
        if ($eventOld) {
          hasTouchStart = false;
          const $eventTemp = $eventOld;
          $eventOld = null;
          return fn($event, useCancel ? "cancel" : "end", $eventTemp.touches[0].pageX, $eventTemp.touches[0].pageY);
        }
      });
    }
  }
};
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
  var n = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
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
  var x = this._x_v * t2 + 0.5 * this._x_a * Math.pow(t2, 2) + this._x_s;
  var y = this._y_v * t2 + 0.5 * this._y_a * Math.pow(t2, 2) + this._y_s;
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
  var t2 = e(this.s().x, this._endPositionX) || e(this.s().y, this._endPositionY) || this._lastDt === this._t;
  this._lastDt = null;
  return t2;
};
Friction.prototype.setEnd = function(x, y) {
  this._endPositionX = x;
  this._endPositionY = y;
};
Friction.prototype.reconfigure = function(m, f2) {
  this._m = m;
  this._f = 1e3 * f2;
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
  var n = this._c;
  var i2 = this._m;
  var r = this._k;
  var o2 = n * n - 4 * i2 * r;
  if (o2 === 0) {
    const a2 = -n / (2 * i2);
    const s = e2;
    const l = t2 / (a2 * e2);
    return {
      x: function(e3) {
        return (s + l * e3) * Math.pow(Math.E, a2 * e3);
      },
      dx: function(e3) {
        var t3 = Math.pow(Math.E, a2 * e3);
        return a2 * (s + l * e3) * t3 + l * t3;
      }
    };
  }
  if (o2 > 0) {
    const c = (-n - Math.sqrt(o2)) / (2 * i2);
    const u = (-n + Math.sqrt(o2)) / (2 * i2);
    const d = (t2 - c * e2) / (u - c);
    const h = e2 - d;
    return {
      x: function(e3) {
        var t3;
        var n2;
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
        var t3;
        var n2;
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
  var p2 = Math.sqrt(4 * i2 * r - n * n) / (2 * i2);
  var f2 = -n / 2 * i2;
  var v2 = e2;
  var g2 = (t2 - f2 * e2) / p2;
  return {
    x: function(e3) {
      return Math.pow(Math.E, f2 * e3) * (v2 * Math.cos(p2 * e3) + g2 * Math.sin(p2 * e3));
    },
    dx: function(e3) {
      var t3 = Math.pow(Math.E, f2 * e3);
      var n2 = Math.cos(p2 * e3);
      var i3 = Math.sin(p2 * e3);
      return t3 * (g2 * p2 * n2 - v2 * p2 * i3) + f2 * t3 * (g2 * i3 + v2 * n2);
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
Spring.prototype.setEnd = function(e2, n, i2) {
  if (!i2) {
    i2 = new Date().getTime();
  }
  if (e2 !== this._endPosition || !t(n, 0.1)) {
    n = n || 0;
    var r = this._endPosition;
    if (this._solution) {
      if (t(n, 0.1)) {
        n = this._solution.dx((i2 - this._startTime) / 1e3);
      }
      r = this._solution.x((i2 - this._startTime) / 1e3);
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
      this._startTime = i2;
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
STD.prototype.setEnd = function(e2, t2, n, i2) {
  var r = new Date().getTime();
  this._springX.setEnd(e2, i2, r);
  this._springY.setEnd(t2, i2, r);
  this._springScale.setEnd(n, i2, r);
  this._startTime = r;
};
STD.prototype.x = function() {
  var e2 = (new Date().getTime() - this._startTime) / 1e3;
  return {
    x: this._springX.x(e2),
    y: this._springY.x(e2),
    scale: this._springScale.x(e2)
  };
};
STD.prototype.done = function() {
  var e2 = new Date().getTime();
  return this._springX.done(e2) && this._springY.done(e2) && this._springScale.done(e2);
};
STD.prototype.reconfigure = function(e2, t2, n) {
  this._springX.reconfigure(e2, t2, n);
  this._springY.reconfigure(e2, t2, n);
  this._springScale.reconfigure(e2, t2, n);
};
let view;
let pullToRefreshStyle;
let disabled;
const lastAction = {};
function disableScrollBounce({disable}) {
  function exec() {
    if (!view) {
      view = plus.webview.currentWebview();
    }
    if (!disabled) {
      pullToRefreshStyle = (view.getStyle() || {}).pullToRefresh || {};
    }
    disabled = disable;
    if (pullToRefreshStyle.support) {
      view.setPullToRefresh(Object.assign({}, pullToRefreshStyle, {
        support: !disable
      }));
    }
  }
  const time = Date.now();
  if (disable === lastAction.disable && time - lastAction.time < 20) {
    return;
  }
  lastAction.disable = disable;
  lastAction.time = time;
  plusReady(() => {
    if (plus.os.name === "iOS") {
      setTimeout(exec, 20);
    } else {
      exec();
    }
  });
}
var requesting = false;
function _requestAnimationFrame(e2) {
  if (!requesting) {
    requesting = true;
    requestAnimationFrame(function() {
      e2();
      requesting = false;
    });
  }
}
function p(t2, n) {
  if (t2 === n) {
    return 0;
  }
  var i2 = t2.offsetLeft;
  return t2.offsetParent ? i2 += p(t2.offsetParent, n) : 0;
}
function f(t2, n) {
  if (t2 === n) {
    return 0;
  }
  var i2 = t2.offsetTop;
  return t2.offsetParent ? i2 += f(t2.offsetParent, n) : 0;
}
function v(a2, b) {
  return +((1e3 * a2 - 1e3 * b) / 1e3).toFixed(1);
}
function g(e2, t2, n) {
  var i2 = function(e3) {
    if (e3 && e3.id) {
      cancelAnimationFrame(e3.id);
    }
    if (e3) {
      e3.cancelled = true;
    }
  };
  var r = {
    id: 0,
    cancelled: false
  };
  function fn(n2, i3, r2, o2) {
    if (!n2 || !n2.cancelled) {
      r2(i3);
      var a2 = e2.done();
      if (!a2) {
        if (!n2.cancelled) {
          n2.id = requestAnimationFrame(fn.bind(null, n2, i3, r2, o2));
        }
      }
      if (a2 && o2) {
        o2(i3);
      }
    }
  }
  fn(r, e2, t2, n);
  return {
    cancel: i2.bind(null, r),
    model: e2
  };
}
var script$a = {
  name: "MovableView",
  mixins: [touchtrack],
  props: {
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
  },
  data() {
    return {
      xSync: this._getPx(this.x),
      ySync: this._getPx(this.y),
      scaleValueSync: Number(this.scaleValue) || 1,
      width: 0,
      height: 0,
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0
    };
  },
  computed: {
    dampingNumber() {
      var val = Number(this.damping);
      return isNaN(val) ? 20 : val;
    },
    frictionNumber() {
      var val = Number(this.friction);
      return isNaN(val) || val <= 0 ? 2 : val;
    },
    scaleMinNumber() {
      var val = Number(this.scaleMin);
      return isNaN(val) ? 0.5 : val;
    },
    scaleMaxNumber() {
      var val = Number(this.scaleMax);
      return isNaN(val) ? 10 : val;
    },
    xMove() {
      return this.direction === "all" || this.direction === "horizontal";
    },
    yMove() {
      return this.direction === "all" || this.direction === "vertical";
    }
  },
  watch: {
    x(val) {
      this.xSync = this._getPx(val);
    },
    xSync(val) {
      this._setX(val);
    },
    y(val) {
      this.ySync = this._getPx(val);
    },
    ySync(val) {
      this._setY(val);
    },
    scaleValue(val) {
      this.scaleValueSync = Number(val) || 0;
    },
    scaleValueSync(val) {
      this._setScaleValue(val);
    },
    scaleMinNumber() {
      this._setScaleMinOrMax();
    },
    scaleMaxNumber() {
      this._setScaleMinOrMax();
    }
  },
  created: function() {
    this._offset = {
      x: 0,
      y: 0
    };
    this._scaleOffset = {
      x: 0,
      y: 0
    };
    this._translateX = 0;
    this._translateY = 0;
    this._scale = 1;
    this._oldScale = 1;
    this._STD = new STD(1, 9 * Math.pow(this.dampingNumber, 2) / 40, this.dampingNumber);
    this._friction = new Friction(1, this.frictionNumber);
    this._declineX = new Decline();
    this._declineY = new Decline();
    this.__touchInfo = {
      historyX: [0, 0],
      historyY: [0, 0],
      historyT: [0, 0]
    };
  },
  mounted: function() {
    this.touchtrack(this.$el, "_onTrack");
    this.setParent();
    this._friction.reconfigure(1, this.frictionNumber);
    this._STD.reconfigure(1, 9 * Math.pow(this.dampingNumber, 2) / 40, this.dampingNumber);
    this.$el.style.transformOrigin = "center";
  },
  methods: {
    _getPx(val) {
      if (/\d+[ur]px$/i.test(val)) {
        return uni.upx2px(parseFloat(val));
      }
      return Number(val) || 0;
    },
    _setX: function(val) {
      if (this.xMove) {
        if (val + this._scaleOffset.x === this._translateX) {
          return this._translateX;
        } else {
          if (this._SFA) {
            this._SFA.cancel();
          }
          this._animationTo(val + this._scaleOffset.x, this.ySync + this._scaleOffset.y, this._scale);
        }
      }
      return val;
    },
    _setY: function(val) {
      if (this.yMove) {
        if (val + this._scaleOffset.y === this._translateY) {
          return this._translateY;
        } else {
          if (this._SFA) {
            this._SFA.cancel();
          }
          this._animationTo(this.xSync + this._scaleOffset.x, val + this._scaleOffset.y, this._scale);
        }
      }
      return val;
    },
    _setScaleMinOrMax: function() {
      if (!this.scale) {
        return false;
      }
      this._updateScale(this._scale, true);
      this._updateOldScale(this._scale);
    },
    _setScaleValue: function(scale) {
      if (!this.scale) {
        return false;
      }
      scale = this._adjustScale(scale);
      this._updateScale(scale, true);
      this._updateOldScale(scale);
      return scale;
    },
    __handleTouchStart: function() {
      if (!this._isScaling) {
        if (!this.disabled) {
          disableScrollBounce({
            disable: true
          });
          if (this._FA) {
            this._FA.cancel();
          }
          if (this._SFA) {
            this._SFA.cancel();
          }
          this.__touchInfo.historyX = [0, 0];
          this.__touchInfo.historyY = [0, 0];
          this.__touchInfo.historyT = [0, 0];
          if (this.xMove) {
            this.__baseX = this._translateX;
          }
          if (this.yMove) {
            this.__baseY = this._translateY;
          }
          this.$el.style.willChange = "transform";
          this._checkCanMove = null;
          this._firstMoveDirection = null;
          this._isTouching = true;
        }
      }
    },
    __handleTouchMove: function(event2) {
      var self = this;
      if (!this._isScaling && !this.disabled && this._isTouching) {
        let x = this._translateX;
        let y = this._translateY;
        if (this._firstMoveDirection === null) {
          this._firstMoveDirection = Math.abs(event2.detail.dx / event2.detail.dy) > 1 ? "htouchmove" : "vtouchmove";
        }
        if (this.xMove) {
          x = event2.detail.dx + this.__baseX;
          this.__touchInfo.historyX.shift();
          this.__touchInfo.historyX.push(x);
          if (!this.yMove && this._checkCanMove === null) {
            this._checkCanMove = Math.abs(event2.detail.dx / event2.detail.dy) < 1;
          }
        }
        if (this.yMove) {
          y = event2.detail.dy + this.__baseY;
          this.__touchInfo.historyY.shift();
          this.__touchInfo.historyY.push(y);
          if (!this.xMove && this._checkCanMove === null) {
            this._checkCanMove = Math.abs(event2.detail.dy / event2.detail.dx) < 1;
          }
        }
        this.__touchInfo.historyT.shift();
        this.__touchInfo.historyT.push(event2.detail.timeStamp);
        if (!this._checkCanMove) {
          event2.preventDefault();
          let source = "touch";
          if (x < this.minX) {
            if (this.outOfBounds) {
              source = "touch-out-of-bounds";
              x = this.minX - this._declineX.x(this.minX - x);
            } else {
              x = this.minX;
            }
          } else if (x > this.maxX) {
            if (this.outOfBounds) {
              source = "touch-out-of-bounds";
              x = this.maxX + this._declineX.x(x - this.maxX);
            } else {
              x = this.maxX;
            }
          }
          if (y < this.minY) {
            if (this.outOfBounds) {
              source = "touch-out-of-bounds";
              y = this.minY - this._declineY.x(this.minY - y);
            } else {
              y = this.minY;
            }
          } else {
            if (y > this.maxY) {
              if (this.outOfBounds) {
                source = "touch-out-of-bounds";
                y = this.maxY + this._declineY.x(y - this.maxY);
              } else {
                y = this.maxY;
              }
            }
          }
          _requestAnimationFrame(function() {
            self._setTransform(x, y, self._scale, source);
          });
        }
      }
    },
    __handleTouchEnd: function() {
      var self = this;
      if (!this._isScaling && !this.disabled && this._isTouching) {
        disableScrollBounce({
          disable: false
        });
        this.$el.style.willChange = "auto";
        this._isTouching = false;
        if (!this._checkCanMove && !this._revise("out-of-bounds") && this.inertia) {
          const xv = 1e3 * (this.__touchInfo.historyX[1] - this.__touchInfo.historyX[0]) / (this.__touchInfo.historyT[1] - this.__touchInfo.historyT[0]);
          const yv = 1e3 * (this.__touchInfo.historyY[1] - this.__touchInfo.historyY[0]) / (this.__touchInfo.historyT[1] - this.__touchInfo.historyT[0]);
          this._friction.setV(xv, yv);
          this._friction.setS(this._translateX, this._translateY);
          const x0 = this._friction.delta().x;
          const y0 = this._friction.delta().y;
          let x = x0 + this._translateX;
          let y = y0 + this._translateY;
          if (x < this.minX) {
            x = this.minX;
            y = this._translateY + (this.minX - this._translateX) * y0 / x0;
          } else {
            if (x > this.maxX) {
              x = this.maxX;
              y = this._translateY + (this.maxX - this._translateX) * y0 / x0;
            }
          }
          if (y < this.minY) {
            y = this.minY;
            x = this._translateX + (this.minY - this._translateY) * x0 / y0;
          } else {
            if (y > this.maxY) {
              y = this.maxY;
              x = this._translateX + (this.maxY - this._translateY) * x0 / y0;
            }
          }
          this._friction.setEnd(x, y);
          this._FA = g(this._friction, function() {
            var t2 = self._friction.s();
            var x2 = t2.x;
            var y2 = t2.y;
            self._setTransform(x2, y2, self._scale, "friction");
          }, function() {
            self._FA.cancel();
          });
        }
      }
    },
    _onTrack: function(event2) {
      switch (event2.detail.state) {
        case "start":
          this.__handleTouchStart();
          break;
        case "move":
          this.__handleTouchMove(event2);
          break;
        case "end":
          this.__handleTouchEnd();
      }
    },
    _getLimitXY: function(x, y) {
      var outOfBounds = false;
      if (x > this.maxX) {
        x = this.maxX;
        outOfBounds = true;
      } else {
        if (x < this.minX) {
          x = this.minX;
          outOfBounds = true;
        }
      }
      if (y > this.maxY) {
        y = this.maxY;
        outOfBounds = true;
      } else {
        if (y < this.minY) {
          y = this.minY;
          outOfBounds = true;
        }
      }
      return {
        x,
        y,
        outOfBounds
      };
    },
    setParent: function() {
      if (!this.$parent._isMounted) {
        return;
      }
      if (this._FA) {
        this._FA.cancel();
      }
      if (this._SFA) {
        this._SFA.cancel();
      }
      var scale = this.scale ? this.scaleValueSync : 1;
      this._updateOffset();
      this._updateWH(scale);
      this._updateBoundary();
      this._translateX = this.xSync + this._scaleOffset.x;
      this._translateY = this.ySync + this._scaleOffset.y;
      var limitXY = this._getLimitXY(this._translateX, this._translateY);
      var x = limitXY.x;
      var y = limitXY.y;
      this._setTransform(x, y, scale, "", true);
      this._updateOldScale(scale);
    },
    _updateOffset: function() {
      this._offset.x = p(this.$el, this.$parent.$el);
      this._offset.y = f(this.$el, this.$parent.$el);
    },
    _updateWH: function(scale) {
      scale = scale || this._scale;
      scale = this._adjustScale(scale);
      var rect = this.$el.getBoundingClientRect();
      this.height = rect.height / this._scale;
      this.width = rect.width / this._scale;
      var height = this.height * scale;
      var width = this.width * scale;
      this._scaleOffset.x = (width - this.width) / 2;
      this._scaleOffset.y = (height - this.height) / 2;
    },
    _updateBoundary: function() {
      var x = 0 - this._offset.x + this._scaleOffset.x;
      var width = this.$parent.width - this.width - this._offset.x - this._scaleOffset.x;
      this.minX = Math.min(x, width);
      this.maxX = Math.max(x, width);
      var y = 0 - this._offset.y + this._scaleOffset.y;
      var height = this.$parent.height - this.height - this._offset.y - this._scaleOffset.y;
      this.minY = Math.min(y, height);
      this.maxY = Math.max(y, height);
    },
    _beginScale: function() {
      this._isScaling = true;
    },
    _endScale: function() {
      this._isScaling = false;
      this._updateOldScale(this._scale);
    },
    _setScale: function(scale) {
      if (this.scale) {
        scale = this._adjustScale(scale);
        scale = this._oldScale * scale;
        this._beginScale();
        this._updateScale(scale);
      }
    },
    _updateScale: function(scale, animat) {
      var self = this;
      if (this.scale) {
        scale = this._adjustScale(scale);
        this._updateWH(scale);
        this._updateBoundary();
        const limitXY = this._getLimitXY(this._translateX, this._translateY);
        const x = limitXY.x;
        const y = limitXY.y;
        if (animat) {
          this._animationTo(x, y, scale, "", true, true);
        } else {
          _requestAnimationFrame(function() {
            self._setTransform(x, y, scale, "", true, true);
          });
        }
      }
    },
    _updateOldScale: function(scale) {
      this._oldScale = scale;
    },
    _adjustScale: function(scale) {
      scale = Math.max(0.5, this.scaleMinNumber, scale);
      scale = Math.min(10, this.scaleMaxNumber, scale);
      return scale;
    },
    _animationTo: function(x, y, scale, source, r, o2) {
      var self = this;
      if (this._FA) {
        this._FA.cancel();
      }
      if (this._SFA) {
        this._SFA.cancel();
      }
      if (!this.xMove) {
        x = this._translateX;
      }
      if (!this.yMove) {
        y = this._translateY;
      }
      if (!this.scale) {
        scale = this._scale;
      }
      var limitXY = this._getLimitXY(x, y);
      x = limitXY.x;
      y = limitXY.y;
      if (!this.animation) {
        this._setTransform(x, y, scale, source, r, o2);
        return;
      }
      this._STD._springX._solution = null;
      this._STD._springY._solution = null;
      this._STD._springScale._solution = null;
      this._STD._springX._endPosition = this._translateX;
      this._STD._springY._endPosition = this._translateY;
      this._STD._springScale._endPosition = this._scale;
      this._STD.setEnd(x, y, scale, 1);
      this._SFA = g(this._STD, function() {
        var data = self._STD.x();
        var x2 = data.x;
        var y2 = data.y;
        var scale2 = data.scale;
        self._setTransform(x2, y2, scale2, source, r, o2);
      }, function() {
        self._SFA.cancel();
      });
    },
    _revise: function(source) {
      var limitXY = this._getLimitXY(this._translateX, this._translateY);
      var x = limitXY.x;
      var y = limitXY.y;
      var outOfBounds = limitXY.outOfBounds;
      if (outOfBounds) {
        this._animationTo(x, y, this._scale, source);
      }
      return outOfBounds;
    },
    _setTransform: function(x, y, scale, source = "", r, o2) {
      if (!(x !== null && x.toString() !== "NaN" && typeof x === "number")) {
        x = this._translateX || 0;
      }
      if (!(y !== null && y.toString() !== "NaN" && typeof y === "number")) {
        y = this._translateY || 0;
      }
      x = Number(x.toFixed(1));
      y = Number(y.toFixed(1));
      scale = Number(scale.toFixed(1));
      if (!(this._translateX === x && this._translateY === y)) {
        if (!r) {
          this.$trigger("change", {}, {
            x: v(x, this._scaleOffset.x),
            y: v(y, this._scaleOffset.y),
            source
          });
        }
      }
      if (!this.scale) {
        scale = this._scale;
      }
      scale = this._adjustScale(scale);
      scale = +scale.toFixed(3);
      if (o2 && scale !== this._scale) {
        this.$trigger("scale", {}, {
          x,
          y,
          scale
        });
      }
      var transform = "translateX(" + x + "px) translateY(" + y + "px) translateZ(0px) scale(" + scale + ")";
      this.$el.style.transform = transform;
      this.$el.style.webkitTransform = transform;
      this._translateX = x;
      this._translateY = y;
      this._scale = scale;
    }
  }
};
function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_resize_sensor = resolveComponent("v-uni-resize-sensor");
  return openBlock(), createBlock("uni-movable-view", _ctx.$attrs, [
    createVNode(_component_v_uni_resize_sensor, {onResize: $options.setParent}, null, 8, ["onResize"]),
    renderSlot(_ctx.$slots, "default")
  ], 16);
}
script$a.render = render$a;
const OPEN_TYPES = ["navigate", "redirect", "switchTab", "reLaunch", "navigateBack"];
var script$b = {
  name: "Navigator",
  mixins: [hover],
  props: {
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
        return ~OPEN_TYPES.indexOf(value);
      }
    },
    delta: {
      type: Number,
      default: 1
    },
    hoverStartTime: {
      type: [Number, String],
      default: 20
    },
    hoverStayTime: {
      type: [Number, String],
      default: 600
    }
  },
  methods: {
    _onClick($event) {
      if (this.openType !== "navigateBack" && !this.url) {
        console.error("<navigator/> should have url attribute when using navigateTo, redirectTo, reLaunch or switchTab");
        return;
      }
      switch (this.openType) {
        case "navigate":
          uni.navigateTo({
            url: this.url
          });
          break;
        case "redirect":
          uni.redirectTo({
            url: this.url
          });
          break;
        case "switchTab":
          uni.switchTab({
            url: this.url
          });
          break;
        case "reLaunch":
          uni.reLaunch({
            url: this.url
          });
          break;
        case "navigateBack":
          uni.navigateBack({
            delta: this.delta
          });
          break;
      }
    }
  }
};
function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.hoverClass && $props.hoverClass !== "none" ? (openBlock(), createBlock("uni-navigator", mergeProps({
    key: 0,
    class: [_ctx.hovering ? $props.hoverClass : ""],
    onTouchstart: _cache[1] || (_cache[1] = (...args) => _ctx._hoverTouchStart && _ctx._hoverTouchStart(...args)),
    onTouchend: _cache[2] || (_cache[2] = (...args) => _ctx._hoverTouchEnd && _ctx._hoverTouchEnd(...args)),
    onTouchcancel: _cache[3] || (_cache[3] = (...args) => _ctx._hoverTouchCancel && _ctx._hoverTouchCancel(...args)),
    onClick: _cache[4] || (_cache[4] = (...args) => $options._onClick && $options._onClick(...args))
  }, _ctx.$attrs), [
    renderSlot(_ctx.$slots, "default")
  ], 16)) : (openBlock(), createBlock("uni-navigator", mergeProps({
    key: 1,
    onClick: _cache[5] || (_cache[5] = (...args) => $options._onClick && $options._onClick(...args))
  }, _ctx.$attrs), [
    renderSlot(_ctx.$slots, "default")
  ], 16));
}
script$b.render = render$b;
const VALUES = {
  activeColor: "#007AFF",
  backgroundColor: "#EBEBEB",
  activeMode: "backwards"
};
var script$c = {
  name: "Progress",
  props: {
    percent: {
      type: [Number, String],
      default: 0,
      validator(value) {
        return !isNaN(parseFloat(value, 10));
      }
    },
    showInfo: {
      type: [Boolean, String],
      default: false
    },
    strokeWidth: {
      type: [Number, String],
      default: 6,
      validator(value) {
        return !isNaN(parseFloat(value, 10));
      }
    },
    color: {
      type: String,
      default: VALUES.activeColor
    },
    activeColor: {
      type: String,
      default: VALUES.activeColor
    },
    backgroundColor: {
      type: String,
      default: VALUES.backgroundColor
    },
    active: {
      type: [Boolean, String],
      default: false
    },
    activeMode: {
      type: String,
      default: VALUES.activeMode
    }
  },
  data() {
    return {
      currentPercent: 0,
      strokeTimer: 0,
      lastPercent: 0
    };
  },
  computed: {
    outerBarStyle() {
      return `background-color: ${this.backgroundColor}; height: ${this.strokeWidth}px;`;
    },
    innerBarStyle() {
      let backgroundColor = "";
      if (this.color !== VALUES.activeColor && this.activeColor === VALUES.activeColor) {
        backgroundColor = this.color;
      } else {
        backgroundColor = this.activeColor;
      }
      return `width: ${this.currentPercent}%;background-color: ${backgroundColor}`;
    },
    realPercent() {
      let realValue = parseFloat(this.percent, 10);
      realValue < 0 && (realValue = 0);
      realValue > 100 && (realValue = 100);
      return realValue;
    }
  },
  watch: {
    realPercent(newValue, oldValue) {
      this.strokeTimer && clearInterval(this.strokeTimer);
      this.lastPercent = oldValue || 0;
      this._activeAnimation();
    }
  },
  created() {
    this._activeAnimation();
  },
  methods: {
    _activeAnimation() {
      if (this.active) {
        this.currentPercent = this.activeMode === VALUES.activeMode ? 0 : this.lastPercent;
        this.strokeTimer = setInterval(() => {
          if (this.currentPercent + 1 > this.realPercent) {
            this.currentPercent = this.realPercent;
            this.strokeTimer && clearInterval(this.strokeTimer);
          } else {
            this.currentPercent += 1;
          }
        }, 30);
      } else {
        this.currentPercent = this.realPercent;
      }
    }
  }
};
const _hoisted_1$4 = {
  key: 0,
  class: "uni-progress-info"
};
function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-progress", mergeProps({class: "uni-progress"}, _ctx.$attrs), [
    createVNode("div", {
      style: $options.outerBarStyle,
      class: "uni-progress-bar"
    }, [
      createVNode("div", {
        style: $options.innerBarStyle,
        class: "uni-progress-inner-bar"
      }, null, 4)
    ], 4),
    $props.showInfo ? (openBlock(), createBlock("p", _hoisted_1$4, toDisplayString($data.currentPercent) + "% ", 1)) : createCommentVNode("", true)
  ], 16);
}
script$c.render = render$c;
var script$d = {
  name: "Radio",
  mixins: [emitter, listeners],
  props: {
    checked: {
      type: [Boolean, String],
      default: false
    },
    id: {
      type: String,
      default: ""
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: "#007AFF"
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      radioChecked: this.checked,
      radioValue: this.value
    };
  },
  computed: {
    checkedStyle() {
      return `background-color: ${this.color};border-color: ${this.color};`;
    }
  },
  watch: {
    checked(val) {
      this.radioChecked = val;
    },
    value(val) {
      this.radioValue = val;
    }
  },
  listeners: {
    "label-click": "_onClick",
    "@label-click": "_onClick"
  },
  created() {
    this.$dispatch("RadioGroup", "uni-radio-group-update", {
      type: "add",
      vm: this
    });
    this.$dispatch("Form", "uni-form-group-update", {
      type: "add",
      vm: this
    });
  },
  beforeDestroy() {
    this.$dispatch("RadioGroup", "uni-radio-group-update", {
      type: "remove",
      vm: this
    });
    this.$dispatch("Form", "uni-form-group-update", {
      type: "remove",
      vm: this
    });
  },
  methods: {
    _onClick($event) {
      if (this.disabled || this.radioChecked) {
        return;
      }
      this.radioChecked = true;
      this.$dispatch("RadioGroup", "uni-radio-change", $event, this);
    },
    _resetFormData() {
      this.radioChecked = this.min;
    }
  }
};
const _hoisted_1$5 = {class: "uni-radio-wrapper"};
function render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-radio", mergeProps({disabled: $props.disabled}, _ctx.$attrs, {
    onClick: _cache[1] || (_cache[1] = (...args) => $options._onClick && $options._onClick(...args))
  }), [
    createVNode("div", _hoisted_1$5, [
      createVNode("div", {
        class: [$data.radioChecked ? "uni-radio-input-checked" : "", "uni-radio-input"],
        style: $data.radioChecked ? $options.checkedStyle : ""
      }, null, 6),
      renderSlot(_ctx.$slots, "default")
    ])
  ], 16, ["disabled"]);
}
script$d.render = render$d;
var script$e = {
  name: "RadioGroup",
  mixins: [emitter, listeners],
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      radioList: []
    };
  },
  listeners: {
    "@radio-change": "_changeHandler",
    "@radio-group-update": "_radioGroupUpdateHandler"
  },
  mounted() {
    this._resetRadioGroupValue(this.radioList.length - 1);
  },
  created() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "add",
      vm: this
    });
  },
  beforeDestroy() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "remove",
      vm: this
    });
  },
  methods: {
    _changeHandler($event, vm) {
      const index = this.radioList.indexOf(vm);
      this._resetRadioGroupValue(index, true);
      this.$trigger("change", $event, {
        value: vm.radioValue
      });
    },
    _radioGroupUpdateHandler($event) {
      if ($event.type === "add") {
        this.radioList.push($event.vm);
      } else {
        const index = this.radioList.indexOf($event.vm);
        this.radioList.splice(index, 1);
      }
    },
    _resetRadioGroupValue(key, change) {
      this.radioList.forEach((value, index) => {
        if (index === key) {
          return;
        }
        if (change) {
          this.radioList[index].radioChecked = false;
        } else {
          this.radioList.forEach((v2, i2) => {
            if (index >= i2) {
              return;
            }
            if (this.radioList[i2].radioChecked) {
              this.radioList[index].radioChecked = false;
            }
          });
        }
      });
    },
    _getFormData() {
      const data = {};
      if (this.name !== "") {
        let value = "";
        this.radioList.forEach((vm) => {
          if (vm.radioChecked) {
            value = vm.value;
          }
        });
        data.value = value;
        data.key = this.name;
      }
      return data;
    }
  }
};
function render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-radio-group", _ctx.$attrs, [
    renderSlot(_ctx.$slots, "default")
  ], 16);
}
script$e.render = render$e;
var script$f = {
  name: "ResizeSensor",
  props: {
    initial: {
      type: [Boolean, String],
      default: false
    }
  },
  data: function() {
    return {
      size: {
        width: -1,
        height: -1
      }
    };
  },
  watch: {
    size: {
      deep: true,
      handler: function(size) {
        this.$emit("resize", Object.assign({}, size));
      }
    }
  },
  mounted: function() {
    if (this.initial === true) {
      this.$nextTick(this.update);
    }
    if (this.$el.offsetParent !== this.$el.parentNode) {
      this.$el.parentNode.style.position = "relative";
    }
    if (!("AnimationEvent" in window)) {
      this.reset();
    }
  },
  methods: {
    reset: function() {
      var expand = this.$el.firstChild;
      var shrink = this.$el.lastChild;
      expand.scrollLeft = 1e5;
      expand.scrollTop = 1e5;
      shrink.scrollLeft = 1e5;
      shrink.scrollTop = 1e5;
    },
    update: function() {
      this.size.width = this.$el.offsetWidth;
      this.size.height = this.$el.offsetHeight;
      this.reset();
    }
  },
  render: function(create) {
    return create("uni-resize-sensor", {
      on: {
        "~animationstart": this.update
      }
    }, [
      create("div", {
        on: {
          scroll: this.update
        }
      }, [
        create("div")
      ]),
      create("div", {
        on: {
          scroll: this.update
        }
      }, [
        create("div")
      ])
    ]);
  }
};
function removeDOCTYPE(html) {
  return html.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*>\n/, "").replace(/<!DOCTYPE.*>\n/, "");
}
function parseAttrs(attrs) {
  return attrs.reduce(function(pre, attr2) {
    let value = attr2.value;
    const name = attr2.name;
    if (value.match(/ /) && name !== "style") {
      value = value.split(" ");
    }
    if (pre[name]) {
      if (Array.isArray(pre[name])) {
        pre[name].push(value);
      } else {
        pre[name] = [pre[name], value];
      }
    } else {
      pre[name] = value;
    }
    return pre;
  }, {});
}
function parseHtml(html) {
  html = removeDOCTYPE(html);
  const stacks = [];
  const results = {
    node: "root",
    children: []
  };
  HTMLParser(html, {
    start: function(tag, attrs, unary) {
      const node = {
        name: tag
      };
      if (attrs.length !== 0) {
        node.attrs = parseAttrs(attrs);
      }
      if (unary) {
        const parent = stacks[0] || results;
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      } else {
        stacks.unshift(node);
      }
    },
    end: function(tag) {
      const node = stacks.shift();
      if (node.name !== tag)
        console.error("invalid state: mismatch end tag");
      if (stacks.length === 0) {
        results.children.push(node);
      } else {
        const parent = stacks[0];
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    },
    chars: function(text2) {
      const node = {
        type: "text",
        text: text2
      };
      if (stacks.length === 0) {
        results.children.push(node);
      } else {
        const parent = stacks[0];
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    },
    comment: function(text2) {
      const node = {
        node: "comment",
        text: text2
      };
      const parent = stacks[0];
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(node);
    }
  });
  return results.children;
}
const TAGS = {
  a: "",
  abbr: "",
  b: "",
  blockquote: "",
  br: "",
  code: "",
  col: ["span", "width"],
  colgroup: ["span", "width"],
  dd: "",
  del: "",
  div: "",
  dl: "",
  dt: "",
  em: "",
  fieldset: "",
  h1: "",
  h2: "",
  h3: "",
  h4: "",
  h5: "",
  h6: "",
  hr: "",
  i: "",
  img: ["alt", "src", "height", "width"],
  ins: "",
  label: "",
  legend: "",
  li: "",
  ol: ["start", "type"],
  p: "",
  q: "",
  span: "",
  strong: "",
  sub: "",
  sup: "",
  table: ["width"],
  tbody: "",
  td: ["colspan", "rowspan", "height", "width"],
  tfoot: "",
  th: ["colspan", "rowspan", "height", "width"],
  thead: "",
  tr: "",
  ul: ""
};
const CHARS = {
  amp: "&",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
  apos: "'"
};
function decodeEntities(htmlString) {
  return htmlString.replace(/&(([a-zA-Z]+)|(#x{0,1}[\da-zA-Z]+));/gi, function(match, stage) {
    if (hasOwn(CHARS, stage) && CHARS[stage]) {
      return CHARS[stage];
    }
    if (/^#[0-9]{1,4}$/.test(stage)) {
      return String.fromCharCode(stage.slice(1));
    }
    if (/^#x[0-9a-f]{1,4}$/i.test(stage)) {
      return String.fromCharCode("0" + stage.slice(1));
    }
    const wrap = document.createElement("div");
    wrap.innerHTML = match;
    return wrap.innerText || wrap.textContent;
  });
}
function parseNodes(nodes, parentNode) {
  nodes.forEach(function(node) {
    if (!isPlainObject(node)) {
      return;
    }
    if (!hasOwn(node, "type") || node.type === "node") {
      if (!(typeof node.name === "string" && node.name)) {
        return;
      }
      const tagName = node.name.toLowerCase();
      if (!hasOwn(TAGS, tagName)) {
        return;
      }
      const elem = document.createElement(tagName);
      if (!elem) {
        return;
      }
      const attrs = node.attrs;
      if (isPlainObject(attrs)) {
        const tagAttrs = TAGS[tagName] || [];
        Object.keys(attrs).forEach(function(name) {
          let value = attrs[name];
          switch (name) {
            case "class":
              Array.isArray(value) && (value = value.join(" "));
            case "style":
              elem.setAttribute(name, value);
              break;
            default:
              if (tagAttrs.indexOf(name) !== -1) {
                elem.setAttribute(name, value);
              }
          }
        });
      }
      const children = node.children;
      if (Array.isArray(children) && children.length) {
        parseNodes(node.children, elem);
      }
      parentNode.appendChild(elem);
    } else {
      if (node.type === "text" && typeof node.text === "string" && node.text !== "") {
        parentNode.appendChild(document.createTextNode(decodeEntities(node.text)));
      }
    }
  });
  return parentNode;
}
var script$g = {
  name: "RichText",
  props: {
    nodes: {
      type: [Array, String],
      default: function() {
        return [];
      }
    }
  },
  watch: {
    nodes(value) {
      this._renderNodes(value);
    }
  },
  mounted() {
    this._renderNodes(this.nodes);
  },
  methods: {
    _renderNodes(nodes) {
      if (typeof nodes === "string") {
        nodes = parseHtml(nodes);
      }
      const nodeList = parseNodes(nodes, document.createDocumentFragment());
      this.$el.firstChild.innerHTML = "";
      this.$el.firstChild.appendChild(nodeList);
    }
  }
};
const _hoisted_1$6 = /* @__PURE__ */ createVNode("div", null, null, -1);
function render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-rich-text", _ctx.$attrs, [
    _hoisted_1$6
  ], 16);
}
script$g.render = render$f;
function Friction$1(e2) {
  this._drag = e2;
  this._dragLog = Math.log(e2);
  this._x = 0;
  this._v = 0;
  this._startTime = 0;
}
Friction$1.prototype.set = function(e2, t2) {
  this._x = e2;
  this._v = t2;
  this._startTime = new Date().getTime();
};
Friction$1.prototype.setVelocityByEnd = function(e2) {
  this._v = (e2 - this._x) * this._dragLog / (Math.pow(this._drag, 100) - 1);
};
Friction$1.prototype.x = function(e2) {
  if (e2 === void 0) {
    e2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  var t2;
  t2 = e2 === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e2);
  this._dt = e2;
  return this._x + this._v * t2 / this._dragLog - this._v / this._dragLog;
};
Friction$1.prototype.dx = function(e2) {
  if (e2 === void 0) {
    e2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  var t2;
  t2 = e2 === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e2);
  this._dt = e2;
  return this._v * t2;
};
Friction$1.prototype.done = function() {
  return Math.abs(this.dx()) < 3;
};
Friction$1.prototype.reconfigure = function(e2) {
  var t2 = this.x();
  var n = this.dx();
  this._drag = e2;
  this._dragLog = Math.log(e2);
  this.set(t2, n);
};
Friction$1.prototype.configuration = function() {
  var e2 = this;
  return [
    {
      label: "Friction",
      read: function() {
        return e2._drag;
      },
      write: function(t2) {
        e2.reconfigure(t2);
      },
      min: 1e-3,
      max: 0.1,
      step: 1e-3
    }
  ];
};
function o(e2, t2, n) {
  return e2 > t2 - n && e2 < t2 + n;
}
function a(e2, t2) {
  return o(e2, 0, t2);
}
function Spring$1(e2, t2, n) {
  this._m = e2;
  this._k = t2;
  this._c = n;
  this._solution = null;
  this._endPosition = 0;
  this._startTime = 0;
}
Spring$1.prototype._solve = function(e2, t2) {
  var n = this._c;
  var i2 = this._m;
  var r = this._k;
  var o2 = n * n - 4 * i2 * r;
  if (o2 === 0) {
    const a3 = -n / (2 * i2);
    const s2 = e2;
    const l2 = t2 / (a3 * e2);
    return {
      x: function(e3) {
        return (s2 + l2 * e3) * Math.pow(Math.E, a3 * e3);
      },
      dx: function(e3) {
        var t3 = Math.pow(Math.E, a3 * e3);
        return a3 * (s2 + l2 * e3) * t3 + l2 * t3;
      }
    };
  }
  if (o2 > 0) {
    const c = (-n - Math.sqrt(o2)) / (2 * i2);
    const u = (-n + Math.sqrt(o2)) / (2 * i2);
    const l2 = (t2 - c * e2) / (u - c);
    const s2 = e2 - l2;
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
        return s2 * t3 + l2 * n2;
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
        return s2 * c * t3 + l2 * u * n2;
      }
    };
  }
  var d = Math.sqrt(4 * i2 * r - n * n) / (2 * i2);
  var a2 = -n / 2 * i2;
  var s = e2;
  var l = (t2 - a2 * e2) / d;
  return {
    x: function(e3) {
      return Math.pow(Math.E, a2 * e3) * (s * Math.cos(d * e3) + l * Math.sin(d * e3));
    },
    dx: function(e3) {
      var t3 = Math.pow(Math.E, a2 * e3);
      var n2 = Math.cos(d * e3);
      var i3 = Math.sin(d * e3);
      return t3 * (l * d * n2 - s * d * i3) + a2 * t3 * (l * i3 + s * n2);
    }
  };
};
Spring$1.prototype.x = function(e2) {
  if (e2 === void 0) {
    e2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  return this._solution ? this._endPosition + this._solution.x(e2) : 0;
};
Spring$1.prototype.dx = function(e2) {
  if (e2 === void 0) {
    e2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  return this._solution ? this._solution.dx(e2) : 0;
};
Spring$1.prototype.setEnd = function(e2, t2, n) {
  if (!n) {
    n = new Date().getTime();
  }
  if (e2 !== this._endPosition || !a(t2, 0.4)) {
    t2 = t2 || 0;
    var i2 = this._endPosition;
    if (this._solution) {
      if (a(t2, 0.4)) {
        t2 = this._solution.dx((n - this._startTime) / 1e3);
      }
      i2 = this._solution.x((n - this._startTime) / 1e3);
      if (a(t2, 0.4)) {
        t2 = 0;
      }
      if (a(i2, 0.4)) {
        i2 = 0;
      }
      i2 += this._endPosition;
    }
    if (!(this._solution && a(i2 - e2, 0.4) && a(t2, 0.4))) {
      this._endPosition = e2;
      this._solution = this._solve(i2 - this._endPosition, t2);
      this._startTime = n;
    }
  }
};
Spring$1.prototype.snap = function(e2) {
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
Spring$1.prototype.done = function(e2) {
  if (!e2) {
    e2 = new Date().getTime();
  }
  return o(this.x(), this._endPosition, 0.4) && a(this.dx(), 0.4);
};
Spring$1.prototype.reconfigure = function(e2, t2, n) {
  this._m = e2;
  this._k = t2;
  this._c = n;
  if (!this.done()) {
    this._solution = this._solve(this.x() - this._endPosition, this.dx());
    this._startTime = new Date().getTime();
  }
};
Spring$1.prototype.springConstant = function() {
  return this._k;
};
Spring$1.prototype.damping = function() {
  return this._c;
};
Spring$1.prototype.configuration = function() {
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
function Scroll(extent, friction, spring) {
  this._extent = extent;
  this._friction = friction || new Friction$1(0.01);
  this._spring = spring || new Spring$1(1, 90, 20);
  this._startTime = 0;
  this._springing = false;
  this._springOffset = 0;
}
Scroll.prototype.snap = function(e2, t2) {
  this._springOffset = 0;
  this._springing = true;
  this._spring.snap(e2);
  this._spring.setEnd(t2);
};
Scroll.prototype.set = function(e2, t2) {
  this._friction.set(e2, t2);
  if (e2 > 0 && t2 >= 0) {
    this._springOffset = 0;
    this._springing = true;
    this._spring.snap(e2);
    this._spring.setEnd(0);
  } else {
    if (e2 < -this._extent && t2 <= 0) {
      this._springOffset = 0;
      this._springing = true;
      this._spring.snap(e2);
      this._spring.setEnd(-this._extent);
    } else {
      this._springing = false;
    }
  }
  this._startTime = new Date().getTime();
};
Scroll.prototype.x = function(e2) {
  if (!this._startTime) {
    return 0;
  }
  if (!e2) {
    e2 = (new Date().getTime() - this._startTime) / 1e3;
  }
  if (this._springing) {
    return this._spring.x() + this._springOffset;
  }
  var t2 = this._friction.x(e2);
  var n = this.dx(e2);
  if (t2 > 0 && n >= 0 || t2 < -this._extent && n <= 0) {
    this._springing = true;
    this._spring.setEnd(0, n);
    if (t2 < -this._extent) {
      this._springOffset = -this._extent;
    } else {
      this._springOffset = 0;
    }
    t2 = this._spring.x() + this._springOffset;
  }
  return t2;
};
Scroll.prototype.dx = function(e2) {
  var t2 = 0;
  t2 = this._lastTime === e2 ? this._lastDx : this._springing ? this._spring.dx(e2) : this._friction.dx(e2);
  this._lastTime = e2;
  this._lastDx = t2;
  return t2;
};
Scroll.prototype.done = function() {
  return this._springing ? this._spring.done() : this._friction.done();
};
Scroll.prototype.setVelocityByEnd = function(e2) {
  this._friction.setVelocityByEnd(e2);
};
Scroll.prototype.configuration = function() {
  var e2 = this._friction.configuration();
  e2.push.apply(e2, this._spring.configuration());
  return e2;
};
function i(scroll, t2, n) {
  function i2(t3, scroll2, r2, o3) {
    if (!t3 || !t3.cancelled) {
      r2(scroll2);
      var a2 = scroll2.done();
      if (!a2) {
        if (!t3.cancelled) {
          t3.id = requestAnimationFrame(i2.bind(null, t3, scroll2, r2, o3));
        }
      }
      if (a2 && o3) {
        o3(scroll2);
      }
    }
  }
  function r(scroll2) {
    if (scroll2 && scroll2.id) {
      cancelAnimationFrame(scroll2.id);
    }
    if (scroll2) {
      scroll2.cancelled = true;
    }
  }
  var o2 = {
    id: 0,
    cancelled: false
  };
  i2(o2, scroll, t2, n);
  return {
    cancel: r.bind(null, o2),
    model: scroll
  };
}
function Scroller(element, options) {
  options = options || {};
  this._element = element;
  this._options = options;
  this._enableSnap = options.enableSnap || false;
  this._itemSize = options.itemSize || 0;
  this._enableX = options.enableX || false;
  this._enableY = options.enableY || false;
  this._shouldDispatchScrollEvent = !!options.onScroll;
  if (this._enableX) {
    this._extent = (options.scrollWidth || this._element.offsetWidth) - this._element.parentElement.offsetWidth;
    this._scrollWidth = options.scrollWidth;
  } else {
    this._extent = (options.scrollHeight || this._element.offsetHeight) - this._element.parentElement.offsetHeight;
    this._scrollHeight = options.scrollHeight;
  }
  this._position = 0;
  this._scroll = new Scroll(this._extent, options.friction, options.spring);
  this._onTransitionEnd = this.onTransitionEnd.bind(this);
  this.updatePosition();
}
Scroller.prototype.onTouchStart = function() {
  this._startPosition = this._position;
  this._lastChangePos = this._startPosition;
  if (this._startPosition > 0) {
    this._startPosition /= 0.5;
  } else {
    if (this._startPosition < -this._extent) {
      this._startPosition = (this._startPosition + this._extent) / 0.5 - this._extent;
    }
  }
  if (this._animation) {
    this._animation.cancel();
    this._scrolling = false;
  }
  this.updatePosition();
};
Scroller.prototype.onTouchMove = function(x, y) {
  var startPosition = this._startPosition;
  if (this._enableX) {
    startPosition += x;
  } else if (this._enableY) {
    startPosition += y;
  }
  if (startPosition > 0) {
    startPosition *= 0.5;
  } else if (startPosition < -this._extent) {
    startPosition = 0.5 * (startPosition + this._extent) - this._extent;
  }
  this._position = startPosition;
  this.updatePosition();
  this.dispatchScroll();
};
Scroller.prototype.onTouchEnd = function(e2, r, o2) {
  if (this._enableSnap && this._position > -this._extent && this._position < 0) {
    if (this._enableY && (Math.abs(r) < this._itemSize && Math.abs(o2.y) < 300 || Math.abs(o2.y) < 150)) {
      this.snap();
      return;
    }
    if (this._enableX && (Math.abs(e2) < this._itemSize && Math.abs(o2.x) < 300 || Math.abs(o2.x) < 150)) {
      this.snap();
      return;
    }
  }
  if (this._enableX) {
    this._scroll.set(this._position, o2.x);
  } else if (this._enableY) {
    this._scroll.set(this._position, o2.y);
  }
  if (this._enableSnap) {
    var s = this._scroll._friction.x(100);
    var l = s % this._itemSize;
    var c = Math.abs(l) > this._itemSize / 2 ? s - (this._itemSize - Math.abs(l)) : s - l;
    if (c <= 0 && c >= -this._extent) {
      this._scroll.setVelocityByEnd(c);
    }
  }
  this._lastTime = Date.now();
  this._lastDelay = 0;
  this._scrolling = true;
  this._lastChangePos = this._position;
  this._lastIdx = Math.floor(Math.abs(this._position / this._itemSize));
  this._animation = i(this._scroll, () => {
    var e3 = Date.now();
    var i2 = (e3 - this._scroll._startTime) / 1e3;
    var r2 = this._scroll.x(i2);
    this._position = r2;
    this.updatePosition();
    var o3 = this._scroll.dx(i2);
    if (this._shouldDispatchScrollEvent && e3 - this._lastTime > this._lastDelay) {
      this.dispatchScroll();
      this._lastDelay = Math.abs(2e3 / o3);
      this._lastTime = e3;
    }
  }, () => {
    if (this._enableSnap) {
      if (c <= 0 && c >= -this._extent) {
        this._position = c;
        this.updatePosition();
      }
      if (typeof this._options.onSnap === "function") {
        this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize));
      }
    }
    if (this._shouldDispatchScrollEvent) {
      this.dispatchScroll();
    }
    this._scrolling = false;
  });
};
Scroller.prototype.onTransitionEnd = function() {
  this._element.style.transition = "";
  this._element.style.webkitTransition = "";
  this._element.removeEventListener("transitionend", this._onTransitionEnd);
  this._element.removeEventListener("webkitTransitionEnd", this._onTransitionEnd);
  if (this._snapping) {
    this._snapping = false;
  }
  this.dispatchScroll();
};
Scroller.prototype.snap = function() {
  var e2 = this._itemSize;
  var t2 = this._position % e2;
  var i2 = Math.abs(t2) > this._itemSize / 2 ? this._position - (e2 - Math.abs(t2)) : this._position - t2;
  if (this._position !== i2) {
    this._snapping = true;
    this.scrollTo(-i2);
    if (typeof this._options.onSnap === "function") {
      this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize));
    }
  }
};
Scroller.prototype.scrollTo = function(e2, t2) {
  if (this._animation) {
    this._animation.cancel();
    this._scrolling = false;
  }
  if (typeof e2 === "number") {
    this._position = -e2;
  }
  if (this._position < -this._extent) {
    this._position = -this._extent;
  } else {
    if (this._position > 0) {
      this._position = 0;
    }
  }
  this._element.style.transition = "transform " + (t2 || 0.2) + "s ease-out";
  this._element.style.webkitTransition = "-webkit-transform " + (t2 || 0.2) + "s ease-out";
  this.updatePosition();
  this._element.addEventListener("transitionend", this._onTransitionEnd);
  this._element.addEventListener("webkitTransitionEnd", this._onTransitionEnd);
};
Scroller.prototype.dispatchScroll = function() {
  if (typeof this._options.onScroll === "function" && Math.round(this._lastPos) !== Math.round(this._position)) {
    this._lastPos = this._position;
    var e2 = {
      target: {
        scrollLeft: this._enableX ? -this._position : 0,
        scrollTop: this._enableY ? -this._position : 0,
        scrollHeight: this._scrollHeight || this._element.offsetHeight,
        scrollWidth: this._scrollWidth || this._element.offsetWidth,
        offsetHeight: this._element.parentElement.offsetHeight,
        offsetWidth: this._element.parentElement.offsetWidth
      }
    };
    this._options.onScroll(e2);
  }
};
Scroller.prototype.update = function(e2, t2, n) {
  var i2 = 0;
  var r = this._position;
  if (this._enableX) {
    i2 = this._element.childNodes.length ? (t2 || this._element.offsetWidth) - this._element.parentElement.offsetWidth : 0;
    this._scrollWidth = t2;
  } else {
    i2 = this._element.childNodes.length ? (t2 || this._element.offsetHeight) - this._element.parentElement.offsetHeight : 0;
    this._scrollHeight = t2;
  }
  if (typeof e2 === "number") {
    this._position = -e2;
  }
  if (this._position < -i2) {
    this._position = -i2;
  } else {
    if (this._position > 0) {
      this._position = 0;
    }
  }
  this._itemSize = n || this._itemSize;
  this.updatePosition();
  if (r !== this._position) {
    this.dispatchScroll();
    if (typeof this._options.onSnap === "function") {
      this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize));
    }
  }
  this._extent = i2;
  this._scroll._extent = i2;
};
Scroller.prototype.updatePosition = function() {
  var transform = "";
  if (this._enableX) {
    transform = "translateX(" + this._position + "px) translateZ(0)";
  } else {
    if (this._enableY) {
      transform = "translateY(" + this._position + "px) translateZ(0)";
    }
  }
  this._element.style.webkitTransform = transform;
  this._element.style.transform = transform;
};
Scroller.prototype.isScrolling = function() {
  return this._scrolling || this._snapping;
};
var scroller = {
  methods: {
    initScroller: function(element, options) {
      this._touchInfo = {
        trackingID: -1,
        maxDy: 0,
        maxDx: 0
      };
      this._scroller = new Scroller(element, options);
      this.__handleTouchStart = this._handleTouchStart.bind(this);
      this.__handleTouchMove = this._handleTouchMove.bind(this);
      this.__handleTouchEnd = this._handleTouchEnd.bind(this);
      this._initedScroller = true;
    },
    _findDelta: function(event2) {
      var touchInfo = this._touchInfo;
      return event2.detail.state === "move" || event2.detail.state === "end" ? {
        x: event2.detail.dx,
        y: event2.detail.dy
      } : {
        x: event2.screenX - touchInfo.x,
        y: event2.screenY - touchInfo.y
      };
    },
    _handleTouchStart: function(e2) {
      var t2 = this._touchInfo;
      var n = this._scroller;
      if (n) {
        if (e2.detail.state === "start") {
          t2.trackingID = "touch";
          t2.x = e2.detail.x;
          t2.y = e2.detail.y;
        } else {
          t2.trackingID = "mouse";
          t2.x = e2.screenX;
          t2.y = e2.screenY;
        }
        t2.maxDx = 0;
        t2.maxDy = 0;
        t2.historyX = [0];
        t2.historyY = [0];
        t2.historyTime = [e2.detail.timeStamp];
        t2.listener = n;
        if (n.onTouchStart) {
          n.onTouchStart();
        }
        event.preventDefault();
      }
    },
    _handleTouchMove: function(event2) {
      var touchInfo = this._touchInfo;
      if (touchInfo.trackingID !== -1) {
        event2.preventDefault();
        var delta = this._findDelta(event2);
        if (delta) {
          for (touchInfo.maxDy = Math.max(touchInfo.maxDy, Math.abs(delta.y)), touchInfo.maxDx = Math.max(touchInfo.maxDx, Math.abs(delta.x)), touchInfo.historyX.push(delta.x), touchInfo.historyY.push(delta.y), touchInfo.historyTime.push(event2.detail.timeStamp); touchInfo.historyTime.length > 10; ) {
            touchInfo.historyTime.shift();
            touchInfo.historyX.shift();
            touchInfo.historyY.shift();
          }
          if (touchInfo.listener && touchInfo.listener.onTouchMove) {
            touchInfo.listener.onTouchMove(delta.x, delta.y, event2.detail.timeStamp);
          }
        }
      }
    },
    _handleTouchEnd: function(event2) {
      var touchInfo = this._touchInfo;
      if (touchInfo.trackingID !== -1) {
        event2.preventDefault();
        var delta = this._findDelta(event2);
        if (delta) {
          var listener = touchInfo.listener;
          touchInfo.trackingID = -1;
          touchInfo.listener = null;
          var r = touchInfo.historyTime.length;
          var o2 = {
            x: 0,
            y: 0
          };
          if (r > 2) {
            for (var a2 = touchInfo.historyTime.length - 1, s = touchInfo.historyTime[a2], l = touchInfo.historyX[a2], c = touchInfo.historyY[a2]; a2 > 0; ) {
              a2--;
              var u = touchInfo.historyTime[a2];
              var d = s - u;
              if (d > 30 && d < 50) {
                o2.x = (l - touchInfo.historyX[a2]) / (d / 1e3);
                o2.y = (c - touchInfo.historyY[a2]) / (d / 1e3);
                break;
              }
            }
          }
          touchInfo.historyTime = [];
          touchInfo.historyX = [];
          touchInfo.historyY = [];
          if (listener && listener.onTouchEnd) {
            listener.onTouchEnd(delta.x, delta.y, o2);
          }
        }
      }
    }
  }
};
var script$h = {
  name: "ScrollView",
  mixins: [scroller],
  props: {
    scrollX: {
      type: [Boolean, String],
      default: false
    },
    scrollY: {
      type: [Boolean, String],
      default: false
    },
    upperThreshold: {
      type: [Number, String],
      default: 50
    },
    lowerThreshold: {
      type: [Number, String],
      default: 50
    },
    scrollTop: {
      type: [Number, String],
      default: 0
    },
    scrollLeft: {
      type: [Number, String],
      default: 0
    },
    scrollIntoView: {
      type: String,
      default: ""
    },
    scrollWithAnimation: {
      type: [Boolean, String],
      default: false
    },
    enableBackToTop: {
      type: [Boolean, String],
      default: false
    },
    refresherEnabled: {
      type: [Boolean, String],
      default: false
    },
    refresherThreshold: {
      type: Number,
      default: 45
    },
    refresherDefaultStyle: {
      type: String,
      default: "back"
    },
    refresherBackground: {
      type: String,
      default: "#fff"
    },
    refresherTriggered: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      lastScrollTop: this.scrollTopNumber,
      lastScrollLeft: this.scrollLeftNumber,
      lastScrollToUpperTime: 0,
      lastScrollToLowerTime: 0,
      refresherHeight: 0,
      refreshRotate: 0,
      refreshState: ""
    };
  },
  computed: {
    upperThresholdNumber() {
      var val = Number(this.upperThreshold);
      return isNaN(val) ? 50 : val;
    },
    lowerThresholdNumber() {
      var val = Number(this.lowerThreshold);
      return isNaN(val) ? 50 : val;
    },
    scrollTopNumber() {
      return Number(this.scrollTop) || 0;
    },
    scrollLeftNumber() {
      return Number(this.scrollLeft) || 0;
    }
  },
  watch: {
    scrollTopNumber(val) {
      this._scrollTopChanged(val);
    },
    scrollLeftNumber(val) {
      this._scrollLeftChanged(val);
    },
    scrollIntoView(val) {
      this._scrollIntoViewChanged(val);
    },
    refresherTriggered(val) {
      if (val === true) {
        this._setRefreshState("refreshing");
      } else if (val === false) {
        this._setRefreshState("restore");
      }
    }
  },
  mounted() {
    var self = this;
    this._attached = true;
    this._scrollTopChanged(this.scrollTopNumber);
    this._scrollLeftChanged(this.scrollLeftNumber);
    this._scrollIntoViewChanged(this.scrollIntoView);
    this.__handleScroll = function(e2) {
      event.preventDefault();
      event.stopPropagation();
      self._handleScroll.bind(self, event)();
    };
    var touchStart = null;
    var needStop = null;
    this.__handleTouchMove = function(event2) {
      var x = event2.touches[0].pageX;
      var y = event2.touches[0].pageY;
      var main = self.$refs.main;
      if (needStop === null) {
        if (Math.abs(x - touchStart.x) > Math.abs(y - touchStart.y)) {
          if (self.scrollX) {
            if (main.scrollLeft === 0 && x > touchStart.x) {
              needStop = false;
              return;
            } else if (main.scrollWidth === main.offsetWidth + main.scrollLeft && x < touchStart.x) {
              needStop = false;
              return;
            }
            needStop = true;
          } else {
            needStop = false;
          }
        } else {
          if (self.scrollY) {
            if (main.scrollTop === 0 && y > touchStart.y) {
              needStop = false;
              return;
            } else if (main.scrollHeight === main.offsetHeight + main.scrollTop && y < touchStart.y) {
              needStop = false;
              return;
            }
            needStop = true;
          } else {
            needStop = false;
          }
        }
      }
      if (needStop) {
        event2.stopPropagation();
      }
      if (self.refresherEnabled && self.refreshState === "pulling") {
        const dy = y - touchStart.y;
        self.refresherHeight = dy;
        let rotate = dy / self.refresherThreshold;
        if (rotate > 1) {
          rotate = 1;
        } else {
          rotate = rotate * 360;
        }
        self.refreshRotate = rotate;
        self.$trigger("refresherpulling", event2, {
          deltaY: dy
        });
      }
    };
    this.__handleTouchStart = function(event2) {
      if (event2.touches.length === 1) {
        disableScrollBounce({
          disable: true
        });
        needStop = null;
        touchStart = {
          x: event2.touches[0].pageX,
          y: event2.touches[0].pageY
        };
        if (self.refresherEnabled && self.refreshState !== "refreshing" && self.$refs.main.scrollTop === 0) {
          self.refreshState = "pulling";
        }
      }
    };
    this.__handleTouchEnd = function(event2) {
      touchStart = null;
      disableScrollBounce({
        disable: false
      });
      if (self.refresherHeight >= self.refresherThreshold) {
        self._setRefreshState("refreshing");
      } else {
        self.refresherHeight = 0;
        self.$trigger("refresherabort", event2, {});
      }
    };
    this.$refs.main.addEventListener("touchstart", this.__handleTouchStart, passiveOptions);
    this.$refs.main.addEventListener("touchmove", this.__handleTouchMove, passiveOptions);
    this.$refs.main.addEventListener("scroll", this.__handleScroll, supportsPassive ? {
      passive: false
    } : false);
    this.$refs.main.addEventListener("touchend", this.__handleTouchEnd, passiveOptions);
  },
  activated() {
    this.scrollY && (this.$refs.main.scrollTop = this.lastScrollTop);
    this.scrollX && (this.$refs.main.scrollLeft = this.lastScrollLeft);
  },
  beforeDestroy() {
    this.$refs.main.removeEventListener("touchstart", this.__handleTouchStart, passiveOptions);
    this.$refs.main.removeEventListener("touchmove", this.__handleTouchMove, passiveOptions);
    this.$refs.main.removeEventListener("scroll", this.__handleScroll, supportsPassive ? {
      passive: false
    } : false);
    this.$refs.main.removeEventListener("touchend", this.__handleTouchEnd, passiveOptions);
  },
  methods: {
    scrollTo: function(t2, n) {
      var i2 = this.$refs.main;
      t2 < 0 ? t2 = 0 : n === "x" && t2 > i2.scrollWidth - i2.offsetWidth ? t2 = i2.scrollWidth - i2.offsetWidth : n === "y" && t2 > i2.scrollHeight - i2.offsetHeight && (t2 = i2.scrollHeight - i2.offsetHeight);
      var r = 0;
      var o2 = "";
      n === "x" ? r = i2.scrollLeft - t2 : n === "y" && (r = i2.scrollTop - t2);
      if (r !== 0) {
        this.$refs.content.style.transition = "transform .3s ease-out";
        this.$refs.content.style.webkitTransition = "-webkit-transform .3s ease-out";
        if (n === "x") {
          o2 = "translateX(" + r + "px) translateZ(0)";
        } else {
          n === "y" && (o2 = "translateY(" + r + "px) translateZ(0)");
        }
        this.$refs.content.removeEventListener("transitionend", this.__transitionEnd);
        this.$refs.content.removeEventListener("webkitTransitionEnd", this.__transitionEnd);
        this.__transitionEnd = this._transitionEnd.bind(this, t2, n);
        this.$refs.content.addEventListener("transitionend", this.__transitionEnd);
        this.$refs.content.addEventListener("webkitTransitionEnd", this.__transitionEnd);
        if (n === "x") {
          i2.style.overflowX = "hidden";
        } else if (n === "y") {
          i2.style.overflowY = "hidden";
        }
        this.$refs.content.style.transform = o2;
        this.$refs.content.style.webkitTransform = o2;
      }
    },
    _handleTrack: function($event) {
      if ($event.detail.state === "start") {
        this._x = $event.detail.x;
        this._y = $event.detail.y;
        this._noBubble = null;
        return;
      }
      if ($event.detail.state === "end") {
        this._noBubble = false;
      }
      if (this._noBubble === null && this.scrollY) {
        if (Math.abs(this._y - $event.detail.y) / Math.abs(this._x - $event.detail.x) > 1) {
          this._noBubble = true;
        } else {
          this._noBubble = false;
        }
      }
      if (this._noBubble === null && this.scrollX) {
        if (Math.abs(this._x - $event.detail.x) / Math.abs(this._y - $event.detail.y) > 1) {
          this._noBubble = true;
        } else {
          this._noBubble = false;
        }
      }
      this._x = $event.detail.x;
      this._y = $event.detail.y;
      if (this._noBubble) {
        $event.stopPropagation();
      }
    },
    _handleScroll: function($event) {
      if (!($event.timeStamp - this._lastScrollTime < 20)) {
        this._lastScrollTime = $event.timeStamp;
        const target = $event.target;
        this.$trigger("scroll", $event, {
          scrollLeft: target.scrollLeft,
          scrollTop: target.scrollTop,
          scrollHeight: target.scrollHeight,
          scrollWidth: target.scrollWidth,
          deltaX: this.lastScrollLeft - target.scrollLeft,
          deltaY: this.lastScrollTop - target.scrollTop
        });
        if (this.scrollY) {
          if (target.scrollTop <= this.upperThresholdNumber && this.lastScrollTop - target.scrollTop > 0 && $event.timeStamp - this.lastScrollToUpperTime > 200) {
            this.$trigger("scrolltoupper", $event, {
              direction: "top"
            });
            this.lastScrollToUpperTime = $event.timeStamp;
          }
          if (target.scrollTop + target.offsetHeight + this.lowerThresholdNumber >= target.scrollHeight && this.lastScrollTop - target.scrollTop < 0 && $event.timeStamp - this.lastScrollToLowerTime > 200) {
            this.$trigger("scrolltolower", $event, {
              direction: "bottom"
            });
            this.lastScrollToLowerTime = $event.timeStamp;
          }
        }
        if (this.scrollX) {
          if (target.scrollLeft <= this.upperThresholdNumber && this.lastScrollLeft - target.scrollLeft > 0 && $event.timeStamp - this.lastScrollToUpperTime > 200) {
            this.$trigger("scrolltoupper", $event, {
              direction: "left"
            });
            this.lastScrollToUpperTime = $event.timeStamp;
          }
          if (target.scrollLeft + target.offsetWidth + this.lowerThresholdNumber >= target.scrollWidth && this.lastScrollLeft - target.scrollLeft < 0 && $event.timeStamp - this.lastScrollToLowerTime > 200) {
            this.$trigger("scrolltolower", $event, {
              direction: "right"
            });
            this.lastScrollToLowerTime = $event.timeStamp;
          }
        }
        this.lastScrollTop = target.scrollTop;
        this.lastScrollLeft = target.scrollLeft;
      }
    },
    _scrollTopChanged: function(val) {
      if (this.scrollY) {
        if (this._innerSetScrollTop) {
          this._innerSetScrollTop = false;
        } else {
          if (this.scrollWithAnimation) {
            this.scrollTo(val, "y");
          } else {
            this.$refs.main.scrollTop = val;
          }
        }
      }
    },
    _scrollLeftChanged: function(val) {
      if (this.scrollX) {
        if (this._innerSetScrollLeft) {
          this._innerSetScrollLeft = false;
        } else {
          if (this.scrollWithAnimation) {
            this.scrollTo(val, "x");
          } else {
            this.$refs.main.scrollLeft = val;
          }
        }
      }
    },
    _scrollIntoViewChanged: function(val) {
      if (val) {
        if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(val)) {
          console.group('scroll-into-view="' + val + '" \u6709\u8BEF');
          console.error("id \u5C5E\u6027\u503C\u683C\u5F0F\u9519\u8BEF\u3002\u5982\u4E0D\u80FD\u4EE5\u6570\u5B57\u5F00\u5934\u3002");
          console.groupEnd();
          return;
        }
        var element = this.$el.querySelector("#" + val);
        if (element) {
          var mainRect = this.$refs.main.getBoundingClientRect();
          var elRect = element.getBoundingClientRect();
          if (this.scrollX) {
            var left = elRect.left - mainRect.left;
            var scrollLeft = this.$refs.main.scrollLeft;
            var x = scrollLeft + left;
            if (this.scrollWithAnimation) {
              this.scrollTo(x, "x");
            } else {
              this.$refs.main.scrollLeft = x;
            }
          }
          if (this.scrollY) {
            var top = elRect.top - mainRect.top;
            var scrollTop = this.$refs.main.scrollTop;
            var y = scrollTop + top;
            if (this.scrollWithAnimation) {
              this.scrollTo(y, "y");
            } else {
              this.$refs.main.scrollTop = y;
            }
          }
        }
      }
    },
    _transitionEnd: function(val, type) {
      this.$refs.content.style.transition = "";
      this.$refs.content.style.webkitTransition = "";
      this.$refs.content.style.transform = "";
      this.$refs.content.style.webkitTransform = "";
      var main = this.$refs.main;
      if (type === "x") {
        main.style.overflowX = this.scrollX ? "auto" : "hidden";
        main.scrollLeft = val;
      } else if (type === "y") {
        main.style.overflowY = this.scrollY ? "auto" : "hidden";
        main.scrollTop = val;
      }
      this.$refs.content.removeEventListener("transitionend", this.__transitionEnd);
      this.$refs.content.removeEventListener("webkitTransitionEnd", this.__transitionEnd);
    },
    _setRefreshState(state) {
      switch (state) {
        case "refreshing":
          this.refresherHeight = this.refresherThreshold;
          this.$trigger("refresherrefresh", event, {});
          break;
        case "restore":
          this.refresherHeight = 0;
          this.$trigger("refresherrestore", {}, {});
          break;
      }
      this.refreshState = state;
    },
    getScrollPosition() {
      const main = this.$refs.main;
      return {
        scrollLeft: main.scrollLeft,
        scrollTop: main.scrollTop
      };
    }
  }
};
const _hoisted_1$7 = {
  ref: "wrap",
  class: "uni-scroll-view"
};
const _hoisted_2$2 = {
  ref: "content",
  class: "uni-scroll-view-content"
};
const _hoisted_3$1 = {
  key: 0,
  class: "uni-scroll-view-refresh"
};
const _hoisted_4$1 = {class: "uni-scroll-view-refresh-inner"};
const _hoisted_5$1 = /* @__PURE__ */ createVNode("path", {d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}, null, -1);
const _hoisted_6$1 = /* @__PURE__ */ createVNode("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1);
const _hoisted_7 = {
  key: 1,
  class: "uni-scroll-view-refresh__spinner",
  width: "24",
  height: "24",
  viewBox: "25 25 50 50"
};
const _hoisted_8 = /* @__PURE__ */ createVNode("circle", {
  cx: "50",
  cy: "50",
  r: "20",
  fill: "none",
  style: {color: "#2BD009"},
  "stroke-width": "3"
}, null, -1);
function render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-scroll-view", _ctx.$attrs, [
    createVNode("div", _hoisted_1$7, [
      createVNode("div", {
        ref: "main",
        style: {"overflow-x": $props.scrollX ? "auto" : "hidden", "overflow-y": $props.scrollY ? "auto" : "hidden"},
        class: "uni-scroll-view"
      }, [
        createVNode("div", _hoisted_2$2, [
          $props.refresherEnabled ? (openBlock(), createBlock("div", {
            key: 0,
            ref: "refresherinner",
            style: {"background-color": $props.refresherBackground, height: $data.refresherHeight + "px"},
            class: "uni-scroll-view-refresher"
          }, [
            $props.refresherDefaultStyle !== "none" ? (openBlock(), createBlock("div", _hoisted_3$1, [
              createVNode("div", _hoisted_4$1, [
                $data.refreshState == "pulling" ? (openBlock(), createBlock("svg", {
                  key: 0,
                  style: {transform: "rotate(" + $data.refreshRotate + "deg)"},
                  fill: "#2BD009",
                  class: "uni-scroll-view-refresh__icon",
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24"
                }, [
                  _hoisted_5$1,
                  _hoisted_6$1
                ], 4)) : createCommentVNode("", true),
                $data.refreshState == "refreshing" ? (openBlock(), createBlock("svg", _hoisted_7, [
                  _hoisted_8
                ])) : createCommentVNode("", true)
              ])
            ])) : createCommentVNode("", true),
            $props.refresherDefaultStyle == "none" ? renderSlot(_ctx.$slots, "refresher", {key: 1}) : createCommentVNode("", true)
          ], 4)) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default")
        ], 512)
      ], 4)
    ], 512)
  ], 16);
}
script$h.render = render$g;
var script$i = {
  name: "Slider",
  mixins: [emitter, listeners, touchtrack],
  props: {
    name: {
      type: String,
      default: ""
    },
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    value: {
      type: [Number, String],
      default: 0
    },
    step: {
      type: [Number, String],
      default: 1
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: "#e9e9e9"
    },
    backgroundColor: {
      type: String,
      default: "#e9e9e9"
    },
    activeColor: {
      type: String,
      default: "#007aff"
    },
    selectedColor: {
      type: String,
      default: "#007aff"
    },
    blockColor: {
      type: String,
      default: "#ffffff"
    },
    blockSize: {
      type: [Number, String],
      default: 28
    },
    showValue: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      sliderValue: Number(this.value)
    };
  },
  computed: {
    setBlockStyle() {
      return {
        width: this.blockSize + "px",
        height: this.blockSize + "px",
        marginLeft: -this.blockSize / 2 + "px",
        marginTop: -this.blockSize / 2 + "px",
        left: this._getValueWidth(),
        backgroundColor: this.blockColor
      };
    },
    setBgColor() {
      return {
        backgroundColor: this._getBgColor()
      };
    },
    setBlockBg() {
      return {
        left: this._getValueWidth()
      };
    },
    setActiveColor() {
      return {
        backgroundColor: this._getActiveColor(),
        width: this._getValueWidth()
      };
    }
  },
  watch: {
    value(val) {
      this.sliderValue = Number(val);
    }
  },
  mounted() {
    this.touchtrack(this.$refs["uni-slider-handle"], "_onTrack");
  },
  created() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "add",
      vm: this
    });
  },
  beforeDestroy() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "remove",
      vm: this
    });
  },
  methods: {
    _onUserChangedValue(e2) {
      const slider = this.$refs["uni-slider"];
      const offsetWidth = slider.offsetWidth;
      const boxLeft = slider.getBoundingClientRect().left;
      const value = (e2.x - boxLeft) * (this.max - this.min) / offsetWidth + Number(this.min);
      this.sliderValue = this._filterValue(value);
    },
    _filterValue(e2) {
      return e2 < this.min ? this.min : e2 > this.max ? this.max : Math.round((e2 - this.min) / this.step) * this.step + Number(this.min);
    },
    _getValueWidth() {
      return 100 * (this.sliderValue - this.min) / (this.max - this.min) + "%";
    },
    _getBgColor() {
      return this.backgroundColor !== "#e9e9e9" ? this.backgroundColor : this.color !== "#007aff" ? this.color : "#007aff";
    },
    _getActiveColor() {
      return this.activeColor !== "#007aff" ? this.activeColor : this.selectedColor !== "#e9e9e9" ? this.selectedColor : "#e9e9e9";
    },
    _onTrack: function(e2) {
      if (!this.disabled) {
        return e2.detail.state === "move" ? (this._onUserChangedValue({
          x: e2.detail.x0
        }), this.$trigger("changing", e2, {
          value: this.sliderValue
        }), false) : e2.detail.state === "end" && this.$trigger("change", e2, {
          value: this.sliderValue
        });
      }
    },
    _onClick($event) {
      if (this.disabled) {
        return;
      }
      this._onUserChangedValue($event);
      this.$trigger("change", $event, {
        value: this.sliderValue
      });
    },
    _resetFormData() {
      this.sliderValue = this.min;
    },
    _getFormData() {
      const data = {};
      if (this.name !== "") {
        data.value = this.sliderValue;
        data.key = this.name;
      }
      return data;
    }
  }
};
const _hoisted_1$8 = {class: "uni-slider-wrapper"};
const _hoisted_2$3 = {class: "uni-slider-tap-area"};
function render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-slider", mergeProps({ref: "uni-slider"}, _ctx.$attrs, {
    onClick: _cache[1] || (_cache[1] = (...args) => $options._onClick && $options._onClick(...args))
  }), [
    createVNode("div", _hoisted_1$8, [
      createVNode("div", _hoisted_2$3, [
        createVNode("div", {
          style: $options.setBgColor,
          class: "uni-slider-handle-wrapper"
        }, [
          createVNode("div", {
            ref: "uni-slider-handle",
            style: $options.setBlockBg,
            class: "uni-slider-handle"
          }, null, 4),
          createVNode("div", {
            style: $options.setBlockStyle,
            class: "uni-slider-thumb"
          }, null, 4),
          createVNode("div", {
            style: $options.setActiveColor,
            class: "uni-slider-track"
          }, null, 4)
        ], 4)
      ]),
      withDirectives(createVNode("span", {class: "uni-slider-value"}, toDisplayString($data.sliderValue), 513), [
        [vShow, $props.showValue]
      ])
    ]),
    renderSlot(_ctx.$slots, "default")
  ], 16);
}
script$i.render = render$h;
var script$j = {
  name: "SwiperItem",
  props: {
    itemId: {
      type: String,
      default: ""
    }
  },
  mounted: function() {
    var $el = this.$el;
    $el.style.position = "absolute";
    $el.style.width = "100%";
    $el.style.height = "100%";
    var callbacks = this.$vnode._callbacks;
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback();
      });
    }
  }
};
function render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-swiper-item", _ctx.$attrs, [
    renderSlot(_ctx.$slots, "default")
  ], 16);
}
script$j.render = render$i;
var script$k = {
  name: "Switch",
  mixins: [emitter, listeners],
  props: {
    name: {
      type: String,
      default: ""
    },
    checked: {
      type: [Boolean, String],
      default: false
    },
    type: {
      type: String,
      default: "switch"
    },
    id: {
      type: String,
      default: ""
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: "#007aff"
    }
  },
  data() {
    return {
      switchChecked: this.checked
    };
  },
  watch: {
    checked(val) {
      this.switchChecked = val;
    }
  },
  created() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "add",
      vm: this
    });
  },
  beforeDestroy() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "remove",
      vm: this
    });
  },
  listeners: {
    "label-click": "_onClick",
    "@label-click": "_onClick"
  },
  methods: {
    _onClick($event) {
      if (this.disabled) {
        return;
      }
      this.switchChecked = !this.switchChecked;
      this.$trigger("change", $event, {
        value: this.switchChecked
      });
    },
    _resetFormData() {
      this.switchChecked = false;
    },
    _getFormData() {
      const data = {};
      if (this.name !== "") {
        data.value = this.switchChecked;
        data.key = this.name;
      }
      return data;
    }
  }
};
const _hoisted_1$9 = {class: "uni-switch-wrapper"};
function render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("uni-switch", mergeProps({disabled: $props.disabled}, _ctx.$attrs, {
    onClick: _cache[1] || (_cache[1] = (...args) => $options._onClick && $options._onClick(...args))
  }), [
    createVNode("div", _hoisted_1$9, [
      withDirectives(createVNode("div", {
        class: [[$data.switchChecked ? "uni-switch-input-checked" : ""], "uni-switch-input"],
        style: {backgroundColor: $data.switchChecked ? $props.color : "#DFDFDF", borderColor: $data.switchChecked ? $props.color : "#DFDFDF"}
      }, null, 6), [
        [vShow, $props.type === "switch"]
      ]),
      withDirectives(createVNode("div", {
        class: [[$data.switchChecked ? "uni-checkbox-input-checked" : ""], "uni-checkbox-input"],
        style: {color: $props.color}
      }, null, 6), [
        [vShow, $props.type === "checkbox"]
      ])
    ])
  ], 16, ["disabled"]);
}
script$k.render = render$j;
const DARK_TEST_STRING = "(prefers-color-scheme: dark)";
var script$l = {
  name: "Textarea",
  mixins: [baseInput],
  props: {
    name: {
      type: String,
      default: ""
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    focus: {
      type: [Boolean, String],
      default: false
    },
    autoFocus: {
      type: [Boolean, String],
      default: false
    },
    placeholderClass: {
      type: String,
      default: "textarea-placeholder"
    },
    placeholderStyle: {
      type: String,
      default: ""
    },
    autoHeight: {
      type: [Boolean, String],
      default: false
    },
    cursor: {
      type: [Number, String],
      default: -1
    },
    selectionStart: {
      type: [Number, String],
      default: -1
    },
    selectionEnd: {
      type: [Number, String],
      default: -1
    }
  },
  data() {
    return {
      valueComposition: "",
      composition: false,
      focusSync: this.focus,
      height: 0,
      focusChangeSource: "",
      fixMargin: String(navigator.platform).indexOf("iP") === 0 && String(navigator.vendor).indexOf("Apple") === 0 && window.matchMedia(DARK_TEST_STRING).media !== DARK_TEST_STRING
    };
  },
  computed: {
    maxlengthNumber() {
      var maxlength = Number(this.maxlength);
      return isNaN(maxlength) ? 140 : maxlength;
    },
    cursorNumber() {
      var cursor = Number(this.cursor);
      return isNaN(cursor) ? -1 : cursor;
    },
    selectionStartNumber() {
      var selectionStart = Number(this.selectionStart);
      return isNaN(selectionStart) ? -1 : selectionStart;
    },
    selectionEndNumber() {
      var selectionEnd = Number(this.selectionEnd);
      return isNaN(selectionEnd) ? -1 : selectionEnd;
    },
    valueCompute() {
      return (this.composition ? this.valueComposition : this.valueSync).split("\n");
    }
  },
  watch: {
    focus(val) {
      if (val) {
        this.focusChangeSource = "focus";
        if (this.$refs.textarea) {
          this.$refs.textarea.focus();
        }
      } else {
        if (this.$refs.textarea) {
          this.$refs.textarea.blur();
        }
      }
    },
    focusSync(val) {
      this.$emit("update:focus", val);
      this._checkSelection();
      this._checkCursor();
    },
    cursorNumber() {
      this._checkCursor();
    },
    selectionStartNumber() {
      this._checkSelection();
    },
    selectionEndNumber() {
      this._checkSelection();
    },
    height(height) {
      let lineHeight = parseFloat(getComputedStyle(this.$el).lineHeight);
      if (isNaN(lineHeight)) {
        lineHeight = this.$refs.line.offsetHeight;
      }
      var lineCount = Math.round(height / lineHeight);
      this.$trigger("linechange", {}, {
        height,
        heightRpx: 750 / window.innerWidth * height,
        lineCount
      });
      if (this.autoHeight) {
        this.$el.style.height = this.height + "px";
      }
    }
  },
  created() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "add",
      vm: this
    });
  },
  mounted() {
    this._resize({
      height: this.$refs.sensor.$el.offsetHeight
    });
    let $vm = this;
    while ($vm) {
      const scopeId = $vm.$options._scopeId;
      if (scopeId) {
        this.$refs.placeholder.setAttribute(scopeId, "");
      }
      $vm = $vm.$parent;
    }
    this.initKeyboard(this.$refs.textarea);
  },
  beforeDestroy() {
    this.$dispatch("Form", "uni-form-group-update", {
      type: "remove",
      vm: this
    });
  },
  methods: {
    _focus: function($event) {
      this.focusSync = true;
      this.$trigger("focus", $event, {
        value: this.valueSync
      });
    },
    _checkSelection() {
      if (this.focusSync && !this.focusChangeSource && this.selectionStartNumber > -1 && this.selectionEndNumber > -1) {
        this.$refs.textarea.selectionStart = this.selectionStartNumber;
        this.$refs.textarea.selectionEnd = this.selectionEndNumber;
      }
    },
    _checkCursor() {
      if (this.focusSync && (this.focusChangeSource === "focus" || !this.focusChangeSource && this.selectionStartNumber < 0 && this.selectionEndNumber < 0) && this.cursorNumber > -1) {
        this.$refs.textarea.selectionEnd = this.$refs.textarea.selectionStart = this.cursorNumber;
      }
    },
    _blur: function($event) {
      this.focusSync = false;
      this.$trigger("blur", $event, {
        value: this.valueSync,
        cursor: this.$refs.textarea.selectionEnd
      });
    },
    _compositionstart($event) {
      this.composition = true;
    },
    _compositionend($event) {
      this.composition = false;
    },
    _confirm($event) {
      this.$trigger("confirm", $event, {
        value: this.valueSync
      });
    },
    _linechange($event) {
      this.$trigger("linechange", $event, {
        value: this.valueSync
      });
    },
    _touchstart() {
      this.focusChangeSource = "touch";
    },
    _resize({height}) {
      this.height = height;
    },
    _input($event) {
      if (this.composition) {
        this.valueComposition = $event.target.value;
        return;
      }
      this.$triggerInput($event, {
        value: this.valueSync,
        cursor: this.$refs.textarea.selectionEnd
      });
    },
    _getFormData() {
      return {
        value: this.valueSync,
        key: this.name
      };
    },
    _resetFormData() {
      this.valueSync = "";
    }
  }
};
const _hoisted_1$a = {class: "uni-textarea-wrapper"};
const _hoisted_2$4 = {class: "uni-textarea-compute"};
function render$k(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_resize_sensor = resolveComponent("v-uni-resize-sensor");
  return openBlock(), createBlock("uni-textarea", mergeProps({
    onChange: _cache[8] || (_cache[8] = withModifiers(() => {
    }, ["stop"]))
  }, _ctx.$attrs), [
    createVNode("div", _hoisted_1$a, [
      withDirectives(createVNode("div", {
        ref: "placeholder",
        style: $props.placeholderStyle,
        class: [$props.placeholderClass, "uni-textarea-placeholder"],
        textContent: toDisplayString($props.placeholder)
      }, null, 14, ["textContent"]), [
        [vShow, !($data.composition || _ctx.valueSync.length)]
      ]),
      createVNode("div", {
        ref: "line",
        class: "uni-textarea-line",
        textContent: toDisplayString(" ")
      }, null, 8, ["textContent"]),
      createVNode("div", _hoisted_2$4, [
        (openBlock(true), createBlock(Fragment, null, renderList($options.valueCompute, (item, index) => {
          return openBlock(), createBlock("div", {
            key: index,
            textContent: toDisplayString(item.trim() ? item : ".")
          }, null, 8, ["textContent"]);
        }), 128)),
        createVNode(_component_v_uni_resize_sensor, {
          ref: "sensor",
          onResize: $options._resize
        }, null, 8, ["onResize"])
      ]),
      withDirectives(createVNode("textarea", {
        ref: "textarea",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.valueSync = $event),
        disabled: $props.disabled,
        maxlength: $options.maxlengthNumber,
        autofocus: $props.autoFocus || $props.focus,
        class: [{"uni-textarea-textarea-fix-margin": $data.fixMargin}, "uni-textarea-textarea"],
        style: {"overflow-y": $props.autoHeight ? "hidden" : "auto"},
        onCompositionstart: _cache[2] || (_cache[2] = (...args) => $options._compositionstart && $options._compositionstart(...args)),
        onCompositionend: _cache[3] || (_cache[3] = (...args) => $options._compositionend && $options._compositionend(...args)),
        onInput: _cache[4] || (_cache[4] = withModifiers((...args) => $options._input && $options._input(...args), ["stop"])),
        onFocus: _cache[5] || (_cache[5] = (...args) => $options._focus && $options._focus(...args)),
        onBlur: _cache[6] || (_cache[6] = (...args) => $options._blur && $options._blur(...args)),
        onTouchstartPassive: _cache[7] || (_cache[7] = (...args) => $options._touchstart && $options._touchstart(...args))
      }, null, 46, ["disabled", "maxlength", "autofocus"]), [
        [vModelText, _ctx.valueSync]
      ])
    ])
  ], 16);
}
script$l.render = render$k;
var script$m = {
  name: "View",
  mixins: [hover],
  listeners: {
    "label-click": "clickHandler"
  }
};
function render$l(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.hoverClass && _ctx.hoverClass !== "none" ? (openBlock(), createBlock("uni-view", mergeProps({
    key: 0,
    class: [_ctx.hovering ? _ctx.hoverClass : ""],
    onTouchstart: _cache[1] || (_cache[1] = (...args) => _ctx._hoverTouchStart && _ctx._hoverTouchStart(...args)),
    onTouchend: _cache[2] || (_cache[2] = (...args) => _ctx._hoverTouchEnd && _ctx._hoverTouchEnd(...args)),
    onTouchcancel: _cache[3] || (_cache[3] = (...args) => _ctx._hoverTouchCancel && _ctx._hoverTouchCancel(...args))
  }, _ctx.$attrs), [
    renderSlot(_ctx.$slots, "default")
  ], 16)) : (openBlock(), createBlock("uni-view", mergeProps({key: 1}, _ctx.$attrs), [
    renderSlot(_ctx.$slots, "default")
  ], 16));
}
script$m.render = render$l;
export {script as Audio, script$1 as Canvas, script$2 as Checkbox, script$3 as CheckboxGroup, script$4 as Editor, script$5 as Form, script$6 as Icon, script$7 as Image, script$8 as Input, script$9 as Label, script$a as MovableView, script$b as Navigator, script$c as Progress, script$d as Radio, script$e as RadioGroup, script$f as ResizeSensor, script$g as RichText, script$h as ScrollView, script$i as Slider, script$j as SwiperItem, script$k as Switch, script$l as Textarea, script$m as View};
