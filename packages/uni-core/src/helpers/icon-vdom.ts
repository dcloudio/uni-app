import { createVNode } from 'vue'

export function createSvgIcon(
  path: string,
  color: string = '#000',
  size: number = 27,
  stroke = false
) {
  const pathProps: Record<string, string | number> = {
    d: path,
    fill: stroke ? 'none' : color,
  }
  if (stroke) {
    pathProps.stroke = color
    pathProps.strokeWidth = 2
    pathProps.strokeLinecap = 'round'
  }

  return createVNode(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 32 32',
    },
    [
      createVNode('path', pathProps, null, 8 /* PROPS */, [
        'd',
        'fill',
        'stroke',
        'strokeWidth',
        'strokeLinecap',
      ]),
    ],
    8 /* PROPS */,
    ['width', 'height']
  )
}
