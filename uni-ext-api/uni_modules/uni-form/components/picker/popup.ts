// #ifdef WEB
export type PickerPopover = {
    top: number
    left: number
    width: number
    height: number
}

const POPUP_WIDTH = 300
const POPUP_EDGE = 6

export function getPickerPopupStyle(
    popover: PickerPopover | null,
    windowWidth: number,
    windowHeight: number,
    contentHeight: number
) {
    const width = Math.min(POPUP_WIDTH, windowWidth - POPUP_EDGE * 2)
    let height = Math.min(contentHeight, windowHeight - POPUP_EDGE * 2)
    let left = (windowWidth - width) / 2
    let top = (windowHeight - height) / 2

    if (popover != null) {
        left = Math.max(POPUP_EDGE, Math.min(windowWidth - width - POPUP_EDGE, popover.left))
        const spaceAbove = Math.max(0, popover.top - POPUP_EDGE * 2)
        const spaceBelow = Math.max(0, windowHeight - popover.top - popover.height - POPUP_EDGE * 2)
        const above = spaceBelow < height && spaceAbove > spaceBelow
        height = Math.min(height, above ? spaceAbove : spaceBelow)
        top = above ? popover.top - height - POPUP_EDGE : popover.top + popover.height + POPUP_EDGE
        top = Math.max(POPUP_EDGE, Math.min(windowHeight - height - POPUP_EDGE, top))
    }

    return {
        content: {
            left: `${left}px`,
            top: `${top}px`,
            right: 'auto',
            bottom: 'auto',
            width: `${width}px`,
            height: `${height}px`
        }
    }
}
// #endif
