import {
  buildPluginInject,
  buildPluginMainJs,
  buildPluginPagesJson,
  buildPluginDynamicImport
} from '../build'

import { dynamicImportCode } from '../utils/dynamicImportUtils'

const plugins = [buildPluginMainJs, buildPluginPagesJson, buildPluginInject]

if (dynamicImportCode) {
  plugins.push(buildPluginDynamicImport)
}

export const rollupInputOptions = {
  plugins
}
