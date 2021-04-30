export function getEnvLocale() {
  const { env } = process
  const lang = env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE
  return (lang && lang.replace(/[.:].*/, '')) || 'en'
}
