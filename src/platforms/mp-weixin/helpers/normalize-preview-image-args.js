export default function normalize (fromArgs) {
  let currentIndex = parseInt(fromArgs.current)
  if (isNaN(currentIndex)) {
    return
  }
  const urls = fromArgs.urls
  if (!Array.isArray(urls)) {
    return
  }
  const len = urls.length
  if (!len) {
    return
  }
  if (currentIndex < 0) {
    currentIndex = 0
  } else if (currentIndex >= len) {
    currentIndex = len - 1
  }
  if (currentIndex > 0) {
    fromArgs.current = urls[currentIndex]
    fromArgs.urls = urls.filter(
      (item, index) => index < currentIndex ? item !== urls[currentIndex] : true
    )
  } else {
    fromArgs.current = urls[0]
  }
}
