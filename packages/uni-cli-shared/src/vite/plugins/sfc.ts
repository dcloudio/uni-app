import fs from 'fs-extra'
import type { Plugin } from 'vite'
import type {
  SFCDescriptor,
  SFCParseResult,
  SFCScriptBlock,
  SFCStyleBlock,
  SFCTemplateBlock,
} from '@vue/compiler-sfc'
import type { SourceLocation } from '@vue/compiler-core'
import MagicString from 'magic-string'
import { isVueSfcFile } from '../../vue'
import { createRollupError } from '../utils'
import { preUVueHtml, preUVueJs } from '../../preprocess'

const SRC_IMPORT_RE =
  /<(template|script|style)[^>]*src\s*=\s*["']([^"']+)["'][^>]*>/
const SRC_IMPORT_VUE_RE =
  /<(template|script|style)[^>]*src\s*=\s*["'](.*\.uvue|.*\.vue)["'][^>]*>/

export function isSrcImport(code: string) {
  return SRC_IMPORT_RE.test(code)
}

export function isSrcImportVue(code: string) {
  return SRC_IMPORT_VUE_RE.test(code)
}

export function uniViteSfcSrcImportPlugin(
  { onlyVue }: { onlyVue: boolean } = { onlyVue: true }
): Plugin {
  const { parse } = require('@vue/compiler-sfc')
  const hasImport = onlyVue ? isSrcImportVue : isSrcImport
  const isValidSrc = onlyVue ? isVueSfcFile : () => true
  return {
    name: 'uni:sfc-src-import',
    async transform(code, id) {
      if (!isVueSfcFile(id)) {
        return
      }
      if (!hasImport(code)) {
        return
      }
      const s = new MagicString(code)
      const sourceMap = process.env.NODE_ENV === 'development'

      const createDescriptor = (
        filename: string,
        code: string,
        from: 'vue' | 'template' | 'script' | 'style'
      ) => {
        if (from === 'vue' || isVueSfcFile(filename)) {
          const { descriptor, errors } = parse(code, {
            filename,
            sourceMap,
          }) as SFCParseResult
          errors.forEach((error) =>
            this.error(createRollupError('', filename, error, code))
          )
          return descriptor
        } else {
          const descriptor = {
            filename,
            source: fs.readFileSync(filename, 'utf-8'),
            template: null,
            script: null,
            scriptSetup: null,
            styles: [],
            customBlocks: [],
          } as unknown as SFCDescriptor
          if (from === 'template') {
            descriptor.template = {
              content: descriptor.source,
            } as SFCTemplateBlock
          } else if (from === 'script') {
            descriptor.script = {
              content: descriptor.source,
            } as SFCScriptBlock
          } else if (from === 'style') {
            descriptor.styles = [
              {
                content: descriptor.source,
              } as SFCStyleBlock,
            ]
          }
          return descriptor
        }
      }
      const descriptor = createDescriptor(id, code, 'vue')

      const cache = new Map<string, SFCDescriptor>()

      const getSrcDescriptor = async (
        src: string,
        from: 'template' | 'script' | 'style'
      ) => {
        if (cache.has(src)) {
          return cache.get(src)
        }
        const resolved = await this.resolve(src, descriptor.filename)
        if (resolved) {
          const filename = resolved.id
          const srcDescriptor = createDescriptor(
            filename,
            preUVueJs(
              preUVueHtml(fs.readFileSync(filename, 'utf-8'), filename),
              filename
            ),
            from
          )
          cache.set(src, srcDescriptor)
          this.addWatchFile(filename)
          return srcDescriptor
        }
      }

      if (descriptor.template?.src && isValidSrc(descriptor.template.src)) {
        const srcDescriptor = await getSrcDescriptor(
          descriptor.template.src,
          'template'
        )
        if (srcDescriptor && srcDescriptor.template?.content) {
          overwriteContent(
            s,
            descriptor.template.loc,
            srcDescriptor.template.content
          )
        }
      }
      if (descriptor.script?.src && isValidSrc(descriptor.script.src)) {
        const srcDescriptor = await getSrcDescriptor(
          descriptor.script.src,
          'script'
        )
        if (srcDescriptor && srcDescriptor.script?.content) {
          overwriteContent(
            s,
            descriptor.script.loc,
            srcDescriptor.script.content
          )
        }
      }
      for (const style of descriptor.styles) {
        if (style.src && isValidSrc(style.src)) {
          const srcDescriptor = await getSrcDescriptor(style.src, 'style')
          if (srcDescriptor && srcDescriptor.styles[0]) {
            overwriteContent(s, style.loc, srcDescriptor.styles[0].content)
          }
        }
      }
      if (!s.hasChanged()) {
        return
      }
      // 移除所有的 src 属性
      const regex =
        /(<(template|script|style)[^>]*)src\s*=\s*["']([^"']+)["']([^>]*>)/g

      let match
      while ((match = regex.exec(code))) {
        const [_, start, _tag, _src, end] = match
        s.overwrite(match.index, match.index + _.length, `${start}${end}`)
      }

      return {
        code: s.toString(),
        map: sourceMap ? s.generateMap({ hires: true }) : null,
      }
    },
  }
}

function overwriteContent(
  s: MagicString,
  loc: SourceLocation,
  content: string
) {
  if (loc.start.offset === loc.end.offset) {
    s.appendRight(loc.start.offset, content)
  } else {
    s.overwrite(loc.start.offset, loc.end.offset, content)
  }
}
