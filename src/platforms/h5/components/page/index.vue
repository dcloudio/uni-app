<template>
  <uni-page :data-page="$route.meta.pagePath">
    <page-head
      v-if="showNavigationBar"
      v-bind="navigationBar" />
    <page-refresh
      v-if="enablePullDownRefresh"
      ref="refresh"
      :color="refreshOptions.color"
      :offset="refreshOptions.offset" />
    <page-body
      v-if="enablePullDownRefresh"
      @touchstart.native="_touchstart"
      @touchmove.native="_touchmove"
      @touchend.native="_touchend"
      @touchcancel.native="_touchend">
      <slot name="page" />
    </page-body>
    <page-body v-else>
      <slot name="page" />
    </page-body>
  </uni-page>
</template>
<style>
    uni-page {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>
<script>
import {
  upx2px
} from 'uni-helpers/index'

import {
  NAVBAR_HEIGHT
} from 'uni-helpers/constants'

import {
  mergeTitleNView
} from 'uni-helpers/patch'

import PageHead from './pageHead'
import PageBody from './pageBody'
import PageRefresh from './pageRefresh'

import pullToRefresh from './pull-to-refresh'

export default {
  name: 'Page',
  mpType: 'page',
  components: {
    PageHead,
    PageBody,
    PageRefresh
  },
  mixins: [pullToRefresh],
  props: {
    isQuit: {
      type: Boolean,
      default: false
    },
    isEntry: {
      type: Boolean,
      default: false
    },
    isTabBar: {
      type: Boolean,
      default: false
    },
    tabBarIndex: {
      type: Number,
      default: -1
    },
    navigationBarBackgroundColor: {
      type: String,
      default: '#000'
    },
    navigationBarTextStyle: {
      default: 'white',
      validator (value) {
        return ['white', 'black'].indexOf(value) !== -1
      }
    },
    navigationBarTitleText: {
      type: String,
      default: ''
    },
    navigationStyle: {
      default: 'default',
      validator (value) {
        return ['default', 'custom'].indexOf(value) !== -1
      }
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    backgroundTextStyle: {
      default: 'dark',
      validator (value) {
        return ['dark', 'light'].indexOf(value) !== -1
      }
    },
    backgroundColorTop: {
      type: String,
      default: '#fff'
    },
    backgroundColorBottom: {
      type: String,
      default: '#fff'
    },
    enablePullDownRefresh: {
      type: Boolean,
      default: false
    },
    onReachBottomDistance: {
      type: Number,
      default: 50
    },
    disableScroll: {
      type: Boolean,
      default: false
    },
    titleNView: {
      type: [Boolean, Object],
      default: true
    },
    pullToRefresh: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    const navigationBar = mergeTitleNView({
      loading: false,
      backButton: !this.isQuit && !this.$route.meta.isQuit, // redirectTo,reLaunch时可能动态修改 meta.isQuit
      backgroundColor: this.navigationBarBackgroundColor,
      textColor: this.navigationBarTextStyle === 'black' ? '#000' : '#fff',
      titleText: this.navigationBarTitleText,
      duration: '0',
      timingFunc: ''
    }, this.titleNView)

    const showNavigationBar = this.navigationStyle === 'default' && this.titleNView

    const refreshOptions = Object.assign({
      support: true,
      color: '#2BD009',
      style: 'circle',
      height: 70,
      range: 150,
      offset: 0
    }, this.pullToRefresh)

    let offset = upx2px(refreshOptions.offset)

    if (showNavigationBar) {
      if (!(this.titleNView && this.titleNView.type === 'transparent')) {
        offset += NAVBAR_HEIGHT
      }
    }

    refreshOptions.offset = offset
    refreshOptions.height = upx2px(refreshOptions.height)
    refreshOptions.range = upx2px(refreshOptions.range)

    return {
      showNavigationBar,
      navigationBar,
      refreshOptions
    }
  },
  created () {
    if (__PLATFORM__ === 'h5') {
      document.title = this.navigationBar.titleText
    }
  }
}
</script>
