<template>
  <uni-tabbar :class="['uni-tabbar-'+position]">
    <div
      :style="{
        backgroundColor:tabbarBackgroundColor,
        'backdrop-filter':blurEffect !== 'none' ? 'blur(10px)' : blurEffect
      }"
      class="uni-tabbar"
    >
      <div
        :style="{backgroundColor:borderColor}"
        class="uni-tabbar-border"
      />
      <div
        v-for="(item,index) in visibleList"
        :key="item.isMidButton ? index : item.pagePath"
        :style="item.isMidButton ? {flex:'0 0 ' + item.width,position:'relative'} : {}"
        class="uni-tabbar__item"
        @click="_switchTab(item,index)"
      >
        <!-- midButton iconPath -->
        <div
          v-if="item.isMidButton"
          class="uni-tabbar__mid"
          :style="_uniTabbarBdStyle(item)"
        >
          <img
            v-if="item.iconPath"
            :style="{width: item.iconWidth,height:item.iconWidth}"
            :src="_getRealPath(item.iconPath)"
          >
        </div>
        <!-- tabbar button -->
        <div
          class="uni-tabbar__bd"
          :style="{height:height}"
        >
          <div
            v-if="getIconPath(item,index) || item.iconPath || item.isMidButton"
            :class="{'uni-tabbar__icon__diff':!item.text}"
            class="uni-tabbar__icon"
            :style="{width: iconWidth,height:iconWidth}"
          >
            <img
              v-if="!item.isMidButton"
              :src="_getRealPath(getIconPath(item,index))"
            >
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
            :style="{
              color:selectedIndex === index ? selectedColor : color,
              fontSize: fontSize,
              lineHeight: !item.iconPath ? 1.8 : 'normal',
              marginTop: !item.iconPath ? 'inherit' : spacing
            }"
            class="uni-tabbar__label"
          >
            {{ item.text }}
            <div
              v-if="item.redDot&&!item.iconPath"
              :class="{'uni-tabbar__badge':!!item.badge}"
              class="uni-tabbar__reddot"
            >
              {{ item.badge }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="uni-placeholder"
      :style="{height:height}"
    />
  </uni-tabbar>
</template>

<style>
  uni-tabbar {
    display: block;
    box-sizing: border-box;
    width: 100%;
    z-index: 998;
  }

  uni-tabbar .uni-tabbar {
    display: flex;
    z-index: 998;
    box-sizing: border-box;
  }

  uni-tabbar.uni-tabbar-top,
  uni-tabbar.uni-tabbar-bottom,
  uni-tabbar.uni-tabbar-top .uni-tabbar,
  uni-tabbar.uni-tabbar-bottom .uni-tabbar {
    position: fixed;
    left: var(--window-left);
    right: var(--window-right);
  }

  .uni-app--showlayout+uni-tabbar.uni-tabbar-top,
  .uni-app--showlayout+uni-tabbar.uni-tabbar-bottom,
  .uni-app--showlayout+uni-tabbar.uni-tabbar-top .uni-tabbar,
  .uni-app--showlayout+uni-tabbar.uni-tabbar-bottom .uni-tabbar {
    left: var(--window-margin);
    right: var(--window-margin);
  }

  uni-tabbar.uni-tabbar-bottom .uni-tabbar {
    bottom: 0;
    padding-bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  uni-tabbar .uni-tabbar~.uni-placeholder {
    width: 100%;
    margin-bottom: 0;
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  }

  uni-tabbar .uni-tabbar * {
    box-sizing: border-box;
  }

  uni-tabbar .uni-tabbar__item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;
    font-size: 0;
    text-align: center;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  uni-tabbar .uni-tabbar__bd {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  uni-tabbar .uni-tabbar__icon {
    position: relative;
    display: inline-block;
    margin-top: 5px;
  }

  uni-tabbar .uni-tabbar__icon.uni-tabbar__icon__diff {
    margin-top: 0px;
    width: 34px;
    height: 34px;
  }

  uni-tabbar .uni-tabbar__icon img {
    width: 100%;
    height: 100%;
  }

  uni-tabbar .uni-tabbar__label {
    position: relative;
    text-align: center;
    font-size: 10px;
  }

  uni-tabbar .uni-tabbar-border {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    transform: scaleY(0.5);
  }

  uni-tabbar .uni-tabbar__reddot {
    position: absolute;
    top: 0;
    right: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #f43530;
    color: #ffffff;
    transform: translate(40%, -20%);
  }

  uni-tabbar .uni-tabbar__badge {
    width: auto;
    height: 16px;
    line-height: 16px;
    border-radius: 16px;
    min-width: 16px;
    padding: 0 2px;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
  }

  uni-tabbar .uni-tabbar__mid {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    background-size: 100% 100%;
  }
</style>

<script>
import getRealPath from 'uni-platform/helpers/get-real-path'
import { isPlainObject } from 'uni-shared'
import { publish } from 'uni-platform/service/bridge'
function cssSupports (css) {
  return window.CSS && CSS.supports && (CSS.supports(css) || CSS.supports.apply(CSS, css.split(':')))
}
export default {
  name: 'TabBar',
  props: {
    position: {
      default: 'bottom',
      validator (value) {
        return ['bottom', 'top'].indexOf(value) !== -1
      }
    },
    color: {
      type: String,
      default: '#999'
    },
    selectedColor: {
      type: String,
      default: '#007aff'
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    borderStyle: {
      type: String,
      default: 'black'
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    matchMedia: {
      type: Object,
      default: function () {
        return {}
      }
    },
    blurEffect: {
      type: String,
      default: 'none'
    },
    fontSize: {
      type: String,
      default: '10px'
    },
    iconWidth: {
      type: String,
      default: '24px'
    },
    spacing: {
      type: String,
      default: '3px'
    },
    height: {
      type: String,
      default: '50px'
    },
    midButton: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      selectedIndex: 0,
      visibleList: []
    }
  },
  computed: {
    tabbarBackgroundColor () {
      // 背景色 区分 高斯模糊 分别返回
      const DefaultBgColor = '#f7f7fa'

      if (this.backgroundColor) return this.backgroundColor

      if (cssSupports('backdrop-filter:blur(10px)') && this.blurEffect !== 'none') {
        if (this.blurEffect === 'dark') {
          return 'rgb(0, 0, 0, 0.8)'
        }

        if (['light', 'extralight'].includes(this.blurEffect)) {
          return 'rgb(250, 250, 250, 0.8)'
        }
      }

      return DefaultBgColor
    },
    borderColor () {
      // 不再限制可配置颜色值
      if (this.borderStyle === 'white') return 'rgba(255, 255, 255, 0.33)'
      if (this.borderStyle === 'black') return 'rgba(0, 0, 0, 0.33)'
      return this.borderStyle
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler () {
      // 只在此做一次 visibleList 的初始化
        if (!this.visibleList.length) this._initVisibleList()
        this.setSelectedIndex()
      }
    },
    list: {
      deep: true,
      handler () {
        this._initVisibleList()
        this.setSelectedIndex()
      }
    }
  },
  created () {
    this.list.forEach(item => {
      if (item.visible === undefined) {
        this.$set(item, 'visible', true)
      }
    })
  },
  beforeCreate () {
    this.__path__ = this.$route.path
  },
  methods: {
    getIconPath (item, index) {
      return (this.selectedIndex === index ? item.selectedIconPath || item.iconPath : item.iconPath) || ''
    },
    setSelectedIndex () {
      if (this.$route.meta.isTabBar) {
        this.__path__ = this.$route.path
        const index = this.visibleList.findIndex(item => this.$route.meta.pagePath === item.pagePath)
        this.selectedIndex = index
      }
    },
    _initVisibleList () {
      this.visibleList = this._initMidButton(this.list.filter(item => item.visible !== false))
    },
    _getRealPath (filePath = '') {
      const SCHEME_RE = /^([a-z-]+:)?\/\//i
      const DATA_RE = /^data:.*,.*/
      if (!(SCHEME_RE.test(filePath) || DATA_RE.test(filePath)) && filePath.indexOf('/') !== 0) {
        filePath = '/' + filePath
      }
      return getRealPath(filePath)
    },
    _switchTab ({
      text,
      pagePath,
      isMidButton = false
    }, index) {
      if (isMidButton) {
        publish('onTabBarMidButtonTap')
        return
      }
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
      if (this.$route.path !== url) {
        this.__path__ = this.$route.path
        uni.switchTab({
          from: 'tabBar',
          url,
          detail
        })
      } else {
        UniServiceJSBridge.emit('onTabItemTap', detail)
      }
    },
    _initMidButton (list) {
      const listLength = list.length
      // 偶数则添加midButton
      if (listLength % 2 === 0 && isPlainObject(this.midButton)) {
        // 给midButton赋值默认值
        const DefaultMidButton = {
          width: '50px',
          height: '50px',
          iconWidth: '24px'
        }
        for (const key in DefaultMidButton) {
          this.midButton[key] = this.midButton[key] || DefaultMidButton[key]
        }
        list.splice(~~(listLength / 2), 0, Object.assign({}, this.midButton, { isMidButton: true }))
      }
      return list
    },
    _uniTabbarBdStyle (item) {
      return Object.assign({}, {
        width: item.width,
        height: item.height,
        backgroundImage: item.backgroundImage ? 'url(\'' + this._getRealPath(item.backgroundImage) + '\')' : ''
      })
    }
  }
}
</script>
