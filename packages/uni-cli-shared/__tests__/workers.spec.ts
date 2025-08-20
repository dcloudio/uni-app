import path from 'path'
import { initWorkers } from '../src/workers'

describe('workers', () => {
  test('initWorkers', () => {
    const workers = initWorkers(
      ['custom-workers', 'uni_modules/test-workers/workers'],
      path.join(__dirname, 'examples', 'workers')
    )
    expect(workers).toEqual({
      'custom-workers/request/index.uts': 'RequestTask',
      'custom-workers/response/index.uts': 'ResponseTask',
      'uni_modules/test-workers/workers/request/index.uts': 'RequestTask',
      'uni_modules/test-workers/workers/response/index.uts': 'ResponseTask',
    })
  })
})
