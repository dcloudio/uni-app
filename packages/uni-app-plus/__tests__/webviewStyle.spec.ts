import { parseWebviewStyle } from '../src/service/framework/webview/style'
function initDefaultUniConfig() {
  return JSON.parse(
    JSON.stringify({
      globalStyle: {
        navigationBar: {},
      },
    })
  )
}
beforeAll(() => {
  global.__uniConfig = initDefaultUniConfig()
})
const defaultPath = '/pages/index/index'
const defaultRoute = 'pages/index/index'
describe('webviewStyle', () => {
  test('basic', () => {
    expect(
      parseWebviewStyle(
        defaultPath,
        {
          route: defaultRoute,
          navigationBar: {},
        },
        { id: '2' } as any
      )
    ).toMatchSnapshot()
  })
})
