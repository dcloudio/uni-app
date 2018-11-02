import { classNames } from '../common/class-names';

export const basic = Behavior({
  methods: {
    classNames,

    $emit() {
      this.triggerEvent.apply(this, arguments);
    },

    getRect(selector, all) {
      return new Promise((resolve, reject) => {
        wx.createSelectorQuery()
          .in(this)[all ? 'selectAll' : 'select'](selector)
          .boundingClientRect(rect => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }

            if (!all && rect) {
              resolve(rect);
            }
          })
          .exec();
      });
    }
  }
});
