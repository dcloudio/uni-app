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
}
