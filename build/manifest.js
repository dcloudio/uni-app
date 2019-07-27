const fs = require('fs')
const path = require('path')

const apis = require('../src/core/helpers/apis')

function parseApiManifestDeps (manifest) {
  Object.keys(manifest).forEach(name => {
    const deps = manifest[name][1]
    if (deps && deps.length) {
      deps.forEach(dep => {
        if (manifest[dep[1]]) {
          dep[0] = manifest[dep[1]][0]
        } else {
          console.warn(`依赖模块[${dep[1]}]不存在`)
        }
      })
    }
  })
}

module.exports = {
  generateApiManifest (manifest) {
    parseApiManifestDeps(manifest)

    const manifestJson = Object.create(null)
    const todoApis = []
    apis.forEach(name => {
      if (manifest[name]) {
        manifestJson[name] = manifest[name]
      } else {
        todoApis.push(name)
      }
    })

    if (todoApis.length) {
      console.warn(`${process.env.UNI_PLATFORM} 平台缺少以下 API  实现`)
      todoApis.forEach(name => {
        console.warn(name)
      })
    }

    fs.writeFileSync(path.resolve(__dirname, '../packages/uni-h5/manifest.json'),
      JSON.stringify(manifestJson, null, 4)
    )
  }
}
