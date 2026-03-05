## font-family



font-family 属性用于设置元素使用的字体，允许通过给定一个有先后顺序的，由字体名或者字体族名组成的列表来为元素设置字体。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
font-family: <family-name>;
```



### 值限制
- font



### font-family 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| cursive | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 草书字体。这种字体有的有连笔，有的还有特殊的斜体效果。因为一般这种字体都有一点连笔效果，所以会给人一种手写的感觉。<br/>        例如：Brush Script MT、Brush Script Std、Lucida Calligraphy、Lucida Handwriting、Apple Chancery、cursive。 |
| fantasy | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | Fantasy 字体主要是那些具有特殊艺术效果的字体。<br/>        例如：Papyrus、Herculanum、Party LET、Curlz MT、Harrington、fantasy。 |
| monospace | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 等宽字体，即字体中每个字宽度相同。<br/>        例如：Fira Mono、DejaVu Sans Mono、Menlo、Consolas、Liberation Mono、Monaco、Lucida Console、monospace。 |
| sans-serif | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 无衬线字体，即笔画结尾是平滑的字体。<br/>        例如：Open Sans、Fira Sans、Lucida Sans、Lucida Sans Unicode、Trebuchet MS、Liberation Sans、Nimbus Sans L、sans-serif。 |
| serif | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 带衬线字体，笔画结尾有特殊的装饰线或衬线。<br/>        例如：Lucida Bright、Lucida Fax、Palatino、Palatino Linotype、Palladio、URW Palladio、serif。 |
| uni-icon | Web: x; Android: 4.33; iOS: 4.33; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni-app x 内置字体图标 uni-icon |




### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)
- [input](/component/input.md)
- [textarea](/component/textarea.md)



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/text/font-family.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/text/font-family.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/text/font-family

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/text/font-family

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view class="uni-padding-wrap">
      <text class="common" style="font-family: monospace">font-family: monospace</text>

      <text class="common" style="font-family: cursive">font-family: cursive</text>

      <text class="common" style="font-family: AlimamaDaoLiTiTTF">font-family: 阿里妈妈刀隶体-ttf（网络字体下载后生效）</text>

      <text class="common" style="font-family: AlimamaDaoLiTiOTF">font-family: 阿里妈妈刀隶体-otf</text>

      <text class="common" style="font-family: AlimamaDaoLiTiOTF;font-weight: bold;font-style: italic;">font-family: 阿里妈妈刀隶体-otf（粗斜体）</text>

      <text style="font-family: UniFontFamily;">style 加载非 static 目录字体文件：{{uniIcon}}</text>

      <!--    <text class="common" style="font-family: AlimamaDaoLiTiWOFF">font-family: 阿里妈妈刀隶体-woff</text>
      <text class="common" style="font-family: AlimamaDaoLiTiWOFF2">font-family: 阿里妈妈刀隶体-woff2</text> -->

      <text class="uni-title-text title-color">【拍平测试】</text>
      <text class="common" style="font-family: monospace" flatten>font-family: monospace</text>
      <text class="common" style="font-family: cursive" flatten>font-family: cursive</text>
      <text class="common" style="font-family: AlimamaDaoLiTiTTF" flatten>font-family: 阿里妈妈刀隶体-ttf（网络字体下载后生效）</text>
      <text class="common" style="font-family: AlimamaDaoLiTiOTF" flatten>font-family: 阿里妈妈刀隶体-otf</text>
      <text class="common" style="font-family: AlimamaDaoLiTiOTF;font-weight: bold;font-style: italic;" flatten>font-family: 阿里妈妈刀隶体-otf（粗斜体）</text>
      <text style="font-family: UniFontFamily;" flatten>style 加载非 static 目录字体文件：{{uniIcon}}</text>


      <view class="uni-common-mt">
        <text class="uni-title-text title-color">setProperty 设置与 getPropertyValue 获取 font-family 测试</text>

        <!-- 普通版本 -->
        <text class="uni-info">设置值: {{fontFamily}}</text>
        <text class="uni-info">获取值: {{fontFamilyActual}}</text>
        <text ref="textRef" class="common" :style="{ fontFamily: fontFamily }">当前 font-family: {{fontFamily}}</text>

        <!-- 拍平版本 -->
        <text class="uni-info">设置值: {{fontFamily}}</text>
        <text class="uni-info">获取值: {{fontFamilyActualFlat}}</text>
        <text ref="textRefFlat" class="common" :style="{ fontFamily: fontFamily }" flatten>当前 font-family: {{fontFamily}}</text>

        <view class="uni-common-mt uni-common-mb">
          <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
          <enum-data :items="fontFamilyEnum" title="font-family 枚举值" @change="radioChangeFontFamily" :compact="true"></enum-data>
          <input-data :defaultValue="fontFamily" title="font-family 自定义值" type="text" @confirm="inputChangeFontFamily"></input-data>
        </view>
      </view>
    </view>
    <!-- #ifdef APP -->
    <view style="margin: 24px 12px;">
      <button type="default" @click="openUniIcon">内置字体图标uni-icon示例</button>
    </view>
    <!-- #endif -->
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const uniIcon = ref('\ue100')
  const openUniIcon = () => {
    uni.navigateTo({
      url: '/pages/CSS/text/font-family-icon'
    })
  }

  const fontFamilyEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'monospace' },
    { value: 2, name: 'cursive' },
    { value: 3, name: 'AlimamaDaoLiTiTTF' },
    { value: 4, name: 'AlimamaDaoLiTiOTF' },
    { value: 5, name: 'UniFontFamily' }
  ]

  const fontFamily = ref('monospace')
  const fontFamilyActual = ref('')
  const fontFamilyActualFlat = ref('')
  const textRef = ref(null as UniTextElement | null)
  const textRefFlat = ref(null as UniTextElement | null)

  const getPropertyValues = () => {
    fontFamilyActual.value = textRef.value?.style.getPropertyValue('font-family') ?? ''
    fontFamilyActualFlat.value = textRefFlat.value?.style.getPropertyValue('font-family') ?? ''
  }

  const changeFontFamily = (value: string) => {
    fontFamily.value = value
    textRef.value?.style.setProperty('font-family', value)
    textRefFlat.value?.style.setProperty('font-family', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeFontFamily = (index: number) => {
    const selectedItem = fontFamilyEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeFontFamily(selectedItem.name)
    }
  }

  const inputChangeFontFamily = (value: string) => {
    changeFontFamily(value)
  }

  onReady(() => {
    getPropertyValues()
  })
</script>

<style>
  .common {
    font-size: 20px;
    line-height: 40px;
  }
  .title-color{
    color:#007aff;
    margin-bottom: 10px;
  }

  @font-face {
    font-family: AlimamaDaoLiTiTTF;
    src: url('https://qiniu-web-assets.dcloud.net.cn/uni-app-x/static/font/AlimamaDaoLiTi.ttf');
  }

  @font-face {
    font-family: AlimamaDaoLiTiOTF;
    src: url('/static/font/AlimamaDaoLiTi.otf');
  }

  @font-face {
    font-family: UniFontFamily;
    src: url('./uni.ttf');
  }

  /*  @font-face {
    font-family: AlimamaDaoLiTiWOFF;
    src: url('/static/app-ios/AlimamaDaoLiTi.woff');
  }
  @font-face {
    font-family: AlimamaDaoLiTiWOFF2;
    src: url('/static/app-ios/AlimamaDaoLiTi.woff2');
  } */

  .common-box{
    flex-direction: row;
    justify-content: space-around;
  }

  .test-box {
    width: 180px;
    height: 80px;
    background-color: gray;
    justify-content: center;
    align-items: center;
  }

</style>

```

:::

### 字体设置

对于系统中已经存在的字体，font-family里直接写字体名称即可。\
但对于系统中不存在的字体，需要通过src属性的url方法来指定字体路径。如下：
```css
@font-face {
    font-family: UniFontFamily;
    src: url('/static/uni.ttf');
  }
```

**关于自定义字体的格式**
- app-android: 支持ttf和otf字体。不支持woff和woff2和可变字体
- app-ios: 支持ttf、otf、woff、woff2，需要注意，css 中的 font-family 值可以随意取，这个名字不是字体真正的名字。字体真正的名字（font-family），也就是注册到系统中的名字是保存在字体二进制文件中的。你需要确保你使用的字体的真正名字（font-family）足够特殊，否则在向系统注册时可能发生冲突，导致注册失败，你的字符被显示为‘?’。如果你使用 [http://www.iconfont.cn/](http://www.iconfont.cn/) 来构建你的 iconfont。确保在项目设置中，设置一个特殊的 font-family 名字。默认是 “iconfont”，极大可能发生冲突。
- web: 支持的字体取决于浏览器，详见mdn或caniuse
- app平台: 指定自定义字体路径时，必须使用url()包裹，支持本地文件路径、远程地址，4.33 版本开始支持 base64 格式数据；
- HarmonyOS平台: 支持ttf、otf 使用 [@ohos.font](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V13/js-apis-font-V13?ha_source=Dcloud&ha_sourceId=89000448) 实现

自定义字体的加载，除了在css的src中设置，也可以使用API [uni.loadFontface](../api/load-font-face.md)


### App平台差异
- app平台 font-family 样式不支持继承，每层组件都需要设样式
- app平台 font-family 属性值不支持使用分隔符（,）多个字体名称设置字体回退列表，仅支持设置一个字体


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-family)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.font-family)


[示例代码](https://gitcode.com/dcloud/hello-uni-app-x/blob/master/pages/CSS/text/font-family.uvue)
