export function observeProps(props) {
  if (!props) {
    return;
  }

  Object.keys(props).forEach(key => {
    let prop = props[key];
    if (prop === null || !prop.type) {
      prop = { type: prop };
    }

    let { observer } = prop;
    prop.observer = function() {
      if (observer) {
        if (typeof observer === 'string') {
          observer = this[observer];
        }
        observer.apply(this, arguments);
      }
      this.setData();
    };

    props[key] = prop;
  });
}
