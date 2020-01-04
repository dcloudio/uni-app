function cssSupports (css) {
  return window.CSS && window.CSS.supports && window.CSS.supports(css)
}

export default {
  'css.var': cssSupports('--a:0'),
  'css.env': cssSupports('top:env(a)'),
  'css.constant': cssSupports('top:constant(a)')
}
