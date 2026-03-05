# uni实人认证

uni实人认证是DCloud与合作伙伴共同推出的金融级实人认证服务，通过对比人脸、活体检测、姓名和身份证号码，来确认用户身份的有效性。

实人认证涉及业务开通和付费，涉及客户端和服务器交互，有较多文档：
1. 业务介绍：介绍业务流程、开通和付费。[详见](https://doc.dcloud.net.cn/uniCloud/frv/intro.html)
2. 客户端API，即本文
3. 服务器API，[详见](https://doc.dcloud.net.cn/uniCloud/frv/dev.html)

uni-id-pages，已经内置实人认证，从云端到客户端均已开发好并开源，推荐使用。[详情](https://doc.dcloud.net.cn/uniCloud/uni-id/app-x.html)

## uni.getFacialRecognitionMetaInfo() @getfacialrecognitionmetainfo

获取阿里云实人认证meta info

### getFacialRecognitionMetaInfo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.84 | - | 3.9 | 4.11 | 4.61 | 5.0 |




<!-- UTSAPIJSON.getFacialRecognitionMetaInfo.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.loginVerify.facialRecognitionMetaInfo.getFacialRecognitionMetaInfo)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/plugins/facialRecognitionVerify.html#getfacialrecognitionmetainfo)

## uni.startFacialRecognitionVerify(faceStyle) @startfacialrecognitionverify

启动人脸识别

### startFacialRecognitionVerify 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - | 3.9 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| faceStyle | **StartFacialRecognitionVerifyOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### faceStyle 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| certifyId | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | certifyId 调用实人认证的id |
| progressBarColor | string | 否 | - | Web: x; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: x | 活体检测页面的进度条颜色。<br/> |
| screenOrientation | string | 否 | "port" | Web: x; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: x | 认证时屏幕方向 |
| success | (res: [StartFacialRecognitionVerifySuccess](#startfacialrecognitionverifysuccess-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 成功回调 |
| fail | (res: [IFacialRecognitionVerifyError](#ifacialrecognitionverifyerror-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 失败回调 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 完成回调 | 

##### screenOrientation 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| land | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 横屏 |
| port | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 竖屏 |

#### StartFacialRecognitionVerifySuccess 的属性值 @startfacialrecognitionverifysuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 调用API的名称 |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误的详细信息 |
| cause | **SourceError** | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误来源 |

#### cause 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| subject | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误模块名称 |
| message | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误描述信息 |
| code | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误的错误码 |
| name | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### IFacialRecognitionVerifyError 的属性值 @ifacialrecognitionverifyerror-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 10001 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | certifyId 不能为空 |
| 10002 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 当前设备不支持 |
| 10010 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 刷脸异常 |
| 10011 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 验证中断 |
| 10012 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 网络异常 |
| 10013 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 刷脸验证失败 |
| 10020 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 设备设置时间异常 |




<!-- UTSAPIJSON.startFacialRecognitionVerify.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.loginVerify.facialRecognitionMetaInfo.startFacialRecognitionVerify)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/plugins/facialRecognitionVerify.html#startfacialrecognitionverify)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/facial-recognition-meta-info/facial-recognition-meta-info.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/facial-recognition-meta-info/facial-recognition-meta-info.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/facial-recognition-meta-info/facial-recognition-meta-info

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/facial-recognition-meta-info/facial-recognition-meta-info

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="page-scroll-view">
  <!-- #endif -->
    <view>
      <page-head :title="title"></page-head>
      <view class="uni-padding-wrap uni-common-mt">
        <view class="uni-btn-v uni-common-mt">
          <input class="uni-input" type="text" v-model="realName" name="real-name" placeholder="姓名" maxlength="-1" />
        </view>
        <view class="uni-btn-v uni-common-mt">
          <input class="uni-input" type="text" v-model="idCard" name="id-card" placeholder="身份证号" maxlength="-1" />
        </view>
        <view class="uni-btn-v uni-common-mt">
          <button type="primary" @click="facialRecognition">开始人脸识别</button>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  const title = ref('实人认证')
  const realName = ref('')
  const idCard = ref('')

  const facialRecognition = () => {
    const realNameValue = realName.value.trim()
    const idCardValue = idCard.value.trim()
    if (realNameValue == '' || idCardValue == '') {
      uni.showModal({
        title: '错误',
        content: '姓名和身份证号不可为空',
        showCancel: false
      })
      return
    }
    if ('production' === process.env.NODE_ENV && '__UNI__HelloUniAppX' === uni.getAppBaseInfo().appId) {
      uni.showModal({
        title: '提示',
        content: '实人认证为收费功能，当前环境暂不支持。请在HBuilderX中新建Hello uni-app x项目真机运行体验！',
        showCancel: false
      })
      return
    }
    const testFacialCo = uniCloud.importObject('facial-recognition-co')
    let metaInfo = uni.getFacialRecognitionMetaInfo();
    testFacialCo.getCertifyId({
      realName: realNameValue,
      idCard: idCardValue,
      metaInfo
    })
      .then((res : UTSJSONObject) : Promise<string> => {
        const certifyId = res['certifyId'] as string
        return new Promise((
          resolve : (res : string) => void,
          reject : (err : Error) => void
        ) => {
          uni.startFacialRecognitionVerify({
            certifyId,
            success() {
              resolve(certifyId)
            },
            fail(err) {
              reject(new Error(err.errMsg))
            }
          })
        })
      })
      .then((certifyId : string) : Promise<UTSJSONObject> => {
        return testFacialCo.getAuthResult(certifyId)
      })
      .then((res : UTSJSONObject) => {
        console.log('res', res)
      })
      .catch((err : any | null) => {
        console.error('error', err)
      })
  }

</script>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


## Tips
* 获取手机端app是否拥有摄像头权限，请使用API [uni.getAppAuthorizeSetting](get-app-authorize-setting.md)
* 从HBuilderX 3.99起，标准基座真机运行可直接体验实人认证，涉及费用扣除开发者的费用。无需自定义基座。
* Android 实人认证支持的CPU类型为`armeabi-v7a`和`arm64-v8a`，其他CPU类型设备调用`uni.getFacialRecognitionMetaInfo()`会返回空字符串，调用`uni.startFacialRecognitionVerify()`会触发错误码为`10002`的错误回调。
