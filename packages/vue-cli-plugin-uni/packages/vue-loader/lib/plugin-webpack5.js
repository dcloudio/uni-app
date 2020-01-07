const qs = require('querystring')
const id = 'vue-loader-plugin'
const NS = 'vue-loader'
const BasicEffectRulePlugin = require('webpack/lib/rules/BasicEffectRulePlugin')
const BasicMatcherRulePlugin = require('webpack/lib/rules/BasicMatcherRulePlugin')
const RuleSetCompiler = require('webpack/lib/rules/RuleSetCompiler')
const UseEffectRulePlugin = require('webpack/lib/rules/UseEffectRulePlugin')

const ruleSetCompiler = new RuleSetCompiler([
  new BasicMatcherRulePlugin('test', 'resource'),
  new BasicMatcherRulePlugin('include', 'resource'),
  new BasicMatcherRulePlugin('exclude', 'resource', true),
  new BasicMatcherRulePlugin('resource'),
  new BasicMatcherRulePlugin('conditions'),
  new BasicMatcherRulePlugin('resourceQuery'),
  new BasicMatcherRulePlugin('realResource'),
  new BasicMatcherRulePlugin('issuer'),
  new BasicMatcherRulePlugin('compiler'),
  new BasicEffectRulePlugin('type'),
  new BasicEffectRulePlugin('sideEffects'),
  new BasicEffectRulePlugin('parser'),
  new BasicEffectRulePlugin('resolve'),
  new UseEffectRulePlugin()
])

class VueLoaderPlugin {
  apply (compiler) {
    // add NS marker so that the loader can detect and report missing plugin
    compiler.hooks.compilation.tap(id, compilation => {
      const normalModuleLoader = require('webpack/lib/NormalModule').getCompilationHooks(compilation).loader
      normalModuleLoader.tap(id, loaderContext => {
        loaderContext[NS] = true
      })
    })

    const rules = compiler.options.module.rules
    let rawVueRules
    let vueRules = []

    for (const rawRule of rules) {
      // skip the `include` check when locating the vue rule
      const clonedRawRule = Object.assign({}, rawRule)
      delete clonedRawRule.include

      const ruleSet = ruleSetCompiler.compile([{
        rules: [clonedRawRule]
      }])
      vueRules = ruleSet.exec({
        resource: 'foo.vue'
      })

      if (!vueRules.length) {
        vueRules = ruleSet.exec({
          resource: 'foo.vue.html'
        })
      }
      if (vueRules.length > 0) {
        if (rawRule.oneOf) {
          throw new Error(
            `[VueLoaderPlugin Error] vue-loader 15 currently does not support vue rules with oneOf.`
          )
        }
        rawVueRules = rawRule
        break
      }
    }
    if (!vueRules.length) {
      throw new Error(
        `[VueLoaderPlugin Error] No matching rule for .vue files found.\n` +
        `Make sure there is at least one root-level rule that matches .vue or .vue.html files.`
      )
    }

    // get the normlized "use" for vue files
    const vueUse = vueRules.filter(rule => rule.type === 'use').map(rule => rule.value)

    // get vue-loader options
    const vueLoaderUseIndex = vueUse.findIndex(u => {
      return /^vue-loader|(\/|\\|@)vue-loader/.test(u.loader)
    })

    if (vueLoaderUseIndex < 0) {
      throw new Error(
        `[VueLoaderPlugin Error] No matching use for vue-loader is found.\n` +
        `Make sure the rule matching .vue files include vue-loader in its use.`
      )
    }

    // make sure vue-loader options has a known ident so that we can share
    // options by reference in the template-loader by using a ref query like
    // template-loader??vue-loader-options
    const vueLoaderUse = vueUse[vueLoaderUseIndex]
    vueLoaderUse.ident = 'vue-loader-options'
    vueLoaderUse.options = vueLoaderUse.options || {}

    // for each user rule (expect the vue rule), create a cloned rule
    // that targets the corresponding language blocks in *.vue files.
    const refs = new Map()
    const clonedRules = rules
      .filter(r => r !== rawVueRules)
      .map((rawRule) => cloneRule(rawRule, refs))

    // fix conflict with config.loader and config.options when using config.use
    delete rawVueRules.loader
    delete rawVueRules.options
    rawVueRules.use = vueUse

    // global pitcher (responsible for injecting template compiler loader & CSS
    // post loader)
    const pitcher = {
      loader: require.resolve('./loaders/pitcher'),
      resourceQuery: query => {
        const parsed = qs.parse(query.slice(1))
        return parsed.vue != null
      },
      options: {
        cacheDirectory: vueLoaderUse.options.cacheDirectory,
        cacheIdentifier: vueLoaderUse.options.cacheIdentifier
      }
    }

    // replace original rules
    compiler.options.module.rules = [
      pitcher,
      ...clonedRules,
      ...rules
    ]
  }
}

function cloneRule (rawRule, refs) {
  const rules = ruleSetCompiler.compileRules('ruleSet', [{
    rules: [rawRule]
  }], refs)
  let currentResource

  const conditions = rules[0].rules
    .map(rule => rule.conditions)
    // shallow flat
    .reduce((prev, next) => prev.concat(next), [])

  // do not process rule with enforce
  if (!rawRule.enforce) {
    const ruleUse = rules[0].rules
      .map(rule => rule.effects
        .filter(effect => effect.type === 'use')
        .map(effect => effect.value)
      )
      // shallow flat
      .reduce((prev, next) => prev.concat(next), [])

    // fix conflict with config.loader and config.options when using config.use
    delete rawRule.loader
    delete rawRule.options
    rawRule.use = ruleUse
  }

  const res = Object.assign({}, rawRule, {
    resource: resources => {
      currentResource = resources
      return true
    },
    resourceQuery: query => {
      const parsed = qs.parse(query.slice(1))
      if (parsed.vue == null) {
        return false
      }
      if (!conditions) {
        return false
      }
      const fakeResourcePath = `${currentResource}.${parsed.lang}`
      for (const condition of conditions) {
        // add support for resourceQuery
        const request = condition.property === 'resourceQuery' ? query : fakeResourcePath
        if (condition && !condition.fn(request)) {
          return false
        }
      }
      return true
    }
  })

  delete res.test

  if (rawRule.oneOf) {
    res.oneOf = rawRule.oneOf.map(rule => cloneRule(rule, refs))
  }

  return res
}

VueLoaderPlugin.NS = NS
module.exports = VueLoaderPlugin
