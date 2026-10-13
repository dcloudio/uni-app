import { createVNode } from 'vue'

export function createSvgIcon(
  path: string,
  color: string = '#000',
  size: number = 27
) {
  return createVNode(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 32 32',
    },
    [
      createVNode(
        'path',
        {
          d: path,
          fill: color,
        },
        null,
        8 /* PROPS */,
        ['d', 'fill']
      ),
    ],
    8 /* PROPS */,
    ['width', 'height']
  )
}
