export function initDefaultManifestJson() {
  return JSON.parse(defaultManifestJson)
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
    "developer": {
        "name": "",
        "email": "",
        "url": ""
    },
    "permissions": {},
    "plus": {
        "useragent": {
            "value": "",
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
