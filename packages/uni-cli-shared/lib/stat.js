const { hasOwn } = require('./util')

/**
 * 解析统计 enable 开关。
 * 1. 子平台 uniStatistics.enable 显式存在 → 以子为准
 * 2. 否则根 uniStatistics.enable 显式存在 → 继承根
 * 3. 否则默认开启
 */
function resolveStatEnable (rootStat, platformStat) {
  if (platformStat && hasOwn(platformStat, 'enable')) {
    return platformStat.enable === true
  }
  if (rootStat && hasOwn(rootStat, 'enable')) {
    return rootStat.enable === true
  }
  return true
}

module.exports = {
  resolveStatEnable
}
