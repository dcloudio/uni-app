const {
  parsePages
} = require('@dcloudio/uni-cli-shared')

const {
  updateAppJsonUsingComponents
} = require('@dcloudio/uni-cli-shared/lib/cache')

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
    pages: [],
    subPackages: []
  }

  const subPackages = {}

  parsePages(pagesJson, function (page) {
    app.pages.push(page.path)
  }, function (root, page, subPackage) {
    if (!subPackages[root]) {
      subPackages[root] = {
        root,
        pages: []
      }
      Object.keys(subPackage).forEach(name => {
        if (['root', 'pages'].indexOf(name) === -1) {
          subPackages[root][name] = subPackage[name]
        }
      })
    }
    subPackages[root].pages.push(page.path)
  })

  Object.keys(subPackages).forEach(root => {
    app.subPackages.push(subPackages[root])
  })

  copyToJson(app, pagesJson, pagesJson2AppJson)
  
  const platformJson = manifestJson['mp-alipay'] || {}
  if (hasOwn(platformJson, 'plugins')) {
    app.plugins = platformJson.plugins
  }
  
  if (app.usingComponents) {
    updateAppJsonUsingComponents(app.usingComponents)
  }

  const project = Object.assign({}, manifestJson['mp-alipay'] || {})
  delete project.usingComponents
  delete project.plugins

  return [{
    name: 'app',
    content: app
  }, {
    name: 'mini.project',
    content: project
  }]
}
