export interface SourceMapInputLike {
  mappings: string
}

export interface PluginContextLike {
  resolve(source: string, importer?: string, options?: any): Promise<any>
  emitFile(file: {
    type: 'asset'
    fileName: string
    source: string | Uint8Array
  }): any
  error(error: any): never
  warn(warning: any): void
  addWatchFile(id: string): void
}

export type TransformPluginContextLike = PluginContextLike
export type SourceMapInput = SourceMapInputLike
