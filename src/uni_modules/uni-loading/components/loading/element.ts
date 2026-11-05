// #ifdef WEB
// #ifdef VUE3-VAPOR
// Web Vapor 与 Form、Progress 保持一致，使用基础 View 宿主和简单的 Element 声明。
// TODO：组件标记与专有 Element 身份后续统一适配，不在 Loading 中单独初始化。
export class UniLoadingElement extends UniViewElementImpl { }
// #endif

// #ifndef VUE3-VAPOR
// vapor 临时处理
class UniVueElement extends HTMLElement { }
export class UniLoadingElement extends UniVueElement { }
// #endif
// #endif

// #ifdef MP
// vapor 临时处理
class UniViewElementImpl extends UniElement { }
export class UniLoadingElement extends UniViewElementImpl { }
// #endif
