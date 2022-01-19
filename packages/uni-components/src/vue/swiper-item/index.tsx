import { Ref, ref, onMounted, onUnmounted, inject } from 'vue'
import { AddSwiperContext, SwiperContext, RemoveSwiperContext } from '../swiper'
import { defineBuiltInComponent } from '../../helpers/component'

const props = {
  itemId: {
    type: String,
    default: '',
  },
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'SwiperItem',
  props,
  setup(props, { slots }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const context: SwiperContext = {
      rootRef,
      getItemId() {
        return props.itemId
      },
      getBoundingClientRect() {
        const el = rootRef.value as HTMLElement
        return el.getBoundingClientRect()
      },
      updatePosition(position: number, vertical?: boolean) {
        const x = vertical ? '0' : 100 * position + '%'
        const y = vertical ? 100 * position + '%' : '0'
        const rootEl = rootRef.value
        const value = `translate(${x},${y}) translateZ(0)`
        if (rootEl) {
          rootEl.style.webkitTransform = value
          rootEl.style.transform = value
        }
      },
    }
    onMounted(() => {
      const addSwiperContext: AddSwiperContext | undefined =
        inject('addSwiperContext')
      if (addSwiperContext) {
        addSwiperContext(context)
      }
    })
    onUnmounted(() => {
      const removeSwiperContext: RemoveSwiperContext | undefined = inject(
        'removeSwiperContext'
      )
      if (removeSwiperContext) {
        removeSwiperContext(context)
      }
    })
    return () => {
      return (
        <uni-swiper-item
          ref={rootRef}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          {slots.default && slots.default()}
        </uni-swiper-item>
      )
    }
  },
})
