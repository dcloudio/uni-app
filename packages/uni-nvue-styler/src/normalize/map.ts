import { NormalizeOptions } from '.'
import { Normalize } from '../utils'
import { normalizeColor } from './color'
import { createEnumNormalize } from './enum'
import { normalizeFlexWrap } from './flexWrap'
import { normalizeInteger } from './integer'
import {
  normalizeLength,
  normalizeLengthWithAuto,
  normalizeLengthWithPercent,
} from './length'
import { normalizeNumber } from './number'
import { normalizeShorthandLength } from './shorthandLength'
import { normalizeTransform } from './transform'
import { normalizeTransitionInterval } from './transitionInterval'
import { normalizeTransitionProperty } from './transitionProperty'
import { normalizeTransitionTimingFunction } from './transitionTimingFunction'

const normalizeDefault: Normalize = (v) => {
  return { value: v }
}

let normalizeMap: Record<string, Normalize>

export function getNormalizeMap(options: NormalizeOptions) {
  if (normalizeMap) {
    return normalizeMap
  }
  const uvue = options.type === 'uvue'
  const PROP_NAME_GROUPS: Record<string, Record<string, Normalize>> = {
    boxModel: {
      display: createEnumNormalize(uvue ? ['flex', 'none'] : ['flex']),
      width: uvue ? normalizeLengthWithPercent : normalizeLength,
      height: uvue ? normalizeLengthWithPercent : normalizeLength,
      overflow: createEnumNormalize(['hidden']),
      padding: normalizeShorthandLength,
      paddingLeft: uvue ? normalizeLengthWithAuto : normalizeLength,
      paddingRight: uvue ? normalizeLengthWithAuto : normalizeLength,
      paddingTop: uvue ? normalizeLengthWithAuto : normalizeLength,
      paddingBottom: uvue ? normalizeLengthWithAuto : normalizeLength,
      margin: normalizeShorthandLength,
      marginLeft: uvue ? normalizeLengthWithAuto : normalizeLength,
      marginRight: uvue ? normalizeLengthWithAuto : normalizeLength,
      marginTop: uvue ? normalizeLengthWithAuto : normalizeLength,
      marginBottom: uvue ? normalizeLengthWithAuto : normalizeLength,
      borderWidth: normalizeLength,
      borderLeftWidth: normalizeLength,
      borderTopWidth: normalizeLength,
      borderRightWidth: normalizeLength,
      borderBottomWidth: normalizeLength,
      borderColor: normalizeColor,
      borderLeftColor: normalizeColor,
      borderTopColor: normalizeColor,
      borderRightColor: normalizeColor,
      borderBottomColor: normalizeColor,
      borderStyle: createEnumNormalize(['dotted', 'dashed', 'solid']),
      borderTopStyle: createEnumNormalize(['dotted', 'dashed', 'solid']),
      borderRightStyle: createEnumNormalize(['dotted', 'dashed', 'solid']),
      borderBottomStyle: createEnumNormalize(['dotted', 'dashed', 'solid']),
      borderLeftStyle: createEnumNormalize(['dotted', 'dashed', 'solid']),
      borderRadius: normalizeLength,
      borderBottomLeftRadius: normalizeLength,
      borderBottomRightRadius: normalizeLength,
      borderTopLeftRadius: normalizeLength,
      borderTopRightRadius: normalizeLength,
    },
    flexbox: {
      flex: normalizeNumber,
      flexWrap: normalizeFlexWrap,
      flexDirection: createEnumNormalize([
        'column',
        'row',
        'column-reverse',
        'row-reverse',
      ]),
      justifyContent: createEnumNormalize([
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
      ]),
      alignItems: createEnumNormalize([
        'stretch',
        'flex-start',
        'flex-end',
        'center',
      ]),
    },
    position: {
      position: createEnumNormalize([
        'relative',
        'absolute',
        'sticky',
        'fixed',
      ]),
      top: normalizeLength,
      bottom: normalizeLength,
      left: normalizeLength,
      right: normalizeLength,
      zIndex: normalizeInteger,
    },
    common: {
      opacity: normalizeNumber,
      boxShadow: normalizeDefault,
      backgroundColor: normalizeColor,
      backgroundImage: normalizeDefault,
    },
    text: {
      lines: normalizeInteger,
      color: normalizeColor,
      fontSize: normalizeLength,
      fontStyle: createEnumNormalize(['normal', 'italic']),
      fontFamily: normalizeDefault,
      fontWeight: createEnumNormalize([
        'normal',
        'bold',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
      ]),
      textDecoration: createEnumNormalize([
        'none',
        'underline',
        'line-through',
      ]),
      textAlign: createEnumNormalize(['left', 'center', 'right']),
      textOverflow: createEnumNormalize(['clip', 'ellipsis', 'unset', 'fade']),
      lineHeight: normalizeLength,
    },
    transition: {
      transitionProperty: normalizeTransitionProperty,
      transitionDuration: normalizeTransitionInterval,
      transitionDelay: normalizeTransitionInterval,
      transitionTimingFunction: normalizeTransitionTimingFunction,
    },
    transform: {
      transform: normalizeTransform,
      transformOrigin: normalizeTransform, // fixed by xxxxxx
    },
    customized: {
      itemSize: normalizeLength,
      itemColor: normalizeColor,
      itemSelectedColor: normalizeColor,
      textColor: normalizeColor,
      timeColor: normalizeColor,
      textHighlightColor: normalizeColor,
    },
  }
  normalizeMap = Object.keys(PROP_NAME_GROUPS).reduce<
    Record<string, Normalize>
  >((res, name) => {
    const group = PROP_NAME_GROUPS[name]
    Object.keys(group).forEach((prop) => {
      res[prop] = group[prop]
    })
    return res
  }, {})
  return normalizeMap
}
