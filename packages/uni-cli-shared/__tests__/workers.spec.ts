import path from 'path'
import { initWorkers } from '../src/workers'

describe('workers', () => {
  test('initWorkers', () => {
    const workers = initWorkers('workers', path.join(__dirname, 'examples'))
    expect(workers).toEqual({
      'workers/request/index.uts': 'RequestTask',
      'workers/response/index.uts': 'ResponseTask',
    })
  })
})
