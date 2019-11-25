export const loadFontFace = {
  family: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  desc: {
    type: Object,
    required: false
  },
  success: {
    type: Function,
    required: false
  },
  fail: {
    type: Function,
    required: false
  },
  complete: {
    type: Function,
    required: false
  }
}
