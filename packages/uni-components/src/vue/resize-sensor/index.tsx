import { defineBuiltInComponent } from '../../helpers/component'
import { resizeSensorProps, useResizeSensor } from './useResizeSensor'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'ResizeSensor',
  props: resizeSensorProps,
  emits: ['resize'],
  setup(props, { emit }) {
    const { rootRef, update } = useResizeSensor(props, emit)
    return () => (
      <uni-resize-sensor ref={rootRef} onAnimationstartOnce={update}>
        <div onScroll={update}>
          <div />
        </div>
        <div onScroll={update}>
          <div />
        </div>
      </uni-resize-sensor>
    )
  },
})
