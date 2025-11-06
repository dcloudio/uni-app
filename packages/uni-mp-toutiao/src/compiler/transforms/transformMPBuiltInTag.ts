import {
  type TransformMPBuiltInTagOptions,
  createMPBuiltInTagTransform,
} from '@dcloudio/uni-cli-shared'

const transformMPBuiltInTagOptions: TransformMPBuiltInTagOptions = {
  propRename: {
    checkbox: {
      foreColor: 'color',
    },
    radio: {
      activeBackgroundColor: 'color',
    },
    slider: {
      foreColor: 'block-color',
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
    'scroll-view': [
      {
        name: 'enhanced',
        value: 'true',
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
