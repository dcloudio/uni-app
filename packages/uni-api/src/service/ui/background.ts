export const API_SET_BACKGROUND_COLOR = 'setBackgroundColor'
export type API_TYPE_SET_BACKGROUND_COLOR = typeof uni.setBackgroundColor
export const SetBackgroundColorProtocol: ApiProtocol<API_TYPE_SET_BACKGROUND_COLOR> =
  {
    backgroundColor: {
      type: String,
    },
  }

export const API_SET_BACKGROUND_TEXT_STYLE = 'setBackgroundTextStyle'
export type API_TYPE_SET_BACKGROUND_TEXT_STYLE =
  typeof uni.setBackgroundTextStyle
export const SetBackgroundTextStyleProtocol: ApiProtocol<API_TYPE_SET_BACKGROUND_TEXT_STYLE> =
  {
    textStyle: {
      type: String,
      required: true,
    },
  }
