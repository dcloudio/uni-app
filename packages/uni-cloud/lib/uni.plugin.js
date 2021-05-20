const { once } = require('@dcloudio/uni-shared')
const { uniInjectPlugin } = require('@dcloudio/vite-plugin-uni')
/**
 * @type {import('vite').Plugin}
 */
const UniCloudPlugin = {
  name: 'vite:uni-cloud',
  config() {
    initUniCloudEnv()
    return {
      define: {
        'process.env.UNI_CLOUD_PROVIDER': JSON.stringify(
          process.env.UNI_CLOUD_PROVIDER
        ),
        'process.env.UNICLOUD_DEBUG': JSON.stringify(
          process.env.UNICLOUD_DEBUG
        ),
      },
    }
  },
  configureServer(server) {
    server.httpServer &&
      server.httpServer.on('listening', () => {
        if (!process.UNI_CLOUD) {
          return
        }
        process.nextTick(() => {
          initUniCloudWarningOnce()
        })
      })
  },
}

const initUniCloudWarningOnce = once(() => {
  console.warn(
    '当前项目使用了uniCloud，为避免云函数调用跨域问题，建议在HBuilderX内置浏览器里调试，如使用外部浏览器需处理跨域，详见：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5'
  )
})

function initUniCloudEnv() {
  process.UNI_CLOUD = false
  process.UNI_CLOUD_TCB = false
  process.UNI_CLOUD_ALIYUN = false
  process.env.UNI_CLOUD_PROVIDER = JSON.stringify([])

  if (!process.env.UNI_CLOUD_SPACES) {
    return
  }
  try {
    const spaces = JSON.parse(process.env.UNI_CLOUD_SPACES)
    if (Array.isArray(spaces)) {
      process.UNI_CLOUD = spaces.length > 0
      process.UNI_CLOUD_TCB = !!spaces.find((space) => !space.clientSecret)
      process.UNI_CLOUD_ALIYUN = !!spaces.find((space) => space.clientSecret)
      if (spaces.length === 1) {
        const space = spaces[0]
        console.log(`本项目的uniCloud使用的默认服务空间spaceId为：${space.id}`)
      }
      process.env.UNI_CLOUD_PROVIDER = JSON.stringify(
        spaces.map((space) => {
          if (space.clientSecret) {
            return {
              provider: 'aliyun',
              spaceName: space.name,
              spaceId: space.id,
              clientSecret: space.clientSecret,
              endpoint: space.apiEndpoint,
            }
          } else {
            return {
              provider: 'tencent',
              spaceName: space.name,
              spaceId: space.id,
            }
          }
        })
      )
    }
  } catch (e) {}
  if (
    process.UNI_CLOUD &&
    !process.env.UNI_SUB_PLATFORM &&
    process.env.UNI_PLATFORM === 'h5' &&
    process.env.NODE_ENV === 'production'
  ) {
    console.warn(
      '发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5'
    )
  }
}

module.exports = [
  UniCloudPlugin,
  uniInjectPlugin({
    uniCloud: ['@dcloudio/uni-cloud', 'default'],
  }),
]
