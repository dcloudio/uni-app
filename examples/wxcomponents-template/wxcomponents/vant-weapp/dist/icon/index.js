import { create } from '../common/create';

create({
  props: {
    info: null,
    name: String,
    size: String,
    color: String,
    classPrefix: {
      type: String,
      value: 'van-icon'
    }
  },

  methods: {
    onClick() {
      this.$emit('click');
    }
  }
});
