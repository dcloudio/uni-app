---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-icons-x
---

::: sourceCode
## uni-icons
:::



# uni-icons 图标

适用于 uni-app x 的字体图标组件。组件内部只渲染一个 `text` 根节点，通过 `type` 指定图标名称，并可直接在组件标签上设置 `class` 或 `style` 自定义颜色、字号及其他文字样式。

## 基本用法

```html
<template>
	<uni-icons type="search" />
	<uni-icons type="heart-filled" style="color: #ff5a5f; font-size: 28px;" />
</template>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | String | `''` | 图标名称，取值范围见 [图标列表](#图标列表)；未传入或取值不存在时组件不显示图标 |

`type` 为字符串联合类型，在 IDE 中编写 `type="..."` 时会自动提示全部可选图标名称。

## 自定义颜色和字号

组件根节点是 `text`，标签上的 `class` 和 `style` 会直接作用于该节点：

```html
<template>
	<uni-icons type="heart-filled" :class="active ? 'icon-active' : 'icon-base'" />
</template>

<style>
.icon-base {
	color: #8a8f99;
	font-size: 28px;
}

.icon-active {
	color: #ff5a5f;
}
</style>
```

## 图标列表

`type` 共支持 161 个取值：

```
arrow-down              arrow-left              arrow-right             arrow-up
auth                    auth-filled             back                    bars
calendar                calendar-filled         camera                  camera-filled
cart                    cart-filled             chat                    chat-filled
chatboxes               chatboxes-filled        chatbubble              chatbubble-filled
checkbox                checkbox-filled         checkmarkempty          circle
circle-filled           clear                   close                   closeempty
cloud-download          cloud-download-filled   cloud-upload            cloud-upload-filled
color                   color-filled            compose                 contact
contact-filled          down                    bottom                  download
download-filled         email                   email-filled            eye
eye-filled              eye-slash               eye-slash-filled        fire
fire-filled             flag                    flag-filled             folder-add
folder-add-filled       font                    forward                 gear
gear-filled             gift                    gift-filled             hand-down
hand-down-filled        hand-up                 hand-up-filled          headphones
heart                   heart-filled            help                    help-filled
home                    home-filled             image                   image-filled
images                  images-filled           info                    info-filled
left                    link                    list                    location
location-filled         locked                  locked-filled           loop
mail-open               mail-open-filled        map                     map-filled
map-pin                 map-pin-ellipse         medal                   medal-filled
mic                     mic-filled              micoff                  micoff-filled
minus                   minus-filled            more                    more-filled
navigate                navigate-filled         notification            notification-filled
paperclip               paperplane              paperplane-filled       person
person-filled           personadd               personadd-filled        personadd-filled-copy
phone                   phone-filled            plus                    plus-filled
plusempty               pulldown                pyq                     qq
redo                    redo-filled             refresh                 refresh-filled
refreshempty            reload                  right                   scan
search                  settings                settings-filled         shop
shop-filled             smallcircle             smallcircle-filled      sound
sound-filled            spinner-cycle           staff                   staff-filled
star                    star-filled             starhalf                trash
trash-filled            tune                    tune-filled             undo
undo-filled             up                      top                     upload
upload-filled           videocam                videocam-filled         vip
vip-filled              wallet                  wallet-filled           weibo
weixin
```

其中 `bottom` 与 `down`、`top` 与 `up` 为同一图标的别名。


## 自定义字体

组件内部通过 `@font-face` 引入 `uniicons.ttf`，如需替换为自定义字体，可自行覆盖根节点的 `font-family`：

```html
<template>
	<uni-icons type="search" class="custom-icon" />
</template>

<style>
@font-face {
	font-family: CustomFont;
	src: url('/static/custom.ttf');
}

.custom-icon {
	font-family: CustomFont;
}
</style>
```

## 样式说明

通过 `style` 设置的内联样式会覆盖组件默认样式；使用全局 class 覆盖 `font-family` 时，可能需要使用 `!important`。




### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| type | keyof UTSJSONObject | "" | 图标名称，取值范围见 icons.uts 导出的 IconsType，未传入或取值不存在时不显示图标 |

<!-- UTSCOMJSON.uni-icons.fileFormates -->



<!-- UTSCOMJSON.uni-icons.component_type -->






### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-icons)
