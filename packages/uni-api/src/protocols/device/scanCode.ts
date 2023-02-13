export const API_SCAN_CODE = 'scanCode'
export type API_TYPE_SCAN_CODE = typeof uni.scanCode

export const ScanCodeProtocol: ApiProtocol<API_TYPE_SCAN_CODE> = {
  onlyFromCamera: Boolean,
  scanType: Array,
  autoDecodeCharSet: Boolean,
  sound: String as any,
  autoZoom: Boolean,
}

const SOUND: NonNullable<Parameters<API_TYPE_SCAN_CODE>[0]>['sound'][] = [
  'default',
  'none',
]
export const ScanCodeOptions: ApiOptions<API_TYPE_SCAN_CODE> = {
  formatArgs: {
    sound(value, params) {
      if (!SOUND.includes(value)) params.sound = 'none'
    },
    autoZoom(value, params) {
      if (typeof value === 'undefined') params.autoZoom = true
    },
  },
}
