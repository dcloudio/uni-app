export function initComponents(Vue, weex) {
  var components = function(vue) {
    "use strict";
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
    var Navigator = vue.defineComponent({
      name: "Navigator",
      props: navigatorProps,
      setup(props, {
        slots
      }) {
        const onClick = createNavigatorOnClick(props);
        return () => vue.createVNode("div", {
          "onClick": onClick
        }, [slots.default && slots.default()]);
      }
    });
    var index = {
      Navigator
    };
    return index;
  }(Vue);
  return components;
}
