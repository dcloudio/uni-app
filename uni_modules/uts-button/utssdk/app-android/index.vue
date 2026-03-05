<template>
  <view>
  </view>
</template>

<script lang="uts">
  /**
   * 引用 Android 系统库
   * [可选实现，按需引入]
   */
  import TextUtils from 'android.text.TextUtils';
  import Button from 'android.widget.Button';
  import View from 'android.view.View';

  /**
   * 引入三方库
   * [可选实现，按需引入]
   *
   * 在 Android 平台引入三方库有以下两种方式：
   * 1、[推荐] 通过 仓储 方式引入，将 三方库的依赖信息 配置到 config.json 文件下的 dependencies 字段下。详细配置方式[详见](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html#dependencies)
   * 2、直接引入，将 三方库的aar或jar文件 放到libs目录下。更多信息[详见](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html#android%E5%B9%B3%E5%8F%B0%E5%8E%9F%E7%94%9F%E9%85%8D%E7%BD%AE)
   *
   * 在通过上述任意方式依赖三方库后，使用时需要在文件中 import
   * import { LottieAnimationView } from 'com.airbnb.lottie.LottieAnimationView'
   */

  /**
   * UTSAndroid 为平台内置对象，不需要 import 可直接调用其API，[详见](https://uniapp.dcloud.net.cn/uts/utsandroid.html#utsandroid)
   */

  //原生提供以下属性或方法的实现
  export default {
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
      "buttontext": {
        type: String,
        default: "点击触发"
      }
    },
    /**
     * 组件内部变量声明
     */
    data() {
      return {}
    },
    /**
     * 属性变化监听器实现
     */
    watch: {
      "buttontext": {
        /**
         * 这里监听属性变化，并进行组件内部更新
         */
        handler(newValue : string, oldValue : string) {
          if (!TextUtils.isEmpty(newValue) && newValue != oldValue) {
            this.$el?.setText(newValue);
          }
        },
        immediate: false // 创建时是否通过此方法更新属性，默认值为false
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
       *
       * uni-app中调用示例：
       * this.$refs["组件ref"].doSomething("uts-button");
       *
       * uni-app x中调用示例：
       * 1、引入对应Element
       * import { UtsButtonElement(组件名称以upper camel case方式命名 + Element) } from 'uts.sdk.modules.utsComponent(组件目录名称以lower camel case方式命名)';
       * 2、(this.$refs["组件ref"] as UtsButtonElement).doSomething("uts-button");
       * 或 (uni.getElementById("组件id") as UtsButtonElement).doSomething("uts-button");
       */
      doSomething(param : string) {
        console.log(param);
      },
      /**
       * 内部使用的组件方法
       */
      privateMethod() {

      }
    },
    /**
     * [可选实现] 组件被创建，组件第一个生命周期，
     * 在内存中被占用的时候被调用，开发者可以在这里执行一些需要提前执行的初始化逻辑
     */
    created() {

    },
    /**
     * [可选实现] 对应平台的view载体即将被创建，对应前端beforeMount
     */
    NVBeforeLoad() {

    },
    /**
     * [必须实现] 创建原生View，必须定义返回值类型
     * 开发者需要重点实现这个函数，声明原生组件被创建出来的过程，以及最终生成的原生组件类型
     * （Android需要明确知道View类型，需特殊校验）
     */
    NVLoad() : Button {
      let button = new Button($androidContext!);
      button.setText("点击触发");
      button.setOnClickListener(new ButtonClickListener(this));
      return button;
    },
    /**
     * [可选实现] 原生View已创建
     */
    NVLoaded() {

    },
    /**
     * [可选实现] 原生View布局完成
     */
    NVLayouted() {

    },
    /**
     * [可选实现] 原生View将释放
     */
    NVBeforeUnload() {

    },
    /**
     * [可选实现] 原生View已释放，这里可以做释放View之后的操作
     */
    NVUnloaded() {

    },
    /**
     * [可选实现] 组件销毁
     */
    unmounted() {

    },
    /**
     * [可选实现] 自定组件布局尺寸，用于告诉排版系统，组件自身需要的宽高
     * 一般情况下，组件的宽高应该是由终端系统的排版引擎决定，组件开发者不需要实现此函数
     * 但是部分场景下，组件开发者需要自己维护宽高，则需要开发者重写此函数
     */
    NVMeasure(size : UTSSize) : UTSSize {
      // size.width = 300.0.toFloat();
      // size.height = 200.0.toFloat();
      return size;
    }
  }

  /**
   * 定义按钮点击后触发回调的类
   * [可选实现]
   */
  class ButtonClickListener extends View.OnClickListener {
    /**
     * 如果需要在回调类或者代理类中对组件进行操作，比如调用组件方法，发送事件等，需要在该类中持有组件对应的原生类的对象
     * 组件原生类的基类为 UTSComponent，该类是一个泛型类，需要接收一个类型变量，该类型变量就是原生组件的类型
     */
    private comp : UTSComponent<Button>;

    constructor(comp : UTSComponent<Button>) {
      super();
      this.comp = comp;
    }

    /**
     * 按钮点击回调方法
     */
    override onClick(v ?: View) {
      console.log("按钮被点击");
      // 发送事件
      this.comp.$emit("buttonclick");
    }
  }
</script>

<style>

</style>