// 此文件是根据 app-css.json 和 properties.json 动态生成，请勿手动修改
import { toSharedDataStyleColorValue } from '../color'
import { toSharedDataStyleNumberValue } from '../number'
import { toSharedDataStyleStringValue } from '../string'
import { toSharedDataStyleUnitValue } from '../unit'
import { toSharedDataStyleBorderWidthValue } from '../borderWidth'
import { createToSharedDataStyleCombinedValue } from './utils'
export const UniCSSPropertyVariable = 1
export const processors = new Map<
  string,
  [number, (value: string, propertyName: string) => any]
>([
  ['align-content', [48, toSharedDataStyleAlignContentValue]],
  ['align-items', [46, toSharedDataStyleAlignItemsValue]],
  ['align-self', [47, toSharedDataStyleAlignSelfValue]],
  [
    'flex-basis',
    [
      44,
      createToSharedDataStyleCombinedValue([
        toSharedDataStyleUnitValue,
        toSharedDataStyleFlexBasisValue,
      ]),
    ],
  ],
  ['flex-direction', [39, toSharedDataStyleFlexDirectionValue]],
  ['flex-grow', [42, toSharedDataStyleNumberValue]],
  ['flex-shrink', [43, toSharedDataStyleNumberValue]],
  ['flex-wrap', [40, toSharedDataStyleFlexWrapValue]],
  ['justify-content', [45, toSharedDataStyleJustifyContentValue]],
  ['bottom', [4, toSharedDataStyleUnitValue]],
  ['display', [50, toSharedDataStyleDisplayValue]],
  ['height', [7, toSharedDataStyleUnitValue]],
  ['left', [5, toSharedDataStyleUnitValue]],
  ['max-height', [11, toSharedDataStyleUnitValue]],
  ['max-width', [10, toSharedDataStyleUnitValue]],
  ['min-height', [9, toSharedDataStyleUnitValue]],
  ['min-width', [8, toSharedDataStyleUnitValue]],
  ['position', [51, toSharedDataStylePositionValue]],
  ['right', [3, toSharedDataStyleUnitValue]],
  ['top', [2, toSharedDataStyleUnitValue]],
  ['width', [6, toSharedDataStyleUnitValue]],
  ['visibility', [52, toSharedDataStyleVisibilityValue]],
  ['background-clip', [67, toSharedDataStyleBackgroundClipValue]],
  ['background-color', [65, toSharedDataStyleColorValue]],
  ['background-image', [66, toSharedDataStyleStringValue]],
  ['border-color', [58, toSharedDataStyleStringValue]],
  ['border-bottom-color', [62, toSharedDataStyleColorValue]],
  ['border-left-color', [61, toSharedDataStyleColorValue]],
  ['border-right-color', [63, toSharedDataStyleColorValue]],
  ['border-top-color', [56, toSharedDataStyleColorValue]],
  ['border-style', [25, toSharedDataStyleBorderStyleValue]],
  ['border-bottom-style', [34, toSharedDataStyleBorderBottomStyleValue]],
  ['border-left-style', [37, toSharedDataStyleBorderLeftStyleValue]],
  ['border-right-style', [31, toSharedDataStyleBorderRightStyleValue]],
  ['border-top-style', [28, toSharedDataStyleBorderTopStyleValue]],
  [
    'border-bottom-width',
    [
      33,
      createToSharedDataStyleCombinedValue([
        toSharedDataStyleUnitValue,
        toSharedDataStyleBorderWidthValue,
      ]),
    ],
  ],
  [
    'border-left-width',
    [
      36,
      createToSharedDataStyleCombinedValue([
        toSharedDataStyleUnitValue,
        toSharedDataStyleBorderWidthValue,
      ]),
    ],
  ],
  [
    'border-right-width',
    [
      30,
      createToSharedDataStyleCombinedValue([
        toSharedDataStyleUnitValue,
        toSharedDataStyleBorderWidthValue,
      ]),
    ],
  ],
  [
    'border-top-width',
    [
      27,
      createToSharedDataStyleCombinedValue([
        toSharedDataStyleUnitValue,
        toSharedDataStyleBorderWidthValue,
      ]),
    ],
  ],
  ['border-bottom-left-radius', [54, toSharedDataStyleUnitValue]],
  ['border-bottom-right-radius', [55, toSharedDataStyleUnitValue]],
  ['border-top-left-radius', [59, toSharedDataStyleUnitValue]],
  ['border-top-right-radius', [60, toSharedDataStyleUnitValue]],
  ['box-shadow', [93, toSharedDataStyleStringValue]],
  ['box-sizing', [12, toSharedDataStyleBoxSizingValue]],
  ['margin-bottom', [16, toSharedDataStyleUnitValue]],
  ['margin-left', [17, toSharedDataStyleUnitValue]],
  ['margin-right', [15, toSharedDataStyleUnitValue]],
  ['margin-top', [14, toSharedDataStyleUnitValue]],
  ['padding-bottom', [21, toSharedDataStyleUnitValue]],
  ['padding-left', [22, toSharedDataStyleUnitValue]],
  ['padding-right', [20, toSharedDataStyleUnitValue]],
  ['padding-top', [19, toSharedDataStyleUnitValue]],
  ['opacity', [92, toSharedDataStyleNumberValue]],
  ['overflow', [53, toSharedDataStyleOverflowValue]],
  ['pointer-events', [94, toSharedDataStylePointerEventsValue]],
  ['z-index', [49, toSharedDataStyleNumberValue]],
  ['transform', [85, toSharedDataStyleStringValue]],
  ['transform-origin', [86, toSharedDataStyleStringValue]],
  ['transition-delay', [90, toSharedDataStyleStringValue]],
  ['transition-duration', [89, toSharedDataStyleStringValue]],
  ['transition-property', [88, toSharedDataStyleStringValue]],
  ['transition-timing-function', [91, toSharedDataStyleStringValue]],
  ['color', [75, toSharedDataStyleColorValue]],
  ['font-family', [68, toSharedDataStyleStringValue]],
  ['font-size', [69, toSharedDataStyleUnitValue]],
  ['font-style', [70, toSharedDataStyleFontStyleValue]],
  ['font-weight', [71, toSharedDataStyleStringValue]],
  ['letter-spacing', [73, toSharedDataStyleUnitValue]],
  [
    'line-height',
    [
      72,
      createToSharedDataStyleCombinedValue([
        toSharedDataStyleUnitValue,
        toSharedDataStyleLineHeightValue,
      ]),
    ],
  ],
  ['text-align', [76, toSharedDataStyleTextAlignValue]],
  ['text-decoration-line', [79, toSharedDataStyleTextDecorationLineValue]],
  ['text-overflow', [82, toSharedDataStyleTextOverflowValue]],
  ['text-shadow', [83, toSharedDataStyleStringValue]],
  ['white-space', [84, toSharedDataStyleWhiteSpaceValue]],
])
function toSharedDataStyleAlignContentValue(value: string | number) {
  switch (value) {
    case 'auto':
      return 0
    case 'flex-start':
      return 1
    case 'center':
      return 2
    case 'flex-end':
      return 3
    case 'stretch':
      return 4
    case 'baseline':
      return 5
    case 'space-between':
      return 6
    case 'space-around':
      return 7
    case 'space-evenly':
      return 8
    default:
      return 4
  }
}
function toSharedDataStyleAlignItemsValue(value: string | number) {
  switch (value) {
    case 'auto':
      return 0
    case 'flex-start':
      return 1
    case 'center':
      return 2
    case 'flex-end':
      return 3
    case 'stretch':
      return 4
    case 'baseline':
      return 5
    case 'space-between':
      return 6
    case 'space-around':
      return 7
    case 'space-evenly':
      return 8
    default:
      return 4
  }
}
function toSharedDataStyleAlignSelfValue(value: string | number) {
  switch (value) {
    case 'auto':
      return 0
    case 'flex-start':
      return 1
    case 'center':
      return 2
    case 'flex-end':
      return 3
    case 'stretch':
      return 4
    case 'baseline':
      return 5
    case 'space-between':
      return 6
    case 'space-around':
      return 7
    case 'space-evenly':
      return 8
    default:
      return 0
  }
}
function toSharedDataStyleFlexBasisValue(value: string | number) {
  switch (value) {
    case 'auto':
      return 0
    case 'content':
      return 1
    default:
      return 0
  }
}
function toSharedDataStyleFlexDirectionValue(value: string | number) {
  switch (value) {
    case 'row':
      return 0
    case 'row-reverse':
      return 1
    case 'column':
      return 2
    case 'column-reverse':
      return 3
    default:
      return 2
  }
}
function toSharedDataStyleFlexWrapValue(value: string | number) {
  switch (value) {
    case 'nowrap':
      return 0
    case 'wrap':
      return 1
    case 'wrap-reverse':
      return 2
    default:
      return 0
  }
}
function toSharedDataStyleJustifyContentValue(value: string | number) {
  switch (value) {
    case 'auto':
      return 0
    case 'flex-start':
      return 1
    case 'center':
      return 2
    case 'flex-end':
      return 3
    case 'stretch':
      return 4
    case 'baseline':
      return 5
    case 'space-between':
      return 6
    case 'space-around':
      return 7
    case 'space-evenly':
      return 8
    default:
      return 1
  }
}
function toSharedDataStyleDisplayValue(value: string | number) {
  switch (value) {
    case 'flex':
      return 0
    case 'none':
      return 1
    default:
      return 0
  }
}
function toSharedDataStylePositionValue(value: string | number) {
  switch (value) {
    case 'relative':
      return 0
    case 'absolute':
      return 1
    case 'fixed':
      return 2
    case 'sticky':
      return 3
    case 'static':
      return 4
    default:
      return 0
  }
}
function toSharedDataStyleVisibilityValue(value: string | number) {
  switch (value) {
    case 'visible':
      return 0
    case 'hidden':
      return 1
    default:
      return 0
  }
}
function toSharedDataStyleBackgroundClipValue(value: string | number) {
  switch (value) {
    case 'border-box':
      return 0
    case 'padding-box':
      return 1
    case 'content-box':
      return 2
    default:
      return 0
  }
}
function toSharedDataStyleBorderStyleValue(value: string | number) {
  switch (value) {
    case 'none':
      return 0
    case 'solid':
      return 1
    case 'dashed':
      return 2
    case 'dotted':
      return 3
    default:
      return 0
  }
}
function toSharedDataStyleBorderBottomStyleValue(value: string | number) {
  switch (value) {
    case 'none':
      return 0
    case 'solid':
      return 1
    case 'dashed':
      return 2
    case 'dotted':
      return 3
    default:
      return 0
  }
}
function toSharedDataStyleBorderLeftStyleValue(value: string | number) {
  switch (value) {
    case 'none':
      return 0
    case 'solid':
      return 1
    case 'dashed':
      return 2
    case 'dotted':
      return 3
    default:
      return 0
  }
}
function toSharedDataStyleBorderRightStyleValue(value: string | number) {
  switch (value) {
    case 'none':
      return 0
    case 'solid':
      return 1
    case 'dashed':
      return 2
    case 'dotted':
      return 3
    default:
      return 0
  }
}
function toSharedDataStyleBorderTopStyleValue(value: string | number) {
  switch (value) {
    case 'none':
      return 0
    case 'solid':
      return 1
    case 'dashed':
      return 2
    case 'dotted':
      return 3
    default:
      return 0
  }
}
function toSharedDataStyleBoxSizingValue(value: string | number) {
  switch (value) {
    case 'content-box':
      return 0
    case 'border-box':
      return 1
    default:
      return 1
  }
}
function toSharedDataStyleOverflowValue(value: string | number) {
  switch (value) {
    case 'visible':
      return 0
    case 'hidden':
      return 1
    default:
      return 1
  }
}
function toSharedDataStylePointerEventsValue(value: string | number) {
  switch (value) {
    case 'auto':
      return 0
    case 'none':
      return 1
    default:
      return 0
  }
}
function toSharedDataStyleFontStyleValue(value: string | number) {
  switch (value) {
    case 'normal':
      return 0
    case 'italic':
      return 1
    default:
      return 0
  }
}
function toSharedDataStyleLineHeightValue(value: string | number) {
  switch (value) {
    case 'normal':
      return 0
    default:
      return -1
  }
}
function toSharedDataStyleTextAlignValue(value: string | number) {
  switch (value) {
    case 'left':
      return 0
    case 'right':
      return 1
    case 'center':
      return 2
    default:
      return 0
  }
}
function toSharedDataStyleTextDecorationLineValue(value: string | number) {
  switch (value) {
    case 'none':
      return 0
    case 'underline':
      return 1
    case 'overline':
      return 2
    case 'line-through':
      return 3
    default:
      return 0
  }
}
function toSharedDataStyleTextOverflowValue(value: string | number) {
  switch (value) {
    case 'clip':
      return 0
    case 'ellipsis':
      return 1
    default:
      return 0
  }
}
function toSharedDataStyleWhiteSpaceValue(value: string | number) {
  switch (value) {
    case 'normal':
      return 0
    case 'nowrap':
      return 1
    case 'pre':
      return 2
    case 'pre-wrap':
      return 3
    case 'pre-line':
      return 4
    case 'break-spaces':
      return 5
    default:
      return 0
  }
}
