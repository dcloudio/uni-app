import {isFunction} from "@vue/shared";
import {openBlock, createBlock, mergeProps, createVNode, toDisplayString} from "vue";
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
export default script;
