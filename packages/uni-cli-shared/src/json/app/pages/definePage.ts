import { normalizeIdentifier } from '../../../utils'

export function definePageCode(pagesJson: Record<string, any>) {
  const importPagesCode: string[] = []
  const definePagesCode: string[] = []
  pagesJson.pages.forEach((page: UniApp.UniRoute) => {
    const pagePath = page.path
    const pageIdentifier = normalizeIdentifier(pagePath)
    importPagesCode.push(
      `import ${pageIdentifier} from './${pagePath}.vue?mpType=page'`
    )
    definePagesCode.push(`__definePage('${pagePath}',${pageIdentifier})`)
  })
  return importPagesCode.join('\n') + '\n' + definePagesCode.join('\n')
}
