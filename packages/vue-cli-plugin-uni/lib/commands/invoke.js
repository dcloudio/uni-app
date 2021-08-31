const fs = require('fs')
const path = require('path')
const uniI18n = require('@dcloudio/uni-cli-i18n')

module.exports = async function add (argv) {
  const pluginName = argv._[1]
  if (!pluginName) {
    console.error(uniI18n.__('pluginUni.pleaseSpecifyPluginName'))
    process.exit(0)
  }
  const pluginPkg = require(pluginName + '/package.json')
  const options = pluginPkg['uni-app']
  if (!options) {
    console.error(uniI18n.__('pluginUni.pluginIllegal'))
    process.exit(0)
  }
  const name = options.name
  if (!name) {
    console.error(uniI18n.__('pluginUni.pluginNameNotExist'))
    process.exit(0)
  }
  const scripts = options.scripts || {
    ['dev:' + name]: `cross-env NODE_ENV=development UNI_PLATFORM=${name} vue-cli-service uni-build --watch`,
    ['build:' + name]: `cross-env NODE_ENV=production UNI_PLATFORM=${name} vue-cli-service uni-build`
  }

  const pkgPath = path.resolve(process.cwd(), 'package.json')
  const pkg = require(pkgPath)
  if (!pkg.scripts) {
    pkg.scripts = {}
  }
  let changed = false
  Object.keys(scripts).forEach(script => {
    if (!pkg.scripts[script]) {
      changed = true
      pkg.scripts[script] = scripts[script]
    }
  })
  if (changed) {
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
  }
}
