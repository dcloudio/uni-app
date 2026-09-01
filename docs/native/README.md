## 简介
`uni-app x 原生SDK`是为iOS/Android/harmonyOS原生工程师提供的开发工具包，用于混合开发。

蒸汽（Vapor）模式的SDK需HBuilderX 5.25+

使用 `uni-app x 原生SDK`，原生开发者可以：
1. 渐进式的使用，把某些页面使用 uni-app x 来开发，嵌入之前的原生工程中
2. 使用自己的原生工程集成环境来打包和发版

原生工程师可以在自己的原生项目中引入`uni-app x 原生SDK`，该SDK分iOS/Android/harmonyOS不同版本，进而把uni-app x开发的页面编译进入原生工程中，整体联调运行。

由于uts编译为了原生语言，所以原生工程和 uni-app x 工程可以良好的互操作，甚至可以整体断点Debug。

`uni-app x 原生SDK`在某种程度上类似于react native/weex/flutter的SDK，但有如下特点：

1. uni-app x 不仅仅是一个渲染view

其他几个跨平台框架主要是渲染引擎，提供了一个view给原生开发者使用。

而 uni-app x 提供了一个完整的应用，有页面管理、众多组件和API。

所以在原生应用中集成`uni-app x 原生SDK`，更像是集成一个小程序SDK。

当然 uni-app x 的性能足够好，它不会像小程序那样启动缓慢，也比其他跨平台框架的性能和原生UI兼容性更好（评测[另见](../app-vapor.md)）

uni-app x 内置丰富的跨平台API，可以切实提高整体开发效率。

如果仅UI跨平台，但大量API开发仍然需要各自平台为跨平台UI框架提供接口，那会造成4个人一起干活（1个人写前端页面，3个人在各自的原生平台写接口API）。

而 uni-app x 丰富的内置组件和API，以及插件市场丰富的跨平台插件，可以保证大多数业务开发仅需1人写 uni-app x 代码即可。

2. uni-app x和原生工程可以无缝融合

rn/flutter等，运行语言与原生语言是不同的语言。互相交互需要搭桥。

flutter的自渲染引擎，和原生渲染引擎也无法无缝融合。

而 uni-app x 的uts代码，编译产物就是原生语言，所以可以无缝的互操作。

互相调用时，相当于同一个语言不同函数的调用，而不是不同语言的桥接通信。

基于这个特点，uni-app x 还提供了原生混编联调。

把原生工程和 uni-app x 工程一起拖入HBuilderX中，整体联编为一个原生工程，让 uts 和 arkTS 混编，甚至断点联调。

<!-- 比如现在uts代码下一个断点，然后调用到了原生工程的kt代码，再下一个断点，可以单步跟踪，给混合开发带来前所未有的方便体验。 -->

## 关系

这里有3个概念：
1. 原生工程：开发者的既存原生工程
2. uni-app x 原生SDK：需在 uni-app x 官方下载的SDK，分Android版、iOS版、harmonyOS版
3. uni-app x 应用原生资源：开发者在HBuilderX中新建的 uni-app x 项目，通过发行菜单或HBuilderX的cli导出的应用原生资源

使用流程一般是：
1. 开发者在HBuilderX新建 uni-app x 项目，进行开发
2. 在HBuilderX中导出应用原生资源，生成一批kt/swift/ets/js代码及相关图片字体等附件资源
3. 开发者在原生工程中引入`uni-app x 原生SDK`，合并入导出的应用原生资源，整体运行编译

+ [集成Android平台原生SDK](./use/android.md)
+ [集成iOS平台原生SDK](./use/ios.md)
+ [集成harmonyOS平台原生SDK](./use/harmony.md)

## 包体积增加说明
集成 uni-app x 原生SDK 到原生工程中，
- 蒸汽模式：iOS和鸿蒙的包体积增加数M。Android平台因为带了V8，包体积每个CPU增加十几M。如在manifest里选择不压缩so库，Android的包体积会增加4、50M。
- VDOM模式，安装包体积增加数M。
