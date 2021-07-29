var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

var styler = require('../')

describe('validate', function () {

  it('parse normal style code', function (done) {
    var code = {
      foo: {
        color: '#FF0000',
        width: '200',
        position: 'sticky',
        zIndex: 4
      }
    }
    styler.validate(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({foo: {color: '#FF0000', width: 200, position: 'sticky', zIndex: 4}})
      expect(data.log).eql([])
      done()
    })
  })

  it('parse length', function (done) {
    var code = {
      foo: {
        width: '200px',
        paddingLeft: '300',
        borderWidth: '1pt',
        left: '0',
        right: '0px',
        marginRight: 'asdf'
      }
    }
    styler.validate(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({foo: {
        width: '200px',
        paddingLeft: 300,
        borderWidth: '1pt',
        left: 0,
        right: '0px'
      }})
      expect(data.log).eql([
        {reason: 'ERROR: property value `asdf` is not supported for `margin-right` (only number and pixel values are supported)'}
      ])
      done()
    })
  })

  it('parse number', function (done) {
    var code = {
      foo: {
        opacity: '1'
      },
      bar: {
        opacity: '0.5'
      },
      baz: {
        opacity: 'a'
      },
      boo: {
        opacity: '0.5a'
      },
      zero: {
        opacity: '0'
      }
    }
    styler.validate(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({
        foo: {
          opacity: 1
        },
        bar: {
          opacity: 0.5
        },
        baz: {},
        boo: {},
        zero: {
          opacity: 0
        }
      })
      expect(data.log).eql([
        {reason: 'ERROR: property value `a` is not supported for `opacity` (only number is supported)'},
        {reason: 'ERROR: property value `0.5a` is not supported for `opacity` (only number is supported)'}
      ])
      done()
    })
  })

  it('parse integer', function (done) {
    var code = {
      foo: {
        zIndex: '1'
      },
      bar: {
        zIndex: '0.5'
      },
      baz: {
        zIndex: 'a'
      },
      boo: {
        zIndex: '0.5a'
      },
      zero: {
        zIndex: '0'
      }
    }
    styler.validate(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({
        foo: {
          zIndex: 1
        },
        bar: {},
        baz: {},
        boo: {},
        zero: {
          zIndex: 0
        }
      })
      expect(data.log).eql([
        {reason: 'ERROR: property value `0.5` is not supported for `z-index` (only integer is supported)'},
        {reason: 'ERROR: property value `a` is not supported for `z-index` (only integer is supported)'},
        {reason: 'ERROR: property value `0.5a` is not supported for `z-index` (only integer is supported)'}
      ])
      done()
    })
  })

  it('parse color', function (done) {
    var code = {
      foo: {
        color: '#FF0000',
        backgroundColor: '#ff0000'
      },
      bar: {
        color: '#F00',
        backgroundColor: '#f00'
      },
      baz: {
        color: 'red',
        backgroundColor: 'lightpink'
      },
      rgba: {
        color: 'rgb(23, 0, 255)',
        backgroundColor: 'rgba(234, 45, 99, .4)'
      },
      transparent: {
        color: 'transparent',
        backgroundColor: 'asdf'
      },
      errRgba: {
        color: 'rgb(266,0,255)',
        backgroundColor: 'rgba(234,45,99,1.3)'
      }
    }
    styler.validate(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({
        foo: {
          color: '#FF0000',
          backgroundColor: '#ff0000'
        },
        bar: {
          color: '#FF0000',
          backgroundColor: '#ff0000'
        },
        baz: {
          color: '#FF0000',
          backgroundColor: '#FFB6C1'
        },
        rgba: {
          color: 'rgb(23,0,255)',
          backgroundColor: 'rgba(234,45,99,0.4)'
        },
        transparent: {
          color: 'rgba(0,0,0,0)'
        },
        errRgba: {}
      })
      expect(data.log).eql([
        {reason: 'NOTE: property value `#F00` is autofixed to `#FF0000`'},
        {reason: 'NOTE: property value `#f00` is autofixed to `#ff0000`'},
        {reason: 'NOTE: property value `red` is autofixed to `#FF0000`'},
        {reason: 'NOTE: property value `lightpink` is autofixed to `#FFB6C1`'},
        {reason: 'ERROR: property value `asdf` is not valid for `background-color`'},
        {reason: 'ERROR: property value `rgb(266,0,255)` is not valid for `color`'},
        {reason: 'ERROR: property value `rgba(234,45,99,1.3)` is not valid for `background-color`'}
      ])
      done()
    })
  })

  it('parse color', function (done) {
    var code = {
      foo: {
        color: '#FF0000',
        backgroundColor: '#ff0000'
      },
      bar: {
        color: '#F00',
        backgroundColor: '#f00'
      },
      baz: {
        color: 'red',
        backgroundColor: 'lightpink'
      },
      rgba: {
        color: 'rgb(23, 0, 255)',
        backgroundColor: 'rgba(234, 45, 99, .4)'
      },
      transparent: {
        color: 'transparent',
        backgroundColor: 'asdf'
      },
      errRgba: {
        color: 'rgb(266,0,255)',
        backgroundColor: 'rgba(234,45,99,1.3)'
      }
    }
    styler.validate(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({
        foo: {
          color: '#FF0000',
          backgroundColor: '#ff0000'
        },
        bar: {
          color: '#FF0000',
          backgroundColor: '#ff0000'
        },
        baz: {
          color: '#FF0000',
          backgroundColor: '#FFB6C1'
        },
        rgba: {
          color: 'rgb(23,0,255)',
          backgroundColor: 'rgba(234,45,99,0.4)'
        },
        transparent: {
          color: 'rgba(0,0,0,0)'
        },
        errRgba: {}
      })
      expect(data.log).eql([
        {reason: 'NOTE: property value `#F00` is autofixed to `#FF0000`'},
        {reason: 'NOTE: property value `#f00` is autofixed to `#ff0000`'},
        {reason: 'NOTE: property value `red` is autofixed to `#FF0000`'},
        {reason: 'NOTE: property value `lightpink` is autofixed to `#FFB6C1`'},
        {reason: 'ERROR: property value `asdf` is not valid for `background-color`'},
        {reason: 'ERROR: property value `rgb(266,0,255)` is not valid for `color`'},
        {reason: 'ERROR: property value `rgba(234,45,99,1.3)` is not valid for `background-color`'}
      ])
      done()
    })
  })

  it('parse flex-wrap', function (done) {
    var code = {
      foo: { flexWrap: 'nowrap' },
      bar: { flexWrap: 'wrap' }
    }
    styler.validate(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({
        foo: { flexWrap: 'nowrap' },
        bar: { flexWrap: 'wrap' }
      })
      expect(data.log).eql([
        {reason: 'NOTE: property value `nowrap` is the DEFAULT value for `flex-wrap` (could be removed)'},
        {reason: 'NOTE: the flex-wrap property may have compatibility problem on native'},
      ])
      done()
    })
  })

  it('parse transition-property', function (done) {
    var code = {
      foo: {
        transitionProperty: 'margin-top'
      },
      bar: {
        transitionProperty: 'height'
      },
      foobar: {
        transitionProperty: 'margin-top, height'
      },
      baz: {
        transitionProperty: 'abc'
      }
    }
    styler.validate(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({
        foo: {
          transitionProperty: 'marginTop'
        },
        bar: {
          transitionProperty: 'height'
        },
        foobar: {
          transitionProperty: 'marginTop,height'
        },
        baz: {}
      })
      expect(data.log).eql([
        {reason: 'ERROR: property value `abc` is not supported for `transition-property` (only css property is valid)'}
      ])
      done()
    })
  })

  it('parse transition-duration & transition-delay', function (done) {
    var code = {
      foo: {
        transitionDuration: '200ms',
        transitionDelay: '0.5s'
      },
      bar: {
        transitionDuration: '200',
        transitionDelay: 'abc'
      }
    }
    styler.validate(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({
        foo: {
          transitionDuration: 200,
          transitionDelay: 500
        },
        bar: {
          transitionDuration: 200
        }
      })
      expect(data.log).eql([
        {reason: 'NOTE: property value `200ms` is autofixed to `200`'},
        {reason: 'NOTE: property value `0.5s` is autofixed to `500`'},
        {reason: 'ERROR: property value `abc` is not supported for `transition-delay` (only number of seconds and milliseconds is valid)'}
      ])
      done()
    })
  })

  it('parse transition-timing-function', function (done) {
    var code = {
      foo: {
        transitionTimingFunction: 'ease-in-out'
      },
      bar: {
        transitionTimingFunction: 'cubic-bezier(.88, 1.0, -0.67, 1.37)'
      },
      baz: {
        transitionTimingFunction: 'abc'
      }
    }
    styler.validate(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({
        foo: {
          transitionTimingFunction: 'ease-in-out'
        },
        bar: {
          transitionTimingFunction: 'cubic-bezier(0.88,1,-0.67,1.37)'
        },
        baz: {}
      })
      expect(data.log).eql([
        {reason: 'ERROR: property value `abc` is not supported for `transition-timing-function` (supported values are: `linear`|`ease`|`ease-in`|`ease-out`|`ease-in-out`|`cubic-bezier(n,n,n,n)`)'}
      ])
      done()
    })
  })

  it('parse unknown', function (done) {
    var code = {
      foo: {
        background: '#ff0000',
        abc: '123',
        def: '456px',
        ghi: '789pt',
        AbcDef: '456',
        abcDef: 'abc'
      }
    }
    styler.validate(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({
        foo: {
          background: '#ff0000',
          abc: 123,
          def: '456px',
          ghi: '789pt',
          AbcDef: 456,
          abcDef: 'abc'
        }
      })
      expect(data.log).eql([
        {reason: 'WARNING: `background` is not a standard property name (may not be supported), suggest `background-color`'},
        {reason: 'WARNING: `abc` is not a standard property name (may not be supported)'},
        {reason: 'WARNING: `def` is not a standard property name (may not be supported)'},
        {reason: 'WARNING: `ghi` is not a standard property name (may not be supported)'},
        {reason: 'WARNING: `-abc-def` is not a standard property name (may not be supported)'},
        {reason: 'WARNING: `abc-def` is not a standard property name (may not be supported)'}
      ])
      done()
    })
  })

  it('parse complex style code', function (done) {
    var code = {
      foo: {
        color: 'red',
        WebkitTransform: 'rotate(90deg)',
        width: '200px'
      }
    }
    styler.validate(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({foo: {color: '#FF0000', WebkitTransform: 'rotate(90deg)', width: '200px'}})
      expect(data.log).eql([
        {reason: 'NOTE: property value `red` is autofixed to `#FF0000`'},
        {reason: 'WARNING: `-webkit-transform` is not a standard property name (may not be supported)'}
      ])
      done()
    })
  })
})
