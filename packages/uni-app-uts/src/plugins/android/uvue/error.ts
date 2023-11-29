import type { RollupError } from 'rollup'
import type { CompilerError } from './compiler/errors'
import { generateCodeFrame, locToStartAndEnd } from '@dcloudio/uni-cli-shared'

export function createRollupError(
  plugin: string,
  id: string,
  error: CompilerError | SyntaxError,
  source?: string
): RollupError {
  const { message, name, stack } = error
  const rollupError: RollupError = {
    id,
    plugin,
    message,
    name,
    stack,
  }

  if ('code' in error && error.loc) {
    rollupError.loc = {
      file: id,
      line: error.loc.start.line,
      column: error.loc.start.column,
    }
    if (source && source.length > 0) {
      if ('offsetStart' in error && 'offsetEnd' in error) {
        rollupError.frame = generateCodeFrame(
          source,
          error.offsetStart as number,
          error.offsetEnd as number
        ).replace(/\t/g, ' ')
      } else {
        const { start, end } = locToStartAndEnd(source, error.loc)
        rollupError.frame = generateCodeFrame(source, start, end).replace(
          /\t/g,
          ' '
        )
      }
    }
  }

  return rollupError
}
