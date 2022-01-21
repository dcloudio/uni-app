import { parse, ParserPlugin } from '@babel/parser'
import { normalizeParsePlugins } from '../utils'

export function parseProgram(
  code: string,
  importer: string,
  { babelParserPlugins }: { babelParserPlugins?: ParserPlugin[] }
) {
  return parse(code, {
    plugins: normalizeParsePlugins(importer, babelParserPlugins),
    sourceType: 'module',
  }).program
}
