<template>
  <uni-switch-element ref="switch" :style="uniSwitchStyle">
    <view
      v-if="type == 'switch'"
      class="uni-switch-input"
      ref="switchTrack"
      :style="trackStyle"
      @click="_onClick"
    >
      <view
        class="uni-switch-thumb"
        :class="checkedInternal ? 'uni-switch-thumb-checked' : ''"
        :style="switchThumbStyle"
      ></view>
    </view>
    <!-- <checkbox v-if="type=='checkbox'"></checkbox> -->
  </uni-switch-element>
</template>
<script lang="ts">
import {
  SWITCH_NAME,
  SWITCH_NAME_ROOT_ELEMENT,
  UniSwitchElement,
} from './model'
import { StyleValue } from '@vue/runtime-dom'

import { styles } from './style'

// const SWITCH_WIDTH = 52
// const SWITCH_THUMB_WIDTH = 30
// const SWITCH_THUMB_ON_OFFSET_X = 20
// const MOUSE_PRESS_TIME = 200

// export class UniSwitchElement extends UniFormControlElement<boolean> {
//   _initialValue: boolean = false
//   _value: boolean = false

//   constructor(data: INodeData, pageNode: PageNode) {
//     super(data, pageNode)
//   }

//   override get value(): boolean {
//     return this._value
//   }
//   override set value(value: boolean) {
//     if (this._value == value) {
//       return
//     }
//     this._value = value
//     this.onValueChanged(value)
//   }

//   override reset() {
//     this.value = this._initialValue
//   }

//   onValueChanged = (value: boolean) => {}
// }

class UniSwitchChangeEventDetail {
  value = false
  constructor(value: boolean) {
    this.value = value
  }
}

// export class UniSwitchChangeEvent extends UniCustomEvent<UniSwitchChangeEventDetail> {
//   constructor(value: boolean) {
//     super('change', {
//       detail: new UniSwitchChangeEventDetail(value)
//     } as UniCustomEventOptions)
//   }
// }

export default {
  name: SWITCH_NAME,
  rootElement: {
    name: SWITCH_NAME_ROOT_ELEMENT,
    class: UniSwitchElement,
  },
  data() {
    return {
      styles,
      checkedInternal: false,
      $switchElement: null as null | UniSwitchElement,
      // thumbStyle: '',
      // switchPressFlag: false,
      // $switchTrackNode: null as null | Element,
      // $switchOffsetX: 0,
      // $switchOffsetW: 0,
      // $touchStartFlag: false,
      // $checkPressTimer: 0
    }
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '#007aff',
    },
    type: {
      type: String,
      default: 'switch',
    },
  },
  watch: {
    checked: {
      handler(val) {
        this.$switchElement!.value = val
      },
    },
    // switchPressFlag (val) {
    //   const thumbDragWidth = val ? SWITCH_THUMB_WIDTH + SWITCH_THUMB_WIDTH / 4 : SWITCH_THUMB_WIDTH;
    //   this.thumbStyle = `width: ${thumbDragWidth}px;`
    // }
  },
  computed: {
    uniSwitchStyle() {
      return Object.assign({}, styles['uni-switch'], {
        ...styles['uni-switch'],
        ...(this.disabled ? styles['uni-switch-disabled'] : {}),
      }) as StyleValue
    },
    switchThumbStyle() {
      return {
        ...styles['uni-switch-thumb'],
        ...(this.checkedInternal ? styles['uni-switch-thumb-checked'] : {}),
      } as StyleValue
    },
    trackStyle() {
      // uni-switch-input

      const backgroundColor = this.checkedInternal ? this.color : '#E5E5E5'
      const borderColor = this.checkedInternal ? this.color : '#E5E5E5'
      // return `backgroundColor:${backgroundColor};borderColor:${borderColor};`

      return {
        ...styles['uni-switch-input'],
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      } as StyleValue
    },
  },
  mounted() {
    this.$.$waitNativeRender(() => {
      this.$switchElement = this.$refs.get('switch') as UniSwitchElement
      this.$switchElement!.onValueChanged = (value: boolean) => {
        this.checkedInternal = value
      }
      this.$switchElement!._initialValue = this.checked
      this.$switchElement!.value = this.checked

      // this.$switchTrackNode = this.$refs.get('switchTrack') as Element
      // this.$switchOffsetX = this.$switchTrackNode?.offsetLeft as number

      // $dispatch(this, 'Form', 'formControlUpdate', this.$switchElement, 'add')
    })
  },
  // unmount() {
  //   $dispatch(this, 'Form', 'formControlUpdate', this.$switchElement, 'remove')
  // },
  methods: {
    _onClick(payload: MouseEvent) {
      if (this.disabled) return
      this.$switchElement!.value = !this.$switchElement!.value
      // this.$emit('change', new UniSwitchChangeEvent(this.$switchElement!.value))
    },
    // _startTimerCheckPress () {
    //   this._stopTimerCheckPress()
    //   this.$checkPressTimer = setTimeout(() => {
    //     this.$checkPressTimer = 0
    //     this.switchPressFlag = true
    //   }, MOUSE_PRESS_TIME)
    // },
    // _stopTimerCheckPress () {
    //   if (this.$checkPressTimer !== 0) {
    //     clearTimeout(this.$checkPressTimer!)
    //     this.$checkPressTimer = 0
    //   }
    // },
    // _onTouchStart (e: TouchEvent) {
    //   if (e.changedTouches.length === 1 && !this.$touchStartFlag) {
    //     this.$touchStartFlag = true
    //     this._startTimerCheckPress()
    //   }
    // },
    // _onTouchMove (e: TouchEvent) {
    //   if (e.changedTouches.length === 1 && this.$touchStartFlag) {
    //     this.$switchOffsetX = this.$switchTrackNode?.offsetLeft as number
    //     this._onTrackInputChange(e.changedTouches[0].pageX)
    //   }
    // },
    // _onTouchEnd (e: TouchEvent) {
    //   if (e.changedTouches.length === 1 && this.$touchStartFlag) {
    //     this.$touchStartFlag = false
    //     this.$switchOffsetX = this.$switchTrackNode?.offsetLeft as number
    //     this._stopTimerCheckPress()
    //     this.switchPressFlag = false
    //     this._onTrackInputChange(e.changedTouches[0].pageX)
    //   }
    // },
    // _onTrackInputChange(x: number) {
    //   if (this.disabled) {
    //     return
    //   }
    //   let px = x - this.$switchOffsetX
    //   if (px < 0) { px = 0 }
    //   if (px > SWITCH_WIDTH) { px = SWITCH_WIDTH }

    //   if (px > SWITCH_WIDTH / 2) {
    //   } else {
    //   }
    // }
  },
}
</script>
