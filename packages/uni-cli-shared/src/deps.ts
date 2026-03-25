import {
  BASE_COMPONENTS_STYLE_PATH,
  H5_API_STYLE_PATH,
  H5_COMPONENTS_STYLE_PATH,
  X_BASE_COMPONENTS_STYLE_PATH,
} from './constants'

const RESIZE_SENSOR_CSS = BASE_COMPONENTS_STYLE_PATH + 'resize-sensor.css'
const REFRESHER_CSS = BASE_COMPONENTS_STYLE_PATH + 'refresher.css'

export const API_DEPS_CSS = (isX: boolean) => {
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
export const COMPONENT_DEPS_CSS = (isX: boolean) => {
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
