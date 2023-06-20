const scripts = {}

export default function loadScript (globalName, src, callback) {
  const globalObject = typeof globalName === 'string' ? window[globalName] : globalName
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
      callbacks.forEach(callback => callback())
      delete scripts[src]
    }
  }
  callbacks.push(callback)
}
