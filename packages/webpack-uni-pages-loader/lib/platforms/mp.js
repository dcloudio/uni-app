const fs = require('fs')
const path = require('path')
const merge = require('merge')

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
  darkmode,
  hasTheme
} = require('@dcloudio/uni-cli-shared/lib/theme')

const {
  hasOwn,
  parseStyle,
  trimMPJson,
  NON_APP_JSON_KEYS
} = require('../util')

const uniI18n = require('@dcloudio/uni-cli-i18n')

function defaultCopy (name, value, json) {
  json[name] = value
}

function isPlainObject (a) {
  if (a === null) {
    return false
  }
  return typeof a === 'object'
}

function deepCopy (name, value, json) {
  if (isPlainObject(value) && isPlainObject(json[name])) {
    json[name] = merge.recursive(true, json[name], value)
  } else {
    defaultCopy(name, value, json)
  }
}

const pagesJson2AppJson = {
  globalStyle: function (name, value, json) {
    json.window = parseStyle(value)
    if (json.window.usingComponents || json.window.usingSwanComponents) {
      // 暂定 usingComponents 优先级高于 usingSwanComponents
      json.usingComponents = Object.assign({}, json.window.usingSwanComponents, json.window.usingComponents)
      delete json.window.usingComponents
      delete json.window.usingSwanComponents
    } else {
      json.usingComponents = {}
    }
  },
  tabBar: function (name, value, json, fromJson) {
    if (value && value.list && value.list.length) {
      if (value.list.length < 2) {
        console.error(
          uniI18n.__('pagesLoader.pagesTabbarMinItem2', {
            0: 'tabBar.list'
          })
        )
      }
      const pages = json.pages
      value.list.forEach((page, index) => {
        if (!pages.includes(page.pagePath)) {
          if (
            !(
              fromJson &&
              fromJson.nvue &&
              fromJson.nvue.pages &&
              fromJson.nvue.pages.find(
                ({
                  path
                }) => path === page.pagePath + '.html'
              )
            )
          ) {
            console.error(
              uniI18n.__('pagesLoader.needInPagesNode', {
                0: `pages.json tabBar['list'][${index}]['pagePath'] "${page.pagePath}"`
              })
            )
          }
        }
      })
    }
    json[name] = value
  },
  preloadRule: defaultCopy,
  workers: defaultCopy,
  plugins: defaultCopy,
  entryPagePath: defaultCopy
}

const manifestJson2AppJson = {
  networkTimeout: defaultCopy,
  debug: defaultCopy
}

function parseCondition (projectJson, pagesJson) {
  if (process.env.NODE_ENV === 'development') {
    // 仅开发期间 condition 生效
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
  setting: deepCopy,
  miniprogramRoot: defaultCopy,
  cloudfunctionRoot: defaultCopy,
  qcloudRoot: defaultCopy,
  pluginRoot: defaultCopy,
  compileType: defaultCopy,
  libVersion: defaultCopy,
  projectname: defaultCopy,
  packOptions: deepCopy,
  debugOptions: deepCopy,
  scripts: deepCopy,
  cloudbaseRoot: defaultCopy
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
          if (
            item.pathName === launchPagePath &&
            item.query === launchPageQuery
          ) {
            // 指定了入口页
            current = index
          }
        }
      })
      if (launchPagePath) {
        if (current !== -1) {
          // 已存在
          condition.current = current
        } else {
          // 不存在
          condition.list.push(
            Object.assign(launchPageOptions, {
              id: condition.list.length
            })
          )
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

function weixinSkyline (config) {
  return config.renderer === 'skyline' && config.lazyCodeLoading === 'requiredComponents'
}

function openES62ES5 (config) {
  if (!config.setting) {
    config.setting = {}
  }
  if (!config.setting.es6) {
    config.setting.es6 = true
  }
}

module.exports = function (pagesJson, manifestJson, project = {}) {
  const app = {
    pages: [],
    subPackages: []
  }

  const subPackages = {}

  parsePages(
    pagesJson,
    function (page) {
      app.pages.push(page.path)
    },
    function (root, page, subPackage) {
      if (!isSupportSubPackages()) {
        // 不支持分包
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
    }
  )

  Object.keys(subPackages).forEach(root => {
    app.subPackages.push(subPackages[root])
  })

  copyToJson(app, pagesJson, pagesJson2AppJson)

  copyToJson(app, manifestJson, manifestJson2AppJson)

  if (app.usingComponents) {
    updateAppJsonUsingComponents(app.usingComponents)
  }

  const themeLocation = (manifestJson[process.env.UNI_PLATFORM] || {}).themeLocation
  if (darkmode() && hasTheme(themeLocation)) {
    app.themeLocation = themeLocation || 'theme.json'
  }

  const projectName = getPlatformProject()

  const projectPath =
    projectName &&
    path.resolve(process.env.VUE_CLI_CONTEXT || process.cwd(), projectName)

  if (projectPath && fs.existsSync(projectPath)) {
    // 自定义 project.config.json
    const platform = process.env.UNI_PLATFORM

    // app-plus时不需要处理平台配置到 app 中
    if (platform !== 'app-plus' && hasOwn(manifestJson, platform)) {
      const platformJson = manifestJson[platform] || {}

      const projectKeys = Object.keys(platformJson2ProjectJson)

      Object.keys(platformJson).forEach(key => {
        if (
          !projectKeys.includes(key) && !NON_APP_JSON_KEYS.includes(key)
        ) {
          // usingComponents 是编译模式开关，需要过滤，不能拷贝到 app
          app[key] = platformJson[key]
        }
      })
    }

    if (
      platform === 'mp-weixin' ||
      platform === 'mp-qq'
    ) {
      // 微信不需要生成，其他平台做拷贝
      return {
        app: {
          name: 'app',
          content: trimMPJson(app)
        }
      }
    }
    return {
      app: {
        name: 'app',
        content: trimMPJson(app)
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
        if (
          !projectKeys.includes(key) && !NON_APP_JSON_KEYS.includes(key)
        ) {
          // usingComponents 是编译模式开关，需要过滤，不能拷贝到 app
          app[key] = platformJson[key]
        }
      })
    }

    // 引用了原生小程序组件，自动开启 ES6=>ES5
    const wxcomponentsPath = path.resolve(
      process.env.UNI_INPUT_DIR,
      './wxcomponents'
    )
    if (fs.existsSync(wxcomponentsPath)) {
      const wxcomponentsFiles = fs.readdirSync(wxcomponentsPath)
      if (wxcomponentsFiles.length) {
        if (!project.setting) {
          project.setting = {}
        }
        project.setting.es6 = true
      }
    }

    // 使用了微信小程序手势系统，自动开启 ES6=>ES5
    platform === 'mp-weixin' && weixinSkyline(manifestJson[platform]) && openES62ES5(project)

    if (process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
      if (!project.setting) {
        project.setting = {}
      }
      // automator时，强制不检测域名
      project.setting.urlCheck = false
    }

    if (!project.appid) {
      project.appid = 'touristappid'
    }

    return {
      app: {
        name: 'app',
        content: trimMPJson(app)
      },
      project: {
        name: 'project.config',
        content: project
      }
    }
  }
}
