import { HTML_TO_MINI_PROGRAM_TAGS } from './tags'
import { output } from '../logs'
import { getPartClass } from '@dcloudio/uni-shared'

export function transformScopedCss(cssCode: string) {
  checkHtmlTagSelector(cssCode)

  return cssCode.replace(/\[(data-v-[a-f0-9]{8})\]/gi, (_, scopedId) => {
    return '.' + scopedId
  })
}

export function transformPartSelector(cssCode: string) {
  return cssCode.replace(/::part\(([^)]+)\)/gi, (_, partName) => {
    return ' ' + getPartClass(partName.trim())
  })
}

function checkHtmlTagSelector(cssCode: string) {
  for (const tag in HTML_TO_MINI_PROGRAM_TAGS) {
    if (new RegExp(`( |\n|\t|,|})${tag}( *)(,|{)`, 'g').test(cssCode)) {
      output(
        'warn',
        `小程序端 style 暂不支持 ${tag} 标签选择器，推荐使用 class 选择器，详情参考：https://uniapp.dcloud.net.cn/tutorial/migration-to-vue3.html#style`
      )
      break
    }
  }
}
