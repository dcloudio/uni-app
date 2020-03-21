import {
  createLivePusherContext as createLivePusher
} from 'uni-platforms/app-plus-nvue/service/api/context/live-pusher'

export function createLivePusherContext (id, vm) {
  return createLivePusher(id, vm)
}
