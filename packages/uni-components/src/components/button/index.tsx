import { defineComponent } from 'vue'
// TODO
// import { hover, emitter, listeners } from '../../mixins'
export default defineComponent({
  name: 'Button',
  // mixins: [hover, emitter, listeners],
  props: {
    hoverClass: {
      type: String,
      default: 'button-hover',
    },
    disabled: {
      type: [Boolean, String],
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false,
    },
    hoverStartTime: {
      type: [Number, String],
      default: 20,
    },
    hoverStayTime: {
      type: [Number, String],
      default: 70,
    },
    formType: {
      type: String,
      default: '',
      validator(value: string) {
        // 只有这几个可取值，其它都是非法的。
        return !!~['', 'submit', 'reset'].indexOf(value)
      },
    },
    openType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      clickFunction: null,
    }
  },
  setup(props, { slots }) {
    // TODO
    return () => <uni-button>{slots.default && slots.default()}</uni-button>
  },
  methods: {
    // _onClick($event: unknown, isLabelClick: boolean) {
    //   if (this.disabled) {
    //     return
    //   }
    //   if (isLabelClick) {
    //     this.$el.click()
    //   }
    //   // TODO 通知父表单执行相应的行为
    //   if (this.formType) {
    //     this.$dispatch(
    //       'Form',
    //       this.formType === 'submit' ? 'uni-form-submit' : 'uni-form-reset',
    //       {
    //         type: this.formType,
    //       }
    //     )
    //     return
    //   }
    //   if (this.openType === 'feedback') {
    //     const feedback = plus.webview.create(
    //       'https://service.dcloud.net.cn/uniapp/feedback.html',
    //       'feedback',
    //       {
    //         titleNView: {
    //           titleText: '问题反馈',
    //           autoBackButton: true,
    //           backgroundColor: '#F7F7F7',
    //           titleColor: '#007aff',
    //           buttons: [
    //             {
    //               text: '发送',
    //               color: '#007aff',
    //               fontSize: '16px',
    //               fontWeight: 'bold',
    //               onclick: function (e) {
    //                 feedback.evalJS(
    //                   'mui&&mui.trigger(document.getElementById("submit"),"tap")'
    //                 )
    //               },
    //             },
    //           ],
    //         },
    //       }
    //     )
    //     feedback.show('slide-in-right')
    //   }
    // },
    // _bindObjectListeners(data, value) {
    //   if (value) {
    //     for (const key in value) {
    //       const existing = data.on[key]
    //       const ours = value[key]
    //       data.on[key] = existing ? [].concat(existing, ours) : ours
    //     }
    //   }
    //   return data
    // },
  },
  // render(createElement) {
  //   const $listeners = Object.create(null)
  //   if (this.$listeners) {
  //     Object.keys(this.$listeners).forEach((e) => {
  //       if (this.disabled && (e === 'click' || e === 'tap')) {
  //         return
  //       }
  //       $listeners[e] = this.$listeners[e]
  //     })
  //   }
  //   if (this.hoverClass && this.hoverClass !== 'none') {
  //     return createElement(
  //       'uni-button',
  //       this._bindObjectListeners(
  //         {
  //           class: [this.hovering ? this.hoverClass : ''],
  //           attrs: {
  //             disabled: this.disabled,
  //           },
  //           on: {
  //             touchstart: this._hoverTouchStart,
  //             touchend: this._hoverTouchEnd,
  //             touchcancel: this._hoverTouchCancel,
  //             click: this._onClick,
  //           },
  //         },
  //         $listeners
  //       ),
  //       this.$slots.default
  //     )
  //   } else {
  //     return createElement(
  //       'uni-button',
  //       this._bindObjectListeners(
  //         {
  //           class: [this.hovering ? this.hoverClass : ''],
  //           attrs: {
  //             disabled: this.disabled,
  //           },
  //           on: {
  //             click: this._onClick,
  //           },
  //         },
  //         $listeners
  //       ),
  //       this.$slots.default
  //     )
  //   }
  // },
  listeners: {
    'label-click': '_onClick',
    '@label-click': '_onClick',
  },
})
