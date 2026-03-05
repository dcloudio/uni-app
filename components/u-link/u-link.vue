<template>
  <!-- <view class="uni-row"> -->
  <text class="text" @click="openURL">{{text}}</text>
  <!-- </view> -->
</template>

<script lang="uts" setup>
// #ifdef APP
import { openSchema } from '@/uni_modules/uts-openSchema'
// #endif
  /**
   * @description u-link是一个外部网页超链接组件，在小程序内打开内部web-view组件或复制url，在app内打开外部浏览器，在h5端打开新网页
   * @property {String} href 点击后打开的外部网页url，小程序中必须以https://开头
   * @property {String} text 显示的文字
   * @property {Boolean} inWhiteList 是否在小程序白名单中，如果在的话，在小程序端会直接打开内置web-view，否则会只会复制url，提示在外部打开
   * @example * <u-link href="https://ext.dcloud.net.cn" text="https://ext.dcloud.net.cn" :inWhiteList="true"></u-link>
   */

  const props = defineProps({
    href: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    inWhiteList: {
      type: Boolean,
      default: false
    }
  })

  const openURL = () => {
    // #ifdef WEB
    window.open(props.href)
    // #endif
    // #ifdef MP
    if (props.inWhiteList) { //如果在小程序的网址白名单中，会走内置webview打开，否则会复制网址提示在外部浏览器打开
    	uni.navigateTo({
    		url: '/pages/component/web-view/web-view?url=' + props.href
    	});
    } else {
    	uni.setClipboardData({
    		data: props.href
    	});
    	uni.showModal({
    		content: '本网址无法直接在小程序内打开。已自动复制网址，请在手机浏览器里粘贴该网址',
    		showCancel: false
    	});
    }
    // #endif
    // #ifdef APP
    openSchema(props.href)
    // #endif
  }
</script>

<style>
  .text {
    /* color: #7A7E83;
    font-size: 14px;
    line-height: 20px; */
    /* border-bottom: 1px solid #7A7E83; */
    text-decoration-line: underline
  }
</style>
