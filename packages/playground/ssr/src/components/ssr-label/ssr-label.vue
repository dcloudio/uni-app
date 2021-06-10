<template>
  <view>
    <view class="uni-common-mt">
      <view class="uni-form-item uni-column">
        <view class="title">表单组件在label内</view>
        <checkbox-group
          class="uni-list"
          @change="checkboxChange"
        >
          <label
            class="uni-list-cell uni-list-cell-pd"
            v-for="item in checkboxItems"
            :key="item.name"
          >
            <view>
              <checkbox
                :value="item.name"
                :checked="item.checked"
              ></checkbox>
            </view>
            <view>{{ item.value }}</view>
          </label>
        </checkbox-group>
      </view>

      <view class="uni-form-item uni-column">
        <view class="title">label用for标识表单组件</view>
        <radio-group
          class="uni-list"
          @change="radioChange"
        >
          <view
            class="uni-list-cell uni-list-cell-pd"
            v-for="(item, index) in radioItems"
            :key="index"
          >
            <view>
              <radio
                :id="item.name"
                :value="item.name"
                :checked="item.checked"
              ></radio>
            </view>
            <label
              class="label-2-text"
              :for="item.name"
            >
              <text>{{ item.value }}</text>
            </label>
          </view>
        </radio-group>
      </view>

      <view class="uni-form-item uni-column">
        <view class="title">label内有多个时选中第一个</view>
        <checkbox-group
          class="uni-list"
          @change="checkboxChange"
        >
          <label
            class="label-3"
            @click="labelClick"
          >
            <view class="uni-list-cell uni-list-cell-pd">
              <checkbox
                v-if="showOne"
                value="one"
                class="checkbox-3"
              >选项一</checkbox>
            </view>
            <view class="uni-list-cell uni-list-cell-pd">
              <checkbox
                value="two"
                class="checkbox-3"
              >选项二</checkbox>
            </view>
            <view
              class="uni-link uni-center"
              style="margin-top: 20rpx"
            >点击该label下的文字默认选中第一个checkbox</view>
          </label>
        </checkbox-group>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title: "label",
      checkboxItems: [
        {
          name: "USA",
          value: "美国",
        },
        {
          name: "CHN",
          value: "中国",
          checked: "true",
        },
      ],
      radioItems: [
        {
          name: "USA",
          value: "美国",
        },
        {
          name: "CHN",
          value: "中国",
          checked: "true",
        },
      ],
      hidden: false,
      showOne: true,
    };
  },
  methods: {
    checkboxChange: function (e) {
      var checked = e.detail.value;
      console.log(checked);
    },
    radioChange: function (e) {
      var checked = e.detail.value;
      console.log(checked);
    },
    labelClick() {
      setTimeout(() => {
        this.showOne = false;
      }, 1000);
    },
  },
};
</script>

<style>
.uni-list-cell {
  justify-content: flex-start;
}

.uni-list .label-3 {
  padding: 0;
}

.label-2-text {
  flex: 1;
}
</style>
