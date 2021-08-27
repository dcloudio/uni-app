import {
  def,
  req,
  Exports,
  Require,
} from '../../src/service/framework/amd/index'
describe('amd', () => {
  test('basic', () => {
    def(
      'app-service',
      [],
      function (require: Require, exports: Exports, vue: Exports) {
        console.log(require, exports, vue)
      }
    )
    req(['app-service'], (AppService: Exports) => {
      console.log('app-service.init', AppService)
    })
  })
})
