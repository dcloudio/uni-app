/// <reference types="@dcloudio/uni-app-x/types/native-global" />
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import {
  UniProgressActiveendEvent,
  UniProgressElement,
  progressProps,
} from './model'
import { _style } from './style'
import {
  camelize,
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  reactive,
  watch,
} from 'vue'
import { initUniCustomEvent } from '../../utils'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Progress',
  rootElement: {
    name: 'uni-progress-element',
    // @ts-expect-error not web element
    class: UniProgressElement,
  },
  emit: ['activeend'],
  props: progressProps,
  setup(props, { emit }) {
    // data
    const data = reactive({
      $uniProgressElement: null as null | UniProgressElement,
      curPercent: 0,
      _timerId: 0,
      _lastPercent: 0,
    })
    const textStr = computed(() => {
      return `${data.curPercent}%`
    })

    const instance = getCurrentInstance()

    const styleUniProgress = computed(() => _style['uni-progress'][''])
    const styleUniProgressBar = computed(() => _style['uni-progress-bar'][''])

    const barStyle = computed(() => {
      const style = {
        height: `${props.strokeWidth}px`,
        borderRadius: `${props.borderRadius}px`,
        backgroundColor: props.backgroundColor,
      }
      return Object.assign({}, styleUniProgressBar.value, style)
    })

    const innerBarStyle = computed(() => {
      const style = {
        width: `${data.curPercent}%`,
        height: `${props.strokeWidth}px`,
        backgroundColor: `${props.activeColor}`,
      }
      return Object.assign({}, style)
    })
    const textStyle = computed(() => {
      const fontSize = props.fontSize
      const style = {
        fontSize: `${fontSize}px`,
        minWidth: `${fontSize * 2}px`,
      }

      return Object.assign({}, _style['uni-progress-info'][''], style)
    })

    const finalPercent = computed((): number => {
      let percent = props.percent
      if (percent > 100) percent = 100
      if (percent < 0) percent = 0
      return percent
    })

    watch(
      () => finalPercent.value,
      (_, oldVal) => {
        data._lastPercent = oldVal
        clearTimer()
        _animate()
      }
    )

    const _animate = () => {
      let percent = finalPercent.value
      if (!props.active) {
        data.curPercent = percent
        return
      }
      data.curPercent = props.activeMode === 'forwards' ? data._lastPercent : 0
      data._timerId = setInterval(() => {
        if (percent <= data.curPercent + 1) {
          clearTimer()
          data.curPercent = percent
          emit(
            'activeend',
            initUniCustomEvent(
              data.$uniProgressElement!,
              new UniProgressActiveendEvent(percent)
            )
          )
        } else {
          ++data.curPercent
        }
      }, props.duration) as unknown as number
    }

    const clearTimer = () => {
      clearInterval(data._timerId)
    }

    onMounted(() => {
      instance?.$waitNativeRender(() => {
        if (!instance) return
        data.$uniProgressElement = instance.proxy?.$el as UniProgressElement
        data.$uniProgressElement!._getAttribute = (
          key: string
        ): string | null => {
          const keyString = camelize(key) as keyof typeof props
          return props[keyString] !== null
            ? props[keyString]?.toString() ?? null
            : null
        }
        _animate()
      })
    })
    onBeforeUnmount(() => {
      clearTimer()
    })

    return () => {
      return (
        <uni-progress-element
          class="uni-progress"
          style={styleUniProgress.value}
        >
          <view class="uni-progress-bar" style={barStyle.value}>
            <view
              class="uni-progress-inner-bar"
              style={innerBarStyle.value}
            ></view>
          </view>
          {props.showInfo ? (
            <view class="uni-progress-info" style={textStyle.value}>
              {textStr.value}
            </view>
          ) : null}
        </uni-progress-element>
      )
    }
  },
})
export { UniProgressActiveendEvent, UniProgressElement }
