import { throttle } from 'throttle-debounce'
import type fs from 'node:fs'
import Debug from 'debug'
import fg from 'fast-glob'
import type { ComponentInfo, Options, ResolvedOptions } from './types'
import { writeDeclaration } from './declaration'
import { resolveOptions } from './options'
import { matchGlobs, parseTag, removeExtname } from './utils'
import { slash, toArray } from '../utils'

const debug = {
  components: Debug('easycom:context:components'),
  search: Debug('easycom:context:search'),
  declaration: Debug('easycom:declaration'),
}

export class EasyComContext {
  options: ResolvedOptions

  private _componentPaths = new Map<string, string>()

  private _componentMap: Record<string, ComponentInfo> = {}

  constructor(rawOptions: Options) {
    this.options = resolveOptions(rawOptions)
    this.generateDeclaration = throttle(
      500,
      this._generateDeclaration.bind(this),
      { noLeading: false }
    )
  }

  setupWatcher(watcher: fs.FSWatcher) {
    const { globs, customGlobs } = this.options

    watcher.on('unlink', (path) => {
      if (matchGlobs(path, globs)) {
        path = slash(path)
        this.removeComponents(path)
        this.onUpdate(path)
      } else {
        customGlobs.find((custom) => {
          if (matchGlobs(path, [custom.glob])) {
            path = slash(path)
            this.removeComponents(path)
            this.onUpdate(path)
            return true
          }
        })
      }
    })
    watcher.on('add', (path) => {
      if (matchGlobs(path, globs)) {
        path = slash(path)
        this.addComponents(path, parseTag)
        this.onUpdate(path)
      } else {
        customGlobs.find((custom) => {
          if (matchGlobs(path, [custom.glob])) {
            path = slash(path)
            this.addComponents(path, custom.parseTag)
            this.onUpdate(path)
            return true
          }
        })
      }
    })
  }

  removeComponents(paths: string | string[]) {
    debug.components('remove', paths)
    const size = this._componentPaths.size
    toArray(paths).forEach((p) => this._componentPaths.delete(p))
    if (this._componentPaths.size !== size) {
      this.updateComponentNameMap()
      return true
    }
    return false
  }

  addComponents(
    paths: string | string[],
    parseTag: (filename: string) => string
  ) {
    debug.components('add', paths)
    const size = this._componentPaths.size
    toArray(paths).forEach((p) => this._componentPaths.set(p, parseTag(p)))
    if (this._componentPaths.size !== size) {
      this.updateComponentNameMap()
      return true
    }
    return false
  }

  onUpdate(_path: string) {
    this.generateDeclaration()
  }

  private updateComponentNameMap() {
    this._componentMap = {}

    this._componentPaths.forEach((tag, path) => {
      if (this._componentMap[tag]) {
        if (
          removeExtname(path) === removeExtname(this._componentMap[tag].from)
        ) {
          // 仅后缀不同，如.uvue|.vue|.nvue
          return
        }
        if (!this.options.allowOverrides) {
          console.warn(
            `[easycom] component "${tag}"(${path}) has naming conflicts with other components, ignored.`
          )
          return
        }
      }

      this._componentMap[tag] = {
        as: tag,
        from: path,
      }
    })
  }

  _searched = false

  searchGlob() {
    if (this._searched) return
    this.searchComponents()
    debug.search(this._componentMap)
    this._searched = true
  }

  searchComponents() {
    debug.search(`started with: [${this.options.globs.join(', ')}]`)
    const root = this.options.inputDir
    const files = fg.sync(this.options.globs, {
      ignore: ['node_modules', 'unpackage', 'uniCloud-*', 'static'],
      onlyFiles: true,
      cwd: root,
      absolute: true,
    })
    debug.search(`${files.length} components found.`)
    this.addComponents(files, parseTag)
    this.searchCustomComponents()
  }

  searchCustomComponents() {
    debug.search(`started with: [${this.options.customGlobs.join(', ')}]`)
    const root = this.options.inputDir
    this.options.customGlobs.forEach((custom) => {
      const files = fg.sync(custom.glob, {
        onlyFiles: true,
        cwd: root,
        absolute: true,
      })
      debug.search(`${files.length} components found.`)
      this.addComponents(files, custom.parseTag)
    })
  }

  _generateDeclaration(removeUnused = false) {
    return writeDeclaration(this, this.options.dts, removeUnused)
  }

  generateDeclaration

  get componentMap() {
    return this._componentMap
  }
}
