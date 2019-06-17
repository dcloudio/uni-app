<template>
  <transition name="uni-fade">
    <uni-toast
      v-if="visible"
      :data-duration="duration">
      <div
        v-if="mask"
        class="uni-mask"
        style="background: transparent;"
        @touchmove.prevent/>
      <div
        v-if="!image&&!iconClass"
        class="uni-sample-toast">
        <p class="uni-simple-toast__text">{{ title }}</p>
      </div>
      <div
        v-else
        class="uni-toast">
        <img
          v-if="image"
          :src="image"
          class="uni-toast__icon">
        <i
          v-else
          :class="iconClass"
          class="uni-icon_toast"/>
        <p class="uni-toast__content">{{ title }}</p>
      </div>
    </uni-toast>
  </transition>
</template>
<script>
import transition from './mixins/transition'
export default {
  name: 'Toast',
  mixins: [transition],
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      default: 'success',
      validator (value) {
        return ['success', 'loading', 'none'].indexOf(value) !== -1
      }
    },
    image: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 1500
    },
    mask: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconClass () {
      if (this.icon === 'success') {
        return 'uni-icon-success-no-circle'
      }
      if (this.icon === 'loading') {
        return 'uni-loading'
      }
    }
  },
  beforeUpdate () {
    if (this.visible) {
      this.timeoutId && clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        UniServiceJSBridge.emit('onHideToast')
      }, this.duration)
    }
  }
}
</script>
<style>
uni-toast {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: block;
  box-sizing: border-box;
  pointer-events: none;
}

uni-toast .uni-sample-toast {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  max-width: 80%;
}

uni-toast .uni-simple-toast__text {
  display: inline-block;
  vertical-align: middle;
  color: #ffffff;
  background-color: rgba(17, 17, 17, 0.7);
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 13px;
  text-align: center;
  max-width: 100%;
  word-break: break-all;
  white-space: normal;
}

uni-toast .uni-mask {
  pointer-events: auto;
}

uni-toast .uni-toast {
  position: fixed;
  z-index: 999;
  width: 8em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(17, 17, 17, 0.7);
  text-align: center;
  border-radius: 5px;
  color: #ffffff;
}

uni-toast .uni-toast * {
  box-sizing: border-box;
}

uni-toast .uni-toast__icon {
  margin: 20px 0 0;
  width: 38px;
  height: 38px;
  vertical-align: baseline;
}

uni-toast .uni-icon_toast {
  margin: 15px 0 0;
}

uni-toast .uni-icon_toast.uni-icon-success-no-circle:before {
  color: #ffffff;
  font-size: 55px;
}

uni-toast .uni-icon_toast.uni-loading {
  margin: 20px 0 0;
  width: 38px;
  height: 38px;
  vertical-align: baseline;
}

uni-toast .uni-toast__content {
  margin: 0 0 15px;
}
</style>
