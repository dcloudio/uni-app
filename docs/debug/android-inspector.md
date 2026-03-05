## Android审查界面元素

HBuilderX暂时不支持 uni-app x 项目 uvue 页面的元素审查。相关需求可以利用 Android Studio 自带的 Layout Inpector 工具查看元素布局。

![LayoutInspector效果](https://native-res.dcloud.net.cn/images/uni-app-x/android/inspector/inspector-sample.jpg)

**准备环境**  
- 安装 Android Studio，可到[Google Android官网下载](https://developer.android.google.cn/studio?hl=zh-cn)，更多安装细节可参考[Android官方文档](https://developer.android.google.cn/studio/install?hl=zh-cn)  
- 开发电脑连接Android设备（推荐使用Google官方模拟器），设备需[启用开发者选项](https://developer.android.google.cn/studio/debug/dev-options?hl=zh-cn#enable)  

### 运行uni-app x项目  

启动HBuilderX，创建 uni-app x 项目（已创建项目忽略此步骤）。  

打开项目的manifest.json文件，选择 "运行" -> "运行到手机或模拟器" -> "运行到Android App基座"：  
![运行到Android](https://native-res.dcloud.net.cn/images/uni-app-x/android/inspector/hx-run.jpg)  

在运行项目界面选择要使用的设备，点击"运行"：  
![选择Android设备运行](https://native-res.dcloud.net.cn/images/uni-app-x/android/inspector/hx-device.jpg)  

确保应用编译成功，在手机上操作安装真机运行基座App，安装成功后HBuilderX会自动启动App。


### Layout Inspector 审查元素

启动 Android Studio，首次运行需要[创建Android原生项目](https://developer.android.google.cn/studio/projects/create-project?hl=zh-cn)。  
打开项目，选择 "Tools" -> "Layout Inspector"，启动 Layout Inspector：  
![启动LayoutInspector](https://native-res.dcloud.net.cn/images/uni-app-x/android/inspector/inspector-start.jpg)

在 Layout Inspector 界面选择要操作的设备：  
![LayoutInspector选择设备](https://native-res.dcloud.net.cn/images/uni-app-x/android/inspector/inspector-device.jpg)

连接正常将会在 Layout Inspector 界面中显示手机端应用的截屏。  
> 注意：需要确保uni-app x项目在设备前台运行  

左侧 Component Tree 中展开所有子节点，查找到 DecorView -> LinearLayout -> content -> PageFrameView -> RenderContainer，下面就是 uvue 页面 template 中元素对应的原生View：  
![LayoutInpsector查看元素](https://native-res.dcloud.net.cn/images/uni-app-x/android/inspector/inspector-detail.png)

> view 组件对应原生 UniView  
> image 组件对应原生 UniImageView  
> text 组件对应原生 UniTextView  

在左侧 Component Tree 中选择要查看的view，对应右侧 Attributes 中显示其排版计算后的原生属性，如width是原生view的宽度，height是原生view的高度。  

可切换到3D模式，查看原生组件的层级关系：  
![LayoutInspector切换2D/3D模式](https://native-res.dcloud.net.cn/images/uni-app-x/android/inspector/inspector-switchmode.png)

### 注意事项  
- uni-app x项目需使用标准基座或自定义基座运行，发布为正式包后无法使用 Layout Inpector  
- 如果启动 Layout Inspector 报错，请更新 Android Studio 到最新版本再重试  
- 在部分设备连接 Layout Inspector 后应用可能会导致 App 退出，这时需换其它设备，建议使用Google官方提供的模拟器  

### 参考  
- [Android Studio 使用布局检查器和布局验证工具调试布局](https://developer.android.google.cn/studio/debug/layout-inspector?hl=zh-cn)  
- [Android检查GPU渲染速度和过渡绘制](https://developer.android.google.cn/topic/performance/rendering/inspect-gpu-rendering?hl=zh-cn)  
