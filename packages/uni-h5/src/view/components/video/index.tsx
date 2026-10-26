import { onMounted } from 'vue'
import { UniElement, defineBuiltInComponent } from '@dcloudio/uni-components'
import { useVideoComponent, videoEmits, videoProps } from './useVideo'

// 仅作实现，X项目中不会依据此类生成d.ts
export class UniVideoElement extends UniElement {}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Video',
  props: videoProps,
  emits: videoEmits,
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-video',
    class: UniVideoElement,
  },
  //#endif
  setup(props, context) {
    const { rootRef, toggleControls, methods, render } = useVideoComponent(
      props,
      context
    )
    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniVideoElement
      Object.assign(rootElement, methods)
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => (
      <uni-video ref={rootRef} id={props.id} onClick={toggleControls}>
        {render()}
      </uni-video>
    )
  },
})
