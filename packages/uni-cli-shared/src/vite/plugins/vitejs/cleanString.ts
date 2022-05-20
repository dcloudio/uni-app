import { multilineCommentsRE } from './utils'

const blankReplacer = (s: string) => ' '.repeat(s.length)
export function emptyCssComments(raw: string) {
  return raw.replace(multilineCommentsRE, blankReplacer)
}
