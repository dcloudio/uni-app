import debug from 'debug'
import type { EmittedFile, GetModuleInfo } from 'rollup'
import type { ResolvedConfig } from 'vite'
import {
  type MiniProgramFilterOptions,
  addMiniProgramTemplateFile,
  addMiniProgramTemplateFilter,
  clearMiniProgramTemplateFiles,
  findMiniProgramComponentPackageRoot,
  findMiniProgramTemplateFiles,
  normalizeMiniProgramFilename,
  removeExt,
} from '@dcloudio/uni-cli-shared'
import { getFiltersCache } from '../plugins/renderjs'
import type { UniMiniProgramPluginOptions } from '.'
import { normalizeMiniProgramComponentFilename } from '../plugins/entry'

const debugTemplate = debug('uni:mp-template')

export function getFilterFiles(
  resolvedConfig: ResolvedConfig,
  getModuleInfo: GetModuleInfo
) {
  const filters: Record<string, MiniProgramFilterOptions> = Object.create(null)
  const filtersCache = getFiltersCache(resolvedConfig)
  if (!filtersCache.length) {
    return filters
  }
  const inputDir = process.env.UNI_INPUT_DIR
  function addFilter(id: string, filter: MiniProgramFilterOptions) {
    const templateFilename = removeExt(
      normalizeMiniProgramFilename(id, inputDir)
    )
    addMiniProgramTemplateFilter(templateFilename, filter)
    const filterFilename = removeExt(
      normalizeMiniProgramFilename(filter.id, inputDir)
    )
    if (templateFilename !== filterFilename) {
      // 外链
      filter.src = filterFilename
      filters[filterFilename] = filter
    }
  }
  filtersCache.forEach((filter) => {
    const moduleInfo = getModuleInfo(filter.id)
    if (!moduleInfo) {
      return
    }
    const { importers } = moduleInfo
    if (!importers.length) {
      return
    }
    importers.forEach((importer) => addFilter(importer, filter))
  })
  return filters
}

export function getTemplateFiles(
  template: UniMiniProgramPluginOptions['template']
) {
  const files = normalizeTemplateFiles(
    findMiniProgramTemplateFiles(template.filter?.generate)
  )
  clearMiniProgramTemplateFiles()
  return files
}

export const emitFile: (emittedFile: EmittedFile) => string = (emittedFile) => {
  if (emittedFile.type === 'asset') {
    const filename = emittedFile.fileName!
    addMiniProgramTemplateFile(
      removeExt(
        normalizeMiniProgramComponentFilename(
          filename,
          process.env.UNI_INPUT_DIR,
          findMiniProgramComponentPackageRoot(filename)
        )
      ),
      emittedFile.source!.toString()
    )
    debugTemplate(filename)
    return filename
  }
  return ''
}

function normalizeTemplateFiles(files: Record<string, string>) {
  return Object.keys(files).reduce<Record<string, string>>((res, filename) => {
    res[normalizeTemplateFilename(filename)] = files[filename]
    return res
  }, Object.create(null))
}

function normalizeTemplateFilename(filename: string) {
  const relativeFilename = removeExt(
    normalizeMiniProgramFilename(filename, process.env.UNI_INPUT_DIR)
  )
  const uniModulesIndex = relativeFilename.indexOf('uni_modules/')
  if (uniModulesIndex === -1) {
    return relativeFilename
  }
  const componentFilename = relativeFilename.slice(uniModulesIndex)
  return removeExt(
    normalizeMiniProgramComponentFilename(
      componentFilename,
      process.env.UNI_INPUT_DIR,
      findMiniProgramComponentPackageRoot(componentFilename)
    )
  )
}
