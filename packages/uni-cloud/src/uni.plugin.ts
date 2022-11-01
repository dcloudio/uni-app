import path from 'path'
import { sync } from 'fast-glob'
import { isArray } from '@vue/shared'
import { once } from '@dcloudio/uni-shared'
import {
  isSsr,
  defineUniMainJsPlugin,
  COMMON_EXCLUDE,
  isInHybridNVue,
  uniViteInjectPlugin,
  UniVitePlugin,
  isInHBuilderX,
  isEnableSecureNetwork,
} from '@dcloudio/uni-cli-shared'

import { uniValidateFunctionPlugin } from './validateFunction'

const uniCloudSpaces: {
  provider?: string
  id: string
  name: string
  clientSecret?: string
  apiEndpoint?: string
}[] = []

const initUniCloudEnvOnce = once(initUniCloudEnv)

initUniCloudEnvOnce()

/**
 * @type {import('vite').Plugin}
 */
function uniCloudPlugin(): UniVitePlugin {
  return {
    name: 'uni:cloud',
    config(config) {
      const silent = config.build && config.build.ssr ? true : false
      if (silent) {
        return
      }
      const len = uniCloudSpaces.length
      if (!len) {
        return
      }
      if (isInHybridNVue(config)) {
        return
      }
      if (len === 1) {
        console.log(
          `本项目的uniCloud使用的默认服务空间spaceId为：${uniCloudSpaces[0].id}`
        )
      }
      if (
        process.env.UNI_PLATFORM === 'h5' &&
        !process.env.UNI_SUB_PLATFORM &&
        process.env.NODE_ENV === 'production'
      ) {
        console.warn(
          '发布到web端需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinh5'
        )
      }
      return {}
    },
    configureServer(server) {
      if (server.httpServer) {
        server.httpServer.on('listening', () => {
          process.nextTick(() => {
            initUniCloudWarningOnce()
          })
        })
      } else {
        initUniCloudWarningOnce()
      }
    },
    closeBundle() {
      if (process.env.UNI_PLATFORM === 'h5' && !process.env.UNI_SSR_CLIENT) {
        console.log()
        console.log(
          '欢迎将web站点部署到uniCloud前端网页托管平台，高速、免费、安全、省心，详见：https://uniapp.dcloud.io/uniCloud/hosting'
        )
      }
    },
  }
}

const initUniCloudWarningOnce = once(() => {
  uniCloudSpaces.length &&
    console.warn(
      '当前项目使用了uniCloud，为避免云函数调用跨域问题，建议在HBuilderX内置浏览器里调试，如使用外部浏览器需处理跨域，详见：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinh5'
    )
})

function checkProjectUniCloudDir() {
  return !!sync(['uniCloud-aliyun', 'uniCloud-tcb'], {
    cwd: isInHBuilderX()
      ? process.env.UNI_INPUT_DIR
      : process.env.UNI_CLI_CONTEXT,
    onlyDirectories: true,
    onlyFiles: false,
    ignore: ['node_modules'],
  }).length
}

function resolveUniCloudModules() {
  return sync('**/uni_modules/*/uniCloud', {
    cwd: process.env.UNI_INPUT_DIR,
    onlyDirectories: true,
    onlyFiles: false,
    ignore: ['node_modules'],
  }).map((dir) => path.dirname(dir))
}

function checkUniModules() {
  if (!checkProjectUniCloudDir()) {
    const uniCloudModules = resolveUniCloudModules()
    if (uniCloudModules.length) {
      console.warn(
        `${uniCloudModules.join(
          ', '
        )} 使用了uniCloud，而项目未启动uniCloud。需在项目点右键创建uniCloud环境`
      )
    }
  }
}

function initUniCloudEnv() {
  checkUniModules()
  if (process.env.UNI_CLOUD_PROVIDER) {
    const spaces = JSON.parse(process.env.UNI_CLOUD_PROVIDER)
    if (!isArray(spaces)) {
      return
    }
    if (spaces.length) {
      uniCloudSpaces.push(...spaces)
      return
    }
  }
  process.env.UNI_CLOUD_PROVIDER = JSON.stringify([])
  if (!process.env.UNI_CLOUD_SPACES) {
    return
  }
  try {
    const spaces = JSON.parse(process.env.UNI_CLOUD_SPACES)
    if (!isArray(spaces)) {
      return
    }
    spaces.forEach((s) => uniCloudSpaces.push(s))
    process.env.UNI_CLOUD_PROVIDER = JSON.stringify(
      uniCloudSpaces.map((space) => {
        if (space.provider === 'tcb') {
          space.provider = 'tencent'
        }
        if (space.clientSecret) {
          return {
            provider: space.provider || 'aliyun',
            spaceName: space.name,
            spaceId: space.id,
            clientSecret: space.clientSecret,
            endpoint: space.apiEndpoint,
          }
        } else {
          return {
            provider: space.provider || 'tencent',
            spaceName: space.name,
            spaceId: space.id,
          }
        }
      })
    )
  } catch (e) {}
}

export default () => [
  defineUniMainJsPlugin((opts) => {
    return {
      name: 'uni:cloud',
      enforce: 'pre',
      config(config, env) {
        if (isSsr(env.command, config)) {
          return
        }
        const inputDir = process.env.UNI_INPUT_DIR!
        const platform = process.env.UNI_PLATFORM!
        const isSecureNetworkEnabled = isEnableSecureNetwork(inputDir, platform)
        return {
          define: {
            'process.env.UNI_SECURE_NETWORK_ENABLE': isSecureNetworkEnabled,
            'process.env.UNI_SECURE_NETWORK_CONFIG':
              process.env.UNI_SECURE_NETWORK_CONFIG,
          },
        }
      },
      transform(code, id) {
        if (!opts.filter(id)) {
          return
        }
        if (uniCloudSpaces.length) {
          return {
            code: code + `;import '@dcloudio/uni-cloud';`,
            map: null,
          }
        }
      },
    }
  }),
  uniCloudPlugin(),
  uniViteInjectPlugin('uni:cloud-inject', {
    exclude: [...COMMON_EXCLUDE],
    uniCloud: ['@dcloudio/uni-cloud', 'default'],
  }),
  uniValidateFunctionPlugin(),
]
