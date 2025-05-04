const path = require('path')

const getDependency = err => err.dependencies && err.dependencies.length && err.dependencies[0]

const LOCAL_RESOURCE_REGEX = /Module parse failed:\s*(.*)\s*Unexpected character/

const LINENO_REGEX = /\(([0-9]+):[0-9]+\)/

const FILE_REGEX = /in\s(.*)\s\(line\s([0-9]+),\scolumn\s[0-9]+\)/

function formatMessage (msg) {
  if (msg) {
    const matches = msg.match(FILE_REGEX)
    if (matches && matches.length === 3) {
      const filePath = path.relative(process.env.UNI_INPUT_DIR, path.resolve(matches[1]))
      msg = msg.replace(matches[0], 'at ' + filePath.split('?')[0] + ':' + matches[2])
    }
    return msg.replace('Module build failed: ', '模块编译失败：')
  }
  return ''
}

const installPreprocessorTips = {}

const isMacArm = process.platform === 'darwin' && process.arch === 'arm64'
if (process.env.UNI_SASS_IMPLEMENTATION_NAME === 'dart-sass') {
  let timeout
  const originalStderrWrite = process.stderr.write
  process.stderr.write = function (chunk, encoding, callback) {
    if (typeof chunk === 'string' && chunk.includes('More info and automated migrator')) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        console.error(formatDartSassMessage(chunk))
      }, 10)
    }
    return originalStderrWrite.apply(process.stderr, arguments)
  }
}

function formatDartSassError (message) {
  const msgs = []
  const syntaxMsgs = []
  // 识别 /deep/ 语法
  if (message.includes('/deep/')) {
    syntaxMsgs.push('将深度选择器 /deep/ 调整为 ::v-deep')
  }
  // 识别除法
  if (message.includes('Using / for division is deprecated')) {
    syntaxMsgs.push('将除法修改为 math.div()')
  }
  const address = 'https://uniapp.dcloud.net.cn/tutorial/syntax-css.html#css-preprocessor'
  const syntaxMsg = syntaxMsgs.length ? `，${syntaxMsgs.join(';')}` : ''
  msgs.push(
    `方案1：调整为 dart-sass 支持的语法${syntaxMsg}，详情：${address}`
  )
  msgs.push(
    `方案2：如果您希望继续使用node-sass，${isMacArm ? '需要更换为 HBuilderX Mac Intel 版本，并且' : '您可以'}在 manifest.json 中配置 "sassImplementationName": "node-sass"，详情：${address}`
  )
  return msgs.join('\n')
}

function formatDartSassMessage (message) {
  const lineBreak = '\n  \n'
  const dartSassMsg = formatDartSassError(message)
  return `${lineBreak}Vue2 scss 预编译器默认已由 node-sass 更换为 dart-sass，如果您的代码使用了 dart-sass 不支持的旧语法，可能存在部分不兼容的问题。
解决方案：
${dartSassMsg}${lineBreak}`
}

function ModuleBuildError (err) {
  if (process.env.UNI_SASS_IMPLEMENTATION_NAME === 'dart-sass') {
    if (err.message.includes('SassError:')) {
      err.message = formatDartSassMessage(err.message) + err.message
    }
  }
  const lines = err.message.split('\n')
  let firstLineMessage = lines[0]
  if (lines.length > 1) {
    firstLineMessage = lines[1]
  }
  if (~firstLineMessage.indexOf('Module build failed: ModuleBuildError: Module build failed:')) {
    // 移除调用栈错误
    return false
  }
  if (~firstLineMessage.indexOf('Failed to find')) { // css 引用路径错误
    return {
      line: 1,
      message: '文件查找失败：' + firstLineMessage.split('Failed to find')[1]
    }
  } else if (~firstLineMessage.indexOf('SyntaxError:') || ~firstLineMessage.indexOf('Syntax Error')) {
    if (~firstLineMessage.indexOf('ModuleBuildError: Module build failed: Syntax Error')) {
      return false
    }

    if (err.error && err.error.loc) { // babel
      let message = (err.message + '\n').replace('SyntaxError:', '语法错误:')
      message = message.replace(/^\s*at\s.*:\d+:\d+[\s)]*\n/gm, '') + '     '
      return {
        line: err.error.loc.line || 1,
        message
      }
    } else { // css
      let message = (err.message).replace('Syntax Error', '语法错误:')
      message = message.replace(/^\s*at\s.*:\d+:\d+[\s)]*\n/gm, '') + '      '
      const matches = message.match(LINENO_REGEX)
      if (matches && matches.length === 2) {
        return {
          line: matches[1],
          message
        }
      }
    }
  } else if (~err.message.indexOf('Cannot find module')) {
    let builtinCompile = ''
    let name = ''
    if (~err.message.indexOf('compile-less')) {
      name = 'compile-less'
      builtinCompile = 'less'
    } else if (~err.message.indexOf('compile-node-sass')) {
      name = 'compile-node-sass'
      builtinCompile = 'scss/sass'
    } else if (~err.message.indexOf('compile-dart-sass')) {
      name = 'compile-dart-sass'
      builtinCompile = 'scss/sass'
    } else if (~err.message.indexOf('compile-stylus')) {
      name = 'compile-stylus'
      builtinCompile = 'stylus'
    } else if (~err.message.indexOf('compile-typescript')) {
      name = 'compile-typescript'
      builtinCompile = 'typescript'
    } else if (~err.message.indexOf('compile-pug-cli')) {
      name = 'compile-pug-cli'
      builtinCompile = 'pug/jade'
    }
    if (builtinCompile) {
      if (installPreprocessorTips[name]) {
        return false
      }
      installPreprocessorTips[name] = true
      installHBuilderXPlugin(name)
      return {
        message: '预编译器错误：代码使用了' + builtinCompile +
          '语言，但未安装相应的编译器插件，' + (supportAutoInstallPlugin() ? '正在从' : '请前往') +
          '插件市场安装该插件:\nhttps://ext.dcloud.net.cn/plugin?name=' +
          name
      }
    }
  } else if (~firstLineMessage.indexOf('Module parse failed')) {
    const matches = firstLineMessage.match(LOCAL_RESOURCE_REGEX)
    if (matches && matches.length === 2) {
      return {
        message: '资源引用失败：暂不支持引用本地资源\'' + matches[1].trim() + '\',可更换为网络地址或base64'
      }
    }
  }
  return formatMessage(err.message)
}

function supportAutoInstallPlugin () {
  // 只要有 HBuilderX 版本号，就一定支持自动安装
  return !!process.env.HX_Version
}

function installHBuilderXPlugin (lang) {
  if (supportAutoInstallPlugin()) {
    return console.error(
      `%HXRunUniAPPPluginName%${lang}%HXRunUniAPPPluginName%`
    )
  }
}

function ModuleNotFoundError (err) {
  const matches = err.message.match(/Can't resolve '(.*loader)'/)
  if (matches && matches.length > 0) {
    return {
      line: 1,
      message: `
Failed to resolve loader: ${matches[1]}
You may need to install it.
`
    }
  }
  const dependency = getDependency(err)
  if (dependency) {
    let line = 1
    if (dependency.loc.start && dependency.loc.start.line) {
      line = dependency.loc.start.line
    }
    return {
      line: line,
      message: '文件查找失败：\'' + dependency.userRequest + '\''
    }
  }
}

function ModuleParseError (err) {
  const firstLineMessage = err.message.split('\n')[0]
  const matches = firstLineMessage.match(LOCAL_RESOURCE_REGEX)
  if (matches && matches.length === 2) {
    return {
      message: `资源引用失败：暂不支持引用此类型资源（${err.module.rawRequest}）`
    }
  }
}

module.exports = {
  ModuleBuildError,
  ModuleNotFoundError,
  ModuleParseError
  // ChunkRenderError(err) {},
  // EntryModuleNotFoundError(err) {},
  // ModuleDependencyError(err) {},
  // ModuleError(err) {},
  // ModuleDependencyWarning(warn) {},
  // ModuleWarning(warn) {}
}
