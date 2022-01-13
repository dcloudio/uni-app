import { hasOwn, isArray } from '@vue/shared'
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

const projectKeys = [
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
  const manifestJson = parseJson(jsonStr)
  if (manifestJson) {
    projectJson.projectname = manifestJson.name
    const platformConfig = manifestJson[platform]
    if (platformConfig) {
      projectKeys.forEach((name) => {
        if (hasOwn(platformConfig, name)) {
          ;(projectJson as Record<string, any>)[name] = platformConfig[name]
        }
      })
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
  if (!projectJson.appid) {
    projectJson.appid = 'touristappid'
  }
  return projectJson
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
