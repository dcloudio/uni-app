import { UniElement } from '../helpers/UniElement'

// Web Vapor 的 view、text、image 是原生 DOM 节点，仅保留 Uni DOM API 所需的元素类型。
export class UniViewElement extends UniElement {}
export class UniTextElement extends UniElement {}
export class UniImageElement extends UniElement {}
