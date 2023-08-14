<template>
  <uni-app :class="{ 'uni-app--showtabbar': showTabBar, 'uni-app--maxwidth': showMaxWidth }">
    <layout
      ref="layout"
      :router-key="key"
      :keep-alive-include="keepAliveInclude"
      @maxWidth="onMaxWidth"
      @layout="onLayout"
    />
    <tab-bar
      v-if="hasTabBar"
      v-show="showTabBar"
      ref="tabBar"
      v-bind="tabBarOptions"
    />
    <toast
      v-if="$options.components.Toast"
      v-bind="showToast"
    />
    <action-sheet
      v-if="$options.components.ActionSheet"
      v-bind="showActionSheet"
      @close="_onActionSheetClose"
    />
    <modal
      v-if="$options.components.Modal"
      v-bind="showModal"
      @close="_onModalClose"
    />
    <preview-image
      v-if="$options.components.PreviewImage"
      v-bind="previewImage"
      @close="_onPreviewClose"
    />
    <template v-if="sysComponents && sysComponents.length">
      <component
        :is="item"
        v-for="(item, index) in sysComponents"
        :key="index"
      />
    </template>
  </uni-app>
</template>
<script>
import {
  hasOwn,
  isPlainObject
} from 'uni-shared'

import {
  TABBAR_HEIGHT,
  ON_THEME_CHANGE
} from 'uni-helpers/constants'

import components from './components'

import mixins from 'uni-h5-app-mixins'

import {
  tabBar
} from './observable'

function onThemeChange () {
  let mediaQueryList = null

  try {
    mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
  } catch (error) {}

  if (mediaQueryList) {
    const callback = (e) => {
      UniServiceJSBridge.emit('api.' + ON_THEME_CHANGE, {
        theme: e.matches ? 'dark' : 'light'
      })
    }
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', callback)
    } else {
      mediaQueryList.addListener(callback)
    }
  }
}

export default {
  name: 'App',
  components,
  mixins,
  props: {
    keepAliveInclude: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      transitionName: 'fade',
      hideTabBar: false,
      sysComponents: this.$sysComponents,
      showLayout: false,
      showMaxWidth: false,
      tabBarMediaQuery: false
    }
  },
  computed: {
    key () {
      return this.$route.meta.name + '-' + this.$route.params.__id__ + '-' + (__uniConfig.reLaunch || 1)
    },
    tabBarOptions () {
      return tabBar
    },
    hasTabBar () {
      return tabBar.list && tabBar.list.length
    },
    showTabBar () {
      return !this.hideTabBar &&
        (
          this.$route.meta.isTabBar ||
          this.tabBarMediaQuery
        )
    }
  },
  watch: {
    $route (newRoute, oldRoute) {
      UniServiceJSBridge.emit('onHidePopup')
    },
    hideTabBar (newVal, oldVal) {
      // TODO 不支持 css 变量时
      if (uni.canIUse('css.var')) {
        const windowBottomValue = !newVal ? (TABBAR_HEIGHT) : 0
        const envMethod = uni.canIUse('css.env') ? 'env' : (uni.canIUse('css.constant') ? 'constant' : '')
        const windowBottom = windowBottomValue && envMethod
          ? `calc(${windowBottomValue}px + ${envMethod}(safe-area-inset-bottom))` : `${windowBottomValue}px`
        document.documentElement.style.setProperty('--window-bottom', windowBottom)
        console.debug(`uni.${windowBottom ? 'showTabBar' : 'hideTabBar'}：--window-bottom=${windowBottom}`)
      }
      // 触发 resize 事件
      window.dispatchEvent(new CustomEvent('resize'))
    }
  },
  created () {
    if (uni.canIUse('css.var')) {
      document.documentElement.style.setProperty('--status-bar-height', '0px')
    }
    this.initMediaQuery()
  },
  mounted () {
    window.addEventListener('message', function (evt) {
      if (isPlainObject(evt.data) && evt.data.type === 'WEB_INVOKE_APPSERVICE') {
        UniServiceJSBridge.emit('onWebInvokeAppService', evt.data.data, evt.data.pageId)
      }
    })
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        UniServiceJSBridge.emit('onAppEnterForeground', {})
      } else {
        UniServiceJSBridge.emit('onAppEnterBackground')
      }
    })
    onThemeChange()
  },
  methods: {
    onLayout (showLayout) {
      this.showLayout = showLayout
    },
    onMaxWidth (showMaxWidth) {
      this.showMaxWidth = showMaxWidth
    },
    initMediaQuery () {
      if (
        window.matchMedia &&
        tabBar.matchMedia &&
        hasOwn(tabBar.matchMedia, 'minWidth')
      ) {
        const mediaQueryList = window.matchMedia('(min-width: ' + tabBar.matchMedia.minWidth + 'px)')
        mediaQueryList.addListener((e) => {
          this.tabBarMediaQuery = e.matches
        })
        this.tabBarMediaQuery = mediaQueryList.matches
      }
    }
  }
}
</script>

<style>
@import "~uni-core/view/index.css";

uni-app {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>
