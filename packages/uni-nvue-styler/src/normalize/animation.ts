import {
  type Normalize,
  splitValues,
  supportedEnumReason,
  validReason,
} from '../utils'
import { createEnumNormalize } from './enum'
import { normalizeTimingFunction } from './timingFunction'

const KEYFRAMES_NAME_RE = /^-?[A-Za-z_][A-Za-z0-9_-]*$/
const ANIMATION_NUMBER_RE = /^[+-]?\d*\.?\d+$/
const RESERVED_KEYFRAMES_NAMES = new Set([
  'default',
  'inherit',
  'initial',
  'none',
  'revert',
  'revert-layer',
  'unset',
])

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
    if (
      /^(?:[+-]?(?:\d+(?:\.\d+)?|\.\d+))(?:ms|s)$/.test(value) &&
      (allowNegative || value[0] !== '-')
    ) {
      return { value }
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
  if (ANIMATION_NUMBER_RE.test(value) && Number(value) >= 0) {
    return { value: Number(value) }
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
const normalizeAnimationTimingFunctionItem: Normalize = (v, options) =>
  normalizeTimingFunction((v || '').toString().toLowerCase(), options)

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
    fillMode: 'none',
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

export const normalizeAnimation: Normalize = (v) =>
  parseAnimation((v || '').toString())
    ? { value: v }
    : { value: null, reason: validReason }

export const normalizeAnimationDelay = createAnimationListNormalize(
  normalizeAnimationDelayItem
)
export const normalizeAnimationDirection = createAnimationListNormalize(
  normalizeAnimationDirectionItem
)
export const normalizeAnimationDuration = createAnimationListNormalize(
  normalizeAnimationDurationItem
)
export const normalizeAnimationFillMode = createAnimationListNormalize(
  normalizeAnimationFillModeItem
)
export const normalizeAnimationIterationCount = createAnimationListNormalize(
  normalizeAnimationIterationCountItem
)
export const normalizeAnimationName = createAnimationListNormalize(
  normalizeAnimationNameItem
)
export const normalizeAnimationPlayState = createAnimationListNormalize(
  normalizeAnimationPlayStateItem
)
export const normalizeAnimationTimingFunction = createAnimationListNormalize(
  normalizeAnimationTimingFunctionItem
)
