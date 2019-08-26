const {
  md5
} = require('@dcloudio/uni-cli-shared')

const {
  getSlotsPath
} = require('./util')

const {
  getRoot,
  getPlatformExts,
  getGlobalComponents,
  normalizeNodeModules,
  getCompiledComponentTemplate,
  cacheCompiledComponentTemplates
} = require('../shared')

const compileToTemplate = require('./compile-to-template')

const templateExt = getPlatformExts().template

function normalizeImports (imports = {}, componentPath, subPackages) {
  const res = {}
  Object.keys(imports).forEach(key => {
    const {
      name,
      src
    } = imports[key]
    res[key] = {
      name,
      src: '/' + normalizeNodeModules(src) + '.vue' + templateExt
    }
  })

  return res
}

function generateSlotsWxml ({
  imports,
  contents
}) {
  let slotsOutput = ''
  imports.forEach(im => {
    slotsOutput = slotsOutput + `<import src="${normalizeNodeModules(im)}" />\n`
  })

  slotsOutput = slotsOutput + `\n`

  contents.forEach(b => {
    slotsOutput = slotsOutput + b + `\n\n`
  })

  return slotsOutput
}

module.exports = function generateComponentsWxml (templates, allCompilerOptions, subPackages) {
  const mainSlots = {
    imports: new Set(),
    contents: new Set()
  }

  const subPackageSlots = {}

  const files = []

  const allDeps = new Set() // only for mpvue

  const globalComponents = getGlobalComponents()

  let isMPVue = false

  Object.keys(templates).forEach(filePath => {
    const source = templates[filePath]
    const compilerOptions = allCompilerOptions[filePath]

    if (!compilerOptions) {
      throw new Error(filePath + ' error ')
    }

    const root = getRoot(filePath, subPackages)

    const imports = normalizeImports(compilerOptions.imports, filePath, subPackages)

    // add slots
    imports['_slots_'] = {
      name: '',
      src: getSlotsPath(root)
    }

    const emitFilePath = filePath + '.vue' + templateExt
    // 全局组件
    Object.keys(globalComponents).forEach(name => {
      imports[name] = globalComponents[name]
    })

    const componentMD5 = md5(source + compilerOptions.scopeId + JSON.stringify(imports))

    const compiledComponentTemplate = getCompiledComponentTemplate(filePath)

    let currentSlots = []

    if (!subPackageSlots[root] && root) {
      subPackageSlots[root] = {
        imports: new Set(),
        contents: new Set()
      }
    }

    if (compiledComponentTemplate.md5 !== componentMD5) {
      const result = compileToTemplate(source, Object.assign({}, compilerOptions, {
        imports
      }))
      let body = result.body
      const {
        slots,
        deps = [],
        mpvue,
        needHtmlParse
      } = result

      if (mpvue) {
        isMPVue = true
        deps.forEach(dep => {
          allDeps.add(dep)
        })
      }

      if (needHtmlParse) {
        body = `<import src="/htmlparse/index${templateExt}" />
        ${body}`
      }

      cacheCompiledComponentTemplates(filePath, {
        md5: componentMD5,
        body,
        slots
      })

      currentSlots = slots || []

      files.push({
        file: emitFilePath,
        source: body
      })
    } else {
      currentSlots = compiledComponentTemplate.slots || []
    }

    let collector
    if (root) {
      collector = subPackageSlots[root]
    } else {
      collector = mainSlots
    }

    currentSlots.forEach(slot => {
      const dependencies = slot.dependencies || []
      const body = slot.body
      dependencies.forEach(d => collector.imports.add(d))
      collector.contents.add(body)

      if (collector !== mainSlots) { // TODO 待优化，把分包内容全部写入主包 slots 中
        dependencies.forEach(d => mainSlots.imports.add(d))
        mainSlots.contents.add(body)
      }
    })
  })

  if (!isMPVue) {
    // subPackage slots
    Object.keys(subPackageSlots)
      .forEach(root => {
        const {
          imports,
          contents
        } = subPackageSlots[root] || {}
        // subpackage slots
        files.push({
          file: getSlotsPath(root),
          source: generateSlotsWxml({
            imports,
            contents
          })
        })
      })
  } else { // merge
    Object.keys(subPackageSlots)
      .forEach(root => {
        const {
          imports,
          contents
        } = subPackageSlots[root] || {}
        if (imports && imports.size) {
          mainSlots.imports = new Set([...mainSlots.imports, ...imports])
        }
        if (contents && contents.size) {
          mainSlots.contents = new Set([...mainSlots.contents, ...contents])
        }
      })
    // mpvue slots add all imports
    allDeps.forEach(dep => {
      mainSlots.imports.add(dep)
    })
  }
  // main slots
  files.push({
    file: getSlotsPath(''),
    source: generateSlotsWxml({
      imports: mainSlots.imports,
      contents: mainSlots.contents
    })
  })
  // TODO 遗留问题：当subPackage 引用 main 中的组件时，slots 被放在 subPackage 的 slots 中，导致 main 中的组件访问不到该 slots

  // 格式化node_modules,在微信小程序中，node_modules目录会被过滤掉,cli时 node_modules 在外层，也要转移到根目录
  files.forEach(file => {
    file.file = normalizeNodeModules(file.file)
  })

  return files
}
