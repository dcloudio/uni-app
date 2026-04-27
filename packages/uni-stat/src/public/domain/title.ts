/**
 * 导航栏标题内存状态。
 *
 * 私有版 `Stat._navigationBarTitle = { page, config, report }` 三段被分散维护：
 *   - `page` 由 `addInterceptor('setNavigationBarTitle')` 写入；
 *   - `config` 由 `get_page_name(routepath)` 在 `request()` 中写入；
 *   - `report` 由 `sendEvent('title', value)` 写入。
 *
 * 公有版集中到 `domain/title.ts`，对外仅暴露 setter / getter / clearForRoute；
 * statData 拼装时通过 `getCurrentTitle()` 一次性读出，**不再**和拦截器/路由耦合。
 */

interface TitleState {
  /** 当前页 setNavigationBarTitle 设置的标题；切页清空。 */
  page: string
  /** pages.json 中配置的 title；由 collector 在 onPageShow 时写入。 */
  config: string
  /** 业务通过 `uni.report('title', value)` 自定义上报标题。 */
  report: string
}

const state: TitleState = { page: '', config: '', report: '' }

/**
 * 由拦截器在 `setNavigationBarTitle.invoke` 时调用。
 *
 * @param title 用户设置的标题；非字符串视为空串，避免污染上行 ttn。
 */
export function setPageTitle(title: unknown): void {
  state.page = typeof title === 'string' ? title : ''
}

/**
 * 由 collector / runtime 在 onPageShow 时写入 pages.json 配置标题。
 */
export function setConfigTitle(title: unknown): void {
  state.config = typeof title === 'string' ? title : ''
}

/**
 * 业务通过 `uni.report('title', value)` 写入；与私有版 `sendEvent('title')` 行为一致。
 */
export function setReportTitle(title: unknown): void {
  state.report = typeof title === 'string' ? title : ''
}

/**
 * 取当前 title 三元组的浅拷贝；statData.builder 在拼装 ttn/ttpj/ttc 时调用。
 */
export function getCurrentTitle(): { ttn: string; ttpj: string; ttc: string } {
  return { ttn: state.page, ttpj: state.config, ttc: state.report }
}

/**
 * 切换页面时清掉 page 维度的 title（config / report 由各自 setter 控制）。
 */
export function clearPageTitle(): void {
  state.page = ''
}

/** 仅供测试。 */
export function __resetTitle(): void {
  state.page = ''
  state.config = ''
  state.report = ''
}
