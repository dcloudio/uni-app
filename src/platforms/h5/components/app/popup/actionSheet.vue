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
      <div :style="popupStyle.triangle" />
    </div>
  </uni-actionsheet>
</template>
<script>
import popup from './mixins/popup'

export default {
  name: 'ActionSheet',
  mixins: [popup],
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
  cursor: pointer;
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
