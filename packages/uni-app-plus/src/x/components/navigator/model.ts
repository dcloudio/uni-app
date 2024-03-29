export class UniNavigatorElement extends UniElementImpl {
  constructor(data: INodeData, pageNode: PageNode) {
    // @ts-ignore
    super(data, pageNode)
  }

  override getAnyAttribute(key: string): string {
    const value = this._getAttribute(key)
    if (value != null) {
      return value
    }
    return super.getAnyAttribute(key)
  }

  _getAttribute = (key: string): string | null => {
    return null
  }
}
export const navigatorProps = {
  url: {
    type: String,
    default: '',
  },
  openType: {
    type: String,
    default: 'navigate',
  },
  delta: {
    type: Number,
    default: 1,
  },
  animationType: {
    type: String,
    default: '',
  },
  animationDuration: {
    type: Number,
    default: 300,
  },
  hoverClass: {
    type: String,
    default: 'navigator-hover',
  },
  hoverStopPropagation: {
    type: Boolean,
    default: false,
  },
  hoverStartTime: {
    type: Number,
    default: 50,
  },
  hoverStayTime: {
    type: Number,
    default: 600,
  },
}
