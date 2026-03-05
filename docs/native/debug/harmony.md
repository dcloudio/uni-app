# 原生联调@joint-debugging

> 本文档描述的内容适用于 HBuilderX 4.71+ 版本，针对 uni-app x 项目有效。

原生工程和其他跨平台框架的功能之间混合开发，是很麻烦的。两个项目来回修改、编译、同步到原生工程中，发现有问题，再重来。

得益于 uni-app x 编译为原生语言的能力，在鸿蒙原生工程中嵌入 [uni-app x 原生 SDK 鸿蒙版](https://doc.dcloud.net.cn/uni-app-x/native/use/harmony.html) 进行混合开发时，可以方便地联调。

这是其他跨平台工具无法提供的，但又对开发效率、问题排查极其重要，能切实提高混合开发效率。

由于 HBuilderX 支持调试 uts，且 uts 在鸿蒙上编译为 ets，所以 HBuilderX 也具备调试 ets 的能力。

把 uni-app x 项目和宿主原生应用项目都在 HBuilderX 中打开，直接以【联编调试】的方式在 HBuilderX 中对宿主应用和 uni-app x 项目进行联调，可以随时对 uni-app x 项目中的源代码做修改，并在两个项目同时进行断点调试，就像调试一个普通的 uni-app x 项目那样方便。


## 准备工作@prepare

![](https://web-ext-storage.dcloud.net.cn/hx/debug/harmony-native-debug-prepare.png)#{.zooming style="max-height:400px"}

首先，在 HBuilderX 中导入 uni-app x 项目目录和宿主应用的原生鸿蒙工程目录。

然后在 uni-app x 项目根目录中的 `.hbuilderx/launch.json` 文件中添加如下内容（如果文件不存在则手动创建）：

```json
{
  "version" : "1.0",
  "configurations": [
    {
      "type": "uni-app:app-harmony",
      "debugWithNativeHarmony": true,
      "nativeHarmonyProjectPath": "D:/native-harmony-project"
    }
  ]
}
```
其中：
- `type` 固定值为 `"uni-app:app-harmony"`。
- `debugWithNativeHarmony` 用于开启联编调试功能，缺省为 `false` 不开启。
- `nativeHarmonyProjectPath` 用于指定调试运行的时候使用的鸿蒙工程目录（即导入 HbuilderX 的那个宿主应用项目的根目录），无缺省值，如果开启了联编调试则此项必填，且指向的目录必须已存在。


## 调试开发@debugging

在 HBuilderX 中，打开 uni-app x 项目中的任何一个文件，然后通过主菜单或工具条执行【运行到鸿蒙】操作，HBuilderX 会在对 uni-app x 项目进行编译之后自动执行类似于【本地打包 App 资源】的操作，
只不过生成的 App 资源会自动组装到宿主原生应用的鸿蒙工程目录中去。

然后就可以像调试普通 uni-app x 项目一样来进行调试开发了。

**此时的调试操作不仅适用于 uni-app x 项目，也适用于宿主原生应用项目。**

### 开启/关闭调试@enable-debugger

通过【运行到鸿蒙】把 uni-app x 项目启动运行之后，可以在控制台里面点击调试按钮开启。

![](https://web-ext-storage.dcloud.net.cn/doc/tutorial/harmony/b7c69c0e-0447-41f1-b974-35eb8d076cc8.png)#{.zooming style="max-height:60px;border:1px solid silver"}

点击【开启调试】按钮的时候如果还在编译阶段，则会等到后续应用运行起来的时候进入调试状态。

如果点击时应用已经运行起来，则直接进入调试状态，此后代码运行遇到断点就会停下来，但应用启动阶段的代码断点因为已经错过了时机而不会停下来，此时要想让那些断点起作用的话可以点击旁边的【重启应用】按钮。

如果要退出调试状态，再次点击该按钮即可。

### 打断点@add-breakpoint

打开要调试的uts、uvue、ets文件，在代码行号上，鼠标右击或双击添加断点。

![](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uts-add-breakpoint.png)#{.zooming style="max-height:200px"}

### 调试视图@debug-view

开启调试后，即可在HBuilderX左侧视图，看到调试视图，具体如下：

下图中包含了uvue、uts、ets的调试步骤

![](https://web-ext-storage.dcloud.net.cn/hx/debug/harmony-debug.gif)#{.zooming style="max-width:100%"}

调试视图分为5部分:

- 调试工具栏
- 变量窗口 (`复制值`、`复制表达式`、`添加到监视`)
- 监视窗口（包含`添加`/`编辑`/`删除`表达式，以及`复制值`）
- 调用堆栈窗口
- 断点窗口（包含`删除`/`启用`/`禁用`断点）

![](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uts-debug-action.jpg)#{.zooming style="max-height:200px"}

### 跟踪调试操作@debug-actions

- 继续 `F8`
- 下一步 `F10`
- 进入 `F11`
- 返回 `Shift+F11`

### 数据检查：添加到监视@add-to-watch

在【变量窗口】，选中变量，右键菜单，即可将变量添加到监视窗口。

![](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uts-add_to_monitor.png)#{.zooming style="max-height:240px"}

### 数据检查：悬停显示@hover-preview

断点调试过程中，将鼠标悬停在要查看的变量上，即可打开悬停窗口。

![](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uts-hovering_window.jpg)#{.zooming style="max-height:250px"}


## 注意事项@notes

1. 如果修改了宿主原生应用的代码，则需要保存之后手动再次【运行到鸿蒙】（或者点击控制台工具条的【重新运行】按钮）重新开始调试运行。

2. HBuilderX 的联编调试功能不能跟 DevEco Studio 的调试功能同时运行，也不能 Attach 到 DevEco Studio 已经运行的应用实例上。

3. HBuilderX 对鸿蒙原生工程的支持有限，大段代码开发仍然应该在 DevEco Studio 中进行。

4. 宿主原生项目的路径应为原生鸿蒙工程的根目录，否则 HBuilderX 设置在 ets 文件上的断点可能不会生效。

5. 如果主应用 Ability 的 constructor 无法打断点，可以在里面加一个 setInterval 定时器来辅助调试。（此问题后续会解决。）

6. 在 uni-app x 与鸿蒙原生工程联调时，会优先ets的调试。因此，直接调试 uni-app x 项目里 uts 目前不可行(uvue可以正常调试)，但鸿蒙工程根目录下的ets文件可以正常调试。比如uni-app x 项目下uni_modules目录会被编译到鸿蒙工程根目录下，这种场景下可以直接调试鸿蒙工程/uni_modules目录中的ets文件（此问题后续会解决。）
