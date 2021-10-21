import { EmittedAsset } from 'rollup'
import { isComponentTag, LINEFEED } from '@dcloudio/uni-shared'
import {
  createSimpleExpression,
  ElementTypes,
  isCoreComponent,
  locStub,
  NodeTypes,
  RootNode,
  TemplateChildNode,
  TransformContext,
} from '@vue/compiler-core'

export interface MiniProgramCompilerOptions {
  slot: {
    fallback: boolean
  }
  filter?: {
    lang: string
  }
  directive: string
  emitFile?: (emittedFile: EmittedAsset) => string
}
export interface MiniProgramFilterOptions {
  id: string
  type: 'wxs'
  name: string
  src?: string
  code: string
}

type GenFilterFn = (filter: MiniProgramFilterOptions) => string | void

const templateFilesCache = new Map<string, string>()
const templateFiltersCache = new Map<string, MiniProgramFilterOptions[]>()

export function findMiniProgramTemplateFiles(genFilter?: GenFilterFn) {
  const files: Record<string, string> = Object.create(null)
  templateFilesCache.forEach((code, filename) => {
    if (!genFilter) {
      files[filename] = code
    } else {
      const filters = getMiniProgramTemplateFilters(filename)
      if (filters && filters.length) {
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

export function addComponentBindLink(
  node: RootNode | TemplateChildNode,
  context: TransformContext
) {
  if (
    node.type === NodeTypes.ELEMENT &&
    node.tagType === ElementTypes.COMPONENT
  ) {
    const { tag } = node
    if (
      isComponentTag(tag) ||
      isCoreComponent(tag) ||
      context.isBuiltInComponent(tag)
    ) {
      return
    }
    node.props.push({
      type: NodeTypes.DIRECTIVE,
      name: 'on',
      modifiers: [],
      loc: locStub,
      arg: createSimpleExpression('__l', true),
      exp: createSimpleExpression('__l', true),
    })
  }
}
