import { Coordinate } from './native-types';

export function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}
export function finite(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback;
}
export function validCoordinate(point: Coordinate): boolean {
  return point != null && Number.isFinite(point.latitude) && Number.isFinite(point.longitude) &&
    point.latitude >= -90 && point.latitude <= 90 && point.longitude >= -180 && point.longitude <= 180;
}
export function normalizeAngle(value: number): number {
  return ((value % 360) + 360) % 360;
}
export function longitudeDelta(from: number, to: number): number {
  return ((to - from + 540) % 360) - 180;
}
export function angleDelta(from: number, to: number): number {
  return ((to - from + 540) % 360) - 180;
}
export function interpolateCoordinate(a: Coordinate, b: Coordinate, fraction: number): Coordinate {
  const longitude = a.longitude + longitudeDelta(a.longitude, b.longitude) * fraction;
  return { latitude: a.latitude + (b.latitude - a.latitude) * fraction,
    longitude: ((longitude + 540) % 360) - 180 };
}
export function distanceMeters(a: Coordinate, b: Coordinate): number {
  const radians = Math.PI / 180;
  const dLat = (b.latitude - a.latitude) * radians;
  const dLng = longitudeDelta(a.longitude, b.longitude) * radians;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.latitude * radians) * Math.cos(b.latitude * radians) *
    Math.sin(dLng / 2) ** 2;
  return 12742000 * Math.asin(Math.sqrt(clamp(h, 0, 1)));
}
export function bearing(a: Coordinate, b: Coordinate): number {
  const r = Math.PI / 180;
  const dLng = longitudeDelta(a.longitude, b.longitude) * r;
  const y = Math.sin(dLng) * Math.cos(b.latitude * r);
  const x = Math.cos(a.latitude * r) * Math.sin(b.latitude * r) -
    Math.sin(a.latitude * r) * Math.cos(b.latitude * r) * Math.cos(dLng);
  return normalizeAngle(Math.atan2(y, x) / r);
}

// Public map colors use CSS #RRGGBBAA; the SDK uses packed ARGB integers.
export function colorARGB(input: string | null | undefined, fallback: number): number {
  if (input == null) return fallback;
  const color = input.trim();
  if (/^#[0-9a-fA-F]{3}$/.test(color)) {
    const r = parseInt(color.substring(1, 2), 16) * 17;
    const g = parseInt(color.substring(2, 3), 16) * 17;
    const b = parseInt(color.substring(3, 4), 16) * 17;
    return (0xFF000000 | (r << 16) | (g << 8) | b) >>> 0;
  }
  if (/^#[0-9a-fA-F]{6}$/.test(color)) return (0xFF000000 | parseInt(color.substring(1), 16)) >>> 0;
  if (/^#[0-9a-fA-F]{8}$/.test(color)) {
    return ((parseInt(color.substring(7, 9), 16) << 24) | parseInt(color.substring(1, 7), 16)) >>> 0;
  }
  if (color.toLowerCase() === 'transparent') return 0;
  return fallback;
}
// ArkUI string colors use #AARRGGBB; convert public #RRGGBBAA once at the edge.
export function uiColor(input: string | null | undefined, fallback: string): string {
  if (input == null || input.length === 0) return fallback;
  if (/^#[0-9a-fA-F]{8}$/.test(input)) return '#' + input.substring(7, 9) + input.substring(1, 7);
  return input;
}

export class PathSample {
  point: Coordinate;
  direction: number;
  constructor(point: Coordinate, direction: number) { this.point = point; this.direction = direction; }
}
export class DistancePath {
  private points: Coordinate[] = [];
  private lengths: number[] = [];
  private total: number = 0;
  constructor(points: Coordinate[]) {
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      if (!validCoordinate(point)) throw new Error('Invalid path coordinate');
      if (this.points.length === 0 || distanceMeters(this.points[this.points.length - 1], point) > 0.000001) {
        if (this.points.length > 0) this.total += distanceMeters(this.points[this.points.length - 1], point);
        this.points.push(point);
        this.lengths.push(this.total);
      }
    }
    if (this.points.length === 0) throw new Error('Path must contain a coordinate');
  }
  sample(fraction: number): PathSample {
    if (this.points.length === 1) return new PathSample(this.points[0], 0);
    const distance = this.total * clamp(fraction, 0, 1);
    let index = 1;
    while (index < this.lengths.length - 1 && this.lengths[index] < distance) index++;
    const start = this.points[index - 1];
    const end = this.points[index];
    const portion = (distance - this.lengths[index - 1]) / (this.lengths[index] - this.lengths[index - 1]);
    return new PathSample(interpolateCoordinate(start, end, portion), bearing(start, end));
  }
}
