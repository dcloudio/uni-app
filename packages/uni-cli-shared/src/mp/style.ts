const scopedRE = /\[(data-v-[a-f0-9]{8})\]/gi
export function transformScopedCss(cssCode: string) {
  return cssCode.replace(scopedRE, (_, scopedId) => {
    return '.' + scopedId
  })
}
