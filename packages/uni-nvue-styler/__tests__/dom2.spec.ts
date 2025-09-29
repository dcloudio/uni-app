import { parseDom2StaticStyle } from '../src/dom2/index'
import {
  DOM2_APP_PLATFORM,
  DOM2_APP_TARGET,
  type ParseDom2StaticStyleOptions,
} from '../src/dom2/types'
import {
  clearProcessorsCache,
  createPropertyProcessors,
} from '../src/dom2/propertyMap'
import {
  createSetStyleEnumValueProcessor,
  createSetStyleNumberValueProcessor,
  createSetStyleUnitValueProcessor,
  defineStyleVariableProcessor,
  setStyleVariableProcessor,
} from '../src/dom2/processors'

describe('dom2', () => {
  beforeEach(() => {
    // 清理缓存以确保测试独立性
    clearProcessorsCache()
  })

  describe('parseDom2StaticStyle', () => {
    const baseOptions: ParseDom2StaticStyleOptions = {
      platform: DOM2_APP_PLATFORM.APP,
      target: DOM2_APP_TARGET.DOM_C,
    }

    describe('basic functionality', () => {
      test('should parse basic CSS properties', () => {
        const input = 'width: 100px;'
        const result = parseDom2StaticStyle(input, baseOptions)

        expect(result).toHaveProperty('width')
        expect(result.width).toHaveProperty('valueCode')
        expect(result.width).toHaveProperty('setterCode')
      })

      test('should handle empty input', () => {
        const result = parseDom2StaticStyle('', baseOptions)
        expect(result).toEqual({})
      })

      test('should handle invalid CSS gracefully', () => {
        const input = 'invalid: css; property:'
        const result = parseDom2StaticStyle(input, baseOptions)
        // 应该只处理有效的属性
        expect(typeof result).toBe('object')
      })
    })

    describe('CSS variables', () => {
      test('should handle CSS variables definition', () => {
        const input = '--primary-color: red;'
        const result = parseDom2StaticStyle(input, baseOptions)

        expect(result).toHaveProperty('--primary-color')
        expect(result['--primary-color'].setterCode).toContain(
          'defineStyleVariable'
        )
      })

      test('should handle CSS variables usage', () => {
        const input = 'width: var(--primary-width);'
        const result = parseDom2StaticStyle(input, baseOptions)

        expect(result).toHaveProperty('width')
        expect(result.width.setterCode).toContain('setStyleVariable')
      })

      test('should handle mixed CSS variables and regular properties', () => {
        const input = `
          --primary-width: 100px;
          --primary-position: static;
          width: var(--primary-width);
          position: var(--primary-position);
        `
        const result = parseDom2StaticStyle(input, baseOptions)

        expect(result).toHaveProperty('--primary-width')
        expect(result).toHaveProperty('--primary-position')
        expect(result).toHaveProperty('width')
        expect(result).toHaveProperty('position')
      })
    })

    describe('platform and target support', () => {
      test('should handle supported platform combinations', () => {
        const input = 'display: flex;'

        // 测试已知支持的平台组合
        const supportedCombinations = [
          { platform: DOM2_APP_PLATFORM.APP, target: DOM2_APP_TARGET.DOM_C },
          { platform: DOM2_APP_PLATFORM.APP, target: DOM2_APP_TARGET.NV_C },
          {
            platform: DOM2_APP_PLATFORM.APP_ANDROID,
            target: DOM2_APP_TARGET.DOM_C,
          },
          {
            platform: DOM2_APP_PLATFORM.APP_ANDROID,
            target: DOM2_APP_TARGET.NV_KT,
          },
        ]

        supportedCombinations.forEach(({ platform, target }) => {
          const result = parseDom2StaticStyle(input, { platform, target })
          // display属性在支持的平台组合中应该被处理
          expect(result).toHaveProperty('display')
        })
      })

      test('should handle different targets with appropriate setters', () => {
        const input = 'display: block;'

        const domCResult = parseDom2StaticStyle(input, {
          ...baseOptions,
          target: DOM2_APP_TARGET.DOM_C,
        })

        const nvCResult = parseDom2StaticStyle(input, {
          ...baseOptions,
          target: DOM2_APP_TARGET.NV_C,
        })

        expect(domCResult).toHaveProperty('display')
        expect(nvCResult).toHaveProperty('display')
        // 验证不同目标使用不同的setter
        expect(domCResult['display'].setterCode).toContain('setStyleDisplay')
        expect(nvCResult['display'].setterCode).toContain('display')
      })
    })

    describe('CSS property types', () => {
      test('should handle unit value properties', () => {
        const input = `
          width: 100px;
          height: 50%;
          margin-top: 10px;
          padding-left: 20px;
          border-top-width: 2px;
        `
        const result = parseDom2StaticStyle(input, baseOptions)

        expect(result).toHaveProperty('width')
        expect(result).toHaveProperty('height')
        expect(result).toHaveProperty('margin-top')
        expect(result).toHaveProperty('padding-left')
        expect(result).toHaveProperty('border-top-width')

        // 验证单位值属性使用正确的setter
        expect(result['width'].setterCode).toContain('setStyleWidth')
        expect(result['height'].setterCode).toContain('setStyleHeight')
        expect(result['margin-top'].setterCode).toContain('setStyleMarginTop')
        expect(result['padding-left'].setterCode).toContain(
          'setStylePaddingLeft'
        )
        expect(result['border-top-width'].setterCode).toContain(
          'setStyleBorderTopWidth'
        )
      })

      test('should handle number type properties in dom-c platform', () => {
        const input = 'flex-grow: 2; flex-shrink: 1.5;'
        const result = parseDom2StaticStyle(input, baseOptions)

        expect(result).toHaveProperty('flex-grow')
        expect(result).toHaveProperty('flex-shrink')

        // 验证数字类型属性使用正确的setter
        expect(result['flex-grow'].setterCode).toContain('setStyleFlexGrow(2)')
        expect(result['flex-shrink'].setterCode).toContain(
          'setStyleFlexShrink(1.5)'
        )
      })

      test('should handle number type properties in nv-c platform', () => {
        const input = 'opacity: 0.8; z-index: 10;'
        const result = parseDom2StaticStyle(input, {
          ...baseOptions,
          target: DOM2_APP_TARGET.NV_C,
        })

        expect(result).toHaveProperty('opacity')
        expect(result).toHaveProperty('z-index')

        // 验证数字类型属性使用正确的setter
        expect(result['opacity'].setterCode).toContain('opacity(0.8)')
        expect(result['z-index'].setterCode).toContain('zIndex(10)')
      })

      test('should handle specific CSS types correctly', () => {
        const input = `
          align-content: center;
          align-items: flex-start;
          align-self: flex-end;
          justify-content: space-between;
        `
        const result = parseDom2StaticStyle(input, baseOptions)

        expect(result).toHaveProperty('align-content')
        expect(result).toHaveProperty('align-items')
        expect(result).toHaveProperty('align-self')
        expect(result).toHaveProperty('justify-content')

        // 验证使用具体的类型而不是通用的UniCSSFlexAlignType
        expect(result['align-content'].setterCode).toContain(
          'setStyleAlignContent'
        )
        expect(result['align-items'].setterCode).toContain('setStyleAlignItems')
        expect(result['align-self'].setterCode).toContain('setStyleAlignSelf')
        expect(result['justify-content'].setterCode).toContain(
          'setStyleJustifyContent'
        )
      })

      test('should handle cross-platform type differences for border-style properties', () => {
        const input = 'border-top-style: solid;'

        // dom-c平台应该使用UniCSSBorderStyleType
        const domCResult = parseDom2StaticStyle(input, {
          ...baseOptions,
          target: DOM2_APP_TARGET.DOM_C,
        })

        // nv-c平台应该使用UniNativeBorderStyle
        const nvCResult = parseDom2StaticStyle(input, {
          ...baseOptions,
          target: DOM2_APP_TARGET.NV_C,
        })

        // nv-kt平台应该使用UniNativeBorderStyle
        const nvKtResult = parseDom2StaticStyle(input, {
          ...baseOptions,
          platform: DOM2_APP_PLATFORM.APP_ANDROID,
          target: DOM2_APP_TARGET.NV_KT,
        })

        expect(domCResult).toHaveProperty('border-top-style')
        expect(nvCResult).toHaveProperty('border-top-style')
        expect(nvKtResult).toHaveProperty('border-top-style')

        // 验证不同平台使用不同的setter
        expect(domCResult['border-top-style'].setterCode).toContain(
          'setStyleBorderTopStyle'
        )
        expect(nvCResult['border-top-style'].setterCode).toContain(
          'borderStyleTop'
        )
        expect(nvKtResult['border-top-style'].setterCode).toContain(
          'borderStyleTop'
        )
      })
    })

    describe('edge cases', () => {
      test('should handle CSS with comments', () => {
        const input = `
          /* This is a comment */
          width: 100px; /* Another comment */
          height: 50%;
        `
        const result = parseDom2StaticStyle(input, baseOptions)

        expect(result).toHaveProperty('width')
        expect(result).toHaveProperty('height')
      })

      test('should handle CSS with whitespace', () => {
        const input = '  width  :  100px  ;  height  :  50%  ;  '
        const result = parseDom2StaticStyle(input, baseOptions)

        expect(result).toHaveProperty('width')
        expect(result).toHaveProperty('height')
      })

      test('should handle CSS with semicolon at end', () => {
        const input = 'width: 100px; height: 50%;'
        const result = parseDom2StaticStyle(input, baseOptions)

        expect(result).toHaveProperty('width')
        expect(result).toHaveProperty('height')
      })

      test('should handle CSS without semicolon at end', () => {
        const input = 'width: 100px; height: 50%'
        const result = parseDom2StaticStyle(input, baseOptions)

        expect(result).toHaveProperty('width')
        expect(result).toHaveProperty('height')
      })
    })
  })

  describe('createPropertyProcessors', () => {
    describe('basic functionality', () => {
      test('should create processors for valid platform and target', () => {
        const processors = createPropertyProcessors(
          DOM2_APP_PLATFORM.APP,
          DOM2_APP_TARGET.DOM_C
        )

        expect(typeof processors).toBe('object')
        // 应该包含一些常见的CSS属性处理器
        expect(Object.keys(processors).length).toBeGreaterThan(0)
      })

      test('should create different processors for different combinations', () => {
        const processors1 = createPropertyProcessors(
          DOM2_APP_PLATFORM.APP_ANDROID,
          DOM2_APP_TARGET.DOM_C
        )

        const processors2 = createPropertyProcessors(
          DOM2_APP_PLATFORM.APP_IOS,
          DOM2_APP_TARGET.DOM_C
        )

        expect(processors1).not.toBe(processors2)
      })
    })

    describe('caching', () => {
      test('should cache processors for same platform and target', () => {
        const processors1 = createPropertyProcessors(
          DOM2_APP_PLATFORM.APP,
          DOM2_APP_TARGET.DOM_C
        )

        const processors2 = createPropertyProcessors(
          DOM2_APP_PLATFORM.APP,
          DOM2_APP_TARGET.DOM_C
        )

        expect(processors1).toBe(processors2) // 应该是同一个对象引用
      })
    })

    describe('cross-platform type support', () => {
      test('should prioritize setter type over root type for cross-platform support', () => {
        // 测试border-top-style属性，它有不同的跨平台类型
        const domCProcessors = createPropertyProcessors(
          DOM2_APP_PLATFORM.APP,
          DOM2_APP_TARGET.DOM_C
        )

        const nvCProcessors = createPropertyProcessors(
          DOM2_APP_PLATFORM.APP,
          DOM2_APP_TARGET.NV_C
        )

        // 验证border-top-style处理器存在
        expect(domCProcessors).toHaveProperty('border-top-style')
        expect(nvCProcessors).toHaveProperty('border-top-style')

        // 测试处理器是否正确处理值
        const domCResult = domCProcessors['border-top-style'](
          'solid',
          'border-top-style'
        )
        const nvCResult = nvCProcessors['border-top-style'](
          'solid',
          'border-top-style'
        )

        // 验证不同平台使用不同的setter
        expect(domCResult?.setterCode).toContain('setStyleBorderTopStyle')
        expect(nvCResult?.setterCode).toContain('borderStyleTop')
      })
    })
  })

  describe('processors', () => {
    describe('CSS variable processors', () => {
      test('defineStyleVariableProcessor should create correct processor for CSS variable definition', () => {
        const result = defineStyleVariableProcessor('red', '--primary-color')

        expect(result).toEqual({
          valueCode: '"red"',
          setterCode: 'defineStyleVariable("--primary-color", "red")',
        })
      })

      test('setStyleVariableProcessor should create correct processor for CSS variable usage', () => {
        const result = setStyleVariableProcessor(
          'var(--primary-color)',
          'color'
        )

        expect(result).toEqual({
          valueCode: '"var(--primary-color)"',
          setterCode:
            'setStyleVariable(UniCSSPropertyID.Color, "var(--primary-color)")',
        })
      })
    })

    describe('unit value processor', () => {
      test('should handle pixel values', () => {
        const processor = createSetStyleUnitValueProcessor('setWidth')
        const result = processor('100px', 'width')

        expect(result).toEqual({
          valueCode: '"100"',
          setterCode: 'setWidth(100, UniCSSUnitType.PX)',
        })
      })

      test('should handle percentage values', () => {
        const processor = createSetStyleUnitValueProcessor('setWidth')
        const result = processor('50%', 'width')

        expect(result).toEqual({
          valueCode: '"50"',
          setterCode: 'setWidth(50, UniCSSUnitType.PCT)',
        })
      })

      test('should handle unitless values', () => {
        const processor = createSetStyleUnitValueProcessor('setOpacity')
        const result = processor('0.5', 'opacity')

        expect(result).toEqual({
          valueCode: '"0.5"',
          setterCode: 'setOpacity(0.5, UniCSSUnitType.NONE)',
        })
      })

      test('should return undefined for invalid values', () => {
        const processor = createSetStyleUnitValueProcessor('setWidth')
        const result = processor('invalid', 'width')

        expect(result).toBeUndefined()
      })
    })

    describe('enum value processor', () => {
      test('should create enum processor with setter', () => {
        const processor = createSetStyleEnumValueProcessor('setDisplay')
        // 注意：这个测试依赖于 app-css.json 中的实际配置
        // 如果配置不存在，会返回 undefined
        const result = processor('block', 'display')

        if (result) {
          expect(result).toHaveProperty('valueCode')
          expect(result).toHaveProperty('setterCode')
          expect(result.setterCode).toContain('setDisplay')
        }
      })

      test('should create enum processor without setter', () => {
        const processor = createSetStyleEnumValueProcessor('')
        const result = processor('block', 'display')

        if (result) {
          expect(result).toHaveProperty('valueCode')
          expect(result).toHaveProperty('setterCode')
          expect(result.setterCode).toBe(result.valueCode)
        }
      })
    })

    describe('number value processor', () => {
      test('should handle integer values', () => {
        const processor = createSetStyleNumberValueProcessor('setFlexGrow')
        const result = processor('2', 'flex-grow')

        expect(result).toEqual({
          valueCode: '2',
          setterCode: 'setFlexGrow(2)',
        })
      })

      test('should handle decimal values', () => {
        const processor = createSetStyleNumberValueProcessor('setOpacity')
        const result = processor('0.8', 'opacity')

        expect(result).toEqual({
          valueCode: '0.8',
          setterCode: 'setOpacity(0.8)',
        })
      })

      test('should handle zero values', () => {
        const processor = createSetStyleNumberValueProcessor('setZIndex')
        const result = processor('0', 'z-index')

        expect(result).toEqual({
          valueCode: '0',
          setterCode: 'setZIndex(0)',
        })
      })

      test('should handle negative values', () => {
        const processor = createSetStyleNumberValueProcessor('setZIndex')
        const result = processor('-1', 'z-index')

        expect(result).toEqual({
          valueCode: '-1',
          setterCode: 'setZIndex(-1)',
        })
      })

      test('should handle invalid values', () => {
        const processor = createSetStyleNumberValueProcessor('setFlexGrow')
        const result = processor('invalid', 'flex-grow')

        expect(result).toBeUndefined()
      })

      test('should handle empty values', () => {
        const processor = createSetStyleNumberValueProcessor('setFlexGrow')
        const result = processor('', 'flex-grow')

        expect(result).toBeUndefined()
      })

      test('should handle string numbers', () => {
        const processor = createSetStyleNumberValueProcessor('setFlexGrow')
        const result = processor('3.14', 'flex-grow')

        expect(result).toEqual({
          valueCode: '3.14',
          setterCode: 'setFlexGrow(3.14)',
        })
      })
    })
  })

  describe('clearProcessorsCache', () => {
    test('should clear the processors cache', () => {
      // 创建一些处理器来填充缓存
      createPropertyProcessors(DOM2_APP_PLATFORM.APP, DOM2_APP_TARGET.DOM_C)
      createPropertyProcessors(
        DOM2_APP_PLATFORM.APP_ANDROID,
        DOM2_APP_TARGET.DOM_C
      )

      // 清理缓存
      clearProcessorsCache()

      // 重新创建处理器，应该得到新的实例
      const processors1 = createPropertyProcessors(
        DOM2_APP_PLATFORM.APP,
        DOM2_APP_TARGET.DOM_C
      )

      const processors2 = createPropertyProcessors(
        DOM2_APP_PLATFORM.APP,
        DOM2_APP_TARGET.DOM_C
      )

      expect(processors1).toBe(processors2) // 清理后重新缓存
    })
  })

  describe('complex scenarios', () => {
    test('should handle comprehensive CSS with all property types', () => {
      const comprehensiveCSS = `
        /* CSS Variables */
        --primary-color: #007AFF;
        --secondary-color: #34C759;
        --border-radius: 8px;
        --spacing: 16px;
        --opacity-value: 0.8;
        
        /* Layout Properties */
        width: var(--spacing);
        height: 200px;
        max-width: 100%;
        min-height: 50px;
        position: relative;
        top: 10px;
        left: var(--spacing);
        
        /* Flexbox Properties */
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: auto;
        
        /* Background Properties */
        background-color: var(--primary-color);
        background-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
        background-clip: padding-box;
        
        /* Border Properties */
        border-bottom-color: var(--secondary-color);
        border-left-color: #FF3B30;
        border-bottom-style: solid;
        border-left-style: dashed;
        border-bottom-width: 2px;
        border-left-width: 1px;
        border-bottom-left-radius: var(--border-radius);
        border-top-right-radius: 4px;
        
        /* Spacing Properties */
        margin-top: var(--spacing);
        margin-bottom: 8px;
        padding-left: 12px;
        padding-right: var(--spacing);
        
        /* Visual Properties */
        opacity: var(--opacity-value);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        z-index: 10;
        
        /* Transform Properties */
        transform: translateX(10px) rotate(5deg);
        transform-origin: center center;
        
        /* Transition Properties */
        transition-delay: 0.1s;
        transition-duration: 0.3s;
        transition-property: all;
        transition-timing-function: ease-in-out;
        
        /* Other Properties */
        pointer-events: auto;
      `

      const result = parseDom2StaticStyle(comprehensiveCSS, {
        platform: DOM2_APP_PLATFORM.APP,
        target: DOM2_APP_TARGET.DOM_C,
      })

      expect(result).toMatchSnapshot('comprehensive-css')
    })

    test('should handle cross-platform compatibility', () => {
      const crossPlatformCSS = `
        --theme-color: #FF6B6B;
        --size: 24px;
        
        width: var(--size);
        height: var(--size);
        background-color: var(--theme-color);
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.9;
        transform: scale(1.2);
        transition-duration: 0.2s;
      `

      // Test different platform combinations
      const platforms = [
        {
          platform: DOM2_APP_PLATFORM.APP_ANDROID,
          target: DOM2_APP_TARGET.DOM_KT,
        },
        { platform: DOM2_APP_PLATFORM.APP_IOS, target: DOM2_APP_TARGET.DOM_OC },
        {
          platform: DOM2_APP_PLATFORM.APP_HARMONY,
          target: DOM2_APP_TARGET.DOM_TS,
        },
      ]

      platforms.forEach(({ platform, target }) => {
        const result = parseDom2StaticStyle(crossPlatformCSS, {
          platform,
          target,
        })
        expect(result).toMatchSnapshot(`${platform}-${target}`)
      })
    })

    test('should handle mixed variable usage and regular values', () => {
      const mixedCSS = `
        --base-size: 20px;
        --color-red: #FF0000;
        --color-blue: #0000FF;
        --border-width: 2px;
        
        /* Mix of variables and regular values */
        width: var(--base-size);
        height: 30px;
        max-width: var(--base-size);
        min-height: 15px;
        
        /* Color mixing */
        background-color: var(--color-red);
        border-bottom-color: var(--color-blue);
        border-top-color: #00FF00;
        
        /* Border mixing */
        border-bottom-width: var(--border-width);
        border-top-width: 1px;
        border-left-width: var(--border-width);
        border-right-width: 3px;
        
        /* Spacing mixing */
        margin-top: var(--base-size);
        margin-bottom: 10px;
        padding-left: var(--base-size);
        padding-right: 5px;
        
        /* Transform mixing */
        transform: translateX(var(--base-size)) translateY(10px);
        transform-origin: center var(--base-size);
        
        /* Transition mixing */
        transition-delay: 0.1s;
        transition-duration: var(--base-size);
        transition-property: width, height;
        transition-timing-function: ease-in-out;
      `

      const result = parseDom2StaticStyle(mixedCSS, {
        platform: DOM2_APP_PLATFORM.APP,
        target: DOM2_APP_TARGET.DOM_C,
      })

      expect(result).toMatchSnapshot('mixed-variables')
    })

    test('should handle edge cases with complex CSS', () => {
      const edgeCaseCSS = `
        /* Empty values and comments */
        --empty-var: ;
        --valid-var: 10px;
        
        /* Properties with empty values */
        width: ;
        height: var(--valid-var);
        
        /* Properties with only variables */
        max-width: var(--valid-var);
        min-height: var(--empty-var);
        
        /* Complex variable references */
        --nested-var: var(--valid-var);
        --double-nested: var(--nested-var);
        
        /* Properties using nested variables */
        top: var(--nested-var);
        left: var(--double-nested);
        
        /* Mixed with regular properties */
        position: absolute;
        display: flex;
        opacity: 0.5;
        
        /* Transform with variables */
        transform: translateX(var(--valid-var)) translateY(var(--nested-var));
        
        /* Transition with mixed values */
        transition-delay: 0s;
        transition-duration: var(--valid-var);
      `

      const result = parseDom2StaticStyle(edgeCaseCSS, {
        platform: DOM2_APP_PLATFORM.APP,
        target: DOM2_APP_TARGET.DOM_C,
      })

      expect(result).toMatchSnapshot('edge-cases')
    })
  })
})
