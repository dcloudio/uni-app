import { queuePostFlushCb } from 'vue'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { adProps, useAd } from './useAd'

const uniTagName = { value: 'AD' }

export default /*#__PURE__*/ defineBuiltInComponent({
  inheritAttrs: false,
  name: 'Ad',
  props: adProps,
  setup(props, { emit, slots }) {
    const { rootRef, customTuiaVisible, $excludeAttrs, $listeners, ad } = useAd(
      props,
      emit,
      // Vapor 插槽会直接创建节点，只判断是否声明，不为探测而提前执行插槽。
      () => Boolean(slots.default)
    )
    let pendingMaterial:
      | {
          onRendered: (hasContent: boolean) => void
          hasContent: boolean
        }
      | undefined
    const confirmMaterial = () => {
      const pending = pendingMaterial
      pendingMaterial = undefined
      // DOM 插入后再触发业务回调；卸载或切换广告后，不确认旧加载结果。
      if (
        pending &&
        rootRef.value &&
        customTuiaVisible.value === pending.onRendered
      ) {
        pending.onRendered(pending.hasContent)
      }
    }
    const renderCustomMaterial = () => {
      const onRendered = customTuiaVisible.value
      if (typeof onRendered !== 'function') return null
      const content = slots.default?.()
      // 插槽在正常渲染上下文中只执行一次；空数组与旧实现一样回退图片。
      pendingMaterial = {
        onRendered,
        hasContent:
          Boolean(content) && (!Array.isArray(content) || content.length > 0),
      }
      // 复用同一任务供调度器去重，同一轮更新采用最后一次渲染结果。
      queuePostFlushCb(confirmMaterial)
      return content
    }
    const root = (
      <div
        uni-ad=""
        uni-view=""
        {...$listeners.value}
        {...$excludeAttrs.value}
        adpid={props.adpid}
        adpidWidescreen={props.adpidWidescreen}
        widescreenWidth={props.widescreenWidth}
      >
        <div
          ref={rootRef}
          class="uni-ad-container"
          onClick={() => ad.report(41)}
        />
        {customTuiaVisible.value ? (
          <div
            class="uni-ad-custom-material"
            onClick={() => ad.renderTuiaFromCustomMaterial()}
          >
            {renderCustomMaterial()}
          </div>
        ) : null}
      </div>
    )
    // 标记宿主类型，SDK 和事件目标仍使用原来的内部广告容器。
    Object.defineProperty(root, 'uniTagName', uniTagName)
    return root
  },
})
