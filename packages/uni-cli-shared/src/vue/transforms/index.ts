import { BUILT_IN_TAG_NAMES, COMPONENT_PREFIX } from '@dcloudio/uni-shared'
import { createTransformTag } from './transformTag'
import { createTransformEvent } from './transformEvent'
import { createTransformComponentLink } from './transformComponent'
import { COMPONENT_BIND_LINK } from '../../mp/constants'

export * from './transformRef'
export * from './transformPageHead'
export * from './transformComponent'
export * from './transformEvent'
export * from './transformTag'
export * from './transformUTSComponent'
export * from './transformRefresherSlot'
export { createAssetUrlTransformWithOptions } from './templateTransformAssetUrl'
export { createSrcsetTransformWithOptions } from './templateTransformSrcset'
export {
  STRINGIFY_JSON,
  ATTR_DATASET_EVENT_OPTS,
  createTransformOn,
  defaultMatch as matchTransformOn,
} from './vOn'
export {
  createTransformModel,
  defaultMatch as matchTransformModel,
} from './vModel'

export const transformH5BuiltInComponents = createTransformTag(
  BUILT_IN_TAG_NAMES.reduce<Record<string, string>>(
    (tags, tag) => ((tags[tag] = COMPONENT_PREFIX + tag), tags),
    {}
  )
)

export const transformMatchMedia = createTransformTag({
  'match-media': 'uni-match-media',
})

export const transformTapToClick = createTransformEvent({
  tap: (node) => {
    // 地图组件有自己特定的 tap 事件
    if (node.tag === 'map' || node.tag === 'v-uni-map') {
      return 'tap'
    }
    return 'click'
  },
})

export const transformComponentLink =
  createTransformComponentLink(COMPONENT_BIND_LINK)

export * from './x/transformMPBuiltInTag'
