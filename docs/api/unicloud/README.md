## 概述

uniCloud是基于serverless的云开发服务，它大幅降低开发者的开发成本和运维成本。业务介绍[详见](https://doc.dcloud.net.cn/uniCloud/)

截止到目前，uni-app x下的uniCloud还不支持：

- 暂不支持schema2code
- uts插件编译为swift、arkts时插件内不可调用uniCloud

**兼容说明**

- `HBuilderX 3.9+` 支持阿里云，`3.91+`支持腾讯云，`3.98+`支持支付宝小程序云
- `HBuilderX 3.91+` 支持clientDB
- `HBuilderX 3.99+` 支持pages.json中的uniIdRouter
- `HBuilderX 4.71+` 支持安全网络





### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| config | **UniCloudInitOptions** | 是 |   |  |
| mixinDatacom | any | 是 |   |  |
| datacomProps | **DatacomPropsType** | 是 | Android(VDOM): x; Android(Vapor): 5.32; iOS(VDOM): x; iOS(Vapor): 5.32; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.32 | datacom 属性定义，供页面/组件 defineProps 展开使用 |
| SSEChannel | [SSEChannel](#ssechannel-values) | 是 | Web: 4.71; 微信小程序: 4.71; Android: 4.71; iOS: 4.71; HarmonyOS: 4.71 | 服务端通知通道 | 

#### config 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| provider | string | 是 | 服务商，目前支持 aliyun、tencent、alipay |
| spaceName | string | 否 | 服务空间名 |
| spaceId | string | 是 | 服务空间id |
| clientSecret | string | 否 | 阿里云clientSecret |
| endpoint | string | 否 | 阿里云endpoint |
| spaceAppId | string | 否 | 支付宝云spaceAppId |
| accessKey | string | 否 | 支付宝云accessKey |
| secretKey | string | 否 | 支付宝云secretKey |
| wsEndpoint | string | 否 | 支付宝云 WebSocket Endpoint |

#### datacomProps 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| localdata | \[{ type: PropType\<UTSJSONObject\[]>; default: () => UTSJSONObject\[]; }](#type-values) | 是 |
| options | \[{ type: PropType\<any\[] \| UTSJSONObject>; default: () => UTSJSONObject; }](#type-values) | 是 |
| collection | [{ type: PropType\<string>; default: string; }](#type-values) | 是 |
| action | [{ type: PropType\<string>; default: string; }](#type-values) | 是 |
| field | [{ type: PropType\<string>; default: string; }](#type-values) | 是 |
| orderby | [{ type: PropType\<string>; default: string; }](#type-values) | 是 |
| where | [{ type: PropType\<string \| UTSJSONObject>; default: string; }](#type-values) | 是 |
| pageData | [{ type: PropType\<string>; default: string; }](#type-values) | 是 |
| pageCurrent | [{ type: PropType\<number>; default: number; }](#type-values) | 是 |
| pageSize | [{ type: PropType\<number>; default: number; }](#type-values) | 是 |
| getcount | [{ type: PropType\<string \| boolean>; default: boolean; }](#type-values) | 是 |
| gettree | [{ type: PropType\<string \| boolean>; default: boolean; }](#type-values) | 是 |
| gettreepath | [{ type: PropType\<string \| boolean>; default: boolean; }](#type-values) | 是 |
| startwith | [{ type: PropType\<string>; default: string; }](#type-values) | 是 |
| limitlevel | [{ type: PropType\<number>; default: number; }](#type-values) | 是 |
| groupby | [{ type: PropType\<string>; default: string; }](#type-values) | 是 |
| groupField | [{ type: PropType\<string>; default: string; }](#type-values) | 是 |
| distinct | [{ type: PropType\<string \| boolean>; default: boolean; }](#type-values) | 是 |
| manual | [{ type: PropType\<boolean>; default: boolean; }](#type-values) | 是 |

##### localdata 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<UTSJSONObject\[]> | 是 |

##### options 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<any\[] \| UTSJSONObject> | 是 |

##### collection 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<string> | 是 |
| default | string | 是 |

##### action 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<string> | 是 |
| default | string | 是 |

##### field 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<string> | 是 |
| default | string | 是 |

##### orderby 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<string> | 是 |
| default | string | 是 |

##### where 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<string \| UTSJSONObject> | 是 |
| default | string | 是 |

##### pageData 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<string> | 是 |
| default | string | 是 |

##### pageCurrent 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<number> | 是 |
| default | number | 是 |

##### pageSize 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<number> | 是 |
| default | number | 是 |

##### getcount 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<string \| boolean> | 是 |
| default | boolean | 是 |

##### gettree 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<string \| boolean> | 是 |
| default | boolean | 是 |

##### gettreepath 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<string \| boolean> | 是 |
| default | boolean | 是 |

##### startwith 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<string> | 是 |
| default | string | 是 |

##### limitlevel 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<number> | 是 |
| default | number | 是 |

##### groupby 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<string> | 是 |
| default | string | 是 |

##### groupField 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<string> | 是 |
| default | string | 是 |

##### distinct 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<string \| boolean> | 是 |
| default | boolean | 是 |

##### manual 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| type | PropType\<boolean> | 是 |
| default | boolean | 是 |

#### { type: PropType\<UTSJSONObject\[]>; default: () => UTSJSONObject\[]; } 的方法 @type-values 

#### default: () => Array\<UTSJSONObject> @default
default




##### 返回值 

| 类型 |
| :- |
| Array&lt;[UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)&gt; |
 

#### { type: PropType\<any\[] \| UTSJSONObject>; default: () => UTSJSONObject; } 的方法 @type-values 

#### default: () => UTSJSONObject @default
default




##### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 

### SSEChannel 的方法 @ssechannel-values 

### open(): Promise\<void>; @open
open
开启通道，注意只有开启之后才能把SSEChannel实例传入云函数



#### 返回值 

| 类型 |
| :- |
| Promise\<void> |
 

### toJSON(): {    appId: string;    pushClientId: string;    seqId: string;  }; @tojson
toJSON




#### 返回值 

| 类型 |
| :- |
| [{ appId: string; pushClientId: string; seqId: string; }](#appid-values) |

#### { appId: string; pushClientId: string; seqId: string; } 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| appId | string | 是 |
| pushClientId | string | 是 |
| seqId | string | 是 | 

### close(): void; @close
close
关闭通道




### on(event: 'message', callback: (message: string) => void): void; @on
on
监听消息接收事件

#### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| event | string | 是 |
| callback | (message: string) => void | 是 | 



### off(event: 'message', callback: (message: string) => void): void; @off
off
取消监听消息接收事件

#### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| event | string | 是 |
| callback | (message: string) => void | 是 | 







