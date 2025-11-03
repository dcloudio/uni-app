import {
  type ExtractPropTypes,
  type Ref,
  type VNode,
  type WritableComputedRef,
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  ref,
  watch,
} from 'vue'
import { extend, isString } from '@vue/shared'
import type { GetPickerViewColumn, Props } from '../picker-view'
import { getComponentSize, parseStyleText } from '../helpers'

type ScrollOptions = {
  showScrollbar: boolean
  scrollToBegin: boolean
  decelerationRate: number
  scrollY: boolean
  scrollTop?: number
}
type PickerColumnProps = ExtractPropTypes<typeof props>

const dom = weex.requireModule('dom')
const isAndroid = weex.config.env.platform.toLowerCase() === 'android'
function getStyle(val: string) {
  return extend({}, isString(val) ? parseStyleText(val) : val)
}

const props = {
  length: {
    type: [Number, String],
    default: 0,
  },
}

export default defineComponent({
  name: 'PickerViewColumn',
  props,
  data: () => ({
    _isMounted: false,
  }),
  setup(props, { slots }) {
    const instance = getCurrentInstance()!

    const rootRef: Ref<HTMLElement | null> = ref(null)
    const contentRef: Ref<HTMLElement | null> = ref(null)
    const scrollViewItemRef: Ref<HTMLElement | null> = ref(null)
    const indicatorRef: Ref<HTMLElement | null> = ref(null)

    const pickerViewProps = inject<Props>('pickerViewProps')!
    const getPickerViewColumn = inject(
      'getPickerViewColumn'
    ) as GetPickerViewColumn

    const current = getPickerViewColumn(instance)
    const indicatorStyle = computed(() =>
      getStyle(pickerViewProps.indicatorStyle)
    )
    // const maskStyle = computed(() => getStyle(pickerViewProps.maskStyle))
    const maskTopStyle = computed(() => getStyle(pickerViewProps.maskTopStyle))
    const maskBottomStyle = computed(() =>
      getStyle(pickerViewProps.maskBottomStyle)
    )
    let indicatorHeight = ref(0)
    indicatorHeight.value = getHeight(indicatorStyle.value)
    let pickerViewHeight = ref(0)
    pickerViewHeight.value = parseFloat(pickerViewProps.height as string)

    const { setCurrent, onScrollend } = usePickerColumnScroll(
      props,
      current,
      contentRef,
      indicatorHeight
    )

    const checkMounted = () => {
      let height_: number
      let indicatorHeight_: number
      setTimeout(() => {
        Promise.all([
          getComponentSize(rootRef.value!).then(({ height }) => {
            height_ = pickerViewHeight.value = height
          }),
          isAndroid && props.length
            ? getComponentSize(scrollViewItemRef.value!).then(({ height }) => {
                indicatorHeight_ = indicatorHeight.value =
                  height / parseFloat(props.length as string)
              })
            : getComponentSize(indicatorRef.value!).then(({ height }) => {
                indicatorHeight_ = indicatorHeight.value = height
              }),
        ]).then(() => {
          if (height_ && indicatorHeight_) {
            // 初始化时iOS直接滚动经常出错
            setTimeout(() => {
              instance.data._isMounted = true
              setCurrent(current.value, false, true)
            }, 50)
          } else {
            checkMounted()
          }
        })
      }, 50)
    }

    onMounted(checkMounted)

    const createScrollViewChild = (item?: VNode[]) => {
      if (!item) return null
      return isAndroid ? (
        <div ref={scrollViewItemRef} style="flex-direction:column;">
          {item}
        </div>
      ) : (
        item
      )
    }

    return () => {
      const children = slots.default && slots.default()
      let padding = (pickerViewHeight.value - indicatorHeight.value) / 2
      const maskPosition = `${pickerViewHeight.value - padding}px`
      const scrollOptions: ScrollOptions = {
        showScrollbar: false,
        scrollToBegin: false,
        decelerationRate: 0.3,
        scrollY: true,
      }
      if (!isAndroid) {
        scrollOptions.scrollTop = current.value * indicatorHeight.value
      }

      return (
        <view ref={rootRef} class="uni-picker-view-column">
          <scroll-view
            class="uni-picker-view-group"
            style="flex-direction:column;"
            onScrollend={onScrollend}
            {...scrollOptions}
          >
            <view
              ref={contentRef}
              class="uni-picker-view-content"
              style={{
                paddingTop: `${padding}px`,
                paddingBottom: `${padding}px`,
              }}
            >
              {createScrollViewChild(children)}
            </view>
          </scroll-view>
          <u-scalable class="uni-picker-view-mask">
            <u-scalable
              class="uni-picker-view-mask uni-picker-view-mask-top"
              style={extend({}, maskTopStyle.value, {
                bottom: maskPosition,
              })}
            ></u-scalable>
            <u-scalable
              class="uni-picker-view-mask uni-picker-view-mask-bottom"
              style={extend({}, maskBottomStyle.value, {
                top: maskPosition,
              })}
            ></u-scalable>
          </u-scalable>
          <u-scalable
            ref={indicatorRef}
            class="uni-picker-view-indicator"
            style={extend({}, indicatorStyle.value, {
              top: `${padding}px`,
            })}
          ></u-scalable>
        </view>
      )
    }
  },
  styles: [
    {
      'uni-picker-view-column': {
        '': {
          flex: 1,
          position: 'relative',
          alignItems: 'stretch',
          overflow: 'hidden',
        },
      },
      'uni-picker-view-mask': {
        '': {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
        },
      },
      'uni-picker-view-mask-top': {
        '': {
          bottom: 0,
          backgroundImage:
            'linear-gradient(to bottom,rgba(255, 255, 255, 0.95),rgba(255, 255, 255, 0.6))',
        },
      },
      'uni-picker-view-mask-bottom': {
        '': {
          top: 0,
          backgroundImage:
            'linear-gradient(to top,rgba(255, 255, 255, 0.95),rgba(255, 255, 255, 0.6))',
        },
      },
      'uni-picker-view-group': {
        '': { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
      },
      'uni-picker-view-content': {
        '': {
          flexDirection: 'column',
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
        },
      },
      'uni-picker-view-indicator': {
        '': {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '34px',
          pointerEvents: 'none',
          borderColor: '#e5e5e5',
          borderTopWidth: '1px',
          borderBottomWidth: '1px',
        },
      },
    },
  ],
})

function getHeight(style: Record<string, any>) {
  const height = style.height || style.lineHeight || ''
  const res = height.match(/(-?[\d\.]+)px/)
  let value = 0
  if (res) {
    value = parseFloat(res[1])
  }
  return value
}

function usePickerColumnScroll(
  props: PickerColumnProps,
  current: WritableComputedRef<number>,
  contentRef: Ref<HTMLElement | null>,
  indicatorHeight: Ref<number>
) {
  let scrollToElementTime: number

  function setDomScrollToElement(_current: number, animated: boolean = true) {
    dom.scrollToElement(contentRef.value, {
      offset: _current * indicatorHeight.value,
      animated,
    })
    if (animated) {
      scrollToElementTime = Date.now()
    }
  }

  watch(
    () => props.length,
    () => {
      setTimeout(() => {
        setCurrent(current.value, true, true)
      }, 150)
    }
  )
  watch(current, (val) => setDomScrollToElement(val))

  const setCurrent = (_current: number, animated = true, force: Boolean) => {
    if (current.value === _current && !force) {
      return
    }
    current.value = _current
    if (isAndroid) setDomScrollToElement(_current, animated)
  }
  const onScrollend = (event: {
    detail: {
      contentOffset: { x: number; y: number }
    }
  }) => {
    if (Date.now() - scrollToElementTime < 340) {
      return
    }
    const y = event.detail.contentOffset.y
    const _current = Math.round(y / indicatorHeight.value)
    if (y % indicatorHeight.value) {
      setCurrent(_current, true, true)
    } else {
      current.value = _current
    }
  }

  return { setCurrent, onScrollend }
}
