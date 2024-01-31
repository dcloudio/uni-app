import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { navigatorProps, UniNavigatorElement } from './model'
import {
  // camelize,
  ComponentInternalInstance,
  getCurrentInstance,
  onMounted,
} from 'vue'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Navigator',
  rootElement: {
    name: 'uni-navigator-element',
    // @ts-expect-error not web element
    class: UniNavigatorElement,
  },
  props: navigatorProps,
  emits: ['click'],
  setup(props, { emit, slots }) {
    // data
    let $uniNavigatorElement: null | UniNavigatorElement = null

    let instance: ComponentInternalInstance | null = null

    onMounted(() => {
      instance = getCurrentInstance()

      instance?.$waitNativeRender(() => {
        if (!instance) return
        $uniNavigatorElement = instance.proxy?.$el as UniNavigatorElement
        $uniNavigatorElement!._getAttribute = (key: string): string | null => {
          // const keyString = camelize(key)
          // if (this.$props.has(keyString)) {
          // if( props[keyString] != null){
          // const value = this.$props.get(keyString)
          //     if (value != null) {
          //       return value.toString()
          //     }
          //     return ''
          //   }
          return null
        }
      })
    })

    const _onClick = ($event: PointerEvent) => {
      const url = props.url
      // emit('click', $event)

      const animationDuration = props.animationDuration
      switch (props.openType) {
        case 'navigate':
          uni.navigateTo({
            url,
            animationType: (props.animationType.length > 0
              ? props.animationType
              : 'pop-in') as 'pop-in',
            animationDuration,
          })
          break
        case 'redirect':
          uni.redirectTo({
            url,
          })
          break
        case 'switchTab':
          uni.switchTab({
            url,
          })
          break
        case 'reLaunch':
          uni.reLaunch({
            url,
          })
          break
        case 'navigateBack':
          uni.navigateBack({
            delta: props.delta,
            animationType: (props.animationType.length > 0
              ? props.animationType
              : 'pop-out') as 'pop-out',
            animationDuration,
          })
          break
        default:
          console.log('<navigator/> openType attribute invalid')
          break
      }
    }

    return () => {
      return (
        <uni-navigator-element
          onClick={_onClick}
          hoverClass={props.hoverClass}
          hoverStopPropagation={props.hoverStopPropagation}
          hoverStartTime={props.hoverStartTime}
          hoverStayTime={props.hoverStayTime}
        >
          {slots.default?.()}
        </uni-navigator-element>
      )
    }
  },
})
