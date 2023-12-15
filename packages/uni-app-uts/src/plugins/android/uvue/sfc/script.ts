import type { SFCDescriptor, SFCScriptBlock } from 'vue/compiler-sfc'
import { resolveTemplateCompilerOptions } from './template'
import { cache as descriptorCache } from '../descriptorCache'
import type { ResolvedOptions } from '.'
import { compileScript } from './compiler/compileScript'

const scriptCache = new WeakMap<SFCDescriptor, SFCScriptBlock | null>()

export function invalidateScript(filename: string): void {
  const desc = descriptorCache.get(filename)
  if (desc) {
    scriptCache.delete(desc)
  }
}

export function getResolvedScript(
  descriptor: SFCDescriptor
): SFCScriptBlock | null | undefined {
  return scriptCache.get(descriptor)
}

export function setResolvedScript(
  descriptor: SFCDescriptor,
  script: SFCScriptBlock
): void {
  scriptCache.set(descriptor, script)
}

export const scriptIdentifier = `_sfc_main`

export function resolveScript(
  descriptor: SFCDescriptor,
  options: ResolvedOptions
): SFCScriptBlock | null {
  if (!descriptor.script && !descriptor.scriptSetup) {
    return null
  }

  const cached = getResolvedScript(descriptor)
  if (cached) {
    return cached
  }

  let resolved: SFCScriptBlock | null = null

  resolved = compileScript(descriptor, {
    ...options.script,
    id: descriptor.id,
    isProd: options.isProduction,
    inlineTemplate: true,
    templateOptions: resolveTemplateCompilerOptions(descriptor, options),
    sourceMap: options.sourceMap,
    // genDefaultAs: scriptIdentifier,
  })

  setResolvedScript(descriptor, resolved)
  return resolved
}
