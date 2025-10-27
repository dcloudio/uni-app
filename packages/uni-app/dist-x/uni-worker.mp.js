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
              worker.onMessage((e) => {
                  this.onMessage(e);
              });
          }
      }
      entry() { }
      onMessage(message) { }
      postMessage(message, options = null) {
          {
              worker.postMessage(message);
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
