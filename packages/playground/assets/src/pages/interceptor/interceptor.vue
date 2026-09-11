<script setup>
import { delay } from "es-toolkit";
import { ref } from "vue";

const navigateActive = ref(false);

// 添加日志
function addLog(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}
// 添加 navigateTo 拦截器
function addNavigateInterceptor() {
  if (navigateActive.value) {
    addLog("navigateTo 拦截器已存在，无需重复添加");
    return;
  }
  uni.addInterceptor("navigateTo", {
    invoke: (args) => {
      addLog(`🚀 [navigateTo-invoke] 目标页面：${args.url || "未知"}`);
      return false;
    },
    success: () => {
      addLog("🚀 [navigateTo-success] 跳转成功");
    },
    fail: (err) => {
      addLog(`🚀 [navigateTo-fail] 跳转失败：${err.errMsg || "未知错误"}`);
    },
    complete: () => {
      addLog("🚀 [navigateTo-complete] 跳转操作完成");
    },
  });
  navigateActive.value = true;
  addLog("✅ navigateTo 拦截器已添加");
}
// 添加异步 navigateTo 拦截器
function addAsyncNavigateInterceptor() {
  if (navigateActive.value) {
    addLog("navigateTo 拦截器已存在，无需重复添加");
    return;
  }
  uni.addInterceptor("navigateTo", {
    invoke: async (args) => {
      addLog(`🚀 [navigateTo-invoke] 目标页面：${args.url || "未知"}`);
      await delay(1000);
      return false;
    },
    success: () => {
      addLog("🚀 [navigateTo-success] 跳转成功");
    },
    fail: (err) => {
      addLog(`🚀 [navigateTo-fail] 跳转失败：${err.errMsg || "未知错误"}`);
    },
    complete: () => {
      addLog("🚀 [navigateTo-complete] 跳转操作完成");
    },
  });
  navigateActive.value = true;
  addLog("✅ navigateTo 拦截器已添加");
}
// 添加多个异步 navigateTo 拦截器
function addMultiAsyncNavigateInterceptor() {
  if (navigateActive.value) {
    addLog("navigateTo 拦截器已存在，无需重复添加");
    return;
  }
  uni.addInterceptor("navigateTo", {
    invoke: async (args) => {
      addLog(`🚀 [navigateTo-invoke] 目标页面：${args.url || "未知"}`);
      return new Promise((resolve) => {
        setTimeout(() => {
          addLog("s1-invoke");
          resolve(args);
        }, 2000);
      });
    },
    success: () => {
      addLog("🚀 [navigateTo-success] 跳转成功");
    },
    fail: (err) => {
      addLog(`🚀 [navigateTo-fail] 跳转失败：${err.errMsg || "未知错误"}`);
    },
    complete: () => {
      addLog("🚀 [navigateTo-complete] 跳转操作完成");
    },
  });
  uni.addInterceptor("navigateTo", {
    invoke: async (args) => {
      addLog(`🚀 [navigateTo-invoke] 目标页面：${args.url || "未知"}`);
      return new Promise((resolve) => {
        setTimeout(() => {
          addLog("s2-invoke");
          resolve(args);
        }, 4000);
      });
    },
    success: () => {
      addLog("🚀 [navigateTo-success] 跳转成功");
    },
    fail: (err) => {
      addLog(`🚀 [navigateTo-fail] 跳转失败：${err.errMsg || "未知错误"}`);
    },
    complete: () => {
      addLog("🚀 [navigateTo-complete] 跳转操作完成");
    },
  });
  navigateActive.value = true;
  addLog("✅ navigateTo 拦截器已添加");
}

// 移除 navigateTo 拦截器
function removeNavigateInterceptor() {
  if (!navigateActive.value) {
    addLog("navigateTo 拦截器未启用，无需移除");
    return;
  }
  uni.removeInterceptor("navigateTo");
  navigateActive.value = false;
  addLog("🗑️ navigateTo 拦截器已移除");
}
// 触发跳转
function triggerNavigate() {
  addLog("--- 手动触发 uni.navigateTo ---");
  uni.navigateTo({
    url: "/pages/index/index",
    success: () => {
      addLog("📋 跳转成功回调");
    },
    fail: (err) => {
      addLog(`📋 跳转失败回调：${err.errMsg || "未知"}`);
    },
  });
}
</script>

<template>
  <view class="container">
    <text class="title">
      拦截器示例
    </text>

    <!-- navigateTo 拦截器 -->
    <view class="section">
      <text class="section-title">
        navigateTo 拦截器
      </text>
      <view class="btn-group">
        <button class="btn add" @click="addNavigateInterceptor">
          添加 navigateTo 拦截器
        </button>
        <button class="btn add" @click="addAsyncNavigateInterceptor">
          添加异步 navigateTo 拦截器
        </button>
        <button class="btn add" @click="addMultiAsyncNavigateInterceptor">
          添加多个异步 navigateTo 拦截器
        </button>
        <button class="btn remove" @click="removeNavigateInterceptor">
          移除 navigateTo 拦截器
        </button>
      </view>
      <text class="status">
        状态：{{ navigateActive ? '✅ 已启用' : '❌ 未启用' }}
      </text>
    </view>

    <!-- 触发操作 -->
    <view class="section">
      <text class="section-title">
        触发操作
      </text>
      <view class="btn-group">
        <button class="btn action" @click="triggerNavigate">
          跳转页面
        </button>
      </view>
    </view>
  </view>
</template>

<style scoped lang="css">
.container {
  padding: 20rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30rpx;
}

.section {
  margin-bottom: 30rpx;
  padding: 20rpx;
  background-color: #f8f8f8;
  border-radius: 16rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 16rpx;
}

.btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  margin-bottom: 12rpx;
}

.btn {
  font-size: 24rpx;
  padding: 12rpx 20rpx;
  border-radius: 8rpx;
}

.btn.add {
  background-color: #007aff;
  color: #ffffff;
}

.btn.remove {
  background-color: #ff3b30;
  color: #ffffff;
}

.btn.action {
  background-color: #34c759;
  color: #ffffff;
}

.status {
  font-size: 24rpx;
  color: #666666;
}
</style>
