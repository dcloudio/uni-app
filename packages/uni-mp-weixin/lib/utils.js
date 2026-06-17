const path = require('path')
const fs = require('fs')
const { parseManifestJson } = require('@dcloudio/uni-cli-shared/lib/manifest')

function getMiniProgramAIPaths (inputDir, platform) {
  if (!inputDir || !platform) {
    return []
  }

  const manifestJsonPath = path.resolve(inputDir, 'manifest.json')
  const manifestJson = parseManifestJson(fs.readFileSync(manifestJsonPath, 'utf8'))
  const config = manifestJson[platform]
  if (!config || !config.agent) {
    return []
  }

  const agentConfig = config.agent
  const paths = []

  const instruction = agentConfig.instruction
  if (instruction) {
    paths.push(instruction)
  }

  const pageMetadata = agentConfig.pageMetadata
  if (pageMetadata) {
    paths.push(pageMetadata)
  }

  const skills = agentConfig.skills
  if (Array.isArray(skills) && skills.length > 0) {
    paths.push(...skills.map(skill => skill.path).filter(Boolean))
  }

  return paths
}

module.exports = {
  getMiniProgramAIPaths
}
