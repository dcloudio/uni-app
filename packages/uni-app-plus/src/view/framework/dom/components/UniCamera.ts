import { UniTodoNode } from '../elements/UniTodoNode'

export class UniCamera extends UniTodoNode {
  constructor(id: number, parentNodeId: number, refNodeId: number) {
    super(id, 'uni-camera', parentNodeId, refNodeId)
  }
}
