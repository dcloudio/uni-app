import { UniNode } from '../elements/UniNode'

export class UniTodoNode extends UniNode {
  constructor(
    id: number,
    tag: string,
    parentNodeId: number,
    refNodeId: number
  ) {
    super(id, tag, parentNodeId)
    this.insert(parentNodeId, refNodeId)
  }
}
