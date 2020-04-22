<template>
  <uni-page :data-page="$route.meta.pagePath">
    <page-head
      v-if="navigationBar.type!=='none'"
      v-bind="navigationBar"
    />
    <page-refresh
      v-if="enablePullDownRefresh"
      ref="refresh"
      :color="refreshOptions.color"
      :offset="refreshOptions.offset"
    />
    <page-body
      v-if="enablePullDownRefresh"
      @touchstart.native="_touchstart"
      @touchmove.native="_touchmove"
      @touchend.native="_touchend"
      @touchcancel.native="_touchend"
    >
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
  isPlainObject
} from 'uni-shared'

import {
  mergeTitleNView
} from 'uni-helpers/patch'

import PageHead from './pageHead'
import PageBody from './pageBody'
import PageRefresh from './pageRefresh'

import pullToRefresh from './pull-to-refresh'

import safeAreaInsets from 'safe-area-insets'

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
      type: [Boolean, Object, String],
      default: ''
    },
    pullToRefresh: {
      type: Object,
      default () {
        return {}
      }
    },
    titleImage: {
      type: String,
      default: ''
    },
    transparentTitle: {
      type: String,
      default: ''
    },
    titlePenetrate: {
      type: String,
      default: 'NO'
    },
    navigationBarShadow: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    const titleNViewTypeList = {
      none: 'default',
      auto: 'transparent',
      always: 'float'
    }
    // 将 navigationStyle 和 transparentTitle 都合并到 titleNView
    let titleNView = this.titleNView
    if ( // 无头
      titleNView === false ||
        titleNView === 'false' ||
        (
          this.navigationStyle === 'custom' &&
          !isPlainObject(titleNView)
        ) || (
        this.transparentTitle === 'always' &&
          !isPlainObject(titleNView)
      )
    ) {
      titleNView = {
        type: 'none'
      }
    } else {
      titleNView = Object.assign({}, {
        type: this.navigationStyle === 'custom' ? 'none' : 'default'
      }, this.transparentTitle in titleNViewTypeList ? {
        type: titleNViewTypeList[this.transparentTitle]
      } : null, typeof titleNView === 'object' ? titleNView : (typeof titleNView === 'boolean' ? {
        type: titleNView ? 'default' : 'none'
      } : null))
    }

    const yesNoParseList = {
      YES: true,
      NO: false
    }

    const navigationBar = mergeTitleNView({
      loading: false,
      backButton: !this.isQuit && !this.$route.meta.isQuit, // redirectTo,reLaunch时可能动态修改 meta.isQuit
      backgroundColor: this.navigationBarBackgroundColor,
      textColor: this.navigationBarTextStyle === 'black' ? '#000' : '#fff',
      titleText: this.navigationBarTitleText,
      titleImage: this.titleImage,
      duration: '0',
      timingFunc: '',
      titlePenetrate: yesNoParseList[this.titlePenetrate]
    }, titleNView)
    navigationBar.shadow = this.navigationBarShadow

    const refreshOptions = Object.assign({
      support: true,
      color: '#2BD009',
      style: 'circle',
      height: 70,
      range: 150,
      offset: 0
    }, this.pullToRefresh)

    let offset = upx2px(refreshOptions.offset)

    if (titleNView.type !== 'none' && titleNView.type !== 'transparent') {
      offset += NAVBAR_HEIGHT + safeAreaInsets.top
    }

    refreshOptions.offset = offset
    refreshOptions.height = upx2px(refreshOptions.height)
    refreshOptions.range = upx2px(refreshOptions.range)

    return {
      navigationBar,
      refreshOptions
    }
  },
  created () {
    const navigationBar = this.navigationBar
    document.title = navigationBar.titleText
    UniServiceJSBridge.emit('onNavigationBarChange', navigationBar)
  }
}
</script>
