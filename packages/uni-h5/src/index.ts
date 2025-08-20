//#if _X_
import '@dcloudio/uni-uts-v1/lib/javascript/lib/runtime/uts.js'
//#endif

export {
  Button,
  Canvas,
  Checkbox,
  CheckboxGroup,
  Editor,
  Form,
  Icon,
  Image,
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
  Text,
  Textarea,
  View,
  //#if _X_
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
  //#endif
} from '@dcloudio/uni-components'

export { useI18n } from '@dcloudio/uni-core'

export { default as plugin } from './framework/plugin'

export * from './framework/setup'

export * from './view/components'

export * from './view/bridge'

//#if _X_
export * from './x/service/api'
export * from './x/service/api/uni'
export * from './x/view/components/customElements'
//#endif

//#if _X_ && !_NODE_JS_
export * from './x/view/components/customElements'
//#endif

//#if !_X_
export * from './service/api'
// @ts-expect-error
export * from './service/api/uni'
//#endif

export * from './service/bridge'

export { getApp, getCurrentPages } from './framework'

export { default as LayoutComponent } from './framework/components/layout/index'
export { default as PageComponent } from './framework/components/page/index'
export { default as AsyncErrorComponent } from './framework/components/async-error/index'
export { default as AsyncLoadingComponent } from './framework/components/async-loading'
export * from './framework/setup/state'
export { getRealPath } from './platform'
