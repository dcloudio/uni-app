const ATTRS = {
  'name': 'name',
  'versionName': 'versionName',
  'versionCode': 'versionCode'
}

function merge(to, from) {
  Object.keys(ATTRS).forEach(name => {
    if (!to[name]) {
      to[name] = from[name]
    }
  })
}

module.exports = function parseBase(manifest, manifestJson) {
  merge(manifest, manifestJson)
  manifest.versionCode = parseInt(manifest.versionCode) || 1

  if (!manifest.package) {
    manifest.package = manifest.name || 'Bundle'
  }

  if (!manifest.config) {
    manifest.config = {}
  }
  if (!manifest.config.dsl) {
    manifest.config.dsl = {}
  }
  manifest.config.dsl.name = 'vue'

  return manifest
}
