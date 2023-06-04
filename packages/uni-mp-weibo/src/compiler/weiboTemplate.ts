import path from 'path'
import type { Plugin } from 'vite'
// @ts-ignore
import { copySync, emptyDirSync, readFileSync, writeFileSync } from 'fs-extra'
import CJSON from 'comment-json'
import { preJson } from './preprocess'

export default function uniWeiboSpecialPlugin(): Plugin {
  return {
    name: 'uni:weibo',
    enforce: 'pre',
    buildEnd() {
      const fileDIR = path.join(process.env.UNI_OUTPUT_DIR, '../', '../', '../')
      emptyDirSync(fileDIR)
      // 复制文件夹
      copySync(
        path.resolve('node_modules/@dcloudio/uni-mp-weibo/template'),
        fileDIR
      )
      // STAER: 读取用户在 manifest.json 中配置的 appid 并修改微博 wbox.config.json 中配置的 appid。
      const manifestJsonPath = path.join(
        process.env.UNI_INPUT_DIR,
        'manifest.json'
      )
      const manifestJson: any = CJSON.parse(
        readFileSync(manifestJsonPath, 'utf8')
      )
      if (manifestJson['mp-weibo'] && manifestJson['mp-weibo'].appid) {
        const mpWeiboAppid = manifestJson['mp-weibo'].appid
        const wboxConfigJsonPath = path.join(fileDIR, 'wbox.config.json')
        const wboxConfigJson: any = CJSON.parse(
          readFileSync(wboxConfigJsonPath, 'utf8')
        )
        wboxConfigJson.appId = mpWeiboAppid
        writeFileSync(
          wboxConfigJsonPath,
          CJSON.stringify(wboxConfigJson, null, 2)
        )
      }
      // END: 读取用户在 manifest.json 中配置的 appid 并修改微博 wbox.config.json 中配置的 appid。

      // STAER: 解析 pages.json 中的内容，生成 page 页面及 app.json 文件。
      const pagesJsonPath = path.join(process.env.UNI_INPUT_DIR, 'pages.json')
      const pagesJsonStr = readFileSync(pagesJsonPath, 'utf8')
      // preJson 处理 page.json 中的条件编译
      const pagesJson: any = CJSON.parse(preJson(pagesJsonStr))
      let pageOptions = pagesJson.pages
      if (pagesJson.subPackages && pagesJson.subPackages.length) {
        pagesJson.subPackages.forEach((subPackage: any) => {
          pageOptions = pageOptions.concat(
            subPackage.pages.map((item: any) => ({
              // eslint-disable-next-line no-restricted-syntax
              ...item,
              path: `${subPackage.root}/${item.path}`,
            }))
          )
        })
      }
      // ==> STAER: 根据 pages.json 生成 app.json
      const appPages = pageOptions.map((item: any) => item.path)
      const appJsonPath = path.join(fileDIR, 'src', 'app.json')
      const appJson: any = CJSON.parse(readFileSync(appJsonPath, 'utf8'))
      appJson.pages = appPages
      if (pagesJson.globalStyle) {
        appJson.window = Object.assign(appJson.window, pagesJson.globalStyle)
      }
      writeFileSync(appJsonPath, CJSON.stringify(appJson, null, 2))
      // ==> END: 根据 pages.json 生成 app.json

      // ==> STAER: 根据 pages.json 生成 pages 目录
      const templatePagePath = path.resolve(
        'node_modules/@dcloudio/uni-mp-weibo/template/src/pages/index/index'
      )
      const pageFileSuffixs = ['.vue', '.css', '.json']
      pageOptions.forEach((pageInfo: any) => {
        const targetPagePath = path.resolve(fileDIR, 'src', pageInfo.path)
        pageFileSuffixs.forEach((suffix) => {
          copySync(`${templatePagePath}${suffix}`, `${targetPagePath}${suffix}`)
          // 覆写 page.json 配置文件
          if (
            suffix === '.json' &&
            pageInfo.style &&
            Object.keys(pageInfo.style).length > 0
          ) {
            let pageJson: any = CJSON.parse(
              readFileSync(`${targetPagePath}${suffix}`, 'utf8')
            )
            pageJson = Object.assign(pageJson, pageInfo.style)
            writeFileSync(
              `${targetPagePath}${suffix}`,
              CJSON.stringify(pageJson, null, 2)
            )
          }
        })
      })
      // ==> END: 根据 pages.json 生成 pages 目录
      // END: 解析 pages.json 中的内容，生成 page 页面及 app.json 文件。
    },
  }
}
