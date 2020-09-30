<template>
  <uni-actionsheet @touchmove.prevent>
    <transition name="uni-fade">
      <div
        v-show="visible"
        class="uni-mask uni-actionsheet__mask"
        @click="_close(-1)"
      />
    </transition>
    <div
      :class="{ 'uni-actionsheet_toggle': visible }"
      :style="actionSheetStyle.content"
      class="uni-actionsheet"
    >
      <div class="uni-actionsheet__menu">
        <div
          v-if="title"
          class="uni-actionsheet__title"
        >
          {{ title }}
        </div>
        <div
          v-for="(itemTitle, index) in itemList"
          :key="index"
          :style="{ color: itemColor }"
          class="uni-actionsheet__cell"
          @click="_close(index)"
        >
          {{ itemTitle }}
        </div>
      </div>
      <div class="uni-actionsheet__action">
        <div
          :style="{ color: itemColor }"
          class="uni-actionsheet__cell"
          @click="_close(-1)"
        >
          取消
        </div>
      </div>
      <div :style="actionSheetStyle.triangle" />
    </div>
  </uni-actionsheet>
</template>
<script>
export default {
  name: 'ActionSheet',
  props: {
    title: {
      type: String,
      default: ''
    },
    itemList: {
      type: Array,
      default () {
        return []
      }
    },
    itemColor: {
      type: String,
      default: '#000000'
    },
    popover: {
      type: Object,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      width: 0,
      height: 0,
      top: top
    }
  },
  computed: {
    actionSheetStyle () {
      const style = {}
      const contentStyle = style.content = {}
      const triangleStyle = style.triangle = {}
      const popover = this.popover
      function getNumber (value) {
        return Number(value) || 0
      }
      if (this.width >= 500 && popover) {
        Object.assign(triangleStyle, {
          position: 'absolute',
          width: '0',
          height: '0',
          'margin-left': '-6px',
          'border-style': 'solid'
        })
        const popoverLeft = getNumber(popover.left)
        const popoverWidth = getNumber(popover.width)
        const popoverTop = getNumber(popover.top)
        const popoverHeight = getNumber(popover.height)
        const center = (popoverLeft + popoverWidth) / 2
        contentStyle.transform = 'none !important'
        const contentLeft = Math.max(0, center - 300 / 2)
        contentStyle.left = `${contentLeft}px`
        let triangleLeft = Math.max(12, center - contentLeft)
        triangleLeft = Math.min(300 - 12, triangleLeft)
        triangleStyle.left = `${triangleLeft}px`
        const vcl = this.height / 2
        if (popoverTop + popoverHeight - vcl > vcl - popoverTop) {
          contentStyle.top = 'auto'
          contentStyle.bottom = `${this.height - popoverTop + 6}px`
          triangleStyle.bottom = '-6px'
          triangleStyle['border-width'] = '6px 6px 0 6px'
          triangleStyle['border-color'] = '#fcfcfd transparent transparent transparent'
        } else {
          contentStyle.top = `${popoverTop + popoverHeight + 6}px`
          triangleStyle.top = '-6px'
          triangleStyle['border-width'] = '0 6px 6px 6px'
          triangleStyle['border-color'] = 'transparent transparent #fcfcfd transparent'
        }
      }
      return style
    }
  },
  mounted () {
    const fixSize = () => {
      const {
        windowWidth,
        windowHeight,
        windowTop
      } = uni.getSystemInfoSync()
      this.width = windowWidth
      this.height = windowHeight + windowTop
      this.top = windowTop
    }
    this.$watch('visible', value => value && fixSize())
    window.addEventListener('resize', fixSize)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', fixSize)
    })
  },
  methods: {
    _close (tapIndex) {
      this.$emit('close', tapIndex)
    }
  }
}
</script>
<style>
uni-actionsheet {
  display: block;
  box-sizing: border-box;
}

uni-actionsheet .uni-actionsheet {
  position: fixed;
  left: 6px;
  right: 6px;
  bottom: 6px;
  transform: translate(0, 100%);
  backface-visibility: hidden;
  z-index: 999;
  visibility: hidden;
  transition: transform 0.3s, visibility 0.3s;
}

uni-actionsheet .uni-actionsheet.uni-actionsheet_toggle {
  visibility: visible;
  transform: translate(0, 0);
}

uni-actionsheet .uni-actionsheet * {
  box-sizing: border-box;
}

uni-actionsheet .uni-actionsheet__menu,
uni-actionsheet .uni-actionsheet__action {
  border-radius: 5px;
  background-color: #fcfcfd;
}

uni-actionsheet .uni-actionsheet__action {
  margin-top: 6px;
}

uni-actionsheet .uni-actionsheet__cell,
uni-actionsheet .uni-actionsheet__title {
  position: relative;
  padding: 10px 6px;
  text-align: center;
  font-size: 18px;
  text-overflow: ellipsis;
  overflow: hidden;
}

uni-actionsheet .uni-actionsheet__cell:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #e5e5e5;
  color: #e5e5e5;
  transform-origin: 0 0;
  transform: scaleY(0.5);
}

uni-actionsheet .uni-actionsheet__cell:active {
  background-color: #ececec;
}

uni-actionsheet .uni-actionsheet__cell:first-child:before {
  display: none;
}

@media screen and (min-width: 500px) {
  .uni-mask.uni-actionsheet__mask {
    background: none;
  }
  uni-actionsheet .uni-actionsheet {
    width: 300px;
    left: 50%;
    right: auto;
    top: 50%;
    bottom: auto;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s, visibility 0.3s;
  }
  uni-actionsheet .uni-actionsheet.uni-actionsheet_toggle {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  uni-actionsheet .uni-actionsheet__menu {
    box-shadow: 0px 0 20px 5px rgba(0, 0, 0, 0.3);
  }
  uni-actionsheet .uni-actionsheet__action {
    display: none;
  }
}
</style>
