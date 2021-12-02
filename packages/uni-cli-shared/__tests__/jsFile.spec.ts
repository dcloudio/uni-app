import {
  addMiniProgramPageJson,
  findChangedJsonFiles,
} from '../src/json/mp/jsonFile'

describe('miniProgram:jsonFile', () => {
  const filename = 'pages/index/index'
  test(`usingComponents`, () => {
    const usingComponents = {
      subscribe: 'plugin://subscribeMsg/subscribe',
      demo: '/components/demo/demo',
    }
    addMiniProgramPageJson(filename, {
      usingComponents,
    })
    expect(JSON.parse(findChangedJsonFiles().get(filename)!)).toEqual({
      usingComponents: {
        subscribe: 'plugin://subscribeMsg/subscribe',
        demo: '../../components/demo/demo',
      },
    })
  })
})
