const fs = require('fs')
const path = require('path')
const {
  normalizePath,
  camelize,
  capitalize
} = require('../util')

function hasProjectYarn (cwd) {
  return fs.existsSync(path.join(cwd, 'yarn.lock'))
}

function hasProjectPnpm (cwd) {
  return fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))
}

function getInstallCommand (cwd) {
  return hasProjectYarn(cwd)
    ? 'yarn add'
    : hasProjectPnpm(cwd)
      ? 'pnpm i'
      : 'npm i'
}

function installDepTips (
  type,
  module,
  version
) {
  const command =
    `${getInstallCommand(process.cwd())} ${module + (version ? '@' + version : '')}${type === 'devDependencies' ? ' -D' : ''}`
  return `Cannot find module: ${module}
Please run \`${command}\` and try again.`
}

module.exports = {
  version: require('../../package.json').version,
  normalizePath,
  installDepTips,
  camelize,
  capitalize,
  isArray: Array.isArray
}
