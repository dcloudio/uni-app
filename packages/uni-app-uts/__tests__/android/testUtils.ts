import { compile } from '../../src/plugins/android/uvue/compiler/index'
import { TemplateCompilerOptions } from '../../src/plugins/android/uvue/compiler/options'
import { NodeTypes } from '@vue/compiler-core'
import {
  isString,
  PatchFlags,
  ShapeFlags,
  PatchFlagNames,
  isArray,
} from '@vue/shared'

export function assert(
  template: string,
  templateCode: string,
  options: Omit<TemplateCompilerOptions, 'rootDir'> = {
    targetLanguage: 'kotlin',
  }
) {
  const compilerOptions: TemplateCompilerOptions = {
    rootDir: '',
    filename: 'pages/index/index.uvue',
    className: 'PagesIndexIndex',
    prefixIdentifiers: true,
    ...options,
  }
  const res = compile(template, compilerOptions)
  if (typeof expect !== 'undefined') {
    expect(res.code).toBe(templateCode)
  }
  return res
}

const leadingBracketRE = /^\[/
const bracketsRE = /^\[|\]$/g

// Create a matcher for an object
// where non-static expressions should be wrapped in []
// e.g.
// - createObjectMatcher({ 'foo': '[bar]' }) matches { foo: bar }
// - createObjectMatcher({ '[foo]': 'bar' }) matches { [foo]: "bar" }
export function createObjectMatcher(obj: Record<string, any>) {
  return {
    type: NodeTypes.JS_OBJECT_EXPRESSION,
    properties: Object.keys(obj).map((key) => ({
      type: NodeTypes.JS_PROPERTY,
      key: {
        type: NodeTypes.SIMPLE_EXPRESSION,
        content: key.replace(bracketsRE, ''),
        isStatic: !leadingBracketRE.test(key),
      },
      value: isString(obj[key])
        ? {
            type: NodeTypes.SIMPLE_EXPRESSION,
            content: obj[key].replace(bracketsRE, ''),
            isStatic: !leadingBracketRE.test(obj[key]),
          }
        : obj[key],
    })),
  }
}

type Flags = PatchFlags | ShapeFlags
export function genFlagText(
  flag: Flags | Flags[],
  names: { [k: number]: string } = PatchFlagNames
) {
  if (isArray(flag)) {
    let f = 0
    flag.forEach((ff) => {
      f |= ff
    })
    return `${f} /* ${flag.map((f) => names[f]).join(', ')} */`
  } else {
    return `${flag} /* ${names[flag]} */`
  }
}
