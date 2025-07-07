'use strict'

import { STACK_ERROR_PLACEHOLDER } from './utils'

interface EntryMetadata {
  beforeParse: string
  callee: string
  index: boolean
  native: boolean
  file: string
  line: number | undefined
  column: number | undefined
  calleeShort?: string
}

/*  ------------------------------------------------------------------------ */

const O = Object,
  isBrowser =
    /* eslint-disable */
    typeof window !== 'undefined' &&
    /* eslint-disable */
    window.window === window &&
    /* eslint-disable */
    window.navigator,
  // @ts-ignore
  nodeRequire = isBrowser ? null : module.require, // to prevent bundlers from expanding the require call
  lastOf = (x: Array<any>) => x[x.length - 1],
  nixSlashes = (x: string) => x.replace(/\\/g, '/'),
  pathRoot = isBrowser ? window.location.href : nixSlashes(process.cwd()) + '/'

/*  ------------------------------------------------------------------------ */

class StackTracey {
  items: StackTracey.Entry[]
  itemsHeader: string[] = []
  isMP: boolean = false

  constructor(
    input: string | Error | any,
    uniPlatform?: string,
    offset?: number
  ) {
    const originalInput = input,
      isParseableSyntaxError =
        input && input instanceof SyntaxError && !isBrowser

    /*  new StackTracey ()            */

    if (!input) {
      input = new Error()
      offset = offset === undefined ? 1 : offset
    }

    /*  new StackTracey (Error)      */

    if (input instanceof Error) {
      input = input.stack || ''
    }

    /*  new StackTracey (string)     */

    if (typeof input === 'string') {
      this.isMP = uniPlatform === 'mp-weixin'
      input = (this.rawParse(input) as EntryMetadata[])
        .slice(offset)
        .map((x: EntryMetadata) => this.extractEntryMetadata(x))
    }

    /*  new StackTracey (array)      */

    if (Array.isArray(input)) {
      if (isParseableSyntaxError) {
        const rawLines = nodeRequire!('util')
            .inspect(originalInput)
            .split('\n'),
          fileLine = rawLines[0].split(':'),
          line = fileLine.pop(),
          file = fileLine.join(':')

        if (file) {
          input.unshift({
            file: nixSlashes(file),
            line: line,
            column: (rawLines[2] || '').indexOf('^') + 1,
            sourceLine: rawLines[1],
            callee: '(syntax error)',
            syntaxError: true,
          })
        }
      }

      this.items = input
    } else {
      this.items = []
    }
  }

  extractEntryMetadata(e: EntryMetadata) {
    const decomposedPath = this.decomposePath(e.file || '')
    const fileRelative = decomposedPath[0]
    const externalDomain = decomposedPath[1]

    return O.assign(e, {
      calleeShort: e.calleeShort || lastOf((e.callee || '').split('.')),
      fileRelative: fileRelative,
      fileShort: this.shortenPath(fileRelative),
      fileName: lastOf((e.file || '').split('/')),
      thirdParty: this.isThirdParty(fileRelative, externalDomain) && !e.index,
      externalDomain: externalDomain,
    })
  }

  shortenPath(relativePath: string) {
    return relativePath
      .replace(/^node_modules\//, '')
      .replace(/^webpack\/bootstrap\//, '')
      .replace(/^__parcel_source_root\//, '')
  }

  decomposePath(fullPath: string): string[] {
    let result = fullPath

    if (isBrowser) result = result.replace(pathRoot, '')

    const externalDomainMatch = result.match(
      /^(http|https)\:\/\/?([^\/]+)\/{1,}(.*)/
    )
    const externalDomain = externalDomainMatch
      ? externalDomainMatch[2]
      : undefined
    result = externalDomainMatch ? externalDomainMatch[3] : result

    // if (!isBrowser) result = nodeRequire!('path').relative(pathRoot, result)

    return [
      nixSlashes(result).replace(/^.*\:\/\/?\/?/, ''), // cut webpack:/// and webpack:/ things
      externalDomain!,
    ]
  }

  isThirdParty(relativePath: string, externalDomain: string) {
    if (this.isMP) {
      if (typeof externalDomain === 'undefined') return false
      return externalDomain !== 'usr'
    }
    return (
      // 由于 hello-uniapp web 端报错携带 hellouniapp.dcloud.net.cn
      // externalDomain ||
      relativePath[0] === '~' || // webpack-specific heuristic
      relativePath[0] === '/' || // external source
      relativePath.indexOf('@dcloudio') !== -1 ||
      relativePath.indexOf('weex-main-jsfm') !== -1 ||
      relativePath.indexOf('webpack/bootstrap') === 0
    )
  }

  rawParse(str: string) {
    const lines = (str || '').split('\n')

    const entries = lines.map((line, index) => {
      line = line.trim()

      let callee,
        fileLineColumn = [],
        native,
        planA,
        planB

      if (line.indexOf('file:') !== -1) {
        line = line.replace(/file:\/\/(.*)www/, 'file://')
      }

      if (
        (planA = line.match(/at (.+) \(eval at .+ \((.+)\), .+\)/)) || // eval calls
        (planA = line.match(/at (.+) \((.+)\)/)) ||
        (line.slice(0, 3) !== 'at ' && (planA = line.match(/(.*)@(.*)/)))
      ) {
        this.itemsHeader.push(STACK_ERROR_PLACEHOLDER)
        callee = planA[1]
        native = planA[2] === 'native'
        fileLineColumn = (
          planA[2].match(/(.*):(\d+):(\d+)/) ||
          planA[2].match(/(.*):(\d+)/) ||
          planA[2].match(/\[(.*)\]/) ||
          []
        ).slice(1)
      } else if ((planB = line.match(/^(at\s*)*(.*)\s+(.+):(\d+):(\d+)/))) {
        this.itemsHeader.push(STACK_ERROR_PLACEHOLDER)
        callee = planB[2].trim()
        fileLineColumn = planB.slice(3)
      } else {
        this.itemsHeader.push(line)
        return undefined
      }

      /*  Detect things like Array.reduce
          TODO: detect more built-in types            */

      if (callee && !fileLineColumn[0]) {
        const type = callee.split('.')[0]
        if (type === 'Array') {
          native = true
        }
      }

      return {
        beforeParse: line,
        callee: callee || '',
        /* eslint-disable */
        index: isBrowser && fileLineColumn[0] === window.location.href,
        native: native || false,
        file: nixSlashes(fileLineColumn[0] || ''),
        line: parseInt(fileLineColumn[1] || '', 10) || undefined,
        column: parseInt(fileLineColumn[2] || '', 10) || undefined,
      }
    })

    return entries.filter((x) => x !== undefined)
  }

  maxColumnWidths() {
    return {
      callee: 30,
      file: 60,
      sourceLine: 80,
    }
  }

  asTable(opts?: { maxColumnWidths: StackTracey.MaxColumnWidths }) {
    const maxColumnWidths =
      (opts && opts.maxColumnWidths) || this.maxColumnWidths()

    const trimmed = (this as any)
      .filter((e: StackTracey.Entry) => !e.thirdParty)
      .map((e: StackTracey.Entry) => parseItem(e, maxColumnWidths, this.isMP))

    const trimmedThirdParty = (this as any)
      .filter((e: StackTracey.Entry) => e.thirdParty)
      .map((e: StackTracey.Entry) => parseItem(e, maxColumnWidths, this.isMP))

    return {
      items: trimmed.items as Array<string[]>,
      thirdPartyItems: trimmedThirdParty.items as Array<string[]>,
    }
  }
}

const trimEnd = (s: string, n: number) =>
  s && (s.length > n ? s.slice(0, n - 1) + '…' : s)
const trimStart = (s: string, n: number) =>
  s && (s.length > n ? '…' + s.slice(-(n - 1)) : s)

function parseItem(
  e: StackTracey.Entry,
  maxColumnWidths: StackTracey.MaxColumnWidths,
  isMP: boolean
) {
  if (!e.parsed) {
    return e.beforeParse
  }
  const filePath =
    (isMP ? e.file && e.file : e.fileShort && e.fileShort) +
    `${typeof e.line !== 'undefined' ? ':' + e.line : ''}` +
    `${typeof e.column !== 'undefined' ? ':' + e.column : ''}`
  return [
    'at ' + trimEnd(isMP ? e.callee : e.calleeShort, maxColumnWidths.callee),
    trimStart(filePath || '', maxColumnWidths.file),
    trimEnd((e.sourceLine || '').trim() || '', maxColumnWidths.sourceLine),
  ]
}

/*  Array methods
    ------------------------------------------------------------------------ */

;['map', 'filter', 'slice', 'concat'].forEach((method) => {
  ;(StackTracey.prototype as any)[method] = function (/*...args */) {
    // no support for ...args in Node v4 :(
    return new StackTracey(this.items[method].apply(this.items, arguments))
  }
})

/*  ------------------------------------------------------------------------ */

export default StackTracey

declare namespace StackTracey {
  interface SourceFile {
    path: string
    text: string
    lines: string[]
    error?: Error
  }

  interface Location {
    file: string
    line?: number
    column?: number
  }

  interface Entry extends Location {
    beforeParse: string
    callee: string
    index: boolean
    native: boolean

    calleeShort: string
    fileRelative: string
    fileShort: string
    fileName: string
    thirdParty: boolean

    hide?: boolean
    sourceLine?: string
    sourceFile?: SourceFile
    error?: Error
    line?: number
    column?: number

    parsed?: boolean
  }

  interface MaxColumnWidths {
    callee: number
    file: number
    sourceLine: number
  }
}
