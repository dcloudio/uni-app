import { addSafeAreaInsets } from './enhance-system-info';

export default {
  returnValue: function (result) {
    addSafeAreaInsets(result)

    Object.assign(result, {
      windowTop: 0,
      windowBottom: 0,
    })
  }
}
