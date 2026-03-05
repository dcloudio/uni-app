<template>
  <view>
    <slot></slot>
  </view>
</template>

<script lang="uts" setup>
  import {ItemChildType} from './item.type.uts'
  defineOptions({
    name: "UniCollapse"
  })

  const props = defineProps({
    accordion: { type: Boolean, default: true }
  })

  let child_nodes = [] as ItemChildType[]

  function registerChild(child : ItemChildType) {
    child_nodes.push(child)
  }

  // 关闭所有
  function toggle(elId:string) {
    // 开启手风琴效果才回关闭其他
    if (props.accordion && child_nodes.length > 0) {
      child_nodes.forEach((item : ItemChildType) => {
        const is_open = item.is_open.value as boolean
        if (is_open && item.elId != elId) {
          item.is_open.value = false
          item.openOrClose(false)
        }
      })
    }
  }

  provide('uni-collapse-register-child', registerChild)
  provide('k-collapse-child-toggle', toggle)
</script>
