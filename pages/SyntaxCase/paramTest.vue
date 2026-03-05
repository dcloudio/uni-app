<template>
  <div>
    <button @click="inputArrayTest">传入数组参数</button>
    <button @click="inputParamTest">传入复杂对象参数</button>
    <button @click="returnArrayTest">返回数组参数</button>
    <button @click="returnParamTest">返回复杂对象参数</button>
    <button @click="callbackArrayTest">异步返回数组</button>
    <button @click="callbackParamTest">异步返回复杂对象</button>
    <button @click="callbackDefaultParamTest">默认值测试</button>
  </div>
</template>

<script>
	import {
		inputArray,
		inputParam,
		returnArray,
		returnParam,
		callbackArray,
		callbackParam,
    DefaultParamTest,
    defaultParamFunc
	} from '@/uni_modules/uts-advance'



	export default {
		data() {
			return {}
		},
		methods: {
			
			inputArrayTest() {
				let ret = inputArray(['a', 'b', 'c'])
				if (ret) {
					uni.showToast({
						title: '测试通过'
					})
				}
			},

			inputParamTest() {
				let ret = inputParam({
					title: "hello",
					array: ["1", "2", "3"]
				})
				if (ret) {
					uni.showToast({
						title: '测试通过'
					})
				}
			},
			returnArrayTest() {
				let ret = returnArray()
				console.log( JSON.stringify(ret))
				if ('["1","2","3"]' == JSON.stringify(ret)) {
					uni.showToast({
						title: '测试通过'
					})
				}
			},
			returnParamTest() {
				let ret = returnParam()
				if ('{"title":"returnParam","array":["1","2","3"]}' == JSON.stringify(ret)) {
					uni.showToast({
						title: '测试通过'
					})
				}
			},

			callbackArrayTest() {
				callbackArray(function(res) {
					if ('["8","8","8"]' == JSON.stringify(res)) {
						uni.showToast({
							title: '测试通过'
						})
					}
				});

			},
      callbackDefaultParamTest(){
        if(defaultParamFunc() == "789" && DefaultParamTest.execute() == "123" && new DefaultParamTest().execute2() == "456"){
          uni.showToast({
            title:'测试通过'
          })
        }else{
          uni.showToast({
            title:'测试失败'
          })
        }
        			
      },
			callbackParamTest() {
				callbackParam(function(res) {
					if ('{"title":"callbackParam","array":["4","5","6"]}' == JSON.stringify(res)) {
						uni.showToast({
							title: '测试通过'
						})
					}
				});
			}

		}
	}
</script>

<style>
</style>