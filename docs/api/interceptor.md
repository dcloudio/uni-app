## uni.addInterceptor(name, interceptor) @addinterceptor

添加拦截器

### addInterceptor 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.97 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| name | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 需要拦截的 API 名称 |
| interceptor | Interceptor | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 拦截器 | 





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.interceptor.addInterceptor)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/interceptor.html)

## uni.removeInterceptor(name, interceptor?) @removeinterceptor

删除拦截器

### removeInterceptor 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.97 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| name | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 需要删除拦截器的 API 名称 |
| interceptor | Interceptor | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 拦截器 | 





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.interceptor.removeInterceptor)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/interceptor.html#removeinterceptor)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/interceptor/interceptor.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/interceptor/interceptor.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/interceptor/interceptor

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/interceptor/interceptor

>示例
```vue
<template>
  <view style="flex: 1">
    <button @click="addInterceptor">添加路由拦截器</button>
    <button @click="removeInterceptor">移除路由拦截器</button>
    <text>点击下方按钮{{ msg }}</text>
    <button @click="navigateTo">navigatorTo API跳转到测试页面</button>
    <button @click="preventNavigateTo">拦截器阻止 navigatorTo 执行</button>
    <!-- #ifndef MP -->
    <navigator url="./page1">
      <button class="navigatorButton">navigator组件跳转到测试页面</button>
    </navigator>
    <!-- #endif -->
    <button @click="addSwitchTabInterceptor">添加switchTab拦截器</button>
    <button @click="removeSwitchTabInterceptor">移除switchTab拦截器</button>
    <button @click="switchTab">switchTab API</button>
  </view>
</template>

<script setup lang="uts">
  const navigateToInterceptor = {
    invoke: function (options : NavigateToOptions) {
      console.log('拦截 navigateTo 接口传入参数为：', options)
      const url = './page2'
      uni.showToast({
        title: `重定向到页面:${url}`
      })
      options.url = url
    },
    success: function (res : NavigateToSuccess) {
      console.log('拦截 navigateTo 接口 success 返回参数为：', res)
    },
    fail: function (err : NavigateToFail) {
      console.log('拦截 navigateTo 接口 fail 返回参数为：', err)
    },
    complete: function (res : NavigateToComplete) {
      console.log('拦截 navigateTo 接口 complete 返回参数为：', res)
    }
  } as AddInterceptorOptions

  const switchTabInterceptor = {
    invoke: function (options : SwitchTabOptions) {
      console.log('拦截 switchTab 接口传入参数为：', options)
      options.url = '/pages/tabBar/API'
    },
    success: function (res : SwitchTabSuccess) {
      console.log('拦截 switchTab 接口 success 返回参数为：', res)
    },
    fail: function (err : SwitchTabFail) {
      console.log('拦截 switchTab 接口 fail 返回参数为：', err)
    },
    complete: function (res : SwitchTabComplete) {
      console.log('拦截 switchTab 接口 complete 返回参数为：', res)
    }
  } as AddInterceptorOptions

  const msg = ref("会跳转到测试页面1")

  const addInterceptor = () => {
    uni.addInterceptor('navigateTo', navigateToInterceptor)
    uni.showToast({
      title: '页面跳转/切换tabbar已拦截'
    })
    msg.value = "，路由被劫持到测试页面2"
  }

  const removeInterceptor = () => {
    uni.removeInterceptor('navigateTo', navigateToInterceptor)
    uni.showToast({
      title: '拦截器已移除'
    })
    msg.value = "会跳转到测试页面1"
  }

  const addSwitchTabInterceptor = () => {
    uni.addInterceptor('switchTab', switchTabInterceptor)
  }

  const removeSwitchTabInterceptor = () => {
    uni.removeInterceptor('switchTab', switchTabInterceptor)
  }

  const navigateTo = () => {
    uni.navigateTo({
      url: './page1',
      success(res) {
        console.log('res:', res)
      },
      fail(err) {
        console.error('err:', err)
      },
      complete(res) {
        console.log('res:', res)
      }
    })
  }

   const preventNavigateTo = () => {
      const preventNavigateToInterceptor = {
        invoke: function (options : NavigateToOptions) {
            console.log('通过 return false 方式阻止 navigateTo 执行，传入参数为：', options)
            uni.showToast({
              title: '拦截器已阻止跳转'
            })
            return false
          }
      } as AddInterceptorOptions

      uni.addInterceptor('navigateTo',preventNavigateToInterceptor)
      navigateTo()
      uni.removeInterceptor('navigateTo',preventNavigateToInterceptor)
    }

  const switchTab = () => {
    uni.switchTab({
      url: '/pages/tabBar/component',
      success(res) {
        console.log('res:', res)
      },
      fail(err) {
        console.error('err:', err)
      },
      complete(res) {
        console.log('res:', res)
      }
    })
  }

  onUnload(() => {
    // 移除 navigateTo 所有拦截器
    uni.removeInterceptor('navigateTo')
    uni.removeInterceptor('switchTab')
  })

  defineExpose({
    addInterceptor,
    removeInterceptor,
    addSwitchTabInterceptor,
    removeSwitchTabInterceptor,
    navigateTo,
    switchTab,
    preventNavigateTo
  })
</script>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


## Tips@tips

* 目前仅以下接口支持拦截器：navigateTo、redirectTo、reLaunch、switchTab、navigateBack、loadFontFace、pageScrollTo、startPullDownRefresh、setNavigationBarColor、setNavigationBarTitle、setTabBarBadge、removeTabBarBadge、setTabBarItem、setTabBarStyle、hideTabBar、showTabBar、showTabBarRedDot、hideTabBarRedDot
* 如需拦截request，可在插件市场搜索[拦截器插件](https://ext.dcloud.net.cn/search?q=%E6%8B%A6%E6%88%AA%E5%99%A8&uni-appx=1)
* 小程序端拦截器无法拦截navigator组件