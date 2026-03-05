# theme.json

> HBuilder X 4.18+ 支持

完整的主题适配教程 [另见](../api/theme-change.md)。

本文仅讲解theme.json的用法，用于解决pages.json的主题适配问题。

当app需要暗黑主题时，开发者虽然可以自行决定自己的界面样式，但缺少合适的设置pages.json中样式的时机。

在页面的onLoad中设置当前页面的style会来不及，因为某些平台页面早于onLoad就可以创建和进行窗体转场动画，\
这会造成新页面动画刚开始页面的背景色、navigationBar背景色是一个风格，而在onLoad后颜色发生变化。\
也就是俗称的 转场闪白 或 闪黑。

小程序提供了theme.json来给解决这个问题。在theme.json里配置light和dark的颜色，然后在pages.json中引用。

新页面创建时是根据pages.json的设置来初始化页面的，这样就可以在第一时间对页面样式进行适配，避免闪白闪黑。

考虑到全端兼容，uni-app x的web和app也支持theme.json设置。

但需要注意：**theme.json，仅负责pages.json的页面样式、tabbar样式的控制。不负责开发者自己的页面css样式控制。**

适配暗黑模式，除通过theme.json控制pages.json的样式外，还需要了解更多API：
- 获取OS/Host主题：[uni.getSystemInfo](../api/get-system-info.md)、[uni.getDevideInfo](../api/get-device-info.md)，返回的osTheme、hostTheme属性
- 监听OS主题切换：[uni.onOsThemeChange](../api/theme-change.md#onosthemechange)、[uni.offOsThemeChange](../api/theme-change.md#offosthemechange)、
- 监听host主题切换：[uni.onHostThemeChange](../api/theme-change.md#onhostthemechange)、[uni.offOsThemeChange](../api/theme-change.md#offosthemechange)、
- 获取App主题：[uni.getSystemInfo](../api/get-system-info.md)、[uni.getAppBaseInfo](../api/get-app-base-info.md)，返回的appTheme属性
- 设置App主题：[uni.setAppTheme](../api/theme-change.md#setapptheme)
- 监听App主题切换：[uni.onAppThemeChange](../api/theme-change.md#onappthemechange)、[uni.offAppThemeChange](../api/theme-change.md#offappthemechange)、
- manifest.json中设置App默认主题：[defaultAppTheme](../collocation/manifest.md#manifest-app)

## theme.json使用步骤

1. 在项目根目录下创建theme.json
2. 在 `theme.json` 中定义相关变量
3. 在 `pages.json` 中以@开头引用变量
4. 可选在 `manifest.json -> app` 中配置主题默认值 `"defaultAppTheme": "light"`, 支持通过[主题API](https://doc.dcloud.net.cn/uni-app-x/api/theme.html)动态设置


## theme.json内容描述 @themejson

`theme.json` 用于颜色主题相关的变量定义，包含以下属性：

| 属性  | 类型   | 必填 | 描述                 |
| :---- | :----- | :--- | :------------------- |
| light | Object | 是   | 浅色模式下的变量定义 |
| dark  | Object | 是   | 深色模式下的变量定义 |

示例如下：

```json
{
	"light": {
		"navBgColor": "#f8f8f8",
		"navTxtStyle": "black"
	},
	"dark": {
		"navBgColor": "#292929",
		"navTxtStyle": "white"
	}
}
```

完成定义后，可在 `pages.json` 中全局配置或页面配置的相关属性中以 `@` 开头引用，例如：

```json
// 全局配置
{
  "globalStyle": {
    "navigationBarBackgroundColor": "@navBgColor",
    "navigationBarTextStyle": "@navTxtStyle"
  }
}
// 页面配置
{
	"path": "pages/index/index",
	"style":{
		"navigationBarBackgroundColor": "@navBgColor",
		"navigationBarTextStyle": "@navTxtStyle"
	}
}
```

配置完成后，调用相应 api 框架会自动所设属性，展示对应主题下的颜色。

pages.json中并非所有配置项均支持使用theme.json中的变量，支持通过变量配置的属性如下所示：

- 全局配置 globalStyle 与页面 style 支持：

  - navigationBarBackgroundColor
  - navigationBarTextStyle
  - backgroundColor
  - backgroundTextStyle

- 全局配置 tabbar 属性：
  - color
  - selectedColor
  - backgroundColor
  - borderStyle
  - list
    - iconPath
    - selectedIconPath

## 配置示例@themeconfig

pages.json（示例省略了主题相关以外的配置项）

```json
{
	"globalStyle": {
		"navigationBarBackgroundColor": "@navBgColor",
		"navigationBarTextStyle": "@navTxtStyle",
		"backgroundColor": "@bgColor",
		"backgroundTextStyle": "@bgTxtStyle"
	},
	"tabBar": {
		"color": "@tabFontColor",
		"selectedColor": "@tabSelectedColor",
		"backgroundColor": "@tabBgColor",
		"borderStyle": "@tabBorderStyle",
		"list": [
			{
				"iconPath": "@iconPath1",
				"selectedIconPath": "@selectedIconPath1"
			},
			{
				"iconPath": "@iconPath2",
				"selectedIconPath": "@selectedIconPath2"
			}
		]
	}
}
```

theme.json

```json
{
	"light": {
		"navBgColor": "#f8f8f8",
		"navTxtStyle": "black",
		"bgColor": "#ffffff",
		"bgTxtStyle": "light",
		"bgColorTop": "#eeeeee",
		"bgColorBottom": "#efefef",
		"tabFontColor": "#000000",
		"tabSelectedColor": "#3cc51f",
		"tabBgColor": "#ffffff",
		"tabBorderStyle": "black",
		"iconPath1": "/static/icon1_light.png",
		"selectedIconPath1": "/static/selected_icon1_light.png",
		"iconPath2": "/static/icon2_light.png",
		"selectedIconPath2": "/static/selected_icon2_light.png"
	},
	"dark": {
		"navBgColor": "#292929",
		"navTxtStyle": "white",
		"bgColor": "#1f1f1f",
		"bgTxtStyle": "dark",
		"bgColorTop": "#292929",
		"bgColorBottom": "#1f1f1f",
		"tabFontColor": "#ffffff",
		"tabSelectedColor": "#51a937",
		"tabBgColor": "#292929",
		"tabBorderStyle": "white",
		"iconPath1": "/static/icon1_dark.png",
		"selectedIconPath1": "/static/selected_icon1_dark.png",
		"iconPath2": "/static/icon2_dark.png",
		"selectedIconPath2": "/static/selected_icon2_dark.png"
	}
}
```

在[hello uni-app x](https://hellouniappx.dcloud.net.cn/)中，已经配置了theme.json，在 api 的主题切换示例中，可以体验。

**注意：**
- `iOS 13+`、`Android 10+`设备上才支持暗黑模式