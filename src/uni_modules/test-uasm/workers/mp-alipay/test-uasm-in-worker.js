import createModule from "./test-uasm.js"

let libTestUasm = null;

const serializeError = error => ({
  name: error && typeof error.name === "string" ? error.name : "Error",
  message: error && typeof error.message === "string" ? error.message : String(error),
  stack: error && typeof error.stack === "string" ? error.stack : undefined
});

const handleRequest = request => {
  const payload = request.payload;

  switch (request.type) {
    case "add":
      return libTestUasm.add(payload.a, payload.b);
    case "concat":
      return libTestUasm.concat(payload.a, payload.b);
    default:
      throw new Error(`Unknown libTestUasm action: ${request.type}`);
  }
};

const respond = (id, result) => {
  worker.postMessage({
    type: "response",
    id,
    result
  });
};

const respondWithError = (id, error) => {
  worker.postMessage({
    type: "response",
    id,
    error: serializeError(error)
  });
};

console.log("[TestUasmWorkerTask] 构造器初始化")
createModule().then(module => {
  libTestUasm = module;
  worker.postMessage({
    type: "ready"
  });
}).catch(error => {
  worker.postMessage({
    type: "fatal",
    error: serializeError(error)
  });
});
worker.onMessage(function(message) {
  console.log('[TestUasmWorkerTask] 收到主线程消息: ', message)
  try {
    respond(message.id, handleRequest(message));
  } catch (error) {
    respondWithError(message.id, error);
  }
});
console.log("[TestUasmWorkerTask] 启动完成，等待主线程消息")
