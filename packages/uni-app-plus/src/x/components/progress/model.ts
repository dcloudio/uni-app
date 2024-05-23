/// <reference types="@dcloudio/uni-app-x/types/native-global" />
const BACKGROUND_COLOR = '#EBEBEB'
const PRIMARY_COLOR = '#007AFF'
const ANIMATE_INTERVAL_DEFAULT = 30
const FONT_SIZE = 16
const STROKE_WIDTH = 6
class UniProgressActiveendEventDetail {
  curPercent: number
  constructor(value: number) {
    this.curPercent = value
  }
}
export class UniProgressActiveendEvent extends UniCustomEvent<UniProgressActiveendEventDetail> {
  constructor(value: number) {
    super('activeend', {
      detail: new UniProgressActiveendEventDetail(value),
    } as CustomEventOptions<UniProgressActiveendEventDetail>)
  }
}
export class UniProgressElement extends UniElementImpl {
  constructor(data: INodeData, pageNode: PageNode) {
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
export const progressProps = {
  percent: {
    type: Number,
    default: 0,
  },
  showInfo: {
    type: Boolean,
    default: false,
  },
  borderRadius: {
    type: Number,
    default: 0,
  },
  fontSize: {
    type: Number,
    default: FONT_SIZE,
  },
  strokeWidth: {
    type: Number,
    default: STROKE_WIDTH,
  },
  active: {
    type: Boolean,
    default: false,
  },
  activeColor: {
    type: String,
    default: PRIMARY_COLOR,
  },
  activeMode: {
    type: String,
    default: 'backwards',
  },
  backgroundColor: {
    type: String,
    default: BACKGROUND_COLOR,
  },
  duration: {
    type: Number,
    default: ANIMATE_INTERVAL_DEFAULT,
  },
}
