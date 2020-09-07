<template>
  <uni-layout
    v-if="responsive"
    :class="{'uni-app--showlayout':showLayout}"
  >
    <!--TODO header-->
    <uni-content>
      <uni-main>
        <keep-alive :include="keepAliveInclude">
          <router-view :key="routerKey" />
        </keep-alive>
      </uni-main>
      <uni-left-window
        v-if="leftWindow"
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
      rightWindowStyle: ''
    }
  },
  beforeCreate () {
    updateCssVar('--window-left', '0px')
    updateCssVar('--window-right', '0px')
  },
  created () {
    this.leftWindow = Vue.component('VUniLeftWindow')
    this.rightWindow = Vue.component('VUniRightWindow')
    if ( // 低版本不提供 responsive 支持
      (this.leftWindow || this.rightWindow) &&
        uni.canIUse('css.var') &&
        window.matchMedia
    ) {
      this.responsive = Math.max.apply(null, sizes) > minWidth
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
  },
  methods: {
    initMediaQuery () {
      if (!window.matchMedia) {
        return
      }
      const mediaQueryList = window.matchMedia('(min-width: ' + minWidth + 'px)')
      mediaQueryList.addListener((e) => {
        this.showLayout = e.matches
        this.$nextTick(() => {
          this.leftWindow && this.onLeftWindowInit()
          this.rightWindow && this.onRightWindowInit()
        })
      })
      this.showLayout = mediaQueryList.matches
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
    overflow: auto;
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
