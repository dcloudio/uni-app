import { createMPBuiltInTagTransform } from '@dcloudio/uni-cli-shared'

const transformMPBuiltInTagOptions = {
  propRename: {
    checkbox: {
      foreColor: 'color',
    },
    radio: {
      activeBackgroundColor: 'color',
    },
    slider: {
      activeBackgroundColor: 'active-color',
      foreColor: 'block-color',
    },
    switch: {
      activeBackgroundColor: 'color',
    },
  },
  tagRename: {
    'list-view': 'scroll-view',
  },
}

export const transformMPBuiltInTag = createMPBuiltInTagTransform(
  transformMPBuiltInTagOptions
)
