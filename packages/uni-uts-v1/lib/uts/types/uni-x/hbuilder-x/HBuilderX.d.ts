declare namespace string {
  /**
   * @description 元素上的属性
   * @module dom
   */
  type AttrString = string

  /**
   * @description 元素上某个属性的值
   * @module dom
   */
  type AttrValueString = string

  /**
   * @description 元素全局属性`class`的值
   * @module dom
   */
  type ClassString = string

  /**
   * @description 元素全局属性`id`的值
   * @module dom
   */
  type IDString = string

  /**
   * @description 元素上的事件
   * @module dom
   */
  type HTMLEventString = string

  /**
   * @description CSS颜色的值
   * @module dom
   */
  type ColorString = string

  /**
   * @description 提示common模块 以及js文件路径
   * @module vue
   */
  type RequireCommonString = string

  /**
   * @description 国际化翻译的key值
   * @module vue
   */
  type VueI18NKeyString = string

  /**
   * @description vue默认参数data中的属性名称
   * @module vue
   */
  type VueDataString = string

  /**
   * @description vue组件中ref属性的值
   * @module vue
   */
  type VueRefString = string

  /**
   * @description vuex 中 actions 的名称
   * @module vue
   */
  type VuexDispatchString = string

  /**
   * @description vuex 中 mutations 的名称
   * @module vue
   */
  type VuexCommitString = string

  /**
   * @description vue, nvue, uvue页面文件的文件路径(根据项目自动匹配)
   * @module vue
   */
  type PageURIString = string

  /**
   * @description nvue页面文件的文件路径
   * @module vue
   */
  type NPageURIString = string

  /**
   * @description uvue页面文件的文件路径, 仅在uniappx中生效
   * @module uniappx
   */
  type UPageURIString = string

  /**
   * @description video 组件的 id, 仅在uniappx中生效
   * @module uniappx
   */
  type VideoIdString = string

  /**
   * @description web-view 组件的 id, 仅在uniappx中生效
   * @module uniappx
   */
  type WebviewIdString = string

  /**
   * @description uniCloud db schema中parentKey的值
   * @module uniCloud
   */
  type ParentFieldString = string

  /**
   * @description uniCloud db schema中required数组的值
   * @module uniCloud
   */
  type SchemaFieldString = string

  /**
   * @description uniCloud db schema中validateFunction的值
   * @module uniCloud
   */
  type ValidateFunctionString = string

  /**
   * @description uniCloud 云函数名
   * @module uniCloud
   */
  type CloudFunctionString = string

  /**
   * @description uniCloud 云对象名
   * @module uniCloud
   */
  type CloudObjectString = string

  /**
   * @description uniCloud 数据库集合的名称
   * @module uniCloud
   */
  type DBCollectionString = string

  /**
   * @description uniCloud 数据库字段名称
   * @module uniCloud
   */
  type DBFieldString = string

  /**
   * @description uniCloud 数据库要操作的集合, 要查询的字段
   * @module uniCloud
   */
  type JQLString = string

  /**
   * @description CSS属性的名称
   * @module jQuery
   */
  type cssPropertyString = string

  /**
   * @description CSS某个属性的值
   * @module jQuery
   */
  type cssPropertyValueString = string

  /**
   * @description CSS选择器的名称
   * @module jQuery
   */
  type cssSelectorString = string

  /**
   * @description 任意文件的文件路径
   * @module uri
   */
  type URIString = string

  /**
   * @description css文件的文件路径(后缀为`.css`的文件路径)
   * @module uri
   */
  type CSSURIString = string

  /**
   * @description js文件的文件路径(后缀为`.js`的文件路径)
   * @module uri
   */
  type JSURIString = string

  /**
   * @description html文件的文件路径(后缀为`.html`的文件路径)
   * @module uri
   */
  type HTMLURIString = string

  /**
   * @description markdown文件的文件路径(后缀为`.md`的文件路径)
   * @module uri
   */
  type MarkdownURIString = string

  /**
   * @description js, ts, uts引用文件或模块的文件路径(支持vue,nvue,uvue中script标签内容), 例: `import xxx from 'xxx'`
   * @module uri
   */
  type ScriptImportURIString = string

  /**
   * @description css文件可以引用的文件的文件路径, 后缀为`[".css"]`的文件路径 例: `@import url('xxx.css')`
   * @module uri
   */
  type CssImportURIString = string

  /**
   * @description scss文件可以引用的文件的文件路径, 后缀为`[".scss", ".css"]`的文件路径, 例: `@import 'xxx.scss'`
   * @module uri
   */
  type ScssImportURIString = string

  /**
   * @description less文件可以引用的文件的文件路径, 后缀为`[".less", ".css"]`的文件路径, 例: `@import 'xxx.less'`
   * @module uri
   */
  type LessImportURIString = string

  /**
   * @description 字体文件的文件路径
   * @module uri
   */
  type FontURIString = string

  /**
   * @description 图片文件的文件路径
   * @module uri
   */
  type ImageURIString = string

  /**
   * @description 音频文件的文件路径
   * @module uri
   */
  type AudioURIString = string

  /**
   * @description 视频文件的文件路径
   * @module uri
   */
  type VideoURIString = string
}
