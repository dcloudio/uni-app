const WORKER_URL = 'workers/mp-alipay/test-uasm-in-worker.js'

const pending = new Map()

let worker = null
let workerReady = null
let workerError = null
let readyResolve = null
let readyReject = null
let requestId = 0

const createError = (error) => {
  if (error instanceof Error) {
    return error
  }

  const message = typeof error === 'string'
    ? error
    : (error && typeof error.message === 'string' ? error.message : 'Unknown testUasm worker error')

  const runtimeError = new Error(message)
  if (error && typeof error === 'object') {
    if (typeof error.name === 'string') {
      runtimeError.name = error.name
    }
    if (typeof error.stack === 'string') {
      runtimeError.stack = error.stack
    }
  }
  return runtimeError
}

const rejectAll = (error) => {
  for (const operation of pending.values()) {
    operation.reject(error)
  }
  pending.clear()
}

const failWorker = (error) => {
  workerError = createError(error)
  if (readyReject) {
    readyReject(workerError)
    readyResolve = null
    readyReject = null
  }
  rejectAll(workerError)
}

const handleWorkerMessage = (data) => {
  if (data.type === 'ready') {
    if (readyResolve) {
      readyResolve(data)
      readyResolve = null
      readyReject = null
    }
    return
  }

  if (data.type === 'fatal') {
    failWorker(data.error)
    return
  }

  if (data.type !== 'response') {
    return
  }

  const operation = pending.get(data.id)
  if (!operation) {
    return
  }

  pending.delete(data.id)
  if (data.error) {
    operation.reject(createError(data.error))
  } else {
    operation.resolve(data.result)
  }
}

const handleWorkerError = ({message}) => {
  failWorker({
    message
  })
}

const ensureWorkerReady = () => {
  if (workerError) {
    return Promise.reject(workerError)
  }

  if (workerReady) {
    return workerReady
  }

  workerReady = new Promise((resolve, reject) => {
    readyResolve = resolve
    readyReject = reject
  })

  try {
    worker = my.createWorker(WORKER_URL, {
      useExperimentalWorker: true // iOS下需开启实验 worker
    })
    worker.onMessage((msg) => {
      handleWorkerMessage(msg)
    })
  } catch (error) {
    failWorker(error)
  }

  return workerReady
}

const request = async (type, payload = Object.create(null)) => {
  await ensureWorkerReady()

  return new Promise((resolve, reject) => {
    const id = ++requestId
    pending.set(id, {
      resolve,
      reject
    })
    worker.postMessage({
      id,
      type,
      payload
    })
  })
}

const add = (a, b) => {
  return request('add', {
    a,
    b
  })
}

const concat = (a, b) => {
  return request('concat', {
    a,
    b
  })
}

const testUasm = {
  add,
  concat
}

async function createTestUasmModule() {
  await ensureWorkerReady()
  return testUasm
}

export {
  add,
  concat
}

export default createTestUasmModule
