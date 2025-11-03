import { type Ref, defineComponent, onMounted, provide, ref } from 'vue'
import { movableAreaProps } from '../../components/movableArea'
import { flatVNode } from '../../helpers/flatVNode'
import type { TouchtrackEvent } from '../movable-view/useTouchtrack'
import { getComponentSize } from '../helpers'
export interface MovableViewContext {
  setParent: Function
}
export type AddMovableViewContext = (context: MovableViewContext) => void
export type RemoveMovableViewContext = (context: MovableViewContext) => void

export interface TouchMovableViewContext {
  touchstart: (e: TouchtrackEvent) => void
  touchmove: (e: TouchtrackEvent) => void
  touchend: (e: TouchtrackEvent) => void
}
export type SetTouchMovableViewContext = (
  context: TouchMovableViewContext | null
) => void

type RootRef = Ref<HTMLElement | null>
export interface parentSize {
  width: Ref<number>
  height: Ref<number>
  top: Ref<number>
  left: Ref<number>
}

export default defineComponent({
  name: 'MovableArea',
  props: movableAreaProps,
  styles: [
    {
      'uni-movable-area': {
        '': {
          overflow: 'hidden',
          width: '10px',
          height: '10px',
        },
      },
    },
  ],
  setup(props, { slots }) {
    const width = ref(0)
    const height = ref(0)
    const top = ref(0)
    const left = ref(0)
    const _isMounted = ref(false)
    const rootRef: RootRef = ref(null)
    const originMovableViewContexts: MovableViewContext[] = []
    let touchMovableView: null | TouchMovableViewContext = null

    const setTouchMovableViewContext: SetTouchMovableViewContext = (
      movableview
    ) => {
      touchMovableView = movableview
    }

    const _getWH = () => {
      return getComponentSize(rootRef.value!).then(
        ({ width: _width, height: _height, top: _top, left: _left }) => {
          width.value = _width
          height.value = _height
          top.value = _top
          left.value = _left
        }
      )
    }

    const _resize = () => {
      _getWH().then(() => {
        originMovableViewContexts.forEach(function (item) {
          item.setParent()
        })
      })
    }

    onMounted(() => {
      // 由于weex在mounted后渲染是异步的不能确保元素渲染完成，需要延迟执行
      setTimeout(() => {
        _isMounted.value = true
        _resize()
      }, 200)
    })

    const listeners = {
      onPanstart(e: TouchtrackEvent) {
        touchMovableView && touchMovableView.touchstart(e)
      },
      onPanmove(e: TouchtrackEvent) {
        e.stopPropagation()
        touchMovableView && touchMovableView.touchmove(e)
      },
      onPanend(e: TouchtrackEvent) {
        touchMovableView && touchMovableView.touchend(e)
        touchMovableView = null
      },
    }
    const addMovableViewContext: AddMovableViewContext = (
      movableViewContext
    ) => {
      originMovableViewContexts.push(movableViewContext)
    }
    const removeMovableViewContext: RemoveMovableViewContext = (
      movableViewContext
    ) => {
      const index = originMovableViewContexts.indexOf(movableViewContext)
      if (index >= 0) {
        originMovableViewContexts.splice(index, 1)
      }
    }
    provide('_isMounted', _isMounted)
    provide('parentSize', {
      width: width,
      height: height,
      top: top,
      left: left,
    })
    provide('addMovableViewContext', addMovableViewContext)
    provide('removeMovableViewContext', removeMovableViewContext)
    provide('setTouchMovableViewContext', setTouchMovableViewContext)

    return () => {
      const defaultSlots = slots.default && slots.default()
      const movableViewItems = flatVNode(defaultSlots)
      return (
        <view ref={rootRef} class="uni-movable-area" {...listeners}>
          {movableViewItems}
        </view>
      )
    }
  },
})
