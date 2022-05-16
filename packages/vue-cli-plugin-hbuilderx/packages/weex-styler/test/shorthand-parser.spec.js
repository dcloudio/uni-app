var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

var shorthandParser = require('../lib/shorthand-parser')

describe('shorthand-parser', function () {
  it('parse transition', function () {
    var declarations = [
      {
        type: 'declaration',
        property: 'transition',
        value: 'margin-top 500ms ease-in-out 1s',
        position: {}
      }
    ]
    var result = shorthandParser(declarations)
    expect(result).eql([
      {
        type: 'declaration',
        property: 'transition-property',
        value: 'margin-top',
        position: {}
      },
      {
        type: 'declaration',
        property: 'transition-duration',
        value: '500ms',
        position: {}
      },
      {
        type: 'declaration',
        property: 'transition-timing-function',
        value: 'ease-in-out',
        position: {}
      },
      {
        type: 'declaration',
        property: 'transition-delay',
        value: '1s',
        position: {}
      }
    ])

    expect(shorthandParser([{
      type: 'declaration',
      property: 'transition',
      value: 'width 2s ease-in-out, height 1s 1s, top cubic-bezier(0.1, 0.7, 1.0, 0.1)',
      position: {}
    }])).eql([{
      type: 'declaration',
      property: 'transition-property',
      value: 'width, height, top',
      position: {}
    },
    {
      type: 'declaration',
      property: 'transition-duration',
      value: '2s, 1s, 0s',
      position: {}
    },
    {
      type: 'declaration',
      property: 'transition-timing-function',
      value: 'ease-in-out, ease, cubic-bezier(0.1, 0.7, 1.0, 0.1)',
      position: {}
    },
    {
      type: 'declaration',
      property: 'transition-delay',
      value: '0s, 1s, 0s',
      position: {}
    }])

    expect(shorthandParser([{
      type: 'declaration',
      property: 'transition',
      value: 'width 2s, height 2s',
      position: {}
    }])).eql([{
      type: 'declaration',
      property: 'transition-property',
      value: 'width, height',
      position: {}
    },
    {
      type: 'declaration',
      property: 'transition-duration',
      value: '2s',
      position: {}
    },
    {
      type: 'declaration',
      property: 'transition-timing-function',
      value: 'ease',
      position: {}
    },
    {
      type: 'declaration',
      property: 'transition-delay',
      value: '0s',
      position: {}
    }])
  })

  it('parse margin', function () {
    var declarations = [
      {
        type: 'declaration',
        property: 'margin',
        value: '1px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'margin',
        value: '21px 22px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'margin',
        value: '31px 32px 33px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'margin',
        value: '41px 42px 43px 44px',
        position: {}
      }
    ]
    var result = shorthandParser(declarations)
    expect(result).eql([
      {
        type: 'declaration',
        property: 'margin-top',
        value: '1px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'margin-right',
        value: '1px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'margin-bottom',
        value: '1px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'margin-left',
        value: '1px',
        position: {}
      },

      {
        type: 'declaration',
        property: 'margin-top',
        value: '21px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'margin-right',
        value: '22px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'margin-bottom',
        value: '21px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'margin-left',
        value: '22px',
        position: {}
      },

      {
        type: 'declaration',
        property: 'margin-top',
        value: '31px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'margin-right',
        value: '32px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'margin-bottom',
        value: '33px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'margin-left',
        value: '32px',
        position: {}
      },

      {
        type: 'declaration',
        property: 'margin-top',
        value: '41px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'margin-right',
        value: '42px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'margin-bottom',
        value: '43px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'margin-left',
        value: '44px',
        position: {}
      }
    ])
  })
})
