import { defineComponent, createVNode, mergeProps } from "vue";
import { hasOwn } from "@vue/shared";
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
var components = {
  Navigator
};
export { components as default };
