<template>
  <view class="content">
    <input type="digit" v-model="value" @input="onInput" @change="onInput" :focus="true"/>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
      cache: 1,
    }
  },
  onLoad() {},
  methods: {
  },
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
