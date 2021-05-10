import { validateProtocols } from '../../src/helpers/protocol'
import { Upx2pxProtocol } from '../../src/protocols/base/upx2px'
import { CreateCanvasContextProtocol } from '../../src/protocols/context/context'
describe('protocol', () => {
  test('validate without protocol', () => {
    expect(validateProtocols('upx2px', [])).toBeFalsy()
  })
  test('validate upx2px', () => {
    expect(validateProtocols('upx2px', [1], Upx2pxProtocol)).toBeFalsy()
    validateProtocols('upx2px', [], Upx2pxProtocol, (name, msg) => {
      expect(name).toBe('upx2px')
      expect(msg).toBe(`Missing required args: "upx"`)
    })
    validateProtocols('upx2px', [true], Upx2pxProtocol, (_name, msg) => {
      expect(msg).toBe(
        `Invalid args: type check failed for args "upx". Expected Number, String, got Boolean with value true.`
      )
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
    validateProtocols(
      'createCanvasContext',
      [],
      CreateCanvasContextProtocol,
      (_name, msg) => {
        expect(msg).toBe(`Missing required args: "canvasId"`)
      }
    )

    validateProtocols(
      'createCanvasContext',
      [1],
      CreateCanvasContextProtocol,
      (_name, msg) => {
        expect(msg).toBe(
          `Invalid args: type check failed for args "canvasId". Expected String with value "1", got Number with value 1.`
        )
      }
    )
  })
})
