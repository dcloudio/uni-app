export const API_SHOW_ACTION_SHEET = 'showActionSheet'
export type API_TYPE_SHOW_ACTION_SHEET = typeof uni.showActionSheet
export const ShowActionSheetProtocol: ApiProtocol<API_TYPE_SHOW_ACTION_SHEET> =
  {
    itemList: {
      type: Array,
      required: true,
    },
    title: String,
    itemColor: String,
    popover: Object,
  }
export const ShowActionSheetOptions: ApiOptions<API_TYPE_SHOW_ACTION_SHEET> = {
  formatArgs: {
    itemColor: '#000',
  },
}
