import { ModuleOptions } from 'vue-template-compiler'
import { NVueCompilerOptions } from '../../../../../../../types'
import { createAssetUrlModule } from './assetUrl'
import { createBoolAttrModule } from './boolAttr'
import { createEasycomModule } from './easycom'
import { createRenderWholeModule } from './renderWhole'
import { createTagsModule } from './tags'
export function createModules(_: NVueCompilerOptions): ModuleOptions[] {
  // 先处理 easycom
  const modules = [createEasycomModule(), createRenderWholeModule()]
  if (process.env.UNI_NVUE_COMPILER === 'uni-app') {
    modules.push(createTagsModule())
  }

  modules.push(createAssetUrlModule())
  modules.push(createBoolAttrModule())

  return modules
}
