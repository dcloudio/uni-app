const {
  error
} = require('@vue/cli-shared-utils')

const Service = require('@vue/cli-service')

const del = require('del')
const copy = require('copy')
const path = require('path')
const jsonfile = require('jsonfile')

const {
  generateApiManifest
} = require('./manifest')

const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd(), {
  inlineOptions: require('./vue.config.js')
})
// 删除 cache 目录
del.sync(['node_modules/.cache'])

service.run('build', {
  name: 'index',
  watch: process.env.UNI_WATCH === 'true',
  target: 'lib',
  formats: process.env.UNI_WATCH === 'true' ? 'umd' : 'umd-min',
  entry: './lib/' + process.env.UNI_PLATFORM + '/main.js'
}).then(function () {
  generateApiManifest(
    JSON.parse(JSON.stringify(process.UNI_SERVICE_API_MANIFEST)),
    JSON.parse(JSON.stringify(process.UNI_SERVICE_API_PROTOCOL))
  )
}).catch(err => {
  error(err)
  process.exit(1)
})

if (process.env.UNI_WATCH === 'false') {
  const packagePath = path.join(__dirname, `../packages/uni-${process.env.UNI_PLATFORM}`)
  const packageJsonPath = path.join(packagePath, 'package.json')
  del(path.join(packagePath, '{lib,src}'))
    .then(() => {
      copy([path.join(__dirname, '../{lib,src}/**/*')], packagePath, function (err, file) {
        if (err) {
          throw err
        }
      })
    })
  jsonfile.readFile(path.join(__dirname, '../package.json'))
    .then(origin => {
      return jsonfile.readFile(packageJsonPath)
        .then(obj => {
          obj.dependencies = origin.dependencies
          return obj
        })
    })
    .then(obj => {
      return jsonfile.writeFile(packageJsonPath, obj, {
        spaces: 2
      })
    })
    .catch(err => {
      throw err
    })
}
