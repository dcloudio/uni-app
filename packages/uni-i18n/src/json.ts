import { default as BaseFormatter, isObject } from './format'
import type { Formatter } from './I18n'

export const isString = (val: unknown): val is string => typeof val === 'string'

let formater: Formatter | null

interface LocaleValue {
  locale: string
  values: Record<string, unknown>
}
type LocaleValues = LocaleValue[]

export function hasI18nJson(
  jsonObj: unknown,
  delimiters: [string, string]
): boolean {
  if (!formater) {
    formater = new BaseFormatter()
  }
  return walkJsonObj(jsonObj, (jsonObj, key) => {
    const value = (jsonObj as Record<string | number, unknown>)[key]
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true
      }
    } else {
      return hasI18nJson(value, delimiters)
    }
  })
}

export function parseI18nJson(
  jsonObj: unknown,
  values: Record<string, string>,
  delimiters: [string, string]
) {
  if (!formater) {
    formater = new BaseFormatter()
  }
  walkJsonObj(jsonObj, (jsonObj, key) => {
    const value = (jsonObj as Record<string | number, unknown>)[key]
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        ;(jsonObj as Record<string | number, unknown>)[key] = compileStr(
          value,
          values,
          delimiters
        )
      }
    } else {
      parseI18nJson(value, values, delimiters)
    }
  })
  return jsonObj
}

export function compileI18nJsonStr(
  jsonStr: string,
  {
    locale,
    locales,
    delimiters,
  }: {
    locale: string
    locales: Record<string, Record<string, string>>
    delimiters: [string, string]
  }
) {
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr
  }
  if (!formater) {
    formater = new BaseFormatter()
  }
  const localeValues: LocaleValues = []
  Object.keys(locales).forEach((name) => {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name],
      })
    }
  })
  localeValues.unshift({ locale, values: locales[locale] })
  try {
    return JSON.stringify(
      compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters),
      null,
      2
    )
  } catch (e) {}
  return jsonStr
}

export function isI18nStr(value: string, delimiters: [string, string]) {
  return value.indexOf(delimiters[0]) > -1
}

function compileStr(
  value: string,
  values: LocaleValue['values'],
  delimiters: [string, string]
) {
  return formater!.interpolate(value, values, delimiters).join('')
}

function compileValue(
  jsonObj: Record<string, unknown> | unknown[],
  key: string | number,
  localeValues: LocaleValues,
  delimiters: [string, string]
) {
  const value = (jsonObj as Record<string | number, unknown>)[key]
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      // 格式化默认语言
      ;(jsonObj as Record<string | number, unknown>)[key] = compileStr(
        value,
        localeValues[0].values,
        delimiters
      )
      if (localeValues.length > 1) {
        // 格式化国际化语言
        const valueLocales: Record<string, string> = ((
          jsonObj as Record<string | number, unknown>
        )[key + 'Locales'] = {})
        localeValues.forEach((localValue) => {
          valueLocales[localValue.locale] = compileStr(
            value,
            localValue.values,
            delimiters
          )
        })
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters)
  }
}

function compileJsonObj(
  jsonObj: unknown,
  localeValues: LocaleValues,
  delimiters: [string, string]
) {
  walkJsonObj(jsonObj, (jsonObj, key) => {
    compileValue(jsonObj, key, localeValues, delimiters)
  })
  return jsonObj
}

type WalkJson = (
  jsonObj: unknown[] | Record<string, unknown>,
  key: number | string
) => void | boolean

function walkJsonObj(jsonObj: unknown, walk: WalkJson) {
  if (Array.isArray(jsonObj)) {
    for (let i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true
      }
    }
  } else if (isObject(jsonObj)) {
    for (const key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true
      }
    }
  }
  return false
}
