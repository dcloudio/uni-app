import { hasOwn } from '@vue/shared'
import { parseJson } from '../json'

interface ParseMiniProgramProjectJsonOptions {
  template: Record<string, any>
}
interface ProjectConfig {
  projectname: string
}

const projectKeys = [
  'appid',
  'setting',
  'miniprogramRoot',
  'cloudfunctionRoot',
  'qcloudRoot',
  'pluginRoot',
  'compileType',
  'libVersion',
  'projectname',
  'packOptions',
  'debugOptions',
  'scripts',
  'cloudbaseRoot',
]

export function parseMiniProgramProjectJson(
  jsonStr: string,
  platform: UniApp.PLATFORM,
  { template }: ParseMiniProgramProjectJsonOptions
) {
  const project = JSON.parse(JSON.stringify(template)) as ProjectConfig
  const manifestJson = parseJson(jsonStr)
  if (manifestJson) {
    project.projectname = manifestJson.name
    const platformConfig = manifestJson[platform]
    if (platformConfig) {
      projectKeys.forEach((name) => {
        if (hasOwn(platformConfig, name)) {
          ;(project as Record<string, any>)[name] = platformConfig[name]
        }
      })
    }
  }
  return project
}
