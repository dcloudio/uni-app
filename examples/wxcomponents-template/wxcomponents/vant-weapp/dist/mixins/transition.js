export const transition = function(showDefaultValue) {
  return Behavior({
    properties: {
      customStyle: String,
      show: {
        value: showDefaultValue,
        type: Boolean,
        observer(value) {
          if (value) {
            this.show();
          } else {
            this.setData({
              type: 'leave'
            });
          }
        }
      },
      duration: {
        type: Number,
        value: 300
      }
    },

    data: {
      type: '',
      inited: false,
      display: false
    },

    attached() {
      if (this.data.show) {
        this.show();
      }
    },

    methods: {
      show() {
        this.setData({
          inited: true,
          display: true,
          type: 'enter'
        });
      },

      onAnimationEnd() {
        if (!this.data.show) {
          this.setData({
            display: false
          });
        }
      }
    }
  });
};
