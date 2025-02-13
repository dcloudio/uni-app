import { hyphenateCssProperty } from '../src/dom/UniCSSStyleDeclaration'
import { UniElement } from '../src/dom/UniElement'
import {
  coverAnimateToStyle,
  normalizeKeyframes,
  setStyleByRequestAnimationFrame,
} from '../src/dom/UniAnimation'
describe('uni-mp-vue: UniElement', () => {
  it('UniCSSStyleDeclaration', () => {
    const element = new UniElement()
    element.style['color'] = 'red'
    expect(element.style['color']).toBe('red')
    expect(element.style.getPropertyValue('color')).toBe('red')
    expect(element.style.cssText).toBe('color:red;')
    element.style.setProperty('color', 'blue')
    expect(element.style['color']).toBe('blue')
    expect(element.style.getPropertyValue('color')).toBe('blue')
    expect(element.style.cssText).toBe('color:blue;')
    element.style.setProperty('margin-top', '10px')
    expect(element.style['margin-top']).toBe('10px')
    expect(element.style.getPropertyValue('margin-top')).toBe('10px')
    expect(element.style.cssText).toBe('color:blue;margin-top:10px;')
    element.style.setProperty('marginBottom', '10px')
    expect(element.style['marginBottom']).toBe('10px')
    expect(element.style.getPropertyValue('marginBottom')).toBe('10px')
    expect(element.style['margin-bottom']).toBe('10px')
    expect(element.style.getPropertyValue('margin-bottom')).toBe('10px')
    expect(element.style.cssText).toBe(
      'color:blue;margin-top:10px;margin-bottom:10px;'
    )
  })
  it('hyphenateCssProperty', () => {
    expect(hyphenateCssProperty('WebkitTransform')).toBe('-webkit-transform')
    expect(hyphenateCssProperty('WebkitTransitionOpacity')).toBe(
      '-webkit-transition-opacity'
    )
    expect(hyphenateCssProperty('marginTop')).toBe('margin-top')
  })

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
        marginLeft: '10px',
        offset: 0,
      },
      {
        marginLeft: '10px',
        offset: 0.5,
      },
      {
        marginLeft: '10px',
        offset: 1,
      },
    ])
    const res1 = [
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
      { offset: 0, backgroundColor: 'yellow' },
      { offset: 1, backgroundColor: 'red' },
    ])

    expect(
      normalizeKeyframes([
        { backgroundColor: 'yellow' },
        { offset: 0.9, backgroundColor: 'red' },
      ])
    ).toEqual([
      { offset: 0, backgroundColor: 'yellow' },
      { offset: 0.9, backgroundColor: 'red' },
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
        transformOrigin: '0px 0px',
        transition: 'all 0ms ease',
        _duration: 0,
        _startTime: 0,
      },
      {
        transform: 'scale(0)',
        transformOrigin: '50px 50px',
        transition: 'all 1500ms ease',
        _duration: 1500,
        _startTime: 0,
      },
      {
        transform: 'scale(1)',
        transformOrigin: '100px 100px',
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
        backgroundColor: 'yellow',
        transition: 'all 300ms ease',
        _startTime: 0,
        _duration: 300,
      },
      {
        backgroundColor: 'red',
        transition: 'all 300ms ease',
        _startTime: 300,
        _duration: 300,
      },
      {
        backgroundColor: 'blue',
        transition: 'all 400ms ease',
        _startTime: 600,
        _duration: 400,
      },
    ])
  })

  it('setStyleByRequestAnimationFrame', () => {
    const cssRules = [
      {
        transform: 'scale(1)',
        transformOrigin: '0px 0px',
        transition: 'all 0ms ease',
        _duration: 0,
        _startTime: 0,
      },
      {
        transform: 'scale(0)',
        transformOrigin: '50px 50px',
        transition: 'all 1500ms ease',
        _duration: 1500,
        _startTime: 0,
      },
      {
        transform: 'scale(1)',
        transformOrigin: '100px 100px',
        transition: 'all 1500ms ease',
        _duration: 1500,
        _startTime: 1500,
      },
    ]

    const Element = {
      setStyle: jest.fn(),
    } as any

    const { start } = setStyleByRequestAnimationFrame(cssRules)
    start(Element)

    expect(Element.setStyle).toHaveBeenCalledTimes(3)
    expect(Element.setStyle).toHaveBeenNthCalledWith(1, 'transform', 'scale(1)')
  })
})
