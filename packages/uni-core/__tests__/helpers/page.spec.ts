import { mergePageMeta } from '../../src/helpers/page'

function initDefaultUniConfig() {
  return JSON.parse(
    JSON.stringify({
      globalStyle: {
        navigationBar: {},
      },
    })
  )
}

describe('page', () => {
  test('mergePageMeta', () => {
    global.__uniConfig = initDefaultUniConfig()
    global.__uniConfig.globalStyle.navigationBar.titleText = 'uni-app'
    expect(
      mergePageMeta(1, {
        route: '',
        navigationBar: {},
      })
    ).toMatchSnapshot()
    expect(
      mergePageMeta(1, {
        route: '',
        navigationBar: { titleText: 'hello', titleColor: '#000000' },
        enablePullDownRefresh: true,
      })
    ).toMatchSnapshot()
    expect(
      mergePageMeta(1, {
        route: '',
        navigationBar: { titleColor: '#000000' },
        enablePullDownRefresh: true,
        pullToRefresh: {
          offset: 100,
        },
      })
    ).toMatchSnapshot()
  })
})
