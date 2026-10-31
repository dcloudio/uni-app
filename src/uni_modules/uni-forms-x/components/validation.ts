import LegacyValidator from './uni-forms/validate.js'
import { normalizePath, objectKeys, pathKey } from './common'
import type {
	UniFormIssue,
	UniFormPath,
	UniFormPathToken,
	UniFormRule,
	UniFormRuleGroup,
	UniFormRules,
	UniFormTrigger
} from './common'

const defaultMessage = '验证错误'

function isUnsafeRuleKey(key: string): boolean {
	return key == '__proto__' || key == 'prototype' || key == 'constructor'
}

function groupRules(group: UniFormRuleGroup | UniFormRule[] | null | undefined): UniFormRule[] {
	if (Array.isArray(group)) {
		return group
	}
	return group?.rules ?? []
}

function cloneLegacyRule(rule: UniFormRule): UniFormRule {
	const result: any = {}
	if (rule == null || typeof rule != 'object') {
		return result as UniFormRule
	}
	objectKeys(rule).forEach((key: string) => {
		if (!isUnsafeRuleKey(key)) {
			result[key] = (rule as any)[key]
		}
	})
	return result as UniFormRule
}

function cloneLegacyGroup(group: UniFormRuleGroup | UniFormRule[] | null | undefined): UniFormRuleGroup | UniFormRule[] {
	if (Array.isArray(group)) {
		return group.map((rule: UniFormRule): UniFormRule => cloneLegacyRule(rule))
	}
	const result: any = {}
	if (group != null && typeof group == 'object') {
		objectKeys(group).forEach((key: string) => {
			if (isUnsafeRuleKey(key) || key == 'rules') {
				return
			}
			result[key] = (group as any)[key]
		})
	}
	result.rules = groupRules(group).map((rule: UniFormRule): UniFormRule => cloneLegacyRule(rule))
	return result as UniFormRuleGroup
}

export function normalizeLegacyValue(value: any, group: UniFormRuleGroup | UniFormRule[] | null | undefined): any {
	const rules = groupRules(group)
	const numericRule = rules.find((rule: UniFormRule): boolean =>
		rule.format == 'int' || rule.format == 'double' || rule.format == 'number' || rule.format == 'timestamp'
	)
	if (numericRule != null) {
		if (!value && value !== 0) {
			value = null
		} else {
			const numberValue = Number(value)
			if (!isNaN(numberValue)) {
				value = numberValue
			}
		}
	}
	const booleanRule = rules.find((rule: UniFormRule): boolean => rule.format == 'boolean' || rule.format == 'bool')
	if (booleanRule != null && typeof value != 'boolean') {
		value = normalizeBooleanValue(value)
	}
	return value
}

/**
 * 识别常见的布尔写法。空值仍写成 false，和原来的 DB Schema 写入约定一致。
 * 无法识别的字符串保留原值，交给校验器报类型错误，不再静默变成 false。
 * @param value 待转换的值
 * @returns 布尔值，或无法识别时的原值
 */
function normalizeBooleanValue(value: any): any {
	if (value === 'true' || value === 1 || value === '1') {
		return true
	}
	if (value === 'false' || value === 0 || value === '0' || value == null || value === '') {
		return false
	}
	return value
}

function triggerForRule(rule: UniFormRule): UniFormTrigger | null {
	return rule.validateTrigger || rule.trigger || null
}

function groupForTrigger(
	group: UniFormRuleGroup | UniFormRule[] | null | undefined,
	trigger: UniFormTrigger
): UniFormRuleGroup | UniFormRule[] {
	const rules = groupRules(group)
	if (trigger == 'submit') {
		return group ?? []
	}
	const filtered = rules.filter((rule: UniFormRule): boolean => {
		const configured = triggerForRule(rule)
		return configured == null || configured == trigger
	})
	if (Array.isArray(group)) {
		return filtered
	}
	const result: any = {}
	if (group != null && !Array.isArray(group)) {
		objectKeys(group).forEach((key: string) => {
			if (!isUnsafeRuleKey(key)) {
				result[key] = group[key]
			}
		})
	}
	result.rules = filtered
	return result
}

export function hasLegacyRulesForTrigger(
	group: UniFormRuleGroup | UniFormRule[] | null | undefined,
	trigger: UniFormTrigger
): boolean {
	return groupRules(groupForTrigger(group, trigger)).length > 0
}

/**
 * 用一份普通 object 规则表创建旧版校验器。
 * @param rules 字段路径到规则组的映射
 * @returns 旧版 SchemaValidator 实例
 */
export function createLegacyValidator(
	rules: UniFormRules
): any {
	const Constructor: any = LegacyValidator as any
	const source = rules as any
	const safeRules: any = {}
	objectKeys(source).forEach((key: string) => {
		if (!isUnsafeRuleKey(key)) {
			safeRules[key] = cloneLegacyGroup(source[key])
		}
	})
	return new Constructor(safeRules)
}

/**
 * 表单项规则替换表单上的规则列表时，仍保留表单规则组里的 label。
 * @param formGroup 表单 rules 里该字段的规则组
 * @param itemRules 表单项自己的规则；没有时沿用表单规则
 * @returns 这一字段实际使用的规则组
 */
export function resolveFieldRuleGroup(
	formGroup: UniFormRuleGroup | UniFormRule[] | null | undefined,
	itemRules: UniFormRule[] | null | undefined
): UniFormRuleGroup {
	const normalized: UniFormRuleGroup = Array.isArray(formGroup)
		? { rules: formGroup }
		: (formGroup ?? { rules: [] })
	if (itemRules == null) {
		return normalized
	}
	if (normalized.label != null && normalized.label != '') {
		return {
			rules: itemRules,
			label: normalized.label
		}
	}
	return { rules: itemRules }
}

/**
 * 整表校验保留全部 schema 错误。只校验指定字段时，只保留这些字段的错误。
 * 没有字段路径的错误只出现在整表结果里。
 * @param issues schema 返回的全部错误
 * @param names 要保留的字段键
 * @param allFields 为 true 时不做过滤
 * @returns 本次要合并进结果的错误
 */
export function schemaIssuesForRequest(
	issues: UniFormIssue[],
	names: string[],
	allFields: boolean
): UniFormIssue[] {
	if (allFields) {
		return issues
	}
	return issues.filter((issue: UniFormIssue): boolean => {
		return names.some((name: string): boolean => name == issue.key)
	})
}

/**
 * 从一次 schema 结果里挑出其它字段的错误，供失焦时写到对应项上。
 * 当前字段由它自己的校验结果负责，没有路径的错误不在这里分配。
 * @param issues schema 返回的全部错误
 * @param currentKey 当前字段键
 * @returns 其它字段的错误
 */
export function schemaIssuesForOtherFields(issues: UniFormIssue[], currentKey: string): UniFormIssue[] {
	return issues.filter((issue: UniFormIssue): boolean => issue.key != '' && issue.key != currentKey)
}

/**
 * schema 原样返回传入对象时，视为没有转换值。
 * @param input 传给 schema 的模型
 * @param output schema 成功结果里的 value
 * @returns 需要写回的值；没有转换时为 undefined
 */
export function schemaWritebackValue(input: any, output: any): any {
	if (output === undefined || output === input) {
		return undefined
	}
	return output
}

/**
 * 只有整表校验通过，并且 schema 给出了对象形式的转换值，才写回模型。
 * @param fullValidate 是否为整表 validate
 * @param issueCount 本次错误数量
 * @param value schema 的成功值
 * @returns 是否写回
 */
export function shouldApplySchemaValue(fullValidate: boolean, issueCount: number, value: any): boolean {
	return fullValidate && issueCount == 0 && value != null && typeof value == 'object' && !Array.isArray(value)
}

/**
 * 判断转换值和当前值是否不同。对象内容相同则不再写回，避免输入框被同一份数据刷一遍。
 * @param current 模型里的当前值
 * @param next schema 给出的值
 * @returns 两者是否需要写回
 */
export function formValuesDiffer(current: any, next: any): boolean {
	if (current === next) {
		return false
	}
	if (current == null || next == null || typeof current != 'object' || typeof next != 'object') {
		return true
	}
	try {
		return JSON.stringify(current) != JSON.stringify(next)
	} catch (error) {
		return true
	}
}

/**
 * 同一 schema、同一模型版本才复用上次结果。版本变化后必须重跑。
 * @param cache 当前缓存
 * @param schema 本次 schema
 * @param revision 本次模型版本
 * @returns 是否可以复用
 */
export function isSchemaCacheHit(
	cache: { schema: any, revision: number } | null,
	schema: any,
	revision: number
): boolean {
	return cache != null && cache.schema === schema && cache.revision == revision
}

/**
 * 同名字段被后注册的一项替换时使用的开发提示。
 * @param key 重复的字段键
 * @returns 控制台文案
 */
export function duplicateFieldMessage(key: string): string {
	return `[uni-forms] 字段「${key}」重复注册，整表校验只保留后注册的一项`
}

/**
 * 被新一次校验取消时的结果。errors 不是 null，不能当成通过。
 * @returns 带取消标记的结果
 */
export function cancelledValidationResult(): { stale: true, cancelled: true } {
	return { stale: true, cancelled: true }
}

function issueFromLegacyResult(result: any, name: UniFormPath): UniFormIssue | null {
	if (result == null || result.errorMessage == null) {
		return null
	}
	return {
		key: pathKey(name),
		path: normalizePath(name),
		errorMessage: result.errorMessage.toString() || defaultMessage,
		source: 'legacy'
	}
}

export async function validateLegacyRules(
	value: any,
	group: UniFormRuleGroup | UniFormRule[] | null | undefined,
	trigger: UniFormTrigger,
	allData: any,
	defaultLabel: string,
	name: UniFormPath,
	validator?: any
): Promise<UniFormIssue | null> {
	const activeGroup = groupForTrigger(group, trigger)
	const rules = groupRules(activeGroup)
	const key = pathKey(name)
	if (rules.length == 0 || key == '') {
		return null
	}
	const schema: any = {}
	const safeGroup = cloneLegacyGroup(activeGroup)
	if (Array.isArray(safeGroup)) {
		schema[key] = { label: defaultLabel, rules: safeGroup }
	} else {
		if (safeGroup.label == null || safeGroup.label == '') {
			safeGroup.label = defaultLabel
		}
		schema[key] = safeGroup
	}
	const fieldValidator = validator != null && trigger == 'submit'
		? validator
		: createLegacyValidator(schema)
	try {
		const result = await fieldValidator.validateUpdate({ [key]: value }, allData)
		return issueFromLegacyResult(result, name)
	} catch (error) {
		const errorValue = error as any
		return {
			key,
			path: normalizePath(name),
			errorMessage: errorValue != null && errorValue.message != null
				? errorValue.message.toString()
				: defaultMessage,
			source: 'legacy'
		}
	}
}

function standardIssuePath(issue: any): UniFormPathToken[] {
	if (!Array.isArray(issue?.path)) {
		return []
	}
	return issue.path.map((item: any): UniFormPathToken => {
		if (item == null) {
			return ''
		}
		if (item != null && typeof item == 'object' && item.key !== undefined) {
			return typeof item.key == 'number' ? item.key : item.key.toString()
		}
		return typeof item == 'number' ? item : item.toString()
	})
}

export type StandardSchemaRun = {
	issues: UniFormIssue[],
	value: any
}

/**
 * 调用 Standard Schema。成功时带上转换后的 value；失败、抛错或没有转换值时 value 为 undefined。
 * @param schema 带 ~standard.validate 的对象
 * @param value 传给 schema 的模型副本
 * @returns 错误列表和可写回的成功值
 */
export async function validateStandardSchema(schema: any, value: any): Promise<StandardSchemaRun> {
	const empty: StandardSchemaRun = { issues: [], value: undefined }
	if (schema == null || schema['~standard'] == null || typeof schema['~standard'].validate != 'function') {
		return empty
	}
	let result: any
	try {
		result = await schema['~standard'].validate(value)
	} catch (error) {
		const errorValue = error as any
		return {
			issues: [{
				key: '',
				path: [],
				errorMessage: errorValue != null && errorValue.message != null
					? errorValue.message.toString()
					: defaultMessage,
				source: 'standard'
			}],
			value: undefined
		}
	}
	if (result != null && Array.isArray(result.issues) && result.issues.length > 0) {
		return {
			issues: result.issues.map((issue: any): UniFormIssue => {
				const path = standardIssuePath(issue)
				return {
					key: pathKey(path),
					path,
					errorMessage: issue.message == null ? defaultMessage : issue.message.toString(),
					source: 'standard'
				}
			}),
			value: undefined
		}
	}
	if (result == null) {
		return empty
	}
	return {
		issues: [],
		value: schemaWritebackValue(value, result.value)
	}
}
