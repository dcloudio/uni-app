import { SFCStyleBlock } from '@vue/compiler-sfc'

export function genStyle(
  styles: SFCStyleBlock[],
  { filename }: { filename: string }
) {
  return `export const ${filename}Styles = []`
}
