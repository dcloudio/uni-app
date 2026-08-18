## uni.getPerformance

返回一个Performance对象实例


### getPerformance 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 3.91 | 4.25 | 4.61 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |




### 返回值 

| 类型 |
| :- |
| [Performance](#performance-values) |

#### Performance 的方法 @performance-values 

#### createObserver(callback: PerformanceObserverCallback): PerformanceObserver @createobserver
createObserver
创建全局性能事件监听器
##### createObserver 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | 4.41 | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (entries: [PerformanceObserverEntryList](#performanceobserverentrylist-values)) => void | 是 | Web: x; 支付宝小程序: x | 

##### PerformanceObserverEntryList 的方法 @performanceobserverentrylist-values 

##### getEntries(): PerformanceEntry\[\] @getentries
getEntries
该方法返回当前列表中的所有性能数据
###### getEntries 兼容性 <Help /> 
| Web | 支付宝小程序 |
| :- | :- |
| x | x |



###### 返回值 

| 类型 | 描述 |
| :- | :- |
| Array&lt;string&gt; | 图像像素点数据，一维数组，每四项表示一个像素点的rgba |
 

##### getEntriesByType(entryType: string): PerformanceEntry\[\] @getentriesbytype
getEntriesByType
获取当前列表中所有类型为 \[entryType] 的性能数据
###### getEntriesByType 兼容性 <Help /> 
| Web | 支付宝小程序 |
| :- | :- |
| x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| entryType | string | 是 | Web: x; 支付宝小程序: x | 


###### 返回值 

| 类型 | 描述 |
| :- | :- |
| Array&lt;string&gt; | 图像像素点数据，一维数组，每四项表示一个像素点的rgba |
 

##### getEntriesByName(name: string, entryType: string): PerformanceEntry\[\] @getentriesbyname
getEntriesByName
获取当前列表中所有名称为 \[name] 且类型为 \[entryType] 的性能数据
###### getEntriesByName 兼容性 <Help /> 
| Web | 支付宝小程序 |
| :- | :- |
| x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| name | string | 是 | Web: x; 支付宝小程序: x |
| entryType | string | 是 | Web: x; 支付宝小程序: x | 


###### 返回值 

| 类型 | 描述 |
| :- | :- |
| Array&lt;string&gt; | 图像像素点数据，一维数组，每四项表示一个像素点的rgba |
 


##### 返回值 

| 类型 |
| :- |
| [PerformanceObserver](#performanceobserver-values) |

###### PerformanceObserver 的方法 @performanceobserver-values 

###### observe(options: PerformanceObserverOptions): void @observe
observe
开始监听
###### observe 兼容性 <Help /> 
| Web | 支付宝小程序 |
| :- | :- |
| x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **PerformanceObserverOptions** | 是 | Web: x; 支付宝小程序: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| buffered | boolean | 否 | Web: x; 支付宝小程序: x |
| type | string | 否 | Web: x; 支付宝小程序: x | 



###### disconnect(): void @disconnect
disconnect
停止监听
###### disconnect 兼容性 <Help /> 
| Web | 支付宝小程序 |
| :- | :- |
| x | x |




###### PerformanceObserverOptions 的属性值 @performanceobserveroptions-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| buffered | boolean | 否 | Web: x; 支付宝小程序: x |
| type | string | 否 | Web: x; 支付宝小程序: x |
 

#### getEntries(): PerformanceEntry\[\] @getentries
getEntries
该方法返回当前缓冲区中的所有性能数据
##### getEntries 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | 4.41 | x |



##### 返回值 

| 类型 | 描述 |
| :- | :- |
| Array&lt;string&gt; | 图像像素点数据，一维数组，每四项表示一个像素点的rgba |
 

#### getEntriesByType(entryType: string): PerformanceEntry\[\] @getentriesbytype
getEntriesByType
获取当前缓冲区中所有类型为 \[entryType] 的性能数据
##### getEntriesByType 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | 4.41 | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| entryType | string | 是 | Web: x; 支付宝小程序: x | 


##### 返回值 

| 类型 | 描述 |
| :- | :- |
| Array&lt;string&gt; | 图像像素点数据，一维数组，每四项表示一个像素点的rgba |
 

#### getEntriesByName(name: string, entryType: string): PerformanceEntry\[\] @getentriesbyname
getEntriesByName
获取当前缓冲区中所有名称为 \[name] 且类型为 \[entryType] 的性能数据
##### getEntriesByName 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | 4.41 | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| name | string | 是 | Web: x; 支付宝小程序: x |
| entryType | string | 是 | Web: x; 支付宝小程序: x | 


##### 返回值 

| 类型 | 描述 |
| :- | :- |
| Array&lt;string&gt; | 图像像素点数据，一维数组，每四项表示一个像素点的rgba |
 

#### setBufferSize(size: number): void @setbuffersize
setBufferSize
设置缓冲区大小，默认缓冲 30 条性能数据
##### setBufferSize 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | 4.41 | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| size | number | 是 | Web: x; 支付宝小程序: x | 



##### PerformanceObserverEntryList 的方法 @performanceobserverentrylist-values 

##### getEntries(): PerformanceEntry\[\] @getentries
getEntries
该方法返回当前列表中的所有性能数据
###### getEntries 兼容性 <Help /> 
| Web | 支付宝小程序 |
| :- | :- |
| x | x |



###### 返回值 

| 类型 | 描述 |
| :- | :- |
| Array&lt;string&gt; | 图像像素点数据，一维数组，每四项表示一个像素点的rgba |
 

##### getEntriesByType(entryType: string): PerformanceEntry\[\] @getentriesbytype
getEntriesByType
获取当前列表中所有类型为 \[entryType] 的性能数据
###### getEntriesByType 兼容性 <Help /> 
| Web | 支付宝小程序 |
| :- | :- |
| x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| entryType | string | 是 | Web: x; 支付宝小程序: x | 


###### 返回值 

| 类型 | 描述 |
| :- | :- |
| Array&lt;string&gt; | 图像像素点数据，一维数组，每四项表示一个像素点的rgba |
 

##### getEntriesByName(name: string, entryType: string): PerformanceEntry\[\] @getentriesbyname
getEntriesByName
获取当前列表中所有名称为 \[name] 且类型为 \[entryType] 的性能数据
###### getEntriesByName 兼容性 <Help /> 
| Web | 支付宝小程序 |
| :- | :- |
| x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| name | string | 是 | Web: x; 支付宝小程序: x |
| entryType | string | 是 | Web: x; 支付宝小程序: x | 


###### 返回值 

| 类型 | 描述 |
| :- | :- |
| Array&lt;string&gt; | 图像像素点数据，一维数组，每四项表示一个像素点的rgba |
 

##### PerformanceObserver 的方法 @performanceobserver-values 

##### observe(options: PerformanceObserverOptions): void @observe
observe
开始监听
###### observe 兼容性 <Help /> 
| Web | 支付宝小程序 |
| :- | :- |
| x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **PerformanceObserverOptions** | 是 | Web: x; 支付宝小程序: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| buffered | boolean | 否 | Web: x; 支付宝小程序: x |
| type | string | 否 | Web: x; 支付宝小程序: x | 



##### disconnect(): void @disconnect
disconnect
停止监听
###### disconnect 兼容性 <Help /> 
| Web | 支付宝小程序 |
| :- | :- |
| x | x |




###### PerformanceObserverOptions 的属性值 @performanceobserveroptions-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| buffered | boolean | 否 | Web: x; 支付宝小程序: x |
| type | string | 否 | Web: x; 支付宝小程序: x |
 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.get-performance)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/performance/Performance.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getPerformance&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getPerformance&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getPerformance&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getPerformance&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getPerformance)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getPerformance&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- UTSAPIJSON.getPerformance.example -->

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | 微信小程序: 4.41; 支付宝小程序: x | 错误信息 |

