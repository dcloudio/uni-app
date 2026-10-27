<template>
  <view
    <!-- #ifdef WEB -->
    :tabindex="disabled ? -1 : 0"
    @keydown="handleKeydown"
    @keyup="handleKeyup"
    @blur="handleBlur"
    class="uni-label"
    :aria-disabled="disabled"
    <!-- #endif -->
    @click="handleTap"
  >
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
  // #ifdef WEB
  import { createSpaceKeyHandlers } from '../common.ts'
  // #endif
  // Label that supports internal form controls (checkbox/radio/switch)
  // via provide/inject registration. Clicking the label will activate
  // the first registered control, or the one matching `for` if provided.
  import { LABEL_KEY, findLabelTarget } from '../common.ts'
  import { UniLabelElement } from './global.ts'
  import { ActivatableChild, LabelContext } from '../types.ts'

  interface LabelProps {
    /**
     * 是否禁用
     * @uniPlatform {
       "app": {
         "ios": {
           "unixVaporVer": "5.11"
         },
         "android": {
           "unixVaporVer": "5.21"
         },
        "harmony": {
           "unixVaporVer": "5.0"
         }
       }
     }
     */
    disabled?: boolean;
    /**
     * 绑定控件的 id
     * @uniPlatform {
       "app": {
         "ios": {
           "unixVaporVer": "5.11"
         },
         "android": {
           "unixVaporVer": "5.21"
         },
        "harmony": {
           "unixVaporVer": "5.0"
         }
       }
     }
     */
    for?: string;
  }

  const props = withDefaults(defineProps<LabelProps>(), {
    disabled: false,
    for: ''
  })

  // #ifdef WEB
  const { handleKeydown, handleKeyup, handleBlur } = createSpaceKeyHandlers(() => props.disabled)
  // #endif

  defineOptions({
    name: 'label',
    // @ts-ignore
    rootElement: {
      class: UniLabelElement
    }
  })

  // Keep a small registry of children inside this label
  const children: Array<ActivatableChild> = []

  function register(child: ActivatableChild) {
    // prevent duplicate by id if available
    if (child.id && child.id.length > 0) {
      const idx = children.findIndex(c => c.id === child.id)
      if (idx !== -1) {
        children[idx] = child
        return
      }
    }
    children.push(child)
  }

  function unregister(id?: string) {
    if (!id) return
    const idx = children.findIndex(c => c.id === id)
    if (idx !== -1) {
      children.splice(idx, 1)
    }
  }

  const ctx: LabelContext = { register, unregister }
  provide(LABEL_KEY, ctx)

  function findTarget(): ActivatableChild | null {
    // Prefer matching by `for` if provided
    if (props.for && props.for.length > 0) {
      const byId = children.find(c => c.id === props.for)
      if (byId) return byId
      const byScopeId = findLabelTarget(props.for)
      if (byScopeId) return byScopeId
    }
    if (children.length === 0) return null
    // Fallback to first child
    return children[0]
  }

  const handleTap = (event: UniPointerEvent) => {
    // #ifdef WEB
    // Web 通过 DOM 祖先识别按钮：旧宿主使用 uni-button 标签，Vapor 使用同名属性，新 UVue 使用同名根类。
    // 按钮已处理自身点击，跳过 Label 联动以免激活其他控件，同时保留业务事件冒泡。
    // Node、Element 和 closest 仅用于 Web，App 保持原有处理流程。
    const eventTarget = event.target as Node | null
    const element = eventTarget?.nodeType === 1
      ? eventTarget as Element
      : eventTarget?.parentElement
    if (element?.closest('uni-button, [uni-button], .uni-button')) {
      return
    }
    // #endif
    const classList: string[] = event.target?.classList ? event.target.classList : []
    // 索引遍历同时兼容 App 的数组和 Web 的 DOMTokenList，避免额外转换。
    for (let i = 0; i < classList.length; i++) {
      if (/^uni-(checkbox|radio|switch)/.test(classList[i])) {
        return
      }
    }
    if (props.disabled) {
      return
    }
    const target = findTarget()
    if (target == null) return
    if (target.getDisabled && target.getDisabled()) return
    // Activate the child control
    target.activate(event)
  }
</script>
