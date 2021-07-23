import { UniTodoNode } from '../elements/UniTodoNode'

export class UniOpenData extends UniTodoNode {
  constructor(id: number, parentNodeId: number, refNodeId: number) {
    super(id, 'uni-open-data', parentNodeId, refNodeId)
  }
}
