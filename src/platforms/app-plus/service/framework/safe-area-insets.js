export default {
  get bottom () {
    if (plus.os.name === 'iOS') {
      const safeArea = plus.navigator.getSafeAreaInsets()
      return safeArea ? safeArea.bottom : 0
    }
    return 0
  }
}
