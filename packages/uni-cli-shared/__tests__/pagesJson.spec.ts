import path from 'path'
import { checkPagesJson } from '../src/json/utils'
import { generateCodeFrame } from '../src/vite/plugins/vitejs/utils'
import { options as alipayOptions } from '../../uni-mp-alipay/src/compiler/options'
import { options as weixinOptions } from '../../uni-mp-weixin/src/compiler/options'
import { parseTabBar, parseWindowOptions } from '../src/json/mp/utils'

declare const process: {
  env: {
    UNI_HBUILDERX_LANGID?: string
  }
}

function checkPagesJsonByEnglish(source: string, inputDir: string) {
  process.env.UNI_HBUILDERX_LANGID = 'en'
  const result = checkPagesJson(source, inputDir)
  delete process.env.UNI_HBUILDERX_LANGID
  return result
}
describe('pages.json', () => {
  const inputDir = path.resolve(__dirname, './examples/check-pages-json')
  test(`pages check`, () => {
    const source = JSON.stringify(
      {
        pages: [
          {
            path: 'pages/index/index',
          },
          {
            path: 'pages/index/test',
          },
        ],
      },
      null,
      2
    )
    try {
      checkPagesJsonByEnglish(source, inputDir)
    } catch (error: any) {
      expect(error).toMatchSnapshot()
      expect(
        generateCodeFrame(
          source,
          error.offsetStart as number,
          error.offsetEnd as number
        ).replace(/\t/g, ' ')
      ).toMatchSnapshot()
    }
  })
  test(`subPackages check`, () => {
    const source = JSON.stringify(
      {
        subPackages: [
          {
            root: 'pages/API',
            pages: [
              {
                path: 'index/index',
              },
            ],
          },
        ],
      },
      null,
      2
    )
    try {
      checkPagesJsonByEnglish(source, inputDir)
    } catch (error: any) {
      expect(error).toMatchSnapshot()
      expect(
        generateCodeFrame(
          source,
          error.offsetStart as number,
          error.offsetEnd as number
        ).replace(/\t/g, ' ')
      ).toMatchSnapshot()
    }
  })
  test(`subpackages check`, () => {
    const source = JSON.stringify({
      subpackages: [
        {
          root: 'pages/API',
          pages: [
            {
              path: 'index/index',
            },
          ],
        },
      ],
    })
    try {
      checkPagesJsonByEnglish(source, inputDir)
    } catch (error: any) {
      expect(error).toMatchSnapshot()
      expect(
        generateCodeFrame(
          source,
          error.offsetStart as number,
          error.offsetEnd as number
        ).replace(/\t/g, ' ')
      ).toMatchSnapshot()
    }
  })

  test(`test alipay window options`, () => {
    const source = {
      navigationBarTextStyle: 'black',
      navigationBarTitleText: 'uni-app',
      navigationBarBackgroundColor: '#F8F8F8',
      backgroundColor: '#F8F8F8',
      enablePullDownRefresh: true,
      allowsBounceVertical: true,
      optionMenu: {
        icon: 'https://example.com/icon.png',
        items: [
          {
            name: 'menu1',
            text: '菜单1',
          },
        ],
      },
      usingComponents: {
        'custom-component': '/components/custom-component',
      },
      navigationBarShadow: {
        colorType: 'black',
      },
      titleImage: 'https://example.com/title.png',
      transparentTitle: 'always',
      titlePenetrate: true,
      'mp-alipay': {
        responsive: true,
        showTitleLoading: 'YES',
      },
      'mp-weixin': {
        visualEffectInBackground: 'hidden',
        backgroundColorTop: '#ffffff',
      },
    } as any
    const windowOptions = parseWindowOptions(
      source,
      'mp-alipay',
      alipayOptions.json!.windowOptionsMap
    )
    expect(windowOptions).toStrictEqual({
      defaultTitle: 'uni-app',
      navigationBarFrontColor: 'black',
      titleBarColor: '#F8F8F8',
      backgroundColor: '#F8F8F8',
      pullRefresh: true,
      allowsBounceVertical: true,
      optionMenu: {
        icon: 'https://example.com/icon.png',
        items: [
          {
            name: 'menu1',
            text: '菜单1',
          },
        ],
      },
      usingComponents: {
        'custom-component': '/components/custom-component',
      },
      navigationBarShadow: {
        colorType: 'black',
      },
      titleImage: 'https://example.com/title.png',
      transparentTitle: 'always',
      titlePenetrate: true,
      responsive: true,
      showTitleLoading: 'YES',
    })
  })

  test(`test weixin window options`, () => {
    const source = {
      navigationBarTextStyle: 'black',
      navigationBarTitleText: 'uni-app',
      navigationBarBackgroundColor: '#F8F8F8',
      backgroundColor: '#F8F8F8',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50,
      disableScroll: false,
      pageOrientation: 'auto',
      'mp-weixin': {
        visualEffectInBackground: 'hidden',
        backgroundColorTop: '#ffffff',
      },
    } as any
    const windowOptions = parseWindowOptions(
      source,
      'mp-weixin',
      weixinOptions.json?.windowOptionsMap
    )
    expect(windowOptions).toStrictEqual({
      navigationBarTextStyle: 'black',
      navigationBarTitleText: 'uni-app',
      navigationBarBackgroundColor: '#F8F8F8',
      backgroundColor: '#F8F8F8',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50,
      disableScroll: false,
      pageOrientation: 'auto',
      visualEffectInBackground: 'hidden',
      backgroundColorTop: '#ffffff',
    })
  })

  test(`test alipay tabBar options`, () => {
    const source = {
      color: '#7A7E83',
      selectedColor: '#007AFF',
      backgroundColor: '#F8F8F8',
      customize: 'customize',
      overlay: 'overlay',
      list: [
        {
          pagePath: 'pages/tabBar/component/component',
          iconPath: 'static/component.png',
          selectedIconPath: 'static/componentHL.png',
          text: '内置组件',
        },
        {
          pagePath: 'pages/tabBar/API/API',
          iconPath: 'static/api.png',
          selectedIconPath: 'static/apiHL.png',
          text: '接口',
        },
        {
          pagePath: 'pages/tabBar/extUI/extUI',
          iconPath: 'static/extui.png',
          selectedIconPath: 'static/extuiHL.png',
          text: '扩展组件',
        },
        {
          pagePath: 'pages/tabBar/template/template',
          iconPath: 'static/template.png',
          selectedIconPath: 'static/templateHL.png',
          text: '模板',
        },
      ],
    } as any
    const tabBar = parseTabBar(
      source,
      'mp-alipay',
      alipayOptions.json!.tabBarOptionsMap,
      alipayOptions.json!.tabBarItemOptionsMap
    )
    expect(tabBar).toStrictEqual({
      selectedColor: '#007AFF',
      textColor: '#7A7E83',
      backgroundColor: '#F8F8F8',
      customize: 'customize',
      overlay: 'overlay',
      items: [
        {
          pagePath: 'pages/tabBar/component/component',
          icon: 'static/component.png',
          activeIcon: 'static/componentHL.png',
          name: '内置组件',
        },
        {
          pagePath: 'pages/tabBar/API/API',
          icon: 'static/api.png',
          activeIcon: 'static/apiHL.png',
          name: '接口',
        },
        {
          pagePath: 'pages/tabBar/extUI/extUI',
          icon: 'static/extui.png',
          activeIcon: 'static/extuiHL.png',
          name: '扩展组件',
        },
        {
          pagePath: 'pages/tabBar/template/template',
          icon: 'static/template.png',
          activeIcon: 'static/templateHL.png',
          name: '模板',
        },
      ],
    })
  })

  test(`test weixin tabBar options`, () => {
    const source = {
      color: '#7A7E83',
      selectedColor: '#007AFF',
      backgroundColor: '#F8F8F8',
      list: [
        {
          pagePath: 'pages/tabBar/component/component',
          iconPath: 'static/component.png',
          selectedIconPath: 'static/componentHL.png',
          text: '内置组件',
        },
        {
          pagePath: 'pages/tabBar/API/API',
          iconPath: 'static/api.png',
          selectedIconPath: 'static/apiHL.png',
          text: '接口',
        },
        {
          pagePath: 'pages/tabBar/extUI/extUI',
          iconPath: 'static/extui.png',
          selectedIconPath: 'static/extuiHL.png',
          text: '扩展组件',
        },
        {
          pagePath: 'pages/tabBar/template/template',
          iconPath: 'static/template.png',
          selectedIconPath: 'static/templateHL.png',
          text: '模板',
        },
      ],
    } as any
    const tabBar = parseTabBar(
      source,
      'mp-weixin',
      weixinOptions.json?.tabBarOptionsMap,
      weixinOptions.json?.tabBarItemOptionsMap
    )
    expect(tabBar).toStrictEqual({
      color: '#7A7E83',
      selectedColor: '#007AFF',
      backgroundColor: '#F8F8F8',
      list: [
        {
          pagePath: 'pages/tabBar/component/component',
          iconPath: 'static/component.png',
          selectedIconPath: 'static/componentHL.png',
          text: '内置组件',
        },
        {
          pagePath: 'pages/tabBar/API/API',
          iconPath: 'static/api.png',
          selectedIconPath: 'static/apiHL.png',
          text: '接口',
        },
        {
          pagePath: 'pages/tabBar/extUI/extUI',
          iconPath: 'static/extui.png',
          selectedIconPath: 'static/extuiHL.png',
          text: '扩展组件',
        },
        {
          pagePath: 'pages/tabBar/template/template',
          iconPath: 'static/template.png',
          selectedIconPath: 'static/templateHL.png',
          text: '模板',
        },
      ],
    })
  })
})
