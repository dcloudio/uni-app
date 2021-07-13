import { UniNode } from './UniNode'

export class UniTextNode extends UniNode {
  constructor(id: number, parentNodeId: number) {
    super(id, '#text', parentNodeId, document.createTextNode(''))
  }
}
