import { UniTodoNode } from '../elements/UniTodoNode'

export class UniLivePusher extends UniTodoNode {
  constructor(id: number, parentNodeId: number, refNodeId: number) {
    super(id, 'uni-live-pusher', parentNodeId, refNodeId)
  }
}
