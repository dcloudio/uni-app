function ensurePatchFinalNewline(patch) {
  return patch.endsWith('\n') ? patch : `${patch}\n`
}

function handleReleaseError(err) {
  console.error(err)
  process.exitCode = 1
}

module.exports = {
  ensurePatchFinalNewline,
  handleReleaseError,
}
