import { normalizePagesRoute } from '../../pages'

export function normalizeAppUniRoutes(pagesJson: UniApp.PagesJson) {
  return JSON.stringify(normalizePagesRoute(pagesJson))
}
