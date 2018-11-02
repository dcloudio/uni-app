export const button = Behavior({
  properties: {
    loading: Boolean,
    openType: String,
    appParameter: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: String,
    hoverStopPropagation: Boolean,
    hoverStartTime: {
      type: Number,
      value: 20
    },
    hoverStayTime: {
      type: Number,
      value: 70
    },
    lang: {
      type: String,
      value: 'en'
    },
    sessionFrom: {
      type: String,
      value: ''
    }
  },

  methods: {
    bindgetuserinfo(event = {}) {
      this.$emit('getuserinfo', event.detail);
    },

    bindcontact(event = {}) {
      this.$emit('contact', event.detail);
    },

    bindgetphonenumber(event = {}) {
      this.$emit('getphonenumber', event.detail);
    },

    bindopensetting(event = {}) {
      this.$emit('opensetting', event.detail);
    },

    binderror(event = {}) {
      this.$emit('error', event.detail);
    }
  }
});
