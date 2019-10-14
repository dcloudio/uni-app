import {
  cached
} from 'uni-shared'

const pageFactory = Object.create(null)

export function definePage (name, createPageVueComponent) {
  pageFactory[name] = createPageVueComponent
}

export const getPageVueComponent = cached(function (pagePath) {
  return pageFactory[pagePath]()
})

export function createPage (pagePath, pageId) {
  if (!pageFactory[pagePath]) {
    console.error(`${pagePath} not found`)
  }
  let startTime = Date.now()
  const pageVm = new (getPageVueComponent(pagePath))({
    mpType: 'page',
    pageId,
    pagePath
  })
  if (process.env.NODE_ENV !== 'production') {
    console.log(`new ${pagePath}`, Date.now() - startTime)
  }
  return pageVm
}
