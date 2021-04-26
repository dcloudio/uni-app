import os from 'os'
import path from 'path'
import slash from 'slash'
const isWindows = os.platform() === 'win32'
export function normalizePath(id: string): string {
  return path.posix.normalize(isWindows ? slash(id) : id)
}
