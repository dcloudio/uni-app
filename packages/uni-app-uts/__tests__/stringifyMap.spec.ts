import { stringifyMap } from '../src/plugins/utils'

describe('stringifyMap', () => {
  test(`basic`, () => {
    expect(
      stringifyMap({
        color: '#7A7E83',
        selectedColor: '#3cc51f',
        borderStyle: 'black',
        backgroundColor: '#ffffff',
        list: [
          {
            pagePath: 'pages/component/index',
            iconPath: 'static/image/icon_component.png',
            selectedIconPath: 'static/image/icon_component_HL.png',
            text: '组件',
          },
          {
            pagePath: 'pages/API/index',
            iconPath: 'static/image/icon_API.png',
            selectedIconPath: 'static/image/icon_API_HL.png',
            text: '接口',
          },
        ],
      })
    ).toMatchSnapshot()
  })
})
