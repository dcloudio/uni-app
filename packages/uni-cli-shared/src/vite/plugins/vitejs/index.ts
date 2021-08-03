import { ModuleNode, ViteDevServer as OrigViteDevServer } from 'vite'

export { ResolveFn } from 'vite'

export interface ViteDevServer extends OrigViteDevServer {
  _globImporters: Record<
    string,
    {
      module: ModuleNode
      importGlobs: {
        base: string
        pattern: string
      }[]
    }
  >
}
