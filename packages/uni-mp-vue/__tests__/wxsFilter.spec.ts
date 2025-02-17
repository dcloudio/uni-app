import { interpolateKeyframe } from '../src/dom/wxsFilter'

describe('uni-mp-vue: interpolateKeyframe', () => {
  it('width: 100px -> 200px -> 100px', () => {
    const keyframe = [
      {
        width: '100px',
        transition: 'all 300ms ease',
        _startTime: 0,
        _duration: 300,
      },
      {
        width: '200px',
        transition: 'all 300ms ease',
        _startTime: 300,
        _duration: 300,
      },
      {
        width: '100px',
        transition: 'all 400ms ease',
        _startTime: 600,
        _duration: 400,
      },
    ]

    expect(interpolateKeyframe(keyframe, 0)).toEqual({ width: '100px' })
    expect(interpolateKeyframe(keyframe, 150)).toEqual({ width: '150px' })
    expect(interpolateKeyframe(keyframe, 300)).toEqual({ width: '200px' })
    expect(interpolateKeyframe(keyframe, 1000)).toEqual({ width: '100px' })
  })

  it.only('color', () => {
    const keyframe = [
      {
        color: 'rgba(0, 0, 0, 1)',
        transition: 'all 300ms ease',
        _startTime: 0,
        _duration: 300,
      },
      {
        color: 'rgba(255, 255, 255, 1)',
        transition: 'all 300ms ease',
        _startTime: 300,
        _duration: 300,
      },
      {
        color: 'rgba(0, 0, 0, 1)',
        transition: 'all 400ms ease',
        _startTime: 600,
        _duration: 400,
      },
    ]

    expect(interpolateKeyframe(keyframe, 0)).toEqual({
      color: 'rgba(0,0,0,1)',
    })
    expect(interpolateKeyframe(keyframe, 150)).toEqual({
      color: 'rgba(128,128,128,1)',
    })
    expect(interpolateKeyframe(keyframe, 300)).toEqual({
      color: 'rgba(255,255,255,1)',
    })
  })
})
