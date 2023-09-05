import type { RollupError } from 'rollup'
import type { CompilerError } from './compiler/errors'
import { generateCodeFrame, locToStartAndEnd } from '@dcloudio/uni-cli-shared'

export function createRollupError(
  id: string,
  error: CompilerError | SyntaxError,
  source?: string
): RollupError {
  const { message, name, stack } = error
  const rollupError: RollupError = {
    id,
    plugin: 'vue',
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
      const { start, end } = locToStartAndEnd(source, error.loc)
      rollupError.frame = generateCodeFrame(source, start, end)
    }
  }

  return rollupError
}
