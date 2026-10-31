<template>
  <view class="defaultStyles">
  </view>
</template>
<script lang="uts">
  /**
   * 引用 iOS 系统库
   * [可选实现，按需引入]
   */
  import {
    UIButton,
    UIControl
  } from "UIKit"

  /**
   * 引入三方库
   * [可选实现，按需引入]
   *
   * 在 iOS 平台引入三方库有以下两种方式：
   * 1、通过引入三方库framework 或者.a 等方式，需要将 .framework 放到 ./Frameworks 目录下，将.a 放到 ./Libs 目录下。更多信息[详见](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html#ios-平台原生配置)
   * 2、通过 cocoaPods 方式引入，将要引入的 pod 信息配置到 config.json 文件下的 dependencies-pods 字段下。详细配置方式[详见](https://uniapp.dcloud.net.cn/plugin/uts-ios-cocoapods.html)
   *
   * 在通过上述任意方式依赖三方库后，使用时需要在文件中 import:
   * 示例：import { LottieAnimationView, LottieAnimation, LottieLoopMode	} from 'Lottie'
   */

  /**
   * UTSiOS、UTSComponent 为平台内置对象，不需要 import 可直接调用其API，[详见](https://uniapp.dcloud.net.cn/uts/utsios.html)
   */
  import { UTSComponent } from "DCloudUTSFoundation"

  //原生提供以下属性或方法的实现
  export default {
    data() {
      return {
      };
    },
    /**
     * 组件名称，也就是开发者使用的标签
     */
    name: "uts-button",
    /**
     * 组件涉及的事件声明，只有声明过的事件，才能被正常发送
     */
    emits: ['buttonclick'],
    /**
     * 属性声明，组件的使用者会传递这些属性值到组件
     */
    props: {
      /**
       * 字符串类型 属性：buttontext  需要设置默认值
       */
      "buttontext": {
        type: String,
        default: "点击触发"
      }
    },
    /**
     * 组件内部变量声明
     */

    /**
     * 属性变化监听器实现
     */
    watch: {
      "buttontext": {
        /**
         * 这里监听属性变化，并进行组件内部更新
         */
        handler(newValue : String, oldValue : String) {
          this.$el.setTitle(newValue, for = UIControl.State.normal)
        },
        /**
         * 创建时是否通过此方法更新属性，默认值为false
         */
        immediate: false
      },
    },
    /**
     * 规则：如果没有配置expose，则methods中的方法均对外暴露，如果配置了expose，则以expose的配置为准向外暴露
     * ['publicMethod'] 含义为：只有 `publicMethod` 在实例上可用
     */
    expose: ['doSomething'],
    methods: {
      /**
       * 对外公开的组件方法
       * 在uni-app中调用组件方法，可以通过指定ref的方式，例如指定uts-button 标签的ref 为 ’button‘， 调用时使用：this.$refs["button"].doSomething('message');
       */
      doSomething(paramA : string) {
        // 这是组件的自定义方法
        console.log(paramA, 'this is in uts-button component')
      },


      /**
       * 内部使用的组件方法
       */
    },


    /**
     * 组件被创建，组件第一个生命周期，
     * 在内存中被占用的时候被调用，开发者可以在这里执行一些需要提前执行的初始化逻辑
     * [可选实现]
     */
    created() {

    },
    /**
     * 对应平台的view载体即将被创建，对应前端beforeMount
     * [可选实现]
     */
    NVBeforeLoad() {

    },
    /**
     * 创建原生View，必须定义返回值类型
     * 开发者需要重点实现这个函数，声明原生组件被创建出来的过程，以及最终生成的原生组件类型
     * [必须实现]
     */
    NVLoad() : UIButton {
      //必须实现
      buttonClickListsner = new ButtonClickListsner(this)

      let button = new UIButton()
      button.setTitle(this.buttontext, for = UIControl.State.normal)
      // 在 swift target-action 对应的方法需要以OC的方式来调用，那么OC语言中用Selector来表示一个方法的名称（又称方法选择器），创建一个Selector可以使用 Selector("functionName") 的方式。
      const method = Selector("buttonClickAction")
      if (buttonClickListsner != null) {
        button.addTarget(buttonClickListsner!, action = method, for = UIControl.Event.touchUpInside)
      }
      return button
    },

    /**
     * 原生View已创建
     * [可选实现]
     */
    NVLoaded() {
      /**
       * 通过 this.$el 来获取原生控件。
       */
      this.$el.setTitle(this.buttontext, for = UIControl.State.normal)
    },
    /**
     * 原生View布局完成
     * [可选实现]
     */
    NVLayouted() {

    },
    /**
     * 原生View将释放
     * [可选实现]
     */
    NVBeforeUnload() { },
    /**
     * 原生View已释放，这里可以做释放View之后的操作
     * [可选实现]
     */
    NVUnloaded() {

    },
    /**
     * 组件销毁
     * [可选实现]
     */
    unmounted() { }

    /**
     * 更多组件开发的信息详见：https://uniapp.dcloud.net.cn/plugin/uts-component.html
     */
  }

  /**
   * 定义按钮点击后触发回调的类
   * [可选实现]
   */
  class ButtonClickListsner {
    /**
     * 如果需要在回调类或者代理类中对组件进行操作，比如调用组件方法，发送事件等，需要在该类中持有组件对应的原生类的对象。
     * 组件原生类的基类为 UTSComponent，该类是一个泛型类，需要接收一个类型变量，该类型变量就是原生组件的类型。
     */
    private component : UTSComponent<UIButton>

    constructor(component : UTSComponent<UIButton>) {
      this.component = component
      super.init()
    }

    /**
     * 按钮点击回调方法
     * 在 swift 中，所有target-action (例如按钮的点击事件，NotificationCenter 的通知事件等)对应的 action 函数前面都要使用 @objc 进行标记。
     * [可选实现]
     */
    @objc buttonClickAction() {
      console.log("按钮被点击")
      // 发送事件
      this.component.__$$emit("buttonclick");
    }
  }

  /**
   * 定义回调类或者代理类的实例
   * [可选实现]
   */
  let buttonClickListsner : ButtonClickListsner | null = null
</script>

<style>

</style>