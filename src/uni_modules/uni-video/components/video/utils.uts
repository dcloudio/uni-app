export function formatTime(val: number): string {
  val = val > 0 && val < Infinity ? val : 0;
  const h = Math.floor(val / 3600);
  const m = Math.floor((val % 3600) / 60);
  const s = Math.floor((val % 3600) % 60);
  const hStr = (h < 10 ? '0' : '') + h;
  const mStr = (m < 10 ? '0' : '') + m;
  const sStr = (s < 10 ? '0' : '') + s;
  let str = mStr + ':' + sStr;
  if (hStr !== '00') {
    str = hStr + ':' + str;
  }
  return str;
}

export function formatPlaybackRate(rate: number): number {
  // NOTE 鸿蒙仅支持 0.75，1.0，1.25，1.75，2.0
  // #ifdef APP-HARMONY
  const validValues = [0.75, 1.0, 1.25, 1.75, 2.0];
  // #endif
  // #ifndef APP-HARMONY
  const validValues = [0.5, 0.8, 1.0, 1.25, 1.5];
  // #endif
  let closest = validValues[0];
  let closestDiff = Math.abs(rate - closest);

  // 遍历有效值数组，找到与传入值最接近的有效值
  for (let i = 1; i < validValues.length; i++) {
    let diff = Math.abs(rate - validValues[i]);
    if (diff < closestDiff) {
      closest = validValues[i];
      closestDiff = diff;
    }
  }
  return closest;
}
