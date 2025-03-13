import { CanvasContext } from '../../src/service/context/canvas'

describe('CanvasContext', () => {
  it('should be defined', () => {
    expect(CanvasContext).toBeDefined()
  })

  it('should be able to set font', () => {
    const canvas = new CanvasContext('canvas', 1)
    canvas.font = 'normal 20px Arial'
    expect(canvas.actions).toEqual([
      { data: ['normal normal 20px Arial'], method: 'setFont' },
    ])

    canvas.actions = []

    canvas.font = 'bold 20.5px Arial'
    expect(canvas.actions).toEqual([
      { data: ['bold normal 20.5px Arial'], method: 'setFont' },
    ])
    canvas.actions = []

    canvas.font = 'lighter 20.5px Arial'
    expect(canvas.actions).toEqual([
      { data: ['lighter normal 20.5px Arial'], method: 'setFont' },
    ])
    canvas.actions = []

    // fontweight=500
    canvas.font = '500 20.5px Arial'
    expect(canvas.actions).toEqual([
      { data: ['500 normal 20.5px Arial'], method: 'setFont' },
    ])
    canvas.actions = []
  })
})
