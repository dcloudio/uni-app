import { hyphenateCssProperty } from '../src/dom/UniCSSStyleDeclaration'
import { UniElement } from '../src/dom/UniElement'
import { parseKeyFrames } from '../src/dom/UniAnimation'

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
  it('animate - setStyle utils', () => {
    expect(typeof parseKeyFrames).toBe('function')

    // simple
    expect(
      parseKeyFrames([
        {
          opacity: 0,
          color: '#fff',
        },
        {
          opacity: 1,
          color: '#000',
        },
      ]).currentKeyframes
    ).toEqual([
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
    ])

    expect(
      parseKeyFrames([
        { transform: 'translateX(0) rotate(0)' }, // keyframe
        { transform: 'translateX(200px) rotate(540deg)' }, // keyframe
      ]).currentKeyframes
    ).toEqual([
      {
        translateX: 0,
        rotate: 0,
      },
      {
        translateX: 200,
        rotate: 540,
      },
    ])

    // expect(
    //   parseKeyFrames({
    //     width: ['100px', '200px', '100px'],
    //   }).currentKeyframes
    // ).toEqual([
    //   {
    //     width: ['100px', '200px', '100px'],
    //   },
    // ])
  })
})
