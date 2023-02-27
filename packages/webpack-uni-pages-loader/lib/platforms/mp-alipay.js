const fs = require('fs')
const path = require('path')

const {
  parsePages,
  getPlatformProject
} = require('@dcloudio/uni-cli-shared')

const {
  updateAppJsonUsingComponents
} = require('@dcloudio/uni-cli-shared/lib/cache')

const {
  hasOwn,
  parseStyle,
  parseTabBar,
  NON_APP_JSON_KEYS
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
  preloadRule: defaultCopy,
  entryPagePath: defaultCopy
}

function copyToJson (json, fromJson, options) {
  Object.keys(options).forEach(name => {
    if (hasOwn(fromJson, name)) {
      options[name](name, fromJson[name], json)
    }
  })
}

function parseCondition (pagesJson) {
  const condition = pagesJson.condition
  const launchPagePath = process.env.UNI_CLI_LAUNCH_PAGE_PATH || ''
  const launchPageQuery = process.env.UNI_CLI_LAUNCH_PAGE_QUERY || ''
  const launchPageOptions = {
    title: launchPagePath,
    page: launchPagePath,
    pageQuery: launchPageQuery
  }
  const compileModeJson = {
    modes: []
  }
  if (condition && Array.isArray(condition.list) && condition.list.length) {
    compileModeJson.modes = condition.list.map(item => {
      return {
        title: item.name,
        page: item.path,
        pageQuery: item.query
      }
    })
    delete pagesJson.condition
  }
  if (launchPagePath) {
    compileModeJson.modes = [launchPageOptions]
  }
  const miniIdeDir = path.join(process.env.UNI_OUTPUT_DIR, '.mini-ide')
  if (!fs.existsSync(miniIdeDir)) {
    fs.mkdirSync(miniIdeDir, { recursive: true })
    fs.writeFileSync(
      path.join(miniIdeDir, 'compileMode.json'),
      JSON.stringify(compileModeJson, null, 2)
    )
  }
}

const projectKeys = ['component2', 'enableAppxNg']

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
    if (!projectKeys.includes(key) && !NON_APP_JSON_KEYS.includes(key)) {
      // usingComponents 是编译模式开关，需要过滤，不能拷贝到 app
      app[key] = platformJson[key]
    }
  })

  if (app.usingComponents) {
    updateAppJsonUsingComponents(app.usingComponents)
  }
  const projectName = getPlatformProject()

  let project = {}

  const projectPath = path.resolve(process.env.UNI_INPUT_DIR, projectName)
  if (fs.existsSync(projectPath)) {
    project = require(projectPath)
  } else {
    project.component2 = hasOwn(platformJson, 'component2') ? platformJson.component2 : true
    project.enableAppxNg = hasOwn(platformJson, 'enableAppxNg') ? platformJson.enableAppxNg : true
  }

  parseCondition(pagesJson)

  return [{
    name: 'app',
    content: app
  }, {
    name: 'mini.project',
    content: project
  }]
}
