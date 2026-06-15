import fs from 'fs'
import path from 'path'
import { parseManifestJsonOnce } from '@dcloudio/uni-cli-shared'
import { isArray } from '@vue/shared'

interface AgentConfig {
  instruction?: string
  pageMetadata?: string
  skills?: Array<{ path: string; name: string; description: string }>
}

export function getMiniProgramAIPaths(
  inputDir: string,
  platform: UniApp.PLATFORM
) {
  const manifestJson = parseManifestJsonOnce(inputDir).manifest
  const config = manifestJson[platform]
  if (!config?.agent) {
    return []
  }

  const agentConfig: AgentConfig = config.agent
  const paths: string[] = []

  const instruction = agentConfig.instruction
  if (instruction && fs.existsSync(path.resolve(inputDir, instruction))) {
    paths.push(instruction)
  }

  const pageMetadata = agentConfig.pageMetadata
  if (pageMetadata && fs.existsSync(path.resolve(inputDir, pageMetadata))) {
    paths.push(pageMetadata)
  }

  const skills = agentConfig.skills
  if (isArray(skills) && skills.length > 0) {
    skills.forEach((skill) => {
      if (skill.path && fs.existsSync(path.resolve(inputDir, skill.path))) {
        paths.push(skill.path)
      }
    })
  }

  return paths
}
