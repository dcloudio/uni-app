## 概述

uniCloud是基于serverless的云开发服务，它大幅降低开发者的开发成本和运维成本。业务介绍[详见](https://doc.dcloud.net.cn/uniCloud/)

截止到目前，uni-app x下的uniCloud还不支持：

- 暂不支持schema2code
- 暂不支持安全网络
- uts插件编译为swift、arkts时插件内不可调用uniCloud

**兼容说明**

- `HBuilderX 3.9+`支持阿里云，`3.91+`支持腾讯云，`3.98+`支持支付宝小程序云
- `HBuilderX 3.91+`支持clientDB
- `HBuilderX 3.99+` 支持pages.json中的uniIdRouter





### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| config | **UniCloudInitOptions** | 是 | - | - | - |
| mixinDatacom | any | 是 | - | - | - |
| SSEChannel | any | 是 | - | Web: 4.71; 微信小程序: 4.71; Android: 4.71; iOS: 4.71; HarmonyOS: 4.71; HarmonyOS(Vapor): - | 服务端通知通道 | 

#### config 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| provider | string | 是 | - | - | 服务商，目前支持 aliyun、tencent、alipay |
| spaceName | string | 否 | - | - | 服务空间名 |
| spaceId | string | 是 | - | - | 服务空间id |
| clientSecret | string | 否 | - | - | 阿里云clientSecret |
| endpoint | string | 否 | - | - | 阿里云endpoint |
| spaceAppId | string | 否 | - | - | 支付宝云spaceAppId |
| accessKey | string | 否 | - | - | 支付宝云accessKey |
| secretKey | string | 否 | - | - | 支付宝云secretKey |
| wsEndpoint | string | 否 | - | - | 支付宝云 WebSocket Endpoint |





