import { isString } from '@vue/shared'

const scripts: Record<string, Function[]> = {}

interface WindowExt extends Window {
  [key: string]: any
}

export default function loadScript(
  globalName: any,
  src: string,
  callback: () => void
) {
  const globalObject = isString(globalName)
    ? (window as WindowExt)[globalName]
    : globalName
  if (globalObject) {
    callback()
    return
  }
  let callbacks = scripts[src]
  if (!callbacks) {
    callbacks = scripts[src] = []
    const script = document.createElement('script')
    script.src = src
    document.body.appendChild(script)
    script.onload = function () {
      callbacks.forEach((callback) => callback())
      delete scripts[src]
    }
  }
  callbacks.push(callback)
}
