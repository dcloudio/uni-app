::: sourceCode
## uni.createEditorContextAsync(options) @createeditorcontextasync

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-editor


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-editor

:::

创建并返回 editor 上下文 editorContext 对象

本API是 [editor组件](../component/editor.md) 的上下文对象。

### createEditorContextAsync 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | iOS(VDOM) | iOS(Vapor) | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| 5.08 | 5.08 | 5.08 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.08 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.08 |


### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **CreateEditorContextAsyncOptions** | 是 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| id | [string.IDString](/uts/data-type.md#ide-string) | 是 | Web: 5.08; 微信小程序: 5.08; Android(VDOM): 5.08; Android(Vapor): x; iOS(VDOM): 5.08; iOS(Vapor): x; HarmonyOS: 5.08 | editor 元素的 id 属性 |
| component | [ComponentPublicInstance](/vue/options-api.md#component-instance) | 否 | Web: 5.08; 微信小程序: 5.08; Android(VDOM): 5.08; Android(Vapor): x; iOS(VDOM): 5.08; iOS(Vapor): x; HarmonyOS: 5.08 | 组件或页面实例，限定在什么范围内查找id |
| success | (context: [EditorContext](#editorcontext-values)) => void | 否 | Web: 5.08; 微信小程序: 5.08; Android(VDOM): 5.08; Android(Vapor): x; iOS(VDOM): 5.08; iOS(Vapor): x; HarmonyOS: 5.08 | 接口调用成功的回调函数 |
| fail | (error: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 | Web: 5.08; 微信小程序: 5.08; Android(VDOM): 5.08; Android(Vapor): x; iOS(VDOM): 5.08; iOS(Vapor): x; HarmonyOS: 5.08 | 接口调用失败的回调函数 |
| complete | () => void | 否 | Web: 5.08; 微信小程序: 5.08; Android(VDOM): 5.08; Android(Vapor): x; iOS(VDOM): 5.08; iOS(Vapor): x; HarmonyOS: 5.08 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### EditorContext 的方法 @editorcontext-values 

#### format(name : string, value ?: string \| number \| null) : void @format
format
修改样式
##### format 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.08 | 5.08 | 5.08 | 5.08 | 5.08 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| name | string | 是 |
| value | string \| number | 否 | 



#### insertDivider(options ?: UniEditorElementOptions \| null) : void @insertdivider
insertDivider
插入分割线
##### insertDivider 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.08 | 5.08 | 5.08 | 5.08 | 5.08 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **UniEditorElementOptions** | 否 |

#### options 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 | 

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |



#### insertImage(options ?: UniEditorElementInsertImageOptions \| null) : void @insertimage
insertImage
插入图片
##### insertImage 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.08 | 5.08 | 5.08 | 5.08 | 5.08 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **UniEditorElementInsertImageOptions** | 否 |

#### options 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| src | string | 否 |
| alt | string | 否 |
| width | string | 否 |
| height | string | 否 |
| extClass | string | 否 |
| data | any | 否 |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 | 

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |



#### insertText(options ?: UniEditorElementInsertTextOptions \| null) : void @inserttext
insertText
覆盖当前选区，设置一段文本
##### insertText 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.08 | 5.08 | 5.08 | 5.08 | 5.08 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **UniEditorElementInsertTextOptions** | 否 |

#### options 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| text | string | 否 |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 | 

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |



#### insertLink(options ?: UniEditorElementInsertLinkOptions \| null) : void @insertlink
insertLink
插入链接
##### insertLink 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.08 | 5.08 | 5.08 | 5.08 | 5.08 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **UniEditorElementInsertLinkOptions** | 否 |

#### options 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| text | string | 否 |
| href | string | 是 |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 | 

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |



#### insertMention(options ?: UniEditorElementInsertMentionOptions \| null) : void @insertmention
insertMention
插入可整块删除的提及，提及文本默认为
##### insertMention 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 5.08 | 5.08 | 5.08 | 5.08 | 5.08 | 5.11 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **UniEditorElementInsertMentionOptions** | 否 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 描述 |
| :- | :- | :- | :- | :- |
| id | string | 否 |  | 被 @ 的人 id |
| name | string | 否 |  | 被 @ 的人名字 |
| color | string | 否 | #1677ff | 提及文本颜色，默认为 #1677ff |
| background | string | 否 | #e6f3ff | 提及背景颜色，默认为 #e6f3ff |
| radius | string | 否 | 4px | 提及圆角，默认为 4px |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |  |  |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |  |  |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 |  |  | 

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |



#### setContents(options ?: UniEditorElementSetContentsOptions \| null) : void @setcontents
setContents
初始化编辑器内容，html和delta同时存在时仅delta生效
##### setContents 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.08 | 5.08 | 5.08 | 5.08 | 5.08 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **UniEditorElementSetContentsOptions** | 否 |

#### options 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| delta | any | 否 |
| html | string | 否 |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 | 

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |



#### getContents(options ?: UniEditorElementGetContentsOptions \| null) : void @getcontents
getContents
获取编辑器内容
##### getContents 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.08 | 5.08 | 5.08 | 5.08 | 5.08 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **UniEditorElementGetContentsOptions** | 否 |

#### options 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementGetContentsOptionsRes](#unieditorelementgetcontentsoptionsres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 | 

###### UniEditorElementGetContentsOptionsRes 的属性值 @unieditorelementgetcontentsoptionsres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |
| delta | any | 是 |
| html | string | 是 |
| text | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |



#### clear(options ?: UniEditorElementOptions \| null) : void @clear
clear
清空编辑器内容
##### clear 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.08 | 5.08 | 5.08 | 5.08 | 5.08 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **UniEditorElementOptions** | 否 |

#### options 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 | 

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |



#### removeFormat(options ?: UniEditorElementOptions \| null) : void @removeformat
removeFormat
清除当前选区的样式
##### removeFormat 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.08 | 5.08 | 5.08 | 5.08 | 5.08 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **UniEditorElementOptions** | 否 |

#### options 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 | 

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |



#### undo(options ?: UniEditorElementOptions \| null) : void @undo
undo
撤销
##### undo 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.08 | 5.08 | 5.08 | 5.08 | 5.08 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **UniEditorElementOptions** | 否 |

#### options 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 | 

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |



#### redo(options ?: UniEditorElementOptions \| null) : void @redo
redo
恢复
##### redo 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.08 | 5.08 | 5.08 | 5.08 | 5.08 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **UniEditorElementOptions** | 否 |

#### options 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 | 

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |



#### getSelectionText(options ?: UniEditorElementGetSelectionTextOptions \| null) : void @getselectiontext
getSelectionText
获取编辑器已选区域内的纯文本内容。当编辑器失焦或未选中一段区间时，返回内容为空。
##### getSelectionText 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.08 | 5.08 | 5.08 | 5.08 | 5.08 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **UniEditorElementGetSelectionTextOptions** | 否 |

#### options 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementGetSelectionTextOptionsRes](#unieditorelementgetselectiontextoptionsres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 | 

###### UniEditorElementGetSelectionTextOptionsRes 的属性值 @unieditorelementgetselectiontextoptionsres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |
| text | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |



#### scrollIntoView(options ?: UniEditorElementOptions \| null) : void @scrollintoview
scrollIntoView
使得编辑器光标处滚动到窗口可视区域内。
##### scrollIntoView 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.08 | 5.08 | 5.08 | 5.08 | 5.08 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **UniEditorElementOptions** | 否 |

#### options 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 | 

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |



#### blur(options ?: UniEditorElementOptions \| null) : void @blur
blur
编辑器失焦，同时收起键盘
##### blur 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.08 | 5.08 | 5.08 | 5.08 | 5.08 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **UniEditorElementOptions** | 否 |

#### options 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 | 

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |



##### UniEditorElementOptions 的属性值 @unieditorelementoptions-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 |

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

##### UniEditorElementInsertImageOptions 的属性值 @unieditorelementinsertimageoptions-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| src | string | 否 |
| alt | string | 否 |
| width | string | 否 |
| height | string | 否 |
| extClass | string | 否 |
| data | any | 否 |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 |

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

##### UniEditorElementInsertTextOptions 的属性值 @unieditorelementinserttextoptions-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| text | string | 否 |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 |

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

##### UniEditorElementInsertLinkOptions 的属性值 @unieditorelementinsertlinkoptions-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| text | string | 否 |
| href | string | 是 |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 |

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

##### UniEditorElementInsertMentionOptions 的属性值 @unieditorelementinsertmentionoptions-values 

| 名称 | 类型 | 必备 | 默认值 | 描述 |
| :- | :- | :- | :- | :- |
| id | string | 否 |  | 被 @ 的人 id |
| name | string | 否 |  | 被 @ 的人名字 |
| color | string | 否 | #1677ff | 提及文本颜色，默认为 #1677ff |
| background | string | 否 | #e6f3ff | 提及背景颜色，默认为 #e6f3ff |
| radius | string | 否 | 4px | 提及圆角，默认为 4px |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |  |  |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |  |  |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 |  |  |

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

##### UniEditorElementSetContentsOptions 的属性值 @unieditorelementsetcontentsoptions-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| delta | any | 否 |
| html | string | 否 |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 |

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

##### UniEditorElementGetContentsOptions 的属性值 @unieditorelementgetcontentsoptions-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementGetContentsOptionsRes](#unieditorelementgetcontentsoptionsres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 |

###### UniEditorElementGetContentsOptionsRes 的属性值 @unieditorelementgetcontentsoptionsres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |
| delta | any | 是 |
| html | string | 是 |
| text | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

##### UniEditorElementOptions 的属性值 @unieditorelementoptions-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 |

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

##### UniEditorElementOptions 的属性值 @unieditorelementoptions-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 |

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

##### UniEditorElementOptions 的属性值 @unieditorelementoptions-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 |

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

##### UniEditorElementOptions 的属性值 @unieditorelementoptions-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 |

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

##### UniEditorElementGetSelectionTextOptions 的属性值 @unieditorelementgetselectiontextoptions-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementGetSelectionTextOptionsRes](#unieditorelementgetselectiontextoptionsres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 |

###### UniEditorElementGetSelectionTextOptionsRes 的属性值 @unieditorelementgetselectiontextoptionsres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |
| text | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

##### UniEditorElementOptions 的属性值 @unieditorelementoptions-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 |

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

##### UniEditorElementOptions 的属性值 @unieditorelementoptions-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| success | (res: [UniEditorElementOptionsSuccessRes](#unieditorelementoptionssuccessres-values)) => void | 否 |
| fail | (res: [UniEditorElementOptionsFailRes](#unieditorelementoptionsfailres-values)) => void | 否 |
| complete | (res: [UniEditorElementOptionsCompleteRes](#unieditorelementoptionscompleteres-values)) => void | 否 |

###### UniEditorElementOptionsSuccessRes 的属性值 @unieditorelementoptionssuccessres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsFailRes 的属性值 @unieditorelementoptionsfailres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

###### UniEditorElementOptionsCompleteRes 的属性值 @unieditorelementoptionscompleteres-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |






<!-- UTSAPIJSON.createEditorContextAsync.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.component.createEditorContextAsync)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=createEditorContextAsync&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=createEditorContextAsync&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=createEditorContextAsync&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=createEditorContextAsync&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=createEditorContextAsync&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=createEditorContextAsync)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=createEditorContextAsync&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- UTSAPIJSON.createEditorContextAsync.example -->

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | 微信小程序: 4.41 | 错误信息 |
