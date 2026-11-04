const { spawnSync } = require('node:child_process')
const path = require('node:path')

const sharedPath = path.resolve(__dirname, '../dist/uni-shared.cjs.js')
const inputs = {
  object: [{ color: 'red' }, { width: '1px' }, { opacity: 1 }],
  array: [
    [{ color: 'red' }, { width: '1px' }],
    ['color: blue', { opacity: 1 }],
  ],
  string: ['color: red; width: 1px', 'opacity: 1'],
}

if (process.argv[2] === '--worker') {
  const fn = require(sharedPath)[process.argv[3]]
  const values = inputs[process.argv[4]]
  const iterations = Number(process.argv[5])
  let result
  for (let i = 0; i < 1000000; i++) {
    result = fn(values[i % values.length])
  }
  const start = performance.now()
  for (let i = 0; i < iterations; i++) {
    result = fn(values[i % values.length])
  }
  console.log(JSON.stringify({ elapsed: performance.now() - start, result }))
} else {
  // 每个样本使用独立进程，避免不同函数和输入相互影响 JIT 优化。
  for (const input of Object.keys(inputs)) {
    const iterations = input === 'object' ? 10000000 : 500000
    const samples = { normalizeStyle: [], normalizeVaporStyle: [] }
    for (let round = 0; round < 5; round++) {
      for (const name of Object.keys(samples)) {
        const child = spawnSync(
          process.execPath,
          [__filename, '--worker', name, input, String(iterations)],
          { encoding: 'utf8' }
        )
        if (child.status !== 0) {
          throw new Error(child.stderr || child.error || 'benchmark failed')
        }
        samples[name].push(JSON.parse(child.stdout).elapsed)
      }
    }
    const median = (values) => values.sort((a, b) => a - b)[2]
    const oldTime = median(samples.normalizeStyle)
    const vaporTime = median(samples.normalizeVaporStyle)
    console.log(
      `${input}: old=${oldTime.toFixed(1)}ms vapor=${vaporTime.toFixed(
        1
      )}ms ratio=${(vaporTime / oldTime).toFixed(3)}`
    )
  }
}
