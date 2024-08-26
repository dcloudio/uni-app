import fs from 'fs-extra'
import path from 'path'
import debug from 'debug'
import { type FSWatcher, type WatchOptions, watch } from 'chokidar'
import { isArray } from '@vue/shared'
import { pathToGlob } from './utils'
type FileTransform = (source: Buffer, filename: string) => void | string
export interface FileWatcherOptions {
  src: string | string[]
  dest: string
  transform?: FileTransform
}

const debugWatcher = debug('uni:watcher')
export class FileWatcher {
  private src: string[]
  private dest: string
  private transform?: FileTransform
  private watcher!: FSWatcher
  private onChange?: () => void
  constructor({ src, dest, transform }: FileWatcherOptions) {
    this.src = !isArray(src) ? [src] : src
    this.dest = dest
    this.transform = transform
  }
  watch(
    watchOptions: WatchOptions & { cwd: string; readyTimeout?: number },
    onReady?: (watcher: FSWatcher) => void,
    onChange?: () => void
  ) {
    if (!this.watcher) {
      const copy = this.copy.bind(this)
      const remove = this.remove.bind(this)
      // escape chokidar cwd
      const src = this.src.map((src) =>
        pathToGlob(path.resolve(watchOptions.cwd), src)
      )
      let closeTimer: any
      const checkReady = () => {
        if (closeTimer) {
          clearTimeout(closeTimer)
        }
        closeTimer = setTimeout(() => {
          onReady && onReady(this.watcher)
          // 等首次change完，触发完ready，在切换到真实的onChange
          this.onChange = onChange
        }, watchOptions.readyTimeout || 300)
      }

      this.onChange = checkReady
      this.watcher = watch(src, watchOptions)
        .on('add', copy)
        // .on('addDir', copy)
        .on('change', copy)
        .on('unlink', remove)
        // .on('unlinkDir', remove)
        .on('ready', () => {
          checkReady()
        })
        .on('error', (e) => console.error('watch', e))
    }
    return this.watcher
  }
  add(paths: string | ReadonlyArray<string>) {
    this.info('add', paths)
    return this.watcher.add(paths)
  }
  unwatch(paths: string | ReadonlyArray<string>) {
    this.info('unwatch', paths)
    return this.watcher.unwatch(paths)
  }
  close() {
    this.info('close')
    return this.watcher.close()
  }
  copy(from: string) {
    const to = this.to(from)
    this.info('copy', from + '=>' + to)
    let content: string | void = ''
    if (this.transform) {
      const filename = this.from(from)
      content = this.transform(fs.readFileSync(filename), filename)
    }
    if (content) {
      try {
        fs.outputFileSync(to, content)
      } catch (e) {
        // noop
      }
      this.onChange && this.onChange()
      return
    }
    try {
      fs.copySync(this.from(from), to)
    } catch (e) {
      // noop
    }

    this.onChange && this.onChange()
  }
  remove(from: string) {
    const to = this.to(from)
    this.info('remove', from + '=>' + to)
    try {
      fs.removeSync(to)
    } catch (e) {
      // noop
    }
    this.onChange && this.onChange()
  }
  info(
    type: 'close' | 'copy' | 'remove' | 'add' | 'unwatch',
    msg?: string | unknown
  ) {
    debugWatcher.enabled && debugWatcher(type, msg)
  }
  from(from: string) {
    return path.join(this.watcher.options.cwd!, from)
  }
  to(from: string) {
    return path.join(this.dest, from)
  }
}
