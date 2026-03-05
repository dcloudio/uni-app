# AI修复

目前的功能: 修复uni-app x编译到Android和iOS时出现的编译错误

> 目前不收费，但每人每天只能使用一百次

> HBuilderX 4.71+开始支持AI修复功能，但推荐从4.72起开始使用

## 使用方式

1、在uni-app x编译到Android和iOS平台时如果出现编译错误，就会出现一个可点击的链接

![](https://web-ext-storage.dcloud.net.cn/hx/debug/ai-repair.png)

2、点击控制台的链接之后，右边会出现一个修复页面，主要显示AI修复的建议

3、修复结束之后，在右边会出现一个diff的效果

HBuilderX 4.72+的效果图：
![](https://web-ext-storage.dcloud.net.cn/hx/doc/diff_replace_pre.png)

### 如何同意AI的修复

##### HBuilderX 4.71的效果
首先点击需要替换的行（左侧列显示了哪些被修改），
然后如下图，点击箭头指向的地方，点击之后就将右侧的新内容替换到原本的文件中，然后保存即可。
![](https://web-ext-storage.dcloud.net.cn/hx/debug/repair-diff-replace.png)

##### HBuilderX 4.72+的效果
在文本区域点击`同意`或者`拒绝`时，只会替换对应区域的内容

在底部点击`同意`或者`拒绝`时，会替换全部需要修改的内容

![](https://web-ext-storage.dcloud.net.cn/hx/doc/diff_new_replace.png)

4、如果编译报错包含多个文件的错误，修复视图的最下方会出现一个按钮`点击修复下一个文件的问题`，点击该按钮开始修复下一个错误

> 按钮中包含了有多少文件需要修复，当前正在修复第几个文件

<img src="https://web-ext-storage.dcloud.net.cn/hx/debug/bug_fix_next.png" style="zoom: 50%;" />

### 如何取消AI修复
> HBuilderX 4.72+

如果需要终止修复，可以点击右上角的取消按钮。

![](https://web-ext-storage.dcloud.net.cn/hx/debug/bug_fix_cancel.png)

### 如何清空AI的回复

在AI回复页面的顶部，中间按钮的功能是`清空记录`。(注意AI回复的过程中无法清空记录)

![](https://web-ext-storage.dcloud.net.cn/hx/doc/info_link.png)

## 获取提示词@getprompt

如果希望在其他IDE中使用AI修复功能，可以在编译输出的控制台中鼠标右键，会出现一个生成AI提示词的菜单项，点击之后可以获取提示词信息，然后贴到cursor等其他IDE中让AI帮忙修复。

![](https://web-ext-storage.dcloud.net.cn/hx/debug/bug_fix_prompt.png)

## 注意
- 有时候AI并不会按照要求返回提示内容，这时候可以参考右边的区域来通过AI反馈的建议来修复
- 有时候控制台可能并不会出现AI修复的链接，重新尝试编译就可能会出现
- 如果编译错误中不包含uvue、uts文件，那AI可能无法修复对应的问题。
