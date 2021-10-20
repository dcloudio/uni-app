import { LINEFEED } from '@dcloudio/uni-shared'

export interface MiniProgramFilterOptions {
  id: string
  type: 'wxs'
  name: string
  src?: string
  code: string
}

type GenFilterFn = (filter: MiniProgramFilterOptions) => string | void

const templateFilesCache = new Map<string, string>()
const templateFiltersCache = new Map<string, Set<MiniProgramFilterOptions>>()

export function findMiniProgramTemplateFiles(genFilter?: GenFilterFn) {
  const files: Record<string, string> = Object.create(null)
  templateFilesCache.forEach((code, filename) => {
    if (!genFilter) {
      files[filename] = code
    } else {
      const filters = getMiniProgramTemplateFilters(filename)
      if (filters.length) {
        files[filename] =
          filters.map((filter) => genFilter(filter)).join(LINEFEED) +
          LINEFEED +
          code
      } else {
        files[filename] = code
      }
    }
  })
  return files
}

export function clearMiniProgramTemplateFiles() {
  templateFilesCache.clear()
}

export function addMiniProgramTemplateFile(filename: string, code: string) {
  templateFilesCache.set(filename, code)
}

function getMiniProgramTemplateFilters(filename: string) {
  return [...(templateFiltersCache.get(filename) || [])]
}

export function clearMiniProgramTemplateFilter(filename: string) {
  templateFiltersCache.delete(filename)
}

export function addMiniProgramTemplateFilter(
  filename: string,
  filter: MiniProgramFilterOptions
) {
  const filters = templateFiltersCache.get(filename)
  if (filters) {
    filters.add(filter)
  } else {
    templateFiltersCache.set(
      filename,
      new Set<MiniProgramFilterOptions>([filter])
    )
  }
}
