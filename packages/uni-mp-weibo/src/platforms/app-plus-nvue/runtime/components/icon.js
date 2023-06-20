const iconChars = {
  'success': '\uEA06',
  'info': '\uEA03',
  'warn': '\uEA0B',
  'waiting': '\uEA09',
  'safe_success': '\uEA04',
  'safe_warn': '\uEA05',
  'success_circle': '\uEA07',
  'success_no_circle': '\uEA08',
  'waiting_circle': '\uEA0A',
  'circle': '\uEA01',
  'download': '\uEA02',
  'info_circle': '\uEA0C',
  'cancel': '\uEA0D',
  'search': '\uEA0E',
  'clear': '\uEA0F'
}
// 测试中发现通过动态绑定 class 来设置样式没生效，暂时这样列出来通过 style 来处理。
const iconColors = {
  'success': '#007aff',
  'info': '#10aeff',
  'warn': '#f76260',
  'waiting': '#10aeff',
  'safe_success': '#007aff',
  'safe_warn': '#ffbe00',
  'success_circle': '#007aff',
  'success_no_circle': '#007aff',
  'waiting_circle': '#10aeff',
  'circle': '#c9c9c9',
  'download': '#007aff',
  'info_circle': '#007aff',
  'cancel': '#f43530',
  'search': '#b2b2b2',
  'clear': '#b2b2b2'
}

function getIcon (weex) {
  return {
    name: 'Icon',
    props: {
      type: {
        type: String,
        default: ''
      },
      size: {
        type: [String, Number],
        default: 23
      },
      color: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        iconChars
      }
    },
    beforeCreate () {
    },
    computed: {
      styles () {
        return {
          color: this.color || iconColors[this.type],
          fontSize: this.size
        }
      }
    },
    render (createElement) {
      const _vm = this
      return createElement('u-text', _vm._g({
        staticClass: ['uni-icon'],
        style: _vm.styles
      }, _vm.$listeners), [_vm.iconChars[_vm.type]])
    },
    style: {
      'uni-icon': {
        'fontFamily': 'unincomponents'
      }
    }
  }
}

export default function init (Vue, weex) {
  Vue.component('icon', getIcon(weex))
}
