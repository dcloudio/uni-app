const fs = require('fs')
const path = require('path')

const glob = require('glob')
const loaderUtils = require('loader-utils')

const isWin = /^win/.test(process.platform)
const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

module.exports = function loader(source) {
  const options = loaderUtils.getOptions(this)
  const baseDir = options['base']
  const platformDir = options['platform']
  const extendsDir = options['extends']

  const components = []
  const extendsFiles = []
  // extends目录均导出
  glob.sync('**/index.vue', {
    cwd: extendsDir
  }).forEach(file => {
    extendsFiles.push(file)
    components.push(normalizePath(path.join(extendsDir, file)))
  })

  //base目录中有，extends无的导出
  glob.sync('**/index.vue', {
    cwd: baseDir
  }).forEach(file => {
    if (!extendsFiles.includes(file)) {
      components.push(normalizePath(path.join(baseDir, file)))
    }
  })
  //platform目录中有，extends无的导出
  glob.sync('**/index.vue', {
    cwd: platformDir
  }).forEach(file => {
    if (!extendsFiles.includes(file)) {
      components.push(normalizePath(path.join(platformDir, file)))
    }
  })

  const componentsCode = components.map(component => {
    return `require('${component}').default`
  }).join(',')
  return `
import Vue from 'vue'
import baseMixin from 'uni-mixins/base'
import animation from 'uni-mixins/animation'
[${componentsCode}].forEach(component=>{
    component.mixins = component.mixins ? [].concat(baseMixin, component.mixins) : [baseMixin]
    component.mixins.push(animation)
    component.name = 'VUni' + component.name
    component.isReserved = true
    Vue.component(component.name, component)
})
`
}
