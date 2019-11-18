const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const BJSON = require('buffer-json')

const {
  getPartialIdentifier
} = require('./util')

const directories = new Set()

function write (key, data, callback) {
  const dirname = path.dirname(key)
  // template,缓存 mp template
  if (
    data.remainingRequest.indexOf('vue&type=template') !== -1 &&
    process.UNI_CACHE_TEMPLATES
  ) {
    data['mpTemplates'] = process.UNI_CACHE_TEMPLATES
    delete process.UNI_CACHE_TEMPLATES
  }

  const content = BJSON.stringify(data)

  if (directories.has(dirname)) {
    // for performance skip creating directory
    fs.writeFile(key, content, 'utf-8', callback)
  } else {
    mkdirp(dirname, (mkdirErr) => {
      if (mkdirErr) {
        callback(mkdirErr)
        return
      }

      directories.add(dirname)

      fs.writeFile(key, content, 'utf-8', callback)
    })
  }
}

function read (key, callback) {
  fs.readFile(key, 'utf-8', (err, content) => {
    if (err) {
      callback(err)
      return
    }

    try {
      const data = BJSON.parse(content)
      const mpTemplates = data['mpTemplates']
      if (mpTemplates) {
        Object.keys(mpTemplates).forEach(name => {
          fs.writeFileSync(name, mpTemplates[name], 'utf-8')
        })
      }
      callback(null, data)
    } catch (e) {
      callback(e)
    }
  })
}

module.exports = {
  createTemplateCacheLoader: function (api) {
    return {
      resourceQuery: /type=uni-cache-loader-template/,
      use: [{
        loader: 'cache-loader',
        ident: 'uni-cache-loader-template-options',
        options: Object.assign(api.genCacheConfig(
          'uni-template-compiler/' + process.env.UNI_PLATFORM,
          getPartialIdentifier()
        ), {
          read,
          write
        })
      }]
    }
  }
}
