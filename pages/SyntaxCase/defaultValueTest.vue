<template>
	<view class="buttons">
		<button @click="testClick">测试全部</button>
		<text>{{testRet}}</text>
	</view>
</template>

<script setup>
	import { 
        Scan, 
        Scan1, 
        Scan2, 
        myClass
  } from "@/uni_modules/uts-syntaxcase";
	import { ref } from 'vue'
	
	const myClassInit = new myClass();
	let testRet = ref("1");
	const testClick = function(){
		testRet.value = "success"
    // #ifdef APP-ANDROID
      if(Scan() != 60000){
      	testRet = "error1"
      	console.log("error1")
      }
      if(Scan(100) != 100){
      	testRet = "error2"
      	console.log("error2")
      }
    // #endif
		
		if(Scan1() != "null"){
			testRet = "error3"
			console.log("error3")
		}
		if(Scan1(100) != 100){
			testRet = "error4"
			console.log("error4")
		}
		if(Scan2() != "null"){
			testRet = "error5"
			console.log("error5")
		}
		if(Scan2(100) != 100){
			testRet = "error6"
			console.log("error6")
		}
		if(myClassInit.to('123') != "123"){
			testRet = "error7"
			console.log("error7")
		}
		
	}
</script>

<style lang="scss">
	.buttons{
		padding: 20rpx 20rpx 460rpx;
		button{
			margin-bottom: 20rpx;
			font-size: 28rpx;
			padding: 3px;
		}
	}
</style>
