const pages = []
export function getCurrentPages () {
  return pages
}
export function setCurrentPage (pageId, pagePath) {
  pages.length = 0
  pages.push({
    $page: {
      id: pageId,
      route: pagePath
    }
  })
}
