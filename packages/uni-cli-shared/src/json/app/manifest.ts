import { recursive } from 'merge'
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
