function resolveNativeBinding () {
  const { platform, arch } = process
  let nativeBinding = ''
  switch (platform) {
    case 'win32':
      switch (arch) {
        case 'x64':
          nativeBinding = 'preprocessor-windows-x86_64'
          break
        default:
          throw new Error(`Unsupported architecture on Windows: ${arch}`)
      }
      break
    case 'darwin':
      switch (arch) {
        case 'x64':
          nativeBinding = 'preprocessor-macos-x86_64'
          break
        case 'arm64':
          nativeBinding = 'preprocessor-macos-arm64'
          break
        default:
          throw new Error(`Unsupported architecture on macOS: ${arch}`)
      }
      break
    default:
      throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`)
  }
  return require('./' + nativeBinding)
}

async function runProcess (vue3 = false) {
  try {
    /* eslint-disable no-undef */
    globalThis.preprocessor_require = require
    await resolveNativeBinding().process(vue3)
  } catch (error) {
  }
}

class PreprocessorWebpackPlugin {
  apply (compiler) {
    compiler.hooks.afterEmit.tapPromise('d', (params) => {
      return runProcess(false)
    })
  }
}

function PreprocessorVitePlugin () {
  return {
    name: 'preprocessor',
    async writeBundle (_) {
      await runProcess(true)
    }
  }
}

module.exports = {
  PreprocessorWebpackPlugin,
  PreprocessorVitePlugin
}
