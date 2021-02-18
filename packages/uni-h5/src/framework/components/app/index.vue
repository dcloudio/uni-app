<template>
  <uni-app :class="{ 'uni-app--showtabbar': showTabBar }">
    <!-- <transition :name="transitionName"> -->
    <!-- TODO -->
    <router-view :key="key" v-slot="{ Component }">
      <keep-alive :include="keepAliveInclude" :exclude="keepAliveExclude">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <!-- </transition> -->
    <tab-bar v-if="hasTabBar" v-show="showTabBar" v-bind="tabBar" />
    <toast v-if="$options.components.Toast" v-bind="showToast" />
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
import { isPlainObject } from '@vue/shared'

import { TABBAR_HEIGHT } from '@dcloudio/uni-shared'

import components from './components'

import mixins from './popup/mixins'

import { canIUse } from '../../../service/api'

export default {
  name: 'App',
  components,
  mixins,
  props: {
    keepAliveInclude: {
      type: Array,
      default: function () {
        return []
      },
    },
    keepAliveExclude: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  data() {
    return {
      transitionName: 'fade',
      hideTabBar: false,
      tabBar: __uniConfig.tabBar || {},
      sysComponents: this.$sysComponents,
    }
  },
  computed: {
    key() {
      return this.$route.path + '-' + (history.state.__id__ || -1)
    },
    hasTabBar() {
      return (
        __uniConfig.tabBar &&
        __uniConfig.tabBar.list &&
        __uniConfig.tabBar.list.length
      )
    },
    showTabBar() {
      return this.$route.meta.isTabBar && !this.hideTabBar
    },
  },
  watch: {
    $route(newRoute, oldRoute) {
      UniServiceJSBridge.emit('onHidePopup')
    },
    hideTabBar(newVal, oldVal) {
      // TODO 不支持 css 变量时
      if (canIUse('css.var')) {
        const windowBottomValue = !newVal ? TABBAR_HEIGHT : 0
        const envMethod = canIUse('css.env')
          ? 'env'
          : canIUse('css.constant')
          ? 'constant'
          : ''
        const windowBottom =
          windowBottomValue && envMethod
            ? `calc(${windowBottomValue}px + ${envMethod}(safe-area-inset-bottom))`
            : `${windowBottomValue}px`
        document.documentElement.style.setProperty(
          '--window-bottom',
          windowBottom
        )
        console.debug(
          `uni.${
            windowBottom ? 'showTabBar' : 'hideTabBar'
          }：--window-bottom=${windowBottom}`
        )
      }
      // 触发 resize 事件
      window.dispatchEvent(new CustomEvent('resize'))
    },
  },
  created() {
    if (canIUse('css.var')) {
      document.documentElement.style.setProperty('--status-bar-height', '0px')
    }
  },
  mounted() {
    window.addEventListener('message', function (evt) {
      if (
        isPlainObject(evt.data) &&
        evt.data.type === 'WEB_INVOKE_APPSERVICE'
      ) {
        UniServiceJSBridge.emit(
          'onWebInvokeAppService',
          evt.data.data,
          evt.data.pageId
        )
      }
    })
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        UniServiceJSBridge.emit('onAppEnterForeground')
      } else {
        UniServiceJSBridge.emit('onAppEnterBackground')
      }
    })
  },
}
</script>
