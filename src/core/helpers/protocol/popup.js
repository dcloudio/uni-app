import getRealPath from 'uni-platform/helpers/get-real-path'

export const showModal = {
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  cancelColor: {
    type: String,
    default: '#000000'
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  confirmColor: {
    type: String,
    default: '#007aff'
  },
  visible: {
    type: Boolean,
    default: true
  }
}

export const showToast = {
  title: {
    type: String,
    default: ''
  },
  icon: {
    default: 'success',
    validator (icon, params) {
      if (['success', 'loading', 'none'].indexOf(icon) === -1) {
        params.icon = 'success'
      }
    }
  },
  image: {
    type: String,
    default: '',
    validator (image, params) {
      if (image) {
        params.image = getRealPath(image)
      }
    }
  },
  duration: {
    type: Number,
    default: 1500
  },
  mask: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: true
  }
}
export const showLoading = {
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'loading'
  },
  duration: {
    type: Number,
    default: 100000000 // 简单处理 showLoading，直接设置个大值
  },
  mask: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: true
  },
  isShowLoading: {
    type: Boolean,
    default: true
  }
}

export const showActionSheet = {
  itemList: {
    type: Array,
    required: true,
    validator (itemList, params) {
      if (!itemList.length) {
        return 'parameter.itemList should have at least 1 item'
      }
    }
  },
  itemColor: {
    type: String,
    default: '#000000'
  },
  visible: {
    type: Boolean,
    default: true
  }
}
