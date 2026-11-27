---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-file-picker-x
---

::: sourceCode
## uni-file-picker

> issues: https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-file-picker


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-file-picker-x/components/uni-file-picker

:::

文件选择上传组件，可以选择图片、视频等任意文件并上传到当前绑定的服务空间。根据 file-mediatype 自动匹配 uni.chooseImage / uni.chooseVideo / uni.chooseMedia / uni.chooseFile，App 平台默认打开系统相册。宫格和列表均基于 uni-drag-cell 支持拖拽排序

> 本 Component 是 uni ext component，需下载插件：[uni-file-picker](https://ext.dcloud.net.cn/plugin?name=uni-file-picker-x)


## uni-file-picker 文件选择上传

> **组件名：uni-file-picker**
> 代码块： `uFilePicker`

文件选择上传组件，可以选择图片、视频等任意文件并上传到云存储。

### 用途与场景

- 头像、相册等单张/多张图片选择与上传
- 视频选择与上传
- 任意类型文件的选择与上传（如附件、文档）
- 需要对接 uniCloud 云存储、回显云文件地址的场景

### 使用方式

组件内部负责：

- 根据 `file-mediatype` 自动匹配底层选择 API：`image` 使用 `uni.chooseImage`、`video` 使用 `uni.chooseVideo`、`all` 使用 `uni.chooseFile`、`mix` 使用 `uni.chooseMedia`。
- App 平台选择相册时默认使用系统相册（`album-mode` 默认 `system`），避免相册权限问题。
- 选择结果的结构化封装、本地/云文件回显、`file-extname` 后缀过滤、删除、图片预览。
- 在 `auto-upload` 为 `true` 时自动将文件上传到云存储，并抛出 `progress` / `success` / `fail` 事件。
- 宫格（`mode="grid"`）与列表（`mode="list"`）均基于 `uni-drag-cell` 支持长按拖拽排序，排序结果通过 `update:model-value` 回传。

使用方需要负责：

- 通过 `v-model` 传入与接收文件数据；`return-type` 决定数据是数组还是单个对象。
- 需要上传时，保证项目已关联 uniCloud 服务空间，可通过 `provider`、`dir` 配置上传目标。
- 当 `auto-upload` 为 `false` 时，自行调用组件暴露的 `upload()` 方法触发上传。
- 通过插槽或 `external-class` 自定义添加按钮与各区域样式。

### 基本用法

图片宫格，自动上传：

```vue
<template>
	<uni-file-picker v-model="files" title="图片" :limit="9" @success="onSuccess" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const files = ref<any[]>([])
function onSuccess(result : UTSJSONObject) {
	console.log('上传成功', result)
}
</script>
```

仅选择、不自动上传，手动触发：

```vue
<template>
	<uni-file-picker ref="picker" v-model="files" :auto-upload="false" mode="list" />
	<button @click="upload">开始上传</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const files = ref<any[]>([])
const picker = ref<any>(null)
function upload() {
	picker.value?.upload()
}
</script>
```

任意文件与后缀过滤：

```vue
<uni-file-picker v-model="files" file-mediatype="all" :file-extname="['pdf', 'docx', 'zip']" />
```

自定义区域样式：

```vue
<uni-file-picker
	v-model="files"
	title="自定义样式"
	image-class="my-image-cell"
	list-class="my-list"
	title-class="my-title"
	count-class="my-count"
	item-class="my-item"
	placeholder-class="my-add"
	del-icon-class="my-del"
	progress-class="my-progress"
	error-class="my-error"
/>
```

### 注意事项

- 组件依赖 `uni-drag-cell`（见 `package.json` 的 `dependencies`），拷贝组件时请同时拷贝该依赖。
- 宫格与列表默认长按 350ms 进入拖拽；拖拽排序为组件内置能力，无需额外配置。列表模式下“选择文件”按钮仍在列表上方，尾部不追加“+”。
- 删除方式按窗口宽度自动切换：宽度小于 700px 时使用拖拽到底部删除条删除（隐藏 `×` 按钮）；宽度大于等于 700px 时显示 `×` 按钮删除。App/手机默认走拖拽删除，Web 宽屏走 `×`。
- 拖拽到底部删除同样会触发 `delete` 事件，参数与点击 `×` 删除一致。
- `image-class` 作用于宫格内的每个方形单元格（宽度由 `column=3` 控制，默认占满单元格），可用它调整内边距、圆角、边框等，不建议再改宽度；`list-class` 作用于列表区域容器。
- `mix`（`uni.chooseMedia`）仅 App 平台支持，Web 平台不支持。
- `all`（`uni.chooseFile`）在 App 平台不支持 `extension`、`sourceType` 等部分参数，以官方 API 文档为准。
- App 平台选择系统相册时，选择界面主题与国际化跟随系统；系统相册无需申请相册权限，可直接上架 Google Play。
- 从 HBuilderX 4.61 起，`uni.chooseMedia` 返回的 `duration`、`size` 精度统一为小数点后三位。
- 选择系统相册返回的可能是 `content://` 地址，App 端如需长期使用，请上传到云存储或保存到应用沙盒。



### 兼容性 <Help />
Web: 5.07; 微信小程序: 5.07; 支付宝小程序: 5.31; Android(Vapor): 5.21; iOS(Vapor): 5.11; HarmonyOS(Vapor): 5.07


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| model-value | any\[] \| UTSJSONObject \| null | \[\] | 组件数据，支持 v-model，格式由 return-type 决定 |
| value | any\[] \| UTSJSONObject \| null | \[\] | 不使用 v-model 时传入的组件数据，格式由 return-type 决定 |
| return-type | string | "array" | 限制 value 格式，array 时返回数组，object 时只能单选且会覆盖 |
| auto-upload | boolean | true | 是否自动上传，false 时仅选择不触发上传 |
| limit | string \| number | 9 | 最大选择个数 |
| mode | string | "grid" | 选择图片后的文件列表样式，grid 宫格显示，list 列表显示 |
| file-mediatype | string | "image" | 选择文件类型，image 只选图片，video 只选视频，all 选择任意文件，mix 同时选择图片和视频（仅 App） |
| file-extname | string \| string\[\] | "() : string\[] => \[] as string\[]" | 选择文件后缀，支持数组或逗号分隔字符串 |
| title | string | "" | 组件标题，右侧显示上传计数 |
| provider | string | "" | 上传服务商 |
| dir | string | "" | 上传到云存储的目录 |
| source-type | string\[\] | "() : string\[] => \['album'] as string\[]" | 选择来源，album 从相册选择，camera 使用相机 |
| size-type | string\[\] | "() : string\[] => \['original', 'compressed'] as string\[]" | 是否压缩所选文件，original 原图 compressed 压缩图 |
| album-mode | string | "system" | 相册选择模式，custom 自定义选择器 system 系统相册 |
| camera | string | "back" | 摄像头，front 前置 back 后置 |
| max-duration | number | 10 | 拍摄视频最长时长，单位秒 |
| media-type | string\[\] | "() : string\[] => \['image', 'video'] as string\[]" | chooseMedia 的媒体类型，image 图片 video 视频 mix 混合 |
| compressed | boolean | false | 是否压缩所选视频 |
| page-orientation | string | "" | 屏幕方向，仅 Android 生效，auto 自动 portrait 竖屏 landscape 横屏 |
| image-class | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 图片宫格单元格的自定义样式类 |
| list-class | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 文件列表区域的自定义样式类 |
| title-class | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 标题的自定义样式类 |
| count-class | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 右侧计数的自定义样式类 |
| item-class | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 列表项的自定义样式类 |
| placeholder-class | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 添加或选择按钮区域的自定义样式类 |
| del-icon-class | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 删除按钮的自定义样式类 |
| progress-class | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 上传进度条的自定义样式类 |
| error-class | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 上传失败重试遮罩的自定义样式类 |
| @select | Function |   | 选择文件后触发 |
| @progress | Function |   | 文件上传时触发 |
| @success | Function |   | 上传成功触发 |
| @fail | Function |   | 上传失败触发 |
| @delete | Function |   | 文件从列表移除时触发 |
| @update:modelValue | Event |   | v-model 绑定值变化时触发 |

<!-- UTSCOMJSON.uni-file-picker.fileFormates -->



<!-- UTSCOMJSON.uni-file-picker.component_type -->






