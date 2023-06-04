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
      :style="popupStyle.content"
      class="uni-actionsheet"
    >
      <div
        ref="main"
        class="uni-actionsheet__menu"
        @wheel="_handleWheel"
      >
        <!-- title占位 -->
        <div
          v-if="title"
          class="uni-actionsheet__cell"
          :style="{height:`${titleHeight}px`}"
        />
        <div
          v-if="title"
          class="uni-actionsheet__title"
        >
          {{ title }}
        </div>
        <div :style="{maxHeight:`${HEIGHT}px`,overflow:'hidden'}">
          <div ref="content">
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
        </div>
      </div>
      <div class="uni-actionsheet__action">
        <div
          :style="{ color: itemColor }"
          class="uni-actionsheet__cell"
          @click="_close(-1)"
        >
          {{ $$t('uni.showActionSheet.cancel') }}
        </div>
      </div>
      <div :style="popupStyle.triangle" />
    </div>
    <keypress
      :disable="!visible"
      @esc="_close(-1)"
    />
  </uni-actionsheet>
</template>
<script>
import popup from './mixins/popup'
import keypress from '../../../helpers/keypress'
import {
  i18nMixin
} from 'uni-core/helpers/i18n'
import touchtrack from 'uni-mixins/touchtrack'
import scroller from 'uni-mixins/scroller/index'
import {
  Friction
} from 'uni-mixins/scroller/Friction'
import {
  Spring
} from 'uni-mixins/scroller/Spring'
import {
  initScrollBounce,
  disableScrollBounce
} from 'uni-platform/helpers/scroll'

// 由于模拟滚动阻止了点击，使用自定义事件来触发点击事件
function initClick (dom) {
  const MAX_MOVE = 20
  let x = 0
  let y = 0
  dom.addEventListener('touchstart', (event) => {
    const info = event.changedTouches[0]
    x = info.clientX
    y = info.clientY
  })
  dom.addEventListener('touchend', (event) => {
    const info = event.changedTouches[0]
    if (Math.abs(info.clientX - x) < MAX_MOVE && Math.abs(info.clientY - y) < MAX_MOVE) {
      const customEvent = new CustomEvent('click', {
        bubbles: true,
        cancelable: true,
        target: event.target,
        currentTarget: event.currentTarget
      });
      ['screenX', 'screenY', 'clientX', 'clientY', 'pageX', 'pageY'].forEach(key => {
        customEvent[key] = info[key]
      })
      event.target.dispatchEvent(customEvent)
    }
  })
}

export default {
  name: 'ActionSheet',
  components: {
    keypress
  },
  mixins: [i18nMixin, popup, touchtrack, scroller],
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
      HEIGHT: 260,
      contentHeight: 0,
      titleHeight: 0,
      deltaY: 0,
      scrollTop: 0
    }
  },
  watch: {
    visible (newValue) {
      if (newValue) {
        this.$nextTick(() => {
          // title 占位
          if (this.title) {
            this.titleHeight = document.querySelector('.uni-actionsheet__title').offsetHeight
          }
          // 滚动条更新
          this._scroller.update()
          // 获取contentHeight 滚动时使用
          this.contentHeight = this.$refs.content.clientHeight - this.HEIGHT
          // 给每一个项添加点击事件
          document.querySelectorAll('.uni-actionsheet__cell').forEach(item => {
            initClick(item)
          })
        })
      }
    }
  },
  mounted () {
    // 模拟滚动使用
    this.touchtrack(this.$refs.content, '_handleTrack', true)
    this.$nextTick(() => {
      this.initScroller(this.$refs.content, {
        enableY: true,
        friction: new Friction(0.0001),
        spring: new Spring(2, 90, 20),
        onScroll: (e) => {
          this.scrollTop = e.target.scrollTop
        }
      })
    })
    initScrollBounce()
  },
  methods: {
    _close (tapIndex) {
      this.$emit('close', tapIndex)
    },
    _handleTrack: function (e) {
      if (this._scroller) {
        switch (e.detail.state) {
          case 'start':
            this._handleTouchStart(e)
            disableScrollBounce({
              disable: true
            })
            break
          case 'move':
            this._handleTouchMove(e)
            break
          case 'end':
          case 'cancel':
            this._handleTouchEnd(e)
            disableScrollBounce({
              disable: false
            })
        }
      }
    },
    _handleWheel ($event) {
      const deltaY = this.deltaY + $event.deltaY
      if (Math.abs(deltaY) > 10) {
        this.scrollTop += deltaY / 3
        this.scrollTop = this.scrollTop >= this.contentHeight
          ? this.contentHeight
          : this.scrollTop <= 0
            ? 0
            : this.scrollTop
        this._scroller.scrollTo(this.scrollTop)
      } else {
        this.deltaY = deltaY
      }
      $event.preventDefault()
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
    cursor: pointer;
  }

  uni-actionsheet .uni-actionsheet__title {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    background-color: #fff;
    border-radius: 5px 5px 0 0;
    border-bottom: 1px solid #e5e5e5;
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

  @media screen and (min-width: 500px) and (min-height: 500px) {
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
