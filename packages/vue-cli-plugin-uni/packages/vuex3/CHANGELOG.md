## [3.6.2](https://github.com/vuejs/vuex/compare/v3.6.1...v3.6.2) (2021-01-26)

### Bug Fixes

* **build:** fix wrong path name for the export module ([679313b](https://github.com/vuejs/vuex/commit/679313bf5e4de066f340a06ef9bfe08d1536fadd))

## [3.6.1](https://github.com/vuejs/vuex/compare/v3.6.0...v3.6.1) (2021-01-26)

### Bug Fixes

* fix tree shaking notworking in webpack bundle ([#1906](https://github.com/vuejs/vuex/issues/1906)) ([1dc2d1f](https://github.com/vuejs/vuex/commit/1dc2d1f21de42138053ea3281dde05487642a76d))

# [3.6.0](https://github.com/vuejs/vuex/compare/v3.5.1...v3.6.0) (2020-11-25)

### Bug Fixes

* stop throwing an error on `hasModule` when parent does not exists ([#1850](https://github.com/vuejs/vuex/issues/1850)) ([#1851](https://github.com/vuejs/vuex/issues/1851)) ([12aabe4](https://github.com/vuejs/vuex/commit/12aabe4cc470916d40691097dcb95badb8212f5c))

### Features

* **types:** adding logger type for logger plugin ([#1853](https://github.com/vuejs/vuex/issues/1853)) ([cb3198d](https://github.com/vuejs/vuex/commit/cb3198d5998bdb11ef05dfa5ef98d5c5fa873089))
* **build:** enable named esm module import on node.js >= 14 ([#1872](https://github.com/vuejs/vuex/issues/1872)) ([acddab2](https://github.com/vuejs/vuex/commit/acddab20769d1bb6125f2da78ac47561c682fc98))

## [3.5.1](https://github.com/vuejs/vuex/compare/v3.5.0...v3.5.1) (2020-06-29)


### Bug Fixes

* **types:** add missing `logger.d.ts` file to the package ([#1789](https://github.com/vuejs/vuex/issues/1789)) ([a477334](https://github.com/vuejs/vuex/commit/a477334b909913f6a92bdbedcf4a3016a62eab7a))
* warn when unregistering non existing module ([#1786](https://github.com/vuejs/vuex/issues/1786)) ([7cec79d](https://github.com/vuejs/vuex/commit/7cec79d339b874ec41f35891c891dfd27460c1d3))



# [3.5.0](https://github.com/vuejs/vuex/compare/v3.4.0...v3.5.0) (2020-06-29)


### Features

* include logger plugin to the core export ([#1783](https://github.com/vuejs/vuex/issues/1783)) ([04e2bd8](https://github.com/vuejs/vuex/commit/04e2bd8b3509c67398a6fe73a3d53660069feca8))



# [3.4.0](https://github.com/vuejs/vuex/compare/v3.3.0...v3.4.0) (2020-05-11)


### Features

* Allow action subscribers to catch rejections. ([#1740](https://github.com/vuejs/vuex/issues/1740)) ([6ebbe64](https://github.com/vuejs/vuex/commit/6ebbe64c5821d19e55a41dc8b1d81cfce6cbd195)), closes [#1489](https://github.com/vuejs/vuex/issues/1489) [#1558](https://github.com/vuejs/vuex/issues/1558) [#1625](https://github.com/vuejs/vuex/issues/1625)



# [3.3.0](https://github.com/vuejs/vuex/compare/v3.2.0...v3.3.0) (2020-04-25)


### Bug Fixes

* Prepend devtool handler ([#1358](https://github.com/vuejs/vuex/issues/1358)) ([a39d076](https://github.com/vuejs/vuex/commit/a39d0767e4041cdd5cf8050774106c01d39024e0)), closes [vuejs/vue-devtools#678](https://github.com/vuejs/vue-devtools/issues/678)
* **types:** Add `devtools` to store options type ([#1478](https://github.com/vuejs/vuex/issues/1478)) ([38c11dc](https://github.com/vuejs/vuex/commit/38c11dcbaea7d7e661a1623cabb5aef7c6e47ba7))


### Features

* Add `prepend` option for `subscribe` and `subscribeAction` ([#1358](https://github.com/vuejs/vuex/issues/1358)) ([a39d076](https://github.com/vuejs/vuex/commit/a39d0767e4041cdd5cf8050774106c01d39024e0))
* **logger:** `createLogger` can optionally log actions ([#987](https://github.com/vuejs/vuex/issues/987)) ([18be128](https://github.com/vuejs/vuex/commit/18be128ad933d1fca6da05c060f7664ce0c819ae))



# [3.2.0](https://github.com/vuejs/vuex/compare/v3.1.3...v3.2.0) (2020-04-19)


### Features

* add Store#hasModule(path) API ([#834](https://github.com/vuejs/vuex/issues/834)) ([d65d142](https://github.com/vuejs/vuex/commit/d65d14276e87aca17cfbd3fbf4af9e8dbb808f24))



## [3.1.3](https://github.com/vuejs/vuex/compare/v3.1.2...v3.1.3) (2020-03-09)


### Bug Fixes

* Prevent invalidating subscription iterator  ([#1438](https://github.com/vuejs/vuex/issues/1438)) ([e012653](https://github.com/vuejs/vuex/commit/e0126533301febf66072f1865cf9a77778cf2176))



## [3.1.2](https://github.com/vuejs/vuex/compare/v3.1.1...v3.1.2) (2019-11-10)


### Bug Fixes

* tweak mapping helper warning message ([#1641](https://github.com/vuejs/vuex/issues/1641)) ([e60bc76](https://github.com/vuejs/vuex/commit/e60bc76154bb05c12b24342617b946d9a6e2f476))
* **types:** avoid broadening vue instance type when using map helpers ([#1639](https://github.com/vuejs/vuex/issues/1639)) ([9a96720](https://github.com/vuejs/vuex/commit/9a9672050bcfee198c379069ec0e1b03ca6cb965))
* add warnings when the different namespaced modules has the same names… ([#1554](https://github.com/vuejs/vuex/issues/1554)) ([91f3e69](https://github.com/vuejs/vuex/commit/91f3e69ed9e290cf91f8885c6d5ae2c97fa7ab81))
* Should vuex mapState print error message [#1093](https://github.com/vuejs/vuex/issues/1093) ([#1297](https://github.com/vuejs/vuex/issues/1297)) ([e5ca2d5](https://github.com/vuejs/vuex/commit/e5ca2d52e89a126bd48bd8a6003be77379960ea9))
* Warn about conflicts between state and module ([#1365](https://github.com/vuejs/vuex/issues/1365)) ([538ee58](https://github.com/vuejs/vuex/commit/538ee5803bbca2fc8077208fb30c8d56d8be5cae))
* **docs:** Clearify state object type ([#1601](https://github.com/vuejs/vuex/issues/1601)) ([de06f76](https://github.com/vuejs/vuex/commit/de06f76380e7429489c0eb15acc8e0b34a383860))


### Performance Improvements

* Implementing a cache for the gettersProxy object creation ([#1546](https://github.com/vuejs/vuex/issues/1546)) ([4003382](https://github.com/vuejs/vuex/commit/40033825b7259c2e9b702bdf94e0b24ed4511d7c))



## [3.1.1](https://github.com/vuejs/vuex/compare/v3.1.0...v3.1.1) (2019-05-08)


### Bug Fixes

* Memory leak happening while using registerModule/u… ([#1508](https://github.com/vuejs/vuex/issues/1508)) ([cb9986a](https://github.com/vuejs/vuex/commit/cb9986ae5a62e002a1d876e881ee5f31dd410888)), closes [issue#1507](https://github.com/issue/issues/1507)
* **types:** Make mutation and action payload optional in definition file ([#1517](https://github.com/vuejs/vuex/issues/1517)) ([0e109e2](https://github.com/vuejs/vuex/commit/0e109e2a38dafdc0c2bd6bd3892bc66cfe252b16)), closes [#1491](https://github.com/vuejs/vuex/issues/1491)


### Features

* **devtool:** allow usage in non-browser environments ([#1404](https://github.com/vuejs/vuex/issues/1404)) ([665455f](https://github.com/vuejs/vuex/commit/665455f8daf8512e7adbf63c2842bc0b1e39efdb))
* **esm build:** build ES modules for browser ([#1533](https://github.com/vuejs/vuex/issues/1533)) ([d7c7f98](https://github.com/vuejs/vuex/commit/d7c7f9844831f98c5c9aaca213746c4ccc5d6929))



# [3.1.0](https://github.com/vuejs/vuex/compare/v3.0.1...v3.1.0) (2019-01-17)


### Bug Fixes

* **types:** add helpers to default export type declaration as in sources ([#1408](https://github.com/vuejs/vuex/issues/1408)) ([404d0de](https://github.com/vuejs/vuex/commit/404d0de9531322a1a462e53dfd858d20f0bd99af))
* **types:** add type annotation for the context of actions ([#1322](https://github.com/vuejs/vuex/issues/1322)) ([d1b5c66](https://github.com/vuejs/vuex/commit/d1b5c66961ab53e0172cbc706ff616227bcb5c77))
* **types:** allow a function type for root `state` option ([#1132](https://github.com/vuejs/vuex/issues/1132)) ([d39791b](https://github.com/vuejs/vuex/commit/d39791bd05830b1889705761ef5779449e35e97f))
* Add key to v-for ([#1369](https://github.com/vuejs/vuex/issues/1369)) ([a9bd047](https://github.com/vuejs/vuex/commit/a9bd047ea147cacfcb4003946aeebccd2c5e1e4e))
* avoid to call root state function twice ([#1034](https://github.com/vuejs/vuex/issues/1034)) ([86677eb](https://github.com/vuejs/vuex/commit/86677ebcbfaecf712f339b73a568150fc9fd5f5e))
* fix [#1032](https://github.com/vuejs/vuex/issues/1032), relax vue typing in helpers ([#1044](https://github.com/vuejs/vuex/issues/1044)) ([7c7ed1d](https://github.com/vuejs/vuex/commit/7c7ed1d37ee8a5058082d763d80529e5fef86a0b))


### Features

* add ability to turn off devtools on vuex by passing an off options ([#1407](https://github.com/vuejs/vuex/issues/1407)) ([be75d41](https://github.com/vuejs/vuex/commit/be75d41cf54d50177a7db7e9218e8d1c820ae830))
* ensure errors in action subscribers do not break actions ([acd7249](https://github.com/vuejs/vuex/commit/acd72492eaffff3661f75860a3d7ab37b73c3906))


### Reverts

* Revert "Update util find (#1205)" (fix #1286) ([273bf86](https://github.com/vuejs/vuex/commit/273bf86b330ee580a73176c300919996b7d9c2c3)), closes [#1286](https://github.com/vuejs/vuex/issues/1286)



## [3.0.1](https://github.com/vuejs/vuex/compare/v3.0.0...v3.0.1) (2017-11-01)



# [3.0.0](https://github.com/vuejs/vuex/compare/v2.5.0...v3.0.0) (2017-10-11)


### Features

* **typings:** adapt to the new Vue typings ([#909](https://github.com/vuejs/vuex/issues/909)) ([65dbfec](https://github.com/vuejs/vuex/commit/65dbfec40d5fe7aac05aab333c7b70768997ca7f))


### BREAKING CHANGES

* **typings:** It is no longer compatible with the old Vue typings

* chore(package): bump typescript and vue core typings

* chore: bump vue

* Update package.json



# [2.5.0](https://github.com/vuejs/vuex/compare/v2.4.1...v2.5.0) (2017-10-11)


### Bug Fixes

* initialize root state as an empty object if state function returns no value ([#927](https://github.com/vuejs/vuex/issues/927)) ([0e9756b](https://github.com/vuejs/vuex/commit/0e9756b93c5de8e03286d93f0b50af5f8dfd3bac))


### Features

* add logger plugin logger config support ([#771](https://github.com/vuejs/vuex/issues/771)) ([804c3bb](https://github.com/vuejs/vuex/commit/804c3bbd2e60f11412f5a7cb7694969f8f6c215c))
* preserve state with registerModule ([#837](https://github.com/vuejs/vuex/issues/837)) ([4c1841e](https://github.com/vuejs/vuex/commit/4c1841e79e63ca0ca95d0cc1b218fde258f23c20))
* root actions in namespaced modules ([#941](https://github.com/vuejs/vuex/issues/941)) ([73189eb](https://github.com/vuejs/vuex/commit/73189eb35509de7d49bd2b577900ad560d37dcb0))
* subscribeAction ([#960](https://github.com/vuejs/vuex/issues/960)) ([a8326b1](https://github.com/vuejs/vuex/commit/a8326b1bd77158e7e5903eed4cc98b52599e3dbd))



## [2.4.1](https://github.com/vuejs/vuex/compare/v2.4.0...v2.4.1) (2017-09-27)


### Bug Fixes

* allow installation on extended Vue copies ([c87b72f](https://github.com/vuejs/vuex/commit/c87b72f2ff7f65e708c4b59a752ef234d0f28d1f))
* link to details of mutations in components ([#930](https://github.com/vuejs/vuex/issues/930)) ([e82782b](https://github.com/vuejs/vuex/commit/e82782ba81c398dd5b78a195257a9d1c3a6d85ef))
* move auto installation code into the store constructor ([#914](https://github.com/vuejs/vuex/issues/914)) ([852ac43](https://github.com/vuejs/vuex/commit/852ac43ea4813ecaeb1e5106c4a29c74e57c2fd7))


### Features

* allow to passing functions in mapActions/mapMutations (fix [#750](https://github.com/vuejs/vuex/issues/750)) ([#924](https://github.com/vuejs/vuex/issues/924)) ([be15f32](https://github.com/vuejs/vuex/commit/be15f32c0077d8fe9bafa38c1b319b655cfd5f86))



# [2.4.0](https://github.com/vuejs/vuex/compare/v2.3.0...v2.4.0) (2017-08-29)


### Bug Fixes

* **typings:** watch() returns an unwatch function ([#922](https://github.com/vuejs/vuex/issues/922)) ([a4bd081](https://github.com/vuejs/vuex/commit/a4bd0816838cc4a843d833363b9aa412c1256e5e))
* add missing typings and docs of createNamespacedHelpers ([#910](https://github.com/vuejs/vuex/issues/910)) ([7ad573b](https://github.com/vuejs/vuex/commit/7ad573bba59d23dbd66e3a25e6614296aeb98d42))


### Features

* **store:** bind mutation and action handlers to store ([#872](https://github.com/vuejs/vuex/issues/872)) ([67da622](https://github.com/vuejs/vuex/commit/67da6225552e46266ed059c7f0d0128294cd08ed))


### Performance Improvements

* do not connect devtools if Vue.config.devtools == false ([#881](https://github.com/vuejs/vuex/issues/881)) ([dd7f817](https://github.com/vuejs/vuex/commit/dd7f8178d93e6121a447c410b9c652f40cd80937))



# [2.3.0](https://github.com/vuejs/vuex/compare/v2.2.1...v2.3.0) (2017-04-13)


* Add '-loader' suffix to webpack config (#722) ([84b4634](https://github.com/vuejs/vuex/commit/84b463438ea4133f7f326dc18212e3d4b7b5a177)), closes [#722](https://github.com/vuejs/vuex/issues/722)


### BREAKING CHANGES

* It's no longer allowed to omit the '-loader' suffix when using loaders. You need to specify 'babel-loader' instead of 'babel'.
My version of webpack: 2.2.0-rc.3
Adding the '-loader' suffix fixed the problem.
Not sure though how safe it is to use 'babel-loader' instead of 'babel' with previous webpack versions...



## [2.2.1](https://github.com/vuejs/vuex/compare/v2.2.0...v2.2.1) (2017-02-26)



# [2.2.0](https://github.com/vuejs/vuex/compare/v2.1.2...v2.2.0) (2017-02-26)



## [2.1.2](https://github.com/vuejs/vuex/compare/v2.1.1...v2.1.2) (2017-02-06)


### Reverts

* Revert "Update modules.md (#534)" ([5e145b3](https://github.com/vuejs/vuex/commit/5e145b3a2d45977b52cfff41b3b663f629d67e74)), closes [#534](https://github.com/vuejs/vuex/issues/534)



## [2.1.1](https://github.com/vuejs/vuex/compare/v2.1.0...v2.1.1) (2016-12-17)



# [2.1.0](https://github.com/vuejs/vuex/compare/v2.0.0...v2.1.0) (2016-12-16)



# [2.0.0](https://github.com/vuejs/vuex/compare/v2.0.0-rc.6...v2.0.0) (2016-09-30)



# [2.0.0-rc.6](https://github.com/vuejs/vuex/compare/v2.0.0-rc.5...v2.0.0-rc.6) (2016-09-24)



# [2.0.0-rc.5](https://github.com/vuejs/vuex/compare/v2.0.0-rc.4...v2.0.0-rc.5) (2016-08-15)



# [2.0.0-rc.4](https://github.com/vuejs/vuex/compare/v2.0.0-rc.3...v2.0.0-rc.4) (2016-08-05)



# [2.0.0-rc.3](https://github.com/vuejs/vuex/compare/v2.0.0-rc.1...v2.0.0-rc.3) (2016-07-11)



# [2.0.0-rc.1](https://github.com/vuejs/vuex/compare/v1.0.0-rc...v2.0.0-rc.1) (2016-07-05)



# [1.0.0-rc](https://github.com/vuejs/vuex/compare/v0.8.2...v1.0.0-rc) (2016-07-01)



## [0.8.2](https://github.com/vuejs/vuex/compare/v0.8.1...v0.8.2) (2016-06-28)



## [0.8.1](https://github.com/vuejs/vuex/compare/v0.8.0...v0.8.1) (2016-06-28)



# [0.8.0](https://github.com/vuejs/vuex/compare/v0.7.1...v0.8.0) (2016-06-23)



## [0.7.1](https://github.com/vuejs/vuex/compare/v0.7.0...v0.7.1) (2016-06-22)



# [0.7.0](https://github.com/vuejs/vuex/compare/v0.6.3...v0.7.0) (2016-06-21)



## [0.6.3](https://github.com/vuejs/vuex/compare/v0.6.2...v0.6.3) (2016-04-23)



## [0.6.2](https://github.com/vuejs/vuex/compare/v0.6.1...v0.6.2) (2016-03-08)



## [0.6.1](https://github.com/vuejs/vuex/compare/v0.6.0...v0.6.1) (2016-03-07)



# [0.6.0](https://github.com/vuejs/vuex/compare/v0.5.1...v0.6.0) (2016-03-07)



## [0.5.1](https://github.com/vuejs/vuex/compare/v0.5.0...v0.5.1) (2016-03-04)



# [0.5.0](https://github.com/vuejs/vuex/compare/v0.4.2...v0.5.0) (2016-03-04)



## [0.4.2](https://github.com/vuejs/vuex/compare/v0.4.1...v0.4.2) (2016-03-02)



## [0.4.1](https://github.com/vuejs/vuex/compare/v0.4.0...v0.4.1) (2016-03-01)



# [0.4.0](https://github.com/vuejs/vuex/compare/v0.3.0...v0.4.0) (2016-03-01)



# [0.3.0](https://github.com/vuejs/vuex/compare/4a22523b8cf4a1954ec95a0083ddef6c085f4905...v0.3.0) (2016-02-16)


### Bug Fixes

* **api:** fix typo ([4a22523](https://github.com/vuejs/vuex/commit/4a22523b8cf4a1954ec95a0083ddef6c085f4905))
* **forms:** fix typo ([50094a6](https://github.com/vuejs/vuex/commit/50094a604f32d00ceb784a3fbf07c82c502faca2))



