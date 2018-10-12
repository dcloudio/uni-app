import { create } from '../common/create';

create({
  classes: ['title-class'],

  props: {
    title: String,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    fixed: Boolean,
    zIndex: {
      type: Number,
      value: 1
    }
  },

  methods: {
    onClickLeft() {
      this.$emit('clickLeft');
    },

    onClickRight() {
      this.$emit('clickRight');
    }
  }
});
