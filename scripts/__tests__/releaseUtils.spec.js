const {
  ensurePatchFinalNewline,
  handleReleaseError,
} = require('../releaseUtils')

describe('release utils', () => {
  const originalExitCode = process.exitCode

  afterEach(() => {
    process.exitCode = originalExitCode
    jest.restoreAllMocks()
  })

  test('restores the final newline stripped from a git patch', () => {
    expect(ensurePatchFinalNewline('diff --git a/file b/file')).toBe(
      'diff --git a/file b/file\n'
    )
  })

  test('does not add a second final newline', () => {
    expect(ensurePatchFinalNewline('diff --git a/file b/file\n')).toBe(
      'diff --git a/file b/file\n'
    )
  })

  test('reports fatal release errors through the process exit code', () => {
    const error = new Error('release failed')
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    handleReleaseError(error)

    expect(consoleError).toHaveBeenCalledWith(error)
    expect(process.exitCode).toBe(1)
  })
})
