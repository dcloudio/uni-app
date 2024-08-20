import { UniTextNode } from '@dcloudio/uni-app-plus/view/framework/dom/elements/UniTextNode'
import { UniComment } from '@dcloudio/uni-app-plus/view/framework/dom/elements/UniComment'
import { UniViewElement } from '@dcloudio/uni-app-plus/view/framework/dom/elements/UniViewElement'
import { UniButton } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniButton'
import { UniImage } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniImage'
import { UniTextElement } from '@dcloudio/uni-app-plus/view/framework/dom/elements/UniTextElement'
import { UniNavigator } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniNavigator'
import { UniRichText } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniRichText'
import { UniProgress } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniProgress'
import { UniLabel } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniLabel'
import { UniCheckboxGroup } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniCheckboxGroup'
import { UniCheckbox } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniCheckbox'
import { UniRadio } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniRadio'
import { UniRadioGroup } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniRadioGroup'
import { UniSlider } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniSlider'
import { UniSwitch } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniSwitch'
import { UniInput } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniInput'
import { UniTextarea } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniTextarea'
import { UniForm } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniForm'
import { UniEditor } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniEditor'
import { UniPickerView } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniPickerView'
import { UniPickerViewColumn } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniPickerViewColumn'
import { UniScrollView } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniScrollView'
import { UniSwiper } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniSwiper'
import { UniSwiperItem } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniSwiperItem'
import { UniMovableArea } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniMovableArea'
import { UniMovableView } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniMovableView'
import { UniIcon } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniIcon'
import { UniWebView } from './UniWebView'
import { UniCanvas } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniCanvas'
import { UniVideo } from './UniVideo'
import { UniPicker } from './UniPicker'
import { UniMap } from './UniMap'
import { UniLocationPicker } from './UniLocationPicker'
import { UniLocationView } from './UniLocationView'
import { UniCoverImage } from './UniCoverImage'
import { UniCoverView } from './UniCoverView'

export const BuiltInComponents = {
  '#text': UniTextNode,
  '#comment': UniComment,
  VIEW: UniViewElement,
  BUTTON: UniButton,
  IMAGE: UniImage,
  TEXT: UniTextElement,
  NAVIGATOR: UniNavigator,
  'RICH-TEXT': UniRichText,
  PROGRESS: UniProgress,
  LABEL: UniLabel,
  CHECKBOX: UniCheckbox,
  'CHECKBOX-GROUP': UniCheckboxGroup,
  RADIO: UniRadio,
  'RADIO-GROUP': UniRadioGroup,
  SLIDER: UniSlider,
  SWITCH: UniSwitch,
  INPUT: UniInput,
  TEXTAREA: UniTextarea,
  FORM: UniForm,
  EDITOR: UniEditor,
  'PICKER-VIEW': UniPickerView,
  'PICKER-VIEW-COLUMN': UniPickerViewColumn,
  'SCROLL-VIEW': UniScrollView,
  SWIPER: UniSwiper,
  'SWIPER-ITEM': UniSwiperItem,
  'MOVABLE-AREA': UniMovableArea,
  'MOVABLE-VIEW': UniMovableView,
  ICON: UniIcon,
  'WEB-VIEW': UniWebView,
  CANVAS: UniCanvas,
  VIDEO: UniVideo,
  PICKER: UniPicker,
  MAP: UniMap,
  'LOCATION-PICKER': UniLocationPicker,
  'LOCATION-VIEW': UniLocationView,
  'COVER-IMAGE': UniCoverImage,
  'COVER-VIEW': UniCoverView,
}
