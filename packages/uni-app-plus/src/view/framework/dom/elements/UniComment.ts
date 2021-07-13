import { UniNode } from './UniNode'

export class UniComment extends UniNode {
  constructor(id: number, parentNodeId: number) {
    super(id, '#comment', parentNodeId, document.createComment(''))
  }
}
