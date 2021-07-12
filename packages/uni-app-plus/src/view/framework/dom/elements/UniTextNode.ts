import { UniNode } from './UniNode'

export class UniTextNode extends UniNode {
  constructor(id: number) {
    super(id, '#text', document.createTextNode(''))
  }
}
