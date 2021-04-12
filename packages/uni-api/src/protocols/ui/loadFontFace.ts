export const API_LOAD_FONT_FACE = 'loadFontFace'
export type API_TYPE_LOAD_FONT_FACE = typeof uni.loadFontFace
export const LoadFontFaceProtocol: ApiProtocol<API_TYPE_LOAD_FONT_FACE> = {
  family: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  desc: Object,
}
