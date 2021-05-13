import { BASE_COMPONENTS_STYLE_PATH, H5_API_STYLE_PATH } from './constants'

export const API_DEPS_CSS = {
  showModal: [`${H5_API_STYLE_PATH}modal.css`],
  showToast: [`${H5_API_STYLE_PATH}toast.css`],
  showActionSheet: [`${H5_API_STYLE_PATH}action-sheet.css`],
  previewImage: [
    `${BASE_COMPONENTS_STYLE_PATH}swiper.css`,
    `${BASE_COMPONENTS_STYLE_PATH}swiper-item.css`,
    `${BASE_COMPONENTS_STYLE_PATH}movable-area.css`,
    `${BASE_COMPONENTS_STYLE_PATH}movable-view.css`,
  ],
  openLocation: [`${H5_API_STYLE_PATH}location-view.css`],
}

const RESIZE_SENSOR_CSS = BASE_COMPONENTS_STYLE_PATH + 'resize-sensor.css'

export const COMPONENT_DEPS_CSS = {
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
}
