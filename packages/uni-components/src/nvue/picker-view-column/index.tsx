import {
  defineComponent,
  inject,
  ref,
  Ref,
  watch,
  VNode,
  computed,
  getCurrentInstance,
  onMounted,
} from 'vue'
import { extend } from '@vue/shared'
import { Props, GetPickerViewColumn } from '../picker-view'
import { parseStyleText, getComponentSize } from '../helpers'

type ScrollOptions = {
  showScrollbar: boolean
  scrollToBegin: boolean
  decelerationRate: number
  scrollY: boolean
  scrollTop?: number
}

const dom = weex.requireModule('dom')
const isAndroid = weex.config.env.platform.toLowerCase() === 'android'
function getStyle(val: string) {
  return extend({}, typeof val === 'string' ? parseStyleText(val) : val)
}

export default defineComponent({
  name: 'PickerViewColumn',
  props: {
    length: {
      type: [Number, String],
      default: 0,
    },
  },
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
    const getPickerViewColumn = inject<GetPickerViewColumn>(
      'getPickerViewColumn',
      () => computed({ set: () => {}, get: () => 0 })
    )

    const current = getPickerViewColumn(instance)
    const indicatorStyle = computed(() =>
      getStyle(pickerViewProps.indicatorStyle)
    )
    const maskStyle = computed(() => getStyle(pickerViewProps.maskStyle))
    let indicatorHeight = getHeight(indicatorStyle)
    let pickerViewHeight = parseFloat(pickerViewProps.height as string)

    watch(
      () => props.length,
      () => {
        setTimeout(() => {
          setCurrent(current.value, true, true)
        }, 150)
      }
    )

    let scrollToElementTime: number
    const setCurrent = (_current: number, animated = true, force: Boolean) => {
      if (current.value === _current && !force) {
        return
      }
      dom.scrollToElement(contentRef.value, {
        offset: _current * indicatorHeight,
        animated,
      })
      current.value = _current
      if (animated) {
        scrollToElementTime = Date.now()
      }
    }
    const onScrollend = (event: { detail: Record<string, any> }) => {
      if (Date.now() - scrollToElementTime < 340) {
        return
      }
      const y = event.detail.contentOffset.y
      const _current = Math.round(y / indicatorHeight)
      if (y % indicatorHeight) {
        setCurrent(_current, true, true)
      } else {
        current.value = _current
      }
    }
    const checkMounted = () => {
      let height_: number
      let indicatorHeight_: number
      setTimeout(() => {
        Promise.all([
          getComponentSize(rootRef.value!).then(({ height }) => {
            height_ = pickerViewHeight = height
          }),
          isAndroid && props.length
            ? getComponentSize(scrollViewItemRef.value!).then(({ height }) => {
                indicatorHeight_ = indicatorHeight =
                  height / parseFloat(props.length as string)
              })
            : getComponentSize(indicatorRef.value!).then(({ height }) => {
                indicatorHeight_ = indicatorHeight = height
              }),
        ]).then(() => {
          if (height_ && indicatorHeight_) {
            // 初始化时iOS直接滚动经常出错
            setTimeout(() => {
              setCurrent(current.value, false, true)
              instance.data._isMounted = true
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
      let padding = (pickerViewHeight - indicatorHeight) / 2
      const maskPosition = `${pickerViewHeight - padding}px`
      const scrollOptions: ScrollOptions = {
        showScrollbar: false,
        scrollToBegin: false,
        decelerationRate: 0.3,
        scrollY: true,
      }
      if (!isAndroid) {
        scrollOptions.scrollTop = current.value * indicatorHeight
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
                flexDirection: 'column',
                paddingTop: `${padding}px`,
                paddingBottom: `${padding}px`,
              }}
            >
              {createScrollViewChild(children)}
            </view>
          </scroll-view>
          <u-scalable class="uni-picker-view-mask" style={maskStyle}>
            <u-scalable
              class="uni-picker-view-mask uni-picker-view-mask-top"
              style={{
                bottom: maskPosition,
              }}
            ></u-scalable>
            <u-scalable
              class="uni-picker-view-mask uni-picker-view-mask-bottom"
              style={{
                top: maskPosition,
              }}
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
        flex: 1,
        position: 'relative',
        alignItems: 'stretch',
        overflow: 'hidden',
      },
      'uni-picker-view-mask': {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
      },
      'uni-picker-view-mask-top': {
        bottom: 0,
        backgroundImage:
          'linear-gradient(to bottom,rgba(255, 255, 255, 0.95),rgba(255, 255, 255, 0.6))',
      },
      'uni-picker-view-mask-bottom': {
        top: 0,
        backgroundImage:
          'linear-gradient(to top,rgba(255, 255, 255, 0.95),rgba(255, 255, 255, 0.6))',
      },
      'uni-picker-view-group': {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      'uni-picker-view-content': {
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
      },
      'uni-picker-view-indicator': {
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
