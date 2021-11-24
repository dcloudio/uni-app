import path from 'path'
import { EmittedAsset } from 'rollup'
import { LINEFEED } from '@dcloudio/uni-shared'
import { normalizeMiniProgramFilename } from '../utils'

export interface MiniProgramCompilerOptions {
  /**
   * 需要延迟渲染的组件，通常是某个组件的某个事件会立刻触发，需要延迟到首次 render 之后，比如微信 editor 的 ready 事件，快手 switch 的 change
   */
  lazyElement?: {
    [name: string]: { name: 'on' | 'bind'; arg: string[] }[]
  }
  event?: {
    format(
      name: string,
      opts: { isCatch?: boolean; isCapture?: boolean; isComponent?: boolean }
    ): string
  }
  class: {
    /**
     * 是否支持绑定 array 类型
     */
    array: boolean
  }
  slot: {
    /**
     * 是否支持 $slots.default 访问
     */
    $slots?: boolean
    /**
     * 是否支持后备内容
     */
    fallbackContent?: boolean
    /**
     * 是否支持动态插槽名
     */
    dynamicSlotNames?: boolean
  }
  filter?: {
    lang: string
  }
  component?: {
    /**
     * 自定义组件自定义 hidden 属性用于实现 v-show
     */
    vShow: string
  }
  directive: string
  emitFile?: (emittedFile: EmittedAsset) => string
}
export interface MiniProgramFilterOptions {
  id: string
  type: string
  name: string
  src?: string
  code: string
}

type GenFilterFn = (
  filter: MiniProgramFilterOptions,
  filename: string
) => string | void

const templateFilesCache = new Map<string, string>()
const templateFiltersCache = new Map<string, MiniProgramFilterOptions[]>()

function relativeFilterFilename(
  filename: string,
  filter: MiniProgramFilterOptions
) {
  if (!filter.src) {
    return ''
  }
  return (
    './' +
    normalizeMiniProgramFilename(
      path.relative(path.dirname(filename), filter.src)
    )
  )
}

export function findMiniProgramTemplateFiles(genFilter?: GenFilterFn) {
  const files: Record<string, string> = Object.create(null)
  templateFilesCache.forEach((code, filename) => {
    if (!genFilter) {
      files[filename] = code
    } else {
      const filters = getMiniProgramTemplateFilters(filename)
      if (filters && filters.length) {
        files[filename] =
          filters
            .map((filter) =>
              genFilter(filter, relativeFilterFilename(filename, filter))
            )
            .join(LINEFEED) +
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
  return templateFiltersCache.get(filename)
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
    const filterIndex = filters.findIndex((f) => f.id === filter.id)
    if (filterIndex > -1) {
      filters.splice(filterIndex, 1, filter)
    } else {
      filters.push(filter)
    }
  } else {
    templateFiltersCache.set(filename, [filter])
  }
}
