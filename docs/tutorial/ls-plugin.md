# uni-app x语言服务插件

`uni-app x语言服务`是为`uni-app x`项目提供的语言服务插件。

[点击加入im官方交流群](https://im.dcloud.net.cn/#/?joinGroup=682c303383abe400024d38ba)

适用于 cursor/vscode 等兼容vscode插件规范的IDE。

开发者使用其他 AI IDE 时，也可以获得 uni-app x 的良好的语言服务支持。如需要AI Rules，另见[文档](./rules_mcp.md)

## 如何安装插件@install
插件目前在两个平台发布，vscode官方市场和open-vsx市场。
* [vscode官方市场插件下载](https://marketplace.visualstudio.com/items?itemName=dcloud-ide.hbuilderx-language-services)。
* [open-vsx市场插件下载](https://open-vsx.org/extension/dcloud-ide/hbuilderx-language-services)。

你可以在vscode/cursor/Antigravity等IDE的插件搜索界面直接搜索“uni-app x语言服务”，找到圆形绿色U图标，且发布方为DCloud，直接安装。

注意: `插件安装完成后，会提示重启编辑器，如果没有提示，需要手动重启编辑器`
<br/> ![statusbar](https://web-ext-storage.dcloud.net.cn/doc/tutorial/lsp-plugin/install.png)

## 插件功能范围@ability
* 插件只支持`uni-app x`项目。
* 插件仅支持语言服务，即代码高亮、代码提示、校验、格式化、转到定义。不支持运行、Debug、发行等功能，需要同时打开HBuilderX，协同工作。
	因为vscode类插件API，无法定制运行控制台，所以uni-app x的运行仍然在HBuilderX中。
	
	从HBuilderX 4.71+，运行控制台的编译报错，尤其是uts类型报错，都可以在HBuilderX的运行控制台点击AI修复，[详见](./bug_repair.md)
	
	如果不想使用HBuilderX的AI修复，也可以对HBuilderX的控制台日志选择后点右键，生成AI提示词，此时会给选中的日志补充适合uni-app x的prompt，然后粘贴到cursor等工具中来修复。[详见](./bug_repair.md#获取提示词)


### 关联文件类型和高亮支持@language
支持uvue和uts文件的高亮
* 打开uni-app x项目，打开一个.uvue/.uts文件，会自动关联对应的语言。
* 如果第一次没有自动关联，请手动关联文件为uvue/uts。

### 平台设置说明@targets
uni-app x 项目有很多平台，每个平台都有大量的语法和API。尤其是Android、iOS、鸿蒙的系统API非常多。如果开启太多平台，会导致代码提示和校验变慢。

所以uni-app x提供了平台语言服务配置。在底部状态栏可以选择使用的平台（默认是APP-ANDROID）。

#### 平台信息注意事项特别说明
* 平台设置一般和条件编译共同使用
  * [条件编译详情](https://uniapp.dcloud.net.cn/tutorial/platform.html#preprocessor)
  * [pages.json的条件编译支持](https://uniapp.dcloud.net.cn/tutorial/platform.html#pages-json-%E7%9A%84%E6%9D%A1%E4%BB%B6%E7%BC%96%E8%AF%91)
  * 支持非选中平台的条件编译块置灰功能

*注意：选择多个平台，会导致加载多套语言服务，影响内存占用和运行速度。如果只开发一个平台，推荐去掉其他平台的设置。*

#### 语言服务平台设置@setting
* 在uni-app x项目中，打开任意文件，即可在`状态栏`看到**语言服务平台信息**
* **点击状态栏**可打开对应项目的**平台信息配置文件**，可进行修改
<br/> ![statusbar](https://web-ext-storage.dcloud.net.cn/doc/tutorial/lsp-plugin/statusbar.png)
* 目前只支持手动修改Target配置信息
```json
{
    "targets": [
        "APP-ANDROID",
        "APP-IOS",
        "APP-HARMONY",
        "WEB",
        "MP-WEIXIN"
    ]
}
```


### 语言服务功能说明
* 注意: 语言服务的功能时刻与`条件编译`和`平台设置`相关
#### 语言服务生效范围的规则
##### 条件编译代码区域
```js
// #ifdef APP-ANDROID
...
// #endif
```

```js
// #ifdef WEB
...
// #endif
```

在上述各条件编译的作用域中，各区域内只能提示各条件编译对应平台的专有提示项和各平台通用的提示项

*例如：*
在 `APP-ANDROID` 条件编译中可以提示`Android系统API`和`UNI API`。
在 `WEB` 条件编译中可以提示`DOM API`和`UNI API`。
*注意：如果取消了某平台的勾选，在此平台对应的条件编译代码区域中将没有任何代码提示*

##### 非条件编译代码区域
在非条件编译代码区域里，代码提示、语法校验则会以选择的平台为准（默认选择：APP-ANDROID）。

#### 代码提示
* 目前暂不支持`条件编译`的相关代码提示。
* 可以提示uni相关的API和组件，并有详细的参数提示。
<br/> ![completion](https://web-ext-storage.dcloud.net.cn/doc/tutorial/lsp-plugin/completion.png)


#### 悬浮
* 悬浮到uni相关的API和组件时，显示详细信息。
<br/> ![hover](https://web-ext-storage.dcloud.net.cn/doc/tutorial/lsp-plugin/hover.png)


#### 转到定义
* 可以跳转到uni相关的API和组件的定义位置。

#### 查找引用
* 可以查找uni相关的API和组件的引用位置。
<br/> ![ref](https://web-ext-storage.dcloud.net.cn/doc/tutorial/lsp-plugin/ref.png)

#### 大纲
* 可以在大纲中查看uni相关的API和组件的定义位置。
<br/> ![outline](https://web-ext-storage.dcloud.net.cn/doc/tutorial/lsp-plugin/outline.png)

#### 校验
* 实时校验错误，在多平台设置的场景下效果较为明显。
<br/> ![validation](https://web-ext-storage.dcloud.net.cn/doc/tutorial/lsp-plugin/validation.png)


### 代码格式化
目前语言服务插件没有内置格式化功能，推荐使用`prettier`进行代码格式化。具体如下

#### 使用方法说明
##### 必要条件
* 安装`Prettier`插件
  * 打开扩展管理界面。
  * 搜索`Prettier - Code formatter`安装。

* 在项目中安装`prettier`第三方库
  * **由于vscode插件库中的`prettier`插件版本较低，无法使用`plugin`能力，所以还需要自行手动在项目中安装。**
  * 进入项目根目录，运行`npm i prettier --save-dev`安装至开发环境中。

##### 配置格式化设置项
* 使用快捷键 Ctrl + Shift + P（Windows/Linux）或 Cmd + Shift + P（macOS）打开命令面板。
* 输入 `Preferences: Open Settings (JSON)` 或 打开设置（JSON），然后回车。
* 在打开的`settings.json`中，加入如下配置：
```json
{
  "[uvue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "prettier.documentSelectors": ["**/*.uvue", "**/*.uts"],
  "prettier.requireConfig": true
}
```

##### 添加prettier配置文件
* 在项目根目录下新建`prettier-plugin-uts.js`文件，添加如下代码：
```javascript
const languages = [
  {
    name: "uts",
    parsers: ["typescript"],
    vscodeLanguageIds: ["uts"],
  }
];
module.exports = { languages};

```

* 新建`.prettierrc`文件，添加如下配置：
```json
{
  "plugins": [
    "./prettier-plugin-uts.js"
  ],
  "overrides": [
    {
      "files": "*.uvue",
      "options": {
        "parser": "vue"
      }
    },
    {
      "files": "*.uts",
      "options": {
        "parser": "typescript"
      }
    }
  ]
}
```
保存后即可使用格式化功能。

## 问题反馈
* [点击加入im官方交流群](https://im.dcloud.net.cn/#/?joinGroup=682c303383abe400024d38ba)
