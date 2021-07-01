import { initRouteMeta } from '../../src/helpers/page'

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
  test('initRouteMeta', () => {
    global.__uniConfig = initDefaultUniConfig()
    global.__uniConfig.globalStyle.navigationBar.titleText = 'uni-app'
    expect(
      initRouteMeta(
        {
          route: '',
          navigationBar: {},
        },
        1
      )
    ).toMatchSnapshot()
    expect(
      initRouteMeta(
        {
          route: '',
          navigationBar: { titleText: 'hello', titleColor: '#000000' },
          enablePullDownRefresh: true,
        },
        1
      )
    ).toMatchSnapshot()
    expect(
      initRouteMeta(
        {
          route: '',
          navigationBar: { titleColor: '#000000' },
          enablePullDownRefresh: true,
          pullToRefresh: {
            offset: 100,
          },
        },
        1
      )
    ).toMatchSnapshot()
  })
})
