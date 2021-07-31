import { CompilerOptions } from 'vue-template-compiler'
import { createModules } from './modules'
export function createCompilerOptions(
  options: NVueCompilerOptions
): CompilerOptions {
  return {
    modules: createModules(options),
  }
}
