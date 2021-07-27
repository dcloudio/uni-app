export const API_SCAN_CODE = 'scanCode'
export type API_TYPE_SCAN_CODE = typeof uni.scanCode

export const ScanCodeProtocol: ApiProtocol<API_TYPE_SCAN_CODE> = {
  onlyFromCamera: Boolean,
  scanType: Array,
  autoDecodeCharSet: Boolean,
}
