/** 访问字段领域 barrel：fvts / lvts / tvc 状态机（修复缺陷 #5）。 */
export type { VisitSnapshot } from './firstVisit'
export {
  __resetState,
  buildVisitFields,
  commitVisitOnAck,
  getCommitted,
  loadVisitSnapshot,
  rollbackPendingVisit,
} from './firstVisit'
