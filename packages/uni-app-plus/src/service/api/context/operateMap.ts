import type { ComponentPublicInstance } from 'vue'
import { findElmById, invokeVmMethod, invokeVmMethodWithoutArgs } from '../util'
import {
  getPage$BasePage,
  getPageById,
} from '../../framework/page/getCurrentPages'

type Methords = Record<string, (ctx: any, args: any) => void>

const METHODS: Methords = {
  getCenterLocation(ctx, cbs) {
    return invokeVmMethodWithoutArgs(ctx, 'getCenterLocation', cbs)
  },
  moveToLocation(ctx, args) {
    return invokeVmMethod(ctx, 'moveToLocation', args)
  },
  translateMarker(ctx, args) {
    return invokeVmMethod(ctx, 'translateMarker', args, ['animationEnd'])
  },
  includePoints(ctx, args) {
    return invokeVmMethod(ctx, 'includePoints', args)
  },
  getRegion(ctx, cbs) {
    return invokeVmMethodWithoutArgs(ctx, 'getRegion', cbs)
  },
  getScale(ctx, cbs) {
    return invokeVmMethodWithoutArgs(ctx, 'getScale', cbs)
  },
  addCustomLayer(ctx, args) {
    return invokeVmMethod(ctx, 'addCustomLayer', args)
  },
  removeCustomLayer(ctx, args) {
    return invokeVmMethod(ctx, 'removeCustomLayer', args)
  },
  addGroundOverlay(ctx, args) {
    return invokeVmMethod(ctx, 'addGroundOverlay', args)
  },
  removeGroundOverlay(ctx, args) {
    return invokeVmMethod(ctx, 'removeGroundOverlay', args)
  },
  updateGroundOverlay(ctx, args) {
    return invokeVmMethod(ctx, 'updateGroundOverlay', args)
  },
  initMarkerCluster(ctx, args) {
    return invokeVmMethod(ctx, 'initMarkerCluster', args)
  },
  addMarkers(ctx, args) {
    return invokeVmMethod(ctx, 'addMarkers', args)
  },
  removeMarkers(ctx, args) {
    return invokeVmMethod(ctx, 'removeMarkers', args)
  },
  moveAlong(ctx, args) {
    return invokeVmMethod(ctx, 'moveAlong', args)
  },
  setLocMarkerIcon(ctx, args) {
    return invokeVmMethod(ctx, 'setLocMarkerIcon', args)
  },
  openMapApp(ctx, args) {
    return invokeVmMethod(ctx, 'openMapApp', args)
  },
  on(ctx, args) {
    return ctx.on(args.name, args.callback)
  },
}

export function operateMap(
  id: string,
  pageId: number,
  type: string,
  data?: unknown,
  operateMapCallback?: (res: any) => void
) {
  const page = getPageById(pageId)
  if (page && getPage$BasePage(page).meta.isNVue) {
    const pageVm = (page as any).$vm as ComponentPublicInstance
    return METHODS[type as keyof typeof METHODS](
      findElmById(id, pageVm),
      data as any
    )
  }
  UniServiceJSBridge.invokeViewMethod(
    'map.' + id,
    {
      type,
      data,
    },
    pageId,
    operateMapCallback
  )
}
