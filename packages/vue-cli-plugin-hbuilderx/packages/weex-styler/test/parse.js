var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

var styler = require('../')

describe('parse', function () {

  it('parse normal style code', function (done) {
    var code = 'html {color: #000000;}\n\n.foo {color: red; background-color: rgba(255,255,255,0.6); -webkit-transform: rotate(90deg); width: 200px; left: 0; right: 0px; border-width: 1pt; font-weight: 100}\n\n.bar {background: red}'
    styler.parse(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({foo: {color: '#FF0000', backgroundColor: 'rgba(255,255,255,0.6)', WebkitTransform: 'rotate(90deg)', width: '200px', left: 0, right: '0px', borderWidth: '1pt', fontWeight: '100'}, bar: {background: 'red'}})
      expect(data.log).eql([
        {line: 1, column: 1, reason: 'ERROR: Selector `html` is not supported. Weex only support single-classname selector'},
        {line: 3, column: 7, reason: 'NOTE: property value `red` is autofixed to `#FF0000`'},
        {line: 3, column: 60, reason: 'WARNING: `-webkit-transform` is not a standard property name (may not be supported)'},
        {line: 5, column: 7, reason: 'WARNING: `background` is not a standard property name (may not be supported), suggest `background-color`'}
      ])
      done()
    })
  })

  it('parse and fix prop value', function (done) {
    var code = '.foo {font-size: 200px;}'
    styler.parse(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({foo: {fontSize: '200px'}})
      done()
    })
  })

  it('parse and ensure number type value', function (done) {
    var code = '.foo {line-height: 40;}\n\n .bar {line-height: 20px;}'
    styler.parse(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({foo: {lineHeight: 40}, bar: {lineHeight: '20px'}})
      done()
    })
  })

  it('handle complex class definition', function (done) {
    var code = '.foo, .bar {font-size: 20;}\n\n .foo {color: #ff5000;}\n\n .bar {color: #000000;}'
    styler.parse(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({
        foo: {fontSize: 20, color: '#ff5000'},
        bar: {fontSize: 20, color: '#000000'}
      })
      done()
    })
  })

  it('handle more complex class definition', function (done) {
    var code = '.foo, .bar {font-size: 20; color: #000000}\n\n .foo, .bar, .baz {color: #ff5000; height: 30;}'
    styler.parse(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({
        foo: {fontSize: 20, color: '#ff5000', height: 30},
        bar: {fontSize: 20, color: '#ff5000', height: 30},
        baz: {color: '#ff5000', height: 30}
      })
      done()
    })
  })

  it('parse transition', function (done) {
    var code = '.foo {transition-property: margin-top; transition-duration: 300ms; transition-delay: 0.2s; transition-timing-function: ease-in;}'
    styler.parse(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle['@TRANSITION']).eql({foo: {property: 'marginTop', duration: 300, delay: 200, timingFunction: 'ease-in'}})
      expect(data.jsonStyle.foo).eql({
        transitionDelay: 200,
        transitionDuration: 300,
        transitionProperty: "marginTop",
        transitionTimingFunction: "ease-in"
      })
      expect(data.log).eql([
        {line: 1, column: 40, reason: 'NOTE: property value `300ms` is autofixed to `300`'},
        {line: 1, column: 68, reason: 'NOTE: property value `0.2s` is autofixed to `200`'}
      ])
      done()
    })
  })

  it('parse transition transform', function (done) {
    var code = '.foo {transition-property: transform; transition-duration: 300ms; transition-delay: 0.2s; transition-timing-function: ease-in-out;}'
    styler.parse(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle['@TRANSITION']).eql({foo: {property: 'transform', duration: 300, delay: 200, timingFunction: 'ease-in-out'}})
      expect(data.jsonStyle.foo).eql({
        transitionDelay: 200,
        transitionDuration: 300,
        transitionProperty: "transform",
        transitionTimingFunction: "ease-in-out"
      })
      done()
    })
  })

  it('parse multi transition properties', function (done) {
    var code = '.foo {transition-property: margin-top, height; transition-duration: 300ms; transition-delay: 0.2s; transition-timing-function: ease-in-out;}'
    styler.parse(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle['@TRANSITION']).eql({foo: {property: 'marginTop,height', duration: 300, delay: 200, timingFunction: 'ease-in-out'}})
      expect(data.jsonStyle.foo).eql({
        transitionDelay: 200,
        transitionDuration: 300,
        transitionProperty: "marginTop,height",
        transitionTimingFunction: "ease-in-out"
      })
      done()
    })
  })

  it('parse complex transition', function (done) {
    var code = '.foo {font-size: 20; color: #000000}\n\n .foo, .bar {color: #ff5000; height: 30; transition-property: margin-top; transition-duration: 300ms; transition-delay: 0.2s; transition-timing-function: ease-in;}'
    styler.parse(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle['@TRANSITION']).eql({
        foo: {property: 'marginTop', duration: 300, delay: 200, timingFunction: 'ease-in'},
        bar: {property: 'marginTop', duration: 300, delay: 200, timingFunction: 'ease-in'}
      })
      expect(data.jsonStyle.foo).eql({
        fontSize: 20, color: '#ff5000', height: 30,
        transitionDelay: 200,
        transitionDuration: 300,
        transitionProperty: "marginTop",
        transitionTimingFunction: "ease-in"
      })
      expect(data.jsonStyle.bar).eql({
        color: '#ff5000', height: 30,
        transitionDelay: 200,
        transitionDuration: 300,
        transitionProperty: "marginTop",
        transitionTimingFunction: "ease-in"
      })
      expect(data.log).eql([
        {line: 3, column: 75, reason: 'NOTE: property value `300ms` is autofixed to `300`'},
        {line: 3, column: 103, reason: 'NOTE: property value `0.2s` is autofixed to `200`'}
      ])
      done()
    })
  })

  it('parse transition shorthand', function (done) {
    var code = '.foo {font-size: 20; transition: margin-top 500ms ease-in-out 1s}'
    styler.parse(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle['@TRANSITION']).eql({foo: {property: 'marginTop', duration: 500, delay: 1000, timingFunction: 'ease-in-out' }})
      expect(data.jsonStyle.foo).eql({
        fontSize: 20,
        transitionDelay: 1000,
        transitionDuration: 500,
        transitionProperty: "marginTop",
        transitionTimingFunction: "ease-in-out"
      })
      expect(data.log).eql([
        {line: 1, column: 22, reason: 'NOTE: property value `500ms` is autofixed to `500`'},
        {line: 1, column: 22, reason: 'NOTE: property value `1s` is autofixed to `1000`'}
      ])
      done()
    })
  })

  it.skip('override transition shorthand', function (done) {
    var code = '.foo {font-size: 32px; transition: margin-top 500ms ease-in-out 1s; transition-duration: 300ms}'
    styler.parse(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle['@TRANSITION']).eql({foo: {property: 'marginTop', duration: 300, delay: 1000, timingFunction: 'ease-in-out' }})
      expect(data.jsonStyle.foo).eql({
        fontSize: 32,
        transitionDelay: 1000,
        transitionDuration: 300,
        transitionProperty: "marginTop",
        transitionTimingFunction: "ease-in-out"
      })
      done()
    })
  })

  it('parse padding & margin shorthand', function (done) {
    var code = '.foo { padding: 20px; margin: 30px 40; } .bar { margin: 10px 20 30; padding: 10 20px 30px 40;}'
    styler.parse(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle.foo).eql({
        paddingTop: '20px',
        paddingRight: '20px',
        paddingBottom: '20px',
        paddingLeft: '20px',
        marginTop: '30px',
        marginRight: 40,
        marginBottom: '30px',
        marginLeft: 40
      })
      expect(data.jsonStyle.bar).eql({
        paddingTop: 10,
        paddingRight: '20px',
        paddingBottom: '30px',
        paddingLeft: 40,
        marginTop: '10px',
        marginRight: 20,
        marginBottom: 30,
        marginLeft: 20
      })
      done()
    })
  })

  it('override padding & margin shorthand', function (done) {
    var code = '.foo { padding: 20px; padding-left: 30px; } .bar { margin: 10px 20; margin-bottom: 30px;}'
    styler.parse(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle.foo).eql({
        paddingTop: '20px',
        paddingRight: '20px',
        paddingBottom: '20px',
        paddingLeft: '30px'
      })
      expect(data.jsonStyle.bar).eql({
        marginTop: '10px',
        marginRight: 20,
        marginBottom: '30px',
        marginLeft: 20
      })
      done()
    })
  })

  it('handle pseudo class', function (done) {
    var code = '.class-a {color: #0000ff;} .class-a:last-child:focus {color: #ff0000;}'
    styler.parse(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({
        'class-a': {
          color: '#0000ff',
          'color:last-child:focus': '#ff0000'
        }
      })
      done()
    })
  })

  it('handle iconfont', function (done) {
    var code = '@font-face {font-family: "font-family-name-1"; src: url("font file url 1-1") format("truetype");} @font-face {font-family: "font-family-name-2"; src: url("font file url 2-1") format("truetype"), url("font file url 2-2") format("woff");}'
    styler.parse(code, function (err, data) {
      expect(err).is.undefined
      expect(data).is.an.object
      expect(data.jsonStyle).eql({
        '@FONT-FACE': [
          {fontFamily: 'font-family-name-1', src: 'url("font file url 1-1") format("truetype")'},
          {fontFamily: 'font-family-name-2', src: 'url("font file url 2-1") format("truetype"), url("font file url 2-2") format("woff")'}
        ]
      })
      done()
    })
  })

  it('handle syntax error', function (done) {
    var code = 'asdf'
    styler.parse(code, function (err, data) {
      expect(err).is.an.array
      expect(err[0].toString()).eql('Error: undefined:1:5: missing \'{\'')
      expect(err[0].reason).eql('missing \'{\'')
      expect(err[0].filename).eql(undefined)
      expect(err[0].line).eql(1)
      expect(err[0].column).eql(5)
      expect(err[0].source).eql('')
      expect(data.log).eql([{line: 1, column: 5, reason: 'ERROR: undefined:1:5: missing \'{\''}])
      done()
    })
  })
})
