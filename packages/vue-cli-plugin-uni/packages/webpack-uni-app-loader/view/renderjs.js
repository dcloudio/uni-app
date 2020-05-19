module.exports = function (source, map) {
  // v3 app-plus
  if (process.env.UNI_PLATFORM === 'app-plus' && process.env.UNI_USING_V3) {
    return this.callback(
      null,
      `export default function (Component) {
${source.trim()}
}`,
      map
    )
  }
  this.callback(null, source, map)
}
