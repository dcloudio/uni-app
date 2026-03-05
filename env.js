module.exports = {
    "is-custom-runtime": false,
    "UNI_TEST_CUSTOM_ENV": {
        // 以下3个配置项用于定义以App-WebView方式运行的H5页面地址，方便自动化测试App-WebView场景
        // "UNI_AUTOMATOR_APP_WEBVIEW": "true",
        // "UNI_WEB_SERVICE_URL": "http://xxx.com/xxx.html",
        // "UNI_AUTOMATOR_APP_WEBVIEW_SRC": "http://xxx.com/xxx.html"
    },
    "compile": true,
    "h5": {
        "options": {
            "headless": true
        },
        "executablePath": ""
    },
    "mp-weixin": {
        "port": 9420,
        "account": "",
        "args": "",
        "cwd": "",
        "launch": true,
        "teardown": "disconnect",
        "remote": false,
        "executablePath": ""
    },
    "app-plus": {
        "android": {
            "id": "",
            "executablePath": ""
        },
        "version": "",
        "ios": {
            "id": "",
            "executablePath": ""
        },
        "uni-app-x": {
            "version": "/Applications/HBuilderX-Dev.app/Contents/HBuilderX/plugins/uniappx-launcher/base/version.txt",
            "android": {
                "id": "emulator-5554",
                "executablePath": "/Applications/HBuilderX-Dev.app/Contents/HBuilderX/plugins/uniappx-launcher/base/android_base.apk"
            },
            "ios": {
                "id": "CA80343E-7D4C-401D-81BA-B5B7D446C11D",
                "executablePath": "/Applications/HBuilderX-Dev.app/Contents/HBuilderX/plugins/uniappx-launcher/base/Pandora_simulator.app"
            }
        }
    }
}
