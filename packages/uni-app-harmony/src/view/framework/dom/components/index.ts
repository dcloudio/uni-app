import { UniTextNode } from '@dcloudio/uni-app-plus/view/framework/dom/elements/UniTextNode'
import { UniComment } from '@dcloudio/uni-app-plus/view/framework/dom/elements/UniComment'
import { UniViewElement } from '@dcloudio/uni-app-plus/view/framework/dom/elements/UniViewElement'
import { UniButton } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniButton'
import { UniImage } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniImage'
import { UniTextElement } from '@dcloudio/uni-app-plus/view/framework/dom/elements/UniTextElement'
import { UniNavigator } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniNavigator'

export const BuiltInComponents = {
  '#text': UniTextNode,
  '#comment': UniComment,
  VIEW: UniViewElement,
  BUTTON: UniButton,
  IMAGE: UniImage,
  TEXT: UniTextElement,
  NAVIGATOR: UniNavigator,
}
