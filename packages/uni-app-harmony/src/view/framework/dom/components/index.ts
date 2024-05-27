import { UniTextNode } from '@dcloudio/uni-app-plus/view/framework/dom/elements/UniTextNode'
import { UniComment } from '@dcloudio/uni-app-plus/view/framework/dom/elements/UniComment'
import { UniViewElement } from '@dcloudio/uni-app-plus/view/framework/dom/elements/UniViewElement'
import { UniButton } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniButton'
import { UniImage } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniImage'
import { UniTextElement } from '@dcloudio/uni-app-plus/view/framework/dom/elements/UniTextElement'
import { UniNavigator } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniNavigator'
import { UniRichText } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniRichText'
import { UniProgress } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniProgress'

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
}
