export function useHoverClass(hoverClass: string) {
  if (hoverClass && hoverClass !== 'none') {
    return {}
  }
  return { hoverClass }
}
