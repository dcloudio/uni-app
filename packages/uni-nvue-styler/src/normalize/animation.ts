import {
  type Normalize,
  type Property,
  splitValues,
  supportedEnumReason,
  validReason,
} from '../utils'
import { createEnumNormalize, createEnumNormalizeWithPlatform } from './enum'
import { normalizeTimingFunction } from './timingFunction'

const KEYFRAMES_NAME_RE = /^-?[A-Za-z_][A-Za-z0-9_-]*$/
const ANIMATION_NUMBER_RE = /^[+-]?\d*\.?\d+$/
const MAX_F32_VALUE = 3.4028234663852886e38
const RESERVED_KEYFRAMES_NAMES = new Set([
  'default',
  'inherit',
  'initial',
  'none',
  'revert',
  'revert-layer',
  'unset',
])

function normalizeAnimationDecimal(value: string): string {
  const negative = value[0] === '-'
  const unsigned = value.replace(/^[+-]/, '')
  const [integer = '', fraction = ''] = unsigned.split('.')
  const normalizedInteger = integer.replace(/^0+(?=\d)/, '') || '0'
  const normalizedFraction = fraction.replace(/0+$/, '')
  const normalized = normalizedFraction
    ? `${normalizedInteger}.${normalizedFraction}`
    : normalizedInteger
  return negative && normalized !== '0' ? `-${normalized}` : normalized
}

function splitAnimationList(value: string): string[] | null {
  const result: string[] = []
  let start = 0
  let depth = 0
  for (let i = 0; i < value.length; i++) {
    const char = value[i]
    if (char === '(') {
      depth++
    } else if (char === ')') {
      if (depth === 0) {
        return null
      }
      depth--
    } else if (char === ',' && depth === 0) {
      const item = value.slice(start, i).trim()
      if (!item) {
        return null
      }
      result.push(item)
      start = i + 1
    }
  }
  if (depth !== 0) {
    return null
  }
  const item = value.slice(start).trim()
  if (!item) {
    return null
  }
  result.push(item)
  return result
}

function createAnimationListNormalize(normalize: Normalize): Normalize {
  return (v, options) => {
    const items = splitAnimationList((v || '').toString())
    if (!items) {
      return {
        value: null,
        reason: validReason,
      }
    }

    const values: Array<string | number> = []
    for (let i = 0; i < items.length; i++) {
      const result = normalize(items[i], options)
      if (result.value === null) {
        return result
      }
      values.push(result.value)
    }
    return {
      value: values.length === 1 ? values[0] : values.join(','),
    }
  }
}

function createAnimationTimeNormalize(allowNegative: boolean): Normalize {
  return (v) => {
    const value = (v || '').toString().toLowerCase()
    const match = value.match(/^([+-]?(?:\d+(?:\.\d+)?|\.\d+))(ms|s)$/)
    if (match && (allowNegative || value[0] !== '-')) {
      const milliseconds = Number(match[1]) * (match[2] === 's' ? 1000 : 1)
      if (
        Number.isFinite(milliseconds) &&
        Math.abs(milliseconds) <= MAX_F32_VALUE
      ) {
        return { value }
      }
    }
    return {
      value: null,
      reason(k, v) {
        return supportedEnumReason(k, v, [
          allowNegative ? 'time' : 'non-negative time',
        ])
      },
    }
  }
}

const normalizeAnimationNameItem: Normalize = (v) => {
  const value = (v || '').toString()
  const lowerValue = value.toLowerCase()
  if (lowerValue === 'none') {
    return { value: 'none' }
  }
  if (
    KEYFRAMES_NAME_RE.test(value) &&
    !RESERVED_KEYFRAMES_NAMES.has(lowerValue)
  ) {
    return { value }
  }
  return {
    value: null,
    reason: validReason,
  }
}

const normalizeAnimationIterationCountItem: Normalize = (v) => {
  const value = (v || '').toString().toLowerCase()
  if (value === 'infinite') {
    return { value }
  }
  const count = Number(value)
  if (ANIMATION_NUMBER_RE.test(value) && Number.isFinite(count) && count >= 0) {
    const normalizedValue = normalizeAnimationDecimal(value)
    return {
      value: normalizedValue === count.toString() ? count : normalizedValue,
    }
  }
  return {
    value: null,
    reason(k, v) {
      return supportedEnumReason(k, v, ['non-negative number', 'infinite'])
    },
  }
}

function createAnimationKeywordNormalize(
  items: Array<string | number>
): Normalize {
  const normalize = createEnumNormalize(items)
  return (v, options) => normalize((v || '').toString().toLowerCase(), options)
}

function createSupportedAnimationKeywordNormalize(
  property: Property
): Normalize {
  const normalize = createEnumNormalizeWithPlatform(property.values || [])
  return (v, options) => normalize((v || '').toString().toLowerCase(), options)
}

function createAnimationSyntaxOrKeywordNormalize(
  syntaxNormalize: Normalize,
  property: Property
): Normalize {
  const keywords = new Set(
    (property.values || []).map((item) => item.name.toLowerCase())
  )
  const keywordNormalize = createSupportedAnimationKeywordNormalize(property)
  return (v, options) => {
    const value = (v || '').toString().toLowerCase()
    return keywords.has(value)
      ? keywordNormalize(value, options)
      : syntaxNormalize(value, options)
  }
}

const normalizeAnimationDelayItem = createAnimationTimeNormalize(true)
const normalizeAnimationDirectionItem = createAnimationKeywordNormalize([
  'normal',
  'reverse',
  'alternate',
  'alternate-reverse',
])
const normalizeAnimationDurationItem = createAnimationTimeNormalize(false)
const normalizeAnimationFillModeItem = createAnimationKeywordNormalize([
  'none',
  'forwards',
  'backwards',
  'both',
])
const normalizeAnimationPlayStateItem = createAnimationKeywordNormalize([
  'running',
  'paused',
])
const normalizeAnimationTimingFunctionItem: Normalize = (v, options) => {
  const value = (v || '').toString().toLowerCase()
  const result = normalizeTimingFunction(value, options)
  if (
    typeof result.value === 'string' &&
    result.value.startsWith('cubic-bezier(')
  ) {
    const values = value
      .slice(13, -1)
      .split(',')
      .map((item) => item.trim())
    const numbers = values.map(Number)
    if (
      numbers.some(
        (value) => !Number.isFinite(value) || Math.abs(value) > MAX_F32_VALUE
      )
    ) {
      return normalizeTimingFunction('', options)
    }
    result.value = `cubic-bezier(${values
      .map(normalizeAnimationDecimal)
      .join(',')})`
  }
  return result
}

function isValidValue(normalize: Normalize, value: string) {
  return normalize(value, {}).value !== null
}

export interface AnimationLonghands {
  name: string
  duration: string
  delay: string
  timingFunction: string
  iterationCount: string
  direction: string
  fillMode: string
  playState: string
}

function parseSingleAnimation(value: string): AnimationLonghands | null {
  const tokens = splitValues(value)
  if (!tokens.length) {
    return null
  }

  const result: AnimationLonghands = {
    name: 'none',
    duration: '0s',
    delay: '0s',
    timingFunction: 'ease',
    iterationCount: '1',
    direction: 'normal',
    fillMode: 'forwards',
    playState: 'running',
  }
  let hasDuration = false
  let hasDelay = false
  let hasTimingFunction = false
  let hasIterationCount = false
  let hasDirection = false
  let hasFillMode = false
  let hasPlayState = false
  let hasName = false
  let noneCount = 0

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    const keyword = token.toLowerCase()
    if (keyword === 'none') {
      noneCount++
      continue
    }
    if (isValidValue(normalizeAnimationDelayItem, keyword)) {
      if (!hasDuration) {
        if (!isValidValue(normalizeAnimationDurationItem, keyword)) {
          return null
        }
        result.duration = keyword
        hasDuration = true
      } else if (!hasDelay) {
        result.delay = keyword
        hasDelay = true
      } else {
        return null
      }
      continue
    }
    if (
      !hasTimingFunction &&
      isValidValue(normalizeAnimationTimingFunctionItem, keyword)
    ) {
      result.timingFunction = keyword
      hasTimingFunction = true
      continue
    }
    if (
      !hasIterationCount &&
      isValidValue(normalizeAnimationIterationCountItem, keyword)
    ) {
      result.iterationCount = keyword
      hasIterationCount = true
      continue
    }
    if (
      !hasDirection &&
      isValidValue(normalizeAnimationDirectionItem, keyword)
    ) {
      result.direction = keyword
      hasDirection = true
      continue
    }
    if (!hasFillMode && isValidValue(normalizeAnimationFillModeItem, keyword)) {
      result.fillMode = keyword
      hasFillMode = true
      continue
    }
    if (
      !hasPlayState &&
      isValidValue(normalizeAnimationPlayStateItem, keyword)
    ) {
      result.playState = keyword
      hasPlayState = true
      continue
    }
    if (!hasName && isValidValue(normalizeAnimationNameItem, token)) {
      result.name = token
      hasName = true
      continue
    }
    return null
  }

  // none 同时属于 animation-name 和 animation-fill-mode，按剩余槽位消歧。
  for (let i = 0; i < noneCount; i++) {
    if (!hasName) {
      result.name = 'none'
      hasName = true
    } else if (!hasFillMode) {
      result.fillMode = 'none'
      hasFillMode = true
    } else {
      return null
    }
  }
  return result
}

export function parseAnimation(value: string): AnimationLonghands | null {
  const items = splitAnimationList(value)
  if (!items) {
    return null
  }
  const animations: AnimationLonghands[] = []
  for (let i = 0; i < items.length; i++) {
    const animation = parseSingleAnimation(items[i])
    if (!animation) {
      return null
    }
    animations.push(animation)
  }
  return {
    name: animations.map((animation) => animation.name).join(','),
    duration: animations.map((animation) => animation.duration).join(','),
    delay: animations.map((animation) => animation.delay).join(','),
    timingFunction: animations
      .map((animation) => animation.timingFunction)
      .join(','),
    iterationCount: animations
      .map((animation) => animation.iterationCount)
      .join(','),
    direction: animations.map((animation) => animation.direction).join(','),
    fillMode: animations.map((animation) => animation.fillMode).join(','),
    playState: animations.map((animation) => animation.playState).join(','),
  }
}

const normalizeAnimation: Normalize = (v) =>
  parseAnimation((v || '').toString())
    ? { value: v }
    : { value: null, reason: validReason }

function createAnimationTimingFunctionNormalize(property: Property) {
  const keywordNormalize = createSupportedAnimationKeywordNormalize(property)
  const itemNormalize: Normalize = (v, options) => {
    const value = (v || '').toString().toLowerCase()
    const result = normalizeAnimationTimingFunctionItem(value, options)
    if (result.value === null) {
      return result
    }
    const keyword =
      typeof result.value === 'string' &&
      result.value.startsWith('cubic-bezier(')
        ? 'cubic-bezier()'
        : value
    const supported = keywordNormalize(keyword, options)
    return supported.value === null ? supported : result
  }
  return createAnimationListNormalize(itemNormalize)
}

export const animationNormalizeFactoryMap: Record<
  string,
  (property: Property) => Normalize
> = {
  animation: () => normalizeAnimation,
  animationDelay: () =>
    createAnimationListNormalize(normalizeAnimationDelayItem),
  animationDirection: (property) =>
    createAnimationListNormalize(
      createSupportedAnimationKeywordNormalize(property)
    ),
  animationDuration: (property) =>
    createAnimationListNormalize(
      createAnimationSyntaxOrKeywordNormalize(
        normalizeAnimationDurationItem,
        property
      )
    ),
  animationFillMode: (property) =>
    createAnimationListNormalize(
      createSupportedAnimationKeywordNormalize(property)
    ),
  animationIterationCount: (property) =>
    createAnimationListNormalize(
      createAnimationSyntaxOrKeywordNormalize(
        normalizeAnimationIterationCountItem,
        property
      )
    ),
  animationName: (property) =>
    createAnimationListNormalize(
      createAnimationSyntaxOrKeywordNormalize(
        normalizeAnimationNameItem,
        property
      )
    ),
  animationPlayState: (property) =>
    createAnimationListNormalize(
      createSupportedAnimationKeywordNormalize(property)
    ),
  animationTimingFunction: createAnimationTimingFunctionNormalize,
}
