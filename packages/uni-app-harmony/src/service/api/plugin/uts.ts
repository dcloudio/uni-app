const pluginDefines: Record<string, Record<string, unknown>> = {}
export function registerUTSPlugin(
  name: string,
  define: Record<string, unknown>
) {
  pluginDefines[name] = define
}

export function requireUTSPlugin(name: string) {
  const define = pluginDefines[name]
  if (!define) {
    console.error(`${name} is not found`)
  }
  return define
}
