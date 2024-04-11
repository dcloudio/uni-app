import { I18N_JSON_DELIMITERS } from '@dcloudio/uni-shared'
import { compileI18nJsonStr, parseI18nJson } from '../src/json'
const delimiters: [string, string] = I18N_JSON_DELIMITERS
describe('parseI18nJson', () => {
  test('pages.json->style', () => {
    const pageMeta = parseI18nJson(
      {
        tabBarIndex: 0,
        bounce: 'vertical',
        navigationBar: {
          titleText: '%component.title%组件',
          buttons: [
            {
              text: '%component.btns.0.text%',
              fontSrc: '/static/uni.ttf',
              fontSize: '22px',
              color: '#FFFFFF',
            },
          ],
        },
        route: 'pages/tabBar/component/component',
      },
      {
        'component.title': '内置',
        'component.btns.0.text': '\ue534',
      },
      delimiters
    ) as Record<string, any>
    expect(pageMeta.navigationBar.titleText).toBe('内置组件')
    expect(pageMeta.navigationBar.buttons[0].text).toBe('\ue534')
  })
})
describe('compileI18nJsonStr', () => {
  test('empty', () => {
    expect(
      compileI18nJsonStr(JSON.stringify({}), {
        locale: '',
        locales: {},
        delimiters,
      })
    ).toBe('{}')
  })
  test('pages.json->tabBar', () => {
    expect(
      compileI18nJsonStr(
        JSON.stringify({
          color: '#7A7E83',
          selectedColor: '#007AFF',
          borderStyle: 'black',
          backgroundColor: '#%tabBar.backgroundColor%',
          list: [
            {
              pagePath: 'pages/tabBar/component/component',
              iconPath: 'static/component.png',
              selectedIconPath: 'static/componentHL.png',
              text: '%tabBar.0.title%',
            },
            {
              pagePath: 'pages/tabBar/API/API',
              iconPath: 'static/api.png',
              selectedIconPath: 'static/apiHL.png',
              text: '%tabBar.1.title%',
            },
          ],
        }),
        {
          locale: 'zh-Hans',
          locales: {
            'zh-Hans': {
              'tabBar.backgroundColor': 'f8f8f8',
              'tabBar.0.title': '组件',
              'tabBar.1.title': '接口',
            },
          },
          delimiters,
        }
      )
    ).toMatchSnapshot()
  })
  test('pages.json->tabBar with multi language', () => {
    expect(
      compileI18nJsonStr(
        JSON.stringify({
          color: '#7A7E83',
          selectedColor: '#007AFF',
          borderStyle: 'black',
          backgroundColor: '#%tabBar.backgroundColor%',
          list: [
            {
              pagePath: 'pages/tabBar/component/component',
              iconPath: 'static/component.png',
              selectedIconPath: 'static/componentHL.png',
              text: '%tabBar.0.title%',
            },
            {
              pagePath: 'pages/tabBar/API/API',
              iconPath: 'static/api.png',
              selectedIconPath: 'static/apiHL.png',
              text: '%tabBar.1.title%',
            },
          ],
        }),
        {
          locale: 'zh-Hans',
          locales: {
            'zh-Hans': {
              'tabBar.backgroundColor': 'f8f8f8',
              'tabBar.0.title': '组件',
              'tabBar.1.title': '接口',
            },
            en: {
              'tabBar.backgroundColor': 'f6f6f6',
              'tabBar.0.title': 'Component',
              'tabBar.1.title': 'API',
            },
          },
          delimiters,
        }
      )
    ).toMatchSnapshot()
  })

  test('androidPrivacy.json', () => {
    expect(
      compileI18nJsonStr(
        JSON.stringify({
          version: '1',
          prompt: 'template',
          title: '%p.title%',
          message: '　　%p.message%',
          buttonAccept: '%p.accept%',
          buttonRefuse: '%p.refuse%',
          second: {
            title: '%p.second.title%',
            message:
              '　　进入应用前，你需先同意<a href="">《服务协议》</a>和<a href="">《隐私政策》</a>，否则将退出应用。',
            buttonAccept: '同意并继续',
            buttonRefuse: '退出应用',
          },
          styles: {
            backgroundColor: '#00FF00',
            borderRadius: '5px',
            title: {
              color: '%p.title.color%',
            },
            buttonAccept: {
              color: '#ffff00',
            },
            buttonRefuse: {
              color: '#00ffff',
            },
          },
        }),
        {
          locale: 'zh-Hans',
          locales: {
            'zh-Hans': {
              'p.title': '服务协议和隐私政策',
              'p.message':
                '请你务必审慎阅读、充分理解“服务协议”和“隐私政策”各条款，包括但不限于：为了更好的向你提供服务，我们需要收集你的设备标识、操作日志等信息用于分析、优化应用性能。<br/>　　你可阅读<a href="">《服务协议》</a>和<a href="">《隐私政策》</a>了解详细信息。如果你同意，请点击下面按钮开始接受我们的服务。',
              'p.accept': '同意并接受',
              'p.refuse': '暂不同意',
              'p.second.title': '确认提示',
              'p.title.color': '#ff00ff',
            },
            en: {
              'p.title': 'Privacy',
              'p.message': 'privacy',
              'p.accept': 'accept',
              'p.refuse': 'refuse',
              'p.second.title': 'confirm',
              'p.title.color': '#ff00ff',
            },
          },
          delimiters,
        }
      )
    ).toMatchSnapshot()
  })
})
