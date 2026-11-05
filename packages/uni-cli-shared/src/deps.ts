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

function webVaporComponentCss(name: string) {
  return (
    resolveWebVaporComponentStyle(name) ||
    BASE_COMPONENTS_STYLE_PATH + name + '.css'
  )
}

export const API_DEPS_CSS = (isX: boolean): Record<string, string[]> =>
  isX && isUniAppXWebVapor() ? getVaporApiDepsCss() : getVdomApiDepsCss(isX)

// 两种渲染模式的内部组件不同，分别维护完整依赖，避免 Vapor 继承旧组件样式。
function getVdomApiDepsCss(isX: boolean) {
  const deps_css = {
    showModal: [] as string[],
    showToast: [`${H5_API_STYLE_PATH}toast.css`],
    showActionSheet: [] as string[],
    previewImage: [
      RESIZE_SENSOR_CSS,
      `${BASE_COMPONENTS_STYLE_PATH}swiper.css`,
      `${BASE_COMPONENTS_STYLE_PATH}swiper-item.css`,
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
    deps_css.showLoading = [`${X_BASE_COMPONENTS_STYLE_PATH}loading.css`]
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

function getVaporApiDepsCss() {
  // 内置页面自身的样式由 registerSystemRoute 安装；这里仅列需独立加载的组件 CSS。
  // 框架模板已预编译，项目的 Easycom 不会再次扫描，需随实际使用的 API 收集依赖。
  const scrollViewCss = webVaporComponentCss('scroll-view')
  const loadingCss = webVaporComponentCss('loading')
  return {
    showModal: [webVaporComponentCss('textarea'), scrollViewCss],
    showToast: [`${H5_API_STYLE_PATH}toast.css`],
    // Web 分支使用 View，只有 App 分支使用 ScrollView。
    showActionSheet: [],
    previewImage: [
      webVaporComponentCss('swiper'),
      webVaporComponentCss('swiper-item'),
      loadingCss,
    ],
    openLocation: [`${H5_COMPONENTS_STYLE_PATH}map.css`],
    chooseLocation: [
      webVaporComponentCss('input'),
      `${H5_COMPONENTS_STYLE_PATH}map.css`,
      scrollViewCss,
      loadingCss,
    ],
    showLoading: [loadingCss],
    // 写入剪贴板默认显示 Toast，框架内部调用不再单独收集 CSS。
    setClipboardData: [`${H5_API_STYLE_PATH}toast.css`],
  }
}

export const COMPONENT_DEPS_CSS = (isX: boolean): Record<string, string[]> =>
  isX && isUniAppXWebVapor()
    ? getVaporComponentDepsCss()
    : getVdomComponentDepsCss()

function getVdomComponentDepsCss() {
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
      `${BASE_COMPONENTS_STYLE_PATH}picker-view.css`,
      `${BASE_COMPONENTS_STYLE_PATH}picker-view-column.css`,
    ],
    'scroll-view': [REFRESHER_CSS],
    'list-view': [RESIZE_SENSOR_CSS, REFRESHER_CSS],
  }
}

function getVaporComponentDepsCss() {
  // View/Text/Image、ResizeSensor 已由 uvue-vapor.css 提供，不再加载旧版 CSS。
  // 这里只补充组件内部依赖；组件自身的 CSS 仍由 Easycom 直接引入。
  const scrollViewCss = webVaporComponentCss('scroll-view')
  return {
    'picker-view-column': [scrollViewCss],
    picker: [
      webVaporComponentCss('picker-view'),
      webVaporComponentCss('picker-view-column'),
      scrollViewCss,
    ],
    'list-view': [scrollViewCss],
    waterflow: [scrollViewCss],
  }
}
