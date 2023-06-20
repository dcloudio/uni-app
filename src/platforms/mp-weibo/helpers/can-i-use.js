function cssSupports (css) {
  return window.CSS && CSS.supports && (CSS.supports(css) || CSS.supports.apply(CSS, css.split(':')))
}

export default {
  'css.var': cssSupports('--a:0'),
  'css.env': cssSupports('top:env(a)'),
  'css.constant': cssSupports('top:constant(a)')
}
