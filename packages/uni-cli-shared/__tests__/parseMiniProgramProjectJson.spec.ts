/**
 * 用户设置的平台 manifest.json 根据模版区分
 * 分别放入 project.config.json 或者 app.json
 */

import { parseMiniProgramProjectJson } from '../src/json/mp/project'
import { recursive } from 'merge'
// xhs 的默认配置
import mpXhsConfig from '../../uni-mp-xhs/src/compiler/project.config.json'
const userManifestJSON = {
  name: 'uni-app',
  appid: '',
  description: '自定义描述',
  versionName: '1.0.0',
  versionCode: '100',
  transformPx: false,
  'mp-xhs': {
    appid: '自定义 appid',
    libVersion: '3.105.1',
    setting: {
      urlCheck: false,
      minified: true,
    },
    usingComponents: true,
    optimization: {
      subPackages: true,
    },
    _usePrivacyCheck_: true,
    permission: {
      'scope.userLocation': {
        desc: '小程序将会获取您的位置信息用于岗位列表的展示',
      },
    },
    requiredPrivateInfos: [
      'getLocation',
      'onLocationChange',
      'startLocationUpdate',
      'startLocationUpdateBackground',
      'chooseLocation',
      'choosePoi',
      'chooseAddress',
    ],
    plugins: {},
  },
  vueVersion: '3',
}
const platfrom = 'mp-xhs'

const pagesJson = {
  pages: [
    {
      path: 'pages/index/index',
      style: {
        navigationBarTitleText: 'uni-app',
        isNVue: false,
      },
    },
  ],

  globalStyle: {
    navigationBarTitleText: 'uni-app',
  },
} as any

describe('parseMiniProgramProjectJson', () => {
  it('测试自定义 manifest.json', () => {
    const options = {
      template: mpXhsConfig,
      pagesJson,
    }

    const projectJson = parseMiniProgramProjectJson(
      JSON.stringify(userManifestJSON),
      platfrom,
      options
    )

    expect(projectJson).toEqual({
      description: mpXhsConfig.description,
      appid: userManifestJSON['mp-xhs'].appid,
      packOptions: mpXhsConfig.packOptions,
      setting: recursive(
        true,
        mpXhsConfig.setting,
        userManifestJSON['mp-xhs'].setting
      ),
      compileType: mpXhsConfig.compileType,
      libVersion: userManifestJSON['mp-xhs'].libVersion,
      projectname: userManifestJSON.name,
      condition: mpXhsConfig.condition,
    })
  })
})
