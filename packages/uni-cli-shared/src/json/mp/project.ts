import { hasOwn, isArray, isPlainObject } from '@vue/shared'
import { recursive } from 'merge'
import { parseJson } from '../json'

interface ParseMiniProgramProjectJsonOptions {
  template: Record<string, any>
  pagesJson: UniApp.PagesJson
}
interface ProjectConfig {
  appid: string
  projectname: string
  condition?: {
    miniprogram?: UniApp.PagesJson['condition']
  }
}

export const projectKeys = [
  'appid',
  'setting',
  'miniprogramRoot',
  'cloudfunctionRoot',
  'qcloudRoot',
  'pluginRoot',
  'compileType',
  'libVersion',
  'projectname',
  'packOptions',
  'debugOptions',
  'scripts',
  'cloudbaseRoot',
  'watchOptions',
]

export function isMiniProgramProjectJsonKey(name: string) {
  return projectKeys.includes(name)
}

export function parseMiniProgramProjectJson(
  jsonStr: string,
  platform: UniApp.PLATFORM,
  { template, pagesJson }: ParseMiniProgramProjectJsonOptions
) {
  const projectJson = JSON.parse(JSON.stringify(template)) as ProjectConfig
  const manifestJson = parseJson(jsonStr, false, '')
  if (manifestJson) {
    projectJson.projectname = manifestJson.name
    // 用户的平台配置
    const platformConfig = manifestJson[platform]
    if (platformConfig) {
      const setProjectJson = (name: string) => {
        if (hasOwn(platformConfig, name)) {
          if (
            isPlainObject(platformConfig[name]) &&
            isPlainObject((projectJson as Record<string, any>)[name])
          ) {
            ;(projectJson as Record<string, any>)[name] = recursive(
              true,
              (projectJson as Record<string, any>)[name],
              platformConfig[name]
            )
          } else {
            ;(projectJson as Record<string, any>)[name] = platformConfig[name]
          }
        }
      }

      // 读取 template 中的配置
      Object.keys(template).forEach((name) => {
        if (!projectKeys.includes(name)) {
          projectKeys.push(name)
        }
      })

      // common mp config
      projectKeys.forEach((name) => {
        setProjectJson(name)
      })

      // 使用了微信小程序手势系统，自动开启 ES6=>ES5
      platform === 'mp-weixin' &&
        weixinSkyline(platformConfig) &&
        openES62ES5(projectJson)
    }
  }
  // 其实仅开发期间 condition 生效即可，暂不做判断
  const miniprogram = parseMiniProgramCondition(pagesJson)
  if (miniprogram) {
    if (!projectJson.condition) {
      projectJson.condition = {}
    }
    projectJson.condition.miniprogram = miniprogram
  }

  // appid
  if (!projectJson.appid) {
    projectJson.appid = 'touristappid'
  }
  return projectJson
}

function weixinSkyline(config: any) {
  return (
    config.renderer === 'skyline' &&
    config.lazyCodeLoading === 'requiredComponents'
  )
}

function openES62ES5(config: any) {
  if (!config.setting) {
    config.setting = {}
  }
  if (!config.setting.es6) {
    config.setting.es6 = true
  }
}

function parseMiniProgramCondition(pagesJson: UniApp.PagesJson) {
  const launchPagePath = process.env.UNI_CLI_LAUNCH_PAGE_PATH || ''
  if (launchPagePath) {
    return {
      current: 0,
      list: [
        {
          id: 0,
          name: launchPagePath, // 模式名称
          pathName: launchPagePath, // 启动页面，必选
          query: process.env.UNI_CLI_LAUNCH_PAGE_QUERY || '', // 启动参数，在页面的onLoad函数里面得到。
        },
      ],
    }
  }
  const condition = pagesJson.condition
  if (!condition || !isArray(condition.list) || !condition.list.length) {
    return
  }
  condition.list.forEach(function (item, index) {
    item.id = item.id || index
    if (item.path) {
      item.pathName = item.path
      delete item.path
    }
  })
  return condition
}
