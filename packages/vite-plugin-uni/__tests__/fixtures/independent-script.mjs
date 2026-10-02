import { build } from 'vite'

const esbuild = JSON.parse(process.argv[2])
esbuild.include = new RegExp(esbuild.include)
esbuild.exclude = new RegExp(esbuild.exclude)
const id =
  '/project/packages/independent/index.vue?vue&type=script&setup=true&lang.ts&uni_mp_independent_root=packages%2Findependent'

const result = await build({
  configFile: false,
  root: '/project',
  logLevel: 'silent',
  esbuild,
  plugins: [
    {
      name: 'independent-script-fixture',
      resolveId(source) {
        if (source === id) {
          return id
        }
      },
      load(source) {
        if (source === id) {
          return 'export const message = "ok"; export const render = (_ctx: any, _cache: any) => message'
        }
      },
    },
  ],
  build: {
    write: false,
    minify: false,
    rollupOptions: { input: id, preserveEntrySignatures: 'strict' },
  },
})

process.stdout.write(JSON.stringify(result.output[0].exports))
