/// <reference types="@dcloudio/uni-app-x/types/native-global" />
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import {
  type ComponentInternalInstance,
  computed,
  getCurrentInstance,
  onMounted,
  renderSlot,
} from 'vue'
import {
  $dispatch,
  BUTTON_COMPONENT_NAME,
  UNI_BUTTON_ELEMENT_NAME,
  UniButtonElement,
  buttonProps,
  hoverStyles,
} from './model'
import { styleList } from './style'
const FORM_TYPES = ['submit', 'reset']

export default /*#__PURE__*/ defineBuiltInComponent({
  name: BUTTON_COMPONENT_NAME,
  rootElement: {
    name: UNI_BUTTON_ELEMENT_NAME,
    // @ts-expect-error not web element
    class: UniButtonElement,
  },
  // styles: buttonStyle,
  props: buttonProps,
  // emits: ['click'],
  setup(props, { emit, slots }) {
    // data
    let $buttonEl = null as UniButtonElement | null
    let $originHoverStyle = new Map<string, any | null>()
    let $hoverStyle = new Map<string, any | null>()
    let $hoverClassStyle = new Map<string, any | null>()
    let $hoverStartTimer: NodeJS.Timeout | null = null
    let $hoverStayTimer: NodeJS.Timeout | null = null
    let $hoverTouch = false
    let $hovering = false

    let instance: ComponentInternalInstance | null

    const btnCls = computed(() => {
      let cl = 'ub-' + props.type
      if (props.disabled) {
        cl += '-disabled'
      }
      if (props.plain) {
        cl += '-plain'
      }
      if (props.size == 'mini') {
        cl += ' ub-mini'
      }
      return cl as keyof typeof styleList
    })

    // 解析传入的hoverClass
    function parseHoverClass() {
      let cl = props.hoverClass
      if (cl == 'button-hover' || cl.length == 0) {
        return
      }
      const styles = $buttonEl!.ext.get('styles') as {
        [key: string]: any
      }
      if (styles != null) {
        // 和 android 不同，这里是一个普通对象
        // 用户填写一个不存在的 class name 兜底 {}
        let style = styles[cl] ?? {}
        // 先转成 Map 和 Android 一致
        style = new Map(Object.entries(style))

        if (style != null) {
          style.forEach((val: Map<string, any | null>) => {
            // $hoverClassStyle.set(key, style[key])
            val = new Map(Object.entries(val))
            $hoverClassStyle = val
          })
        }
      }
    }

    onMounted(() => {
      instance = getCurrentInstance()

      instance?.$waitNativeRender(() => {
        if (!instance) return
        // $buttonEl = instance.proxy?.$el as UniElement
        $buttonEl = instance.proxy?.$el as UniButtonElement
        parseHoverClass()
      })
    })

    function setHoverStyle() {
      let hoverStyle: Map<string, any | null>
      // 默认的hoverStyle
      if (props.hoverClass == 'button-hover') {
        let plain = props.plain ? '-plain' : ''
        hoverStyle =
          hoverStyles.get(props.type + plain) ?? hoverStyles.get('default')!
      } else {
        // 用户传入的hoverStyle
        hoverStyle = $hoverClassStyle
      }
      const currentStyle = $buttonEl!.style
      $hoverStyle = new Map<string, any | null>()
      $originHoverStyle = new Map<string, any | null>()

      hoverStyle.forEach((val, key) => {
        $hoverStyle.set(key, val)
        // 记录hover前对应的默认样式
        $originHoverStyle.set(key, currentStyle.getPropertyValue(key))
      })
    }

    function clearHoverStyle() {
      const hoverStyle = $hoverStyle
      const currentStyle = $buttonEl!.style
      hoverStyle.forEach((val, key) => {
        // 在hover状态下改变了默认样式
        currentStyle.getPropertyValue(key)
        if (currentStyle.getPropertyValue(key) != val) {
          hoverStyle.set(key, currentStyle.getPropertyValue(key))
        } else {
          // 还原hover前的样式
          hoverStyle.set(key, $originHoverStyle.get(key))
        }
      })
    }

    function updateStyle() {
      if ($hoverStyle.size == 0) {
        return
      }
      const style = new Map<string, any | null>()
      $hoverStyle.forEach((val, key) => {
        style.set(key, val)
      })
      $buttonEl!.updateStyle(style)
    }
    function touchstart() {
      if (props.disabled || props.hoverClass == 'none' || $hovering) {
        return
      }
      $hoverTouch = true
      setHoverStyle()
      $hoverStartTimer = setTimeout(() => {
        $hovering = true
        updateStyle()
        // 防止在hoverStartTime时间内触发了 touchend 或 touchcancel
        if (!$hoverTouch) {
          touchend()
        }
      }, props.hoverStartTime)
    }
    function touchend() {
      $hoverTouch = false
      if ($hovering) {
        clearTimeout($hoverStayTimer as NodeJS.Timeout)
        $hoverStayTimer = setTimeout(() => {
          $hovering = false
          clearHoverStyle()
          updateStyle()
        }, props.hoverStayTime)
      }
    }
    function touchcancel() {
      $hoverTouch = false
      $hovering = false
      clearHoverStyle()
      updateStyle()
      clearTimeout($hoverStartTimer as NodeJS.Timeout)
    }
    function touchmove(event: TouchEvent) {
      if (props.disabled || props.hoverClass == 'none') {
        return
      }
      // 这里有问题
      const { clientX, clientY } = event.touches[0]
      const { height, width, left, top } = $buttonEl!.getBoundingClientRect()
      const isMovedOutside =
        clientX < left ||
        clientX > left + width ||
        clientY < top ||
        clientY > top + height
      if (isMovedOutside) {
        touchcancel()
      }
    }

    function _onClick($event: PointerEvent) {
      if (props.disabled) {
        return
      }
      // emit('click', $event)

      if (FORM_TYPES.indexOf(props.formType) > -1) {
        const ctx = instance?.proxy
        $dispatch(ctx, 'Form', props.formType)
      }
    }

    // ios 先使用 style 来完成样式
    const styleText = computed(() => {
      const classList = btnCls.value.split(' ') as Array<keyof typeof styleList>

      // .ub basic class style
      const basicStyle = Object.assign({}, styleList['ub'][''])

      classList.forEach((cl) => {
        const style = styleList[cl]?.[''] ?? {}
        if (style) {
          Object.assign(basicStyle, style)
        }
      })
      return basicStyle
    })

    return () => {
      return (
        <uni-button-element
          class="ub"
          style={styleText.value}
          onTouchstart={touchstart}
          onTouchend={touchend}
          onTouchcancel={touchcancel}
          onTouchmove={touchmove}
          onClick={_onClick}
        >
          {renderSlot(slots, 'default')}
        </uni-button-element>
      )
    }
  },
})
