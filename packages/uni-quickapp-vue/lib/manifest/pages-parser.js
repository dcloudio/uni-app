module.exports = function parsePages(manifest, pages) {
  const entryPagePath = pages[0].path
  const router = {
    entry: entryPagePath.substr(0, entryPagePath.lastIndexOf('/')),
    pages: {}
  }
  pages.forEach(page => {
    const lastIndex = page.path.lastIndexOf('/')
    const key = page.path.substr(0, lastIndex)
    router.pages[key] = {
      component: page.path.substr(lastIndex + 1)
    }
  })
  manifest.router = router
}
