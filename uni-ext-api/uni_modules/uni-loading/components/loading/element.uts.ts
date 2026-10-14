// #ifdef WEB
// vapor 临时处理
class UniVueElement extends HTMLElement { }
export class UniLoadingElement extends UniVueElement { }
// #endif

// #ifdef MP
// vapor 临时处理
class UniViewElementImpl extends UniElement { }
export class UniLoadingElement extends UniViewElementImpl { }
// #endif
