import { createTransformTag } from './transformTag'
import { createTransformEvent } from './transformEvent'
import { createTransformComponentLink } from './transformComponent'
import { COMPONENT_BIND_LINK } from '../../mp/constants'

export * from './transformRef'
export * from './transformPageHead'
export * from './transformComponent'
export * from './transformEvent'
export * from './transformTag'
export { createAssetUrlTransformWithOptions } from './templateTransformAssetUrl'
export { createSrcsetTransformWithOptions } from './templateTransformSrcset'
export {
  ATTR_DATASET_EVENT_OPTS,
  createTransformOn,
  defaultMatch as matchTransformOn,
} from './vOn'
export {
  createTransformModel,
  defaultMatch as matchTransformModel,
} from './vModel'

export const transformMatchMedia = createTransformTag({
  'match-media': 'uni-match-media',
})

export const transformTapToClick = createTransformEvent({
  tap: 'click',
})

export const transformComponentLink =
  createTransformComponentLink(COMPONENT_BIND_LINK)
