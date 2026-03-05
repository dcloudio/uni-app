# uni-app x 原生 SDK 鸿蒙版

## 准备

- HBuilderX （4.71 版本及以上）
- DevEco Studio（5.0.2 版本及以上）
- 鸿蒙原生项目

---

说明：当前文档基于 DevEco Studio 5.0.4 Release 版本。

---

## 安装 SDK 依赖模块

修改鸿蒙项目根目录文件 oh-package.json5，添加 ohpm 依赖 "@dcloudio/uni-app-x-runtime": "版本号"，点击右上角 Sync Now，并等待 Sync 结束。

> 注意：请使用与导出资源所使用的 HBuilderX 版本对应的 SDK 版本，最低版本为 4.71。

```json
{
  "modelVersion": "5.0.4",
  "description": "Please describe the basic information.",
  "dependencies": {
    // 指定 4.71 版本
    "@dcloudio/uni-app-x-runtime": "4.71.*"
  },
  "devDependencies": {
    "@ohos/hypium": "1.0.21",
    "@ohos/hamock": "1.0.0"
  }
}
```

## 导入资源文件

打开 HBuilder X -> 发行 -> App-Harmony-本地打包 -> 生成本地打包 App 资源

导出成功之后会在项目的 unpackage/resources 目录下生成资源文件

将 uni-app x 生成的资源拷贝到 `entry/src/main/resources/resfile/uni-app-x/apps/你的APPID/www` 目录，如果没有此目录需手动创建。

编辑 entry/build-profile.json5 文件，在 buildOption 增加 arkOptions -> runtimeOnly -> sources 配置

```json
{
  "apiType": "stageMode",
  "buildOption": {
    "arkOptions": {
      "runtimeOnly": {
        "sources": [
          "./src/main/resources/resfile/uni-app-x/apps/你的APPID/www/import/app-config.ets",
          "./src/main/resources/resfile/uni-app-x/apps/你的APPID/www/import/app-service.ets"
        ]
      }
    }
  }
}
```

## 集成内置模块

根据[集成内置模块](../modules/harmony/modules.md)进行配置

## 集成 UTS 插件

根据[集成 UTS 插件](harmonyuts.md)制作插件库以及向主工程添加相关配置

## 启动与通信

根据[启动与通信](harmonyapi.md)进行相关配置
