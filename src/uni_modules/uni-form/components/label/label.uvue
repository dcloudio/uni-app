<template>
  <view @click="handleTap">
    <slot></slot>
  </view>
</template>

<script lang="uts" setup>
  // Label that supports internal form controls (checkbox/radio/switch)
  // via provide/inject registration. Clicking the label will activate
  // the first registered control, or the one matching `for` if provided.
  import { LABEL_KEY } from '../common.uts'
  import { UniLabelElement } from './global.uts'
  import { ActivatableChild, LabelContext } from '../types.uts'

  interface LabelProps {
    /**
     * 是否禁用
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    disabled?: boolean;
    /**
     * 绑定控件的 id
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
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
    if (children.length === 0) return null
    // Prefer matching by `for` if provided
    if (props.for && props.for.length > 0) {
      const byId = children.find(c => c.id === props.for)
      if (byId) return byId
    }
    // Fallback to first child
    return children[0]
  }

  const handleTap = (event: UniPointerEvent) => {
    const classList: string[] = event.target?.classList ? event.target.classList : []
    if (classList.length > 0) {
      const shouldStopPagination = classList.some((cls) => /^uni-(checkbox|radio|switch)/.test(cls))
      if (shouldStopPagination) {
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
