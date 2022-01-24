import postcss from 'postcss'
import { expand, normalize } from '../src'
export function parseCss(input: string, filename: string = 'foo.css') {
  return postcss([expand, normalize({ descendant: false, logLevel: 'NOTE' })])
    .process(input, {
      from: filename,
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
