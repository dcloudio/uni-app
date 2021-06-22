import { recursive } from 'merge'
import { normalizeIdentifier } from '../utils'
export function normalizeAppManifestJson(
  userManifestJson: Record<string, any>
) {
  const manifestJson = getDefaultManifestJson()
  recursive(
    true,
    manifestJson,
    {
      id: userManifestJson.appid || '',
      name: userManifestJson.name || '',
      description: userManifestJson.description || '',
      version: {
        name: userManifestJson.versionName,
        code: userManifestJson.versionCode,
      },
    },
    { plus: userManifestJson['app-plus'] }
  )
  return manifestJson
}

const defaultManifestJson = `{
    "@platforms": [
        "android",
        "iPhone",
        "iPad"
    ],
    "id": "__WEAPP_ID",
    "name": "__WEAPP_NAME",
    "version": {
        "name": "1.0",
        "code": ""
    },
    "description": "",
    "launch_path": "__uniappservice.html",
    "developer": {
        "name": "",
        "email": "",
        "url": ""
    },
    "permissions": {},
    "plus": {
        "useragent": {
            "value": "uni-app appservice",
            "concatenate": true
        },
        "splashscreen": {
            "target":"id:1",
            "autoclose": true,
            "waiting": true,
            "alwaysShowBeforeRender":true
        },
        "popGesture": "close",
        "launchwebview": {}
    }
  }`

function getDefaultManifestJson() {
  return JSON.parse(defaultManifestJson)
}

export function normalizeAppPagesJson(pagesJson: Record<string, any>) {
  return polyfillCode + restoreGlobalCode + definePageCode(pagesJson)
}

function definePageCode(pagesJson: Record<string, any>) {
  const importPagesCode: string[] = []
  const definePagesCode: string[] = []
  pagesJson.pages.forEach((page: UniApp.UniRoute) => {
    const pagePath = page.path
    const pageIdentifier = normalizeIdentifier(pagePath)
    importPagesCode.push(
      `import ${pageIdentifier} from './${pagePath}.vue?mpType=page'`
    )
    definePagesCode.push(`__definePage('${pagePath}',${pageIdentifier})`)
  })
  return importPagesCode.join('\n') + '\n' + definePagesCode.join('\n')
}

const polyfillCode = `
if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
}
`
const restoreGlobalCode = `
if(uni.restoreGlobal){
  uni.restoreGlobal(weex,plus,setTimeout,clearTimeout,setInterval,clearInterval)
}
`
