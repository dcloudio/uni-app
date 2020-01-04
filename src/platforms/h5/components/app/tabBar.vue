<template>
  <uni-tabbar>
    <div
      :style="{backgroundColor:backgroundColor}"
      class="uni-tabbar">
      <div
        :style="{backgroundColor:borderColor}"
        class="uni-tabbar-border" />
      <div
        v-for="(item,index) in list"
        :key="item.pagePath"
        class="uni-tabbar__item"
        @click="_switchTab(item,index)"
      >
        <div class="uni-tabbar__bd">
          <div
            v-if="item.iconPath"
            :class="{'uni-tabbar__icon__diff':!item.text}"
            class="uni-tabbar__icon"
          >
            <img
              :src="_getRealPath($route.meta.pagePath===item.pagePath?item.selectedIconPath:item.iconPath)"
            >
            <div
              v-if="item.redDot"
              :class="{'uni-tabbar__badge':!!item.badge}"
              class="uni-tabbar__reddot"
            >{{ item.badge }}</div>
          </div>
          <div
            v-if="item.text"
            :style="{color:$route.meta.pagePath===item.pagePath?selectedColor:color,fontSize:item.iconPath?'10px':'14px'}"
            class="uni-tabbar__label"
          >
            {{ item.text }}
            <div
              v-if="item.redDot&&!item.iconPath"
              :class="{'uni-tabbar__badge':!!item.badge}"
              class="uni-tabbar__reddot"
            >{{ item.badge }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="uni-placeholder" />
  </uni-tabbar>
</template>

<style>
uni-tabbar {
  display: block;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 998;
}

uni-tabbar .uni-tabbar {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 998;
  box-sizing: border-box;
  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

uni-tabbar .uni-tabbar ~ .uni-placeholder {
  width: 100%;
  height: 50px;
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
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

uni-tabbar .uni-tabbar__icon {
  position: relative;
  display: inline-block;
  margin-top: 5px;
  width: 24px;
  height: 24px;
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
  line-height: 1.8;
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
</style>

<script>
import getRealPath from 'uni-platform/helpers/get-real-path'

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
      default: '#f7f7fa'
    },
    borderStyle: {
      default: 'black',
      validator (value) {
        return ['black', 'white'].indexOf(value) !== -1
      }
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    borderColor () {
      return this.borderStyle === 'white'
        ? 'rgba(255, 255, 255, 0.33)'
        : 'rgba(0, 0, 0, 0.33)'
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.meta.isTabBar) {
        this.__path__ = to.path
      }
    }
  },
  beforeCreate () {
    this.__path__ = this.$route.path
  },
  methods: {
    _getRealPath (filePath) {
      if (filePath.indexOf('/') !== 0) {
        filePath = '/' + filePath
      }
      return getRealPath(filePath)
    },
    _switchTab ({
      text,
      pagePath
    }, index) {
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
    }
  }
}
</script>
