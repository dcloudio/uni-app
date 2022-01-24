import postcss from 'postcss'
import { NormalizeOptions } from './normalize'
import { expand, normalize } from '../src'

interface ParseOpitons extends NormalizeOptions {
  filename?: string
}
export function parse(input: string, options: ParseOpitons = {}) {
  return postcss([expand, normalize(options)])
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
          },
        ],
      }
    })
}
