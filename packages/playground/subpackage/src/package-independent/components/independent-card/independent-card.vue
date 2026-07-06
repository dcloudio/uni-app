<template>
  <view class="independent-card">
    <text>{{ message }}</text>
  </view>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: '',
    },
  },
}
</script>

<style>
.independent-card {
  border: 1px solid #1f6feb;
}
</style>
