//#if !_NODE_JS_
import {
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  insert,
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  setInsertionState,
} from 'vue'
//#endif
import {
  UniViewElement,
  defineBuiltInComponent,
} from '@dcloudio/uni-components'
import { useVideoComponent, videoEmits, videoProps } from './useVideo'

type VideoMethods = ReturnType<typeof useVideoComponent>['methods']

// 只提供逻辑类型，根节点由模板创建，不构造或注册 Custom Element。
export class UniVideoElement extends UniViewElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniVideoElement &&
        value instanceof UniViewElement &&
        (value as Element).hasAttribute('uni-video')) ||
      Function.prototype[Symbol.hasInstance].call(this, value)
    )
  }
  declare play: VideoMethods['play']
  declare pause: VideoMethods['pause']
  declare stop: VideoMethods['stop']
  declare seek: VideoMethods['seek']
  declare sendDanmu: VideoMethods['sendDanmu']
  declare playbackRate: VideoMethods['playbackRate']
  declare requestFullScreen: VideoMethods['requestFullScreen']
  declare exitFullScreen: VideoMethods['exitFullScreen']
}

const uniTagName = { value: 'VIDEO' }

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Video',
  props: videoProps,
  emits: videoEmits,
  // TODO native 仅用于迁移期间跳过旧注册流程，Vapor 旧组件全部迁移后移除。
  rootElement: { name: 'uni-video', class: UniVideoElement, native: true },
  setup(props, context) {
    const { rootRef, toggleControls, methods, render } = useVideoComponent(
      props,
      context
    )
    const root = (
      <div
        uni-video=""
        uni-view=""
        ref={rootRef}
        id={props.id}
        onClick={toggleControls}
      >
        {
          //#if _NODE_JS_
          render()
          //#endif
        }
      </div>
    )
    //#if !_NODE_JS_
    // 固定容器无需动态 effect；使用 Vue 插入状态让 hydration 定位到根节点内部并复用已有 DOM。
    setInsertionState(root)
    insert(render(), root)
    //#endif
    // 只挂载已有方法，不增加包装；内部 video 与全屏容器继续通过原有 ref 访问。
    Object.assign(root, methods)
    Object.defineProperty(root, 'uniTagName', uniTagName)
    return root
  },
})
