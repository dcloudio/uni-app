import postcss, { Message } from 'postcss'
import { objectifier } from '.'
import { expand } from './expand'
import { NormalizeOptions, normalize } from './normalize'

interface ParseOpitons extends NormalizeOptions {
  filename?: string
}
export async function parse(input: string, options: ParseOpitons = {}) {
  const { root, messages } = await postcss([expand, normalize(options)])
    .process(input, {
      from: options.filename || 'foo.css',
    })
    .catch((err: any) => {
      return {
        root: null,
        messages: [
          {
            type: 'warning',
            text: err.message,
          } as Message,
        ],
      }
    })
  if (root) {
    return { code: JSON.stringify(objectifier(root)), messages }
  }
  return { code: JSON.stringify({}), messages }
}
