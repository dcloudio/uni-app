const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const targets = (exports.targets = fs.readdirSync('packages').filter((f) => {
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false
  }
  try {
    return (
      fs.existsSync(path.resolve(__dirname, `../packages/${f}/build.json`)) ||
      fs.existsSync(path.resolve(__dirname, `../packages/${f}/build.js`))
    )
  } catch (e) {}
  return false
})).sort((a, b) =>
  a === 'uni-shared' || b === 'size-check'
    ? -1
    : a === 'size-check' || b === 'uni-shared'
    ? 1
    : a.localeCompare(b)
)
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
    return matched
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
