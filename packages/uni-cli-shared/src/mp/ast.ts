import type { Program } from '@babel/types'
import { parse, ParserPlugin } from '@babel/parser'
import { normalizeParsePlugins } from '../utils'

export function parseProgram(
  code: string,
  importer: string,
  { babelParserPlugins }: { babelParserPlugins?: ParserPlugin[] }
): Program {
  return parse(code, {
    plugins: normalizeParsePlugins(importer, babelParserPlugins),
    sourceType: 'module',
  }).program
}
