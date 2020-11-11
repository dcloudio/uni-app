const merge = require('../lib/pages-json').default
describe('shared:merge', () => {
  it('merge globalStyle', () => {
    const a = {
      globalStyle: {
        navigationBarTitleText: 'uni-app',
        'app-plus': {
          bounce: 'none',
          titleNView: {
            background: '#ffffff',
            buttons: [{
              text: '分享'
            }],
            backButton: {
              color: '#ffffff',
              background: '#00FF00'
            }
          }
        }
      }
    }
    const b = {
      globalStyle: {
        navigationBarTitleText: 'hello',
        navigationBarBackgroundColor: '#007AFF',
        'app-plus': {
          titleNView: {
            background: '#000000',
            buttons: [{
              text: '收藏'
            }],
            backButton: {
              background: '#00FF00'
            }
          }
        }
      }
    }
    const result = {
      globalStyle: {
        navigationBarTitleText: 'hello',
        navigationBarBackgroundColor: '#007AFF',
        'app-plus': {
          bounce: 'none',
          titleNView: {
            background: '#000000',
            buttons: [{
              text: '收藏'
            }],
            backButton: {
              color: '#ffffff',
              background: '#00FF00'
            }
          }
        }
      }
    }
    expect(merge([a, b])).toEqual(result)
  })
  it('merge pages', () => {
    const a = {
      pages: [{
        path: 'pages/index/index',
        style: {
          navigationBarTitleText: 'uni-app',
          'app-plus': {
            bounce: 'none',
            titleNView: {
              background: '#ffffff',
              buttons: [{
                text: '分享'
              }],
              backButton: {
                color: '#ffffff',
                background: '#00FF00'
              }
            }
          }
        }
      }]
    }
    const b = {
      pages: [{
        path: 'pages/index/index',
        style: {
          navigationBarTitleText: 'uni-app',
          'app-plus': {
            titleNView: {
              background: '#000000',
              buttons: [{
                text: '收藏'
              }],
              backButton: {
                background: '#00FF00'
              }
            }
          }
        }
      }, {
        path: 'pages/login/login'
      }]
    }
    const result = {
      pages: [{
        path: 'pages/index/index',
        style: {
          navigationBarTitleText: 'uni-app',
          'app-plus': {
            bounce: 'none',
            titleNView: {
              background: '#000000',
              buttons: [{
                text: '收藏'
              }],
              backButton: {
                color: '#ffffff',
                background: '#00FF00'
              }
            }
          }
        }
      }, {
        path: 'pages/login/login'
      }]
    }
    expect(merge([a, b])).toEqual(result)
  })
  it('merge subpackages', () => {
    const a = {
      subPackages: [{
        root: 'pages/demo',
        pages: [{
          path: 'index/index',
          style: {
            navigationBarTitleText: 'uni-app',
            'app-plus': {
              bounce: 'none',
              titleNView: {
                background: '#ffffff',
                buttons: [{
                  text: '分享'
                }],
                backButton: {
                  color: '#ffffff',
                  background: '#00FF00'
                }
              }
            }
          }
        }]
      }]
    }
    const b = {
      subPackages: [{
        root: 'pages/demo',
        pages: [{
          path: 'index/index',
          style: {
            navigationBarTitleText: 'uni-app',
            'app-plus': {
              titleNView: {
                background: '#000000',
                buttons: [{
                  text: '收藏'
                }],
                backButton: {
                  background: '#00FF00'
                }
              }
            }
          }
        }, {
          path: 'login/login'
        }]

      }, {
        root: 'pages/test',
        pages: [{
          path: 'test/test'
        }]
      }]
    }
    const result = {
      subPackages: [{
        root: 'pages/demo',
        pages: [{
          path: 'index/index',
          style: {
            navigationBarTitleText: 'uni-app',
            'app-plus': {
              bounce: 'none',
              titleNView: {
                background: '#000000',
                buttons: [{
                  text: '收藏'
                }],
                backButton: {
                  color: '#ffffff',
                  background: '#00FF00'
                }
              }
            }
          }
        }, {
          path: 'login/login'
        }]
      }, {
        root: 'pages/test',
        pages: [{
          path: 'test/test'
        }]
      }]
    }
    expect(merge([a, b])).toEqual(result)
  })
  it('merge multi', () => {
    const a = {
      globalStyle: {
        backgroundColorTop: '#ffffff',
        navigationBarTitleText: 'uni-app'
      }
    }
    const b = {
      globalStyle: {
        navigationBarTitleText: 'hello1',
        navigationBarBackgroundColor: '#000000',
        backgroundColor: '#ffffff'
      }
    }
    const c = {
      globalStyle: {
        navigationBarTitleText: 'hello2',
        navigationBarBackgroundColor: '#007AFF',
        backgroundTextStyle: 'light'
      }
    }
    const result = {
      globalStyle: {
        backgroundColorTop: '#ffffff',
        navigationBarTitleText: 'hello2',
        navigationBarBackgroundColor: '#007AFF',
        backgroundTextStyle: 'light',
        backgroundColor: '#ffffff'
      }
    }
    expect(merge([a, b, c])).toEqual(result)
  })
})
