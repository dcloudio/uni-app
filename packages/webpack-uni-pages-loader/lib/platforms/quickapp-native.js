module.exports = function (pagesJson, manifestJson, loader) {
  return require('@dcloudio/uni-quickapp-native/lib/manifest')(pagesJson, manifestJson, loader)
}
