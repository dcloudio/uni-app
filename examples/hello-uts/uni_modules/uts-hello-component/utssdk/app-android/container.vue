<template>
	<view >
		<slot></slot>
	</view>
</template>
<script lang="uts">
  
  

	import LinearLayout from 'android.widget.LinearLayout'
  import Context from 'android.content.Context'
  import View from 'android.view.View'
  
  /**
   * 自定义android布局组件，可以实现监听显示状态等复杂的功能
   */
  class CustomLinearLayout extends LinearLayout{
    
      constructor(context: Context) {
        super(context)
      }
    
      override onWindowVisibilityChanged(visibility:kotlin.Int){
       
        if (visibility == View.VISIBLE){
          console.log("可见状态",visibility)
        }else if(visibility == INVISIBLE || visibility == GONE){
          console.log("不可见状态",visibility)
        }
      }
  }
  

	//原生提供以下属性或方法的实现  
	export default {
		name: "uts-hello-container",
		
		NVLoad(): LinearLayout {
			let contentLayout = new CustomLinearLayout($androidContext!)
			contentLayout.orientation = LinearLayout.VERTICAL;
			return contentLayout
		}
		
	}
</script>

