import {
  validateProtocols,
  API_TYPE_ON_PROTOCOLS,
} from '../../src/helpers/protocol'
import { Upx2pxProtocol } from '../../src/protocols/base/upx2px'
import { CreateCanvasContextProtocol } from '../../src/protocols/context/context'
describe('protocol', () => {
  test('validate without protocol', () => {
    expect(validateProtocols('upx2px', [])).toBeFalsy()
  })
  test('validate upx2px', () => {
    expect(validateProtocols('upx2px', [1], Upx2pxProtocol)).toBeFalsy()
    expect(validateProtocols('upx2px', [], Upx2pxProtocol)).toEqual({
      errMsg: `upx2px:fail Missing required args: "upx"`,
    })
    expect(validateProtocols('upx2px', [true], Upx2pxProtocol)).toEqual({
      errMsg: `upx2px:fail Invalid args: type check failed for args "upx". Expected Number, String, got Boolean with value true.`,
    })
  })
  test('validate onLocationChange', () => {
    expect(
      validateProtocols('onLocationChange', [() => {}], API_TYPE_ON_PROTOCOLS)
    ).toBeFalsy()
    expect(
      validateProtocols('onLocationChange', [], API_TYPE_ON_PROTOCOLS)
    ).toEqual({
      errMsg: `onLocationChange:fail Missing required args: "callback"`,
    })
    expect(
      validateProtocols('onLocationChange', [1], API_TYPE_ON_PROTOCOLS)
    ).toEqual({
      errMsg: `onLocationChange:fail Invalid args: type check failed for args "callback". Expected Function, got Number with value 1.`,
    })
  })
  test('validate createCanvasContext', () => {
    expect(
      validateProtocols(
        'createCanvasContext',
        ['123'],
        CreateCanvasContextProtocol
      )
    ).toBeFalsy()
    expect(
      validateProtocols('createCanvasContext', [], CreateCanvasContextProtocol)
    ).toEqual({
      errMsg: `createCanvasContext:fail Missing required args: "canvasId"`,
    })
    expect(
      validateProtocols('createCanvasContext', [1], CreateCanvasContextProtocol)
    ).toEqual({
      errMsg: `createCanvasContext:fail Invalid args: type check failed for args "canvasId". Expected String with value "1", got Number with value 1.`,
    })
  })
})
