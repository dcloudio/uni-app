import { createTransformTag } from './transformTag'
import { createTransformEvent } from './transformEvent'
import { createTransformComponentLink } from './transformComponent'
import { COMPONENT_BIND_LINK } from '../../mp/constants'

export * from './transformRef'
export * from './transformPageHead'
export * from './transformComponent'
export * from './transformEvent'
export * from './transformTag'

export const transformMatchMedia = createTransformTag({
  'match-media': 'uni-match-media',
})

export const transformTapToClick = createTransformEvent({
  tap: 'click',
})

export const transformComponentLink =
  createTransformComponentLink(COMPONENT_BIND_LINK)
