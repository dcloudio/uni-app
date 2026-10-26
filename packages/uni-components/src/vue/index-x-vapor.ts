import Canvas, { UniCanvasElement } from './canvas/index-vapor'
// 临时复用旧表单组件并编译为 Vapor；接入新 UVue 组件后删除对应导出及 form-vapor 适配。
import Button, { UniButtonElement } from './button/index-vapor'
import Input, { UniInputElement } from './input/index-vapor'
import Textarea, { UniTextareaElement } from './textarea/index-vapor'
import Editor, { UniEditorElement } from './editor/index-vapor'
import Icon, { UniIconElement } from './icon/index-vapor'
import MovableArea, { UniMovableAreaElement } from './movable-area/index-vapor'
import MovableView, { UniMovableViewElement } from './movable-view/index-vapor'
import ResizeSensor from './resize-sensor/index-vapor'
import RichText, { UniRichTextElement } from './rich-text/index-vapor'
import ScrollView, { UniScrollViewElement } from './scroll-view/index-vapor'
import {
  UniImageElement,
  UniTextElement,
  UniViewElement,
} from './web-vapor-elements'

// 这里只保留尚未替换的组件；已接入的 DOM2 组件由生成入口导出。
// TODO list-view 系列依赖 VNode 遍历，完成 Vapor 适配后再接入，不回退旧组件。
export {
  Button,
  Input,
  Textarea,
  UniButtonElement,
  UniButtonElement as UniButtonElementImpl,
  UniInputElement,
  UniInputElement as UniInputElementImpl,
  UniTextareaElement,
  UniTextareaElement as UniTextareaElementImpl,
  Canvas,
  Editor,
  Icon,
  MovableArea,
  MovableView,
  ResizeSensor,
  RichText,
  ScrollView,
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
}
