class UpdateManager {
  onCheckForUpdate () {

  }

  onUpdateReady () {

  }

  onUpdateFailed () {

  }

  applyUpdate () {

  }
}

let updateManager

export function getUpdateManager () {
  return updateManager || (updateManager = new UpdateManager())
}
