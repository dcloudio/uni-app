import { UniCSSStyleDeclaration } from './UniCSSStyleDeclaration'

export class UniElement {
  constructor(
    public id: string,
    public style: UniCSSStyleDeclaration = new UniCSSStyleDeclaration()
  ) {}
}
