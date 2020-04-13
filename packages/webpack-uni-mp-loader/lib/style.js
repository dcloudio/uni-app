const fs = require('fs')
const path = require('path')

const {
  removeExt,
  normalizePath,
  getFlexDirection,
  parseManifestJson
} = require('@dcloudio/uni-cli-shared')

const {
  normalizeNodeModules
} = require('./shared')

module.exports = function (content) {
  this.cacheable && this.cacheable()

  if (!process.env.UNI_USING_NVUE_COMPILER) {
    return content
  }
  if (path.extname(this.resourcePath) !== '.nvue') {
    return content
  }
  const resourcePath = normalizeNodeModules(
    removeExt(
      normalizePath(path.relative(process.env.UNI_INPUT_DIR, this.resourcePath))
    )
  )
  if (!process.UNI_ENTRY[resourcePath]) {
    return content
  }

  const manifestJsonPath = path.resolve(process.env.UNI_INPUT_DIR, 'manifest.json')
  const manifestJson = parseManifestJson(fs.readFileSync(manifestJsonPath, 'utf8'))

  return `<style>
  view,
  swiper-item,
  scroll-view {
    display:flex;
    flex-direction:${getFlexDirection(manifestJson['app-plus'])};
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: auto;
    align-items: stretch;
    align-content: flex-start;
  }
  view,
  image,
  input,
  scroll-view,
  swiper,
  swiper-item,
  text,
  textarea,
  video {
    position: relative;
    border: 0px solid #000000;
    box-sizing: border-box;
  }
  swiper-item {
    position: absolute;
  }
</style>
${content}`
}
