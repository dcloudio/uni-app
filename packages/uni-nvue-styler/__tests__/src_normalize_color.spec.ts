import { normalizeColor } from '../src/normalize/color'

describe('normalizeColor', () => {
  test('normalizeColor', () => {
    expect(normalizeColor('#000000', {})).toEqual({
      value: '#000000',
    })

    expect(normalizeColor('#000', {})).toEqual({
      value: '#000000',
      reason: expect.any(Function),
    })

    expect(normalizeColor('#f008', {})).toEqual({
      value: '#ff000088',
      reason: expect.any(Function),
    })

    expect(normalizeColor('#aaffffaa', {})).toEqual({
      value: '#aaffffaa',
    })

    expect(normalizeColor('#AAFFFFAA', {})).toEqual({
      value: '#AAFFFFAA',
    })

    expect(normalizeColor('rgb(0,0,0)', {})).toEqual({
      value: 'rgb(0,0,0)',
    })

    expect(normalizeColor('rgb(266,266,266)', {})).toEqual({
      value: null,
      reason: expect.any(Function),
    })
    expect(normalizeColor('rgba(0,0,0,1)', {})).toEqual({
      value: 'rgba(0,0,0,1)',
    })

    // blue
    expect(normalizeColor('blue', {})).toEqual({
      value: '#0000FF',
      reason: expect.any(Function),
    })

    expect(normalizeColor('transparent', {})).toEqual({
      value: 'rgba(0,0,0,0)',
    })
  })
})
