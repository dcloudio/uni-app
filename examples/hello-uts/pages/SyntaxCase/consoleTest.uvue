<template>
  <div>
    <button @click="doLogTest">打印测试</button>
    <text>{{testRet}}</text>
  </div>
</template>

<script>

  import { getLog,logObjectTest,logClassTest,logFunctionTest,logFileTest,logDateTest,logUTSJSONObjectTest } from '../../uni_modules/uts-api-test'
 

	export default {
		data() {
			return {
        testRet:''
      }
		},
		methods: {
			
			doLogTest() {
        
        if(getLog("") != '{"type":"string","value":""}'){
          this.testRet = "测试失败1"
          return;
        }
        
        if(getLog("字符串打印测试") != '{"type":"string","value":"字符串打印测试"}'){
          this.testRet = "测试失败2"
          return;
        }
        if(getLog(2023) != '{"subType":"number","type":"Int","value":"2023"}'){
          this.testRet = "测试失败3"
          return;
        }

        if(getLog(2023.002 as number) != '{"subType":"number","type":"Double","value":"2023.002"}'){
          this.testRet = "测试失败4"
          return;
        }
        
        if(logObjectTest() != '{"className":"uts.sdk.modules.utsApiTest.ParamOptions","subType":"object","__$originalPosition":"","type":"object","value":{"methods":[],"properties":[{"name":"array","subType":"array","className":"io.dcloud.uts.UTSArray","type":"object","value":{"properties":[{"name":{"value":{"value":0}},"type":"string","value":"1"},{"name":{"value":{"value":1}},"type":"string","value":"2"},{"name":{"value":{"value":2}},"type":"string","value":"3"}]}},{"name":"title","type":"string","value":"logObjectTest"}]}}'){
          this.testRet = "测试失败5"
          return;
        }
        
        if(logFunctionTest() != '{"parameter":[],"type":"function"}'){
          this.testRet = "测试失败6"
          return;
        }
        
        if(logClassTest() != '{"className":"uts.sdk.modules.utsApiTest.C","subType":"object","__$originalPosition":"","type":"object","value":{"methods":[],"properties":[{"name":"name","type":"string","value":"ccc"},{"parameter":["string"],"name":"sayBye","type":"function"}]}}'){
          this.testRet = "测试失败7"
          return;
        }
        /**
         * uvue 和 vue 因为 java 版本不同，所以这里的打印格式可能存在差异
         */
        if(logFileTest() != '{"className":"java.io.File","subType":"object","type":"object","value":{"methods":[],"properties":[]}}'){
          this.testRet = "测试失败8"
          return;
        }
        
        if(logDateTest() != '{"className":"io.dcloud.uts.Date","subType":"date","type":"object","value":"Sat Aug 08 1998 08:00:00 GMT+0800"}'){
          this.testRet = "测试失败9"
          return;
        }
        
        this.testRet = "测试完成"
        
			}

		}
	}
</script>

<style>
</style>