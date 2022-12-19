const { createSource } = require('../shared')

module.exports = function (compilation) {
  if (process.env.UNI_PLATFORM !== 'mp-qq') {
    return
  }
  // fix mp-qq https://github.com/dcloudio/uni-app/issues/2648
  const appJsonName = 'app.json'
  const appJsonFile = compilation.getAsset(appJsonName)
  if (appJsonFile) {
    const componentName = 'fix-2648'
    const obj = JSON.parse(appJsonFile.source.source())
    obj.usingComponents = obj.usingComponents || {}
    if (!(componentName in obj.usingComponents)) {
      obj.usingComponents[componentName] = `/${componentName}`
      const source = JSON.stringify(obj, null, 2)
      const newSource = createSource(source)
      compilation.updateAsset(appJsonName, newSource)
      const files = [
        {
          ext: 'qml',
          source: '<!-- https://github.com/dcloudio/uni-app/issues/2648 -->'
        },
        {
          ext: 'js',
          source: 'Component({})'
        },
        {
          ext: 'json',
          source: '{"component":true}'
        }
      ]
      files.forEach(({ ext, source }) => {
        compilation.emitAsset(`${componentName}.${ext}`, createSource(source))
      })
    }
  }
}
