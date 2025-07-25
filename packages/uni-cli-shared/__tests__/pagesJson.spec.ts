import path from 'path'
import { checkPagesJson } from '../src/json/utils'
import { generateCodeFrame } from '../src/vite/plugins/vitejs/utils'
import { options as alipayOptions } from '../../uni-mp-alipay/src/compiler/options'
import { options as weixinOptions } from '../../uni-mp-weixin/src/compiler/options'
import { parseWindowOptions } from '../src/json/mp/utils'

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
})
