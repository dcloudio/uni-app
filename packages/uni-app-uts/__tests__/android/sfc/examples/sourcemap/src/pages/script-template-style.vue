<script lang="ts">
export default {
  data() {
    return {
      msg: 'Script-Template-Style'
    }
  }
}
</script>

<template>
  <view class="page">
    <text>{{ msg }}</text>
  </view>
</template>

<style>
.page {
  color: orange;
}
</style> 