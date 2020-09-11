<template>
  <uni-layout
    v-if="responsive"
    :class="{'uni-app--showlayout':showLayout}"
  >
    <uni-content>
      <uni-main>
        <uni-top-window
          v-if="topWindow"
          v-show="showLayout&&showTopWindow"
          ref="topWindow"
          :style="topWindowStyle"
        >
          <v-uni-top-window
            ref="top"
            @hook:mounted="onTopWindowInit"
          />
        </uni-top-window>
        <keep-alive :include="keepAliveInclude">
          <router-view :key="routerKey" />
        </keep-alive>
      </uni-main>
      <uni-left-window
        v-if="leftWindow"
        v-show="showLayout&&showLeftWindow"
        ref="leftWindow"
        :style="leftWindowStyle"
      >
        <v-uni-left-window
          ref="left"
          @hook:mounted="onLeftWindowInit"
        />
      </uni-left-window>
      <uni-right-window
        v-if="rightWindow"
        v-show="showLayout&&showRightWindow"
        ref="rightWindow"
        :style="rightWindowStyle"
      >
        <v-uni-right-window
          ref="right"
          @hook:mounted="onRightWindowInit"
        />
      </uni-right-window>
    </uni-content>
    <!--TODO footer-->
  </uni-layout>
  <keep-alive
    v-else
    :include="keepAliveInclude"
  >
    <router-view :key="routerKey" />
  </keep-alive>
</template>

<script>
import Vue from 'vue'

import {
  RESPONSIVE_MIN_WIDTH
} from 'uni-helpers/constants'

const screen = window.screen
const documentElement = document.documentElement

const minWidth = parseInt(__uniConfig.responsive && __uniConfig.responsive.minWidth) || RESPONSIVE_MIN_WIDTH

let styleObj

function updateCssVar (name, value) {
  if (!styleObj) {
    styleObj = documentElement.style
  }
  styleObj.setProperty(name, value)
}

const sizes = [
  window.outerWidth,
  window.outerHeight,
  screen.width,
  screen.height,
  documentElement.clientWidth,
  documentElement.clientHeight
]

export default {
  name: 'Layout',
  props: {
    routerKey: {
      type: String,
      default: ''
    },
    keepAliveInclude: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      showLayout: true,
      leftWindowStyle: '',
      rightWindowStyle: '',
      topWindowStyle: '',
      showTopWindow: true,
      showLeftWindow: true,
      showRightWindow: true
    }
  },
  watch: {
    $route (newRoute, oldRoute) {
      this.initShowWindow(newRoute)
    },
    showTopWindow (newVal, val) {
      if (newVal) {
        this.$nextTick(this.onTopWindowInit)
      } else {
        updateCssVar('--window-top', '0px')
      }
    },
    showLeftWindow (newVal, val) {
      if (newVal) {
        this.$nextTick(this.onLeftWindowInit)
      } else {
        updateCssVar('--window-left', '0px')
      }
    },
    showRightWindow (newVal, val) {
      if (newVal) {
        this.$nextTick(this.onRightWindowInit)
      } else {
        updateCssVar('--window-right', '0px')
      }
    }
  },
  beforeCreate () {
    updateCssVar('--window-top', '0px')
    updateCssVar('--window-left', '0px')
    updateCssVar('--window-right', '0px')
  },
  created () {
    this.topWindow = Vue.component('VUniTopWindow')
    this.leftWindow = Vue.component('VUniLeftWindow')
    this.rightWindow = Vue.component('VUniRightWindow')
    if ( // 低版本不提供 responsive 支持
      (this.leftWindow || this.rightWindow) &&
        uni.canIUse('css.var') &&
        window.matchMedia
    ) {
      // 存在 topWindow 时，视为始终要支持 responsive （如 pc-admin 的情况，需要在 top 中切换 left 或 right）
      this.responsive = this.topWindow || Math.max.apply(null, sizes) > minWidth
      if (this.responsive) {
        if (this.leftWindow && this.leftWindow.options.style) {
          this.leftWindowStyle = this.leftWindow.options.style
        }
        if (this.rightWindow && this.rightWindow.options.style) {
          this.rightWindowStyle = this.rightWindow.options.style
        }
        this.initMediaQuery()
      }
    }
    this.initShowWindow(this.$route)
  },
  methods: {
    initShowWindow (newRoute) {
      if (!this.responsive) {
        return
      }
      if (this.topWindow) {
        this.showTopWindow = newRoute.meta.topWindow !== false
      }
      if (this.leftWindow) {
        this.showLeftWindow = newRoute.meta.leftWindow !== false
      }
      if (this.rightWindow) {
        this.showRightWindow = newRoute.meta.rightWindow !== false
      }
    },
    initMediaQuery () {
      if (!window.matchMedia) {
        return
      }
      const mediaQueryList = window.matchMedia('(min-width: ' + minWidth + 'px)')
      mediaQueryList.addListener((e) => {
        this.showLayout = e.matches
        this.$nextTick(() => {
          this.topWindow && this.onTopWindowInit()
          this.leftWindow && this.onLeftWindowInit()
          this.rightWindow && this.onRightWindowInit()
        })
      })
      this.showLayout = mediaQueryList.matches
    },
    onTopWindowInit () {
      // TODO page header
      if (this.topWindowStyle && this.topWindowStyle.width) {
        updateCssVar('--window-top', this.$refs.topWindow.offsetHeight + 'px')
      } else {
        updateCssVar('--window-top', this.$refs.top.$el.offsetHeight + 'px')
      }
    },
    onLeftWindowInit () {
      if (this.leftWindowStyle && this.leftWindowStyle.width) {
        updateCssVar('--window-left', this.$refs.leftWindow.offsetWidth + 'px')
      } else {
        updateCssVar('--window-left', this.$refs.left.$el.offsetWidth + 'px')
      }
    },
    onRightWindowInit () {
      if (this.rightWindowStyle && this.rightWindowStyle.width) {
        updateCssVar('--window-right', this.$refs.rightWindow.offsetWidth + 'px')
      } else {
        updateCssVar('--window-right', this.$refs.right.$el.offsetWidth + 'px')
      }
    }
  }
}
</script>

<style>
  uni-content {
    display: flex;
    flex: 1 0 auto;
    height: 100%;
  }

  uni-main {
    flex: 1;
  }

  uni-left-window {
    display: none;
    position: relative;
    width: var(--window-left);
    order: -1;
    overflow-x: hidden;
  }

  uni-right-window {
    display: none;
    position: relative;
    width: var(--window-right);
    overflow-x: hidden;
  }

  .uni-app--showlayout uni-left-window,
  .uni-app--showlayout uni-right-window {
    display: block;
  }

  .uni-app--showlayout+uni-tabbar {
    display: none;
  }
</style>
