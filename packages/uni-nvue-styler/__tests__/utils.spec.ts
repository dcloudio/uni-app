import { checkColor } from '../src/utils'

describe('checkColor', () => {
  it('checkbox words', () => {
    expect(checkColor('red')).toEqual([255, 0, 0, 255])
    expect(checkColor('#f00')).toEqual([255, 0, 0, 255])
    expect(checkColor('#ff0000')).toEqual([255, 0, 0, 255])
    expect(checkColor('rgb(255,0,0)')).toEqual([255, 0, 0, 255])
    expect(checkColor('rgba(255,0,0,1)')).toEqual([255, 0, 0, 255])
  })
})
