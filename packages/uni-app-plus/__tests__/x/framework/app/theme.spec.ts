const setPageStyle = jest.fn()

jest.mock('../../../../src/service/framework/page/getCurrentPages', () => ({
  UniBasePageImpl: class {
    route: string = ''
    options: Map<string, string | null> = new Map()
    constructor() {
      this.route = ''
      this.options = new Map()
    }
    getParentPage() {
      return null
    }
    getDialogPages() {
      return []
    }
  },
  getAllPages: jest.fn(() => {
    return [
      {
        $page: {
          path: '/pages/tabBar/component',
        },
        setPageStyle: setPageStyle,
      },
    ]
  }),
}))

jest.mock('../../../../src/x/framework/app/tabBar', () => ({
  getTabBar: jest.fn(() => ({})),
}))

jest.mock('../../../../src/service/framework/page', () => ({
  definePage: jest.fn(),
}))

import {
  getAppThemeFallbackOS,
  normalizePageStyles,
  normalizeTabBarStyles,
} from '../../../../src/x/framework/theme'

describe('test: getAppThemeFallbackOS', () => {
  it('test: getAppThemeFallbackOS1', () => {
    uni.getAppBaseInfo = jest.fn(() => {
      return { appTheme: 'auto' } as any
    })
    uni.getDeviceInfo = jest.fn(() => {
      return { osTheme: 'dark' } as any
    })

    expect(getAppThemeFallbackOS()).toBe('dark')
  })
  it('test: getAppThemeFallbackOS2', () => {
    uni.getAppBaseInfo = jest.fn(() => {
      return { appTheme: 'light' } as any
    })
    uni.getDeviceInfo = jest.fn(() => {
      return { osTheme: 'dark' } as any
    })

    expect(getAppThemeFallbackOS()).toBe('light')
  })

  it('test: getAppThemeFallbackOS2', () => {
    uni.getAppBaseInfo = jest.fn(() => {
      return { appTheme: 'dark' } as any
    })
    uni.getDeviceInfo = jest.fn(() => {
      return { osTheme: 'light' } as any
    })

    expect(getAppThemeFallbackOS()).toBe('dark')
  })
})

describe('test: normalizePageStyles', () => {
  it('should normalize page styles', () => {
    const pageStyle = {
      backgroundColor: '@bgColor',
      textColor: '@textColor',
      buttonColor: '@buttonColor',
    }
    const themeConfig = {
      dark: {
        bgColor: '#000',
        textColor: '#fff',
        buttonColor: '#f00',
      },
      light: {
        bgColor: '#fff',
        textColor: '#000',
        buttonColor: '#00f',
      },
    }
    const themeMode = 'dark'

    normalizePageStyles(pageStyle, themeConfig, themeMode)

    expect(pageStyle).toEqual({
      backgroundColor: '#000',
      textColor: '#fff',
      buttonColor: '#f00',
    })
  })
})

describe('test: normalizeTabBarStyles', () => {
  it('should normalize tab bar styles', () => {
    const tabBar = {
      backgroundColor: '@bgColor',
      textColor: '@textColor',
      buttonColor: '@buttonColor',
    }
    const themeConfig = {
      dark: {
        bgColor: '#000',
        textColor: '#fff',
        buttonColor: '#f00',
      },
      light: {
        bgColor: '#fff',
        textColor: '#000',
        buttonColor: '#00f',
      },
    }
    const themeMode = 'light'

    normalizeTabBarStyles(tabBar, themeConfig, themeMode)

    expect(tabBar).toEqual({
      backgroundColor: '#fff',
      textColor: '#000',
      buttonColor: '#00f',
    })
  })
})
