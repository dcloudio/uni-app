export interface LaunchOptions {
  path: string
  query: Record<string, any>
  scene: number
  referrerInfo: { appId: string; extraData: Record<string, any> }
}

export function createLaunchOptions() {
  return {
    path: '',
    query: {},
    scene: 1001,
    referrerInfo: {
      appId: '',
      extraData: {},
    },
  }
}
