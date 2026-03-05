<template>
  <div>
    {{ret}}
    <button @click="instanceCreate">多实例创建测试</button>
    <button @click="defaultValueTest">默认值测试</button>
  </div>
	
</template>

<script>
	import {
		User
	} from '@/uni_modules/uts-advance'

  import {
      Scan, 
      Scan1, 
      Scan2, 
      myClass
  } from "@/uni_modules/uts-syntaxcase";

	export default {
		data() {
			return {
				ret:'',
        // 将uts的class实例放进data里，测试响应式包装后是否有问题
        user1: new User("张三", 20)
			}
		},
		methods: {
			
      defaultValueTest() {
        const myClassInit = new myClass();
        // 默认值测试
        if(Scan() != 60000){
          this.ret = "测试失败1"
        }
        if(Scan(100) != 100){
          this.ret = "测试失败2"
        }
        if(Scan1() != null){
          this.ret = "测试失败3"
        }
        if(Scan1(100) != 100){
          this.ret = "测试失败4"
        }
        let ret5 = Scan2()
        if(ret5 != "null"){
          console.log(ret5)
          this.ret = "测试失败5"
        }
        if(Scan2(100) != 100){
          this.ret = "测试失败6"
        }
        if(myClassInit.to('123') != 123){
          this.ret = "测试失败7"
        }
      },
      
			instanceCreate() {
				
				const user2 = new User("李四", 30);  
				const user3 = new User("王五", 40);  
				
				let userText1 = this.user1.describeSelf() 
				let userText2 = user2.describeSelf()   
				let userText3 = user3.describeSelf()  

				
				if(userText1 == userText2 || userText1 == userText3 || userText2 == userText3){
					this.ret = '测试未通过'
				}else{
					this.ret = '测试通过'
				}
				
			}

			
		}
	}
</script>

<style>
</style>