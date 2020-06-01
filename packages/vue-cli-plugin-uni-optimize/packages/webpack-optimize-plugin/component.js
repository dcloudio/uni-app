const fs = require('fs')
const path = require('path')

const {
  camelize,
  capitalize
} = require('./util')

const platformTags = ['audio', 'map', 'video', 'web-view', 'cover-view', 'cover-image', 'picker']

const autoloadTags = {
  // input 在 pageHead 中有使用，resize-sensor 在很多组件中有使用，暂时直接加载
  root: ['input', 'resize-sensor'],
  other: {
    picker: ['picker-view', 'picker-view-column']
  }
}

module.exports = function updateComponents (tags) {
  autoloadTags.root.forEach(tagName => {
    tags.add(tagName)
  })
  Object.keys(autoloadTags.other).forEach(tagName => {
    if (tags.has(tagName)) {
      autoloadTags.other[tagName].forEach(tag => tags.add(tag))
    }
  })
  tags = [...tags]
  const importsStr = tags.map(tagName => {
    if (platformTags.indexOf(tagName) !== -1) {
      return `import ${capitalize(camelize(tagName))} from 'uni-platform/view/components/${tagName}'`
    }
    return `import ${capitalize(camelize(tagName))} from 'uni-view/components/${tagName}'`
  }).join('\n')

  const componentsStr = tags.map(tagName => {
    tagName = capitalize(camelize(tagName))
    return `${tagName}.name = 'VUni${tagName}'
     ${tagName}.mixins = ${tagName}.mixins ? [].concat(baseMixin, ${tagName}.mixins) : [baseMixin]
     ${tagName}.mixins.push(animation)
     Vue.component(${tagName}.name,${tagName})`
  }).join('\n')

  const content = `
import Vue from 'vue'
import baseMixin from 'uni-mixins/base'
import animation from 'uni-mixins/animation'
${importsStr}
${componentsStr}
`
  const dir = path.resolve(__dirname, '../../.tmp')

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  fs.writeFileSync(path.resolve(dir, 'components.js'), content, 'utf8')
}
