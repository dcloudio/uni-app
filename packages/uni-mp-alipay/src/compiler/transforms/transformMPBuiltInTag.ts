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
      foreColor: 'handle-color',
    },
    switch: {
      activeBackgroundColor: 'color',
    },
  },
  propAdd: {
    canvas: [
      {
        name: 'type',
        value: '2d',
      },
    ],
  },
  tagRename: {
    'list-view': 'scroll-view',
  },
}

export const transformMPBuiltInTag = createMPBuiltInTagTransform(
  transformMPBuiltInTagOptions
)
