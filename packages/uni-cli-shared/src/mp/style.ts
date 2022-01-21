export function transformScopedCss(cssCode: string) {
  return cssCode.replace(/\[(data-v-[a-f0-9]{8})\]/gi, (_, scopedId) => {
    return '.' + scopedId
  })
}
