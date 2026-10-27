Component({
  props: {
    // The initial value is read when the component is mounted.
    initialCount: 0,
    step: 1,
    min: 0,
    max: 99,
    // Alipay native components pass events to the parent as function props.
    onChange: function onChange() {}
  },

  data: {
    value: 0
  },

  didMount() {
    this.setData({
      value: this.normalize(this.getOption('initialCount'))
    });
  },

  didUpdate(previousProps, previousData) {
    const initialCountChanged =
      previousProps.initialCount !== this.props.initialCount ||
      previousData.initialCount !== this.data.initialCount;
    const optionsChanged =
      initialCountChanged ||
      previousProps.min !== this.props.min ||
      previousProps.max !== this.props.max ||
      previousProps.step !== this.props.step ||
      previousData.min !== this.data.min ||
      previousData.max !== this.data.max ||
      previousData.step !== this.data.step;

    if (optionsChanged) {
      this.setData({
        value: this.normalize(
          initialCountChanged
            ? this.getOption('initialCount')
            : this.data.value
        )
      });
    }
  },

  methods: {
    getOption(name) {
      return this.data[name] === undefined
        ? this.props[name]
        : this.data[name];
    },

    normalize(value) {
      const min = Number(this.getOption('min'));
      const max = Number(this.getOption('max'));
      const step = Number(this.getOption('step'));
      const lower = Number.isFinite(min) ? min : 0;
      const upper = Number.isFinite(max) && max >= lower ? max : lower;
      const numericValue = Number(value);
      const safeValue = Number.isFinite(numericValue) ? numericValue : lower;
      const safeStep = Number.isFinite(step) && step > 0 ? step : 1;
      const steppedValue = lower + Math.round((safeValue - lower) / safeStep) * safeStep;

      return Math.min(upper, Math.max(lower, steppedValue));
    },

    updateValue(nextValue) {
      const value = this.normalize(nextValue);

      if (value === this.data.value) {
        return;
      }

      this.setData({ value });
      const detail = { value };

      if (typeof this.props.onChange === 'function') {
        this.props.onChange(detail);
      }
    },

    increment() {
      this.updateValue(this.data.value + Number(this.getOption('step')));
    },

    decrement() {
      this.updateValue(this.data.value - Number(this.getOption('step')));
    }
  }
});
