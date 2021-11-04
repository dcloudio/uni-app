const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const priority = {
  'uni-shared': 100,
  'uni-app': 90,
  'uni-stat': 90,
  'uni-i18n': 90,
  'uni-mp-vue': 80,
  'uni-mp-alipay': 70,
  'uni-mp-baidu': 70,
  'uni-mp-kuaishou': 70,
  'uni-mp-qq': 70,
  'uni-mp-lark': 70,
  'uni-mp-toutiao': 70,
  'uni-mp-weixin': 70,
  'uni-quickapp-webview': 70,
  'uni-cli-shared': 60,
  'uni-cli-nvue': 55,
  'uni-h5': 50,
  'uni-h5-vite': 40,
  'uni-app-vue': 35,
  'uni-app-plus': 30,
  'uni-app-vite': 30,
  'uni-mp-vite': 30,
  'uni-mp-compiler': 35,
  'vite-plugin-uni': 20,
  'uni-cloud': 10,
  'uni-automator': 10,
  'size-check': 1,
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
