(function (exports, uniShared) {
  'raw js';
    'use strict';

  const realGlobal = uniShared.getGlobal();
  realGlobal.UTS = uniShared.UTS;
  realGlobal.UTSJSONObject = uniShared.UTSJSONObject;
  realGlobal.UTSValueIterable = uniShared.UTSValueIterable;
  realGlobal.UniError = uniShared.UniError;
  class WorkerTaskImpl {
      constructor() {
          {
              self.onmessage = (e) => {
                  this.onMessage(e.data);
              };
          }
      }
      entry() { }
      onMessage(message) { }
      postMessage(message, options = null) {
          {
              let _options = undefined;
              if ((options === null || options === void 0 ? void 0 : options.transfer) && options.transfer.length > 0) {
                  _options = {
                      transfer: options.transfer,
                  };
              }
              self.postMessage(message, _options);
          }
      }
  }
  // @ts-expect-error
  globalThis.WorkerTaskImpl = WorkerTaskImpl;

  Object.defineProperty(exports, "UTS", {
    enumerable: true,
    get: function () { return uniShared.UTS; }
  });
  Object.defineProperty(exports, "UTSJSONObject", {
    enumerable: true,
    get: function () { return uniShared.UTSJSONObject; }
  });
  Object.defineProperty(exports, "UTSValueIterable", {
    enumerable: true,
    get: function () { return uniShared.UTSValueIterable; }
  });
  Object.defineProperty(exports, "UniError", {
    enumerable: true,
    get: function () { return uniShared.UniError; }
  });
  exports.WorkerTaskImpl = WorkerTaskImpl;

  return exports;

})({}, uniShared);
