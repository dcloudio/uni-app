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
