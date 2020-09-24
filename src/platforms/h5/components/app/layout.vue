<template>
  <uni-layout
    v-if="responsive"
    :class="{'uni-app--showlayout':showLayout}"
  >
    <uni-top-window
      v-if="topWindow"
      v-show="showTopWindow && topWindowMediaQuery"
    >
      <div
        ref="topWindow"
        class="uni-top-window"
        :style="topWindowStyle"
      >
        <v-uni-top-window
          ref="top"
          @hook:mounted="onTopWindowInit"
        />
      </div>
      <div
        class="uni-top-window--placeholder"
        :style="{height:topWindowHeight}"
      />
    </uni-top-window>
    <uni-content>
      <uni-main>
        <keep-alive :include="keepAliveInclude">
          <router-view :key="routerKey" />
        </keep-alive>
      </uni-main>
      <uni-left-window
        v-if="leftWindow"
        v-show="showLeftWindow && leftWindowMediaQuery"
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
        v-show="showRightWindow && rightWindowMediaQuery"
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

const windowTypes = ['top', 'left', 'right']
const documentElement = document.documentElement

let styleObj

function updateCssVar (name, value) {
  if (!styleObj) {
    styleObj = documentElement.style
  }
  styleObj.setProperty(name, value)
}

function checkMinWidth (minWidth) {
  const screen = window.screen
  const sizes = [
    window.outerWidth,
    window.outerHeight,
    screen.width,
    screen.height,
    documentElement.clientWidth,
    documentElement.clientHeight
  ]
  return Math.max.apply(null, sizes) > minWidth
}

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
      leftWindowStyle: '',
      rightWindowStyle: '',
      topWindowStyle: '',
      topWindowMediaQuery: false,
      leftWindowMediaQuery: false,
      rightWindowMediaQuery: false,
      topWindowHeight: '0px'
    }
  },
  computed: {
    showLayout () {
      return this.showTopWindow || this.showLeftWindow || this.showRightWindow
    },
    showTopWindow () {
      return this.$route.meta.topWindow !== false
    },
    showLeftWindow () {
      return this.$route.meta.leftWindow !== false
    },
    showRightWindow () {
      return this.$route.meta.rightWindow !== false
    }
  },
  watch: {
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
      (this.topWindow || this.leftWindow || this.rightWindow) &&
        uni.canIUse('css.var') &&
        window.matchMedia
    ) {
      windowTypes.forEach(type => this.initWindowMinWidth(type))
      this.responsive = checkMinWidth(this.minWidth)
      if (this.responsive) {
        if (this.topWindow && this.topWindow.options.style) {
          this.topWindowStyle = this.topWindow.options.style
        }
        if (this.leftWindow && this.leftWindow.options.style) {
          this.leftWindowStyle = this.leftWindow.options.style
        }
        if (this.rightWindow && this.rightWindow.options.style) {
          this.rightWindowStyle = this.rightWindow.options.style
        }
        windowTypes.forEach(type => this.initMediaQuery(type))
      }
    }
  },
  methods: {
    initWindowMinWidth (type) {
      const name = type + 'Window'
      if (this[name]) {
        const minWidthName = type + 'WindowMinWidth'
        this[minWidthName] = RESPONSIVE_MIN_WIDTH
        const windowOptions = __uniConfig[name]
        if (windowOptions && windowOptions.matchMedia && windowOptions.matchMedia.minWidth) {
          this[minWidthName] = windowOptions.matchMedia.minWidth
        }
        if (!this.minWidth || this.minWidth > this[minWidthName]) {
          this.minWidth = this[minWidthName]
        }
      }
    },
    initMediaQuery (type) {
      if (this[type + 'Window']) {
        const name = type + 'WindowMediaQuery'
        const mediaQueryList = window.matchMedia('(min-width: ' + this[type + 'WindowMinWidth'] + 'px)')
        mediaQueryList.addListener((e) => {
          this[name] = e.matches
          this.$nextTick(() => {
            this['on' + (type.substr(0, 1).toUpperCase() + type.substr(1)) + 'WindowInit']()
          })
        })
        this[name] = mediaQueryList.matches
      }
    },
    onTopWindowInit () {
      // TODO page header
      let windowTopHeight = '0px'
      if (this.topWindowStyle && this.topWindowStyle.height) {
        windowTopHeight = this.$refs.topWindow.offsetHeight + 'px'
      } else {
        windowTopHeight = this.$refs.top.$el.offsetHeight + 'px'
      }
      this.topWindowHeight = windowTopHeight
      updateCssVar('--window-top', windowTopHeight)
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
    position: relative;
    width: var(--window-left);
    order: -1;
    overflow-x: hidden;
  }

  uni-right-window {
    position: relative;
    width: var(--window-right);
    overflow-x: hidden;
  }

  .uni-app--showlayout+uni-tabbar {
    display: none;
  }

  .uni-top-window {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 998;
    overflow: hidden;
  }
</style>
