import {
  operateMapPlayer as operateVueMapPlayer
} from 'uni-platforms/h5/service/api/context/operate-map-player'
import {
  operateMapPlayer as operateNVueMapPlayer
} from 'uni-platforms/app-plus-nvue/service/api/context/operate-map-player'

export function operateMapPlayer(mapId, pageVm, type, data) {
  pageVm.$page.meta.isNVue ?
    operateNVueMapPlayer(mapId, pageVm, type, data) :
    operateVueMapPlayer(mapId, pageVm, type, data)
}
