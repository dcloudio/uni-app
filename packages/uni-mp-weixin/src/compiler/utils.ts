import { parseManifestJsonOnce } from '@dcloudio/uni-cli-shared'
import { isArray } from '@vue/shared'

interface AgentConfig {
  instruction?: string
  pageMetadata?: string
  skills?: Array<{ path: string; name: string; description: string }>
}

export function getMiniProgramAIPaths(
  inputDir?: string,
  platform?: UniApp.PLATFORM
) {
  if (!inputDir || !platform) {
    return []
  }
  const manifestJson = parseManifestJsonOnce(inputDir)
  const config = manifestJson[platform]
  if (!config?.agent) {
    return []
  }

  const agentConfig: AgentConfig = config.agent
  const paths: string[] = []

  const instruction = agentConfig.instruction
  if (instruction) {
    paths.push(instruction)
  }

  const pageMetadata = agentConfig.pageMetadata
  if (pageMetadata) {
    paths.push(pageMetadata)
  }

  const skills = agentConfig.skills
  if (isArray(skills) && skills.length > 0) {
    paths.push(...skills.map((skill) => skill.path).filter(Boolean))
  }

  return paths
}
