import { CompilerOptions } from 'vue-template-compiler'
import { createModules } from './modules'
export function createCompilerOptions(): CompilerOptions {
  return {
    modules: createModules(),
  }
}
