import { UniNode } from './UniNode'

export class UniComment extends UniNode {
  constructor(id: number) {
    super(id, '#comment')
    this.$ = document.createComment('')
  }
}
