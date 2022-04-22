export const pageScrollTo = {
  scrollTop: {
    type: Number
  },
  duration: {
    type: Number,
    default: 300,
    validator (duration, params) {
      params.duration = Math.max(0, duration)
    }
  }
}
