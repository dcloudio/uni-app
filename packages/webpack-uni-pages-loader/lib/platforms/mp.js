const fs = require('fs')
const path = require('path')

const {
  parsePages,
  normalizePath,
  getPlatformProject,
  isSupportSubPackages
} = require('@dcloudio/uni-cli-shared')

const {
  updateAppJsonUsingComponents
} = require('@dcloudio/uni-cli-shared/lib/cache')

const {
  hasOwn,
  parseStyle
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
    } else {
      json.usingComponents = {}
    }
  },
  tabBar: function (name, value, json, fromJson) {
    if (value && value.list && value.list.length) {
      if (value.list.length < 2) {
        console.error('tabBar.list 需至少包含2项')
      }
      const pages = json.pages
      value.list.forEach((page, index) => {
        if (!pages.includes(page.pagePath)) {
          if (
            !(
              fromJson &&
              fromJson.nvue &&
              fromJson.nvue.pages &&
              fromJson.nvue.pages.find(({
                path
              }) => path === (page.pagePath + '.html'))
            )
          ) {
            console.error(
              `pages.json tabBar['list'][${index}]['pagePath'] "${page.pagePath}" 需在 pages 数组中`
            )
          }
        }
      })
    }
    json[name] = value
  },
  preloadRule: defaultCopy,
  workers: defaultCopy
}

const manifestJson2AppJson = {
  networkTimeout: defaultCopy,
  debug: defaultCopy
}

function parseCondition (projectJson, pagesJson) {
  if (process.env.NODE_ENV === 'development') { // 仅开发期间 condition 生效
    // 启动Condition
    const condition = getCondition(pagesJson)
    if (condition) {
      if (!projectJson.condition) {
        projectJson.condition = {}
      }
      projectJson.condition.miniprogram = condition
    }
  }
}

const pagesJson2ProjectJson = {}

const manifestJson2ProjectJson = {

  name: function (name, value, json) {
    if (!value) {
      value = path.basename(process.env.UNI_INPUT_DIR)
      if (value === 'src') {
        value = path.basename(path.dirname(process.env.UNI_INPUT_DIR))
      }
    }
    json.projectname = value
  }
}

const platformJson2ProjectJson = {
  appid: defaultCopy,
  setting: defaultCopy,
  miniprogramRoot: defaultCopy,
  cloudfunctionRoot: defaultCopy,
  qcloudRoot: defaultCopy,
  pluginRoot: defaultCopy,
  compileType: defaultCopy,
  libVersion: defaultCopy,
  projectname: defaultCopy,
  packOptions: defaultCopy,
  debugOptions: defaultCopy,
  scripts: defaultCopy
}

function copyToJson (json, fromJson, options) {
  Object.keys(options).forEach(name => {
    if (hasOwn(fromJson, name)) {
      options[name](name, fromJson[name], json, fromJson)
    }
  })
}

function getCondition (pagesJson) {
  const condition = pagesJson.condition
  const launchPagePath = process.env.UNI_CLI_LAUNCH_PAGE_PATH || ''
  const launchPageQuery = process.env.UNI_CLI_LAUNCH_PAGE_QUERY || ''

  const launchPageOptions = {
    id: 0,
    name: launchPagePath, // 模式名称
    pathName: launchPagePath, // 启动页面，必选
    query: launchPageQuery // 启动参数，在页面的onLoad函数里面得到。
  }
  if (condition) {
    let current = -1
    if (Array.isArray(condition.list) && condition.list.length) {
      condition.list.forEach(function (item, index) {
        item.id = item.id || index
        if (item.path) {
          item.pathName = item.path
          delete item.path
        }
        if (launchPagePath) {
          if (item.pathName === launchPagePath && item.query === launchPageQuery) { // 指定了入口页
            current = index
          }
        }
      })
      if (launchPagePath) {
        if (current !== -1) { // 已存在
          condition.current = current
        } else { // 不存在
          condition.list.push(Object.assign(launchPageOptions, {
            id: condition.list.length
          }))
          condition.current = condition.list.length - 1
        }
      }
      return condition
    }
  }
  if (launchPagePath) {
    pagesJson.condition = {
      current: 0,
      list: [launchPageOptions]
    }
    return pagesJson.condition
  }
  return false
}

module.exports = function (pagesJson, manifestJson, project = {}) {
  const app = {
    pages: [],
    subPackages: []
  }

  const subPackages = {}

  parsePages(pagesJson, function (page) {
    app.pages.push(page.path)
  }, function (root, page, subPackage) {
    if (!isSupportSubPackages()) { // 不支持分包
      app.pages.push(normalizePath(path.join(root, page.path)))
    } else {
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
    }
  })

  Object.keys(subPackages).forEach(root => {
    app.subPackages.push(subPackages[root])
  })

  copyToJson(app, pagesJson, pagesJson2AppJson)

  copyToJson(app, manifestJson, manifestJson2AppJson)

  if (app.usingComponents) {
    updateAppJsonUsingComponents(app.usingComponents)
  }

  const projectName = getPlatformProject()

  const projectPath = projectName && path.resolve(process.env.VUE_CLI_CONTEXT || process.cwd(), projectName)

  if (projectPath && fs.existsSync(projectPath)) { // 自定义 project.config.json
    const platform = process.env.UNI_PLATFORM

    // app-plus时不需要处理平台配置到 app 中
    if (platform !== 'app-plus' && hasOwn(manifestJson, platform)) {
      const platformJson = manifestJson[platform] || {}

      const projectKeys = Object.keys(platformJson2ProjectJson)

      Object.keys(platformJson).forEach(key => {
        if (
          !projectKeys.includes(key) && ['usingComponents', 'optimization'].indexOf(key) === -1
        ) {
          // usingComponents 是编译模式开关，需要过滤，不能拷贝到 app
          app[key] = platformJson[key]
        }
      })
    }

    if (process.env.UNI_PLATFORM === 'mp-weixin' || process.env.UNI_PLATFORM === 'mp-qq') { // 微信不需要生成，其他平台做拷贝
      return {
        app: {
          name: 'app',
          content: app
        }
      }
    }
    return {
      app: {
        name: 'app',
        content: app
      },
      project: {
        name: 'project.config',
        content: require(projectPath)
      }
    }
  } else {
    parseCondition(project, pagesJson)

    copyToJson(project, pagesJson, pagesJson2ProjectJson)

    copyToJson(project, manifestJson, manifestJson2ProjectJson)

    const platform = process.env.UNI_PLATFORM

    // app-plus时不需要处理平台配置到 app 中
    if (platform !== 'app-plus' && hasOwn(manifestJson, platform)) {
      const platformJson = manifestJson[platform] || {}

      copyToJson(project, platformJson, platformJson2ProjectJson)

      const projectKeys = Object.keys(platformJson2ProjectJson)

      Object.keys(platformJson).forEach(key => {
        if (!projectKeys.includes(key) && ['usingComponents', 'optimization'].indexOf(key) === -1) {
          // usingComponents 是编译模式开关，需要过滤，不能拷贝到 app
          app[key] = platformJson[key]
        }
      })
    }

    // 引用了原生小程序组件，自动开启 ES6=>ES5
    const wxcomponentsPath = path.resolve(process.env.UNI_INPUT_DIR, './wxcomponents')
    if (fs.existsSync(wxcomponentsPath)) {
      const wxcomponentsFiles = fs.readdirSync(wxcomponentsPath)
      if (wxcomponentsFiles.length) {
        if (!project.setting) {
          project.setting = {}
        }
        project.setting.es6 = true
      }
    }

    if (!project.appid) {
      project.appid = 'touristappid'
    }

    return {
      app: {
        name: 'app',
        content: app
      },
      project: {
        name: 'project.config',
        content: project
      }
    }
  }
}
