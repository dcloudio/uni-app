const isDef = v => v !== undefined
module.exports = api => {
  api.describeConfig({
    id: 'dcloudio.uni-app',
    name: 'uni-app',
    description: '配置 uni-app 项目',
    link: 'https://uniapp.dcloud.io/',
    icon: '/_plugin/%40dcloudio%2Fvue-cli-plugin-uni/logo.png',
    files: {
      manifest: {
        json: ['src/manifest.json']
      }
    },
    onRead: ({
      data: {
        manifest: {
          name,
          h5 = {}
        }
      }
    }) => ({
      tabs: [{
        id: 'h5',
        label: 'h5',
        icon: '/_plugin/%40dcloudio%2Fvue-cli-plugin-uni/h5.png',
        prompts: [{
          name: 'title',
          type: 'input',
          default: '',
          value: name || h5.title,
          message: '应用名称',
          description: '应用的名称',
          group: '基础设置',
          link: 'https://uniapp.dcloud.io/collocation/manifest?id=h5'
        }, {
          name: 'base',
          type: 'input',
          default: '/',
          value: h5.router && h5.router.base,
          message: 'Base Url',
          description: `应用的部署地址，如 '/my-app/'。如果留空，所有资源将使用相对路径。`,
          group: '基础设置',
          link: 'https://uniapp.dcloud.io/collocation/manifest?id=h5'
        }, {
          name: 'mode',
          type: 'list',
          default: 'hash',
          choices: [{
            name: 'hash',
            value: 'hash'
          },
          {
            name: 'history',
            value: 'history'
          }
          ],
          value: h5.router && h5.router.mode,
          message: '路由模式',
          description: '选择路由模式，history 模式需要服务器配置',
          group: '基础设置',
          link: 'https://uniapp.dcloud.io/collocation/manifest?id=h5'
        },
        {
          name: 'loading',
          type: 'input',
          default: 'AsyncLoading',
          value: h5['async'] && h5['async'].loading,
          message: '加载组件',
          description: '页面按需加载时显示的组件（需注册为全局组件）',
          group: '页面按需加载配置',
          link: 'https://uniapp.dcloud.io/collocation/manifest?id=h5-async'
        },
        {
          name: 'error',
          type: 'input',
          default: 'AsyncError',
          value: h5['async'] && h5['async'].error,
          message: '错误组件',
          description: '页面按需加载失败时显示的组件（需注册为全局组件）',
          group: '页面按需加载配置',
          link: 'https://uniapp.dcloud.io/collocation/manifest?id=h5-async'
        },
        {
          name: 'delay',
          type: 'input',
          default: 200,
          value: h5['async'] && h5['async'].delay,
          message: '延迟时间',
          description: '页面按需加载展示 loading 组件的延迟时间（页面 js 若在 delay 时间内加载完成，则不会显示 loading 组件）',
          group: '页面按需加载配置',
          link: 'https://uniapp.dcloud.io/collocation/manifest?id=h5-async'
        },
        {
          name: 'timeout',
          type: 'input',
          default: 3000,
          value: h5['async'] && h5['async'].timeout,
          message: '超时时间',
          description: '页面按需加载超时时间（超时后展示 error 对应的组件）',
          group: '页面按需加载配置',
          link: 'https://uniapp.dcloud.io/collocation/manifest?id=h5-async'
        }
        ]
      }]

    }),
    onWrite: async ({
      api,
      prompts
    }) => {
      const h5 = {}

      const title = await api.getAnswer('title')
      if (isDef(title)) {
        h5.title = title
      }

      const base = await api.getAnswer('base')
      const mode = await api.getAnswer('mode')
      if (isDef(base) || isDef(mode)) {
        h5.router = {}
        if (isDef(base)) {
          h5.router.base = base
        }
        if (isDef(mode)) {
          h5.router.mode = mode
        }
      }

      const loading = await api.getAnswer('loading')
      const error = await api.getAnswer('error')
      const delay = await api.getAnswer('delay')
      const timeout = await api.getAnswer('timeout')
      if (isDef(loading) || isDef(error) || isDef(delay) || isDef(timeout)) {
        h5['async'] = {}
        if (isDef(loading)) {
          h5['async'].loading = loading
        }
        if (isDef(error)) {
          h5['async'].error = error
        }
        if (isDef(delay)) {
          h5['async'].delay = delay
        }
        if (isDef(timeout)) {
          h5['async'].timeout = timeout
        }
      }

      api.setData('manifest', {
        h5
      })
    }
  })
}
