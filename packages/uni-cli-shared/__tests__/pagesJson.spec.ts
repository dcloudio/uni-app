import path from 'path'
import { checkPagesJson } from '../src/json/utils'
import { generateCodeFrame } from '../src/vite/plugins/vitejs/utils'

describe('pages.json', () => {
  const inputDir = path.resolve(__dirname, './examples/check-pages-json')
  test(`pages check`, () => {
    const source = JSON.stringify(
      {
        pages: [
          {
            path: 'pages/index/index',
          },
          {
            path: 'pages/index/test',
          },
        ],
      },
      null,
      2
    )
    try {
      checkPagesJson(source, inputDir)
    } catch (error: any) {
      expect(error).toMatchSnapshot()
      expect(
        generateCodeFrame(
          source,
          error.offsetStart as number,
          error.offsetEnd as number
        ).replace(/\t/g, ' ')
      ).toMatchSnapshot()
    }
  })
  test(`subPackages check`, () => {
    const source = JSON.stringify(
      {
        subPackages: [
          {
            root: 'pages/API',
            pages: [
              {
                path: 'index/index',
              },
            ],
          },
        ],
      },
      null,
      2
    )
    try {
      checkPagesJson(source, inputDir)
    } catch (error: any) {
      expect(error).toMatchSnapshot()
      expect(
        generateCodeFrame(
          source,
          error.offsetStart as number,
          error.offsetEnd as number
        ).replace(/\t/g, ' ')
      ).toMatchSnapshot()
    }
  })
  test(`subpackages check`, () => {
    const source = JSON.stringify({
      subpackages: [
        {
          root: 'pages/API',
          pages: [
            {
              path: 'index/index',
            },
          ],
        },
      ],
    })
    try {
      checkPagesJson(source, inputDir)
    } catch (error: any) {
      expect(error).toMatchSnapshot()
      expect(
        generateCodeFrame(
          source,
          error.offsetStart as number,
          error.offsetEnd as number
        ).replace(/\t/g, ' ')
      ).toMatchSnapshot()
    }
  })
})
