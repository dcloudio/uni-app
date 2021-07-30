# [3.1.0](https://github.com/vuejs/component-compiler-utils/compare/v3.0.2...v3.1.0) (2019-12-08)


### Features

* include filename in `finalCompilerOptions` ([#74](https://github.com/vuejs/component-compiler-utils/issues/74)) ([3dda72d](https://github.com/vuejs/component-compiler-utils/commit/3dda72d))
* support AST for template compile ([#68](https://github.com/vuejs/component-compiler-utils/issues/68)) ([ed44d6f](https://github.com/vuejs/component-compiler-utils/commit/ed44d6f))
* support audio src in `transformAssetUrls` option by default ([#72](https://github.com/vuejs/component-compiler-utils/issues/72)) ([47f1341](https://github.com/vuejs/component-compiler-utils/commit/47f1341))



## [3.0.2](https://github.com/vuejs/component-compiler-utils/compare/v3.0.1...v3.0.2) (2019-11-06)


### Bug Fixes

* also include "lib" folder for type definitions ([dd42df1](https://github.com/vuejs/component-compiler-utils/commit/dd42df1)), closes [#73](https://github.com/vuejs/component-compiler-utils/issues/73)



## [3.0.1](https://github.com/vuejs/component-compiler-utils/compare/v3.0.0...v3.0.1) (2019-11-04)


### Bug Fixes

* should not crash when prettier failed ([89e7900](https://github.com/vuejs/component-compiler-utils/commit/89e7900))
* unpin prettier version ([59a01bb](https://github.com/vuejs/component-compiler-utils/commit/59a01bb))


# [3.0.0](https://github.com/vuejs/component-compiler-utils/compare/v2.6.0...v3.0.0) (2019-04-11)


### Features

* Replace node-sass to sass ([#56](https://github.com/vuejs/component-compiler-utils/issues/56)) ([3e4e3fc](https://github.com/vuejs/component-compiler-utils/commit/3e4e3fc)), closes [#50](https://github.com/vuejs/component-compiler-utils/issues/50)


### BREAKING CHANGES

* Using `sass` instead of `node-sass` package.



# [2.6.0](https://github.com/vuejs/component-compiler-utils/compare/v2.5.2...v2.6.0) (2019-02-21)


### Features

* implement ::v-deep as a shadow piercing combinator ([#54](https://github.com/vuejs/component-compiler-utils/issues/54)) ([8b2c646](https://github.com/vuejs/component-compiler-utils/commit/8b2c646))



# [2.6.0](https://github.com/vuejs/component-compiler-utils/compare/v2.5.2...v2.6.0) (2019-02-21)


### Features

* implement ::v-deep as a shadow piercing combinator ([#54](https://github.com/vuejs/component-compiler-utils/issues/54)) ([8b2c646](https://github.com/vuejs/component-compiler-utils/commit/8b2c646))



## [2.5.2](https://github.com/vuejs/component-compiler-utils/compare/v2.5.0...v2.5.2) (2019-01-31)


### Bug Fixes

* fix sourceMap path separator on Windows, default sourceRoot to "" ([#51](https://github.com/vuejs/component-compiler-utils/issues/51)) ([df32cd9](https://github.com/vuejs/component-compiler-utils/commit/df32cd9)), closes [#47](https://github.com/vuejs/component-compiler-utils/issues/47)
* generate correct source-map when content is not padded ([#52](https://github.com/vuejs/component-compiler-utils/issues/52)) ([81be0ca](https://github.com/vuejs/component-compiler-utils/commit/81be0ca))



## [2.5.1](https://github.com/vuejs/component-compiler-utils/compare/v2.5.0...v2.5.1) (2019-01-25)


### Bug Fixes

* fix sourceMap path separator on Windows, default sourceRoot to "" ([#51](https://github.com/vuejs/component-compiler-utils/issues/51)) ([df32cd9](https://github.com/vuejs/component-compiler-utils/commit/df32cd9)), closes [#47](https://github.com/vuejs/component-compiler-utils/issues/47)



# [2.5.0](https://github.com/vuejs/component-compiler-utils/compare/v2.4.0...v2.5.0) (2019-01-08)


### Features

* add 'use' tag of SVG to 'transformAssetUrls' option as default ([#45](https://github.com/vuejs/component-compiler-utils/issues/45)) ([f4e3336](https://github.com/vuejs/component-compiler-utils/commit/f4e3336))



# [2.4.0](https://github.com/vuejs/component-compiler-utils/compare/v2.0.0...v2.4.0) (2019-01-02)


### Bug Fixes

* do not insert newline if style is already minified ([2603ee2](https://github.com/vuejs/component-compiler-utils/commit/2603ee2))
* Forward preprocessor options to less ([#25](https://github.com/vuejs/component-compiler-utils/issues/25)) ([3b19c1e](https://github.com/vuejs/component-compiler-utils/commit/3b19c1e)), closes [#24](https://github.com/vuejs/component-compiler-utils/issues/24)
* Move trim and scoped postcss plugins at the start of plugin list ([#36](https://github.com/vuejs/component-compiler-utils/issues/36)) ([0d52d86](https://github.com/vuejs/component-compiler-utils/commit/0d52d86))
* pin prettier version ([5f138a6](https://github.com/vuejs/component-compiler-utils/commit/5f138a6))
* remove space after selector when inserting scoped attribute ([5b299ed](https://github.com/vuejs/component-compiler-utils/commit/5b299ed)), closes [vue-loader/#1370](https://github.com/vuejs/component-compiler-utils/issues/1370)
* should work with variable named render (close [#23](https://github.com/vuejs/component-compiler-utils/issues/23)) ([273827b](https://github.com/vuejs/component-compiler-utils/commit/273827b))
* support standalone pseudo element selectors ([#33](https://github.com/vuejs/component-compiler-utils/issues/33)) ([d6cfbbf](https://github.com/vuejs/component-compiler-utils/commit/d6cfbbf))
* Typings for SFCDescriptor and SFCCustomBlock ([#29](https://github.com/vuejs/component-compiler-utils/issues/29)) ([bb09115](https://github.com/vuejs/component-compiler-utils/commit/bb09115))


### Features

* **scoped-css:** support leading >>> or /deep/ in selectors ([1a3b5bb](https://github.com/vuejs/component-compiler-utils/commit/1a3b5bb))
* add `prettify ` option ([#42](https://github.com/vuejs/component-compiler-utils/issues/42)) ([db3655b](https://github.com/vuejs/component-compiler-utils/commit/db3655b))
* Support `stylus` as `<style>` lang ([#18](https://github.com/vuejs/component-compiler-utils/issues/18)) ([986084e](https://github.com/vuejs/component-compiler-utils/commit/986084e))



<a name="2.3.1"></a>
## [2.3.1](https://github.com/vuejs/component-compiler-utils/compare/v2.3.0...v2.3.1) (2018-12-11)


### Bug Fixes

* do not insert newline if style is already minified ([2603ee2](https://github.com/vuejs/component-compiler-utils/commit/2603ee2))
* Move trim and scoped postcss plugins at the start of plugin list ([#36](https://github.com/vuejs/component-compiler-utils/issues/36)) ([0d52d86](https://github.com/vuejs/component-compiler-utils/commit/0d52d86))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/vuejs/component-compiler-utils/compare/v2.2.0...v2.3.0) (2018-10-22)


### Bug Fixes

* support standalone pseudo element selectors ([#33](https://github.com/vuejs/component-compiler-utils/issues/33)) ([d6cfbbf](https://github.com/vuejs/component-compiler-utils/commit/d6cfbbf))
* Typings for SFCDescriptor and SFCCustomBlock ([#29](https://github.com/vuejs/component-compiler-utils/issues/29)) ([bb09115](https://github.com/vuejs/component-compiler-utils/commit/bb09115))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/vuejs/component-compiler-utils/compare/v2.1.2...v2.2.0) (2018-08-16)


### Features

* **scoped-css:** support leading >>> or /deep/ in selectors ([1a3b5bb](https://github.com/vuejs/component-compiler-utils/commit/1a3b5bb))



<a name="2.1.2"></a>
## [2.1.2](https://github.com/vuejs/component-compiler-utils/compare/v2.1.1...v2.1.2) (2018-08-09)


### Bug Fixes

* pin prettier version ([5f138a6](https://github.com/vuejs/component-compiler-utils/commit/5f138a6))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/vuejs/component-compiler-utils/compare/v2.1.0...v2.1.1) (2018-08-07)


### Bug Fixes

* remove space after selector when inserting scoped attribute ([5b299ed](https://github.com/vuejs/component-compiler-utils/commit/5b299ed)), closes [vue-loader/#1370](https://github.com/vuejs/component-compiler-utils/issues/1370)



<a name="2.1.0"></a>
# [2.1.0](https://github.com/vuejs/component-compiler-utils/compare/v2.0.0...v2.1.0) (2018-07-03)


### Bug Fixes

* Forward preprocessor options to less ([#25](https://github.com/vuejs/component-compiler-utils/issues/25)) ([3b19c1e](https://github.com/vuejs/component-compiler-utils/commit/3b19c1e)), closes [#24](https://github.com/vuejs/component-compiler-utils/issues/24)
* should work with variable named render (close [#23](https://github.com/vuejs/component-compiler-utils/issues/23)) ([273827b](https://github.com/vuejs/component-compiler-utils/commit/273827b))


### Features

* Support `stylus` as `<style>` lang ([#18](https://github.com/vuejs/component-compiler-utils/issues/18)) ([986084e](https://github.com/vuejs/component-compiler-utils/commit/986084e))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/vuejs/component-compiler-utils/compare/v1.3.1...v2.0.0) (2018-06-03)


### Features

* Add async style compilation support ([#13](https://github.com/vuejs/component-compiler-utils/issues/13)) ([54464d6](https://github.com/vuejs/component-compiler-utils/commit/54464d6))
* allow/require compiler to be passed in for `parse` ([caa1538](https://github.com/vuejs/component-compiler-utils/commit/caa1538))


### BREAKING CHANGES

* vue template compiler must now be passed to `parse`
via options.



<a name="1.3.1"></a>
## [1.3.1](https://github.com/vuejs/component-compiler-utils/compare/v1.3.0...v1.3.1) (2018-05-28)


### Bug Fixes

* default parser was removed from prettier ([#15](https://github.com/vuejs/component-compiler-utils/issues/15)) ([598224d](https://github.com/vuejs/component-compiler-utils/commit/598224d))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/vuejs/component-compiler-utils/compare/v1.2.1...v1.3.0) (2018-05-22)


### Features

* include href for <image> in transformAssetUrls (close [#12](https://github.com/vuejs/component-compiler-utils/issues/12)) ([86fddc2](https://github.com/vuejs/component-compiler-utils/commit/86fddc2))
* Provide installation instructions on missing language preprocessors ([#10](https://github.com/vuejs/component-compiler-utils/issues/10)) ([97e772c](https://github.com/vuejs/component-compiler-utils/commit/97e772c))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/vuejs/component-compiler-utils/compare/v1.2.0...v1.2.1) (2018-04-26)


### Bug Fixes

* postcss import ([c845a80](https://github.com/vuejs/component-compiler-utils/commit/c845a80))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/vuejs/component-compiler-utils/compare/v1.1.0...v1.2.0) (2018-04-26)


### Bug Fixes

* compile only lib directory ([#6](https://github.com/vuejs/component-compiler-utils/issues/6)) ([4f787b3](https://github.com/vuejs/component-compiler-utils/commit/4f787b3))


### Features

* accept postcss options and plugins ([#7](https://github.com/vuejs/component-compiler-utils/issues/7)) ([1456e3d](https://github.com/vuejs/component-compiler-utils/commit/1456e3d))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/vuejs/component-compiler-utils/compare/9204f16...v1.1.0) (2018-04-24)


### Bug Fixes

* use more strict regex for matching css animation rules ([4644727](https://github.com/vuejs/component-compiler-utils/commit/4644727))


### Features

* adds stylus & less preprocessor ([#5](https://github.com/vuejs/component-compiler-utils/issues/5)) ([f2fd8b9](https://github.com/vuejs/component-compiler-utils/commit/f2fd8b9))
* preprocess scss/sass styles with node-sass ([#4](https://github.com/vuejs/component-compiler-utils/issues/4)) ([9204f16](https://github.com/vuejs/component-compiler-utils/commit/9204f16))



