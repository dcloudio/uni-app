class UpdateManager {
  constructor () {

  }

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
