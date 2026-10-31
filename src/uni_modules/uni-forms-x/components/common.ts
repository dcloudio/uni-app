export type UniFormPathToken = string | number
export type UniFormPath = string | UniFormPathToken[]
export type UniFormTrigger = 'bind' | 'blur' | 'submit'

/**
 * 表单模型。TS 里就是普通 object，按字段名读写，不使用 UTSJSONObject。
 */
export type UniFormModel = object

/**
 * 表单级规则表。键是字段路径，值是规则组或规则数组，类型同样是普通 object。
 */
export type UniFormRules = object

/**
 * 枚举普通对象自身的字段名。
 * @param value 任意值，不是对象时返回空数组
 * @returns 字段名列表
 */
export function objectKeys(value: any): string[] {
	if (value == null || typeof value != 'object') {
		return []
	}
	return Object.keys(value)
}

export type UniFormRule = {
	required?: boolean,
	range?: any[],
	format?: string,
	arrayType?: string,
	pattern?: string | RegExp,
	minimum?: number,
	maximum?: number,
	exclusiveMinimum?: boolean,
	exclusiveMaximum?: boolean,
	minLength?: number,
	maxLength?: number,
	errorMessage?: string,
	message?: string,
	trigger?: UniFormTrigger,
	validateTrigger?: UniFormTrigger,
	validateExpr?: any,
	validateFunction?: any
}

export type UniFormRuleGroup = {
	rules?: UniFormRule[],
	label?: string,
	trigger?: UniFormTrigger,
	validateTrigger?: UniFormTrigger
}

export type UniFormIssue = {
	key: string,
	path: UniFormPathToken[],
	errorMessage: string,
	source?: 'legacy' | 'standard'
}

export type UniFormFieldContext = {
	name: UniFormPath,
	key: string,
	errorMessage: any,
	validateState: any,
	pending: any,
	getValue: () => any,
	setValue: (value: any) => void,
	onFieldChange: (value?: any, force?: boolean) => Promise<UniFormIssue | null>,
	onFieldBlur: (value?: any) => Promise<UniFormIssue | null>,
	validate: (trigger?: UniFormTrigger, force?: boolean, includeSchema?: boolean, notify?: boolean) => Promise<UniFormIssue | null>,
	clearValidate: () => void,
	setError: (issue: UniFormIssue | null) => void,
	getRules: () => UniFormRule[] | null,
	getLabel: () => string,
	skipNextChange: () => void
}

export type UniFormContext = {
	registerField: (field: UniFormFieldContext) => void,
	unregisterField: (field: UniFormFieldContext) => void,
	getFieldValue: (name: UniFormPath) => any,
	setFieldValue: (name: UniFormPath, value: any) => void,
	getFieldRules: (name: UniFormPath, itemRules?: UniFormRule[] | null) => UniFormRuleGroup,
	shouldValidate: (trigger: UniFormTrigger, itemTrigger?: UniFormTrigger) => boolean,
	shouldValidateField: (trigger: UniFormTrigger, name: UniFormPath, itemTrigger?: UniFormTrigger, itemRules?: UniFormRule[] | null) => boolean,
	validateFieldValue: (name: UniFormPath, value: any, itemRules?: UniFormRule[] | null, itemTrigger?: UniFormTrigger, trigger?: UniFormTrigger, includeSchema?: boolean, validator?: any) => Promise<UniFormIssue | null>,
	validateSchema: (name?: UniFormPath) => Promise<UniFormIssue[]>,
	notifyModelChange: () => void,
	notifyValidation: (issue: UniFormIssue | null, emitEvent?: boolean) => void,
	getBorder: () => boolean,
	getLabelWidth: () => string | number,
	getLabelPosition: () => string,
	getLabelAlign: () => string,
	getErrShowType: () => string,
	getModel: () => UniFormModel
}

export const UNI_FORM_CONTEXT = 'uniForm'
export const UNI_FORM_ITEM_CONTEXT = 'uniFormItem'

export function normalizePath(path: UniFormPath): UniFormPathToken[] {
	if (Array.isArray(path)) {
		return path.map((item: UniFormPathToken): UniFormPathToken => {
			if (item == null || (typeof item != 'string' && typeof item != 'number')) {
				return ''
			}
			if (typeof item == 'string' && /^\d+$/.test(item)) {
				return Number(item)
			}
			return item
		})
	}
	if (path == null || path == '') {
		return []
	}
	const legacyPrefix = '_formdata_#'
	if (path.indexOf(legacyPrefix) == 0) {
		return path
			.slice(legacyPrefix.length)
			.split('#')
			.filter((item: string): boolean => item != '')
			.map((item: string): UniFormPathToken => /^\d+$/.test(item) ? Number(item) : item)
	}
	return path
		.replace(/\[(\d+)\]/g, '.$1')
		.split('.')
		.filter((item: string): boolean => item != '')
		.map((item: string): UniFormPathToken => /^\d+$/.test(item) ? Number(item) : item)
}

export function pathKey(path: UniFormPath): string {
	const tokens = normalizePath(path)
	if (tokens.some(isUnsafeToken)) {
		return ''
	}
	return tokens.map((item: UniFormPathToken): string => item.toString()).join('.')
}

function isUnsafeToken(token: UniFormPathToken): boolean {
	return token == '__proto__' || token == 'prototype' || token == 'constructor'
}

export function samePath(first: UniFormPath, second: UniFormPath): boolean {
	const firstPath = normalizePath(first)
	const secondPath = normalizePath(second)
	if (firstPath.length != secondPath.length) {
		return false
	}
	for (let index = 0; index < firstPath.length; index++) {
		if (firstPath[index].toString() != secondPath[index].toString()) {
			return false
		}
	}
	return true
}

export function getPath(source: any, path: UniFormPath): any {
	let current = source
	const tokens = normalizePath(path)
	if (tokens.some(isUnsafeToken)) {
		return undefined
	}
	for (const token of tokens) {
		if (current == null) {
			return undefined
		}
		current = current[token]
	}
	return current
}

export function setPath(source: any, path: UniFormPath, value: any): void {
	const tokens = normalizePath(path)
	if (tokens.length == 0 || source == null || tokens.some(isUnsafeToken)) {
		return
	}
	let current = source
	for (let index = 0; index < tokens.length; index++) {
		const token = tokens[index]
		if (index == tokens.length - 1) {
			current[token] = value
			return
		}
		const nextToken = tokens[index + 1]
		if (current[token] == null || typeof current[token] != 'object') {
			current[token] = typeof nextToken == 'number' ? [] : {}
		}
		current = current[token]
	}
}

function copyContainer(value: any, array: boolean): any {
	if (array) {
		return Array.isArray(value) ? value.slice() : []
	}
	const result: any = {}
	if (value == null || typeof value != 'object' || value instanceof Date) {
		return result
	}
	objectKeys(value).forEach((key: string) => {
		if (key != '__proto__' && key != 'prototype' && key != 'constructor') {
			result[key] = value[key]
		}
	})
	return result
}

export function updatePath(source: any, path: UniFormPath, value: any): any {
	const tokens = normalizePath(path)
	if (tokens.length == 0 || source == null || tokens.some(isUnsafeToken)) {
		return source
	}
	const result = copyContainer(source, Array.isArray(source))
	let currentResult = result
	let currentSource = source
	for (let index = 0; index < tokens.length; index++) {
		const token = tokens[index]
		if (index == tokens.length - 1) {
			currentResult[token] = value
			break
		}
		const nextToken = tokens[index + 1]
		const sourceChild = currentSource != null && typeof currentSource == 'object' ? currentSource[token] : null
		const child = copyContainer(sourceChild, typeof nextToken == 'number')
		currentResult[token] = child
		currentResult = child
		currentSource = sourceChild
	}
	return result
}

export function deletePath(source: any, path: UniFormPath): void {
	const tokens = normalizePath(path)
	if (tokens.length == 0 || source == null || tokens.some(isUnsafeToken)) {
		return
	}
	let current = source
	for (let index = 0; index < tokens.length - 1; index++) {
		if (current == null) {
			return
		}
		current = current[tokens[index]]
	}
	if (current != null) {
		delete current[tokens[tokens.length - 1]]
	}
}

export function cloneModel(value: any): any {
	if (value == null || typeof value != 'object') {
		return value
	}
	if (value instanceof Date) {
		return new Date(value.getTime())
	}
	if (Array.isArray(value)) {
		return value.map((item: any): any => cloneModel(item))
	}
	const result: any = {}
	for (const key of objectKeys(value)) {
		if (key == '__proto__' || key == 'prototype' || key == 'constructor') {
			continue
		}
		result[key] = cloneModel(value[key])
	}
	return result
}

export function isEmptyValue(value: any, format?: string): boolean {
	if (value == null) {
		return true
	}
	if (typeof value == 'string' && value.length == 0) {
		return true
	}
	if (Array.isArray(value) && value.length == 0) {
		return true
	}
	if (format == 'object' && typeof value == 'object' && objectKeys(value).length == 0) {
		return true
	}
	return false
}
