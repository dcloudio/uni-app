import { toTypeString, toRawType } from '@vue/shared'

function isDebugMode() {
  // @ts-expect-error
  return typeof __channelId__ === 'string' && __channelId__
}

function jsonStringifyReplacer(k: string, p: unknown) {
  switch (toRawType(p)) {
    case 'Function':
      return 'function() { [native code] }'
    default:
      return p
  }
}

export function normalizeLog(
  type: 'log' | 'info' | 'debug' | 'warn' | 'error',
  filename: string,
  args: unknown[]
) {
  if (isDebugMode()) {
    args.push(filename.replace('at ', 'uni-app:///'))
    return console[type].apply(console, args)
  }

  const msgs = args.map(function (v) {
    const type = toTypeString(v).toLowerCase()
    if (type === '[object object]' || type === '[object array]') {
      try {
        v =
          '---BEGIN:JSON---' +
          JSON.stringify(v, jsonStringifyReplacer) +
          '---END:JSON---'
      } catch (e) {
        v = type
      }
    } else {
      if (v === null) {
        v = '---NULL---'
      } else if (v === undefined) {
        v = '---UNDEFINED---'
      } else {
        const vType = toRawType(v).toUpperCase()
        if (vType === 'NUMBER' || vType === 'BOOLEAN') {
          v = '---BEGIN:' + vType + '---' + v + '---END:' + vType + '---'
        } else {
          v = String(v)
        }
      }
    }
    return v
  })
  return msgs.join('---COMMA---') + ' ' + filename
}

export function formatLog(
  type: 'log' | 'info' | 'debug' | 'warn' | 'error',
  filename: string,
  ...args: unknown[]
) {
  console[type](normalizeLog(type, filename, args))
}
