import { UniTodoNode } from '../elements/UniTodoNode'

export class UniOfficialAccount extends UniTodoNode {
  constructor(id: number, parentNodeId: number, refNodeId: number) {
    super(id, 'uni-official-account', parentNodeId, refNodeId)
  }
}
