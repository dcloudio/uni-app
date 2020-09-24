function cssSupports (css) {
  return window.CSS && window.CSS.supports && (window.CSS.supports(css) || window.CSS.supports('--a', 0))
}

export default {
  'css.var': cssSupports('--a:0'),
  'css.env': cssSupports('top:env(a)'),
  'css.constant': cssSupports('top:constant(a)')
}
