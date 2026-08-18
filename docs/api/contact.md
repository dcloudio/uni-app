::: sourceCode
## uni.addPhoneContact(options) @addphonecontact

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-addPhoneContact


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-addPhoneContact

:::

添加手机通讯录联系人。用户可以选择将该表单以「新增联系人」或「添加到已有联系人」的方式，写入手机系统通讯录。

### addPhoneContact 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.08 | 5.08 | 4.61 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **AddPhoneContactOptions** | 是 | Web: x; 支付宝小程序: x | 添加手机通讯录联系人的参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| photoFilePath | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 头像本地文件路径 |
| nickName | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 昵称 |
| lastName | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 姓氏 |
| middleName | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 中间名 |
| firstName | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 名字 |
| remark | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 备注 |
| mobilePhoneNumber | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 手机号 |
| weChatNumber | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 即时消息账号 |
| addressCountry | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 联系地址国家 |
| addressState | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 联系地址省份 |
| addressCity | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 联系地址城市 |
| addressStreet | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 联系地址街道 |
| addressPostalCode | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 联系地址邮政编码 |
| organization | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 公司 |
| title | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 职位 |
| workFaxNumber | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 工作传真 |
| workPhoneNumber | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 工作电话 |
| hostNumber | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 公司电话 |
| email | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 电子邮件 |
| url | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 网站 |
| workAddressCountry | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 工作地址国家 |
| workAddressState | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 工作地址省份 |
| workAddressCity | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 工作地址城市 |
| workAddressStreet | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 工作地址街道 |
| workAddressPostalCode | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 工作地址邮政编码 |
| homeFaxNumber | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 住宅传真 |
| homePhoneNumber | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 住宅电话 |
| homeAddressCountry | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 住宅地址国家 |
| homeAddressState | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 住宅地址省份 |
| homeAddressCity | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 住宅地址城市 |
| homeAddressStreet | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 住宅地址街道 |
| homeAddressPostalCode | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 住宅地址邮政编码 |
| success | (result: AddPhoneContactSuccess) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 接口调用成功的回调函数 |
| fail | (result: [AddPhoneContactFail](#addphonecontactfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 接口调用失败的回调函数 |
| complete | (result: AddPhoneContactSuccess \| [AddPhoneContactFail](#addphonecontactfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### AddPhoneContactFail 的属性值 @addphonecontactfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 支付宝小程序: x |  |
| errSubject | string | 是 | Web: x; 支付宝小程序: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 支付宝小程序: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 支付宝小程序: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| 601 | Web: x; 支付宝小程序: x |
| 602 | Web: x; 支付宝小程序: x |
| 603 | Web: x; 支付宝小程序: x |

#### AddPhoneContactFail 的属性值 @addphonecontactfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 支付宝小程序: x |  |
| errSubject | string | 是 | Web: x; 支付宝小程序: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 支付宝小程序: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 支付宝小程序: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| 601 | Web: x; 支付宝小程序: x |
| 602 | Web: x; 支付宝小程序: x |
| 603 | Web: x; 支付宝小程序: x |






<!-- UTSAPIJSON.addPhoneContact.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.contact.addPhoneContact)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/contact.html#addphonecontact)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/contact/wx.addPhoneContact.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=addPhoneContact&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=addPhoneContact&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=addPhoneContact&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=addPhoneContact&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=addPhoneContact)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=addPhoneContact&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

::: sourceCode
## uni.chooseContact(options) @choosecontact
:::

拉起手机通讯录，选择联系人

### chooseContact 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.08 | 5.08 | 4.61 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **ChooseContactOptions** | 是 | Web: x; 支付宝小程序: x | 拉起手机通讯录的参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (result: [ChooseContactSuccess](#choosecontactsuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 接口调用成功的回调函数 |
| fail | (result: [ChooseContactFail](#choosecontactfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 接口调用失败的回调函数 |
| complete | (result: [ChooseContactSuccess](#choosecontactsuccess-values) \| [ChooseContactFail](#choosecontactfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### ChooseContactSuccess 的属性值 @choosecontactsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| displayName | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 联系人姓名 |
| phoneNumber | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 当前选中的手机号 |
| phoneNumberList | Array&lt;string&gt; | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 联系人的所有手机号 |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 接口调用结果 |

#### ChooseContactFail 的属性值 @choosecontactfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 支付宝小程序: x |  |
| errSubject | string | 是 | Web: x; 支付宝小程序: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 支付宝小程序: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 支付宝小程序: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| 601 | Web: x; 支付宝小程序: x |
| 602 | Web: x; 支付宝小程序: x |
| 603 | Web: x; 支付宝小程序: x |

#### ChooseContactSuccess 的属性值 @choosecontactsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| displayName | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 联系人姓名 |
| phoneNumber | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 当前选中的手机号 |
| phoneNumberList | Array&lt;string&gt; | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 联系人的所有手机号 |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x | 接口调用结果 |

#### ChooseContactFail 的属性值 @choosecontactfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 支付宝小程序: x |  |
| errSubject | string | 是 | Web: x; 支付宝小程序: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 支付宝小程序: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 支付宝小程序: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| 601 | Web: x; 支付宝小程序: x |
| 602 | Web: x; 支付宝小程序: x |
| 603 | Web: x; 支付宝小程序: x |






<!-- UTSAPIJSON.chooseContact.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.contact.chooseContact)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/contact/wx.chooseContact.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=chooseContact&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=chooseContact&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=chooseContact&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=chooseContact&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=chooseContact)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=chooseContact&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- UTSAPIJSON.contact.example -->

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | 微信小程序: 4.41; 支付宝小程序: x | 错误信息 |
