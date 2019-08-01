#### getMenuButtonBoundingClientRect()

在小程序平台，如果原生导航栏被隐藏，仍然在右上角会有一个悬浮按钮，微信下也被称为胶囊按钮。本API用于获取小程序下该菜单按钮的布局位置信息，方便开发者布局顶部内容时避开该按钮。

坐标信息以屏幕左上角为原点。

各平台开发方式暂未统一，使用时需注意用[条件编译](https://uniapp.dcloud.io/platform)调用不同平台的代码。

微信小程序：[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/wx.getMenuButtonBoundingClientRect.html)

百度小程序：[规范详情](https://smartprogram.baidu.com/docs/develop/api/menu_info/)

支付宝小程序：其逻辑与微信小程序不同，它提供了菜单点击后按钮的自定义功能，可以选择显示那些系统按钮，[规范详情](https://docs.alipay.com/mini/api/optionmenuitem)