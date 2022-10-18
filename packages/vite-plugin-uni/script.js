const fs = require('fs')
const path = require('path')

function resolvePkgPath(pkg) {
  const pkgPath = path.resolve(require.resolve(pkg), '../../package.json')
  if (fs.existsSync(pkgPath)) {
    return pkgPath
  }
  throw `${pkgPath} not found`
}

module.exports = {
  vuePkgs: [
    require.resolve('vite/package.json'),
    resolvePkgPath('@vitejs/plugin-vue'),
    resolvePkgPath('@vitejs/plugin-vue-jsx'),
    resolvePkgPath('@vitejs/plugin-legacy'),
    require.resolve('@vue/compiler-core/package.json'),
    require.resolve('@vue/compiler-dom/package.json'),
    require.resolve('@vue/compiler-sfc/package.json'),
  ],
}
