import { BASE_COMPONENTS_STYLE_PATH, H5_API_STYLE_PATH } from './constants'

export const API_STYLES = {
  showModal: [`${H5_API_STYLE_PATH}/modal.css`],
  showToast: [`${H5_API_STYLE_PATH}/toast.css`],
  showActionSheet: [`${H5_API_STYLE_PATH}/action-sheet.css`],
  previewImage: [
    `${BASE_COMPONENTS_STYLE_PATH}/swiper.css`,
    `${BASE_COMPONENTS_STYLE_PATH}/swiper-item.css`,
    `${BASE_COMPONENTS_STYLE_PATH}/movable-area.css`,
    `${BASE_COMPONENTS_STYLE_PATH}/movable-view.css`,
  ],
  openLocation: [`${H5_API_STYLE_PATH}/location-view.css`],
}
