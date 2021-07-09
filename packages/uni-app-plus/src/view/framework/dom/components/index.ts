import { defineComponent, h } from 'vue'
import { UniComment } from '../elements/UniComment'
import { UniTextNode } from '../elements/UniTextNode'
import { UniViewElement } from '../elements/UniViewElement'
import { UniAd } from './UniAd'
import { UniAudio } from './UniAudio'
import { UniButton } from './UniButton'
import { UniCamera } from './UniCamera'
import { UniCanvas } from './UniCanvas'
import { UniCheckbox } from './UniCheckbox'
import { UniCheckboxGroup } from './UniCheckboxGroup'
import { UniCoverImage } from './UniCoverImage'
import { UniCoverView } from './UniCoverView'
import { UniEditor } from './UniEditor'
import { UniForm } from './UniForm'
import { UniFunctionalPageNavigator } from './UniFunctionalPageNavigator'
import { UniIcon } from './UniIcon'
import { UniImage } from './UniImage'
import { UniInput } from './UniInput'
import { UniLabel } from './UniLabel'
import { UniLivePlayer } from './UniLivePlayer'
import { UniLivePusher } from './UniLivePusher'
import { UniMap } from './UniMap'
import { UniMovableArea } from './UniMovableArea'
import { UniMovableView } from './UniMovableView'
import { UniNavigator } from './UniNavigator'
import { UniOfficialAccount } from './UniOfficialAccount'
import { UniOpenData } from './UniOpenData'
import { UniPicker } from './UniPicker'
import { UniPickerView } from './UniPickerView'
import { UniPickerViewColumn } from './UniPickerViewColumn'
import { UniProgress } from './UniProgress'
import { UniRadio } from './UniRadio'
import { UniRadioGroup } from './UniRadioGroup'
import { UniRichText } from './UniRichText'
import { UniScrollView } from './UniScrollView'
import { UniSlider } from './UniSlider'
import { UniSwiper } from './UniSwiper'
import { UniSwiperItem } from './UniSwiperItem'
import { UniSwitch } from './UniSwitch'
import { UniText } from './UniText'
import { UniTextarea } from './UniTextarea'
import { UniVideo } from './UniVideo'
import { UniWebView } from './UniWebView'

export interface UniCustomElement extends Element {
  __id: number
  __listeners: Record<string, (evt: Event) => void>
}

const BuiltInComponents = [
  ,
  UniViewElement,
  UniImage,
  UniText,
  UniTextNode,
  UniComment,
  UniNavigator,
  UniForm,
  UniButton,
  UniInput,
  UniLabel,
  UniRadio,
  UniCheckbox,
  UniCheckboxGroup,
  UniAd,
  UniAudio,
  UniCamera,
  UniCanvas,
  UniCoverImage,
  UniCoverView,
  UniEditor,
  UniFunctionalPageNavigator,
  UniIcon,
  UniRadioGroup,
  UniLivePlayer,
  UniLivePusher,
  UniMap,
  UniMovableArea,
  UniMovableView,
  UniOfficialAccount,
  UniOpenData,
  UniPicker,
  UniPickerView,
  UniPickerViewColumn,
  UniProgress,
  UniRichText,
  UniScrollView,
  UniSlider,
  UniSwiper,
  UniSwiperItem,
  UniSwitch,
  UniTextarea,
  UniVideo,
  UniWebView,
]

export type WrapperComponent = ReturnType<typeof createWrapper>

export function createBuiltInComponent(type: number, id: number) {
  return new BuiltInComponents[type]!(id)
}

export function createWrapper(
  component: ReturnType<typeof defineComponent>,
  props: Record<string, any>
) {
  return () => h(component, props)
}
