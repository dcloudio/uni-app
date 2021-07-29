import { watch } from 'vue'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { animation } from '@dcloudio/uni-components'
import { UniElement } from './UniElement'

interface AnimationProps {
  animation: any
}
export class UniAnimationElement<T extends object> extends UniElement<
  T & AnimationProps
> {
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
  init(nodeJson: Partial<UniNodeJSON>) {
    super.init(nodeJson)
    const item = animation.watch.animation
    watch(
      () => this.$props.animation,
      () => {
        this.call(item.handler)
      },
      { deep: item.deep }
    )
    this.call(animation.mounted)
  }
}
