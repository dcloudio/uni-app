import MagicString, { type SourceMapOptions } from 'magic-string'
import { matchRecursive } from 'xregexp'

export type { SourceMapOptions } from 'magic-string'

export type ProcessContext = Record<string, any>
export interface PreprocessOptions {
  type?: 'js' | 'html'
  context: ProcessContext
  sourceMap?: SourceMapOptions
}

export function preprocess(source: string, options: PreprocessOptions) {
  let isInPreprocessor = (_offset: number) => false
  if (!source.includes('#endif')) {
    return {
      code: source,
      map: options.sourceMap
        ? new MagicString(source).generateMap(options.sourceMap)
        : null,
      isInPreprocessor,
    }
  }

  const context = options.context || {}
  const s = new MagicString(source)

  // [[start,end]]
  const ranges: [number, number][] = []

  isInPreprocessor = (offset: number) => {
    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i]
      if (range[0] <= offset && offset < range[1]) {
        return true
      }
    }
    return false
  }

  function preprocessByType(type: PreprocessType) {
    replaceRecursive(
      type,
      source,
      s,
      (s, startMatches, endMatches, include, recurse) => {
        // I need to recurse first, so I don't catch "inner" else-directives
        recurse(include.value, include.start)

        const variant = startMatches.value[1]
        const test = (startMatches.value[2] || '').trim()
        switch (variant) {
          case 'ifdef':
            if (testPasses(test, context)) {
              s.remove(startMatches.start, startMatches.end)
              s.remove(endMatches.start, endMatches.end)
            } else {
              s.remove(startMatches.start, endMatches.end)
            }
            ranges.push([startMatches.start, endMatches.end])
            return
          case 'ifndef':
            if (!testPasses(test, context)) {
              s.remove(startMatches.start, startMatches.end)
              s.remove(endMatches.start, endMatches.end)
            } else {
              s.remove(startMatches.start, endMatches.end)
            }
            ranges.push([startMatches.start, endMatches.end])
            return
          default:
            throw new Error('Unknown if variant ' + variant + '.')
        }
      }
    )
  }
  const type = options.type || 'auto'
  if (type === 'auto' || type === 'js') {
    preprocessByType(TYPES.js)
  }
  if (type === 'auto' || type === 'html') {
    preprocessByType(TYPES.html)
  }
  return {
    code: s.toString(),
    map: options.sourceMap ? s.generateMap(options.sourceMap) : null,
    isInPreprocessor,
  }
}

type Processor = (
  s: MagicString,
  startMatches: MatchGroupLeft,
  endMatches: MatchGroupRight,
  include: MatchGroupMatch,
  recurse: (content: string, startOffset: number) => void
) => void

const startPattern =
  '[ \t]*(?://|/\\*)[ \t]*#(ifndef|ifdef)[ \t]+([^\n*]*)(?:\\*(?:\\*|/))?(?:[ \t]*\n)?'
const endPattern =
  '[ \t]*(?://|/\\*)[ \t]*#endif[ \t]*(?:\\*(?:\\*|/))?(?:[ \t]*\n)?'

const startPatternHTML =
  '[ \t]*<!--[ \t]*#(ifndef|ifdef|if)[ \t]+(.*?)[ \t]*(?:-->|!>)(?:[ \t]*\n)?'
const endPatternHTML =
  '[ \t]*<!(?:--)?[ \t]*#endif[ \t]*(?:-->|!>)(?:[ \t]*\n)?'

interface PreprocessType {
  start: {
    pattern: string
    regex: RegExp
  }
  end: {
    pattern: string
    regex: RegExp
  }
}

const TYPES: Record<string, PreprocessType> = {
  js: {
    start: {
      pattern: startPattern,
      regex: new RegExp(startPattern, 'mi'),
    },
    end: {
      pattern: endPattern,
      regex: new RegExp(endPattern, 'mi'),
    },
  },
  html: {
    start: {
      pattern: startPatternHTML,
      regex: new RegExp(startPatternHTML, 'mi'),
    },
    end: {
      pattern: endPatternHTML,
      regex: new RegExp(endPatternHTML, 'mi'),
    },
  },
}

interface MatchGroupItem {
  start: number
  end: number
}
interface MatchGroupMatch extends MatchGroupItem {
  value: string
}
interface MatchGroupLeft extends MatchGroupItem {
  value: RegExpExecArray
}

type MatchGroupRight = MatchGroupLeft

function replaceRecursive(
  type: PreprocessType,
  source: string,
  s: MagicString,
  processor: Processor
) {
  function matchReplacePass(content: string, startOffset: number = 0) {
    const matches = matchRecursive(
      content,
      type.start.pattern,
      type.end.pattern,
      'gmi',
      {
        valueNames: ['between', 'left', 'match', 'right'],
      }
    )

    let left: MatchGroupLeft | null = null
    let match: MatchGroupMatch | null = null
    let right: MatchGroupRight | null = null
    matches.forEach(function ({ name, value, start, end }) {
      start = start + startOffset
      end = end + startOffset
      switch (name) {
        case 'between':
          break
        case 'left':
          left = {
            start,
            end,
            value: type.start.regex.exec(value)!,
          }
          break
        case 'match':
          match = {
            start,
            end,
            value,
          }
          break
        case 'right':
          right = {
            start,
            end,
            value: type.end.regex.exec(value)!,
          }
          if (left && match && right) {
            processor(s, left, right, match, matchReplacePass)
            left = null
            match = null
            right = null
          }
          break
      }
    })
  }

  matchReplacePass(source)
}

function getTestTemplate(test: string) {
  test = test || 'true'
  test = test.trim()

  // force single equals replacement
  // 不替换，会影响 >= 等判断
  // test = test.replace(/([^=!])=([^=])/g, '$1==$2');
  test = test.replace(/-/g, '_')
  return new Function(
    'context',
    'with (context||{}){ return ( ' + test + ' ); }'
  )
}

function testPasses(test: string, context: ProcessContext) {
  var testFn = getTestTemplate(test)
  try {
    return testFn(context)
  } catch (e) {}
  return false
}
