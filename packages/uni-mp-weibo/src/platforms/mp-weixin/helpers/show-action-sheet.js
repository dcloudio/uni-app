export default {
  args (fromArgs) {
    if (typeof fromArgs === 'object') {
      fromArgs.alertText = fromArgs.title
    }
  }
}
