日历创建，分2种情况
如果有日历写入权限，则可以直接写入日历中。
如果没有日历写入权限，则会弹出系统的新建日历页面，二次确认。
鸿蒙平台只弹系统的新建日历界面。

`uni.addPhoneCalendar`这个API不能设置重复日程。
设置重复日程需专用API：`uni.addPhoneRepeatCalendar`。

API中signature参数为微信特有参数。没有签名，在微信小程序上某些日历添加功能不可用，比如path。

path参数的用途为在日历中跳转到小程序或app的指定页面。app中使用需要配置好通用链接或schema，并自行在app.uvue中接收path参数然后跳转