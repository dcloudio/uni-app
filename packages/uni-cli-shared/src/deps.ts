import {
  BASE_COMPONENTS_STYLE_PATH,
  H5_API_STYLE_PATH,
  H5_COMPONENTS_STYLE_PATH,
  X_BASE_COMPONENTS_STYLE_PATH,
  X_VAPOR_BASE_COMPONENTS_STYLE_PATH,
} from './constants'
import { isUniAppXWebVapor } from './x'
import { isDom2WebVueComponentTag } from '@dcloudio/uni-shared'

const RESIZE_SENSOR_CSS = BASE_COMPONENTS_STYLE_PATH + 'resize-sensor.css'
const REFRESHER_CSS = BASE_COMPONENTS_STYLE_PATH + 'refresher.css'

function componentCss(name: string, isWebVapor: boolean) {
  const stylePath =
    isWebVapor && isDom2WebVueComponentTag(name)
      ? X_VAPOR_BASE_COMPONENTS_STYLE_PATH
      : BASE_COMPONENTS_STYLE_PATH
  return stylePath + name + '.css'
}

export const API_DEPS_CSS = (isX: boolean) => {
  // API 内部直接使用框架组件，不经过 Easycom，也需加载对应渲染模式的样式。
  const isWebVapor = isX && isUniAppXWebVapor()
  const deps_css = {
    showModal: [] as string[],
    showToast: [`${H5_API_STYLE_PATH}toast.css`],
    showActionSheet: [] as string[],
    previewImage: [
      RESIZE_SENSOR_CSS,
      componentCss('swiper', isWebVapor),
      componentCss('swiper-item', isWebVapor),
      `${BASE_COMPONENTS_STYLE_PATH}movable-area.css`,
      `${BASE_COMPONENTS_STYLE_PATH}movable-view.css`,
    ],
    openLocation: [`${H5_API_STYLE_PATH}location-view.css`],
    chooseLocation: [] as string[],
    showLoading: [] as string[],
  }
  if (isX) {
    deps_css.showModal = [`${BASE_COMPONENTS_STYLE_PATH}textarea.css`]
    deps_css.chooseLocation = [
      `${BASE_COMPONENTS_STYLE_PATH}/view.css`,
      `${BASE_COMPONENTS_STYLE_PATH}/text.css`,
      `${BASE_COMPONENTS_STYLE_PATH}/input.css`,
      `${H5_COMPONENTS_STYLE_PATH}/map.css`,
      `${BASE_COMPONENTS_STYLE_PATH}/scroll-view.css`,
      `${BASE_COMPONENTS_STYLE_PATH}/image.css`,
    ]
    deps_css.showLoading = [
      `${
        isWebVapor
          ? X_VAPOR_BASE_COMPONENTS_STYLE_PATH
          : X_BASE_COMPONENTS_STYLE_PATH
      }loading.css`,
    ]
  } else {
    deps_css.showModal = [`${H5_API_STYLE_PATH}modal.css`]
    deps_css.showActionSheet = [`${H5_API_STYLE_PATH}action-sheet.css`]
    deps_css.chooseLocation = [
      `${H5_API_STYLE_PATH}/location-picker.css`,
      `${BASE_COMPONENTS_STYLE_PATH}/input.css`,
      `${H5_COMPONENTS_STYLE_PATH}/map.css`,
      `${BASE_COMPONENTS_STYLE_PATH}/scroll-view.css`,
    ]
  }
  return deps_css
}
export const COMPONENT_DEPS_CSS = (isX: boolean) => {
  const isWebVapor = isX && isUniAppXWebVapor()
  // Refresher 在 Vapor 中直接使用 Loading，不能依赖页面另外引用 <loading> 才加载样式。
  const loadingCss = isWebVapor
    ? [X_VAPOR_BASE_COMPONENTS_STYLE_PATH + 'loading.css']
    : []
  return {
    canvas: [RESIZE_SENSOR_CSS],
    image: [RESIZE_SENSOR_CSS],
    'movable-area': [RESIZE_SENSOR_CSS],
    'picker-view': [RESIZE_SENSOR_CSS],
    'picker-view-column': [RESIZE_SENSOR_CSS],
    'rich-text': [RESIZE_SENSOR_CSS],
    textarea: [RESIZE_SENSOR_CSS],
    'web-view': [RESIZE_SENSOR_CSS],
    picker: [
      RESIZE_SENSOR_CSS,
      componentCss('picker-view', isWebVapor),
      componentCss('picker-view-column', isWebVapor),
    ],
    'scroll-view': [REFRESHER_CSS, ...loadingCss],
    'list-view': [RESIZE_SENSOR_CSS, REFRESHER_CSS, ...loadingCss],
  }
}
