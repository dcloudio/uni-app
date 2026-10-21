import { VIRTUAL_HOST_ID } from '@dcloudio/uni-shared'

function hasIdProp(_ctx: any): boolean {
  return (
    _ctx.$.propsOptions &&
    _ctx.$.propsOptions[0] &&
    'id' in _ctx.$.propsOptions[0]
  )
}

function getVirtualHostId(_ctx: any): string {
  // #if _X_
  return _ctx[VIRTUAL_HOST_ID]
  // #endif
  // #if !_X_
  return _ctx.$scope[VIRTUAL_HOST_ID]
  // #endif
}

function hasVirtualHostId(_ctx: any): boolean {
  return !!getVirtualHostId(_ctx)
}

function genIdWithVirtualHost(_ctx: any, idBinding: string): string {
  if (!hasVirtualHostId(_ctx) || hasIdProp(_ctx)) {
    return idBinding
  }
  return getVirtualHostId(_ctx)
}

export function genUniElementId(
  _ctx: any,
  idBinding: string,
  genId?: string
): string {
  return genIdWithVirtualHost(_ctx, idBinding) || genId || ''
}
