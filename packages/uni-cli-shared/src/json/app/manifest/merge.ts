import { recursive } from 'merge'

export function initRecursiveMerge(
  manifestJson: Record<string, any>,
  userManifestJson: Record<string, any>
) {
  recursive(
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
    },
    { plus: userManifestJson['app-plus'] }
  )
}
