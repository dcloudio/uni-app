import {
  BASE_COMPONENTS_STYLE_PATH,
  H5_API_STYLE_PATH,
  H5_COMPONENTS_STYLE_PATH,
  X_BASE_COMPONENTS_STYLE_PATH,
  X_VAPOR_BASE_COMPONENTS_STYLE_PATH,
} from './constants'
import { isUniAppXWebVapor } from './x'
import { hasWebVaporComponentStyle } from '@dcloudio/uni-shared'

const RESIZE_SENSOR_CSS = BASE_COMPONENTS_STYLE_PATH + 'resize-sensor.css'
const REFRESHER_CSS = BASE_COMPONENTS_STYLE_PATH + 'refresher.css'

const webVaporStyleComponents = new Set([
  'input',
  'textarea',
  'scroll-view',
  'video',
  'web-view',
  'ad',
])

// Easycom、API 和框架内部组件共用同一份路径选择，避免漏载或同时加载旧版与 Vapor 样式。
// 同步组件优先：将来接入内网实现后，自动使用其生成样式。
export function resolveWebVaporComponentStyle(name: string) {
  if (hasWebVaporComponentStyle(name)) {
    return X_VAPOR_BASE_COMPONENTS_STYLE_PATH + name + '.css'
  }
  if (webVaporStyleComponents.has(name)) {
    return H5_COMPONENTS_STYLE_PATH + 'vapor/' + name + '.css'
  }
}

function componentCss(name: string, isWebVapor: boolean) {
  return (
    (isWebVapor && resolveWebVaporComponentStyle(name)) ||
    BASE_COMPONENTS_STYLE_PATH + name + '.css'
  )
}

// 框架内部的 ScrollView 已在框架构建时编译，用户项目的 Easycom 不会再次扫描。
// Web Vapor 的外层组件或 API 需显式声明其完整样式及刷新依赖，避免发行裁剪时漏载。
function webVaporScrollViewCss() {
  return [
    componentCss('scroll-view', true),
    REFRESHER_CSS,
    componentCss('loading', true),
  ]
}

export const API_DEPS_CSS = (isX: boolean) => {
  // API 内部组件已随框架编译，需在项目使用该 API 时加载对应渲染模式的样式。
  const isWebVapor = isX && isUniAppXWebVapor()
  const scrollViewCss = isWebVapor ? webVaporScrollViewCss() : []
  const deps_css = {
    showModal: [] as string[],
    showToast: [`${H5_API_STYLE_PATH}toast.css`],
    showActionSheet: scrollViewCss,
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
    deps_css.showModal = [
      componentCss('textarea', isWebVapor),
      ...scrollViewCss,
    ]
    deps_css.chooseLocation = [
      `${BASE_COMPONENTS_STYLE_PATH}/view.css`,
      `${BASE_COMPONENTS_STYLE_PATH}/text.css`,
      isWebVapor
        ? componentCss('input', true)
        : `${BASE_COMPONENTS_STYLE_PATH}/input.css`,
      `${H5_COMPONENTS_STYLE_PATH}/map.css`,
      ...(isWebVapor
        ? scrollViewCss
        : [`${BASE_COMPONENTS_STYLE_PATH}/scroll-view.css`]),
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
  const scrollViewCss = isWebVapor ? webVaporScrollViewCss() : []
  // Refresher 在 Vapor 中直接使用 Loading，不能依赖页面另外引用 <loading> 才加载样式。
  const loadingCss = isWebVapor
    ? [X_VAPOR_BASE_COMPONENTS_STYLE_PATH + 'loading.css']
    : []
  return {
    canvas: [RESIZE_SENSOR_CSS],
    image: [RESIZE_SENSOR_CSS],
    'movable-area': [RESIZE_SENSOR_CSS],
    'picker-view': [RESIZE_SENSOR_CSS],
    'picker-view-column': [RESIZE_SENSOR_CSS, ...scrollViewCss],
    'rich-text': [RESIZE_SENSOR_CSS],
    textarea: [RESIZE_SENSOR_CSS],
    'web-view': [RESIZE_SENSOR_CSS],
    picker: [
      RESIZE_SENSOR_CSS,
      componentCss('picker-view', isWebVapor),
      componentCss('picker-view-column', isWebVapor),
      ...scrollViewCss,
    ],
    'scroll-view': [REFRESHER_CSS, ...loadingCss],
    'list-view': [
      RESIZE_SENSOR_CSS,
      ...(isWebVapor ? scrollViewCss : [REFRESHER_CSS]),
    ],
    ...(isWebVapor ? { waterflow: [RESIZE_SENSOR_CSS, ...scrollViewCss] } : {}),
  }
}
