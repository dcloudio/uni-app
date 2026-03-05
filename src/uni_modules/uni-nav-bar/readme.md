# uni-nav-bar
自定义导航栏组件

在页面pages.json中关闭原生导航栏后，即使用`"style": {"navigationStyle": "custom"}`，可以使用本组件实现自定义导航栏。

本组件自动适配的顶部安全区。用padding-top让出顶部状态栏的高度。除去状态栏高度后，本组件的高度为44px。

本组件左右两边默认各让出了6px的边距。也可以在left-class和right-class中自定义边距。

本组件分为left、mid、right 3个区域。

- left区域默认显示一个返回箭头，大小为44*44px。可以通过属性hideDefaultBack来隐藏，也可以传入一个slot name='left'来替代。可以通过left-class来修饰样式。
- mid区域默认显示title属性设置的标题。也可以传入一个slot name='mid'来替代。其默认宽度为屏幕宽度-两边默认边距-left区域默认宽度-right区域默认宽度。可以通过mid-class来修饰样式。
- right区域默认不显示内容，可以传入一个slot name='right'来显示自定义内容。right区域默认width也是44px，可以通过right-class来修饰样式。

支持属性：
- hideDefaultBack: 隐藏返回箭头
- title: 通过属性方便设置标题。如果传入mid slot，则不生效
- navigationBarTextStyle: 返回箭头和属性设置的标题，它们的颜色均由该属性控制，可选 white|black 。在非MP平台，不传入时可自动获取页面pageStyle的默认值
