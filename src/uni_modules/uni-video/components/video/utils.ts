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
