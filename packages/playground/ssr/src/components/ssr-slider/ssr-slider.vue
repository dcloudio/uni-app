<template>
  <view>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-title">显示当前value</view>
      <view>
        <slider
          value="50"
          @change="sliderChange"
          show-value
        />
      </view>

      <view class="uni-title">设置步进step跳动</view>
      <view>
        <slider
          value="60"
          @change="sliderChange"
          step="5"
        />
      </view>

      <view class="uni-title">设置最小/最大值</view>
      <view>
        <slider
          value="100"
          @change="sliderChange"
          min="50"
          max="200"
          show-value
          @changing="changing"
        />
      </view>

      <view class="uni-title">不同颜色和大小的滑块</view>
      <view>
        <slider
          value="50"
          @change="sliderChange"
          activeColor="#FFCC33"
          backgroundColor="#000000"
          block-color="#8A6DE9"
          block-size="20"
        />
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title: "slider 滑块",
    };
  },
  methods: {
    changing(e) {
      console.log("value 发生变化：" + e.detail.value);
    },
    sliderChange(e) {
      console.log("value 发生变化：" + e.detail.value);
    },
  },
};
</script>
