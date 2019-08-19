const path = require('path')

const {
  parsePages,
  normalizePath
} = require('@dcloudio/uni-cli-shared')

const {
  hasOwn,
  parseStyle,
  parseTabBar
} = require('../util')

const pagesJson2AppJson = {
  'globalStyle': function (name, value, json) {
    json['window'] = parseStyle(value)
    if (json['window'].usingComponents) {
      json['usingComponents'] = json['window'].usingComponents
      delete json['window']['usingComponents']
    }
  },
  'tabBar': function (name, value, json) {
    json['tabBar'] = parseTabBar(value)
  }
}

function copyToJson (json, fromJson, options) {
  Object.keys(options).forEach(name => {
    if (hasOwn(fromJson, name)) {
      options[name](name, fromJson[name], json)
    }
  })
}

module.exports = function (pagesJson, manifestJson) {
  const app = {
    pages: []
  }

  parsePages(pagesJson, function (page) {
    app.pages.push(page.path)
  }, function (root, page) {
    app.pages.push(normalizePath(path.join(root, page.path)))
  })

  copyToJson(app, pagesJson, pagesJson2AppJson)

  return [{
    name: 'app',
    content: app
  }]
}
