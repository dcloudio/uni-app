import fs from 'fs-extra'
import path from 'path'
import { FSWatcher, watch, WatchOptions } from 'chokidar'
import { isArray } from '@vue/shared'
import { pathToGlob } from './utils'
type FileTransform = (source: Buffer, filename: string) => void | string
export interface FileWatcherOptions {
  src: string | string[]
  dest: string
  transform?: FileTransform
  verbose?: boolean
}
export class FileWatcher {
  private src: string[]
  private dest: string
  private transform?: FileTransform
  private verbose?: boolean
  private watcher!: FSWatcher
  private onChange?: () => void
  constructor({ src, dest, transform, verbose }: FileWatcherOptions) {
    this.src = !isArray(src) ? [src] : src
    this.dest = dest
    this.transform = transform
    this.verbose = verbose
  }
  watch(
    watchOptions: WatchOptions & { cwd: string },
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
      this.watcher = watch(src, watchOptions)
        .on('add', copy)
        .on('addDir', copy)
        .on('change', copy)
        .on('unlink', remove)
        .on('unlinkDir', remove)
        .on('ready', () => {
          onReady && onReady(this.watcher)
          setTimeout(() => {
            this.onChange = onChange
          }, 1000)
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
    let content: string | void
    if (this.transform) {
      const filename = this.from(from)
      content = this.transform(fs.readFileSync(filename), filename)
    }
    if (content) {
      return fs
        .outputFile(to, content)
        .catch(() => {
          // this.info('copy', e)
        })
        .then(() => this.onChange && this.onChange())
    }
    return fs
      .copy(this.from(from), to, { overwrite: true })
      .catch(() => {
        // this.info('copy', e)
      })
      .then(() => this.onChange && this.onChange())
  }
  remove(from: string) {
    const to = this.to(from)
    this.info('remove', from + '=>' + to)
    return fs
      .remove(to)
      .catch(() => {
        // this.info('remove', e)
      })
      .then(() => this.onChange && this.onChange())
  }
  info(
    type: 'close' | 'copy' | 'remove' | 'add' | 'unwatch',
    msg?: string | unknown
  ) {
    this.verbose && console.log(type, msg)
  }
  from(from: string) {
    return path.join(this.watcher.options.cwd!, from)
  }
  to(from: string) {
    return path.join(this.dest, from)
  }
}
