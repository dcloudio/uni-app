/**
 * 入口页领域 barrel：iey / ppiey 计算与状态。
 *
 * 统一通过 `domain/index` 再次 re-export，所以下游应优先 `import { ... } from 'domain'`。
 */
export {
  __resetState,
  clearEntry,
  getEntryRoute,
  isEntry,
  isEntryForIey,
  markEntryDeparted,
  markEntryPage,
} from './entryPage'
