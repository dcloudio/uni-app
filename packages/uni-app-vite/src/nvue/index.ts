// import { rollup, watch, RollupBuild, RollupOutput, RollupWatcher } from 'rollup'

// let nvueCallCounts = 0

// const nvueBuilds: RollupBuild[] = []

// interface NVueBuildOptions {
//   watch?: boolean
// }

// export async function build(
//   options: NVueBuildOptions
// ): Promise<RollupOutput | RollupOutput[] | RollupWatcher> {
//   nvueCallCounts++
//   try {
//     return await doBuild()
//   } finally {
//     nvueCallCounts--
//     if (nvueCallCounts <= 0) {
//       await Promise.all(nvueBuilds.map((bundle) => bundle.close()))
//       nvueBuilds.length = 0
//     }
//   }
// }

// async function doBuild() {}
