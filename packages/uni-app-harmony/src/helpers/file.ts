import { invokeHarmonyChannel } from './channel'

export function getSameOriginUrl(url: string): Promise<string> {
  return Promise.resolve(invokeHarmonyChannel('getSameOriginUrl', [url]))
}
