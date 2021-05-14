export const API_CHOOSE_LOCATION = 'chooseLocation'
export type API_TYPE_CHOOSE_LOCATION = typeof uni.chooseLocation
export const ChooseLocationProtocol: ApiProtocol<API_TYPE_CHOOSE_LOCATION> = {
  keyword: String,
  latitude: Number,
  longitude: Number,
}
