import type { ComponentPublicInstance } from 'vue'

type VaporPageStyleValue = boolean | string

interface VaporPageStyleProperty {
  name: string
  defaultValue: VaporPageStyleValue
}

interface VaporPageStyleOverrideOwner {
  __vaporPageStyleOverrides?: Map<string, VaporPageStyleValue>
  __setVaporPageStyleInitialValue?: (
    name: string,
    value: VaporPageStyleValue
  ) => void
  __setVaporPageStyle?: (name: string, value: VaporPageStyleValue) => void
  __flushVaporPageStyleQueue?: () => void
}

const VAPOR_PAGE_STYLE_PROPERTIES: VaporPageStyleProperty[] = [
  {
    name: 'enableBackToTop',
    defaultValue: false,
  },
  { name: 'bounces', defaultValue: false },
  {
    name: 'androidOverscroll',
    defaultValue: false,
  },
  {
    name: 'androidRefresherColor',
    defaultValue: '',
  },
  {
    name: 'backgroundColor',
    defaultValue: 'transparent',
  },
]

function normalizeVaporPageStyleValue(
  value: unknown,
  defaultValue: VaporPageStyleValue
): VaporPageStyleValue {
  return typeof value === typeof defaultValue
    ? (value as VaporPageStyleValue)
    : defaultValue
}

export function initVaporPageStyle(
  page: ComponentPublicInstance,
  pageStyle: UniApp.PageRouteMeta
) {
  const pageStyleOwner = page.$page as unknown as VaporPageStyleOverrideOwner
  const flushPageStyleQueue = () => {
    pageStyleOwner?.__flushVaporPageStyleQueue?.call(pageStyleOwner)
  }
  const rootElement = page.$el
  if (
    !rootElement ||
    rootElement.tagName !== 'PAGE' ||
    rootElement instanceof UniViewElementImpl
  ) {
    flushPageStyleQueue()
    return
  }

  if (typeof pageStyleOwner?.__setVaporPageStyle !== 'function') {
    flushPageStyleQueue()
    return
  }
  const setVaporPageStyle = pageStyleOwner.__setVaporPageStyle
  const setVaporPageStyleInitialValue =
    pageStyleOwner.__setVaporPageStyleInitialValue

  VAPOR_PAGE_STYLE_PROPERTIES.forEach((property) => {
    const value = normalizeVaporPageStyleValue(
      (pageStyle as unknown as Record<string, unknown>)[property.name],
      property.defaultValue
    )
    setVaporPageStyleInitialValue?.call(pageStyleOwner, property.name, value)
    if (pageStyleOwner.__vaporPageStyleOverrides?.has(property.name)) {
      return
    }
    setVaporPageStyle.call(pageStyleOwner, property.name, value)
  })
  flushPageStyleQueue()
}
