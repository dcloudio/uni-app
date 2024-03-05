import type { Ref } from 'vue'

export type ListItemStatus = {
  type: 'ListItem'
  visible: Ref<boolean>
  cachedSize: number
  seen: Ref<boolean>
}

export type StickyHeaderStatus = {
  type: 'StickyHeader'
  cachedSize: number
}

export type StickySectionStatus = {
  type: 'StickySection'
  headSize: Ref<number>
  tailSize: Ref<number>
}
