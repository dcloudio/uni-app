(function () {
  var userAgent = navigator.userAgent
  window.addEventListener('resize', function () {
    if (navigator.userAgent !== userAgent) {
      /* eslint-disable no-undef */
      location.reload()
    }
  })
})()
