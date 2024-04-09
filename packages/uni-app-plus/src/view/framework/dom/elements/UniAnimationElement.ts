import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { animation } from '@dcloudio/uni-components'
import { UniElement } from './UniElement'

interface AnimationProps {
  animation: any
}
export class UniAnimationElement<T extends object> extends UniElement<
  T & AnimationProps
> {
  private $animate?: boolean
  constructor(
    id: number,
    element: Element,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>,
    propNames: string[] = []
  ) {
    super(id, element, parentNodeId, refNodeId, nodeJson, [
      ...animation.props,
      ...propNames,
    ])
  }
  call(fn: () => void) {
    const context = {
      animation: this.$props.animation,
      $el: this.$,
    }
    fn.call(context)
  }
  setAttribute(name: string, value: unknown) {
    if (name === 'animation') {
      this.$animate = true
    }
    return super.setAttribute(name, value)
  }
  update(isMounted: boolean = false) {
    if (!this.$animate) {
      return
    }
    if (isMounted) {
      return this.call(animation.mounted)
    }
    if (this.$animate) {
      this.$animate = false
      this.call(animation.watch.animation.handler)
    }
  }
}
