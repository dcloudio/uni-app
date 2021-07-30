export const EVENT_BACKBUTTON = 'backbutton'
export function backbuttonListener() {
  uni.navigateBack({
    from: 'backbutton',
    success() {}, // 传入空方法，避免返回Promise，因为onBackPress可能导致fail
  } as UniApp.NavigateBackOptions)
}
