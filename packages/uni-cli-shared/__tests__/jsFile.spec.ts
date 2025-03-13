import path from 'path'
import {
  addMiniProgramPageJson,
  findChangedJsonFiles,
  findUsingComponentsJson,
} from '../src/json/mp/jsonFile'
import xrStart from './examples/usingComponents/wxcomponents/xr-start/xr-start.json'
import xrStartIndex from './examples/usingComponents/wxcomponents/xr-start-index/index.json'

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

  describe('miniProgram:jsonFile:findUsingComponentsJson', () => {
    let oldInput = process.env.UNI_INPUT_DIR
    let input = path.resolve(__dirname, './examples/usingComponents')
    beforeAll(() => {
      process.env.UNI_INPUT_DIR = input
    })
    afterAll(() => {
      process.env.UNI_INPUT_DIR = oldInput
    })
    test(`miniProgram:jsonFile:findMiniProgramUsingComponents`, () => {
      let json = findUsingComponentsJson(
        '../wxcomponents/xr-start/xr-start',
        'wxcomponents'
      )
      expect(json).toEqual(xrStart)
      json = findUsingComponentsJson(
        '/wxcomponents/xr-start-index',
        'wxcomponents'
      )
      expect(json).toEqual(xrStartIndex)
      json = findUsingComponentsJson(
        '../wxcomponents/xr-start-index',
        'wxcomponents'
      )
      expect(json).toEqual(xrStartIndex)
      json = findUsingComponentsJson(
        '../wxcomponents/xr-start-error',
        'wxcomponents'
      )
      expect(json).toEqual({})
      json = findUsingComponentsJson(
        '../error-components/xr-start-index',
        'wxcomponents'
      )
      expect(json).toEqual({})
    })
  })
})
