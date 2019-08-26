/**
 * FakeForkTsCheckerWebpackPlugin
 * Runs typescript type checker and linter (tslint) on separate process.
 * This speed-ups build a lot.
 *
 * Options description in README.md
 */
class ForkTsCheckerWebpackPlugin {
  apply (compiler) {}
}
module.exports = ForkTsCheckerWebpackPlugin
