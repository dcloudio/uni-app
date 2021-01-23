<template>
  <uni-layout
    v-if="responsive"
    :class="{'uni-app--showlayout':showLayout,'uni-app--showtopwindow':showTopWindow,'uni-app--showleftwindow':showLeftWindow,'uni-app--showrightwindow':showRightWindow}"
  >
    <uni-top-window
      v-if="topWindow"
      v-show="showTopWindow || apiShowTopWindow"
    >
      <div
        ref="topWindow"
        class="uni-top-window"
        :style="topWindowStyle"
      >
        <v-uni-top-window
          ref="top"
          :navigation-bar-title-text="navigationBarTitleText"
          v-bind="bindWindow"
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
        v-show="showLeftWindow || apiShowLeftWindow"
        ref="leftWindow"
        :data-show="apiShowLeftWindow"
        :style="leftWindowStyle"
      >
        <div
          v-if="apiShowLeftWindow"
          class="uni-mask"
          @click="apiShowLeftWindow = false"
        />
        <div class="uni-left-window">
          <v-uni-left-window
            ref="left"
            v-bind="bindWindow"
            @hook:mounted="onLeftWindowInit"
          />
        </div>
      </uni-left-window>
      <uni-right-window
        v-if="rightWindow"
        v-show="showRightWindow || apiShowRightWindow"
        ref="rightWindow"
        :data-show="apiShowRightWindow"
        :style="rightWindowStyle"
      >
        <div
          v-if="apiShowRightWindow"
          class="uni-mask"
          @click="apiShowRightWindow = false"
        />
        <div class="uni-right-window">
          <v-uni-right-window
            ref="right"
            v-bind="bindWindow"
            @hook:mounted="onRightWindowInit"
          />
        </div>
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
  hasOwn,
  capitalize
} from 'uni-shared'

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
      marginWidth: 0,
      leftWindowStyle: '',
      rightWindowStyle: '',
      topWindowStyle: '',
      topWindowMediaQuery: false,
      leftWindowMediaQuery: false,
      rightWindowMediaQuery: false,
      topWindowHeight: '0px',
      apiShowTopWindow: false,
      apiShowLeftWindow: false,
      apiShowRightWindow: false,
      navigationBarTitleText: '',
      maxWidthMeidaQuery: false
    }
  },
  computed: {
    bindWindow () {
      return {
        matchTopWindow: this.topWindowMediaQuery,
        showTopWindow: this.showTopWindow || this.apiShowTopWindow,
        matchLeftWindow: this.leftWindowMediaQuery,
        showLeftWindow: this.showLeftWindow || this.apiShowLeftWindow,
        matchRightWindow: this.rightWindowMediaQuery,
        showRightWindow: this.showRightWindow || this.apiShowRightWindow
      }
    },
    showLayout () {
      return this.showTopWindow || this.showLeftWindow || this.showRightWindow
    },
    showTopWindow () {
      this.resetApiShowWindow()
      return this.$route.meta.topWindow !== false && this.topWindowMediaQuery
    },
    showLeftWindow () {
      this.resetApiShowWindow()
      return this.$route.meta.leftWindow !== false && this.leftWindowMediaQuery
    },
    showRightWindow () {
      this.resetApiShowWindow()
      return this.$route.meta.rightWindow !== false && this.rightWindowMediaQuery
    }
  },
  watch: {
    $route () {
      this.checkMaxWidth()
    },
    showLayout () {
      this.checkLayout()
    },
    showTopWindow (newVal, val) {
      if (newVal) {
        this.$nextTick(this.onTopWindowInit)
      } else {
        updateCssVar('--top-window-height', '0px')
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
    },
    marginWidth (newVal) {
      updateCssVar('--window-margin', newVal + 'px')
    }
  },
  beforeCreate () {
    updateCssVar('--top-window-height', '0px')
    updateCssVar('--window-left', '0px')
    updateCssVar('--window-right', '0px')
    updateCssVar('--window-margin', '0px')
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

        UniServiceJSBridge.on('onNavigationBarChange', (navigationBar) => {
          this.navigationBarTitleText = navigationBar.titleText
        })
      }
    }
    this.initMaxWidth()
  },
  mounted () {
    this.checkLayout()
    this.checkMaxWidth()
  },
  methods: {
    resetApiShowWindow () {
      // 仅对 left，right 重置
      // this.apiShowTopWindow = false
      this.apiShowLeftWindow = false
      this.apiShowRightWindow = false
    },
    showWindow (type, show = true) {
      if (!this[type + 'Window']) {
        return type + 'Window not found'
      }
      const fType = capitalize(type)
      if (!this['show' + fType + 'Window']) { // 小屏下
        const apiShowName = 'apiShow' + fType + 'Window'
        if (this[apiShowName] !== show) {
          this[apiShowName] = show
          if (type === 'top') { // 特殊处理 top
            if (show) {
              this.$nextTick(this.onTopWindowInit)
            } else {
              updateCssVar('--top-window-height', '0px')
            }
          }
        }
      }
    },
    getWindowStyle (type) {
      if (!this[type + 'Window']) {
        return type + 'Window not found'
      }
      const style = Object.assign({}, this[type + 'WindowStyle'])
      return style
    },
    setWindowStyle (type, style) {
      if (!this[type + 'Window']) {
        return type + 'Window not found'
      }
      if (style) {
        this[type + 'WindowStyle'] = style
        this.$nextTick(this['on' + capitalize(type) + 'WindowInit'])
      }
    },
    initMaxWidth () {
      window.addEventListener('resize', () => {
        this.checkMaxWidth()
      })
    },
    checkLayout () {
      this.$emit('layout', this.showLayout)
    },
    checkMaxWidth () {
      const windowWidth = document.body.clientWidth
      const maxWidth = parseInt(this.$route.meta.maxWidth)
      let showMaxWidth = false
      if (windowWidth > maxWidth) {
        showMaxWidth = true
      } else {
        showMaxWidth = false
      }
      this.$emit('maxWidth', showMaxWidth)
      if (!this.$containerElem) {
        this.$containerElem = document.querySelector('uni-app')
      }
      if (!this.$containerElem) {
        return
      }
      if (showMaxWidth && maxWidth) {
        this.marginWidth = (windowWidth - maxWidth) / 2
        this.$nextTick(() => {
          this.onLeftWindowInit()
          this.onRightWindowInit()
          this.$containerElem.setAttribute('style', 'max-width:' + maxWidth + 'px;margin:0 auto;')
        })
      } else {
        this.marginWidth = 0
        this.$nextTick(() => {
          this.onLeftWindowInit()
          this.onRightWindowInit()
          this.$containerElem.removeAttribute('style')
        })
      }
    },
    initWindowMinWidth (type) {
      const name = type + 'Window'
      if (this[name]) {
        const minWidthName = type + 'WindowMinWidth'
        this[minWidthName] = RESPONSIVE_MIN_WIDTH
        const windowOptions = __uniConfig[name]
        if (windowOptions && windowOptions.matchMedia && hasOwn(windowOptions.matchMedia, 'minWidth')) {
          this[minWidthName] = windowOptions.matchMedia.minWidth
        }
        if (typeof this.minWidth === 'undefined' || this.minWidth > this[minWidthName]) {
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
            this['on' + capitalize(type) + 'WindowInit']()
          })
        })
        this[name] = mediaQueryList.matches
      }
    },
    onTopWindowInit () {
      if (!(this.responsive && this.topWindow)) {
        return
      }
      // TODO page header
      let windowTopHeight = '0px'
      if (this.topWindowStyle && this.topWindowStyle.height) {
        windowTopHeight = this.$refs.topWindow.offsetHeight + 'px'
      } else {
        windowTopHeight = this.$refs.top.$el.offsetHeight + 'px'
      }
      this.topWindowHeight = windowTopHeight
      updateCssVar('--top-window-height', windowTopHeight)
    },
    onLeftWindowInit () {
      if (!(this.responsive && this.leftWindow)) {
        updateCssVar('--window-left', this.marginWidth + 'px')
        return
      }
      if (this.leftWindowStyle && this.leftWindowStyle.width) {
        updateCssVar('--window-left', this.$refs.leftWindow.offsetWidth + this.marginWidth + 'px')
      } else {
        updateCssVar('--window-left', this.$refs.left.$el.offsetWidth + this.marginWidth + 'px')
      }
    },
    onRightWindowInit () {
      if (!(this.responsive && this.rightWindow)) {
        updateCssVar('--window-right', this.marginWidth + 'px')
        return
      }
      if (this.rightWindowStyle && this.rightWindowStyle.width) {
        updateCssVar('--window-right', this.$refs.rightWindow.offsetWidth + this.marginWidth + 'px')
      } else {
        updateCssVar('--window-right', this.$refs.right.$el.offsetWidth + this.marginWidth + 'px')
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
    width: 100%;
  }

  uni-top-window+uni-content {
    height: calc(100vh - var(--top-window-height));
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

  uni-left-window[data-show],
  uni-right-window[data-show] {
    position: absolute;
  }

  uni-right-window[data-show] {
    right: 0;
  }

  uni-content .uni-mask,
  .uni-left-window,
  .uni-right-window {
    z-index: 997;
  }

  .uni-mask+.uni-left-window,
  .uni-mask+.uni-right-window {
    position: fixed;
  }

  .uni-top-window {
    position: fixed;
    left: var(--window-margin);
    right: var(--window-margin);
    top: 0;
    z-index: 998;
    overflow: hidden;
  }
</style>
