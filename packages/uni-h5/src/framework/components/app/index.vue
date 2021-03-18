<template>
  <uni-app :class="{ 'uni-app--showtabbar': showTabBar }">
    <!-- <transition :name="transitionName"> -->
    <!-- TODO -->
    <router-view v-slot="{ Component }">
      <keep-alive :cache="routeCache">
        <component :is="Component" :key="routeKey" />
      </keep-alive>
    </router-view>
    <!-- </transition> -->
    <tab-bar v-if="hasTabBar" v-show="showTabBar" v-bind="tabBar" />
  </uni-app>
</template>
<script>
import { isPlainObject } from '@vue/shared'

import { TABBAR_HEIGHT } from '@dcloudio/uni-shared'

import components from './components'

import mixins from './popup/mixins'

import { canIUse } from '../../../service/api'

import { useKeepAliveRoute } from '../../plugin/page'

export default {
  name: 'App',
  components,
  mixins,
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
      return this.$route.path + '-' + (history.state.__id__ || 0)
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
  setup() {
    const { routeKey, routeCache } = useKeepAliveRoute()
    return {
      routeKey,
      routeCache,
    }
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
