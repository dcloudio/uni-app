### uni-stacktracey 使用说明

#### 引用方式

```js
const {
  sourcemap: { stacktracey, uniStracktraceyPreset, utsStracktraceyPreset },
} = require('${HBuilderX}/plugins/uniapp-cli-vite')
```

#### stacktracey 方法

**stacktracey 方法有两个参数：**

1. stacktrace
2. opts

##### stacktrace 参数说明

> 一个错误堆栈。String 类型

**示例**

```js
// js 错误堆栈
const uniErrorMsg = `Error: Sentry Error
at a.throwError(/static/js/pages-index-index.3ab0d0e5.js:1:567)
at click(/static/js/pages-index-index.3ab0d0e5.js:1:2745)
at ee(/static/js/chunk-vendors.75525bd5.js:34:11927)
at n(/static/js/chunk-vendors.75525bd5.js:34:13747)
at ee(/static/js/chunk-vendors.75525bd5.js:34:11927)
at HTMLElement.n(/static/js/chunk-vendors.75525bd5.js:34:13824)
at HTMLElement.o._wrapper(/static/js/chunk-vendors.75525bd5.js:34:53966)
at HTMLElement.i(/static/js/chunk-vendors.75525bd5.js:7:609894)`

// uts 错误堆栈
const utsErrorMsg = `e: DCloud-UTSPlugin/android/src/io/dcloud/uniplugin/TestModule.kt: (9, 5): Unresolved reference: logxxxxxxx

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':nativeplugins:DCloud-UTSPlugin:compileReleaseKotlin'.
> Compilation error. See log for more details

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 2s
`
```

#### opts 参数说明

> 解析生成错误栈时需要用到的一些方法。

> 此处提供了生成该参数的两种预设方案：uniStracktraceyPreset、utsStracktraceyPreset

**预设一：`uniStracktraceyPreset`**

> 解析 js 错误栈的预设方案

```js
// 调用方式
stacktracey(uniErrorMsg, {
  preset: uniStracktraceyPreset({
    base: path.resolve(__dirname, './__UNI__APPID__/1.0.0/.sourcemap/h5/'),
    sourceRoot: '',
  }),
}).then((stacktrace) => {
  // stacktrace 即为解析 sourcemap 后的错误信息
  console.log('stacktrace :>> ', stacktrace)
})
```

**预设二：`utsStracktraceyPreset`**

> 解析 uts 错误栈的预设方案

```js
// 调用方式
stacktracey(utsErrorMsg, {
  preset: utsStracktraceyPreset({
    base: path.resolve(
      __dirname,
      './nativeplugins-sourceMap/DCloud-UTSPlugin/'
    ),
    sourceRoot: 'DCloud-UTSPlugin/android/src/',
  }),
}).then((stacktrace) => {
  // stacktrace 即为解析 sourcemap 后的错误信息
  console.log('stacktrace :>> ', stacktrace)
})
```

**预设方案的参数说明**

> 需要使用 base 和 sourceRoot 从错误信息中生成 sourcemap 路径。sourceRoot 即为需要将 错误信息路径替换为 base 的部分。

1. `base`：当前项目 `sourcemap` 文件绝对路径。如果由 `http:、https:` 开头，则会发送网络请求获取
2. `sourceRoot`：当前项目资源路径

3. 详细说明

   > 由上述 stacktrace 参数说明中 `utsErrorMsg` 为例
   >
   > 错误信息为 e: DCloud-UTSPlugin/android/src/io/dcloud/uniplugin/TestModule.kt: (9, 5): Unresolved reference: logxxxxxxx

   - 第一步：根据 `sourceRoot` 解析出包含 path 的 fileName
     - 比如，`sourceRoot` 参数为：`DCloud-UTSPlugin/android/src/`
     - 解析出的 `fileName` 为：`io/dcloud/uniplugin/TestModule.kt`
   - 第二步：根据 `base + fileName` 参数拼接出 `sourcemap` 路径
     - 比如，`base` 参数为：`C:/project/test-uni/.sourcemap/`
     - 解析出的 `sourcemap` 路径为 `C:/project/test-uni/.sourcemap/io/dcloud/uniplugin/TestModule.kt.map`
