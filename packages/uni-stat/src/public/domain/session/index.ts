/** 会话领域 barrel：状态机 + ensureSession + cst 判定。 */
export type {
  EnsureContext,
  EnsureResult,
  SessionConfig,
  SessionSnapshot,
  Trigger,
} from './machine'
export {
  __resetState,
  configure,
  consumePrevId,
  ensureSession,
  getSnapshot,
  markBackground,
  nextSeq,
  touch,
} from './machine'
