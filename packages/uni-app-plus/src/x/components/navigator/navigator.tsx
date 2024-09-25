import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { UniNavigatorElement, navigatorProps } from './model'
import { camelize, getCurrentInstance, onMounted, ref } from 'vue'

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
    const $uniNavigatorElement = ref<UniNavigatorElement>()

    const instance = getCurrentInstance()

    onMounted(() => {
      instance?.$waitNativeRender(() => {
        if (!instance) return
        $uniNavigatorElement!.value!._getAttribute = (
          key: string
        ): string | null => {
          const keyString = camelize(key) as keyof typeof props
          return props[keyString] !== null
            ? props[keyString]?.toString() ?? null
            : null
        }
      })
    })

    const _onClick = ($event: PointerEvent) => {
      const url = props.url
      emit('click', $event)

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
          ref={$uniNavigatorElement}
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
export { UniNavigatorElement }
