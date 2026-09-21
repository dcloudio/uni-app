//#if _X_
import './x/polyfill/polyfill'
export {
  UTS,
  UTSJSONObject,
  UTSValueIterable,
  UniError,
} from '@dcloudio/uni-shared'
//#endif

export {
  Button,
  Canvas,
  Checkbox,
  CheckboxGroup,
  Editor,
  Form,
  Icon,
  Input,
  Label,
  MovableArea,
  MovableView,
  Navigator,
  PickerView,
  PickerViewColumn,
  Progress,
  Radio,
  RadioGroup,
  ResizeSensor,
  RichText,
  ScrollView,
  Slider,
  Swiper,
  SwiperItem,
  Switch,
  Textarea,
  //#if _X_
  PageContainer,
  Loading,
  ListView,
  ListItem,
  StickySection,
  StickyHeader,
  //#endif
  //#if _X_ && !_NODE_JS_
  UniElement,
  UniElement as UniElementImpl,
  UniButtonElement,
  UniButtonElement as UniButtonElementImpl,
  UniCanvasElement,
  UniCanvasElement as UniCanvasElementImpl,
  UniCheckboxElement,
  UniCheckboxElement as UniCheckboxElementImpl,
  UniCheckboxGroupElement,
  UniCheckboxGroupElement as UniCheckboxGroupElementImpl,
  UniEditorElement,
  UniEditorElement as UniEditorElementImpl,
  UniFormElement,
  UniFormElement as UniFormElementImpl,
  UniIconElement,
  UniIconElement as UniIconElementImpl,
  UniImageElement,
  UniImageElement as UniImageElementImpl,
  UniInputElement,
  UniInputElement as UniInputElementImpl,
  UniLabelElement,
  UniLabelElement as UniLabelElementImpl,
  UniMovableAreaElement,
  UniMovableAreaElement as UniMovableAreaElementImpl,
  UniMovableViewElement,
  UniMovableViewElement as UniMovableViewElementImpl,
  UniNavigatorElement,
  UniNavigatorElement as UniNavigatorElementImpl,
  UniPickerViewElement,
  UniPickerViewElement as UniPickerViewElementImpl,
  UniPickerViewColumnElement,
  UniPickerViewColumnElement as UniPickerViewColumnElementImpl,
  UniProgressElement,
  UniProgressElement as UniProgressElementImpl,
  UniRadioElement,
  UniRadioElement as UniRadioElementImpl,
  UniRadioGroupElement,
  UniRadioGroupElement as UniRadioGroupElementImpl,
  UniRichTextElement,
  UniRichTextElement as UniRichTextElementImpl,
  UniScrollViewElement,
  UniScrollViewElement as UniScrollViewElementImpl,
  UniSliderElement,
  UniSliderElement as UniSliderElementImpl,
  UniSwiperElement,
  UniSwiperElement as UniSwiperElementImpl,
  UniSwiperItemElement,
  UniSwiperItemElement as UniSwiperItemElementImpl,
  UniSwitchElement,
  UniSwitchElement as UniSwitchElementImpl,
  UniTextElement,
  UniTextElement as UniTextElementImpl,
  UniTextareaElement,
  UniTextareaElement as UniTextareaElementImpl,
  UniViewElement,
  UniViewElement as UniViewElementImpl,
  UniListViewElement,
  UniListViewElement as UniListViewElementImpl,
  UniListItemElement,
  UniListItemElement as UniListItemElementImpl,
  UniStickySectionElement,
  UniStickySectionElement as UniStickySectionElementImpl,
  UniStickyHeaderElement,
  UniStickyHeaderElement as UniStickyHeaderElementImpl,
  UniPageContainerElement,
  UniPageContainerElement as UniPageContainerElementImpl,
  //#endif
} from '@dcloudio/uni-components'

// Web Vapor 的 view、text、image 已由编译器降级为原生 DOM，不导出旧的 Vue 组件及其元素实现。
//#if !_X_VAPOR_
export { Image, Text, View } from '@dcloudio/uni-components'
//#endif

export { useI18n } from '@dcloudio/uni-core'

export { default as plugin } from './framework/plugin'

export * from './framework/setup'

export * from './view/components'

export * from './view/bridge'

//#if _X_
export * from './x/service/api'
export * from './x/service/api/uni'
//#endif

//#if _X_ && !_NODE_JS_
export * from './x/view/components/customElements'
//#endif

//#if !_X_
// @ts-expect-error
export * from './service/api'
// @ts-expect-error
export * from './service/api/uni'
//#endif

export * from './service/bridge'

export { getApp, getCurrentPages } from './framework'

//#if _X_VAPOR_
// @ts-expect-error 条件编译前两个分支会同时参与类型检查，构建后只保留一个导出
export { default as LayoutComponent } from './framework/components/layout/index-vapor.vue'
//#else
// @ts-expect-error 条件编译前两个分支会同时参与类型检查，构建后只保留一个导出
export { default as LayoutComponent } from './framework/components/layout/index'
//#endif
//#if _X_VAPOR_
// @ts-expect-error 条件编译前两个分支会同时参与类型检查，构建后只保留一个导出
export { default as PageComponent } from './framework/components/page/index-vapor.vue'
//#else
// @ts-expect-error 条件编译前两个分支会同时参与类型检查，构建后只保留一个导出
export { default as PageComponent } from './framework/components/page/index'
//#endif
export { default as AsyncErrorComponent } from './framework/components/async-error/asyncError.vue'
export { default as AsyncLoadingComponent } from './framework/components/async-loading/asyncLoading.vue'
export * from './framework/setup/state'
export { getRealPath } from './platform'
