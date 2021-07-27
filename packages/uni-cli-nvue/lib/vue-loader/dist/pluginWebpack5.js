"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qs = require("querystring");
const id = 'vue-loader-plugin';
const NS = 'vue-loader';
const NormalModule = require('webpack/lib/NormalModule');
const BasicEffectRulePlugin = require('webpack/lib/rules/BasicEffectRulePlugin');
const BasicMatcherRulePlugin = require('webpack/lib/rules/BasicMatcherRulePlugin');
const DescriptionDataMatcherRulePlugin = require('webpack/lib/rules/DescriptionDataMatcherRulePlugin');
const UseEffectRulePlugin = require('webpack/lib/rules/UseEffectRulePlugin');
const RuleSetCompiler = require('webpack/lib/rules/RuleSetCompiler');
const ruleSetCompiler = new RuleSetCompiler([
    new BasicMatcherRulePlugin('test', 'resource'),
    new BasicMatcherRulePlugin('mimetype'),
    new BasicMatcherRulePlugin('dependency'),
    new BasicMatcherRulePlugin('include', 'resource'),
    new BasicMatcherRulePlugin('exclude', 'resource', true),
    new BasicMatcherRulePlugin('conditions'),
    new BasicMatcherRulePlugin('resource'),
    new BasicMatcherRulePlugin('resourceQuery'),
    new BasicMatcherRulePlugin('resourceFragment'),
    new BasicMatcherRulePlugin('realResource'),
    new BasicMatcherRulePlugin('issuer'),
    new BasicMatcherRulePlugin('compiler'),
    new DescriptionDataMatcherRulePlugin(),
    new BasicEffectRulePlugin('type'),
    new BasicEffectRulePlugin('sideEffects'),
    new BasicEffectRulePlugin('parser'),
    new BasicEffectRulePlugin('resolve'),
    new BasicEffectRulePlugin('generator'),
    new UseEffectRulePlugin(),
]);
class VueLoaderPlugin {
    apply(compiler) {
        // add NS marker so that the loader can detect and report missing plugin
        compiler.hooks.compilation.tap(id, (compilation) => {
            NormalModule.getCompilationHooks(compilation).loader.tap(id, (loaderContext) => {
                loaderContext[NS] = true;
            });
        });
        const rules = compiler.options.module.rules;
        let rawVueRule;
        let vueRules = [];
        for (const rawRule of rules) {
            // skip rules with 'enforce'. eg. rule for eslint-loader
            if (rawRule.enforce) {
                continue;
            }
            vueRules = match(rawRule, 'foo.vue');
            if (!vueRules.length) {
                vueRules = match(rawRule, 'foo.vue.html');
            }
            if (vueRules.length > 0) {
                if (rawRule.oneOf) {
                    throw new Error(`[VueLoaderPlugin Error] vue-loader currently does not support vue rules with oneOf.`);
                }
                rawVueRule = rawRule;
                break;
            }
        }
        if (!vueRules.length) {
            throw new Error(`[VueLoaderPlugin Error] No matching rule for .vue files found.\n` +
                `Make sure there is at least one root-level rule that matches .vue or .vue.html files.`);
        }
        // get the normlized "use" for vue files
        const vueUse = vueRules
            .filter((rule) => rule.type === 'use')
            .map((rule) => rule.value);
        // get vue-loader options
        const vueLoaderUseIndex = vueUse.findIndex((u) => {
            // FIXME: this code logic is incorrect when project paths starts with `vue-loader-something`
            return /^vue-loader|(\/|\\|@)vue-loader/.test(u.loader);
        });
        if (vueLoaderUseIndex < 0) {
            throw new Error(`[VueLoaderPlugin Error] No matching use for vue-loader is found.\n` +
                `Make sure the rule matching .vue files include vue-loader in its use.`);
        }
        // make sure vue-loader options has a known ident so that we can share
        // options by reference in the template-loader by using a ref query like
        // template-loader??vue-loader-options
        const vueLoaderUse = vueUse[vueLoaderUseIndex];
        const vueLoaderOptions = (vueLoaderUse.options =
            vueLoaderUse.options || {});
        // for each user rule (expect the vue rule), create a cloned rule
        // that targets the corresponding language blocks in *.vue files.
        const refs = new Map();
        const clonedRules = rules
            .filter((r) => r !== rawVueRule)
            .map((rawRule) => cloneRule(rawRule, refs, langBlockRuleCheck, langBlockRuleResource));
        // fix conflict with config.loader and config.options when using config.use
        delete rawVueRule.loader;
        delete rawVueRule.options;
        rawVueRule.use = vueUse;
        // rule for template compiler
        const templateCompilerRule = {
            loader: require.resolve('./templateLoader'),
            resourceQuery: (query) => {
                if (!query) {
                    return false;
                }
                const parsed = qs.parse(query.slice(1));
                return parsed.vue != null && parsed.type === 'template';
            },
            options: vueLoaderOptions,
        };
        // for each rule that matches plain .js files, also create a clone and
        // match it against the compiled template code inside *.vue files, so that
        // compiled vue render functions receive the same treatment as user code
        // (mostly babel)
        const jsRulesForRenderFn = rules
            .filter((r) => r !== rawVueRule && match(r, 'test.js').length > 0)
            .map((rawRule) => cloneRule(rawRule, refs, jsRuleCheck, jsRuleResource));
        // global pitcher (responsible for injecting template compiler loader & CSS
        // post loader)
        const pitcher = {
            loader: require.resolve('./pitcher'),
            resourceQuery: (query) => {
                if (!query) {
                    return false;
                }
                const parsed = qs.parse(query.slice(1));
                return parsed.vue != null;
            },
        };
        // replace original rules
        compiler.options.module.rules = [
            pitcher,
            ...jsRulesForRenderFn,
            templateCompilerRule,
            ...clonedRules,
            ...rules,
        ];
    }
}
VueLoaderPlugin.NS = NS;
const matcherCache = new WeakMap();
function match(rule, fakeFile) {
    let ruleSet = matcherCache.get(rule);
    if (!ruleSet) {
        // skip the `include` check when locating the vue rule
        const clonedRawRule = Object.assign({}, rule);
        delete clonedRawRule.include;
        ruleSet = ruleSetCompiler.compile([clonedRawRule]);
        matcherCache.set(rule, ruleSet);
    }
    return ruleSet.exec({
        resource: fakeFile,
    });
}
const langBlockRuleCheck = (query, rule) => {
    return (query.type === 'custom' || !rule.conditions.length || query.lang != null);
};
const langBlockRuleResource = (query, resource) => `${resource}.${query.lang}`;
const jsRuleCheck = (query) => {
    return query.type === 'template';
};
const jsRuleResource = (query, resource) => `${resource}.js`;
let uid = 0;
function cloneRule(rawRule, refs, ruleCheck, ruleResource) {
    const compiledRule = ruleSetCompiler.compileRule(`clonedRuleSet-${++uid}`, rawRule, refs);
    // do not process rule with enforce
    if (!rawRule.enforce) {
        const ruleUse = compiledRule.effects
            .filter((effect) => effect.type === 'use')
            .map((effect) => effect.value);
        // fix conflict with config.loader and config.options when using config.use
        delete rawRule.loader;
        delete rawRule.options;
        rawRule.use = ruleUse;
    }
    let currentResource;
    const res = Object.assign(Object.assign({}, rawRule), { resource: (resources) => {
            currentResource = resources;
            return true;
        }, resourceQuery: (query) => {
            if (!query) {
                return false;
            }
            const parsed = qs.parse(query.slice(1));
            if (parsed.vue == null) {
                return false;
            }
            if (!ruleCheck(parsed, compiledRule)) {
                return false;
            }
            const fakeResourcePath = ruleResource(parsed, currentResource);
            for (const condition of compiledRule.conditions) {
                // add support for resourceQuery
                const request = condition.property === 'resourceQuery' ? query : fakeResourcePath;
                if (condition && !condition.fn(request)) {
                    return false;
                }
            }
            return true;
        } });
    delete res.test;
    if (rawRule.rules) {
        res.rules = rawRule.rules.map((rule) => cloneRule(rule, refs, ruleCheck, ruleResource));
    }
    if (rawRule.oneOf) {
        res.oneOf = rawRule.oneOf.map((rule) => cloneRule(rule, refs, ruleCheck, ruleResource));
    }
    return res;
}
exports.default = VueLoaderPlugin;
