import {
  coverAnimateToStyle,
  normalizeKeyframes,
  // setStyleByRequestAnimationFrame,
} from '../src/dom/UniAnimation'

describe('uni-mp-vue: UniAnimation', () => {
  it('normalizeKeyframes: fill keyframes offset', () => {
    expect(
      normalizeKeyframes([
        {
          marginLeft: '10px',
        },
        {
          marginLeft: '10px',
        },
        {
          marginLeft: '10px',
        },
      ])
    ).toEqual([
      {
        'margin-left': '10px',
        offset: 0,
      },
      {
        'margin-left': '10px',
        offset: 0.5,
      },
      {
        'margin-left': '10px',
        offset: 1,
      },
    ])
    const res1 = [
      {
        'margin-left': '10px',
        offset: 0,
      },
      {
        'margin-left': '10px',
        offset: 0.2,
      },
      {
        'margin-left': '10px',
        offset: 0.4,
      },
      {
        'margin-left': '10px',
        offset: 0.6,
      },
      {
        'margin-left': '10px',
        offset: 0.8,
      },
      {
        'margin-left': '10px',
        offset: 1,
      },
    ]
    expect(
      normalizeKeyframes([
        {
          marginLeft: '10px',
          offset: 0,
        },
        {
          marginLeft: '10px',
          offset: 0.2,
        },
        {
          marginLeft: '10px',
          offset: 0.4,
        },
        {
          marginLeft: '10px',
          offset: 0.6,
        },
        {
          marginLeft: '10px',
          offset: 0.8,
        },
        {
          marginLeft: '10px',
          offset: 1,
        },
      ])
    ).toEqual(res1)

    expect(
      normalizeKeyframes([
        {
          marginLeft: '10px',
          // offset: 0,
        },
        {
          marginLeft: '10px',
          // offset: 0.2,
        },
        {
          marginLeft: '10px',
          // offset: 0.4,
        },
        {
          marginLeft: '10px',
          // offset: 0.6,
        },
        {
          marginLeft: '10px',
          // offset: 0.8,
        },
        {
          marginLeft: '10px',
          // offset: 1,
        },
      ])
    ).toEqual(res1)

    expect(
      normalizeKeyframes([
        {
          marginLeft: '10px',
          // offset: 0,
        },
        {
          marginLeft: '10px',
          offset: 0.2,
        },
        {
          marginLeft: '10px',
          // offset: 0.4,
        },
        {
          marginLeft: '10px',
          // offset: 0.6,
        },
        {
          marginLeft: '10px',
          // offset: 0.8,
        },
        {
          marginLeft: '10px',
          // offset: 1,
        },
      ])
    ).toEqual(res1)

    expect(
      normalizeKeyframes([
        {
          marginLeft: '10px',
          // offset: 0,
        },
        {
          marginLeft: '10px',
          offset: 0.2,
        },
        {
          marginLeft: '10px',
          // offset: 0.4,
        },
        {
          marginLeft: '10px',
          offset: 0.6,
        },
        {
          marginLeft: '10px',
          // offset: 0.8,
        },
        {
          marginLeft: '10px',
          // offset: 1,
        },
      ])
    ).toEqual(res1)

    expect(
      normalizeKeyframes([
        {
          marginLeft: '10px',
          // offset: 0,
        },
        {
          marginLeft: '10px',
          offset: 0.2,
        },
        {
          marginLeft: '10px',
          offset: 0.4,
        },
        {
          marginLeft: '10px',
          offset: 0.6,
        },
        {
          marginLeft: '10px',
          // offset: 0.8,
        },
        {
          marginLeft: '10px',
          offset: 1,
        },
      ])
    ).toEqual(res1)

    expect(
      normalizeKeyframes([
        { backgroundColor: 'yellow' },
        { backgroundColor: 'red' },
      ])
    ).toEqual([
      { offset: 0, 'background-color': 'yellow' },
      { offset: 1, 'background-color': 'red' },
    ])

    expect(
      normalizeKeyframes([
        { backgroundColor: 'yellow' },
        { offset: 0.9, backgroundColor: 'red' },
      ])
    ).toEqual([
      { offset: 0, 'background-color': 'yellow' },
      { offset: 0.9, 'background-color': 'red' },
    ])
  })
  it('coverAnimateToStyle', () => {
    expect(
      coverAnimateToStyle(
        [
          {
            transform: 'scale(1)',
            transformOrigin: '0px 0px',
          },
          {
            transform: 'scale(0)',
            transformOrigin: '50px 50px',
          },
          {
            transform: 'scale(1)',
            transformOrigin: '100px 100px',
          },
        ],
        {
          duration: 3000,
        }
      )
    ).toEqual([
      {
        transform: 'scale(1)',
        'transform-origin': '0px 0px',
        transition: 'all 0ms ease',
        _duration: 0,
        _startTime: 0,
      },
      {
        transform: 'scale(0)',
        'transform-origin': '50px 50px',
        transition: 'all 1500ms ease',
        _duration: 1500,
        _startTime: 0,
      },
      {
        transform: 'scale(1)',
        'transform-origin': '100px 100px',
        transition: 'all 1500ms ease',
        _duration: 1500,
        _startTime: 1500,
      },
    ])

    expect(
      coverAnimateToStyle(
        {
          width: ['100px', '200px', '100px'],
        },
        {
          duration: 1000,
          fill: 'forwards',
        }
      )
    ).toEqual([
      {
        width: '100px',
        transition: 'all 0ms ease',
        _startTime: 0,
        _duration: 0,
      },
      {
        width: '200px',
        transition: 'all 500ms ease',
        _startTime: 0,
        _duration: 500,
      },
      {
        width: '100px',
        transition: 'all 500ms ease',
        _startTime: 500,
        _duration: 500,
      },
    ])

    expect(
      coverAnimateToStyle(
        {
          height: ['100px', '200px'],
        },
        {
          duration: 1000,
          fill: 'forwards',
        }
      )
    ).toEqual([
      {
        height: '100px',
        transition: 'all 0ms ease',
        _duration: 0,
        _startTime: 0,
      },
      {
        height: '200px',
        transition: 'all 1000ms ease',
        _duration: 1000,
        _startTime: 0,
      },
    ])

    expect(
      coverAnimateToStyle(
        {
          margin: ['8px', '16px', '32px'],
        },
        {
          duration: 1000,
          fill: 'forwards',
        }
      )
    ).toEqual([
      {
        margin: '8px',
        transition: 'all 0ms ease',
        _duration: 0,
        _startTime: 0,
      },
      {
        margin: '16px',
        transition: 'all 500ms ease',
        _duration: 500,
        _startTime: 0,
      },
      {
        margin: '32px',
        transition: 'all 500ms ease',
        _duration: 500,
        _startTime: 500,
      },
    ])

    // start step is not 0
    expect(
      coverAnimateToStyle(
        [
          {
            offset: 0.3,
            backgroundColor: 'yellow',
          },
          {
            offset: 0.6,
            backgroundColor: 'red',
          },
          {
            backgroundColor: 'blue',
          },
        ],
        {
          duration: 1000,
          fill: 'forwards',
        }
      )
    ).toEqual([
      {
        'background-color': 'yellow',
        transition: 'all 300ms ease',
        _startTime: 0,
        _duration: 300,
      },
      {
        'background-color': 'red',
        transition: 'all 300ms ease',
        _startTime: 300,
        _duration: 300,
      },
      {
        'background-color': 'blue',
        transition: 'all 400ms ease',
        _startTime: 600,
        _duration: 400,
      },
    ])
  })
})
