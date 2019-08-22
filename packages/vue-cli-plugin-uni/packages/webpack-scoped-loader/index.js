const path = require('path')

const isWin = /^win/.test(process.platform)

const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

module.exports = function(content) {
    this.cacheable && this.cacheable()
    const resourcePath = normalizePath(this.resourcePath)
    const inputPath = normalizePath(process.env.UNI_INPUT_DIR)
    if (resourcePath !== normalizePath(path.resolve(process.env.UNI_INPUT_DIR, 'App.vue'))) {
        return content.replace(/(<style\b[^><]*)>/ig, '$1 scoped>')
    }
    return content
}
