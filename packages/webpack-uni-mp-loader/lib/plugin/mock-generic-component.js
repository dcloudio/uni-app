const path = require('path')
const {
  normalizePath,
  getPlatformExts
} = require('@dcloudio/uni-cli-shared')
const { createSource, deleteAsset } = require('../shared')

module.exports = function (compilation) {
  // 处理字节跳动|飞书小程序作用域插槽
  const fixExtname = '.fix'
  const fixSlots = {}
  compilation.getAssets().forEach((asset) => {
    const name = asset.name
    if (name.endsWith(fixExtname)) {
      const source = asset.source.source()
      const [ownerName, parentName, componentName, slotName] = source.split(',')
      const json = compilation.getAsset(ownerName + '.json')
      const jsonSource = json && json.source.source()
      if (jsonSource) {
        const data = JSON.parse(jsonSource)
        const usingComponents = data.usingComponents || {}
        const componentPath = normalizePath(path.relative('/', usingComponents[parentName]))
        const slots = fixSlots[componentPath] = fixSlots[componentPath] || {}
        const slot = slots[slotName] = slots[slotName] || {}
        slot[componentName] = '/' + name.replace(fixExtname, '')
        deleteAsset(compilation, name)

        const jsonName = `${componentPath}.json`
        const jsonFile = compilation.getAsset(jsonName)
        if (jsonFile) {
          const oldSource = jsonFile.source.source()
          const sourceObj = JSON.parse(oldSource)
          Object.values(slots).forEach(components => {
            const usingComponents = sourceObj.usingComponents = sourceObj.usingComponents || {}
            Object.assign(usingComponents, components)
          })
          delete sourceObj.componentGenerics
          const source = JSON.stringify(sourceObj, null, 2)
          compilation.updateAsset(jsonName, createSource(source))
        }

        const templateName = `${componentPath}${getPlatformExts().template}`
        const templateFile = compilation.getAsset(templateName)
        if (templateFile) {
          const oldSource = templateFile.source.source()
          let templateSource = oldSource
          Object.keys(slots).forEach(name => {
            const reg = new RegExp(`<${name} (.+?)></${name}>`)
            templateSource = oldSource.replace(reg, string => {
              const props = string.match(reg)[1]
              return Object.keys(slots[name]).map(key => {
                return `<block tt:if="{{generic['${name.replace(/^scoped-slots-/, '')}']==='${key}'}}"><${key} ${props}></${key}></block>`
              }).join('')
            })
          })
          compilation.updateAsset(templateName, createSource(templateSource))
        }
      }
    }
  })
}
