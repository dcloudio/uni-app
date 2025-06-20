<script lang="ts">
export default {
  data() {
    return {
      msg: 'Script-Style-Template'
    }
  }
}
</script>

<style>
.page {
  color: purple;
}
</style>

<template>
  <view class="page">
    <text>{{ msg }}</text>
  </view>
</template> 