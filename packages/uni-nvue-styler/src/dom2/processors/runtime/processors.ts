import { toSharedDataStyleColorValue } from '../color'
import { toSharedDataStyleNumberValue } from '../number'
import { toSharedDataStyleStringValue } from '../string'
import { toSharedDataStyleUnitValue } from '../unit'
export const UniCSSPropertyVariable = 1
export const processors = new Map<string, [number, (value: string) => any]>([
  ['align-content', [48, toSharedDataStyleAlignContent]],
  ['align-items', [46, toSharedDataStyleAlignItems]],
  ['align-self', [47, toSharedDataStyleAlignSelf]],
  ['flex-basis', [44, toSharedDataStyleUnitValue]],
  ['flex-direction', [39, toSharedDataStyleFlexDirection]],
  ['flex-grow', [42, toSharedDataStyleNumberValue]],
  ['flex-shrink', [43, toSharedDataStyleNumberValue]],
  ['flex-wrap', [40, toSharedDataStyleFlexWrap]],
  ['justify-content', [45, toSharedDataStyleJustifyContent]],
  ['bottom', [4, toSharedDataStyleUnitValue]],
  ['display', [50, toSharedDataStyleDisplay]],
  ['height', [7, toSharedDataStyleUnitValue]],
  ['left', [5, toSharedDataStyleUnitValue]],
  ['max-height', [11, toSharedDataStyleUnitValue]],
  ['max-width', [10, toSharedDataStyleUnitValue]],
  ['min-height', [9, toSharedDataStyleUnitValue]],
  ['min-width', [8, toSharedDataStyleUnitValue]],
  ['position', [51, toSharedDataStylePosition]],
  ['right', [3, toSharedDataStyleUnitValue]],
  ['top', [2, toSharedDataStyleUnitValue]],
  ['width', [6, toSharedDataStyleUnitValue]],
  ['visibility', [52, toSharedDataStyleVisibility]],
  ['background-clip', [67, toSharedDataStyleBackgroundClip]],
  ['background-color', [65, toSharedDataStyleColorValue]],
  ['background-image', [66, toSharedDataStyleStringValue]],
  ['border-color', [58, toSharedDataStyleStringValue]],
  ['border-bottom-color', [62, toSharedDataStyleColorValue]],
  ['border-left-color', [61, toSharedDataStyleColorValue]],
  ['border-right-color', [63, toSharedDataStyleColorValue]],
  ['border-top-color', [56, toSharedDataStyleColorValue]],
  ['border-style', [25, toSharedDataStyleBorderStyle]],
  ['border-bottom-style', [34, toSharedDataStyleBorderBottomStyle]],
  ['border-left-style', [37, toSharedDataStyleBorderLeftStyle]],
  ['border-right-style', [31, toSharedDataStyleBorderRightStyle]],
  ['border-top-style', [28, toSharedDataStyleBorderTopStyle]],
  ['border-bottom-width', [33, toSharedDataStyleUnitValue]],
  ['border-left-width', [36, toSharedDataStyleUnitValue]],
  ['border-right-width', [30, toSharedDataStyleUnitValue]],
  ['border-top-width', [27, toSharedDataStyleUnitValue]],
  ['border-bottom-left-radius', [54, toSharedDataStyleNumberValue]],
  ['border-bottom-right-radius', [55, toSharedDataStyleNumberValue]],
  ['border-top-left-radius', [59, toSharedDataStyleNumberValue]],
  ['border-top-right-radius', [60, toSharedDataStyleNumberValue]],
  ['box-shadow', [93, toSharedDataStyleStringValue]],
  ['box-sizing', [12, toSharedDataStyleBoxSizing]],
  ['margin-bottom', [16, toSharedDataStyleUnitValue]],
  ['margin-left', [17, toSharedDataStyleUnitValue]],
  ['margin-right', [15, toSharedDataStyleUnitValue]],
  ['margin-top', [14, toSharedDataStyleUnitValue]],
  ['padding-bottom', [21, toSharedDataStyleUnitValue]],
  ['padding-left', [22, toSharedDataStyleUnitValue]],
  ['padding-right', [20, toSharedDataStyleUnitValue]],
  ['padding-top', [19, toSharedDataStyleUnitValue]],
  ['opacity', [92, toSharedDataStyleNumberValue]],
  ['overflow', [53, toSharedDataStyleOverflow]],
  ['pointer-events', [94, toSharedDataStylePointerEvents]],
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
  ['font-style', [70, toSharedDataStyleFontStyle]],
  ['font-weight', [71, toSharedDataStyleFontWeight]],
  ['letter-spacing', [73, toSharedDataStyleUnitValue]],
  ['line-height', [72, toSharedDataStyleLineHeight]],
  ['text-align', [76, toSharedDataStyleTextAlign]],
  ['text-decoration-line', [79, toSharedDataStyleTextDecorationLine]],
  ['text-overflow', [82, toSharedDataStyleTextOverflow]],
  ['text-shadow', [83, toSharedDataStyleStringValue]],
  ['white-space', [84, toSharedDataStyleWhiteSpace]],
])
function toSharedDataStyleAlignContent(value: string | number) {
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
function toSharedDataStyleAlignItems(value: string | number) {
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
function toSharedDataStyleAlignSelf(value: string | number) {
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
function toSharedDataStyleFlexDirection(value: string | number) {
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
function toSharedDataStyleFlexWrap(value: string | number) {
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
function toSharedDataStyleJustifyContent(value: string | number) {
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
function toSharedDataStyleDisplay(value: string | number) {
  switch (value) {
    case 'none':
      return 0
    case 'flex':
      return 1
    default:
      return 1
  }
}
function toSharedDataStylePosition(value: string | number) {
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
function toSharedDataStyleVisibility(value: string | number) {
  switch (value) {
    case 'visible':
      return 0
    case 'hidden':
      return 1
    default:
      return 0
  }
}
function toSharedDataStyleBackgroundClip(value: string | number) {
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
function toSharedDataStyleBorderStyle(value: string | number) {
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
function toSharedDataStyleBorderBottomStyle(value: string | number) {
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
function toSharedDataStyleBorderLeftStyle(value: string | number) {
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
function toSharedDataStyleBorderRightStyle(value: string | number) {
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
function toSharedDataStyleBorderTopStyle(value: string | number) {
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
function toSharedDataStyleBoxSizing(value: string | number) {
  switch (value) {
    case 'content-box':
      return 0
    case 'border-box':
      return 1
    default:
      return 1
  }
}
function toSharedDataStyleOverflow(value: string | number) {
  switch (value) {
    case 'visible':
      return 0
    case 'hidden':
      return 1
    default:
      return 1
  }
}
function toSharedDataStylePointerEvents(value: string | number) {
  switch (value) {
    case 'auto':
      return 0
    case 'none':
      return 1
    default:
      return 0
  }
}
function toSharedDataStyleFontStyle(value: string | number) {
  switch (value) {
    case 'normal':
      return 0
    case 'italic':
      return 1
    default:
      return 0
  }
}
function toSharedDataStyleFontWeight(value: string | number) {
  switch (value) {
    case 'normal':
      return 0
    case 'bold':
      return 1
    case 'lighter':
      return 2
    case 'bolder':
      return 3
    default:
      return 0
  }
}
function toSharedDataStyleLineHeight(value: string | number) {
  switch (value) {
    case 'normal':
      return 0
    default:
      return -1
  }
}
function toSharedDataStyleTextAlign(value: string | number) {
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
function toSharedDataStyleTextDecorationLine(value: string | number) {
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
function toSharedDataStyleTextOverflow(value: string | number) {
  switch (value) {
    case 'clip':
      return 0
    case 'ellipsis':
      return 1
    default:
      return 0
  }
}
function toSharedDataStyleWhiteSpace(value: string | number) {
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
