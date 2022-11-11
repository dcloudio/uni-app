const { createSource } = require('../shared')

module.exports = function (compilation) {
  if (process.env.UNI_PLATFORM !== 'mp-alipay') {
    return
  }
  // fix mp-alipay plugin
  const appJsonName = 'app.json'
  const appJsonFile = compilation.getAsset(appJsonName)
  if (appJsonFile) {
    const componentName = 'plugin-wrapper'
    const obj = JSON.parse(appJsonFile.source.source())
    obj.usingComponents = obj.usingComponents || {}
    if (!(componentName in obj.usingComponents)) {
      obj.usingComponents[componentName] = `/${componentName}`
      const source = JSON.stringify(obj, null, 2)
      const newSource = createSource(source)
      compilation.updateAsset(appJsonName, newSource)
      const files = [
        {
          ext: 'axml',
          source: '<slot></slot>'
        },
        {
          ext: 'js',
          source: 'Component({onInit(){this.props.onPluginWrap(this)},didUnmount(){this.props.onPluginWrap(this,true)}})'
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
