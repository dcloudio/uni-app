export interface UniProvider {
  id: string
  description: string
}

const providers: Map<String, Map<String, UniProvider>> = new Map()

export function getUniProvider<T extends UniProvider>(
  service: string,
  providerName: String
): T | null {
  return providers.get(service)?.get(providerName) as T | null
}

export function getUniProviders(service: string): UniProvider[] {
  const result: UniProvider[] = []
  providers.get(service)?.forEach((provider) => {
    result.push(provider)
  })
  return result
}

export function registerUniProvider<T extends UniProvider>(
  service: string,
  providerName: string,
  provider: T
) {
  if (!providers.has(service)) {
    providers.set(service, new Map())
  }
  providers.get(service)?.set(providerName, provider)
}
