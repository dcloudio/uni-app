import { IS_AMAP } from '../../../../helpers/location'

export function createCallout (maps) {
  function onAdd () {
    const div = this.div
    const panes = this.getPanes()
    panes.floatPane.appendChild(div)
  }
  function onRemove () {
    const parentNode = this.div.parentNode
    if (parentNode) {
      parentNode.removeChild(this.div)
    }
  }

  function createAMapText () {
    const option = this.option
    this.Text = new maps.Text({
      text: option.content,
      anchor: 'bottom-center', // 设置文本标记锚点
      offset: new maps.Pixel(0, option.offsetY - 16),
      style: {
        padding: (option.padding || 8) + 'px',
        'line-height': (option.fontSize || 14) + 'px',
        'border-radius': (option.borderRadius || 0) + 'px',
        'border-color': `${option.bgColor || '#fff'} transparent transparent`,
        'background-color': option.bgColor || '#fff',
        'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
        'text-align': 'center',
        'font-size': (option.fontSize || 14) + 'px',
        color: option.color || '#000'
      },
      position: option.position
    })
    // 不通过 addListener 方式绑定事件，为了规避高德地图覆盖物点击触发map点击问题
    this.Text.dom.addEventListener('click', e => {
      handleAMapTextClick(this, e)
    })
    this.Text.dom.addEventListener('touchend', e => {
      handleAMapTextClick(this, e)
    })

    this.Text.setMap(option.map)
  }

  function handleAMapTextClick (self, e) {
    self.callback(e, self.parent)
    e.stopPropagation()
  }

  function removeAMapText () {
    if (this.Text) {
      this.option.map.remove(this.Text)
    }
  }

  class Callout {
    option
    position
    index
    visible
    alwaysVisible
    div
    triangle
    callback
    parent
    Text

    set onclick (callback) {
      this.div.onclick = callback
    }

    get onclick () {
      return this.div.onclick
    }

    constructor (option = {}, callback, parent) {
      this.option = option || {}
      this.visible = this.alwaysVisible = option.display === 'ALWAYS'
      if (IS_AMAP) {
        this.callback = callback
        this.parent = parent
        if (this.visible) {
          this.createAMapText()
        }
      } else {
        const map = option.map
        this.position = option.position
        this.index = 1
        const div = (this.div = document.createElement('div'))
        const divStyle = div.style
        divStyle.position = 'absolute'
        divStyle.whiteSpace = 'nowrap'
        divStyle.transform = 'translateX(-50%) translateY(-100%)'
        divStyle.zIndex = '1'
        divStyle.boxShadow = option.boxShadow || 'none'
        divStyle.display = this.visible ? 'block' : 'none'
        const triangle = (this.triangle = document.createElement('div'))
        triangle.setAttribute(
          'style',
          'position: absolute;white-space: nowrap;border-width: 4px;border-style: solid;border-color: #fff transparent transparent;border-image: initial;font-size: 12px;padding: 0px;background-color: transparent;width: 0px;height: 0px;transform: translate(-50%, 100%);left: 50%;bottom: 0;'
        )
        this.setStyle(option)
        div.appendChild(triangle)
        if (map) {
          this.setMap(map)
        }
      }
    }

    createAMapText = createAMapText
    removeAMapText = removeAMapText

    onAdd = onAdd
    construct = onAdd
    setOption (option) {
      this.option = option
      if (option.display === 'ALWAYS') {
        this.alwaysVisible = this.visible = true
      } else {
        this.alwaysVisible = false
      }
      if (IS_AMAP) {
        if (this.visible) {
          this.createAMapText()
        }
      } else {
        this.setPosition(option.position)
        this.setStyle(option)
      }
    }

    setStyle (option) {
      const div = this.div
      const divStyle = div.style
      div.innerText = option.content || ''
      divStyle.lineHeight = (option.fontSize || 14) + 'px'
      divStyle.fontSize = (option.fontSize || 14) + 'px'
      divStyle.padding = (option.padding || 8) + 'px'
      divStyle.color = option.color || '#000'
      divStyle.borderRadius = (option.borderRadius || 0) + 'px'
      divStyle.backgroundColor = option.bgColor || '#fff'
      divStyle.marginTop = '-' + ((option.top || 0) + 5) + 'px'
      this.triangle.style.borderColor = `${option.bgColor || '#fff'} transparent transparent`
    }

    setPosition (position) {
      this.position = position
      this.draw()
    }

    draw () {
      const overlayProjection = this.getProjection()
      if (!this.position || !this.div || !overlayProjection) {
        return
      }
      const pixel = overlayProjection.fromLatLngToDivPixel(this.position)
      const divStyle = this.div.style
      divStyle.left = pixel.x + 'px'
      divStyle.top = pixel.y + 'px'
    }

    changed () {
      const divStyle = this.div.style
      divStyle.display = this.visible ? 'block' : 'none'
    }

    onRemove = onRemove

    destroy = onRemove
  }
  if (!IS_AMAP) {
    const prototype = Callout.prototype
    const overlay = new (maps.OverlayView || maps.Overlay)()
    for (const key in overlay) {
      if (!(key in prototype)) {
        prototype[key] = overlay[key]
      }
    }
  }

  return Callout
}
