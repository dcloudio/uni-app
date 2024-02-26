import { defineBuiltInComponent } from '@dcloudio/uni-components'
import {
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch,
  computed,
  onUnmounted,
  nextTick,
  StyleValue,
} from 'vue'

import { parseStringStyle } from '@vue/shared'
import { $dispatch, $dispatchParent } from '../../utils'
import { _style_picker_column as _style } from './style'
import { UniPickerViewColumnElement } from './model'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'PickerViewColumn',
  rootElement: {
    name: 'uni-picker-view-column-element',
    // @ts-ignore
    class: UniPickerViewColumnElement,
  },
  setup(_props, { slots, expose }) {
    const instance = getCurrentInstance()

    const pickerColumnRef = ref<UniPickerViewColumnElement>()
    const indicator = ref<UniElement>()
    const scrollViewRef = ref<UniScrollViewElement>()
    const contentRef = ref<UniElement>()

    // data
    const data = reactive({
      height: 0,
      indicatorHeight: 0,
      current: 0,
      scrollToElementTime: 0,
      maskTopStyle: '',
      maskBottomStyle: '',
      indicatorStyle: '',
      contentStyle: '',
      _isMounted: false,
    })

    // style
    const contentStyle = computed(() => {
      return Object.assign(
        {},
        _style['uni-picker-view-content'][''],
        parseStringStyle(data.contentStyle)
      ) as StyleValue
    })

    const maskTopStyle = computed(() => {
      return Object.assign(
        {},
        _style['uni-picker-view-mask'][''],
        _style['uni-picker-view-mask-top'][''],
        parseStringStyle(data.maskTopStyle)
      ) as StyleValue
    })
    const maskBottomStyle = computed(() => {
      return Object.assign(
        {},
        _style['uni-picker-view-mask'][''],
        _style['uni-picker-view-mask-bottom'][''],
        parseStringStyle(data.maskBottomStyle)
      ) as StyleValue
    })
    const indicatorStyle = computed(() => {
      return Object.assign(
        {},
        _style['uni-picker-view-indicator'][''],
        parseStringStyle(data.indicatorStyle)
      ) as StyleValue
    })

    const styleUniPickerViewColumn = computed(() => {
      return Object.assign(
        {},
        _style['uni-picker-view-column']['']
      ) as StyleValue
    })
    const styleUniPickerViewGroup = computed(() => {
      return Object.assign(
        {},
        _style['uni-picker-view-group']['']
      ) as StyleValue
    })
    const styleViewMask = computed(() => {
      return Object.assign({}, _style['uni-picker-view-mask']['']) as StyleValue
    })

    const init = () => {
      data.height = pickerColumnRef.value!.offsetHeight
      data.indicatorHeight = indicator.value!.offsetHeight

      const padding = (data.height - data.indicatorHeight) / 2
      const maskPosition = `${data.height - padding}px`
      data.maskTopStyle += `;bottom:${maskPosition}`
      data.maskBottomStyle += `;top:${maskPosition}`
      data.indicatorStyle += `;top:${padding}px`
      data.contentStyle = `padding-top:${padding}px;padding-bottom:${padding}px`

      nextTick(() => {
        if (data.current != 0) {
          setCurrent(data.current)
        }
        data._isMounted = true
      })
    }

    const onScrollend = (e: ScrollEvent) => {
      console.log('onScrollend')
      if (Date.now() - data.scrollToElementTime < 200) {
        return
      }
      const y = e.detail.scrollTop
      // 考虑 data.indicatorHeight =0 的情况，可能 NaN
      const current = Math.round(y / data.indicatorHeight)
      if (y % data.indicatorHeight != 0) {
        setCurrent(current)
      } else {
        data.current = current
      }
    }

    const setCurrent = (current: number) => {
      instance?.$waitNativeRender(() => {
        let scrollTop = current * data.indicatorHeight
        scrollViewRef.value!.setAnyAttribute('scroll-top', scrollTop)
        data.current = current
        data.scrollToElementTime = Date.now()
      })
    }

    const created = () => {
      const $parent =
        instance?.parent?.type.name === 'PickerView' ? instance?.parent : null
      if ($parent !== null) {
        // $parent.props
        data.indicatorStyle = $parent.props['indicatorStyle'] as string
        data.maskTopStyle = $parent.props['maskTopStyle'] as string
        data.maskBottomStyle = $parent.props['maskBottomStyle'] as string

        $dispatchParent(
          instance?.proxy,
          'PickerView',
          '_pickerViewUpdateHandler',
          instance?.proxy,
          'add'
        )

        data.current = $dispatchParent(
          instance?.proxy,
          'PickerView',
          'getItemValue',
          instance?.proxy
        ) as number
      }
    }

    created()

    expose({
      setCurrent,
    })

    onMounted(() => {
      instance?.$waitNativeRender(() => {
        if (!instance || !pickerColumnRef.value) return

        // pickerColumnRef.value!._getAttribute = (key: string): string | null => {
        //   const keyString = camelize(key) as keyof typeof props
        //   //  return props[keyString] !== null
        //   //    ? props[keyString]?.toString() ?? null
        //   //    : null
        //   return null
        // }

        setTimeout(() => {
          init()
        }, 500)
      })
    })

    onUnmounted(() => {
      const ctx = instance?.proxy
      $dispatch(ctx, 'PickerView', '_pickerViewUpdateHandler', ctx, 'remove')
    })

    watch(
      () => data.current,
      (val, oldVal) => {
        if (data._isMounted && val != oldVal) {
          const ctx = instance?.proxy
          $dispatch(ctx, 'PickerView', 'setItemValue', ctx, val)
        }
      }
    )

    return () => {
      return (
        <uni-picker-view-column-element
          class="uni-picker-view-column"
          style={styleUniPickerViewColumn.value}
          ref={pickerColumnRef}
        >
          <scroll-view
            deceleration-rate={0.3}
            onScrollend={onScrollend}
            class="uni-picker-view-group"
            style={styleUniPickerViewGroup.value}
            scroll-with-animation={data._isMounted}
            direction="vertical"
            show-scrollbar={false}
            ref={scrollViewRef}
          >
            <view
              class="uni-picker-view-content"
              style={contentStyle.value}
              ref={contentRef}
            >
              {slots.default?.()}
            </view>
          </scroll-view>
          <view
            // @ts-ignore
            userInteractionEnabled={false}
            class="uni-picker-view-mask"
            style={styleViewMask.value}
          >
            <view
              class="uni-picker-view-mask uni-picker-view-mask-top"
              style={maskTopStyle.value}
            ></view>
            <view
              class="uni-picker-view-mask uni-picker-view-mask-bottom"
              style={maskBottomStyle.value}
            ></view>
          </view>
          <view
            ref={indicator}
            class="uni-picker-view-indicator"
            style={indicatorStyle.value}
          ></view>
        </uni-picker-view-column-element>
      )
    }
  },
})
