import { recursive } from 'merge'

export function initRecursiveMerge(
  manifestJson: Record<string, any>,
  userManifestJson: Record<string, any>
): Record<string, any> {
  const platformConfig: Record<string, any> = {
    plus: userManifestJson['app-plus'],
  }
  platformConfig['app-harmony'] = userManifestJson['app-harmony']
  return recursive(
    true,
    manifestJson,
    {
      id: userManifestJson.appid || '',
      name: userManifestJson.name || '',
      description: userManifestJson.description || '',
      version: {
        name: userManifestJson.versionName,
        code: userManifestJson.versionCode,
      },
      locale: userManifestJson.locale,
      uniStatistics: userManifestJson.uniStatistics,
    },
    platformConfig
  )
}
