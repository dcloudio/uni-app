import {
  BASE_COMPONENTS_STYLE_PATH,
  H5_COMPONENTS_STYLE_PATH,
  MP_WEIBO_COMPONENTS_STYLE_PATH,
  H5_API_STYLE_PATH,
  MP_WEIBO_API_STYLE_PATH,
} from './constants'

const RESIZE_SENSOR_CSS = BASE_COMPONENTS_STYLE_PATH + 'resize-sensor.css'

export const API_DEPS_CSS = {
  showModal: [`${H5_API_STYLE_PATH}modal.css`],
  showToast: [`${H5_API_STYLE_PATH}toast.css`],
  showActionSheet: [`${H5_API_STYLE_PATH}action-sheet.css`],
  previewImage: [
    RESIZE_SENSOR_CSS,
    `${BASE_COMPONENTS_STYLE_PATH}swiper.css`,
    `${BASE_COMPONENTS_STYLE_PATH}swiper-item.css`,
    `${BASE_COMPONENTS_STYLE_PATH}movable-area.css`,
    `${BASE_COMPONENTS_STYLE_PATH}movable-view.css`,
  ],
  openLocation: [`${H5_API_STYLE_PATH}location-view.css`],
  chooseLocation: [
    `${H5_API_STYLE_PATH}/location-picker.css`,
    `${BASE_COMPONENTS_STYLE_PATH}/input.css`,
    `${H5_COMPONENTS_STYLE_PATH}/map.css`,
    `${BASE_COMPONENTS_STYLE_PATH}/scroll-view.css`,
  ],
}

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

export const WEIBO_API_DEPS_CSS = {
  showModal: [`${MP_WEIBO_API_STYLE_PATH}modal.css`],
  showToast: [`${MP_WEIBO_API_STYLE_PATH}toast.css`],
  showActionSheet: [`${MP_WEIBO_API_STYLE_PATH}action-sheet.css`],
  previewImage: [
    RESIZE_SENSOR_CSS,
    `${BASE_COMPONENTS_STYLE_PATH}swiper.css`,
    `${BASE_COMPONENTS_STYLE_PATH}swiper-item.css`,
    `${BASE_COMPONENTS_STYLE_PATH}movable-area.css`,
    `${BASE_COMPONENTS_STYLE_PATH}movable-view.css`,
  ],
  openLocation: [`${MP_WEIBO_API_STYLE_PATH}location-view.css`],
  chooseLocation: [
    `${MP_WEIBO_API_STYLE_PATH}/location-picker.css`,
    `${BASE_COMPONENTS_STYLE_PATH}/input.css`,
    `${MP_WEIBO_COMPONENTS_STYLE_PATH}/map.css`,
    `${BASE_COMPONENTS_STYLE_PATH}/scroll-view.css`,
  ],
}
