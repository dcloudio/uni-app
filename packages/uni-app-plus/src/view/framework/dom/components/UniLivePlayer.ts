import { UniTodoNode } from '../elements/UniTodoNode'

export class UniLivePlayer extends UniTodoNode {
  constructor(id: number, parentNodeId: number, refNodeId: number) {
    super(id, 'uni-live-player', parentNodeId, refNodeId)
  }
}
