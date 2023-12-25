import { relative } from '../utils'

export { parseUTSSwiftPluginStacktrace } from './swift'

export {
  parseUTSKotlinStacktrace,
  parseUTSKotlinRuntimeStacktrace,
} from './kotlin'

export function parseUTSSyntaxError(error: any, inputDir: string): string {
  if (error instanceof Error) {
    error = error.message
  }
  let msg = String(error).replace(/\t/g, ' ')
  let res: RegExpExecArray | null = null
  const syntaxErrorRe = /(,-\[(.*):(\d+):(\d+)\])/g
  while ((res = syntaxErrorRe.exec(msg))) {
    const [row, filename, line, column] = res.slice(1)
    msg = msg.replace(
      row,
      `at ${relative(filename.split('?')[0], inputDir)}:${
        parseInt(line) + 3
      }:${column}`
    )
  }
  return msg
}
