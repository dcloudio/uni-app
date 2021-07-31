import { ModuleOptions } from 'vue-template-compiler'
import { createAssetUrlModule } from './assetUrl'
import { createBoolAttrModule } from './boolAttr'
import { createEasycomModule } from './easycom'
import { createRenderWholeModule } from './renderWhole'
import { createTagsModule } from './tags'
export function createModules(options: NVueCompilerOptions): ModuleOptions[] {
  // 先处理 easycom
  const modules = [createEasycomModule(), createRenderWholeModule()]
  if (options.compiler === 'uni-app') {
    modules.push(createTagsModule())
  }

  modules.push(createAssetUrlModule())
  modules.push(createBoolAttrModule())

  return modules
}
