Component({
  properties: {
    initialCount: {
      type: Number,
      value: 0,
      observer(value) {
        this.syncValue(value);
      }
    },
    step: {
      type: Number,
      value: 1,
      observer() {
        this.syncValue(this.data.value);
      }
    },
    min: {
      type: Number,
      value: 0,
      observer() {
        this.syncValue(this.data.value);
      }
    },
    max: {
      type: Number,
      value: 99,
      observer() {
        this.syncValue(this.data.value);
      }
    }
  },

  data: {
    value: 0
  },

  lifetimes: {
    attached() {
      this.syncValue(this.data.initialCount);
    }
  },

  methods: {
    normalize(value) {
      const min = Number(this.data.min);
      const max = Number(this.data.max);
      const step = Number(this.data.step);
      const lower = Number.isFinite(min) ? min : 0;
      const upper = Number.isFinite(max) && max >= lower ? max : lower;
      const numericValue = Number(value);
      const safeValue = Number.isFinite(numericValue) ? numericValue : lower;
      const safeStep = Number.isFinite(step) && step > 0 ? step : 1;
      const steppedValue = lower + Math.round((safeValue - lower) / safeStep) * safeStep;

      return Math.min(upper, Math.max(lower, steppedValue));
    },

    syncValue(nextValue) {
      const value = this.normalize(nextValue);

      if (value !== this.data.value) {
        this.setData({ value });
      }
    },

    updateValue(nextValue) {
      const value = this.normalize(nextValue);

      if (value === this.data.value) {
        return;
      }

      this.setData({ value });
      this.triggerEvent('change', { value });
    },

    increment() {
      this.updateValue(this.data.value + Number(this.data.step));
    },

    decrement() {
      this.updateValue(this.data.value - Number(this.data.step));
    }
  }
});
