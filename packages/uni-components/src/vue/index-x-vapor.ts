import Canvas, { UniCanvasElement } from './canvas/index-x'
import Editor, { UniEditorElement } from './editor/index'
import Icon, { UniIconElement } from './icon/index'
import MovableArea, { UniMovableAreaElement } from './movable-area/index'
import MovableView, { UniMovableViewElement } from './movable-view/index'
import ResizeSensor from './resize-sensor/index'
import RichText, { UniRichTextElement } from './rich-text'
import ScrollView, { UniScrollViewElement } from './scroll-view/index'
import ListView, { UniListViewElement } from './list-view/index'
import ListItem, { UniListItemElement } from './list-item/index'
import StickySection, { UniStickySectionElement } from './sticky-section/index'
import StickyHeader, { UniStickyHeaderElement } from './sticky-header/index'
import PageContainer from './page-container/index.vue'
import { UniPageContainerElement } from './page-container/element'
import Loading from './loading/index-x.vue'
import {
  UniImageElement,
  UniTextElement,
  UniViewElement,
} from './web-vapor-elements'

// 这里只保留尚未替换的组件；已接入的 DOM2 组件由生成入口导出。
export {
  Loading,
  Canvas,
  Editor,
  Icon,
  MovableArea,
  MovableView,
  ResizeSensor,
  RichText,
  ScrollView,
  ListView,
  ListItem,
  StickySection,
  StickyHeader,
  PageContainer,
  UniCanvasElement,
  UniCanvasElement as UniCanvasElementImpl,
  UniEditorElement,
  UniEditorElement as UniEditorElementImpl,
  UniIconElement,
  UniIconElement as UniIconElementImpl,
  UniImageElement,
  UniImageElement as UniImageElementImpl,
  UniMovableAreaElement,
  UniMovableAreaElement as UniMovableAreaElementImpl,
  UniMovableViewElement,
  UniMovableViewElement as UniMovableViewElementImpl,
  UniRichTextElement,
  UniRichTextElement as UniRichTextElementImpl,
  UniScrollViewElement,
  UniScrollViewElement as UniScrollViewElementImpl,
  UniTextElement,
  UniTextElement as UniTextElementImpl,
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
}
