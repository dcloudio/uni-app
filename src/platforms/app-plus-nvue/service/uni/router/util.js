export const ANI_SHOW = 'pop-in'
export const ANI_DURATION = 300

let id = 0

export function getId () {
  return id++
}

export function parseWebviewStyle (path) {
  return {
    titleNView: {
      autoBackButton: true,
      titleText: 'titleText'
    },
    uniNView: {
      path
    }
  }
}
