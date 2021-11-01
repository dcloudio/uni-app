const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const priority = {
  'uni-shared': 100,
  'uni-app': 90,
  'uni-stat': 90,
  'uni-i18n': 90,
  'uni-mp-vue': 90,
  'uni-cli-shared': 80,
  'uni-h5': 75,
  'uni-mp-vite': 75,
  'uni-mp-weixin': 70,
  'uni-cli-nvue': 70,
  'uni-mp-compiler': 70,
  'uni-mp-alipay': 60,
  'uni-mp-baidu': 60,
  'uni-mp-kuaishou': 60,
  'uni-mp-qq': 60,
  'uni-mp-toutiao': 60,
  'uni-quickapp-webview': 60,
  'uni-h5-vite': 70,
  'uni-app-vue': 70,
  'uni-app-plus': 70,
  'uni-app-vite': 70,
  'vite-plugin-uni': 70,
  'uni-cloud': 70,
  'uni-automator': 70,
  'size-check': 60,
}
exports.priority = priority

const targets = (exports.targets = fs.readdirSync('packages').filter((f) => {
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false
  }
  try {
    return (
      fs.existsSync(path.resolve(__dirname, `../packages/${f}/build.json`)) ||
      fs.existsSync(
        path.resolve(__dirname, `../packages/${f}/vite.config.ts`)
      ) ||
      fs.existsSync(path.resolve(__dirname, `../packages/${f}/tsconfig.json`))
    )
  } catch (e) {}
  return false
})).sort((a, b) => priority[b] - priority[a])
exports.fuzzyMatchTarget = (partialTargets, includeAllMatching) => {
  const matched = []
  partialTargets.forEach((partialTarget) => {
    for (const target of targets) {
      if (target.match(partialTarget)) {
        matched.push(target)
        if (!includeAllMatching) {
          break
        }
      }
    }
  })
  if (matched.length) {
    return matched.sort((a, b) => priority[b] - priority[a])
  } else {
    console.log()
    console.error(
      `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
        `Target ${chalk.underline(partialTargets)} not found!`
      )}`
    )
    console.log()

    process.exit(1)
  }
}
