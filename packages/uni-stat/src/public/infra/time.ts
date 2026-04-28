/**
 * 时间相关基础设施。
 *
 * 设计要点：
 *   1. 单元统一：`Sec` 后缀代表秒级；`Ms` 后缀代表毫秒级。任何函数签名都禁止"参数与
 *      返回值单元不一致"，避免私有版长期存在的"秒/毫秒混用"问题。
 *   2. 全部走 `Date.now()`，不走 `new Date().getTime()`，便于 jest fake timers / mock。
 */

/**
 * 当前毫秒级时间戳。用于上报 jitter / 节流定时器等内部计算。
 */
export function nowMs(): number {
  return Date.now()
}

/**
 * 当前秒级时间戳。用于 statData 上行字段（`t / fvts / lvts / sst` 等）。
 */
export function nowSec(): number {
  return Math.floor(Date.now() / 1000)
}

/**
 * 计算从某个秒级时间戳到当前的「秒级耗时」。
 *
 * @param fromSec 起始秒级时间戳（必须与 `nowSec()` 同单元）。
 * @returns 非负的整秒数；若 `fromSec` 在未来则返回 0，避免出现负值污染上报字段。
 */
export function elapsedSec(fromSec: number): number {
  const diff = nowSec() - fromSec
  return diff > 0 ? diff : 0
}

/**
 * 将「离开页 / 后台前当前页」停留时长（秒）钳到与私有版 `get_residence_time` 一致：
 * 差值小于 1 秒时按 1 秒上报（`residenceTime &lt; 1 ? 1 : residenceTime`）。
 *
 * @param deltaSec 非负停留秒数优先；传入负数时视为 0 再钳制。
 */
export function clampUrlrefStaySec(deltaSec: number): number {
  const d = deltaSec > 0 ? deltaSec : 0
  return d < 1 ? 1 : d
}
