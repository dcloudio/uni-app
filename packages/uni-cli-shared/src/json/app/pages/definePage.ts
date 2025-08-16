import { normalizeIdentifier, normalizePagePath } from '../../../utils'

export function definePageCode(
  pagesJson: Record<string, any>,
  platform: UniApp.PLATFORM = 'app',
  dynamicImport: boolean = false
) {
  const importPagesCode: string[] = []
  const definePagesCode: string[] = []
  pagesJson.pages.forEach((page: UniApp.PagesJsonPageOptions) => {
    if (platform === 'app' && page.style.isNVue) {
      return
    }
    const pagePath = page.path
    const pageIdentifier = normalizeIdentifier(pagePath)
    const pagePathWithExtname = normalizePagePath(pagePath, platform)
    if (pagePathWithExtname) {
      if (dynamicImport) {
        // 拆分页面
        importPagesCode.push(
          `const ${pageIdentifier} = ()=>import('./${pagePathWithExtname}')`
        )
      } else {
        importPagesCode.push(
          `import ${pageIdentifier} from './${pagePathWithExtname}'`
        )
      }
      definePagesCode.push(`__definePage('${pagePath}',${pageIdentifier})`)
    }
  })
  return importPagesCode.join('\n') + '\n' + definePagesCode.join('\n')
}

export function defineNVuePageCode(pagesJson: Record<string, any>) {
  const importNVuePagesCode: string[] = []
  pagesJson.pages.forEach((page: UniApp.PagesJsonPageOptions) => {
    if (!page.style.isNVue) {
      return
    }
    const pagePathWithExtname = normalizePagePath(page.path, 'app')
    if (pagePathWithExtname) {
      importNVuePagesCode.push(
        `import('./${pagePathWithExtname}').then((res)=>{res()})`
      )
    }
  })
  return importNVuePagesCode.join('\n')
}
