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
      activeBackgroundColor: 'active-color',
      foreColor: 'handle-color',
      blockColor: 'handle-color',
      blockSize: 'handle-size',
    },
    switch: {
      activeBackgroundColor: 'color',
    },
    canvas: {
      canvasId: 'id',
    },
    user: {
      canvasId: 'id',
    },
    picker: {
      headerText: 'title',
    },
    // 支付宝小程序不支持 text 的 user-select 属性 https://opendocs.alipay.com/mini/component/text?pathHash=f8422b38#%E5%B1%9E%E6%80%A7%E8%AF%B4%E6%98%8E
    text: {
      userSelect: 'selectable',
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
    'list-item': 'view',
    'sticky-header': 'view',
    'sticky-section': 'view',
  },
}

export const transformMPBuiltInTag = createMPBuiltInTagTransform(
  transformMPBuiltInTagOptions
)
