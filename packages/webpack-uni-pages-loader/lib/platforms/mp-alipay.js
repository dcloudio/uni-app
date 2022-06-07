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

function defaultCopy (name, value, json) {
  json[name] = value
}

const pagesJson2AppJson = {
  globalStyle: function (name, value, json) {
    json.window = parseStyle(value)
    if (json.window.usingComponents) {
      json.usingComponents = json.window.usingComponents
      delete json.window.usingComponents
    }
  },
  tabBar: function (name, value, json) {
    json.tabBar = parseTabBar(value)
  },
  preloadRule: defaultCopy
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

  Object.keys(platformJson).forEach(key => {
    if (
      ['usingComponents', 'optimization', 'uniStatistics', 'appid'].indexOf(key) === -1
    ) {
      // usingComponents 是编译模式开关，需要过滤，不能拷贝到 app
      app[key] = platformJson[key]
    }
  })

  if (app.usingComponents) {
    updateAppJsonUsingComponents(app.usingComponents)
  }

  const project = Object.assign({}, manifestJson['mp-alipay'] || {})
  delete project.usingComponents
  delete project.plugins
  delete project.useDynamicPlugins
  if (!hasOwn(project, 'component2')) {
    project.component2 = true
  }
  if (!hasOwn(project, 'enableAppxNg')) {
    project.enableAppxNg = true
  }

  return [{
    name: 'app',
    content: app
  }, {
    name: 'mini.project',
    content: project
  }]
}
