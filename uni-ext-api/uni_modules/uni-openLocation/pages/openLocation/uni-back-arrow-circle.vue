<template>
  <!-- 圆形背景承载点击区域，箭头由旋转边框绘制。 -->
  <view class="back-circle" @click="handleClick">
    <!-- #ifdef APP -->
    <view class="back-arrow" flatten></view>
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{
    autoBack?: boolean
  }>(), {
    autoBack: false
  })

  const emit = defineEmits(['click'])
  const handleClick = () => {
    emit('click')
    if (props.autoBack) {
      uni.navigateBack({})
    }
  }
</script>

<style>
  .back-circle {
    width: 28px;
    height: 28px;
    border-radius: 14px;
    background-color: rgba(220, 220, 220, 0.3);
    justify-content: center;
    align-items: center;
    margin: 6px;
    padding-left: 4px;
  }

  /* 通过根节点上的 CSS 变量定制箭头颜色和线宽。 */
  /* #ifdef WEB || MP */
  .back-circle::after,
  /* #endif */
  .back-arrow {
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
    border-left: var(--back-arrow-width, 2px) solid var(--back-arrow-color, #000000);
    border-bottom: var(--back-arrow-width, 2px) solid var(--back-arrow-color, #000000);
  }

  /* #ifdef WEB || MP */
  .back-circle::after {
    content: '';
    box-sizing: border-box;
  }
  /* #endif */

  @media (prefers-color-scheme: dark) {
    .back-circle {
      background-color: rgba(80, 80, 80, 0.45);
    }

    /* #ifdef WEB || MP */
    .back-circle::after,
    /* #endif */
    .back-arrow {
      border-left-color: var(--back-arrow-color, #ffffff);
      border-bottom-color: var(--back-arrow-color, #ffffff);
    }
  }
</style>
