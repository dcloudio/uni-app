import path from 'path'
import { getFileContent } from './utils'

let kotlinManifest = {
  manifest: {} as Record<string, string>,
}

export interface KotlinManifestCache {
  version: string
  env: Record<string, string>
  files: Record<string, Record<string, string>>
}
export function updateUTSKotlinSourceMapManifestCache(
  url: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const manifestFile = path.resolve(url, '.manifest.json')
    try {
      getFileContent(manifestFile).then((content) => {
        try {
          const { files } = JSON.parse(content) as KotlinManifestCache
          if (files) {
            const classManifest: Record<string, string> = {}
            Object.keys(files).forEach((name) => {
              const kotlinClass = files[name].class
              if (kotlinClass) {
                classManifest[kotlinClass] = name
              }
            })
            kotlinManifest.manifest = classManifest
          }
        } catch (error) {
          // console.log(`Failed to parse Kotlin manifest file: ${url}`)
        }
        resolve()
      })
    } catch (e) {}
  })
}

export function parseFilenameByClassName(className: string) {
  return kotlinManifest.manifest[className.split('$')[0]] || 'index.kt'
}
