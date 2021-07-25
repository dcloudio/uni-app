function replaceModuleExports(code) {
  return code.replace(/module\.exports\s*=/, 'export default ')
}
module.exports = {
  uniValidateFunctionPlugin() {
    return {
      name: 'vite:uni-cloud-vf',
      enforce: 'pre',
      transform(code, id) {
        if (id.includes('validator/validateFunction')) {
          return replaceModuleExports(code)
        }
      },
    }
  },
}
