<template>
  <uni-navigator
    v-if="hoverClass && hoverClass !== 'none'"
    :class="[hovering ? hoverClass : '']"
    v-bind="binding"
    @click="_onClick"
  >
    <slot />
  </uni-navigator>
  <uni-navigator v-else @click="_onClick">
    <slot />
  </uni-navigator>
</template>
<script>
import { useHover } from "../../helpers/useHover";

const OPEN_TYPES = ["navigate", "redirect", "switchTab", "reLaunch", "navigateBack"];

export default {
  name: "Navigator",
  compatConfig: {
    MODE: 3
  },
  props: {
    hoverClass: {
      type: String,
      default: "navigator-hover",
    },
    url: {
      type: String,
      default: "",
    },
    openType: {
      type: String,
      default: "navigate",
      validator(value) {
        return ~OPEN_TYPES.indexOf(value);
      },
    },
    delta: {
      type: Number,
      default: 1,
    },
    hoverStartTime: {
      type: [Number, String],
      default: 50,
    },
    hoverStayTime: {
      type: [Number, String],
      default: 600,
    },
    exists: {
      type: String,
      default: "",
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    _onClick($event) {
      if (this.openType !== "navigateBack" && !this.url) {
        console.error(
          "<navigator/> should have url attribute when using navigateTo, redirectTo, reLaunch or switchTab"
        );
        return;
      }

      switch (this.openType) {
        case "navigate":
          uni.navigateTo({
            url: this.url,
          });
          break;
        case "redirect":
          uni.redirectTo({
            url: this.url,
            exists: this.exists,
          });
          break;
        case "switchTab":
          uni.switchTab({
            url: this.url,
          });
          break;
        case "reLaunch":
          uni.reLaunch({
            url: this.url,
          });
          break;
        case "navigateBack":
          uni.navigateBack({
            delta: this.delta,
          });
          break;
        default:
          break;
      }
    },
  },

  setup(props) {
    const { hovering, binding } = useHover(props);

    return {
      hovering,
      binding,
    };
  },
};
</script>
