const fsExtra = require('fs-extra')
const path = require('path')
const parseJson = require('@dcloudio/uni-cli-shared/lib/json').parseJson

module.exports = {
  templateDeal: function (manifestPlatformOptions) {
    //  处理模版文件
    const weiboOutputDir = path.resolve(process.env.UNI_OUTPUT_DIR, '..', '..', '..')
    const weiboTemplatePath = path.resolve('node_modules/@dcloudio/uni-mp-weibo/template')
    // 删掉之前生成的文件夹
    fsExtra.emptyDirSync(weiboOutputDir)
    // 将模版文件夹复制到生成目录
    fsExtra.copySync(weiboTemplatePath, weiboOutputDir)
    // 根据用户manifest.json中的配置，修改小程序的appid
    const appId = manifestPlatformOptions && manifestPlatformOptions.appid
    if (appId) {
      try {
        const wboxConfigPath = path.join(weiboOutputDir, 'wbox.config.json')
        const wboxConfigJson = fsExtra.readJSONSync(wboxConfigPath)
        wboxConfigJson.appId = appId
        fsExtra.writeJSONSync(wboxConfigPath, wboxConfigJson, {
          spaces: 2
        })
      } catch (e) { }
    }
    // STAER: 解析 pages.json 中的内容，生成 page 页面及 app.json 文件。
    const pagesJsonStr = fsExtra.readFileSync(path.join(process.env.UNI_INPUT_DIR, 'pages.json'), 'utf8')
    // preJson 处理 page.json 中的条件编译
    path.join(process.env.UNI_INPUT_DIR, 'pages.json')
    const pagesJson = parseJson(pagesJsonStr)
    let pageOptions = pagesJson.pages
    if (pagesJson.subPackages && pagesJson.subPackages.length) {
      pagesJson.subPackages.forEach((subPackage) => {
        pageOptions = pageOptions.concat(
          subPackage.pages.map((item) => ({
            ...item,
            path: `${subPackage.root}/${item.path}`
          })))
      })
    }
    // ==> STAER: 根据 pages.json 生成 app.json
    const appPages = pageOptions.map((item) => item.path)
    const appJsonPath = path.join(weiboOutputDir, 'src', 'app.json')
    const appJson = fsExtra.readJSONSync(appJsonPath)
    appJson.pages = appPages
    if (pagesJson.globalStyle) {
      appJson.window = Object.assign(appJson.window, pagesJson.globalStyle)
    }
    fsExtra.writeJSONSync(appJsonPath, appJson, {
      spaces: 2
    })
    // ==> END: 根据 pages.json 生成 app.json

    // ==> STAER: 根据 pages.json 生成 pages 目录
    const templatePagePath = path.resolve(weiboTemplatePath, 'src/pages/index/index')
    const pageFileSuffixs = ['.vue', '.css', '.json']
    pageOptions.forEach((pageInfo) => {
      const targetPagePath = path.resolve(weiboOutputDir, 'src', pageInfo.path)
      pageFileSuffixs.forEach((suffix) => {
        fsExtra.copySync(`${templatePagePath}${suffix}`, `${targetPagePath}${suffix}`)
        // 覆写 page.json 配置文件
        if (
          suffix === '.json' && pageInfo.style && Object.keys(pageInfo.style).length > 0
        ) {
          let pageJson = fsExtra.readJSONSync(`${targetPagePath}${suffix}`, 'utf8')
          pageJson = Object.assign(pageJson, pageInfo.style)
          fsExtra.writeJSONSync(
            `${targetPagePath}${suffix}`,
            pageJson, {
              spaces: 2
            })
        }
      })
    })
  }
}
