export const iconProps = {
  type: {
    type: String,
    default: '',
  },
  size: {
    type: [String, Number],
    default: 23,
  },
  color: {
    type: String,
    default: '',
  },
}

export const iconColors: Record<string, string> = {
  success: '#09bb07',
  info: '#10aeff',
  warn: '#f76260',
  waiting: '#10aeff',
  safe_success: '#09bb07',
  safe_warn: '#ffbe00',
  success_circle: '#09bb07',
  success_no_circle: '#09bb07',
  waiting_circle: '#10aeff',
  circle: '#c9c9c9',
  download: '#09bb07',
  info_circle: '#09bb07',
  cancel: '#f43530',
  search: '#b2b2b2',
  clear: '#b2b2b2',
}
