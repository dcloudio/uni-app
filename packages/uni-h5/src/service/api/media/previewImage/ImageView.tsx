import { reactive } from 'vue'
import {
  MovableArea,
  MovableView,
  defineSystemComponent,
  withWebEvent,
} from '@dcloudio/uni-components'

const props = {
  src: {
    type: String,
    default: '',
  },
}

export default /*#__PURE__*/ defineSystemComponent({
  name: 'ImageView',
  props,
  setup(props) {
    const state = reactive({
      direction: 'none',
    })
    let scale = 1
    let imgWidth = 0
    let imgHeight = 0
    let width = 0
    let height = 0
    function onScale({ detail }: { detail: { scale: number } }) {
      scale = detail.scale
    }
    function onImgLoad(event: Event) {
      const target = event.target as HTMLElement
      const rect = target.getBoundingClientRect()
      imgWidth = rect.width
      imgHeight = rect.height
    }
    function onTouchStart(event: Event) {
      const target = event.target as HTMLElement
      const rect = target.getBoundingClientRect()
      width = rect.width
      height = rect.height
      checkDirection(event)
    }
    function onTouchEnd(event: Event) {
      const horizontal = scale * imgWidth > width
      const vertical = scale * imgHeight > height
      if (horizontal && vertical) {
        state.direction = 'all'
      } else if (horizontal) {
        state.direction = 'horizontal'
      } else if (vertical) {
        state.direction = 'vertical'
      } else {
        state.direction = 'none'
      }
      checkDirection(event)
    }
    function checkDirection(event: Event) {
      // 避免水平滑动和 swiper 冲突
      if (state.direction === 'all' || state.direction === 'horizontal') {
        event.stopPropagation()
      }
    }
    return () => {
      const viewStyle = {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
      }
      return (
        <MovableArea
          style={viewStyle}
          // @ts-expect-error
          onTouchstart={withWebEvent(onTouchStart)}
          onTouchmove={withWebEvent(checkDirection)}
          onTouchend={withWebEvent(onTouchEnd)}
        >
          <MovableView
            style={viewStyle}
            direction={state.direction}
            inertia
            scale
            scale-min="1"
            scale-max="4"
            // @ts-expect-error
            onScale={onScale}
          >
            <img
              src={props.src}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                maxHeight: '100%',
                maxWidth: '100%',
              }}
              onLoad={onImgLoad}
            />
          </MovableView>
        </MovableArea>
      )
    }
  },
})
