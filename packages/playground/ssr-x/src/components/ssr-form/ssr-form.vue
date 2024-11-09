<template>
  <view>
    <view class="uni-padding-wrap uni-common-mt">
      <form
        @submit="formSubmit"
        @reset="formReset"
      >
        <view class="uni-form-item uni-column">
          <view class="title">姓名</view>
          <input
            class="uni-input"
            name="nickname"
            placeholder="请输入姓名"
          />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">性别</view>
          <radio-group name="gender">
            <label>
              <radio
                value="男"
                checked
              /><text>男</text>
            </label>
            <label>
              <radio value="女" />
              <text>女</text>
            </label>
          </radio-group>
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">爱好</view>
          <checkbox-group name="loves">
            <label>
              <checkbox value="读书" /><text>读书</text>
            </label>
            <label>
              <checkbox
                value="写字"
                checked
              /><text>写字</text>
            </label>
          </checkbox-group>
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">年龄</view>
          <slider
            value="30"
            name="age"
            min="20"
            max="50"
            step="5"
            disabled
            show-value
          ></slider>
        </view>

        <view class="uni-form-item uni-column">
          <view class="title">开启</view>
          <switch
            name="switch"
            checked
            color="#FFCC33"
          />
        </view>

        <view class="uni-form-item uni-column">
          <view class="title">时间</view>
          <view>
            <picker
              name="time"
              mode="time"
              v-model:value="time"
              start="09:01"
              end="21:01"
              @change="bindTimeChange"
            >
              <view class="uni-input">{{ time }}</view>
            </picker>
          </view>
        </view>

        <view class="uni-btn-v">
          <button form-type="submit">Submit</button>
          <button
            type="default"
            form-type="reset"
          >Reset</button>
        </view>
      </form>
    </view>
  </view>
</template>
<script>

export default {
  data() {
    return {
      time: "12:01",
    };
  },
  methods: {
    formSubmit: function (e) {
      var rule = [
        {
          name: "nickname",
          checkType: "string",
          checkRule: "1,3",
          errorMsg: "姓名应为1-3个字符",
        },
        { name: "gender", checkType: "in", checkRule: "男,女", errorMsg: "请选择性别" },
        { name: "loves", checkType: "notnull", checkRule: "", errorMsg: "请选择爱好" },
      ];
    },
    bindTimeChange: function (e) {
      this.time = e.detail.value;
    },
    formReset: function (e) {
      console.log("清空数据");
    },
  },
};
</script>

<style>
.uni-form-item .title {
  padding: 20rpx 0;
}
</style>
