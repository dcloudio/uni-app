export function hideKeyboard () {
  const activeElement = document.activeElement
  if (activeElement && (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT')) {
    activeElement.blur()
  }
}
