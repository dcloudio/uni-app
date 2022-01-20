import postcss from 'postcss'
export function parse(input: string) {
  return postcss.parse(input)
}
