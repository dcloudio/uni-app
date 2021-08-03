declare module 'postcss-load-config' {
  import { ProcessOptions, Plugin } from 'postcss'
  function load(
    inline: any,
    root: string
  ): Promise<{
    options: ProcessOptions
    plugins: Plugin[]
  }>
  export = load
}

declare module 'postcss-import' {
  import { Plugin } from 'postcss'
  const plugin: (options: {
    resolve: (
      id: string,
      basedir: string,
      importOptions: any
    ) => string | string[] | Promise<string | string[]>
  }) => Plugin
  export = plugin
}

declare module 'postcss-modules' {
  import { Plugin } from 'postcss'
  const plugin: (options: any) => Plugin
  export = plugin
}
