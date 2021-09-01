import { recursive } from 'merge'

export function initRecursiveMerge(
  manifestJson: Record<string, any>,
  userManifestJson: Record<string, any>
): Record<string, any> {
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
    },
    { plus: userManifestJson['app-plus'] }
  )
}
