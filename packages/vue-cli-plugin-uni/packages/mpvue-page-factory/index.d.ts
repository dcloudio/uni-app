//临时方案
declare function Page(page: object): void;

declare module 'mpvue-page-factory' {
  function factory (pageComponent: Vue): any
  export default factory;
}