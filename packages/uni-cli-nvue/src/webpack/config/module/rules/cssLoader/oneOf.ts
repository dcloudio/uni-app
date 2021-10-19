import path from 'path'
import { resolveLoader } from '../../../../loader'

const styleLoader = { loader: resolveLoader('style') }
const preprocessLoader = {
  loader: resolveLoader('preprocess'),
  options: {
    type: ['js'],
  },
}
const postcssLoader = {
  loader: require.resolve('postcss-loader'),
  options: {
    sourceMap: false,
    postcssOptions: {
      config: false,
      parser: require('postcss-comment'),
      plugins: [
        require('postcss-import')({
          resolve(id: string) {
            if (id.startsWith('~@/')) {
              return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3))
            } else if (id.startsWith('@/')) {
              return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2))
            } else if (id.startsWith('/') && !id.startsWith('//')) {
              return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1))
            }
            return id
          },
        }),
      ],
    },
  },
}
export function createOneOf(preLoader?: {
  loader: string
  options?: Record<string, any>
}) {
  const use = [styleLoader, preprocessLoader]
  use.push(postcssLoader)
  if (preLoader) {
    use.push(preLoader)
  }
  return [
    {
      resourceQuery: /\?vue/,
      use,
    },
    {
      use,
    },
  ]
}
