export const EVENT_BACKBUTTON = 'backbutton'
export function backbuttonListener() {
  uni
    .navigateBack({
      from: 'backbutton',
    } as UniApp.NavigateBackOptions)
    .catch(() => {})
}
