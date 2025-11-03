<style>
.page {
  background: blue;
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      title: 'Style-Script-Template'
    }
  }
}
</script>

<template>
  <view class="page">
    <text>{{ title }}</text>
  </view>
</template> 