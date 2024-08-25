import { once } from '@dcloudio/uni-shared'

/**
 * 主要文件路径分为如下四种
 * - 安装文件路径（仅能访问rawfile）鸿蒙$rawfile('index.html')对应一个Resource对象，为方便拼接路径，使用`resource://`协议表示
 * - 临时文件路径（temp）   系统api如下载、选择图片产生的压缩文件会存放于此处，应用退出后自动删除
 * - 缓存文件路径（cache）  用于存储图片缓存等，达到一定大小或时间会被系统自动清理
 * - 用户文件路径（files）  持久保存
 *
 * TODO fileManager、原生fs对象？沙箱
 *
 * 参考文档：
 * - [微信小程序文件系统](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/file-system.html)
 * - [鸿蒙应用沙箱目录](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory-0000001774280086)
 */

/**
 * 内部使用不暴露给用户
 */
const env = {
  // RESOURCE_PATH: 'resource://',
  // 以下路径均不以`/`结尾
  USER_DATA_PATH: '',
  TEMP_PATH: '', // 示例值 /data/storage/el2/base/haps/entry/temp
  CACHE_PATH: '',
}

function initEnv() {
  // @ts-expect-error getEnv for plus
  const plusIoEnv = plus.io.getEnv()
  env.USER_DATA_PATH = plusIoEnv.USER_DATA_PATH
  env.TEMP_PATH = plusIoEnv.TEMP_PATH
  env.CACHE_PATH = plusIoEnv.CACHE_PATH
  return env
}

const initEnvOnce = once(initEnv)

export function getEnv() {
  return initEnvOnce()
}
