<template>
  <uni-scroll-view ref="rootRef">
    <div ref="wrap" class="uni-scroll-view">
      <div
        ref="main"
        :style="{
          'overflow-x': scrollX ? 'auto' : 'hidden',
          'overflow-y': scrollY ? 'auto' : 'hidden',
        }"
        class="uni-scroll-view"
      >
        <div ref="content" class="uni-scroll-view-content">
          <div
            v-if="refresherEnabled"
            ref="refresherinner"
            :style="{
              'background-color': refresherBackground,
              height: refresherHeight + 'px',
            }"
            class="uni-scroll-view-refresher"
          >
            <div v-if="refresherDefaultStyle !== 'none'" class="uni-scroll-view-refresh">
              <div class="uni-scroll-view-refresh-inner">
                <svg
                  v-if="refreshState == 'pulling'"
                  :style="{ transform: 'rotate(' + refreshRotate + 'deg)' }"
                  fill="#2BD009"
                  class="uni-scroll-view-refresh__icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                  />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
                <svg
                  v-if="refreshState == 'refreshing'"
                  class="uni-scroll-view-refresh__spinner"
                  width="24"
                  height="24"
                  viewBox="25 25 50 50"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    style="color: #2bd009"
                    stroke-width="3"
                  />
                </svg>
              </div>
            </div>
            <slot v-if="refresherDefaultStyle == 'none'" name="refresher" />
          </div>
          <slot />
        </div>
      </div>
    </div>
  </uni-scroll-view>
</template>
<script>
import { ref } from "vue";
import scroller from "../../mixins/scroller/index";
import { passive } from "@dcloudio/uni-shared";
import { initScrollBounce, disableScrollBounce } from "../../helpers/scroll";
import { useCustomEvent } from "../../helpers/useEvent";

const passiveOptions = passive(true);

// const PULLING = 'pulling'
// const REFRESHING = 'refreshing'

export default /*#__PURE__*/ {
  name: "ScrollView",
  mixins: [scroller],
  props: {
    scrollX: {
      type: [Boolean, String],
      default: false,
    },
    scrollY: {
      type: [Boolean, String],
      default: false,
    },
    upperThreshold: {
      type: [Number, String],
      default: 50,
    },
    lowerThreshold: {
      type: [Number, String],
      default: 50,
    },
    scrollTop: {
      type: [Number, String],
      default: 0,
    },
    scrollLeft: {
      type: [Number, String],
      default: 0,
    },
    scrollIntoView: {
      type: String,
      default: "",
    },
    scrollWithAnimation: {
      type: [Boolean, String],
      default: false,
    },
    enableBackToTop: {
      type: [Boolean, String],
      default: false,
    },
    refresherEnabled: {
      type: [Boolean, String],
      default: false,
    },
    refresherThreshold: {
      type: Number,
      default: 45,
    },
    refresherDefaultStyle: {
      type: String,
      default: "back",
    },
    refresherBackground: {
      type: String,
      default: "#fff",
    },
    refresherTriggered: {
      type: [Boolean, String],
      default: false,
    },
  },
  data() {
    return {
      lastScrollTop: this.scrollTopNumber,
      lastScrollLeft: this.scrollLeftNumber,
      lastScrollToUpperTime: 0,
      lastScrollToLowerTime: 0,
      refresherHeight: 0,
      refreshRotate: 0,
      refreshState: "",
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
    },
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
      // TODO
      if (val === true) {
        this._setRefreshState("refreshing");
      } else if (val === false) {
        this._setRefreshState("restore");
      }
    },
  },
  mounted() {
    this.$trigger = useCustomEvent(
      {
        value: this.rootRef,
      },
      this.$emit
    );
    var self = this;
    this._attached = true;
    this._scrollTopChanged(this.scrollTopNumber);
    this._scrollLeftChanged(this.scrollLeftNumber);
    this._scrollIntoViewChanged(this.scrollIntoView);
    this.__handleScroll = function (event) {
      // Unable to preventDefault inside passive event listener invocation.
      // event.preventDefault();
      event.stopPropagation();
      self._handleScroll.bind(self, event)();
    };
    var touchStart = null;
    var needStop = null;
    this.__handleTouchMove = function (event) {
      var x = event.touches[0].pageX;
      var y = event.touches[0].pageY;
      var main = self.main;
      if (needStop === null) {
        if (Math.abs(x - touchStart.x) > Math.abs(y - touchStart.y)) {
          // 横向滑动
          if (self.scrollX) {
            if (main.scrollLeft === 0 && x > touchStart.x) {
              needStop = false;
              return;
            } else if (
              main.scrollWidth === main.offsetWidth + main.scrollLeft &&
              x < touchStart.x
            ) {
              needStop = false;
              return;
            }
            needStop = true;
          } else {
            needStop = false;
          }
        } else {
          // 纵向滑动
          if (self.scrollY) {
            if (main.scrollTop === 0 && y > touchStart.y) {
              needStop = false;
              return;
            } else if (
              main.scrollHeight === main.offsetHeight + main.scrollTop &&
              y < touchStart.y
            ) {
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
        event.stopPropagation();
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

        self.$trigger("refresherpulling", event, {
          deltaY: dy,
        });
      }
    };

    this.__handleTouchStart = function (event) {
      if (event.touches.length === 1) {
        disableScrollBounce({
          disable: true,
        });
        needStop = null;
        touchStart = {
          x: event.touches[0].pageX,
          y: event.touches[0].pageY,
        };
        if (
          self.refresherEnabled &&
          self.refreshState !== "refreshing" &&
          self.main.scrollTop === 0
        ) {
          self.refreshState = "pulling";
        }
      }
    };
    this.__handleTouchEnd = function (event) {
      touchStart = null;
      disableScrollBounce({
        disable: false,
      });
      if (self.refresherHeight >= self.refresherThreshold) {
        self._setRefreshState("refreshing");
      } else {
        self.refresherHeight = 0;
        self.$trigger("refresherabort", event, {});
      }
    };
    this.main.addEventListener("touchstart", this.__handleTouchStart, passiveOptions);
    this.main.addEventListener("touchmove", this.__handleTouchMove, passiveOptions);
    this.main.addEventListener("scroll", this.__handleScroll, passiveOptions);
    this.main.addEventListener("touchend", this.__handleTouchEnd, passiveOptions);
    initScrollBounce();
  },
  activated() {
    // 还原 scroll-view 滚动位置
    this.scrollY && (this.main.scrollTop = this.lastScrollTop);
    this.scrollX && (this.main.scrollLeft = this.lastScrollLeft);
  },
  beforeUnmount() {
    this.main.removeEventListener("touchstart", this.__handleTouchStart, passiveOptions);
    this.main.removeEventListener("touchmove", this.__handleTouchMove, passiveOptions);
    this.main.removeEventListener("scroll", this.__handleScroll, passiveOptions);
    this.main.removeEventListener("touchend", this.__handleTouchEnd, passiveOptions);
  },
  methods: {
    scrollTo: function (t, n) {
      var i = this.main;
      t < 0
        ? (t = 0)
        : n === "x" && t > i.scrollWidth - i.offsetWidth
        ? (t = i.scrollWidth - i.offsetWidth)
        : n === "y" &&
          t > i.scrollHeight - i.offsetHeight &&
          (t = i.scrollHeight - i.offsetHeight);
      var r = 0;
      var o = "";
      n === "x" ? (r = i.scrollLeft - t) : n === "y" && (r = i.scrollTop - t);
      if (r !== 0) {
        this.content.style.transition = "transform .3s ease-out";
        this.content.style.webkitTransition = "-webkit-transform .3s ease-out";
        if (n === "x") {
          o = "translateX(" + r + "px) translateZ(0)";
        } else {
          n === "y" && (o = "translateY(" + r + "px) translateZ(0)");
        }
        this.content.removeEventListener("transitionend", this.__transitionEnd);
        this.content.removeEventListener("webkitTransitionEnd", this.__transitionEnd);
        this.__transitionEnd = this._transitionEnd.bind(this, t, n);
        this.content.addEventListener("transitionend", this.__transitionEnd);
        this.content.addEventListener("webkitTransitionEnd", this.__transitionEnd);
        if (n === "x") {
          // if (e !== 'ios') {
          i.style.overflowX = "hidden";
          // }
        } else if (n === "y") {
          i.style.overflowY = "hidden";
        }

        this.content.style.transform = o;
        this.content.style.webkitTransform = o;
      }
    },
    _handleTrack: function ($event) {
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
        if (
          Math.abs(this._y - $event.detail.y) / Math.abs(this._x - $event.detail.x) >
          1
        ) {
          this._noBubble = true;
        } else {
          this._noBubble = false;
        }
      }
      if (this._noBubble === null && this.scrollX) {
        if (
          Math.abs(this._x - $event.detail.x) / Math.abs(this._y - $event.detail.y) >
          1
        ) {
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
    _handleScroll: function ($event) {
      if (!($event.timeStamp - this._lastScrollTime < 20)) {
        this._lastScrollTime = $event.timeStamp;
        const target = $event.target;
        this.$trigger("scroll", $event, {
          scrollLeft: target.scrollLeft,
          scrollTop: target.scrollTop,
          scrollHeight: target.scrollHeight,
          scrollWidth: target.scrollWidth,
          deltaX: this.lastScrollLeft - target.scrollLeft,
          deltaY: this.lastScrollTop - target.scrollTop,
        });
        if (this.scrollY) {
          if (
            target.scrollTop <= this.upperThresholdNumber &&
            this.lastScrollTop - target.scrollTop > 0 &&
            $event.timeStamp - this.lastScrollToUpperTime > 200
          ) {
            this.$trigger("scrolltoupper", $event, {
              direction: "top",
            });
            this.lastScrollToUpperTime = $event.timeStamp;
          }
          if (
            target.scrollTop + target.offsetHeight + this.lowerThresholdNumber >=
              target.scrollHeight &&
            this.lastScrollTop - target.scrollTop < 0 &&
            $event.timeStamp - this.lastScrollToLowerTime > 200
          ) {
            this.$trigger("scrolltolower", $event, {
              direction: "bottom",
            });
            this.lastScrollToLowerTime = $event.timeStamp;
          }
        }
        if (this.scrollX) {
          if (
            target.scrollLeft <= this.upperThresholdNumber &&
            this.lastScrollLeft - target.scrollLeft > 0 &&
            $event.timeStamp - this.lastScrollToUpperTime > 200
          ) {
            this.$trigger("scrolltoupper", $event, {
              direction: "left",
            });
            this.lastScrollToUpperTime = $event.timeStamp;
          }
          if (
            target.scrollLeft + target.offsetWidth + this.lowerThresholdNumber >=
              target.scrollWidth &&
            this.lastScrollLeft - target.scrollLeft < 0 &&
            $event.timeStamp - this.lastScrollToLowerTime > 200
          ) {
            this.$trigger("scrolltolower", $event, {
              direction: "right",
            });
            this.lastScrollToLowerTime = $event.timeStamp;
          }
        }
        this.lastScrollTop = target.scrollTop;
        this.lastScrollLeft = target.scrollLeft;
      }
    },
    _scrollTopChanged: function (val) {
      if (this.scrollY) {
        if (this._innerSetScrollTop) {
          this._innerSetScrollTop = false;
        } else {
          if (this.scrollWithAnimation) {
            this.scrollTo(val, "y");
          } else {
            this.main.scrollTop = val;
          }
        }
      }
    },
    _scrollLeftChanged: function (val) {
      if (this.scrollX) {
        if (this._innerSetScrollLeft) {
          this._innerSetScrollLeft = false;
        } else {
          if (this.scrollWithAnimation) {
            this.scrollTo(val, "x");
          } else {
            this.main.scrollLeft = val;
          }
        }
      }
    },
    _scrollIntoViewChanged: function (val) {
      if (val) {
        if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(val)) {
          console.error(`id error: scroll-into-view=${val}`);
          return;
        }
        var element = this.rootRef.querySelector("#" + val);
        if (element) {
          var mainRect = this.main.getBoundingClientRect();
          var elRect = element.getBoundingClientRect();
          if (this.scrollX) {
            var left = elRect.left - mainRect.left;
            var scrollLeft = this.main.scrollLeft;
            var x = scrollLeft + left;
            if (this.scrollWithAnimation) {
              this.scrollTo(x, "x");
            } else {
              this.main.scrollLeft = x;
            }
          }
          if (this.scrollY) {
            var top = elRect.top - mainRect.top;
            var scrollTop = this.main.scrollTop;
            var y = scrollTop + top;
            if (this.scrollWithAnimation) {
              this.scrollTo(y, "y");
            } else {
              this.main.scrollTop = y;
            }
          }
        }
      }
    },
    _transitionEnd: function (val, type) {
      this.content.style.transition = "";
      this.content.style.webkitTransition = "";
      this.content.style.transform = "";
      this.content.style.webkitTransform = "";
      var main = this.main;
      if (type === "x") {
        main.style.overflowX = this.scrollX ? "auto" : "hidden";
        main.scrollLeft = val;
      } else if (type === "y") {
        main.style.overflowY = this.scrollY ? "auto" : "hidden";
        main.scrollTop = val;
      }
      this.content.removeEventListener("transitionend", this.__transitionEnd);
      this.content.removeEventListener("webkitTransitionEnd", this.__transitionEnd);
    },
    _setRefreshState(state) {
      switch (state) {
        case "refreshing":
          this.refresherHeight = this.refresherThreshold;
          this.$trigger("refresherrefresh", {}, {});
          break;
        case "restore":
          this.refresherHeight = 0;
          this.$trigger("refresherrestore", {}, {});
          break;
      }
      this.refreshState = state;
    },
    getScrollPosition() {
      const main = this.main;
      return {
        scrollLeft: main.scrollLeft,
        scrollTop: main.scrollTop,
        scrollHeight: main.scrollHeight,
        scrollWidth: main.scrollWidth,
      };
    },
  },
  setup(props) {
    const rootRef = ref(null);
    const main = ref(null);
    const content = ref(null);

    return {
      rootRef,
      main,
      content,
    };
  },
};
</script>
