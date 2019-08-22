const {
  hyphenate,
  getPlatformCompiler
} = require('@dcloudio/uni-cli-shared')

const SRC_REGEX = /src="([^"]+)"/g
module.exports = function compile (source, options) {
  const {
    compileToWxml,
    compileToTemplate
  } = getPlatformCompiler()
  if (typeof compileToWxml === 'function') {
    const components = {
      'slots': {
        src: '/common/slots.wxml',
        name: 'slots'
      }
    }

    Object.keys(options.imports).forEach(name => {
      if (name !== '_slots_') {
        components[hyphenate(name)] = options.imports[name]
      }
    })

    const compiled = options.compiled

    const {
      code,
      // compiled,
      slots: mpvueSlots,
      importCode
    } = compileToWxml(compiled, {
      name: options.name,
      components,
      moduleId: options.scopeId || ('M' + options.name)
    })

    const deps = []
    if (importCode) {
      let match
      /* eslint-disable no-cond-assign */
      while (match = SRC_REGEX.exec(importCode)) {
        deps.push(match[1])
      }
    }

    const slots = Object.keys(mpvueSlots).map(slotName => {
      const slot = mpvueSlots[slotName]
      return {
        name: slot.name,
        slotName,
        body: slot.code,
        dependencies: deps
      }
    })

    return {
      body: code,
      slots,
      deps,
      mpvue: true
    }
  }

  return compileToTemplate(source, Object.assign(options, {
    htmlParse: {
      templateName: 'octoParse'
    }
  }))
}
