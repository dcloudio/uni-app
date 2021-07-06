import { UniNode } from './UniNode'

export class UniText extends UniNode {
  constructor(id: number) {
    super(id, '#text')
    this.$ = document.createTextNode('')
  }
}
