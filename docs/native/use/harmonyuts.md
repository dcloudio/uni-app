# 导出UTS插件
> 1. 插件市场的加密uts插件如果没有获得源码授权，则无法在原生工程接入。
> 2. 如果导出的资源文件不包含 `uni_modules` ，或 `uni_modules` 中的插件均不包含 `app-harmony` 目录可以跳过此章节

鸿蒙上uts插件是单独导出为ets的。

## 集成uts插件编译产物

如下文档使用`/resource`指代鸿蒙资源输出目录

1. 将 uni_modules 入口文件移动到`/entry/src/main/ets/uni_modules/index.generated.ets`, 如果目录不存在则需要手动创建

移动`/resource/uni_modules/index.generated.ets`文件到鸿蒙项目`/entry/src/main/ets/uni_modules/index.generated.ets`

并在鸿蒙项目的`entry/src/main/ets/entryability/EntryAbility.ets`文件中添加如下代码。

```ts
import { initUniModules } from '../uni_modules/index.generated'
initUniModules()
```

![](https://web-ext-storage.dcloud.net.cn/uni-app/harmony/dev/20240904152004.jpg)

2. 将 uts api 对应的 uni_modules 文件部署到鸿蒙工程内

移动`/resource/uni_modules`目录下的 uts api 模块目录到鸿蒙项目`/uni_modules`目录

![](https://web-ext-storage.dcloud.net.cn/uni-app/harmony/dev/20240914143945.jpg)

编译到鸿蒙时每个 uts api 的 uni_module 都会创建一个鸿蒙的静态库。对于静态库有两个概念需要区分一下。

- 静态库的 module 名称（如下称为 moduleName），每个静态库的名称，只允许大小写字母加下划线组成
- 静态库的包名（如下称为 packageName），静态库被 import 时的名称，类似 npm 包名。不允许使用大写字母

对于一个名称为 uni-getBatteryInfo 的 uni_module，它的 moduleName 为`uni_modules__uni_getbatteryinfo`，packageName 为`@uni_modules/uni-getbatteryinfo`。

packageName 规则较为简单，给 uni_module 名称前加上`@uni_modules`前缀然后转为全小写。

moduleName 是在 packageName 的基础上生成的，移除@符号，将/替换为两个下划线，将-替换为一个下划线

3. 修改鸿蒙项目`oh-package.json5`

为所有本地 uts api 的 uni_module 及其他三方依赖注册 packageName。uni-app 编译器会自动在`/resource/uni_modules`目录下生成`oh-package.json5`文件，该文件包含了所有依赖的信息，可以直接将此文件合并到鸿蒙项目的`oh-package.json5`文件内。

以 uni-getBatteryInfo 为例，在`oh-package.json5`文件内`dependencies`字段下添加如下内容

```json
"@uni_modules/uni-getbatteryinfo": "./uni_modules/uni-getbatteryinfo"
```

4. 修改鸿蒙项目`build-profile.json5`

为所有本地 uts api 的 uni_module 注册 moduleName。uni-app 编译器会自动在`/resource/uni_modules`目录下生成`build-profile.json5`文件，该文件包含了所有模块的信息，可以直接将此文件合并到鸿蒙项目的`build-profile.json5`文件内。

以 uni-getBatteryInfo 为例，在`build-profile.json5`文件内`modules`数组内添加如下内容

```json
{
  "name": "uni_modules__uni_getbatteryinfo",
  "srcPath": "./uni_modules/uni-getBatteryInfo"
}
```
