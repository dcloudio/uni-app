import path from 'path'
import { LoaderContext } from 'webpack'
import {
  removeExt,
  normalizePath,
  parsePagesJsonOnce,
} from '@dcloudio/uni-cli-shared'

const SCROLLER_COMPONENTS = ['list', 'scroller', 'scroll-view', 'waterfall']

function scrollViewLoader(this: LoaderContext<{}>, content: string, map: any) {
  const source = content.trim()
  if (SCROLLER_COMPONENTS.find((name) => source.indexOf('<' + name) === 0)) {
    return this.callback(null, content, map)
  }
  if (source.indexOf('<recycle-list') !== -1) {
    return this.callback(null, content, map)
  }

  let resourcePath = removeExt(
    normalizePath(path.relative(process.env.UNI_INPUT_DIR, this.resourcePath))
  )

  if (
    !process.UNI_NVUE_ENTRY[resourcePath] &&
    (this as any)._module.issuer &&
    (this as any)._module.issuer.issuer
  ) {
    // <template src=""/>
    resourcePath = removeExt(
      normalizePath(
        path.relative(
          process.env.UNI_INPUT_DIR,
          (this as any)._module.issuer.issuer.resource
        )
      )
    )
  }

  // 是否 disableScroll
  // TODO 暂时仅读取一次配置，开发者实时修改页面配置，不会实时生效
  const pagesJson = parsePagesJsonOnce(process.env.UNI_INPUT_DIR, 'app')
  const pageJson = pagesJson.pages.find((page) => page.path === resourcePath)
  if (!pageJson) {
    return this.callback(null, content, map)
  }

  if (pageJson.style.disableScroll) {
    return this.callback(null, content, map)
  }

  this.callback(
    null,
    `<scroll-view :scroll-y="true" :show-scrollbar="${
      (pageJson.style as any).scrollIndicator === 'none' ? 'false' : 'true'
    }" :enableBackToTop="true" bubble="true" style="flex-direction:column">${content}</scroll-view>`,
    map
  )
}

export default scrollViewLoader
