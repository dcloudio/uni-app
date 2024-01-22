/// <reference types="@dcloudio/uni-app-x/types/native-global" />
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { onMounted, getCurrentInstance, computed } from 'vue'
import {
  BUTTON_COMPONENT_NAME,
  buttonProps,
  UNI_BUTTON_ELEMENT_NAME,
  UniButtonElement,
} from './model'
const FORM_TYPES = ['submit', 'reset']

const styleList = {
  ub: {
    position: 'relative',
    'text-align': 'center',
    'padding-left': '14px',
    'padding-right': '14px',
    'overflow-x': 'hidden',
    'overflow-y': 'hidden',
    color: 'rgb(0, 0, 0)',
    'background-color': 'rgb(248, 248, 248)',
    'border-top-left-radius': '5px',
    'border-top-right-radius': '5px',
    'border-bottom-right-radius': '5px',
    'border-bottom-left-radius': '5px',
    'border-top-style': 'solid',
    'border-right-style': 'solid',
    'border-bottom-style': 'solid',
    'border-left-style': 'solid',
    'border-top-width': '0.5px',
    'border-right-width': '0.5px',
    'border-bottom-width': '0.5px',
    'border-left-width': '0.5px',
    'border-top-color': 'rgba(0, 0, 0, 0.2)',
    'border-right-color': 'rgba(0, 0, 0, 0.2)',
    'border-bottom-color': 'rgba(0, 0, 0, 0.2)',
    'border-left-color': 'rgba(0, 0, 0, 0.2)',
    'font-size': '18px',
    'line-height': '3',
    // 'line-height': 2.55556,
  },
  ['ub-default']: {
    color: 'rgb(0, 0, 0)',
    'background-color': 'rgb(248, 248, 248)',
  },
  ['ub-primary']: {
    color: 'rgb(255, 255, 255)',
    'background-color': 'rgb(0, 122, 255)',
  },
  ['ub-warn']: {
    color: 'rgb(255, 255, 255)',
    'background-color': 'rgb(230, 67, 64)',
  },
  ['ub-default-plain']: {
    color: 'rgb(53, 53, 53)',
    'border-top-color': 'rgb(53, 53, 53)',
    'border-right-color': 'rgb(53, 53, 53)',
    'border-bottom-color': 'rgb(53, 53, 53)',
    'border-left-color': 'rgb(53, 53, 53)',
    'background-color': 'rgba(0, 0, 0, 0)',
    'border-top-width': '1px',
    'border-right-width': '1px',
    'border-bottom-width': '1px',
    'border-left-width': '1px',
  },
  ['ub-primary-plain']: {
    color: 'rgb(0, 122, 255)',
    'border-top-color': 'rgb(0, 122, 255)',
    'border-right-color': 'rgb(0, 122, 255)',
    'border-bottom-color': 'rgb(0, 122, 255)',
    'border-left-color': 'rgb(0, 122, 255)',
    'background-color': 'rgba(0, 0, 0, 0)',
    'border-top-width': '1px',
    'border-right-width': '1px',
    'border-bottom-width': '1px',
    'border-left-width': '1px',
  },
  ['ub-warn-plain']: {
    color: 'rgb(230, 67, 64)',
    'border-top-color': 'rgb(230, 67, 64)',
    'border-right-color': 'rgb(230, 67, 64)',
    'border-bottom-color': 'rgb(230, 67, 64)',
    'border-left-color': 'rgb(230, 67, 64)',
    'background-color': 'rgba(0, 0, 0, 0)',
    'border-top-width': '1px',
    'border-right-width': '1px',
    'border-bottom-width': '1px',
    'border-left-width': '1px',
  },
  ['ub-default-disabled']: {
    color: 'rgba(0, 0, 0, 0.3)',
    'background-color': 'rgb(247, 247, 247)',
  },
  ['ub-primary-disabled']: {
    color: 'rgba(255, 255, 255, 0.6)',
    'background-color': 'rgba(0, 122, 255, 0.6)',
  },
  ['ub-warn-disabled']: {
    color: 'rgba(255, 255, 255, 0.6)',
    'background-color': 'rgb(236, 139, 137)',
  },
  ['ub-default-disabled-plain']: {
    color: 'rgba(0, 0, 0, 0.2)',
    'border-top-color': 'rgba(0, 0, 0, 0.2)',
    'border-right-color': 'rgba(0, 0, 0, 0.2)',
    'border-bottom-color': 'rgba(0, 0, 0, 0.2)',
    'border-left-color': 'rgba(0, 0, 0, 0.2)',
    'background-color': 'rgba(0, 0, 0, 0)',
    'border-top-width': '1px',
    'border-right-width': '1px',
    'border-bottom-width': '1px',
    'border-left-width': '1px',
  },
  ['ub-primary-disabled-plain']: {
    color: 'rgba(0, 0, 0, 0.2)',
    'border-top-color': 'rgba(0, 0, 0, 0.2)',
    'border-right-color': 'rgba(0, 0, 0, 0.2)',
    'border-bottom-color': 'rgba(0, 0, 0, 0.2)',
    'border-left-color': 'rgba(0, 0, 0, 0.2)',
    'background-color': 'rgba(0, 0, 0, 0)',
    'border-top-width': '1px',
    'border-right-width': '1px',
    'border-bottom-width': '1px',
    'border-left-width': '1px',
  },
  ['ub-warn-disabled-plain']: {
    color: 'rgba(0, 0, 0, 0.2)',
    'border-top-color': 'rgba(0, 0, 0, 0.2)',
    'border-right-color': 'rgba(0, 0, 0, 0.2)',
    'border-bottom-color': 'rgba(0, 0, 0, 0.2)',
    'border-left-color': 'rgba(0, 0, 0, 0.2)',
    'background-color': 'rgba(0, 0, 0, 0)',
    'border-top-width': '1px',
    'border-right-width': '1px',
    'border-bottom-width': '1px',
    'border-left-width': '1px',
  },
  ['ub-mini']: {
    'padding-top': '0px',
    'padding-bottom': '0px',
    'padding-right': '17.5px',
    'padding-left': '17.5px',
    // 'line-height': '2.3',
    'line-height': '2',
    'font-size': '13px',
  },
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: BUTTON_COMPONENT_NAME,
  rootElement: {
    name: UNI_BUTTON_ELEMENT_NAME,
    // @ts-expect-error not web element
    class: UniButtonElement,
  },
  // styles: buttonStyle,
  props: buttonProps,
  emits: ['click'],
  setup(props, { emit, slots }) {
    // data
    let $buttonEl = null as UniElement | null
    let $originHoverStyle = new Map<string, any | null>()
    let $hoverStyle = new Map<string, any | null>()
    let $hoverClassStyle = new Map<string, any | null>()
    let $hoverStartTimer: NodeJS.Timeout | null = null
    let $hoverStayTimer: NodeJS.Timeout | null = null
    let $hoverTouch = false
    let $hovering = false

    console.log($hoverStartTimer, $hoverStayTimer)

    const hoverStyles = new Map<string, Map<string, any | null>>([
      [
        'default',
        new Map<string, any | null>([
          ['color', 'rgba(0, 0, 0, 0.6)'],
          ['backgroundColor', '#dedede'],
        ]),
      ],
      [
        'primary',
        new Map<string, any | null>([
          ['color', 'rgba(255, 255, 255, 0.6)'],
          ['backgroundColor', '#0062cc'],
        ]),
      ],
      [
        'warn',
        new Map<string, any | null>([
          ['color', 'rgba(255, 255, 255, 0.6)'],
          ['backgroundColor', '#ce3c39'],
        ]),
      ],
      [
        'default-plain',
        new Map<string, any | null>([
          ['color', 'rgba(53, 53, 53, 0.6)'],
          ['borderColor', 'rgba(53, 53, 53, 0.6)'],
          ['backgroundColor', 'rgba(0, 0, 0, 0)'],
        ]),
      ],
      [
        'primary-plain',
        new Map<string, any | null>([
          ['color', 'rgba(0, 122, 255, 0.6)'],
          ['borderColor', 'rgba(0, 122, 255, 0.6)'],
          ['backgroundColor', 'rgba(0, 0, 0, 0)'],
        ]),
      ],
      [
        'warn-plain',
        new Map<string, any | null>([
          ['color', 'rgba(230, 67, 64, 0.6)'],
          ['borderColor', 'rgba(230, 67, 64, 0.6)'],
          ['backgroundColor', 'rgba(0, 0, 0, 0)'],
        ]),
      ],
    ])

    // style={styleText.value}
    const btnCls = computed((): string => {
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
      return cl
    })

    // 解析传入的hoverClass
    function parseHoverClass() {
      let cl = props.hoverClass
      if (cl == 'button-hover' || cl.length == 0) {
        return
      }
      const styles = ($buttonEl as any)!.ext['styles'] as Map<
        string,
        Map<string, Map<string, any | null>>
      > | null
      if (styles != null) {
        let style = styles.get(cl)
        if (style != null) {
          style.forEach((val: Map<string, any | null>) => {
            $hoverClassStyle = val
          })
        }
      }
    }

    onMounted(() => {
      var instance = getCurrentInstance()
      if (instance) {
        instance!.$waitNativeRender(() => {
          $buttonEl = instance!.vnode.el as UniElement
          parseHoverClass()
        })
      }
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
        // clearTimeout($hoverStayTimer as NodeJS.Timeout)
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
      // clearHoverStyle()
      // updateStyle()
      // clearTimeout($hoverStartTimer as NodeJS.Timeout)
    }
    function touchmove(event: TouchEvent) {
      if (props.disabled || props.hoverClass == 'none') {
        return
      }
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
      emit('click', $event)
      if (FORM_TYPES.indexOf(props.formType) > -1) {
        // $dispatch(this, 'Form', props.formType)
      }
    }

    const styleText = computed(() => {
      const classList = btnCls.value.split(' ')
      // const classList = ['ub-default', 'ub-primary']

      // .ub basic class style
      const basicStyle = Object.assign({}, styleList.ub)

      classList.forEach((cl) => {
        const style = (styleList as any)[cl]
        if (style) {
          Object.assign(basicStyle, style)
        }
      })

      console.log(btnCls.value, basicStyle)

      return basicStyle
    })

    return () => {
      return (
        <uni-button-element
          style={styleText.value}
          onTouchstart={touchstart}
          onTouchend={touchend}
          onTouchcancel={touchcancel}
          onTouchmove={touchmove}
          onClick={_onClick}
        >
          {slots.default?.()}
        </uni-button-element>
      )
    }
  },
})
