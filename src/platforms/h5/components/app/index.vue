<template>
  <uni-app :class="{'uni-app--showtabbar':showTabBar}">
    <!-- <transition :name="transitionName"> -->
    <!-- TODO -->
    <keep-alive :include="keepAliveInclude">
      <router-view :key="key" />
    </keep-alive>
    <!-- </transition> -->
    <tab-bar
      v-if="hasTabBar"
      v-show="showTabBar"
      v-bind="tabBar" />
    <toast
      v-bind="showToast"
      @close="_onModalClose" />
    <action-sheet
      v-bind="showActionSheet"
      @close="_onActionSheetClose" />
    <modal
      v-bind="showModal"
      @close="_onModalClose" />
    <picker
      v-bind="showPicker"
      @close="_onPickerClose" />
  </uni-app>
</template>
<script>
import {
  TABBAR_HEIGHT
} from 'uni-helpers/constants'

import components from './components'

import mixins from './popup/mixins'

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
      tabBar: __uniConfig.tabBar || {}
    }
  },
  computed: {
    key () {
      return this.$route.meta.name + '-' + this.$route.params.__id__ + '-' + (__uniConfig.reLaunch || 1)
    },
    hasTabBar () {
      return __uniConfig.tabBar && __uniConfig.tabBar.list && __uniConfig.tabBar.list.length
    },
    showTabBar () {
      return this.$route.meta.isTabBar && !this.hideTabBar
    }
  },
  watch: {
    $route (newRoute, oldRoute) {
      UniServiceJSBridge.emit('onHidePopup')
    },
    hideTabBar (newVal, oldVal) {
      if (__PLATFORM__ === 'h5') {
        // TODO 不支持 css 变量时
        if (uni.canIUse('css.var')) {
          const windowBottom = !newVal ? (TABBAR_HEIGHT + 'px') : '0px'
          document.documentElement.style.setProperty('--window-bottom', windowBottom)
          console.debug(`uni.${windowBottom ? 'showTabBar' : 'hideTabBar'}：--window-bottom=${windowBottom}`)
        }
      }
    }
  },
  created () {
    if (__PLATFORM__ === 'h5') {
      if (uni.canIUse('css.var')) {
        document.documentElement.style.setProperty('--status-bar-height', '0px')
      }
    }
  },
  mounted () {
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        UniServiceJSBridge.emit('onAppEnterForeground')
      } else {
        UniServiceJSBridge.emit('onAppEnterBackground')
      }
    })
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
