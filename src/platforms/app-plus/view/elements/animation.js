import UniElement from './element'
import { startAnimation } from 'uni-core/view/mixins/animation'

export default class UniAnimationElement extends UniElement {
  setAttribute (key, value) {
    if (key === 'animation') {
      startAnimation({
        $el: this,
        animation: value
      })
    }
    super.setAttribute(key, value)
  }
}
