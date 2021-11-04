import path from 'path'
import { extend, hasOwn } from '@vue/shared'

interface AppJson {
  appType: 'webapp'
  minPlatformVersion: 1070
  name: string
  package: string
  versionName: string
  versionCode: string
}

const properties = ['name', 'versionName', 'versionCode']
export function formatAppJson(
  _appJson: Record<string, any>,
  manifestJson: Record<string, any>,
  _pagesJson: Record<string, any>
) {
  const appJson = _appJson as AppJson & Record<string, any>
  // 华为IDE V3.0.2+ 需要此属性，否则无法导入
  appJson.appType = 'webapp'
  appJson.minPlatformVersion = 1070

  properties.forEach((name) => {
    if (hasOwn(manifestJson, name)) {
      appJson[name] = manifestJson[name]
    }
  })

  if (!appJson.name) {
    const inputDir = process.env.UNI_INPUT_DIR
    let projectname = path.basename(inputDir)
    if (projectname === 'src') {
      projectname = path.basename(path.dirname(inputDir))
    }
    appJson.name = projectname
  }

  if (!appJson.package) {
    appJson.package = appJson.name
  }
  if (manifestJson['quickapp-webview']) {
    extend(appJson, manifestJson['quickapp-webview'])
  }

  if (
    process.env.UNI_SUB_PLATFORM &&
    manifestJson[process.env.UNI_SUB_PLATFORM]
  ) {
    extend(appJson, manifestJson[process.env.UNI_SUB_PLATFORM])
  }

  if (!appJson.package) {
    console.warn('manifest.json->quickapp-webview 缺少 package 配置')
  }
  if (!appJson.icon) {
    console.warn('manifest.json->quickapp-webview 缺少 icon 配置')
  }
}
