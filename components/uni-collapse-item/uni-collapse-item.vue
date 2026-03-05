<template>
  <view class="uni-collapse-item" :class="isDarkMode ? 'theme-dark' : 'theme-light'">
    <view class="uni-collapse-item__title" @click="openCollapse(!is_open)">
      <text class="uni-collapse-item__title-text" :class="{'is-disabled':disabled,'open--active':is_open}">{{title}}</text>
      <view class="down_arrow" :class="{'down_arrow--active': is_open}"></view>
    </view>
    <view ref="boxRef" class="uni-collapse-item__content" :class="{'box-open--active':is_open}">
      <view ref="contentRef" class="uni-collapse-item__content-box" :class="{'content-open--active':box_is_open}">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script lang="uts" setup>
  import { ItemChildType } from '../uni-collapse/item.type.uts'
  import { state } from '@/store/index.uts'
  const isDarkMode = computed((): boolean => {
    return state.isDarkMode
  })

  defineOptions({
    name: "UniCollapseItem",
    styleIsolation: 'app'
  })

  const props = defineProps({
    title: { type: String, default: '' },
    open: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  })
  let height = 0
  let is_open = ref<boolean>(props.open)
  let box_is_open = ref<boolean>(props.open)

  let boxRef = ref<UniViewElement | null>(null)
  let contentRef = ref<UniViewElement | null>(null)

  let openType = computed(() => props.open)

  // 组件唯一ID
  const elId = ref(`uni_collapse_item_${Math.ceil(Math.random() * 10e5).toString(36)}`)

  const registerChild = inject<((child : ItemChildType) => string) | null>('uni-collapse-register-child', null)
  const collapseToggle = inject<((elId : string) => string) | null>('k-collapse-child-toggle', null)

  function openOrClose(open : boolean) {
    setTimeout(() => {
      box_is_open.value = !box_is_open.value
    }, 10)
    // #ifndef MP-WEIXIN
    const bNode = boxRef.value?.style!;
    const cNode = contentRef.value?.style!;
    let hide = open ? 'flex' : 'none';
    const opacity = open ? "1" : "0"
    let ani_transform = open ? 'translateY(0)' : 'translateY(-100%)';
    bNode.setProperty('display', hide);
    nextTick(() => {
      setTimeout(() => {
        cNode.setProperty('transform', ani_transform);
        cNode.setProperty('opacity', opacity);
      }, 10)
    })
    // #endif
  }

  // 开启或关闭折叠面板
  function openCollapse(open : boolean) {
    if (props.disabled) return
    // 关闭其他已打开
    if (collapseToggle != null) {
      collapseToggle(elId.value)
    }
    is_open.value = open
    openOrClose(open)
  }


  onMounted(() => {
    if (registerChild != null) {
      const child : ItemChildType = {
        is_open,
        elId: elId.value,
        openOrClose
      }
      registerChild(child)
    }
  })

  watch(openType, (value : boolean) => {
    if (boxRef.value != null) {
      openCollapse(value)
    }
  })

  defineExpose({
    is_open,
    openOrClose,
    openCollapse
  })
</script>

<style>
  /* .uni-collapse-item {
    background-color: #fff;
  } */

  .uni-collapse-item__title {
    flex-direction: row;
    align-items: center;
    padding: 12px 18px;
    background-color: var(--list-background-color,#ffffff);
  }

  .down_arrow {
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    border-right: 1px #999 solid;
    border-bottom: 1px #999 solid;
    margin-top: -3px;
    transition-property: transform;
    transition-duration: 150ms;
  }

  .down_arrow--active {
    transform: rotate(-135deg);
    margin-top: 0px;
  }

  .uni-collapse-item__title-text {
    flex: 1;
    font-size: 14px;
    font-weight: 400;
    color: var(--text-color, #333333);
  }

  .open--active {
    /* background-color: #f0f0f0; */
    color: var(--active-color, #bbb);
  }

  .is-disabled {
    color: #999;
  }

  .uni-collapse-item__content {
    display: none;
    position: relative;
    overflow: hidden;
  }

  .box-open--active {
    display: flex;
  }

  .uni-collapse-item__content-box {
    width: 100%;
    transition-property: transform, opacity;
    transition-duration: 150ms;
    transform: translateY(-100%);
    opacity: 0;
  }

  .content-open--active {
    transform: translateY(0%);
    opacity: 1;
  }
</style>
