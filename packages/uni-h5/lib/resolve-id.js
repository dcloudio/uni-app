/**
 * @type {import('vite').Plugin}
 */
const UniH5ResolveIdPlugin = {
  name: 'vite:uni-h5-resolve-id',
  resolveId(id) {
    if (id === 'vue') {
      id = '@dcloudio/uni-h5-vue'
    }
    const cache = resolveCache[id]
    if (cache) {
      return cache
    }

    for (const { test, resolveId } of resolvedIds) {
      if (!test(id)) {
        continue
      }
      const file = resolveId(id)
      if (!file) {
        continue
      }
      resolveCache[id] = file
      debugResolve(id, file)
      return file
    }
  },
}
