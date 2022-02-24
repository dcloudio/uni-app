import { defineComponent } from 'vue'
import { useCurrentPageId } from '@dcloudio/uni-core'
import { labelProps, useProvideLabel } from '../../components/label'

export { UniLabelCtx, uniLabelKey } from '../../components/label'

// type LabelTarget = HTMLElement & {
//   attr: { dataUncType: string }
// }

export default /*#__PURE__*/ defineComponent({
  name: 'Label',
  props: labelProps,
  styles: [],
  setup(props, { slots }) {
    const pageId = useCurrentPageId()
    const handlers = useProvideLabel()

    const _onClick = ($event: Event) => {
      // const EventTarget = $event.target as LabelTarget
      // const dataType = EventTarget.attr.dataUncType || ''
      // let stopPropagation = /^uni-(checkbox|radio|switch)-/.test(dataType)
      // if (!stopPropagation) {
      //   stopPropagation = /^uni-(checkbox|radio|switch|button)$/i.test(dataType)
      // }
      // if (stopPropagation) {
      //   return
      // }

      if (props.for) {
        UniViewJSBridge.emit(
          `uni-label-click-${pageId}-${props.for}`,
          $event,
          true
        )
      } else {
        handlers.length && handlers[0]($event, true)
      }
    }

    return () => (
      <view onClick={_onClick}>{slots.default && slots.default()}</view>
    )
  },
})
