<template>
  <uni-tabbar
    v-if="hasTabBar"
    v-show="showTabBar"
  >
    <div
      :style="{'flex-direction':direction==='vertical'?'column':'row',backgroundColor:tabBarOptions.backgroundColor}"
      class="uni-tabbar"
    >
      <div
        v-for="(item,index) in tabBarOptions.list"
        :key="item.pagePath"
        class="uni-tabbar__item"
        @click="_switchTab(item,index)"
      >
        <div class="uni-tabbar__bd">
          <div
            v-if="showIcon && item.iconPath"
            :class="{'uni-tabbar__icon__diff':!item.text}"
            class="uni-tabbar__icon"
          >
            <img :src="_getRealPath(selectedIndex===index?item.selectedIconPath:item.iconPath)">
            <div
              v-if="item.redDot"
              :class="{'uni-tabbar__badge':!!item.badge}"
              class="uni-tabbar__reddot"
            >
              {{ item.badge }}
            </div>
          </div>
          <div
            v-if="item.text"
            :style="{color:selectedIndex===index?tabBarOptions.selectedColor:tabBarOptions.color,fontSize:showIcon&&item.iconPath?'10px':'14px'}"
            class="uni-tabbar__label"
          >
            {{ item.text }}
            <div
              v-if="item.redDot&&(!showIcon || !item.iconPath)"
              :class="{'uni-tabbar__badge':!!item.badge}"
              class="uni-tabbar__reddot"
            >
              {{ item.badge }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </uni-tabbar>
</template>

<script>
import getRealPath from 'uni-platform/helpers/get-real-path'
import {
  tabBar
} from './observable'
export default {
  name: 'CustomTabBar',
  props: {
    selected: {
      type: Number,
      default: 0
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'horizontal'
    }
  },
  data () {
    return {
      selectedIndex: this.selected
    }
  },
  computed: {
    tabBarOptions () {
      return tabBar
    },
    hasTabBar () {
      return tabBar.list && tabBar.list.length
    },
    showTabBar () {
      const app = getApp()
      if (app) {
        return !app.$children[0].hideTabBar
      }
      return true
    }
  },
  watch: {
    selected (val) {
      this.selectedIndex = val
      // 同步至内置tabBar
      const tabBar = getApp().$children[0].$refs.tabBar
      if (tabBar) {
        tabBar.selectedIndex = val
      }
    },
    '$route' (to, from) {
      if (to.meta.isTabBar) {
        const index = tabBar.list.findIndex(item => to.meta.pagePath === item.pagePath)
        if (index > -1) {
          this.selectedIndex = index
        }
      }
    }
  },
  methods: {
    _getRealPath (filePath) {
      const SCHEME_RE = /^([a-z-]+:)?\/\//i
      const DATA_RE = /^data:.*,.*/
      if (!(SCHEME_RE.test(filePath) || DATA_RE.test(filePath)) && filePath.indexOf('/') !== 0) {
        filePath = '/' + filePath
      }
      return getRealPath(filePath)
    },
    _switchTab ({
      text,
      pagePath
    }, index) {
      this.selectedIndex = index
      let url = '/' + pagePath
      if (url === __uniRoutes[0].alias) {
        url = '/'
      }
      const detail = {
        index,
        text,
        pagePath
      }
      this.$emit('onTabItemTap', detail)
      if (this.$route.path === url) {
        UniServiceJSBridge.emit('onTabItemTap', detail)
      }
    }
  }
}
</script>

<style>
</style>
