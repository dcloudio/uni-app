//#region src/storages/globalConfig/globalConfig.ts
let store$4;
const DEFAULT_CONFIG = {
	lang: void 0,
	message: void 0,
	abortEarly: void 0,
	abortPipeEarly: void 0
};
/**
* Sets the global configuration.
*
* @param config The configuration.
*/
function setGlobalConfig(config$1) {
	store$4 = {
		...store$4,
		...config$1
	};
}
/**
* Returns the global configuration.
*
* @param config The config to merge.
*
* @returns The configuration.
*/
/* @__NO_SIDE_EFFECTS__ */
function getGlobalConfig(config$1) {
	if (!config$1 && !store$4) return DEFAULT_CONFIG;
	return {
		lang: config$1?.lang ?? store$4?.lang,
		message: config$1?.message,
		abortEarly: config$1?.abortEarly ?? store$4?.abortEarly,
		abortPipeEarly: config$1?.abortPipeEarly ?? store$4?.abortPipeEarly
	};
}
/**
* Deletes the global configuration.
*/
function deleteGlobalConfig() {
	store$4 = void 0;
}

//#endregion
//#region src/storages/globalMessage/globalMessage.ts
let store$3;
/**
* Sets a global error message.
*
* @param message The error message.
* @param lang The language of the message.
*/
function setGlobalMessage(message$1, lang) {
	if (!store$3) store$3 = /* @__PURE__ */ new Map();
	store$3.set(lang, message$1);
}
/**
* Returns a global error message.
*
* @param lang The language of the message.
*
* @returns The error message.
*/
/* @__NO_SIDE_EFFECTS__ */
function getGlobalMessage(lang) {
	return store$3?.get(lang);
}
/**
* Deletes a global error message.
*
* @param lang The language of the message.
*/
function deleteGlobalMessage(lang) {
	store$3?.delete(lang);
}

//#endregion
//#region src/storages/schemaMessage/schemaMessage.ts
let store$2;
/**
* Sets a schema error message.
*
* @param message The error message.
* @param lang The language of the message.
*/
function setSchemaMessage(message$1, lang) {
	if (!store$2) store$2 = /* @__PURE__ */ new Map();
	store$2.set(lang, message$1);
}
/**
* Returns a schema error message.
*
* @param lang The language of the message.
*
* @returns The error message.
*/
/* @__NO_SIDE_EFFECTS__ */
function getSchemaMessage(lang) {
	return store$2?.get(lang);
}
/**
* Deletes a schema error message.
*
* @param lang The language of the message.
*/
function deleteSchemaMessage(lang) {
	store$2?.delete(lang);
}

//#endregion
//#region src/storages/specificMessage/specificMessage.ts
let store$1;
/**
* Sets a specific error message.
*
* @param reference The identifier reference.
* @param message The error message.
* @param lang The language of the message.
*/
function setSpecificMessage(reference, message$1, lang) {
	if (!store$1) store$1 = /* @__PURE__ */ new Map();
	if (!store$1.get(reference)) store$1.set(reference, /* @__PURE__ */ new Map());
	store$1.get(reference).set(lang, message$1);
}
/**
* Returns a specific error message.
*
* @param reference The identifier reference.
* @param lang The language of the message.
*
* @returns The error message.
*/
/* @__NO_SIDE_EFFECTS__ */
function getSpecificMessage(reference, lang) {
	return store$1?.get(reference)?.get(lang);
}
/**
* Deletes a specific error message.
*
* @param reference The identifier reference.
* @param lang The language of the message.
*/
function deleteSpecificMessage(reference, lang) {
	store$1?.get(reference)?.delete(lang);
}

//#endregion
//#region src/utils/_stringify/_stringify.ts
/**
* Stringifies an unknown input to a literal or type string.
*
* @param input The unknown input.
*
* @returns A literal or type string.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _stringify(input) {
	const type = typeof input;
	if (type === "string") return `"${input}"`;
	if (type === "number" || type === "bigint" || type === "boolean") return `${input}`;
	if (type === "object" || type === "function") return (input && Object.getPrototypeOf(input)?.constructor?.name) ?? "null";
	return type;
}

//#endregion
//#region src/utils/_addIssue/_addIssue.ts
/**
* Adds an issue to the dataset.
*
* @param context The issue context.
* @param label The issue label.
* @param dataset The input dataset.
* @param config The configuration.
* @param other The optional props.
*
* @internal
*/
function _addIssue(context, label, dataset, config$1, other) {
	const input = other && "input" in other ? other.input : dataset.value;
	const expected = other?.expected ?? context.expects ?? null;
	const received = other?.received ?? /* @__PURE__ */ _stringify(input);
	const issue = {
		kind: context.kind,
		type: context.type,
		input,
		expected,
		received,
		message: `Invalid ${label}: ${expected ? `Expected ${expected} but r` : "R"}eceived ${received}`,
		requirement: context.requirement,
		path: other?.path,
		issues: other?.issues,
		lang: config$1.lang,
		abortEarly: config$1.abortEarly,
		abortPipeEarly: config$1.abortPipeEarly
	};
	const isSchema = context.kind === "schema";
	const message$1 = other?.message ?? context.message ?? /* @__PURE__ */ getSpecificMessage(context.reference, issue.lang) ?? (isSchema ? /* @__PURE__ */ getSchemaMessage(issue.lang) : null) ?? config$1.message ?? /* @__PURE__ */ getGlobalMessage(issue.lang);
	if (message$1 !== void 0) issue.message = typeof message$1 === "function" ? message$1(issue) : message$1;
	if (isSchema) dataset.typed = false;
	if (dataset.issues) dataset.issues.push(issue);
	else dataset.issues = [issue];
}

//#endregion
//#region src/utils/_cloneDataset/_cloneDataset.ts
/**
* Creates a shallow copy of a dataset.
*
* Hint: The `value` is copied by reference, but the `issues` array, its issues
* and their `path` arrays are cloned to avoid reusing mutable dataset state
* across multiple runs. Mutating a returned object or array value can
* therefore affect later cache hits that reuse the same cached output.
*
* @param dataset The output dataset.
*
* @returns The copied output dataset.
*/
/* @__NO_SIDE_EFFECTS__ */
function _cloneDataset(dataset) {
	return {
		typed: dataset.typed,
		value: dataset.value,
		issues: dataset.issues?.map((issue) => ({
			...issue,
			path: issue.path && [...issue.path]
		}))
	};
}

//#endregion
//#region src/utils/_formatCase/_formatCase.ts
/**
* Splits a string into lowercase words and rejoins them with the given
* separator and capitalization rules.
*
* Words are separated by `_`, `-` and ASCII whitespace, as well as by case
* and acronym boundaries. Whether the first or subsequent words are
* capitalized is controlled by `capFirst` and `capRest`.
*
* Hint: Implemented in a single pass that emits directly to the result
* string to avoid an intermediate `string[]` allocation. ASCII chars are
* classified via char codes to skip `.toLowerCase()` and `.toUpperCase()`
* method calls in the common case.
*
* Hint: Digits are treated as a separate character class, so `item2Name`
* yields `item2` and `name` rather than `item`, `2` and `name`.
*
* @param input The input string.
* @param separator The string inserted between words.
* @param capFirst Whether to capitalize the first word.
* @param capRest Whether to capitalize subsequent words.
*
* @returns The formatted string.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _formatCase(input, separator, capFirst, capRest) {
	let result = "";
	let firstWord = true;
	let start = 0;
	let prev = 0;
	let prevPrev = 0;
	const flush = (end) => {
		if (end > start) {
			let word = input.slice(start, end).toLowerCase();
			if (firstWord ? capFirst : capRest) {
				const firstCode = word.charCodeAt(0);
				if (firstCode >= 97 && firstCode <= 122) word = String.fromCharCode(firstCode - 32) + word.slice(1);
				else {
					const charLen = firstCode >= 55296 && firstCode <= 56319 ? 2 : 1;
					word = word.slice(0, charLen).toUpperCase() + word.slice(charLen);
				}
			}
			result += firstWord ? word : separator + word;
			firstWord = false;
		}
	};
	for (let index = 0; index < input.length; index++) {
		const code = input.charCodeAt(index);
		let type;
		if (code === 32 || code === 9 || code === 10 || code === 11 || code === 12 || code === 13 || code === 45 || code === 95) {
			flush(index);
			start = index + 1;
			type = 0;
		} else if (code < 128) type = code >= 65 && code <= 90 ? 1 : code >= 97 && code <= 122 ? 2 : 3;
		else {
			const char = input[index];
			const charLower = char.toLowerCase();
			type = charLower === char.toUpperCase() ? 3 : char === charLower ? 2 : 1;
		}
		if (type === 1 && (prev === 2 || prev === 3) && index > start) {
			flush(index);
			start = index;
		} else if (type === 2 && prev === 1 && prevPrev === 1 && index - 1 > start) {
			flush(index - 1);
			start = index - 1;
		}
		prevPrev = prev;
		prev = type;
	}
	flush(input.length);
	return result;
}

//#endregion
//#region src/utils/_getByteCount/_getByteCount.ts
let textEncoder;
/**
* Returns the byte count of the input.
*
* @param input The input to be measured.
*
* @returns The byte count.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _getByteCount(input) {
	if (!textEncoder) textEncoder = new TextEncoder();
	return textEncoder.encode(input).length;
}

//#endregion
//#region src/utils/_getCodePointCount/_getCodePointCount.ts
/**
* Returns the code point count of the input.
*
* @param input The input to be measured.
*
* @returns The code point count.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _getCodePointCount(input) {
	let count = input.length;
	const lengthMinus1 = input.length - 1;
	for (let i = 0; i < lengthMinus1;) if (input.codePointAt(i) <= 65535) i++;
	else {
		i += 2;
		count--;
	}
	return count;
}

//#endregion
//#region src/utils/_getGraphemeCount/_getGraphemeCount.ts
let segmenter;
/**
* Returns the grapheme count of the input.
*
* @param input The input to be measured.
*
* @returns The grapheme count.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _getGraphemeCount(input) {
	if (!segmenter) segmenter = new Intl.Segmenter();
	const segments = segmenter.segment(input);
	let count = 0;
	for (const _ of segments) count++;
	return count;
}

//#endregion
//#region src/utils/_getLastMetadata/_getLastMetadata.ts
/**
* Returns the last top-level value of a given metadata type from a schema
* using a breadth-first search that starts with the last item in the pipeline.
*
* @param schema The schema to search.
* @param type The metadata type.
*
* @returns The value, if any.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _getLastMetadata(schema, type) {
	if ("pipe" in schema) {
		const nestedSchemas = [];
		for (let index = schema.pipe.length - 1; index >= 0; index--) {
			const item = schema.pipe[index];
			if (item.kind === "schema" && "pipe" in item) nestedSchemas.push(item);
			else if (item.kind === "metadata" && item.type === type) return item[type];
		}
		for (const nestedSchema of nestedSchemas) {
			const result = /* @__PURE__ */ _getLastMetadata(nestedSchema, type);
			if (result !== void 0) return result;
		}
	}
}

//#endregion
//#region src/utils/_getWordCount/_getWordCount.ts
let store;
/**
* Returns the word count of the input.
*
* @param locales The locales to be used.
* @param input The input to be measured.
*
* @returns The word count.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _getWordCount(locales, input) {
	if (!store) store = /* @__PURE__ */ new Map();
	const key = String(locales);
	let segmenter$1 = store.get(key);
	if (!segmenter$1) {
		segmenter$1 = new Intl.Segmenter(locales, { granularity: "word" });
		store.set(key, segmenter$1);
	}
	const segments = segmenter$1.segment(input);
	let count = 0;
	for (const segment of segments) if (segment.isWordLike) count++;
	return count;
}

//#endregion
//#region src/utils/_isLuhnAlgo/_isLuhnAlgo.ts
/**
* Non-digit regex.
*/
const NON_DIGIT_REGEX = /\D/gu;
/**
* Checks whether a string with numbers corresponds to the luhn algorithm.
*
* @param input The input to be checked.
*
* @returns Whether input is valid.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _isLuhnAlgo(input) {
	const number$1 = input.replace(NON_DIGIT_REGEX, "");
	let length$1 = number$1.length;
	let bit = 1;
	let sum = 0;
	while (length$1) {
		const value$1 = +number$1[--length$1];
		bit ^= 1;
		sum += bit ? [
			0,
			2,
			4,
			6,
			8,
			1,
			3,
			5,
			7,
			9
		][value$1] : value$1;
	}
	return sum % 10 === 0;
}

//#endregion
//#region src/utils/_isSameValueZero/_isSameValueZero.ts
/**
* Compares two values using the SameValueZero algorithm, which treats `NaN`
* as equal to itself unlike `===`.
*
* @param value1 The first value.
* @param value2 The second value.
*
* @returns Whether the values are equal.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _isSameValueZero(value1, value2) {
	return value1 === value2 || Number.isNaN(value1) && Number.isNaN(value2);
}

//#endregion
//#region src/utils/_isValidObjectKey/_isValidObjectKey.ts
/**
* Disallows inherited object properties and prevents object prototype
* pollution by disallowing certain keys.
*
* @param object The object to check.
* @param key The key to check.
*
* @returns Whether the key is allowed.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _isValidObjectKey(object$1, key) {
	return Object.prototype.hasOwnProperty.call(object$1, key) && key !== "__proto__" && key !== "prototype" && key !== "constructor";
}

//#endregion
//#region src/utils/_isValueMatch/_isValueMatch.ts
/**
* Checks whether a value matches a value action requirement.
*
* @param requirement The value action requirement.
* @param value The value to check.
*
* @returns Whether the value matches the requirement.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _isValueMatch(requirement, value$1) {
	return Number.isNaN(requirement) && Number.isNaN(value$1) || requirement <= value$1 && requirement >= value$1;
}

//#endregion
//#region src/utils/_joinExpects/_joinExpects.ts
/**
* Joins multiple `expects` values with the given separator.
*
* @param values The `expects` values.
* @param separator The separator.
*
* @returns The joined `expects` property.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _joinExpects(values$1, separator) {
	const list = [...new Set(values$1)];
	if (list.length > 1) return `(${list.join(` ${separator} `)})`;
	return list[0] ?? "never";
}

//#endregion
//#region src/utils/_standardSchema/_standardSchema.ts
/**
* Eagerly creates and attaches the Standard Schema properties of a schema.
*
* Hint: The contextual `this` type includes the standard properties that are
* attached before the schema is returned.
*
* @param schema The schema to attach standard properties to.
*
* @returns The schema with standard properties attached.
*
* @internal
*/
function _standardSchema(schema) {
	schema["~standard"] = {
		version: 1,
		vendor: "valibot",
		validate: (value$1) => schema["~run"]({ value: value$1 }, /* @__PURE__ */ getGlobalConfig())
	};
	return schema;
}

//#endregion
//#region src/utils/entriesFromList/entriesFromList.ts
/**
* Creates an object entries definition from a list of keys and a schema.
*
* @param list A list of keys.
* @param schema The schema of the keys.
*
* @returns The object entries.
*/
/* @__NO_SIDE_EFFECTS__ */
function entriesFromList(list, schema) {
	const entries$1 = {};
	for (const key of list) entries$1[key] = schema;
	return entries$1;
}

//#endregion
//#region src/utils/entriesFromObjects/entriesFromObjects.ts
/* @__NO_SIDE_EFFECTS__ */
function entriesFromObjects(schemas) {
	const entries$1 = {};
	for (const schema of schemas) Object.assign(entries$1, schema.entries);
	return entries$1;
}

//#endregion
//#region src/utils/getDotPath/getDotPath.ts
/* @__NO_SIDE_EFFECTS__ */
function getDotPath(issue) {
	if (issue.path) {
		let key = "";
		for (const item of issue.path) if (typeof item.key === "string" || typeof item.key === "number") if (key) key += `.${item.key}`;
		else key += item.key;
		else return null;
		return key;
	}
	return null;
}

//#endregion
//#region src/utils/isOfKind/isOfKind.ts
/**
* A generic type guard to check the kind of an object.
*
* @param kind The kind to check for.
* @param object The object to check.
*
* @returns Whether it matches.
*/
/* @__NO_SIDE_EFFECTS__ */
function isOfKind(kind, object$1) {
	return object$1.kind === kind;
}

//#endregion
//#region src/utils/isOfType/isOfType.ts
/**
* A generic type guard to check the type of an object.
*
* @param type The type to check for.
* @param object The object to check.
*
* @returns Whether it matches.
*/
/* @__NO_SIDE_EFFECTS__ */
function isOfType(type, object$1) {
	return object$1.type === type;
}

//#endregion
//#region src/utils/ValiError/ValiError.ts
/**
* A Valibot error with useful information.
*/
var ValiError = class extends Error {
	/**
	* Creates a Valibot error with useful information.
	*
	* @param issues The error issues.
	*/
	constructor(issues) {
		super(issues[0].message);
		this.name = "ValiError";
		this.issues = issues;
	}
};

//#endregion
//#region src/utils/isValiError/isValiError.ts
/**
* A type guard to check if an error is a ValiError.
*
* @param error The error to check.
*
* @returns Whether its a ValiError.
*/
/* @__NO_SIDE_EFFECTS__ */
function isValiError(error) {
	return error instanceof ValiError;
}

//#endregion
//#region src/actions/args/args.ts
/* @__NO_SIDE_EFFECTS__ */
function args(schema) {
	return {
		kind: "transformation",
		type: "args",
		reference: args,
		async: false,
		schema,
		"~run"(dataset, config$1) {
			const func = dataset.value;
			dataset.value = (...args_) => {
				const argsDataset = this.schema["~run"]({ value: args_ }, config$1);
				if (argsDataset.issues) throw new ValiError(argsDataset.issues);
				return func(...argsDataset.value);
			};
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/args/argsAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function argsAsync(schema) {
	return {
		kind: "transformation",
		type: "args",
		reference: argsAsync,
		async: false,
		schema,
		"~run"(dataset, config$1) {
			const func = dataset.value;
			dataset.value = async (...args$1) => {
				const argsDataset = await schema["~run"]({ value: args$1 }, config$1);
				if (argsDataset.issues) throw new ValiError(argsDataset.issues);
				return func(...argsDataset.value);
			};
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/await/awaitAsync.ts
/**
* Creates an await transformation action.
*
* @returns An await action.
*/
/* @__NO_SIDE_EFFECTS__ */
function awaitAsync() {
	return {
		kind: "transformation",
		type: "await",
		reference: awaitAsync,
		async: true,
		async "~run"(dataset) {
			dataset.value = await dataset.value;
			return dataset;
		}
	};
}

//#endregion
//#region src/regex.ts
/**
* [Base64](https://en.wikipedia.org/wiki/Base64) regex.
*/
const BASE64_REGEX = /^(?:[\da-z+/]{4})*(?:[\da-z+/]{2}==|[\da-z+/]{3}=)?$/iu;
/**
* [BIC](https://en.wikipedia.org/wiki/ISO_9362) regex.
*/
const BIC_REGEX = /^[A-Z]{6}(?!00)[\dA-Z]{2}(?:[\dA-Z]{3})?$/u;
/**
* [Cuid2](https://github.com/paralleldrive/cuid2) regex.
*/
const CUID2_REGEX = /^[a-z][\da-z]*$/u;
/**
* [Decimal](https://en.wikipedia.org/wiki/Decimal) regex.
*/
const DECIMAL_REGEX = /^[+-]?(?:\d*\.)?\d+$/u;
/**
* [Digits](https://en.wikipedia.org/wiki/Numerical_digit) regex.
*/
const DIGITS_REGEX = /^\d+$/u;
/**
* [Domain name](https://en.wikipedia.org/wiki/Domain_name) regex.
*
* Hint: We decided against the `i` flag for better JSON Schema compatibility.
* ASCII-only validation. Internationalized domain names (IDNs) are not
* supported, including Punycode-encoded labels.
*/
const DOMAIN_REGEX = /^(?=.{1,253}$)(?:(?![Xx][Nn]--)[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/u;
/**
* [Email address](https://en.wikipedia.org/wiki/Email_address) regex.
*
* Hint: We decided against the `i` flag to avoid matching non-ASCII characters.
*/
const EMAIL_REGEX = /^[\w+-]+(?:\.[\w+-]+)*@[\da-zA-Z]+(?:[.-][\da-zA-Z]+)*\.[a-zA-Z]{2,}$/u;
/**
* Emoji regex from [emoji-regex-xs](https://github.com/slevithan/emoji-regex-xs) v1.0.0 (MIT license).
*
* Hint: We decided against the newer `/^\p{RGI_Emoji}+$/v` regex because it is
* not supported in older runtimes and does not match all emoji.
*/
const EMOJI_REGEX = /^(?:[\u{1F1E6}-\u{1F1FF}]{2}|\u{1F3F4}[\u{E0061}-\u{E007A}]{2}[\u{E0030}-\u{E0039}\u{E0061}-\u{E007A}]{1,3}\u{E007F}|(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|(?![\p{Emoji_Modifier_Base}\u{1F1E6}-\u{1F1FF}])\p{Emoji_Presentation})(?:\u200D(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|(?![\p{Emoji_Modifier_Base}\u{1F1E6}-\u{1F1FF}])\p{Emoji_Presentation}))*)+$/u;
/**
* [Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) regex.
*
* Hint: We decided against the `i` flag for better JSON Schema compatibility.
*/
const HEXADECIMAL_REGEX = /^(?:0[hx])?[\da-fA-F]+$/u;
/**
* [Hex color](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet) regex.
*
* Hint: We decided against the `i` flag for better JSON Schema compatibility.
*/
const HEX_COLOR_REGEX = /^#(?:[\da-fA-F]{3,4}|[\da-fA-F]{6}|[\da-fA-F]{8})$/u;
/**
* [IMEI](https://en.wikipedia.org/wiki/International_Mobile_Equipment_Identity) regex.
*/
const IMEI_REGEX = /^\d{15}$|^\d{2}-\d{6}-\d{6}-\d$/u;
/**
* [IPv4](https://en.wikipedia.org/wiki/IPv4) regex.
*/
const IPV4_REGEX = /^(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])(?:\.(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])){3}$/u;
/**
* [IPv6](https://en.wikipedia.org/wiki/IPv6) regex.
*/
const IPV6_REGEX = /^(?:(?:[\da-f]{1,4}:){7}[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,7}:|(?:[\da-f]{1,4}:){1,6}:[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,5}(?::[\da-f]{1,4}){1,2}|(?:[\da-f]{1,4}:){1,4}(?::[\da-f]{1,4}){1,3}|(?:[\da-f]{1,4}:){1,3}(?::[\da-f]{1,4}){1,4}|(?:[\da-f]{1,4}:){1,2}(?::[\da-f]{1,4}){1,5}|[\da-f]{1,4}:(?::[\da-f]{1,4}){1,6}|:(?:(?::[\da-f]{1,4}){1,7}|:)|fe80:(?::[\da-f]{0,4}){0,4}%[\da-z]+|::(?:f{4}(?::0{1,4})?:)?(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d)|(?:[\da-f]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d))$/iu;
/**
* [IP](https://en.wikipedia.org/wiki/IP_address) regex.
*/
const IP_REGEX = /^(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])(?:\.(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])){3}$|^(?:(?:[\da-f]{1,4}:){7}[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,7}:|(?:[\da-f]{1,4}:){1,6}:[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,5}(?::[\da-f]{1,4}){1,2}|(?:[\da-f]{1,4}:){1,4}(?::[\da-f]{1,4}){1,3}|(?:[\da-f]{1,4}:){1,3}(?::[\da-f]{1,4}){1,4}|(?:[\da-f]{1,4}:){1,2}(?::[\da-f]{1,4}){1,5}|[\da-f]{1,4}:(?::[\da-f]{1,4}){1,6}|:(?:(?::[\da-f]{1,4}){1,7}|:)|fe80:(?::[\da-f]{0,4}){0,4}%[\da-z]+|::(?:f{4}(?::0{1,4})?:)?(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d)|(?:[\da-f]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d))$/iu;
/**
* [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date regex.
*/
const ISO_DATE_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])$/u;
/**
* [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time regex.
*/
const ISO_DATE_TIME_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])[T ](?:0\d|1\d|2[0-3]):[0-5]\d$/u;
/**
* [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time with seconds regex.
*/
const ISO_DATE_TIME_SECOND_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])[T ](?:0\d|1\d|2[0-3])(?::[0-5]\d){2}$/u;
/**
* [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) time regex.
*/
const ISO_TIME_REGEX = /^(?:0\d|1\d|2[0-3]):[0-5]\d$/u;
/**
* [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) time with seconds regex.
*/
const ISO_TIME_SECOND_REGEX = /^(?:0\d|1\d|2[0-3])(?::[0-5]\d){2}$/u;
/**
* [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp regex. Allows a
* space as a date/time separator and an optional space before the UTC offset.
*/
const ISO_TIMESTAMP_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])[T ](?:0\d|1\d|2[0-3])(?::[0-5]\d){2}(?:\.\d{1,9})?(?:Z| ?[+-](?:0\d|1\d|2[0-3])(?::?[0-5]\d)?)$/u;
/**
* [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) week regex.
*/
const ISO_WEEK_REGEX = /^\d{4}-W(?:0[1-9]|[1-4]\d|5[0-3])$/u;
/**
* [JWS compact serialization](https://datatracker.ietf.org/doc/html/rfc7515#section-3.1)
* regex.
*
* Hint: Empty payload and signature segments are allowed because the
* Base64URL-encoded representation of an empty octet sequence is an empty
* string.
*/
const JWS_COMPACT_REGEX = /^(?:[\w-]{2,3}|(?:[\w-]{4})+(?:[\w-]{2,3})?)\.(?:[\w-]{2,3}|(?:[\w-]{4})+(?:[\w-]{2,3})?)?\.(?:[\w-]{2,3}|(?:[\w-]{4})+(?:[\w-]{2,3})?)?$/u;
/**
* [ISRC](https://en.wikipedia.org/wiki/International_Standard_Recording_Code) regex.
*/
const ISRC_REGEX = /^(?:[A-Z]{2}[A-Z\d]{3}\d{7}|[A-Z]{2}-[A-Z\d]{3}-\d{2}-\d{5})$/u;
/**
* [KSUID](https://github.com/segmentio/ksuid) regex.
*/
const KSUID_REGEX = /^[a-zA-Z0-9]{27}$/u;
/**
* [MAC](https://en.wikipedia.org/wiki/MAC_address) 48 bit regex.
*
* Hint: We decided against the `i` flag for better JSON Schema compatibility.
*/
const MAC48_REGEX = /^(?:[\da-fA-F]{2}:){5}[\da-fA-F]{2}$|^(?:[\da-fA-F]{2}-){5}[\da-fA-F]{2}$|^(?:[\da-fA-F]{4}\.){2}[\da-fA-F]{4}$/u;
/**
* [MAC](https://en.wikipedia.org/wiki/MAC_address) 64 bit regex.
*
* Hint: We decided against the `i` flag for better JSON Schema compatibility.
*/
const MAC64_REGEX = /^(?:[\da-fA-F]{2}:){7}[\da-fA-F]{2}$|^(?:[\da-fA-F]{2}-){7}[\da-fA-F]{2}$|^(?:[\da-fA-F]{4}\.){3}[\da-fA-F]{4}$|^(?:[\da-fA-F]{4}:){3}[\da-fA-F]{4}$/u;
/**
* [MAC](https://en.wikipedia.org/wiki/MAC_address) regex.
*
* Hint: We decided against the `i` flag for better JSON Schema compatibility.
*/
const MAC_REGEX = /^(?:[\da-fA-F]{2}:){5}[\da-fA-F]{2}$|^(?:[\da-fA-F]{2}-){5}[\da-fA-F]{2}$|^(?:[\da-fA-F]{4}\.){2}[\da-fA-F]{4}$|^(?:[\da-fA-F]{2}:){7}[\da-fA-F]{2}$|^(?:[\da-fA-F]{2}-){7}[\da-fA-F]{2}$|^(?:[\da-fA-F]{4}\.){3}[\da-fA-F]{4}$|^(?:[\da-fA-F]{4}:){3}[\da-fA-F]{4}$/u;
/**
* [Nano ID](https://github.com/ai/nanoid) regex.
*/
const NANO_ID_REGEX = /^[\w-]+$/u;
/**
* [Octal](https://en.wikipedia.org/wiki/Octal) regex.
*/
const OCTAL_REGEX = /^(?:0o)?[0-7]+$/u;
/**
* [RFC 5322 email address](https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1) regex.
*
* Hint: This regex was taken from the [HTML Living Standard Specification](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) and does not perfectly represent RFC 5322.
*/
const RFC_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
/**
* [Slug](https://en.wikipedia.org/wiki/Clean_URL#Slug) regex.
*/
const SLUG_REGEX = /^[\da-z]+(?:[-_][\da-z]+)*$/u;
/**
* [ULID](https://github.com/ulid/spec) regex.
*
* Hint: We decided against the `i` flag for better JSON Schema compatibility.
* Hint: The first character is restricted to `[0-7]` because the 48-bit
* timestamp cannot exceed 2^48-1, making the maximum valid ULID
* `7ZZZZZZZZZZZZZZZZZZZZZZZZZ` in Crockford's Base32 encoding.
*/
const ULID_REGEX = /^[0-7][\da-hjkmnp-tv-zA-HJKMNP-TV-Z]{25}$/u;
/**
* [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) regex.
*/
const UUID_REGEX = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/iu;

//#endregion
//#region src/actions/base64/base64.ts
/* @__NO_SIDE_EFFECTS__ */
function base64(message$1) {
	return {
		kind: "validation",
		type: "base64",
		reference: base64,
		async: false,
		expects: null,
		requirement: BASE64_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "Base64", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/bic/bic.ts
/* @__NO_SIDE_EFFECTS__ */
function bic(message$1) {
	return {
		kind: "validation",
		type: "bic",
		reference: bic,
		async: false,
		expects: null,
		requirement: BIC_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "BIC", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/brand/brand.ts
/**
* Creates a brand transformation action.
*
* @param name The brand name.
*
* @returns A brand action.
*/
/* @__NO_SIDE_EFFECTS__ */
function brand(name) {
	return {
		kind: "transformation",
		type: "brand",
		reference: brand,
		async: false,
		name,
		"~run"(dataset) {
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/bytes/bytes.ts
/* @__NO_SIDE_EFFECTS__ */
function bytes(requirement, message$1) {
	return {
		kind: "validation",
		type: "bytes",
		reference: bytes,
		async: false,
		expects: `${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed) {
				const length$1 = /* @__PURE__ */ _getByteCount(dataset.value);
				if (length$1 !== this.requirement) _addIssue(this, "bytes", dataset, config$1, { received: `${length$1}` });
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/check/check.ts
/* @__NO_SIDE_EFFECTS__ */
function check(requirement, message$1) {
	return {
		kind: "validation",
		type: "check",
		reference: check,
		async: false,
		expects: null,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "input", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/check/checkAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function checkAsync(requirement, message$1) {
	return {
		kind: "validation",
		type: "check",
		reference: checkAsync,
		async: true,
		expects: null,
		requirement,
		message: message$1,
		async "~run"(dataset, config$1) {
			if (dataset.typed && !await this.requirement(dataset.value)) _addIssue(this, "input", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/checkItems/checkItems.ts
/* @__NO_SIDE_EFFECTS__ */
function checkItems(requirement, message$1) {
	return {
		kind: "validation",
		type: "check_items",
		reference: checkItems,
		async: false,
		expects: null,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed) for (let index = 0; index < dataset.value.length; index++) {
				const item = dataset.value[index];
				if (!this.requirement(item, index, dataset.value)) _addIssue(this, "item", dataset, config$1, {
					input: item,
					path: [{
						type: "array",
						origin: "value",
						input: dataset.value,
						key: index,
						value: item
					}]
				});
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/checkItems/checkItemsAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function checkItemsAsync(requirement, message$1) {
	return {
		kind: "validation",
		type: "check_items",
		reference: checkItemsAsync,
		async: true,
		expects: null,
		requirement,
		message: message$1,
		async "~run"(dataset, config$1) {
			if (dataset.typed) {
				const requirementResults = await Promise.all(dataset.value.map(this.requirement));
				for (let index = 0; index < dataset.value.length; index++) if (!requirementResults[index]) {
					const item = dataset.value[index];
					_addIssue(this, "item", dataset, config$1, {
						input: item,
						path: [{
							type: "array",
							origin: "value",
							input: dataset.value,
							key: index,
							value: item
						}]
					});
				}
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/codePoints/codePoints.ts
/* @__NO_SIDE_EFFECTS__ */
function codePoints(requirement, message$1) {
	return {
		kind: "validation",
		type: "code_points",
		reference: codePoints,
		async: false,
		expects: `${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed) {
				const count = /* @__PURE__ */ _getCodePointCount(dataset.value);
				if (count !== this.requirement) _addIssue(this, "code points", dataset, config$1, { received: `${count}` });
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/creditCard/creditCard.ts
/**
* Credit card regex.
*/
const CREDIT_CARD_REGEX = /^(?:\d{13,19}|\d{4}(?: \d{3,6}){2,4}|\d{4}(?:-\d{3,6}){2,4})$/u;
/**
* Sanitize regex.
*/
const SANITIZE_REGEX = /[- ]/gu;
/**
* Provider regex list.
*/
const PROVIDER_REGEX_LIST = [
	/^3[47]\d{13}$/u,
	/^3(?:0[0-5]|[68]\d)\d{11,13}$/u,
	/^6(?:011|5\d{2})\d{12,15}$/u,
	/^(?:2131|1800|35\d{3})\d{11}$/u,
	/^(?:5[1-5]\d{2}|222\d|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)\d{12}$/u,
	/^(?:6[27]\d{14,17}|81\d{14,17})$/u,
	/^4\d{12}(?:\d{3,6})?$/u
];
/* @__NO_SIDE_EFFECTS__ */
function creditCard(message$1) {
	return {
		kind: "validation",
		type: "credit_card",
		reference: creditCard,
		async: false,
		expects: null,
		requirement(input) {
			let sanitized;
			return CREDIT_CARD_REGEX.test(input) && (sanitized = input.replace(SANITIZE_REGEX, "")) && PROVIDER_REGEX_LIST.some((regex$1) => regex$1.test(sanitized)) && /* @__PURE__ */ _isLuhnAlgo(sanitized);
		},
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "credit card", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/cuid2/cuid2.ts
/* @__NO_SIDE_EFFECTS__ */
function cuid2(message$1) {
	return {
		kind: "validation",
		type: "cuid2",
		reference: cuid2,
		async: false,
		expects: null,
		requirement: CUID2_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "Cuid2", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/decimal/decimal.ts
/* @__NO_SIDE_EFFECTS__ */
function decimal(message$1) {
	return {
		kind: "validation",
		type: "decimal",
		reference: decimal,
		async: false,
		expects: null,
		requirement: DECIMAL_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "decimal", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/description/description.ts
/**
* Creates a description metadata action.
*
* @param description_ The description text.
*
* @returns A description action.
*/
/* @__NO_SIDE_EFFECTS__ */
function description(description_) {
	return {
		kind: "metadata",
		type: "description",
		reference: description,
		description: description_
	};
}

//#endregion
//#region src/actions/digits/digits.ts
/* @__NO_SIDE_EFFECTS__ */
function digits(message$1) {
	return {
		kind: "validation",
		type: "digits",
		reference: digits,
		async: false,
		expects: null,
		requirement: DIGITS_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "digits", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/domain/domain.ts
/* @__NO_SIDE_EFFECTS__ */
function domain(message$1) {
	return {
		kind: "validation",
		type: "domain",
		reference: domain,
		expects: null,
		async: false,
		requirement: DOMAIN_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "domain", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/email/email.ts
/* @__NO_SIDE_EFFECTS__ */
function email(message$1) {
	return {
		kind: "validation",
		type: "email",
		reference: email,
		expects: null,
		async: false,
		requirement: EMAIL_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "email", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/emoji/emoji.ts
/* @__NO_SIDE_EFFECTS__ */
function emoji(message$1) {
	return {
		kind: "validation",
		type: "emoji",
		reference: emoji,
		async: false,
		expects: null,
		requirement: EMOJI_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "emoji", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/empty/empty.ts
/* @__NO_SIDE_EFFECTS__ */
function empty(message$1) {
	return {
		kind: "validation",
		type: "empty",
		reference: empty,
		async: false,
		expects: "0",
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && dataset.value.length > 0) _addIssue(this, "length", dataset, config$1, { received: `${dataset.value.length}` });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/endsWith/endsWith.ts
/* @__NO_SIDE_EFFECTS__ */
function endsWith(requirement, message$1) {
	return {
		kind: "validation",
		type: "ends_with",
		reference: endsWith,
		async: false,
		expects: `"${requirement}"`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !dataset.value.endsWith(this.requirement)) _addIssue(this, "end", dataset, config$1, { received: `"${dataset.value.slice(-this.requirement.length)}"` });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/entries/entries.ts
/* @__NO_SIDE_EFFECTS__ */
function entries(requirement, message$1) {
	return {
		kind: "validation",
		type: "entries",
		reference: entries,
		async: false,
		expects: `${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (!dataset.typed) return dataset;
			const count = Object.keys(dataset.value).length;
			if (dataset.typed && count !== this.requirement) _addIssue(this, "entries", dataset, config$1, { received: `${count}` });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/everyItem/everyItem.ts
/* @__NO_SIDE_EFFECTS__ */
function everyItem(requirement, message$1) {
	return {
		kind: "validation",
		type: "every_item",
		reference: everyItem,
		async: false,
		expects: null,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !dataset.value.every(this.requirement)) _addIssue(this, "item", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/examples/examples.ts
/**
* Creates an examples metadata action.
*
* @param examples_ The examples.
*
* @returns An examples action.
*
* @beta
*/
/* @__NO_SIDE_EFFECTS__ */
function examples(examples_) {
	return {
		kind: "metadata",
		type: "examples",
		reference: examples,
		examples: examples_
	};
}

//#endregion
//#region src/actions/excludes/excludes.ts
/* @__NO_SIDE_EFFECTS__ */
function excludes(requirement, message$1) {
	const received = /* @__PURE__ */ _stringify(requirement);
	return {
		kind: "validation",
		type: "excludes",
		reference: excludes,
		async: false,
		expects: `!${received}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && dataset.value.includes(this.requirement)) _addIssue(this, "content", dataset, config$1, { received });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/filterItems/filterItems.ts
/* @__NO_SIDE_EFFECTS__ */
function filterItems(operation) {
	return {
		kind: "transformation",
		type: "filter_items",
		reference: filterItems,
		async: false,
		operation,
		"~run"(dataset) {
			dataset.value = dataset.value.filter(this.operation);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/findItem/findItem.ts
/* @__NO_SIDE_EFFECTS__ */
function findItem(operation) {
	return {
		kind: "transformation",
		type: "find_item",
		reference: findItem,
		async: false,
		operation,
		"~run"(dataset) {
			dataset.value = dataset.value.find(this.operation);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/finite/finite.ts
/* @__NO_SIDE_EFFECTS__ */
function finite(message$1) {
	return {
		kind: "validation",
		type: "finite",
		reference: finite,
		async: false,
		expects: null,
		requirement: Number.isFinite,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "finite", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/flavor/flavor.ts
/**
* Creates a flavor transformation action.
*
* @param name The flavor name.
*
* @returns A flavor action.
*
* @beta
*/
/* @__NO_SIDE_EFFECTS__ */
function flavor(name) {
	return {
		kind: "transformation",
		type: "flavor",
		reference: flavor,
		async: false,
		name,
		"~run"(dataset) {
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/graphemes/graphemes.ts
/* @__NO_SIDE_EFFECTS__ */
function graphemes(requirement, message$1) {
	return {
		kind: "validation",
		type: "graphemes",
		reference: graphemes,
		async: false,
		expects: `${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed) {
				const count = /* @__PURE__ */ _getGraphemeCount(dataset.value);
				if (count !== this.requirement) _addIssue(this, "graphemes", dataset, config$1, { received: `${count}` });
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/gtValue/gtValue.ts
/* @__NO_SIDE_EFFECTS__ */
function gtValue(requirement, message$1) {
	return {
		kind: "validation",
		type: "gt_value",
		reference: gtValue,
		async: false,
		expects: `>${requirement instanceof Date ? requirement.toJSON() : /* @__PURE__ */ _stringify(requirement)}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !(dataset.value > this.requirement)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/guard/guard.ts
/* @__NO_SIDE_EFFECTS__ */
function guard(requirement, message$1) {
	return {
		kind: "transformation",
		type: "guard",
		reference: guard,
		async: false,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement(dataset.value)) {
				_addIssue(this, "input", dataset, config$1);
				dataset.typed = false;
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/hash/hash.ts
/**
* Hash lengths object.
*/
const HASH_LENGTHS = {
	md4: 32,
	md5: 32,
	sha1: 40,
	sha256: 64,
	sha384: 96,
	sha512: 128,
	ripemd128: 32,
	ripemd160: 40,
	tiger128: 32,
	tiger160: 40,
	tiger192: 48,
	crc32: 8,
	crc32b: 8,
	adler32: 8
};
/* @__NO_SIDE_EFFECTS__ */
function hash(types, message$1) {
	return {
		kind: "validation",
		type: "hash",
		reference: hash,
		expects: null,
		async: false,
		requirement: RegExp(types.map((type) => `^[a-fA-F0-9]{${HASH_LENGTHS[type]}}$`).join("|"), "u"),
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "hash", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/hexadecimal/hexadecimal.ts
/* @__NO_SIDE_EFFECTS__ */
function hexadecimal(message$1) {
	return {
		kind: "validation",
		type: "hexadecimal",
		reference: hexadecimal,
		async: false,
		expects: null,
		requirement: HEXADECIMAL_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "hexadecimal", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/hexColor/hexColor.ts
/* @__NO_SIDE_EFFECTS__ */
function hexColor(message$1) {
	return {
		kind: "validation",
		type: "hex_color",
		reference: hexColor,
		async: false,
		expects: null,
		requirement: HEX_COLOR_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "hex color", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/imei/imei.ts
/* @__NO_SIDE_EFFECTS__ */
function imei(message$1) {
	return {
		kind: "validation",
		type: "imei",
		reference: imei,
		async: false,
		expects: null,
		requirement(input) {
			return IMEI_REGEX.test(input) && /* @__PURE__ */ _isLuhnAlgo(input);
		},
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "IMEI", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/includes/includes.ts
/* @__NO_SIDE_EFFECTS__ */
function includes(requirement, message$1) {
	const expects = /* @__PURE__ */ _stringify(requirement);
	return {
		kind: "validation",
		type: "includes",
		reference: includes,
		async: false,
		expects,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !dataset.value.includes(this.requirement)) _addIssue(this, "content", dataset, config$1, { received: `!${expects}` });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/integer/integer.ts
/* @__NO_SIDE_EFFECTS__ */
function integer(message$1) {
	return {
		kind: "validation",
		type: "integer",
		reference: integer,
		async: false,
		expects: null,
		requirement: Number.isInteger,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "integer", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/ip/ip.ts
/* @__NO_SIDE_EFFECTS__ */
function ip(message$1) {
	return {
		kind: "validation",
		type: "ip",
		reference: ip,
		async: false,
		expects: null,
		requirement: IP_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "IP", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/ipv4/ipv4.ts
/* @__NO_SIDE_EFFECTS__ */
function ipv4(message$1) {
	return {
		kind: "validation",
		type: "ipv4",
		reference: ipv4,
		async: false,
		expects: null,
		requirement: IPV4_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "IPv4", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/ipv6/ipv6.ts
/* @__NO_SIDE_EFFECTS__ */
function ipv6(message$1) {
	return {
		kind: "validation",
		type: "ipv6",
		reference: ipv6,
		async: false,
		expects: null,
		requirement: IPV6_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "IPv6", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/isbn/utils/_isIsbn10.ts
/**
* [Validates an ISBN-10](https://en.wikipedia.org/wiki/ISBN#ISBN-10_check_digits).
*
* @param input The input value.
*
* @returns `true` if the input is a valid ISBN-10, `false` otherwise.
*
* @internal
*/
function _isIsbn10(input) {
	const digits$1 = input.split("").map((c) => c === "X" ? 10 : parseInt(c));
	let sum = 0;
	for (let i = 0; i < 10; i++) sum += digits$1[i] * (10 - i);
	return sum % 11 === 0;
}

//#endregion
//#region src/actions/isbn/utils/_isIsbn13.ts
/**
* [Validates an ISBN-13](https://en.wikipedia.org/wiki/ISBN#ISBN-13_check_digit_calculation).
*
* @param input The input value.
*
* @returns `true` if the input is a valid ISBN-13, `false` otherwise.
*
* @internal
*/
function _isIsbn13(input) {
	const digits$1 = input.split("").map((c) => parseInt(c));
	let sum = 0;
	for (let i = 0; i < 13; i++) sum += digits$1[i] * (i % 2 === 0 ? 1 : 3);
	return sum % 10 === 0;
}

//#endregion
//#region src/actions/isbn/isbn.ts
/**
* ISBN separator regex.
*/
const ISBN_SEPARATOR_REGEX = /[- ]/gu;
/**
* ISBN-10 detection regex.
*/
const ISBN_10_DETECTION_REGEX = /^\d{9}[\dX]$/u;
/**
* ISBN-13 detection regex.
*/
const ISBN_13_DETECTION_REGEX = /^\d{13}$/u;
/* @__NO_SIDE_EFFECTS__ */
function isbn(message$1) {
	return {
		kind: "validation",
		type: "isbn",
		reference: isbn,
		async: false,
		expects: null,
		requirement(input) {
			const replacedInput = input.replace(ISBN_SEPARATOR_REGEX, "");
			if (ISBN_10_DETECTION_REGEX.test(replacedInput)) return _isIsbn10(replacedInput);
			else if (ISBN_13_DETECTION_REGEX.test(replacedInput)) return _isIsbn13(replacedInput);
			return false;
		},
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "ISBN", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/isrc/isrc.ts
/* @__NO_SIDE_EFFECTS__ */
function isrc(message$1) {
	return {
		kind: "validation",
		type: "isrc",
		reference: isrc,
		async: false,
		expects: null,
		requirement: ISRC_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "ISRC", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/isoDate/isoDate.ts
/* @__NO_SIDE_EFFECTS__ */
function isoDate(message$1) {
	return {
		kind: "validation",
		type: "iso_date",
		reference: isoDate,
		async: false,
		expects: null,
		requirement: ISO_DATE_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "date", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/isoDateTime/isoDateTime.ts
/* @__NO_SIDE_EFFECTS__ */
function isoDateTime(message$1) {
	return {
		kind: "validation",
		type: "iso_date_time",
		reference: isoDateTime,
		async: false,
		expects: null,
		requirement: ISO_DATE_TIME_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "date-time", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/isoDateTimeSecond/isoDateTimeSecond.ts
/* @__NO_SIDE_EFFECTS__ */
function isoDateTimeSecond(message$1) {
	return {
		kind: "validation",
		type: "iso_date_time_second",
		reference: isoDateTimeSecond,
		async: false,
		expects: null,
		requirement: ISO_DATE_TIME_SECOND_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "date-time-second", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/isoTime/isoTime.ts
/* @__NO_SIDE_EFFECTS__ */
function isoTime(message$1) {
	return {
		kind: "validation",
		type: "iso_time",
		reference: isoTime,
		async: false,
		expects: null,
		requirement: ISO_TIME_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "time", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/isoTimeSecond/isoTimeSecond.ts
/* @__NO_SIDE_EFFECTS__ */
function isoTimeSecond(message$1) {
	return {
		kind: "validation",
		type: "iso_time_second",
		reference: isoTimeSecond,
		async: false,
		expects: null,
		requirement: ISO_TIME_SECOND_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "time-second", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/isoTimestamp/isoTimestamp.ts
/* @__NO_SIDE_EFFECTS__ */
function isoTimestamp(message$1) {
	return {
		kind: "validation",
		type: "iso_timestamp",
		reference: isoTimestamp,
		async: false,
		expects: null,
		requirement: ISO_TIMESTAMP_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "timestamp", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/isoWeek/isoWeek.ts
/* @__NO_SIDE_EFFECTS__ */
function isoWeek(message$1) {
	return {
		kind: "validation",
		type: "iso_week",
		reference: isoWeek,
		async: false,
		expects: null,
		requirement: ISO_WEEK_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "week", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/jwsCompact/jwsCompact.ts
/* @__NO_SIDE_EFFECTS__ */
function jwsCompact(message$1) {
	return {
		kind: "validation",
		type: "jws_compact",
		reference: jwsCompact,
		async: false,
		expects: null,
		requirement: JWS_COMPACT_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "JWS compact", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/ksuid/ksuid.ts
/* @__NO_SIDE_EFFECTS__ */
function ksuid(message$1) {
	return {
		kind: "validation",
		type: "ksuid",
		reference: ksuid,
		async: false,
		expects: null,
		requirement: KSUID_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "KSUID", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/length/length.ts
/* @__NO_SIDE_EFFECTS__ */
function length(requirement, message$1) {
	return {
		kind: "validation",
		type: "length",
		reference: length,
		async: false,
		expects: `${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && dataset.value.length !== this.requirement) _addIssue(this, "length", dataset, config$1, { received: `${dataset.value.length}` });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/ltValue/ltValue.ts
/* @__NO_SIDE_EFFECTS__ */
function ltValue(requirement, message$1) {
	return {
		kind: "validation",
		type: "lt_value",
		reference: ltValue,
		async: false,
		expects: `<${requirement instanceof Date ? requirement.toJSON() : /* @__PURE__ */ _stringify(requirement)}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !(dataset.value < this.requirement)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/mac/mac.ts
/* @__NO_SIDE_EFFECTS__ */
function mac(message$1) {
	return {
		kind: "validation",
		type: "mac",
		reference: mac,
		async: false,
		expects: null,
		requirement: MAC_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "MAC", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/mac48/mac48.ts
/* @__NO_SIDE_EFFECTS__ */
function mac48(message$1) {
	return {
		kind: "validation",
		type: "mac48",
		reference: mac48,
		async: false,
		expects: null,
		requirement: MAC48_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "48-bit MAC", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/mac64/mac64.ts
/* @__NO_SIDE_EFFECTS__ */
function mac64(message$1) {
	return {
		kind: "validation",
		type: "mac64",
		reference: mac64,
		async: false,
		expects: null,
		requirement: MAC64_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "64-bit MAC", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/mapItems/mapItems.ts
/* @__NO_SIDE_EFFECTS__ */
function mapItems(operation) {
	return {
		kind: "transformation",
		type: "map_items",
		reference: mapItems,
		async: false,
		operation,
		"~run"(dataset) {
			dataset.value = dataset.value.map(this.operation);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/maxBytes/maxBytes.ts
/* @__NO_SIDE_EFFECTS__ */
function maxBytes(requirement, message$1) {
	return {
		kind: "validation",
		type: "max_bytes",
		reference: maxBytes,
		async: false,
		expects: `<=${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed) {
				const length$1 = /* @__PURE__ */ _getByteCount(dataset.value);
				if (length$1 > this.requirement) _addIssue(this, "bytes", dataset, config$1, { received: `${length$1}` });
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/maxCodePoints/maxCodePoints.ts
/* @__NO_SIDE_EFFECTS__ */
function maxCodePoints(requirement, message$1) {
	return {
		kind: "validation",
		type: "max_code_points",
		reference: maxCodePoints,
		async: false,
		expects: `<=${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed) {
				const count = /* @__PURE__ */ _getCodePointCount(dataset.value);
				if (count > this.requirement) _addIssue(this, "code points", dataset, config$1, { received: `${count}` });
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/maxEntries/maxEntries.ts
/* @__NO_SIDE_EFFECTS__ */
function maxEntries(requirement, message$1) {
	return {
		kind: "validation",
		type: "max_entries",
		reference: maxEntries,
		async: false,
		expects: `<=${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (!dataset.typed) return dataset;
			const count = Object.keys(dataset.value).length;
			if (dataset.typed && count > this.requirement) _addIssue(this, "entries", dataset, config$1, { received: `${count}` });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/maxGraphemes/maxGraphemes.ts
/* @__NO_SIDE_EFFECTS__ */
function maxGraphemes(requirement, message$1) {
	return {
		kind: "validation",
		type: "max_graphemes",
		reference: maxGraphemes,
		async: false,
		expects: `<=${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed) {
				const count = /* @__PURE__ */ _getGraphemeCount(dataset.value);
				if (count > this.requirement) _addIssue(this, "graphemes", dataset, config$1, { received: `${count}` });
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/maxLength/maxLength.ts
/* @__NO_SIDE_EFFECTS__ */
function maxLength(requirement, message$1) {
	return {
		kind: "validation",
		type: "max_length",
		reference: maxLength,
		async: false,
		expects: `<=${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && dataset.value.length > this.requirement) _addIssue(this, "length", dataset, config$1, { received: `${dataset.value.length}` });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/maxSize/maxSize.ts
/* @__NO_SIDE_EFFECTS__ */
function maxSize(requirement, message$1) {
	return {
		kind: "validation",
		type: "max_size",
		reference: maxSize,
		async: false,
		expects: `<=${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && dataset.value.size > this.requirement) _addIssue(this, "size", dataset, config$1, { received: `${dataset.value.size}` });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/maxValue/maxValue.ts
/* @__NO_SIDE_EFFECTS__ */
function maxValue(requirement, message$1) {
	return {
		kind: "validation",
		type: "max_value",
		reference: maxValue,
		async: false,
		expects: `<=${requirement instanceof Date ? requirement.toJSON() : /* @__PURE__ */ _stringify(requirement)}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !(dataset.value <= this.requirement)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/maxWords/maxWords.ts
/* @__NO_SIDE_EFFECTS__ */
function maxWords(locales, requirement, message$1) {
	return {
		kind: "validation",
		type: "max_words",
		reference: maxWords,
		async: false,
		expects: `<=${requirement}`,
		locales,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed) {
				const count = /* @__PURE__ */ _getWordCount(this.locales, dataset.value);
				if (count > this.requirement) _addIssue(this, "words", dataset, config$1, { received: `${count}` });
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/metadata/metadata.ts
/**
* Creates a custom metadata action.
*
* @param metadata_ The metadata object.
*
* @returns A metadata action.
*/
/* @__NO_SIDE_EFFECTS__ */
function metadata(metadata_) {
	return {
		kind: "metadata",
		type: "metadata",
		reference: metadata,
		metadata: metadata_
	};
}

//#endregion
//#region src/actions/mimeType/mimeType.ts
/* @__NO_SIDE_EFFECTS__ */
function mimeType(requirement, message$1) {
	return {
		kind: "validation",
		type: "mime_type",
		reference: mimeType,
		async: false,
		expects: /* @__PURE__ */ _joinExpects(requirement.map((option) => `"${option}"`), "|"),
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.includes(dataset.value.type)) _addIssue(this, "MIME type", dataset, config$1, { received: `"${dataset.value.type}"` });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/minBytes/minBytes.ts
/* @__NO_SIDE_EFFECTS__ */
function minBytes(requirement, message$1) {
	return {
		kind: "validation",
		type: "min_bytes",
		reference: minBytes,
		async: false,
		expects: `>=${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed) {
				const length$1 = /* @__PURE__ */ _getByteCount(dataset.value);
				if (length$1 < this.requirement) _addIssue(this, "bytes", dataset, config$1, { received: `${length$1}` });
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/minCodePoints/minCodePoints.ts
/* @__NO_SIDE_EFFECTS__ */
function minCodePoints(requirement, message$1) {
	return {
		kind: "validation",
		type: "min_code_points",
		reference: minCodePoints,
		async: false,
		expects: `>=${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed) {
				const count = /* @__PURE__ */ _getCodePointCount(dataset.value);
				if (count < this.requirement) _addIssue(this, "code points", dataset, config$1, { received: `${count}` });
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/minEntries/minEntries.ts
/* @__NO_SIDE_EFFECTS__ */
function minEntries(requirement, message$1) {
	return {
		kind: "validation",
		type: "min_entries",
		reference: minEntries,
		async: false,
		expects: `>=${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (!dataset.typed) return dataset;
			const count = Object.keys(dataset.value).length;
			if (dataset.typed && count < this.requirement) _addIssue(this, "entries", dataset, config$1, { received: `${count}` });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/minGraphemes/minGraphemes.ts
/* @__NO_SIDE_EFFECTS__ */
function minGraphemes(requirement, message$1) {
	return {
		kind: "validation",
		type: "min_graphemes",
		reference: minGraphemes,
		async: false,
		expects: `>=${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed) {
				const count = /* @__PURE__ */ _getGraphemeCount(dataset.value);
				if (count < this.requirement) _addIssue(this, "graphemes", dataset, config$1, { received: `${count}` });
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/minLength/minLength.ts
/* @__NO_SIDE_EFFECTS__ */
function minLength(requirement, message$1) {
	return {
		kind: "validation",
		type: "min_length",
		reference: minLength,
		async: false,
		expects: `>=${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && dataset.value.length < this.requirement) _addIssue(this, "length", dataset, config$1, { received: `${dataset.value.length}` });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/minSize/minSize.ts
/* @__NO_SIDE_EFFECTS__ */
function minSize(requirement, message$1) {
	return {
		kind: "validation",
		type: "min_size",
		reference: minSize,
		async: false,
		expects: `>=${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && dataset.value.size < this.requirement) _addIssue(this, "size", dataset, config$1, { received: `${dataset.value.size}` });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/minValue/minValue.ts
/* @__NO_SIDE_EFFECTS__ */
function minValue(requirement, message$1) {
	return {
		kind: "validation",
		type: "min_value",
		reference: minValue,
		async: false,
		expects: `>=${requirement instanceof Date ? requirement.toJSON() : /* @__PURE__ */ _stringify(requirement)}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !(dataset.value >= this.requirement)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/minWords/minWords.ts
/* @__NO_SIDE_EFFECTS__ */
function minWords(locales, requirement, message$1) {
	return {
		kind: "validation",
		type: "min_words",
		reference: minWords,
		async: false,
		expects: `>=${requirement}`,
		locales,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed) {
				const count = /* @__PURE__ */ _getWordCount(this.locales, dataset.value);
				if (count < this.requirement) _addIssue(this, "words", dataset, config$1, { received: `${count}` });
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/multipleOf/multipleOf.ts
/* @__NO_SIDE_EFFECTS__ */
function multipleOf(requirement, message$1) {
	return {
		kind: "validation",
		type: "multiple_of",
		reference: multipleOf,
		async: false,
		expects: `%${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && dataset.value % this.requirement != 0) _addIssue(this, "multiple", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/nanoid/nanoid.ts
/* @__NO_SIDE_EFFECTS__ */
function nanoid(message$1) {
	return {
		kind: "validation",
		type: "nanoid",
		reference: nanoid,
		async: false,
		expects: null,
		requirement: NANO_ID_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "Nano ID", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/nonEmpty/nonEmpty.ts
/* @__NO_SIDE_EFFECTS__ */
function nonEmpty(message$1) {
	return {
		kind: "validation",
		type: "non_empty",
		reference: nonEmpty,
		async: false,
		expects: "!0",
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && dataset.value.length === 0) _addIssue(this, "length", dataset, config$1, { received: "0" });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/normalize/normalize.ts
/* @__NO_SIDE_EFFECTS__ */
function normalize(form) {
	return {
		kind: "transformation",
		type: "normalize",
		reference: normalize,
		async: false,
		form,
		"~run"(dataset) {
			dataset.value = dataset.value.normalize(this.form);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/notBytes/notBytes.ts
/* @__NO_SIDE_EFFECTS__ */
function notBytes(requirement, message$1) {
	return {
		kind: "validation",
		type: "not_bytes",
		reference: notBytes,
		async: false,
		expects: `!${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed) {
				const length$1 = /* @__PURE__ */ _getByteCount(dataset.value);
				if (length$1 === this.requirement) _addIssue(this, "bytes", dataset, config$1, { received: `${length$1}` });
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/notCodePoints/notCodePoints.ts
/* @__NO_SIDE_EFFECTS__ */
function notCodePoints(requirement, message$1) {
	return {
		kind: "validation",
		type: "not_code_points",
		reference: notCodePoints,
		async: false,
		expects: `!${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed) {
				const count = /* @__PURE__ */ _getCodePointCount(dataset.value);
				if (count === this.requirement) _addIssue(this, "code points", dataset, config$1, { received: `${count}` });
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/notEntries/notEntries.ts
/* @__NO_SIDE_EFFECTS__ */
function notEntries(requirement, message$1) {
	return {
		kind: "validation",
		type: "not_entries",
		reference: notEntries,
		async: false,
		expects: `!${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (!dataset.typed) return dataset;
			const count = Object.keys(dataset.value).length;
			if (dataset.typed && count === this.requirement) _addIssue(this, "entries", dataset, config$1, { received: `${count}` });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/notGraphemes/notGraphemes.ts
/* @__NO_SIDE_EFFECTS__ */
function notGraphemes(requirement, message$1) {
	return {
		kind: "validation",
		type: "not_graphemes",
		reference: notGraphemes,
		async: false,
		expects: `!${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed) {
				const count = /* @__PURE__ */ _getGraphemeCount(dataset.value);
				if (count === this.requirement) _addIssue(this, "graphemes", dataset, config$1, { received: `${count}` });
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/notLength/notLength.ts
/* @__NO_SIDE_EFFECTS__ */
function notLength(requirement, message$1) {
	return {
		kind: "validation",
		type: "not_length",
		reference: notLength,
		async: false,
		expects: `!${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && dataset.value.length === this.requirement) _addIssue(this, "length", dataset, config$1, { received: `${dataset.value.length}` });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/notSize/notSize.ts
/* @__NO_SIDE_EFFECTS__ */
function notSize(requirement, message$1) {
	return {
		kind: "validation",
		type: "not_size",
		reference: notSize,
		async: false,
		expects: `!${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && dataset.value.size === this.requirement) _addIssue(this, "size", dataset, config$1, { received: `${dataset.value.size}` });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/notValue/notValue.ts
/* @__NO_SIDE_EFFECTS__ */
function notValue(requirement, message$1) {
	return {
		kind: "validation",
		type: "not_value",
		reference: notValue,
		async: false,
		expects: requirement instanceof Date ? `!${requirement.toJSON()}` : `!${/* @__PURE__ */ _stringify(requirement)}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && /* @__PURE__ */ _isValueMatch(this.requirement, dataset.value)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/notValues/notValues.ts
/* @__NO_SIDE_EFFECTS__ */
function notValues(requirement, message$1) {
	return {
		kind: "validation",
		type: "not_values",
		reference: notValues,
		async: false,
		expects: `!${/* @__PURE__ */ _joinExpects(requirement.map((value$1) => value$1 instanceof Date ? value$1.toJSON() : /* @__PURE__ */ _stringify(value$1)), "|")}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && this.requirement.some((requirement$1) => /* @__PURE__ */ _isValueMatch(requirement$1, dataset.value))) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/notWords/notWords.ts
/* @__NO_SIDE_EFFECTS__ */
function notWords(locales, requirement, message$1) {
	return {
		kind: "validation",
		type: "not_words",
		reference: notWords,
		async: false,
		expects: `!${requirement}`,
		locales,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed) {
				const count = /* @__PURE__ */ _getWordCount(this.locales, dataset.value);
				if (count === this.requirement) _addIssue(this, "words", dataset, config$1, { received: `${count}` });
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/octal/octal.ts
/* @__NO_SIDE_EFFECTS__ */
function octal(message$1) {
	return {
		kind: "validation",
		type: "octal",
		reference: octal,
		async: false,
		expects: null,
		requirement: OCTAL_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "octal", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/parseBoolean/parseBoolean.ts
const TRUTHY = [
	true,
	1,
	"true",
	"1",
	"yes",
	"y",
	"on",
	"enabled"
];
const FALSY = [
	false,
	0,
	"false",
	"0",
	"no",
	"n",
	"off",
	"disabled"
];
/* @__NO_SIDE_EFFECTS__ */
function parseBoolean(config$1, message$1) {
	const normalize$1 = (v) => typeof v === "string" ? v.toLowerCase() : v;
	const truthyRaw = config$1?.truthy ?? TRUTHY;
	const falsyRaw = config$1?.falsy ?? FALSY;
	const truthy = config$1?.truthy ? config$1.truthy.map(normalize$1) : TRUTHY;
	const falsy = config$1?.falsy ? config$1.falsy.map(normalize$1) : FALSY;
	return {
		kind: "transformation",
		type: "parse_boolean",
		reference: parseBoolean,
		expects: /* @__PURE__ */ _joinExpects([...truthyRaw, ...falsyRaw].map(_stringify), "|"),
		config: config$1,
		message: message$1,
		async: false,
		"~run"(dataset, config$2) {
			const input = normalize$1(dataset.value);
			if (truthy.includes(input)) dataset.value = true;
			else if (falsy.includes(input)) dataset.value = false;
			else {
				_addIssue(this, "boolean", dataset, config$2);
				dataset.typed = false;
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/parseJson/parseJson.ts
/* @__NO_SIDE_EFFECTS__ */
function parseJson(config$1, message$1) {
	return {
		kind: "transformation",
		type: "parse_json",
		reference: parseJson,
		config: config$1,
		message: message$1,
		async: false,
		"~run"(dataset, config$2) {
			try {
				dataset.value = JSON.parse(dataset.value, this.config?.reviver);
			} catch (error) {
				if (error instanceof Error) {
					_addIssue(this, "JSON", dataset, config$2, { received: `"${error.message}"` });
					dataset.typed = false;
				} else throw error;
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/partialCheck/utils/_isPartiallyTyped/_isPartiallyTyped.ts
/**
* Checks if a dataset is partially typed.
*
* @param dataset The dataset to check.
* @param paths The paths to check.
*
* @returns Whether it is partially typed.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _isPartiallyTyped(dataset, paths) {
	if (dataset.issues) for (const path of paths) for (const issue of dataset.issues) {
		let typed = false;
		const bound = Math.min(path.length, issue.path?.length ?? 0);
		for (let index = 0; index < bound; index++) if (path[index] !== issue.path[index].key && (path[index] !== "$" || issue.path[index].type !== "array")) {
			typed = true;
			break;
		}
		if (!typed) return false;
	}
	return true;
}

//#endregion
//#region src/actions/partialCheck/partialCheck.ts
/* @__NO_SIDE_EFFECTS__ */
function partialCheck(paths, requirement, message$1) {
	return {
		kind: "validation",
		type: "partial_check",
		reference: partialCheck,
		async: false,
		expects: null,
		paths,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if ((dataset.typed || /* @__PURE__ */ _isPartiallyTyped(dataset, paths)) && !this.requirement(dataset.value)) _addIssue(this, "input", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/partialCheck/partialCheckAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function partialCheckAsync(paths, requirement, message$1) {
	return {
		kind: "validation",
		type: "partial_check",
		reference: partialCheckAsync,
		async: true,
		expects: null,
		paths,
		requirement,
		message: message$1,
		async "~run"(dataset, config$1) {
			if ((dataset.typed || /* @__PURE__ */ _isPartiallyTyped(dataset, paths)) && !await this.requirement(dataset.value)) _addIssue(this, "input", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/rawCheck/rawCheck.ts
/**
* Creates a raw check validation action.
*
* @param action The validation action.
*
* @returns A raw check action.
*/
/* @__NO_SIDE_EFFECTS__ */
function rawCheck(action) {
	return {
		kind: "validation",
		type: "raw_check",
		reference: rawCheck,
		async: false,
		expects: null,
		"~run"(dataset, config$1) {
			action({
				dataset,
				config: config$1,
				addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config$1, info)
			});
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/rawCheck/rawCheckAsync.ts
/**
* Creates a raw check validation action.
*
* @param action The validation action.
*
* @returns A raw check action.
*/
/* @__NO_SIDE_EFFECTS__ */
function rawCheckAsync(action) {
	return {
		kind: "validation",
		type: "raw_check",
		reference: rawCheckAsync,
		async: true,
		expects: null,
		async "~run"(dataset, config$1) {
			await action({
				dataset,
				config: config$1,
				addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config$1, info)
			});
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/rawTransform/rawTransform.ts
/**
* Creates a raw transformation action.
*
* @param action The transformation action.
*
* @returns A raw transform action.
*/
/* @__NO_SIDE_EFFECTS__ */
function rawTransform(action) {
	return {
		kind: "transformation",
		type: "raw_transform",
		reference: rawTransform,
		async: false,
		"~run"(dataset, config$1) {
			const output = action({
				dataset,
				config: config$1,
				addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config$1, info),
				NEVER: null
			});
			if (dataset.issues) dataset.typed = false;
			else dataset.value = output;
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/rawTransform/rawTransformAsync.ts
/**
* Creates a raw transformation action.
*
* @param action The transformation action.
*
* @returns A raw transform action.
*/
/* @__NO_SIDE_EFFECTS__ */
function rawTransformAsync(action) {
	return {
		kind: "transformation",
		type: "raw_transform",
		reference: rawTransformAsync,
		async: true,
		async "~run"(dataset, config$1) {
			const output = await action({
				dataset,
				config: config$1,
				addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config$1, info),
				NEVER: null
			});
			if (dataset.issues) dataset.typed = false;
			else dataset.value = output;
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/readonly/readonly.ts
/* @__NO_SIDE_EFFECTS__ */
function readonly() {
	return {
		kind: "transformation",
		type: "readonly",
		reference: readonly,
		async: false,
		"~run"(dataset) {
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/reduceItems/reduceItems.ts
/* @__NO_SIDE_EFFECTS__ */
function reduceItems(operation, initial) {
	return {
		kind: "transformation",
		type: "reduce_items",
		reference: reduceItems,
		async: false,
		operation,
		initial,
		"~run"(dataset) {
			dataset.value = dataset.value.reduce(this.operation, this.initial);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/regex/regex.ts
/* @__NO_SIDE_EFFECTS__ */
function regex(requirement, message$1) {
	return {
		kind: "validation",
		type: "regex",
		reference: regex,
		async: false,
		expects: `${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "format", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/returns/returns.ts
/* @__NO_SIDE_EFFECTS__ */
function returns(schema) {
	return {
		kind: "transformation",
		type: "returns",
		reference: returns,
		async: false,
		schema,
		"~run"(dataset, config$1) {
			const func = dataset.value;
			dataset.value = (...args_) => {
				const returnsDataset = this.schema["~run"]({ value: func(...args_) }, config$1);
				if (returnsDataset.issues) throw new ValiError(returnsDataset.issues);
				return returnsDataset.value;
			};
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/returns/returnsAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function returnsAsync(schema) {
	return {
		kind: "transformation",
		type: "returns",
		reference: returnsAsync,
		async: false,
		schema,
		"~run"(dataset, config$1) {
			const func = dataset.value;
			dataset.value = async (...args_) => {
				const returnsDataset = await this.schema["~run"]({ value: await func(...args_) }, config$1);
				if (returnsDataset.issues) throw new ValiError(returnsDataset.issues);
				return returnsDataset.value;
			};
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/rfcEmail/rfcEmail.ts
/* @__NO_SIDE_EFFECTS__ */
function rfcEmail(message$1) {
	return {
		kind: "validation",
		type: "rfc_email",
		reference: rfcEmail,
		expects: null,
		async: false,
		requirement: RFC_EMAIL_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "email", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/safeInteger/safeInteger.ts
/* @__NO_SIDE_EFFECTS__ */
function safeInteger(message$1) {
	return {
		kind: "validation",
		type: "safe_integer",
		reference: safeInteger,
		async: false,
		expects: null,
		requirement: Number.isSafeInteger,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "safe integer", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/size/size.ts
/* @__NO_SIDE_EFFECTS__ */
function size(requirement, message$1) {
	return {
		kind: "validation",
		type: "size",
		reference: size,
		async: false,
		expects: `${requirement}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && dataset.value.size !== this.requirement) _addIssue(this, "size", dataset, config$1, { received: `${dataset.value.size}` });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/slug/slug.ts
/* @__NO_SIDE_EFFECTS__ */
function slug(message$1) {
	return {
		kind: "validation",
		type: "slug",
		reference: slug,
		async: false,
		expects: null,
		requirement: SLUG_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "slug", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/someItem/someItem.ts
/* @__NO_SIDE_EFFECTS__ */
function someItem(requirement, message$1) {
	return {
		kind: "validation",
		type: "some_item",
		reference: someItem,
		async: false,
		expects: null,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !dataset.value.some(this.requirement)) _addIssue(this, "item", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/sortItems/sortItems.ts
/* @__NO_SIDE_EFFECTS__ */
function sortItems(operation) {
	return {
		kind: "transformation",
		type: "sort_items",
		reference: sortItems,
		async: false,
		operation,
		"~run"(dataset) {
			dataset.value = dataset.value.sort(this.operation);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/startsWith/startsWith.ts
/* @__NO_SIDE_EFFECTS__ */
function startsWith(requirement, message$1) {
	return {
		kind: "validation",
		type: "starts_with",
		reference: startsWith,
		async: false,
		expects: `"${requirement}"`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !dataset.value.startsWith(this.requirement)) _addIssue(this, "start", dataset, config$1, { received: `"${dataset.value.slice(0, this.requirement.length)}"` });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/stringifyJson/stringifyJson.ts
/* @__NO_SIDE_EFFECTS__ */
function stringifyJson(config$1, message$1) {
	return {
		kind: "transformation",
		type: "stringify_json",
		reference: stringifyJson,
		message: message$1,
		config: config$1,
		async: false,
		"~run"(dataset, config$2) {
			try {
				const output = JSON.stringify(dataset.value, this.config?.replacer, this.config?.space);
				if (output === void 0) {
					_addIssue(this, "JSON", dataset, config$2);
					dataset.typed = false;
				} else dataset.value = output;
			} catch (error) {
				if (error instanceof Error) {
					_addIssue(this, "JSON", dataset, config$2, { received: `"${error.message}"` });
					dataset.typed = false;
				} else throw error;
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/title/title.ts
/**
* Creates a title metadata action.
*
* @param title_ The title text.
*
* @returns A title action.
*/
/* @__NO_SIDE_EFFECTS__ */
function title(title_) {
	return {
		kind: "metadata",
		type: "title",
		reference: title,
		title: title_
	};
}

//#endregion
//#region src/actions/toBigint/toBigint.ts
/* @__NO_SIDE_EFFECTS__ */
function toBigint(message$1) {
	return {
		kind: "transformation",
		type: "to_bigint",
		reference: toBigint,
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			try {
				dataset.value = BigInt(dataset.value);
			} catch {
				_addIssue(this, "bigint", dataset, config$1);
				dataset.typed = false;
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/toBoolean/toBoolean.ts
/**
* Creates a to boolean transformation action.
*
* @returns A to boolean action.
*
* @beta
*/
/* @__NO_SIDE_EFFECTS__ */
function toBoolean() {
	return {
		kind: "transformation",
		type: "to_boolean",
		reference: toBoolean,
		async: false,
		"~run"(dataset) {
			dataset.value = Boolean(dataset.value);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/toCamelCase/toCamelCase.ts
/**
* Creates a to camel case transformation action.
*
* Words are separated by `_`, `-` and ASCII whitespace, as well as by case
* and acronym boundaries.
*
* Hint: Acronym runs are normalized to lowercase (e.g. `parseURLValue` →
* `parseUrlValue`) and digits stay attached to the preceding token (e.g.
* `item2Name` → `item2Name`).
*
* @returns A to camel case action.
*
* @beta
*/
/* @__NO_SIDE_EFFECTS__ */
function toCamelCase() {
	return {
		kind: "transformation",
		type: "to_camel_case",
		reference: toCamelCase,
		async: false,
		"~run"(dataset) {
			dataset.value = /* @__PURE__ */ _formatCase(dataset.value, "", false, true);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/toDate/toDate.ts
/* @__NO_SIDE_EFFECTS__ */
function toDate(message$1) {
	return {
		kind: "transformation",
		type: "to_date",
		reference: toDate,
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			try {
				dataset.value = new Date(dataset.value);
				if (isNaN(dataset.value)) {
					_addIssue(this, "date", dataset, config$1, { received: "\"Invalid Date\"" });
					dataset.typed = false;
				}
			} catch {
				_addIssue(this, "date", dataset, config$1);
				dataset.typed = false;
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/toKebabCase/toKebabCase.ts
/**
* Creates a to kebab case transformation action.
*
* Words are separated by `_`, `-` and ASCII whitespace, as well as by case
* and acronym boundaries.
*
* Hint: Acronym runs are normalized to lowercase (e.g. `parseURLValue` →
* `parse-url-value`) and digits stay attached to the preceding token (e.g.
* `item2Name` → `item2-name`).
*
* @returns A to kebab case action.
*
* @beta
*/
/* @__NO_SIDE_EFFECTS__ */
function toKebabCase() {
	return {
		kind: "transformation",
		type: "to_kebab_case",
		reference: toKebabCase,
		async: false,
		"~run"(dataset) {
			dataset.value = /* @__PURE__ */ _formatCase(dataset.value, "-", false, false);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/toLowerCase/toLowerCase.ts
/**
* Creates a to lower case transformation action.
*
* @returns A to lower case action.
*/
/* @__NO_SIDE_EFFECTS__ */
function toLowerCase() {
	return {
		kind: "transformation",
		type: "to_lower_case",
		reference: toLowerCase,
		async: false,
		"~run"(dataset) {
			dataset.value = dataset.value.toLowerCase();
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/toMaxValue/toMaxValue.ts
/**
* Creates a to max value transformation action.
*
* @param requirement The maximum value.
*
* @returns A to max value action.
*/
/* @__NO_SIDE_EFFECTS__ */
function toMaxValue(requirement) {
	return {
		kind: "transformation",
		type: "to_max_value",
		reference: toMaxValue,
		async: false,
		requirement,
		"~run"(dataset) {
			dataset.value = dataset.value > this.requirement ? this.requirement : dataset.value;
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/toMinValue/toMinValue.ts
/**
* Creates a to min value transformation action.
*
* @param requirement The minimum value.
*
* @returns A to min value action.
*/
/* @__NO_SIDE_EFFECTS__ */
function toMinValue(requirement) {
	return {
		kind: "transformation",
		type: "to_min_value",
		reference: toMinValue,
		async: false,
		requirement,
		"~run"(dataset) {
			dataset.value = dataset.value < this.requirement ? this.requirement : dataset.value;
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/toNumber/toNumber.ts
/* @__NO_SIDE_EFFECTS__ */
function toNumber(message$1) {
	return {
		kind: "transformation",
		type: "to_number",
		reference: toNumber,
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			try {
				dataset.value = Number(dataset.value);
				if (isNaN(dataset.value)) {
					_addIssue(this, "number", dataset, config$1);
					dataset.typed = false;
				}
			} catch {
				_addIssue(this, "number", dataset, config$1);
				dataset.typed = false;
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/toPascalCase/toPascalCase.ts
/**
* Creates a to pascal case transformation action.
*
* Words are separated by `_`, `-` and ASCII whitespace, as well as by case
* and acronym boundaries.
*
* Hint: Acronym runs are normalized to lowercase (e.g. `parseURLValue` →
* `ParseUrlValue`) and digits stay attached to the preceding token (e.g.
* `item2Name` → `Item2Name`).
*
* @returns A to pascal case action.
*
* @beta
*/
/* @__NO_SIDE_EFFECTS__ */
function toPascalCase() {
	return {
		kind: "transformation",
		type: "to_pascal_case",
		reference: toPascalCase,
		async: false,
		"~run"(dataset) {
			dataset.value = /* @__PURE__ */ _formatCase(dataset.value, "", true, true);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/toSnakeCase/toSnakeCase.ts
/**
* Creates a to snake case transformation action.
*
* Words are separated by `_`, `-` and ASCII whitespace, as well as by case
* and acronym boundaries.
*
* Hint: Acronym runs are normalized to lowercase (e.g. `parseURLValue` →
* `parse_url_value`) and digits stay attached to the preceding token (e.g.
* `item2Name` → `item2_name`).
*
* @returns A to snake case action.
*
* @beta
*/
/* @__NO_SIDE_EFFECTS__ */
function toSnakeCase() {
	return {
		kind: "transformation",
		type: "to_snake_case",
		reference: toSnakeCase,
		async: false,
		"~run"(dataset) {
			dataset.value = /* @__PURE__ */ _formatCase(dataset.value, "_", false, false);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/toString/toString.ts
/* @__NO_SIDE_EFFECTS__ */
function toString(message$1) {
	return {
		kind: "transformation",
		type: "to_string",
		reference: toString,
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			try {
				dataset.value = String(dataset.value);
			} catch {
				_addIssue(this, "string", dataset, config$1);
				dataset.typed = false;
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/toUpperCase/toUpperCase.ts
/**
* Creates a to upper case transformation action.
*
* @returns A to upper case action.
*/
/* @__NO_SIDE_EFFECTS__ */
function toUpperCase() {
	return {
		kind: "transformation",
		type: "to_upper_case",
		reference: toUpperCase,
		async: false,
		"~run"(dataset) {
			dataset.value = dataset.value.toUpperCase();
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/transform/transform.ts
/**
* Creates a custom transformation action.
*
* @param operation The transformation operation.
*
* @returns A transform action.
*/
/* @__NO_SIDE_EFFECTS__ */
function transform(operation) {
	return {
		kind: "transformation",
		type: "transform",
		reference: transform,
		async: false,
		operation,
		"~run"(dataset) {
			dataset.value = this.operation(dataset.value);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/transform/transformAsync.ts
/**
* Creates a custom transformation action.
*
* @param operation The transformation operation.
*
* @returns A transform action.
*/
/* @__NO_SIDE_EFFECTS__ */
function transformAsync(operation) {
	return {
		kind: "transformation",
		type: "transform",
		reference: transformAsync,
		async: true,
		operation,
		async "~run"(dataset) {
			dataset.value = await this.operation(dataset.value);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/trim/trim.ts
/**
* Creates a trim transformation action.
*
* @returns A trim action.
*/
/* @__NO_SIDE_EFFECTS__ */
function trim() {
	return {
		kind: "transformation",
		type: "trim",
		reference: trim,
		async: false,
		"~run"(dataset) {
			dataset.value = dataset.value.trim();
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/trimEnd/trimEnd.ts
/**
* Creates a trim end transformation action.
*
* @returns A trim end action.
*/
/* @__NO_SIDE_EFFECTS__ */
function trimEnd() {
	return {
		kind: "transformation",
		type: "trim_end",
		reference: trimEnd,
		async: false,
		"~run"(dataset) {
			dataset.value = dataset.value.trimEnd();
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/trimStart/trimStart.ts
/**
* Creates a trim start transformation action.
*
* @returns A trim start action.
*/
/* @__NO_SIDE_EFFECTS__ */
function trimStart() {
	return {
		kind: "transformation",
		type: "trim_start",
		reference: trimStart,
		async: false,
		"~run"(dataset) {
			dataset.value = dataset.value.trimStart();
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/ulid/ulid.ts
/* @__NO_SIDE_EFFECTS__ */
function ulid(message$1) {
	return {
		kind: "validation",
		type: "ulid",
		reference: ulid,
		async: false,
		expects: null,
		requirement: ULID_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "ULID", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/url/url.ts
/* @__NO_SIDE_EFFECTS__ */
function url(message$1) {
	return {
		kind: "validation",
		type: "url",
		reference: url,
		async: false,
		expects: null,
		requirement(input) {
			try {
				if (URL.canParse) return URL.canParse(input);
				new URL(input);
				return true;
			} catch {
				return false;
			}
		},
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "URL", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/uuid/uuid.ts
/* @__NO_SIDE_EFFECTS__ */
function uuid(message$1) {
	return {
		kind: "validation",
		type: "uuid",
		reference: uuid,
		async: false,
		expects: null,
		requirement: UUID_REGEX,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "UUID", dataset, config$1);
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/value/value.ts
/* @__NO_SIDE_EFFECTS__ */
function value(requirement, message$1) {
	return {
		kind: "validation",
		type: "value",
		reference: value,
		async: false,
		expects: requirement instanceof Date ? requirement.toJSON() : /* @__PURE__ */ _stringify(requirement),
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !/* @__PURE__ */ _isValueMatch(this.requirement, dataset.value)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/values/values.ts
/* @__NO_SIDE_EFFECTS__ */
function values(requirement, message$1) {
	return {
		kind: "validation",
		type: "values",
		reference: values,
		async: false,
		expects: `${/* @__PURE__ */ _joinExpects(requirement.map((value$1) => value$1 instanceof Date ? value$1.toJSON() : /* @__PURE__ */ _stringify(value$1)), "|")}`,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement.some((requirement$1) => /* @__PURE__ */ _isValueMatch(requirement$1, dataset.value))) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
			return dataset;
		}
	};
}

//#endregion
//#region src/actions/words/words.ts
/* @__NO_SIDE_EFFECTS__ */
function words(locales, requirement, message$1) {
	return {
		kind: "validation",
		type: "words",
		reference: words,
		async: false,
		expects: `${requirement}`,
		locales,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed) {
				const count = /* @__PURE__ */ _getWordCount(this.locales, dataset.value);
				if (count !== this.requirement) _addIssue(this, "words", dataset, config$1, { received: `${count}` });
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/const.ts
const ABORT_EARLY_CONFIG = { abortEarly: true };

//#endregion
//#region src/methods/assert/assert.ts
/**
* Checks if the input matches the schema. As this is an assertion function, it
* can be used as a type guard.
*
* @param schema The schema to be used.
* @param input The input to be tested.
*/
function assert(schema, input) {
	const issues = schema["~run"]({ value: input }, ABORT_EARLY_CONFIG).issues;
	if (issues) throw new ValiError(issues);
}

//#endregion
//#region src/methods/cache/_LruCache.ts
/**
* Efficient LRU cache using Map iteration order.
*/
var _LruCache = class {
	constructor(config$1) {
		this.refCount = 0;
		this.maxSize = config$1?.maxSize ?? 1e3;
		this.maxAge = config$1?.maxAge ?? Infinity;
		this.hasMaxAge = isFinite(this.maxAge);
	}
	/**
	* Stringifies an unknown input to a cache key component.
	*
	* @param input The unknown input.
	*
	* @returns A cache key component.
	*/
	stringify(input) {
		const type = typeof input;
		if (type === "string") return `"${input}"`;
		if (type === "number" || type === "boolean") return `${input}`;
		if (type === "bigint") return `${input}n`;
		if (type === "object" || type === "function") {
			if (input) {
				this.refIds ?? (this.refIds = /* @__PURE__ */ new WeakMap());
				let id = this.refIds.get(input);
				if (!id) {
					id = ++this.refCount;
					this.refIds.set(input, id);
				}
				return `#${id}`;
			}
			return "null";
		}
		return type;
	}
	/**
	* Creates a cache key from input and config.
	*
	* @param input The input value.
	* @param config The parse configuration.
	*
	* @returns The cache key.
	*/
	key(input, config$1 = {}) {
		return `${this.stringify(input)}|${this.stringify(config$1.lang)}|${this.stringify(config$1.message)}|${this.stringify(config$1.abortEarly)}|${this.stringify(config$1.abortPipeEarly)}`;
	}
	/**
	* Gets a value from the cache by key.
	*
	* @param key The cache key.
	*
	* @returns The cached value.
	*/
	get(key) {
		if (!this.store) return void 0;
		const entry = this.store.get(key);
		if (!entry) return void 0;
		if (this.hasMaxAge && Date.now() - entry[1] > this.maxAge) {
			this.store.delete(key);
			return;
		}
		this.store.delete(key);
		this.store.set(key, entry);
		return entry[0];
	}
	/**
	* Sets a value in the cache by key.
	*
	* @param key The cache key.
	* @param value The cached value.
	*/
	set(key, value$1) {
		this.store ?? (this.store = /* @__PURE__ */ new Map());
		this.store.delete(key);
		const timestamp = this.hasMaxAge ? Date.now() : 0;
		this.store.set(key, [value$1, timestamp]);
		if (this.store.size > this.maxSize) this.store.delete(this.store.keys().next().value);
	}
	/**
	* Clears all entries from the cache.
	*/
	clear() {
		this.store?.clear();
	}
};

//#endregion
//#region src/methods/cache/cache.ts
/* @__NO_SIDE_EFFECTS__ */
function cache(schema, config$1) {
	return _standardSchema({
		...schema,
		cacheConfig: config$1,
		cache: new _LruCache(config$1),
		"~run"(dataset, runConfig) {
			const key = this.cache.key(dataset.value, runConfig);
			let outputDataset = this.cache.get(key);
			if (!outputDataset) this.cache.set(key, outputDataset = schema["~run"](dataset, runConfig));
			return /* @__PURE__ */ _cloneDataset(outputDataset);
		}
	});
}

//#endregion
//#region src/methods/cache/cacheAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function cacheAsync(schema, config$1) {
	let activeRuns;
	return _standardSchema({
		...schema,
		async: true,
		cacheConfig: config$1,
		cache: new _LruCache(config$1),
		async "~run"(dataset, runConfig) {
			const key = this.cache.key(dataset.value, runConfig);
			const cached = this.cache.get(key);
			if (cached) return /* @__PURE__ */ _cloneDataset(cached);
			let promise$1 = activeRuns?.get(key);
			if (!promise$1) {
				activeRuns ?? (activeRuns = /* @__PURE__ */ new Map());
				promise$1 = Promise.resolve(schema["~run"](dataset, runConfig));
				activeRuns.set(key, promise$1);
			}
			try {
				const outputDataset = await promise$1;
				this.cache.set(key, outputDataset);
				return /* @__PURE__ */ _cloneDataset(outputDataset);
			} finally {
				activeRuns?.delete(key);
			}
		}
	});
}

//#endregion
//#region src/methods/config/config.ts
/**
* Changes the local configuration of a schema.
*
* @param schema The schema to configure.
* @param config The parse configuration.
*
* @returns The configured schema.
*/
/* @__NO_SIDE_EFFECTS__ */
function config(schema, config$1) {
	return _standardSchema({
		...schema,
		"~run"(dataset, config_) {
			return schema["~run"](dataset, {
				...config_,
				...config$1
			});
		}
	});
}

//#endregion
//#region src/methods/getFallback/getFallback.ts
/**
* Returns the fallback value of the schema.
*
* @param schema The schema to get it from.
* @param dataset The output dataset if available.
* @param config The config if available.
*
* @returns The fallback value.
*/
/* @__NO_SIDE_EFFECTS__ */
function getFallback(schema, dataset, config$1) {
	return typeof schema.fallback === "function" ? schema.fallback(dataset, config$1) : schema.fallback;
}

//#endregion
//#region src/methods/fallback/fallback.ts
/**
* Returns a fallback value as output if the input does not match the schema.
*
* @param schema The schema to catch.
* @param fallback The fallback value.
*
* @returns The passed schema.
*/
/* @__NO_SIDE_EFFECTS__ */
function fallback(schema, fallback$1) {
	return _standardSchema({
		...schema,
		fallback: fallback$1,
		"~run"(dataset, config$1) {
			const outputDataset = schema["~run"](dataset, config$1);
			return outputDataset.issues ? {
				typed: true,
				value: /* @__PURE__ */ getFallback(this, outputDataset, config$1)
			} : outputDataset;
		}
	});
}

//#endregion
//#region src/methods/fallback/fallbackAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function fallbackAsync(schema, fallback$1) {
	return _standardSchema({
		...schema,
		fallback: fallback$1,
		async: true,
		async "~run"(dataset, config$1) {
			const outputDataset = await schema["~run"](dataset, config$1);
			return outputDataset.issues ? {
				typed: true,
				value: await /* @__PURE__ */ getFallback(this, outputDataset, config$1)
			} : outputDataset;
		}
	});
}

//#endregion
//#region src/methods/flatten/flatten.ts
/* @__NO_SIDE_EFFECTS__ */
function flatten(issues) {
	const flatErrors = {};
	for (const issue of issues) if (issue.path) {
		const dotPath = /* @__PURE__ */ getDotPath(issue);
		if (dotPath) {
			if (!flatErrors.nested) flatErrors.nested = {};
			if (Object.prototype.hasOwnProperty.call(flatErrors.nested, dotPath)) flatErrors.nested[dotPath].push(issue.message);
			else flatErrors.nested[dotPath] = [issue.message];
		} else if (flatErrors.other) flatErrors.other.push(issue.message);
		else flatErrors.other = [issue.message];
	} else if (flatErrors.root) flatErrors.root.push(issue.message);
	else flatErrors.root = [issue.message];
	return flatErrors;
}

//#endregion
//#region src/methods/forward/forward.ts
/**
* Forwards the issues of the passed validation action.
*
* @param action The validation action.
* @param path The path to forward the issues to.
*
* @returns The modified action.
*/
/* @__NO_SIDE_EFFECTS__ */
function forward(action, path) {
	return {
		...action,
		"~run"(dataset, config$1) {
			const prevIssues = dataset.issues && [...dataset.issues];
			dataset = action["~run"](dataset, config$1);
			if (dataset.issues) {
				for (const issue of dataset.issues) if (!prevIssues?.includes(issue)) {
					let pathInput = dataset.value;
					for (const key of path) {
						const pathValue = pathInput[key];
						const pathItem = {
							type: "unknown",
							origin: "value",
							input: pathInput,
							key,
							value: pathValue
						};
						if (issue.path) issue.path.push(pathItem);
						else issue.path = [pathItem];
						if (!pathValue) break;
						pathInput = pathValue;
					}
				}
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/methods/forward/forwardAsync.ts
/**
* Forwards the issues of the passed validation action.
*
* @param action The validation action.
* @param path The path to forward the issues to.
*
* @returns The modified action.
*/
/* @__NO_SIDE_EFFECTS__ */
function forwardAsync(action, path) {
	return {
		...action,
		async: true,
		async "~run"(dataset, config$1) {
			const prevIssues = dataset.issues && [...dataset.issues];
			dataset = await action["~run"](dataset, config$1);
			if (dataset.issues) {
				for (const issue of dataset.issues) if (!prevIssues?.includes(issue)) {
					let pathInput = dataset.value;
					for (const key of path) {
						const pathValue = pathInput[key];
						const pathItem = {
							type: "unknown",
							origin: "value",
							input: pathInput,
							key,
							value: pathValue
						};
						if (issue.path) issue.path.push(pathItem);
						else issue.path = [pathItem];
						if (!pathValue) break;
						pathInput = pathValue;
					}
				}
			}
			return dataset;
		}
	};
}

//#endregion
//#region src/methods/getDefault/getDefault.ts
/**
* Returns the default value of the schema.
*
* @param schema The schema to get it from.
* @param dataset The input dataset if available.
* @param config The config if available.
*
* @returns The default value.
*/
/* @__NO_SIDE_EFFECTS__ */
function getDefault(schema, dataset, config$1) {
	return typeof schema.default === "function" ? schema.default(dataset, config$1) : schema.default;
}

//#endregion
//#region src/methods/getDefaults/getDefaults.ts
/**
* Returns the default values of the schema.
*
* Hint: The difference to `getDefault` is that for object and tuple schemas
* this function recursively returns the default values of the subschemas
* instead of `undefined`.
*
* @param schema The schema to get them from.
*
* @returns The default values.
*/
/* @__NO_SIDE_EFFECTS__ */
function getDefaults(schema) {
	if ("entries" in schema) {
		const object$1 = {};
		for (const key in schema.entries) object$1[key] = /* @__PURE__ */ getDefaults(schema.entries[key]);
		return object$1;
	}
	if ("items" in schema) return schema.items.map(getDefaults);
	return /* @__PURE__ */ getDefault(schema);
}

//#endregion
//#region src/methods/getDefaults/getDefaultsAsync.ts
/**
* Returns the default values of the schema.
*
* Hint: The difference to `getDefault` is that for object and tuple schemas
* this function recursively returns the default values of the subschemas
* instead of `undefined`.
*
* @param schema The schema to get them from.
*
* @returns The default values.
*/
/* @__NO_SIDE_EFFECTS__ */
async function getDefaultsAsync(schema) {
	if ("entries" in schema) return Object.fromEntries(await Promise.all(Object.entries(schema.entries).map(async ([key, value$1]) => [key, await /* @__PURE__ */ getDefaultsAsync(value$1)])));
	if ("items" in schema) return Promise.all(schema.items.map(getDefaultsAsync));
	return /* @__PURE__ */ getDefault(schema);
}

//#endregion
//#region src/methods/getDescription/getDescription.ts
/**
* Returns the description of the schema.
*
* If multiple descriptions are defined, the last one of the highest level is
* returned. If no description is defined, `undefined` is returned.
*
* @param schema The schema to get the description from.
*
* @returns The description, if any.
*
* @beta
*/
/* @__NO_SIDE_EFFECTS__ */
function getDescription(schema) {
	return /* @__PURE__ */ _getLastMetadata(schema, "description");
}

//#endregion
//#region src/methods/getExamples/getExamples.ts
/**
* Returns the examples of a schema.
*
* If multiple examples are defined, it concatenates them using depth-first
* search. If no examples are defined, an empty array is returned.
*
* @param schema The schema to get the examples from.
*
* @returns The examples, if any.
*
* @beta
*/
/* @__NO_SIDE_EFFECTS__ */
function getExamples(schema) {
	const examples$1 = [];
	function depthFirstCollect(schema$1) {
		if ("pipe" in schema$1) {
			for (const item of schema$1.pipe) if (item.kind === "schema" && "pipe" in item) depthFirstCollect(item);
			else if (item.kind === "metadata" && item.type === "examples") for (const example of item.examples) examples$1.push(example);
		}
	}
	depthFirstCollect(schema);
	return examples$1;
}

//#endregion
//#region src/methods/getFallbacks/getFallbacks.ts
/**
* Returns the fallback values of the schema.
*
* Hint: The difference to `getFallback` is that for object and tuple schemas
* this function recursively returns the fallback values of the subschemas
* instead of `undefined`.
*
* @param schema The schema to get them from.
*
* @returns The fallback values.
*/
/* @__NO_SIDE_EFFECTS__ */
function getFallbacks(schema) {
	if ("entries" in schema) {
		const object$1 = {};
		for (const key in schema.entries) object$1[key] = /* @__PURE__ */ getFallbacks(schema.entries[key]);
		return object$1;
	}
	if ("items" in schema) return schema.items.map(getFallbacks);
	return /* @__PURE__ */ getFallback(schema);
}

//#endregion
//#region src/methods/getFallbacks/getFallbacksAsync.ts
/**
* Returns the fallback values of the schema.
*
* Hint: The difference to `getFallback` is that for object and tuple schemas
* this function recursively returns the fallback values of the subschemas
* instead of `undefined`.
*
* @param schema The schema to get them from.
*
* @returns The fallback values.
*/
/* @__NO_SIDE_EFFECTS__ */
async function getFallbacksAsync(schema) {
	if ("entries" in schema) return Object.fromEntries(await Promise.all(Object.entries(schema.entries).map(async ([key, value$1]) => [key, await /* @__PURE__ */ getFallbacksAsync(value$1)])));
	if ("items" in schema) return Promise.all(schema.items.map(getFallbacksAsync));
	return /* @__PURE__ */ getFallback(schema);
}

//#endregion
//#region src/methods/getMetadata/getMetadata.ts
/**
* Returns the metadata of a schema.
*
* If multiple metadata are defined, it shallowly merges them using depth-first
* search. If no metadata is defined, an empty object is returned.
*
* @param schema Schema to get the metadata from.
*
* @returns The metadata, if any.
*
* @beta
*/
/* @__NO_SIDE_EFFECTS__ */
function getMetadata(schema) {
	const result = {};
	function depthFirstMerge(schema$1) {
		if ("pipe" in schema$1) {
			for (const item of schema$1.pipe) if (item.kind === "schema" && "pipe" in item) depthFirstMerge(item);
			else if (item.kind === "metadata" && item.type === "metadata") Object.assign(result, item.metadata);
		}
	}
	depthFirstMerge(schema);
	return result;
}

//#endregion
//#region src/methods/getTitle/getTitle.ts
/**
* Returns the title of the schema.
*
* If multiple titles are defined, the last one of the highest level is
* returned. If no title is defined, `undefined` is returned.
*
* @param schema The schema to get the title from.
*
* @returns The title, if any.
*
* @beta
*/
/* @__NO_SIDE_EFFECTS__ */
function getTitle(schema) {
	return /* @__PURE__ */ _getLastMetadata(schema, "title");
}

//#endregion
//#region src/methods/is/is.ts
/**
* Checks if the input matches the schema. By using a type predicate, this
* function can be used as a type guard.
*
* @param schema The schema to be used.
* @param input The input to be tested.
*
* @returns Whether the input matches the schema.
*/
/* @__NO_SIDE_EFFECTS__ */
function is(schema, input) {
	return !schema["~run"]({ value: input }, ABORT_EARLY_CONFIG).issues;
}

//#endregion
//#region src/schemas/any/any.ts
/**
* Creates an any schema.
*
* Hint: This schema function exists only for completeness and is not
* recommended in practice. Instead, `unknown` should be used to accept
* unknown data.
*
* @returns An any schema.
*/
/* @__NO_SIDE_EFFECTS__ */
function any() {
	return _standardSchema({
		kind: "schema",
		type: "any",
		reference: any,
		expects: "any",
		async: false,
		"~run"(dataset) {
			dataset.typed = true;
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/array/array.ts
/* @__NO_SIDE_EFFECTS__ */
function array(item, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "array",
		reference: array,
		expects: "Array",
		async: false,
		item,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (Array.isArray(input)) {
				dataset.typed = true;
				dataset.value = [];
				for (let key = 0; key < input.length; key++) {
					const value$1 = input[key];
					const itemDataset = this.item["~run"]({ value: value$1 }, config$1);
					if (itemDataset.issues) {
						const pathItem = {
							type: "array",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of itemDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = itemDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!itemDataset.typed) dataset.typed = false;
					dataset.value.push(itemDataset.value);
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/array/arrayAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function arrayAsync(item, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "array",
		reference: arrayAsync,
		expects: "Array",
		async: true,
		item,
		message: message$1,
		async "~run"(dataset, config$1) {
			const input = dataset.value;
			if (Array.isArray(input)) {
				dataset.typed = true;
				dataset.value = [];
				const itemDatasets = await Promise.all(input.map((value$1) => this.item["~run"]({ value: value$1 }, config$1)));
				for (let key = 0; key < itemDatasets.length; key++) {
					const itemDataset = itemDatasets[key];
					if (itemDataset.issues) {
						const pathItem = {
							type: "array",
							origin: "value",
							input,
							key,
							value: input[key]
						};
						for (const issue of itemDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = itemDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!itemDataset.typed) dataset.typed = false;
					dataset.value.push(itemDataset.value);
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/bigint/bigint.ts
/* @__NO_SIDE_EFFECTS__ */
function bigint(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "bigint",
		reference: bigint,
		expects: "bigint",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (typeof dataset.value === "bigint") dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/blob/blob.ts
/* @__NO_SIDE_EFFECTS__ */
function blob(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "blob",
		reference: blob,
		expects: "Blob",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.value instanceof Blob) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/boolean/boolean.ts
/* @__NO_SIDE_EFFECTS__ */
function boolean(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "boolean",
		reference: boolean,
		expects: "boolean",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (typeof dataset.value === "boolean") dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/custom/custom.ts
/* @__NO_SIDE_EFFECTS__ */
function custom(check$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "custom",
		reference: custom,
		expects: "unknown",
		async: false,
		check: check$1,
		message: message$1,
		"~run"(dataset, config$1) {
			if (this.check(dataset.value)) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/custom/customAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function customAsync(check$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "custom",
		reference: customAsync,
		expects: "unknown",
		async: true,
		check: check$1,
		message: message$1,
		async "~run"(dataset, config$1) {
			if (await this.check(dataset.value)) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/date/date.ts
/* @__NO_SIDE_EFFECTS__ */
function date(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "date",
		reference: date,
		expects: "Date",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.value instanceof Date) if (!isNaN(dataset.value)) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1, { received: "\"Invalid Date\"" });
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/enum/enum.ts
/* @__NO_SIDE_EFFECTS__ */
function enum_(enum__, message$1) {
	const options = [];
	for (const key in enum__) if (`${+key}` !== key || typeof enum__[key] !== "string" || !Object.is(enum__[enum__[key]], +key)) options.push(enum__[key]);
	return _standardSchema({
		kind: "schema",
		type: "enum",
		reference: enum_,
		expects: /* @__PURE__ */ _joinExpects(options.map(_stringify), "|"),
		async: false,
		enum: enum__,
		options,
		message: message$1,
		"~run"(dataset, config$1) {
			if (this.options.includes(dataset.value)) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/exactOptional/exactOptional.ts
/* @__NO_SIDE_EFFECTS__ */
function exactOptional(wrapped, default_) {
	return _standardSchema({
		kind: "schema",
		type: "exact_optional",
		reference: exactOptional,
		expects: wrapped.expects,
		async: false,
		wrapped,
		default: default_,
		"~run"(dataset, config$1) {
			return this.wrapped["~run"](dataset, config$1);
		}
	});
}

//#endregion
//#region src/schemas/exactOptional/exactOptionalAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function exactOptionalAsync(wrapped, default_) {
	return _standardSchema({
		kind: "schema",
		type: "exact_optional",
		reference: exactOptionalAsync,
		expects: wrapped.expects,
		async: true,
		wrapped,
		default: default_,
		async "~run"(dataset, config$1) {
			return this.wrapped["~run"](dataset, config$1);
		}
	});
}

//#endregion
//#region src/schemas/file/file.ts
/* @__NO_SIDE_EFFECTS__ */
function file(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "file",
		reference: file,
		expects: "File",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.value instanceof File) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/function/function.ts
/* @__NO_SIDE_EFFECTS__ */
function function_(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "function",
		reference: function_,
		expects: "Function",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (typeof dataset.value === "function") dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/instance/instance.ts
/* @__NO_SIDE_EFFECTS__ */
function instance(class_, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "instance",
		reference: instance,
		expects: class_.name,
		async: false,
		class: class_,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.value instanceof this.class) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/intersect/utils/_merge/_merge.ts
/**
* Merges two values into one single output.
*
* @param value1 First value.
* @param value2 Second value.
*
* @returns The merge dataset.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _merge(value1, value2) {
	if (typeof value1 === typeof value2) {
		if (/* @__PURE__ */ _isSameValueZero(value1, value2) || value1 instanceof Date && value2 instanceof Date && /* @__PURE__ */ _isSameValueZero(+value1, +value2)) return { value: value1 };
		if (value1 && value2 && value1.constructor === Object && value2.constructor === Object) {
			const nextValue = {
				...value1,
				...value2
			};
			for (const key in value2) if (Object.prototype.hasOwnProperty.call(value1, key) && Object.prototype.hasOwnProperty.call(value2, key)) {
				const dataset = /* @__PURE__ */ _merge(value1[key], value2[key]);
				if (dataset.issue) return dataset;
				nextValue[key] = dataset.value;
			}
			return { value: nextValue };
		}
		if (Array.isArray(value1) && Array.isArray(value2)) {
			if (value1.length === value2.length) {
				const nextValue = [...value1];
				for (let index = 0; index < value1.length; index++) {
					const dataset = /* @__PURE__ */ _merge(value1[index], value2[index]);
					if (dataset.issue) return dataset;
					nextValue[index] = dataset.value;
				}
				return { value: nextValue };
			}
		}
	}
	return { issue: true };
}

//#endregion
//#region src/schemas/intersect/intersect.ts
/* @__NO_SIDE_EFFECTS__ */
function intersect(options, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "intersect",
		reference: intersect,
		expects: /* @__PURE__ */ _joinExpects(options.map((option) => option.expects), "&"),
		async: false,
		options,
		message: message$1,
		"~run"(dataset, config$1) {
			if (this.options.length) {
				const input = dataset.value;
				let outputs;
				dataset.typed = true;
				for (const schema of this.options) {
					const optionDataset = schema["~run"]({ value: input }, config$1);
					if (optionDataset.issues) {
						if (dataset.issues) for (const issue of optionDataset.issues) dataset.issues.push(issue);
						else dataset.issues = optionDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!optionDataset.typed) dataset.typed = false;
					if (dataset.typed) if (outputs) outputs.push(optionDataset.value);
					else outputs = [optionDataset.value];
				}
				if (dataset.typed) {
					dataset.value = outputs[0];
					for (let index = 1; index < outputs.length; index++) {
						const mergeDataset = /* @__PURE__ */ _merge(dataset.value, outputs[index]);
						if (mergeDataset.issue) {
							_addIssue(this, "type", dataset, config$1, { received: "unknown" });
							break;
						}
						dataset.value = mergeDataset.value;
					}
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/intersect/intersectAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function intersectAsync(options, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "intersect",
		reference: intersectAsync,
		expects: /* @__PURE__ */ _joinExpects(options.map((option) => option.expects), "&"),
		async: true,
		options,
		message: message$1,
		async "~run"(dataset, config$1) {
			if (this.options.length) {
				const input = dataset.value;
				let outputs;
				dataset.typed = true;
				const optionDatasets = await Promise.all(this.options.map((schema) => schema["~run"]({ value: input }, config$1)));
				for (const optionDataset of optionDatasets) {
					if (optionDataset.issues) {
						if (dataset.issues) for (const issue of optionDataset.issues) dataset.issues.push(issue);
						else dataset.issues = optionDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!optionDataset.typed) dataset.typed = false;
					if (dataset.typed) if (outputs) outputs.push(optionDataset.value);
					else outputs = [optionDataset.value];
				}
				if (dataset.typed) {
					dataset.value = outputs[0];
					for (let index = 1; index < outputs.length; index++) {
						const mergeDataset = /* @__PURE__ */ _merge(dataset.value, outputs[index]);
						if (mergeDataset.issue) {
							_addIssue(this, "type", dataset, config$1, { received: "unknown" });
							break;
						}
						dataset.value = mergeDataset.value;
					}
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/lazy/lazy.ts
/**
* Creates a lazy schema.
*
* @param getter The schema getter.
*
* @returns A lazy schema.
*/
/* @__NO_SIDE_EFFECTS__ */
function lazy(getter) {
	return _standardSchema({
		kind: "schema",
		type: "lazy",
		reference: lazy,
		expects: "unknown",
		async: false,
		getter,
		"~run"(dataset, config$1) {
			return this.getter(dataset.value)["~run"](dataset, config$1);
		}
	});
}

//#endregion
//#region src/schemas/lazy/lazyAsync.ts
/**
* Creates a lazy schema.
*
* @param getter The schema getter.
*
* @returns A lazy schema.
*/
/* @__NO_SIDE_EFFECTS__ */
function lazyAsync(getter) {
	return _standardSchema({
		kind: "schema",
		type: "lazy",
		reference: lazyAsync,
		expects: "unknown",
		async: true,
		getter,
		async "~run"(dataset, config$1) {
			return (await this.getter(dataset.value))["~run"](dataset, config$1);
		}
	});
}

//#endregion
//#region src/schemas/literal/literal.ts
/* @__NO_SIDE_EFFECTS__ */
function literal(literal_, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "literal",
		reference: literal,
		expects: /* @__PURE__ */ _stringify(literal_),
		async: false,
		literal: literal_,
		message: message$1,
		"~run"(dataset, config$1) {
			if (/* @__PURE__ */ _isSameValueZero(dataset.value, this.literal)) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/looseObject/looseObject.ts
/* @__NO_SIDE_EFFECTS__ */
function looseObject(entries$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "loose_object",
		reference: looseObject,
		expects: "Object",
		async: false,
		entries: entries$1,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (input && typeof input === "object") {
				dataset.typed = true;
				dataset.value = {};
				for (const key in this.entries) {
					const valueSchema = this.entries[key];
					if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
						const value$1 = key in input ? input[key] : /* @__PURE__ */ getDefault(valueSchema);
						const valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
						if (valueDataset.issues) {
							const pathItem = {
								type: "object",
								origin: "value",
								input,
								key,
								value: value$1
							};
							for (const issue of valueDataset.issues) {
								if (issue.path) issue.path.unshift(pathItem);
								else issue.path = [pathItem];
								dataset.issues?.push(issue);
							}
							if (!dataset.issues) dataset.issues = valueDataset.issues;
							if (config$1.abortEarly) {
								dataset.typed = false;
								break;
							}
						}
						if (!valueDataset.typed) dataset.typed = false;
						dataset.value[key] = valueDataset.value;
					} else if (valueSchema.fallback !== void 0) dataset.value[key] = /* @__PURE__ */ getFallback(valueSchema);
					else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
						_addIssue(this, "key", dataset, config$1, {
							input: void 0,
							expected: `"${key}"`,
							path: [{
								type: "object",
								origin: "key",
								input,
								key,
								value: input[key]
							}]
						});
						if (config$1.abortEarly) break;
					}
				}
				if (!dataset.issues || !config$1.abortEarly) {
					for (const key in input) if (/* @__PURE__ */ _isValidObjectKey(input, key) && !Object.prototype.hasOwnProperty.call(this.entries, key)) dataset.value[key] = input[key];
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/looseObject/looseObjectAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function looseObjectAsync(entries$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "loose_object",
		reference: looseObjectAsync,
		expects: "Object",
		async: true,
		entries: entries$1,
		message: message$1,
		async "~run"(dataset, config$1) {
			const input = dataset.value;
			if (input && typeof input === "object") {
				dataset.typed = true;
				dataset.value = {};
				const valueDatasets = await Promise.all(Object.entries(this.entries).map(async ([key, valueSchema]) => {
					if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
						const value$1 = key in input ? input[key] : await /* @__PURE__ */ getDefault(valueSchema);
						return [
							key,
							value$1,
							valueSchema,
							await valueSchema["~run"]({ value: value$1 }, config$1)
						];
					}
					return [
						key,
						input[key],
						valueSchema,
						null
					];
				}));
				for (const [key, value$1, valueSchema, valueDataset] of valueDatasets) if (valueDataset) {
					if (valueDataset.issues) {
						const pathItem = {
							type: "object",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of valueDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = valueDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!valueDataset.typed) dataset.typed = false;
					dataset.value[key] = valueDataset.value;
				} else if (valueSchema.fallback !== void 0) dataset.value[key] = await /* @__PURE__ */ getFallback(valueSchema);
				else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
					_addIssue(this, "key", dataset, config$1, {
						input: void 0,
						expected: `"${key}"`,
						path: [{
							type: "object",
							origin: "key",
							input,
							key,
							value: value$1
						}]
					});
					if (config$1.abortEarly) break;
				}
				if (!dataset.issues || !config$1.abortEarly) {
					for (const key in input) if (/* @__PURE__ */ _isValidObjectKey(input, key) && !Object.prototype.hasOwnProperty.call(this.entries, key)) dataset.value[key] = input[key];
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/looseTuple/looseTuple.ts
/* @__NO_SIDE_EFFECTS__ */
function looseTuple(items, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "loose_tuple",
		reference: looseTuple,
		expects: "Array",
		async: false,
		items,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (Array.isArray(input)) {
				dataset.typed = true;
				dataset.value = [];
				for (let key = 0; key < this.items.length; key++) {
					const value$1 = input[key];
					const itemDataset = this.items[key]["~run"]({ value: value$1 }, config$1);
					if (itemDataset.issues) {
						const pathItem = {
							type: "array",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of itemDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = itemDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!itemDataset.typed) dataset.typed = false;
					dataset.value.push(itemDataset.value);
				}
				if (!dataset.issues || !config$1.abortEarly) for (let key = this.items.length; key < input.length; key++) dataset.value.push(input[key]);
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/looseTuple/looseTupleAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function looseTupleAsync(items, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "loose_tuple",
		reference: looseTupleAsync,
		expects: "Array",
		async: true,
		items,
		message: message$1,
		async "~run"(dataset, config$1) {
			const input = dataset.value;
			if (Array.isArray(input)) {
				dataset.typed = true;
				dataset.value = [];
				const itemDatasets = await Promise.all(this.items.map(async (item, key) => {
					const value$1 = input[key];
					return [
						key,
						value$1,
						await item["~run"]({ value: value$1 }, config$1)
					];
				}));
				for (const [key, value$1, itemDataset] of itemDatasets) {
					if (itemDataset.issues) {
						const pathItem = {
							type: "array",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of itemDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = itemDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!itemDataset.typed) dataset.typed = false;
					dataset.value.push(itemDataset.value);
				}
				if (!dataset.issues || !config$1.abortEarly) for (let key = this.items.length; key < input.length; key++) dataset.value.push(input[key]);
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/map/map.ts
/* @__NO_SIDE_EFFECTS__ */
function map(key, value$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "map",
		reference: map,
		expects: "Map",
		async: false,
		key,
		value: value$1,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (input instanceof Map) {
				dataset.typed = true;
				dataset.value = /* @__PURE__ */ new Map();
				for (const [inputKey, inputValue] of input) {
					const keyDataset = this.key["~run"]({ value: inputKey }, config$1);
					if (keyDataset.issues) {
						const pathItem = {
							type: "map",
							origin: "key",
							input,
							key: inputKey,
							value: inputValue
						};
						for (const issue of keyDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = keyDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					const valueDataset = this.value["~run"]({ value: inputValue }, config$1);
					if (valueDataset.issues) {
						const pathItem = {
							type: "map",
							origin: "value",
							input,
							key: inputKey,
							value: inputValue
						};
						for (const issue of valueDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = valueDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!keyDataset.typed || !valueDataset.typed) dataset.typed = false;
					dataset.value.set(keyDataset.value, valueDataset.value);
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/map/mapAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function mapAsync(key, value$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "map",
		reference: mapAsync,
		expects: "Map",
		async: true,
		key,
		value: value$1,
		message: message$1,
		async "~run"(dataset, config$1) {
			const input = dataset.value;
			if (input instanceof Map) {
				dataset.typed = true;
				dataset.value = /* @__PURE__ */ new Map();
				const datasets = await Promise.all([...input].map(([inputKey, inputValue]) => Promise.all([
					inputKey,
					inputValue,
					this.key["~run"]({ value: inputKey }, config$1),
					this.value["~run"]({ value: inputValue }, config$1)
				])));
				for (const [inputKey, inputValue, keyDataset, valueDataset] of datasets) {
					if (keyDataset.issues) {
						const pathItem = {
							type: "map",
							origin: "key",
							input,
							key: inputKey,
							value: inputValue
						};
						for (const issue of keyDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = keyDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (valueDataset.issues) {
						const pathItem = {
							type: "map",
							origin: "value",
							input,
							key: inputKey,
							value: inputValue
						};
						for (const issue of valueDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = valueDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!keyDataset.typed || !valueDataset.typed) dataset.typed = false;
					dataset.value.set(keyDataset.value, valueDataset.value);
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/nan/nan.ts
/* @__NO_SIDE_EFFECTS__ */
function nan(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "nan",
		reference: nan,
		expects: "NaN",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (Number.isNaN(dataset.value)) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/never/never.ts
/* @__NO_SIDE_EFFECTS__ */
function never(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "never",
		reference: never,
		expects: "never",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			_addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/nonNullable/nonNullable.ts
/* @__NO_SIDE_EFFECTS__ */
function nonNullable(wrapped, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "non_nullable",
		reference: nonNullable,
		expects: "!null",
		async: false,
		wrapped,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.value !== null) dataset = this.wrapped["~run"](dataset, config$1);
			if (dataset.value === null) _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/nonNullable/nonNullableAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function nonNullableAsync(wrapped, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "non_nullable",
		reference: nonNullableAsync,
		expects: "!null",
		async: true,
		wrapped,
		message: message$1,
		async "~run"(dataset, config$1) {
			if (dataset.value !== null) dataset = await this.wrapped["~run"](dataset, config$1);
			if (dataset.value === null) _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/nonNullish/nonNullish.ts
/* @__NO_SIDE_EFFECTS__ */
function nonNullish(wrapped, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "non_nullish",
		reference: nonNullish,
		expects: "(!null & !undefined)",
		async: false,
		wrapped,
		message: message$1,
		"~run"(dataset, config$1) {
			if (!(dataset.value === null || dataset.value === void 0)) dataset = this.wrapped["~run"](dataset, config$1);
			if (dataset.value === null || dataset.value === void 0) _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/nonNullish/nonNullishAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function nonNullishAsync(wrapped, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "non_nullish",
		reference: nonNullishAsync,
		expects: "(!null & !undefined)",
		async: true,
		wrapped,
		message: message$1,
		async "~run"(dataset, config$1) {
			if (!(dataset.value === null || dataset.value === void 0)) dataset = await this.wrapped["~run"](dataset, config$1);
			if (dataset.value === null || dataset.value === void 0) _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/nonOptional/nonOptional.ts
/* @__NO_SIDE_EFFECTS__ */
function nonOptional(wrapped, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "non_optional",
		reference: nonOptional,
		expects: "!undefined",
		async: false,
		wrapped,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.value !== void 0) dataset = this.wrapped["~run"](dataset, config$1);
			if (dataset.value === void 0) _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/nonOptional/nonOptionalAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function nonOptionalAsync(wrapped, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "non_optional",
		reference: nonOptionalAsync,
		expects: "!undefined",
		async: true,
		wrapped,
		message: message$1,
		async "~run"(dataset, config$1) {
			if (dataset.value !== void 0) dataset = await this.wrapped["~run"](dataset, config$1);
			if (dataset.value === void 0) _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/null/null.ts
/* @__NO_SIDE_EFFECTS__ */
function null_(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "null",
		reference: null_,
		expects: "null",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.value === null) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/nullable/nullable.ts
/* @__NO_SIDE_EFFECTS__ */
function nullable(wrapped, default_) {
	return _standardSchema({
		kind: "schema",
		type: "nullable",
		reference: nullable,
		expects: `(${wrapped.expects} | null)`,
		async: false,
		wrapped,
		default: default_,
		"~run"(dataset, config$1) {
			if (dataset.value === null) {
				if (this.default !== void 0) dataset.value = /* @__PURE__ */ getDefault(this, dataset, config$1);
				if (dataset.value === null) {
					dataset.typed = true;
					return dataset;
				}
			}
			return this.wrapped["~run"](dataset, config$1);
		}
	});
}

//#endregion
//#region src/schemas/nullable/nullableAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function nullableAsync(wrapped, default_) {
	return _standardSchema({
		kind: "schema",
		type: "nullable",
		reference: nullableAsync,
		expects: `(${wrapped.expects} | null)`,
		async: true,
		wrapped,
		default: default_,
		async "~run"(dataset, config$1) {
			if (dataset.value === null) {
				if (this.default !== void 0) dataset.value = await /* @__PURE__ */ getDefault(this, dataset, config$1);
				if (dataset.value === null) {
					dataset.typed = true;
					return dataset;
				}
			}
			return this.wrapped["~run"](dataset, config$1);
		}
	});
}

//#endregion
//#region src/schemas/nullish/nullish.ts
/* @__NO_SIDE_EFFECTS__ */
function nullish(wrapped, default_) {
	return _standardSchema({
		kind: "schema",
		type: "nullish",
		reference: nullish,
		expects: `(${wrapped.expects} | null | undefined)`,
		async: false,
		wrapped,
		default: default_,
		"~run"(dataset, config$1) {
			if (dataset.value === null || dataset.value === void 0) {
				if (this.default !== void 0) dataset.value = /* @__PURE__ */ getDefault(this, dataset, config$1);
				if (dataset.value === null || dataset.value === void 0) {
					dataset.typed = true;
					return dataset;
				}
			}
			return this.wrapped["~run"](dataset, config$1);
		}
	});
}

//#endregion
//#region src/schemas/nullish/nullishAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function nullishAsync(wrapped, default_) {
	return _standardSchema({
		kind: "schema",
		type: "nullish",
		reference: nullishAsync,
		expects: `(${wrapped.expects} | null | undefined)`,
		async: true,
		wrapped,
		default: default_,
		async "~run"(dataset, config$1) {
			if (dataset.value === null || dataset.value === void 0) {
				if (this.default !== void 0) dataset.value = await /* @__PURE__ */ getDefault(this, dataset, config$1);
				if (dataset.value === null || dataset.value === void 0) {
					dataset.typed = true;
					return dataset;
				}
			}
			return this.wrapped["~run"](dataset, config$1);
		}
	});
}

//#endregion
//#region src/schemas/number/number.ts
/* @__NO_SIDE_EFFECTS__ */
function number(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "number",
		reference: number,
		expects: "number",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (typeof dataset.value === "number" && !isNaN(dataset.value)) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/object/object.ts
/* @__NO_SIDE_EFFECTS__ */
function object(entries$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "object",
		reference: object,
		expects: "Object",
		async: false,
		entries: entries$1,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (input && typeof input === "object") {
				dataset.typed = true;
				dataset.value = {};
				for (const key in this.entries) {
					const valueSchema = this.entries[key];
					if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
						const value$1 = key in input ? input[key] : /* @__PURE__ */ getDefault(valueSchema);
						const valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
						if (valueDataset.issues) {
							const pathItem = {
								type: "object",
								origin: "value",
								input,
								key,
								value: value$1
							};
							for (const issue of valueDataset.issues) {
								if (issue.path) issue.path.unshift(pathItem);
								else issue.path = [pathItem];
								dataset.issues?.push(issue);
							}
							if (!dataset.issues) dataset.issues = valueDataset.issues;
							if (config$1.abortEarly) {
								dataset.typed = false;
								break;
							}
						}
						if (!valueDataset.typed) dataset.typed = false;
						dataset.value[key] = valueDataset.value;
					} else if (valueSchema.fallback !== void 0) dataset.value[key] = /* @__PURE__ */ getFallback(valueSchema);
					else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
						_addIssue(this, "key", dataset, config$1, {
							input: void 0,
							expected: `"${key}"`,
							path: [{
								type: "object",
								origin: "key",
								input,
								key,
								value: input[key]
							}]
						});
						if (config$1.abortEarly) break;
					}
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/object/objectAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function objectAsync(entries$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "object",
		reference: objectAsync,
		expects: "Object",
		async: true,
		entries: entries$1,
		message: message$1,
		async "~run"(dataset, config$1) {
			const input = dataset.value;
			if (input && typeof input === "object") {
				dataset.typed = true;
				dataset.value = {};
				const valueDatasets = await Promise.all(Object.entries(this.entries).map(async ([key, valueSchema]) => {
					if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
						const value$1 = key in input ? input[key] : await /* @__PURE__ */ getDefault(valueSchema);
						return [
							key,
							value$1,
							valueSchema,
							await valueSchema["~run"]({ value: value$1 }, config$1)
						];
					}
					return [
						key,
						input[key],
						valueSchema,
						null
					];
				}));
				for (const [key, value$1, valueSchema, valueDataset] of valueDatasets) if (valueDataset) {
					if (valueDataset.issues) {
						const pathItem = {
							type: "object",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of valueDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = valueDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!valueDataset.typed) dataset.typed = false;
					dataset.value[key] = valueDataset.value;
				} else if (valueSchema.fallback !== void 0) dataset.value[key] = await /* @__PURE__ */ getFallback(valueSchema);
				else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
					_addIssue(this, "key", dataset, config$1, {
						input: void 0,
						expected: `"${key}"`,
						path: [{
							type: "object",
							origin: "key",
							input,
							key,
							value: value$1
						}]
					});
					if (config$1.abortEarly) break;
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/objectWithRest/objectWithRest.ts
/* @__NO_SIDE_EFFECTS__ */
function objectWithRest(entries$1, rest, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "object_with_rest",
		reference: objectWithRest,
		expects: "Object",
		async: false,
		entries: entries$1,
		rest,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (input && typeof input === "object") {
				dataset.typed = true;
				dataset.value = {};
				for (const key in this.entries) {
					const valueSchema = this.entries[key];
					if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
						const value$1 = key in input ? input[key] : /* @__PURE__ */ getDefault(valueSchema);
						const valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
						if (valueDataset.issues) {
							const pathItem = {
								type: "object",
								origin: "value",
								input,
								key,
								value: value$1
							};
							for (const issue of valueDataset.issues) {
								if (issue.path) issue.path.unshift(pathItem);
								else issue.path = [pathItem];
								dataset.issues?.push(issue);
							}
							if (!dataset.issues) dataset.issues = valueDataset.issues;
							if (config$1.abortEarly) {
								dataset.typed = false;
								break;
							}
						}
						if (!valueDataset.typed) dataset.typed = false;
						dataset.value[key] = valueDataset.value;
					} else if (valueSchema.fallback !== void 0) dataset.value[key] = /* @__PURE__ */ getFallback(valueSchema);
					else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
						_addIssue(this, "key", dataset, config$1, {
							input: void 0,
							expected: `"${key}"`,
							path: [{
								type: "object",
								origin: "key",
								input,
								key,
								value: input[key]
							}]
						});
						if (config$1.abortEarly) break;
					}
				}
				if (!dataset.issues || !config$1.abortEarly) {
					for (const key in input) if (/* @__PURE__ */ _isValidObjectKey(input, key) && !Object.prototype.hasOwnProperty.call(this.entries, key)) {
						const valueDataset = this.rest["~run"]({ value: input[key] }, config$1);
						if (valueDataset.issues) {
							const pathItem = {
								type: "object",
								origin: "value",
								input,
								key,
								value: input[key]
							};
							for (const issue of valueDataset.issues) {
								if (issue.path) issue.path.unshift(pathItem);
								else issue.path = [pathItem];
								dataset.issues?.push(issue);
							}
							if (!dataset.issues) dataset.issues = valueDataset.issues;
							if (config$1.abortEarly) {
								dataset.typed = false;
								break;
							}
						}
						if (!valueDataset.typed) dataset.typed = false;
						dataset.value[key] = valueDataset.value;
					}
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/objectWithRest/objectWithRestAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function objectWithRestAsync(entries$1, rest, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "object_with_rest",
		reference: objectWithRestAsync,
		expects: "Object",
		async: true,
		entries: entries$1,
		rest,
		message: message$1,
		async "~run"(dataset, config$1) {
			const input = dataset.value;
			if (input && typeof input === "object") {
				dataset.typed = true;
				dataset.value = {};
				const [normalDatasets, restDatasets] = await Promise.all([Promise.all(Object.entries(this.entries).map(async ([key, valueSchema]) => {
					if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
						const value$1 = key in input ? input[key] : await /* @__PURE__ */ getDefault(valueSchema);
						return [
							key,
							value$1,
							valueSchema,
							await valueSchema["~run"]({ value: value$1 }, config$1)
						];
					}
					return [
						key,
						input[key],
						valueSchema,
						null
					];
				})), Promise.all(Object.entries(input).filter(([key]) => /* @__PURE__ */ _isValidObjectKey(input, key) && !Object.prototype.hasOwnProperty.call(this.entries, key)).map(async ([key, value$1]) => [
					key,
					value$1,
					await this.rest["~run"]({ value: value$1 }, config$1)
				]))]);
				for (const [key, value$1, valueSchema, valueDataset] of normalDatasets) if (valueDataset) {
					if (valueDataset.issues) {
						const pathItem = {
							type: "object",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of valueDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = valueDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!valueDataset.typed) dataset.typed = false;
					dataset.value[key] = valueDataset.value;
				} else if (valueSchema.fallback !== void 0) dataset.value[key] = await /* @__PURE__ */ getFallback(valueSchema);
				else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
					_addIssue(this, "key", dataset, config$1, {
						input: void 0,
						expected: `"${key}"`,
						path: [{
							type: "object",
							origin: "key",
							input,
							key,
							value: value$1
						}]
					});
					if (config$1.abortEarly) break;
				}
				if (!dataset.issues || !config$1.abortEarly) for (const [key, value$1, valueDataset] of restDatasets) {
					if (valueDataset.issues) {
						const pathItem = {
							type: "object",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of valueDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = valueDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!valueDataset.typed) dataset.typed = false;
					dataset.value[key] = valueDataset.value;
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/optional/optional.ts
/* @__NO_SIDE_EFFECTS__ */
function optional(wrapped, default_) {
	return _standardSchema({
		kind: "schema",
		type: "optional",
		reference: optional,
		expects: `(${wrapped.expects} | undefined)`,
		async: false,
		wrapped,
		default: default_,
		"~run"(dataset, config$1) {
			if (dataset.value === void 0) {
				if (this.default !== void 0) dataset.value = /* @__PURE__ */ getDefault(this, dataset, config$1);
				if (dataset.value === void 0) {
					dataset.typed = true;
					return dataset;
				}
			}
			return this.wrapped["~run"](dataset, config$1);
		}
	});
}

//#endregion
//#region src/schemas/optional/optionalAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function optionalAsync(wrapped, default_) {
	return _standardSchema({
		kind: "schema",
		type: "optional",
		reference: optionalAsync,
		expects: `(${wrapped.expects} | undefined)`,
		async: true,
		wrapped,
		default: default_,
		async "~run"(dataset, config$1) {
			if (dataset.value === void 0) {
				if (this.default !== void 0) dataset.value = await /* @__PURE__ */ getDefault(this, dataset, config$1);
				if (dataset.value === void 0) {
					dataset.typed = true;
					return dataset;
				}
			}
			return this.wrapped["~run"](dataset, config$1);
		}
	});
}

//#endregion
//#region src/schemas/picklist/picklist.ts
/* @__NO_SIDE_EFFECTS__ */
function picklist(options, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "picklist",
		reference: picklist,
		expects: /* @__PURE__ */ _joinExpects(options.map(_stringify), "|"),
		async: false,
		options,
		message: message$1,
		"~run"(dataset, config$1) {
			if (this.options.includes(dataset.value)) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/promise/promise.ts
/* @__NO_SIDE_EFFECTS__ */
function promise(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "promise",
		reference: promise,
		expects: "Promise",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.value instanceof Promise) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/record/record.ts
/* @__NO_SIDE_EFFECTS__ */
function record(key, value$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "record",
		reference: record,
		expects: "Object",
		async: false,
		key,
		value: value$1,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (input && typeof input === "object") {
				dataset.typed = true;
				dataset.value = {};
				for (const entryKey in input) if (/* @__PURE__ */ _isValidObjectKey(input, entryKey)) {
					const entryValue = input[entryKey];
					const keyDataset = this.key["~run"]({ value: entryKey }, config$1);
					if (keyDataset.issues) {
						const pathItem = {
							type: "object",
							origin: "key",
							input,
							key: entryKey,
							value: entryValue
						};
						for (const issue of keyDataset.issues) {
							issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = keyDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					const valueDataset = this.value["~run"]({ value: entryValue }, config$1);
					if (valueDataset.issues) {
						const pathItem = {
							type: "object",
							origin: "value",
							input,
							key: entryKey,
							value: entryValue
						};
						for (const issue of valueDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = valueDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!keyDataset.typed || !valueDataset.typed) dataset.typed = false;
					if (keyDataset.typed) dataset.value[keyDataset.value] = valueDataset.value;
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/record/recordAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function recordAsync(key, value$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "record",
		reference: recordAsync,
		expects: "Object",
		async: true,
		key,
		value: value$1,
		message: message$1,
		async "~run"(dataset, config$1) {
			const input = dataset.value;
			if (input && typeof input === "object") {
				dataset.typed = true;
				dataset.value = {};
				const datasets = await Promise.all(Object.entries(input).filter(([key$1]) => /* @__PURE__ */ _isValidObjectKey(input, key$1)).map(([entryKey, entryValue]) => Promise.all([
					entryKey,
					entryValue,
					this.key["~run"]({ value: entryKey }, config$1),
					this.value["~run"]({ value: entryValue }, config$1)
				])));
				for (const [entryKey, entryValue, keyDataset, valueDataset] of datasets) {
					if (keyDataset.issues) {
						const pathItem = {
							type: "object",
							origin: "key",
							input,
							key: entryKey,
							value: entryValue
						};
						for (const issue of keyDataset.issues) {
							issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = keyDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (valueDataset.issues) {
						const pathItem = {
							type: "object",
							origin: "value",
							input,
							key: entryKey,
							value: entryValue
						};
						for (const issue of valueDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = valueDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!keyDataset.typed || !valueDataset.typed) dataset.typed = false;
					if (keyDataset.typed) dataset.value[keyDataset.value] = valueDataset.value;
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/set/set.ts
/* @__NO_SIDE_EFFECTS__ */
function set(value$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "set",
		reference: set,
		expects: "Set",
		async: false,
		value: value$1,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (input instanceof Set) {
				dataset.typed = true;
				dataset.value = /* @__PURE__ */ new Set();
				for (const inputValue of input) {
					const valueDataset = this.value["~run"]({ value: inputValue }, config$1);
					if (valueDataset.issues) {
						const pathItem = {
							type: "set",
							origin: "value",
							input,
							key: null,
							value: inputValue
						};
						for (const issue of valueDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = valueDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!valueDataset.typed) dataset.typed = false;
					dataset.value.add(valueDataset.value);
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/set/setAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function setAsync(value$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "set",
		reference: setAsync,
		expects: "Set",
		async: true,
		value: value$1,
		message: message$1,
		async "~run"(dataset, config$1) {
			const input = dataset.value;
			if (input instanceof Set) {
				dataset.typed = true;
				dataset.value = /* @__PURE__ */ new Set();
				const valueDatasets = await Promise.all([...input].map(async (inputValue) => [inputValue, await this.value["~run"]({ value: inputValue }, config$1)]));
				for (const [inputValue, valueDataset] of valueDatasets) {
					if (valueDataset.issues) {
						const pathItem = {
							type: "set",
							origin: "value",
							input,
							key: null,
							value: inputValue
						};
						for (const issue of valueDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = valueDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!valueDataset.typed) dataset.typed = false;
					dataset.value.add(valueDataset.value);
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/strictObject/strictObject.ts
/* @__NO_SIDE_EFFECTS__ */
function strictObject(entries$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "strict_object",
		reference: strictObject,
		expects: "Object",
		async: false,
		entries: entries$1,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (input && typeof input === "object") {
				dataset.typed = true;
				dataset.value = {};
				for (const key in this.entries) {
					const valueSchema = this.entries[key];
					if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
						const value$1 = key in input ? input[key] : /* @__PURE__ */ getDefault(valueSchema);
						const valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
						if (valueDataset.issues) {
							const pathItem = {
								type: "object",
								origin: "value",
								input,
								key,
								value: value$1
							};
							for (const issue of valueDataset.issues) {
								if (issue.path) issue.path.unshift(pathItem);
								else issue.path = [pathItem];
								dataset.issues?.push(issue);
							}
							if (!dataset.issues) dataset.issues = valueDataset.issues;
							if (config$1.abortEarly) {
								dataset.typed = false;
								break;
							}
						}
						if (!valueDataset.typed) dataset.typed = false;
						dataset.value[key] = valueDataset.value;
					} else if (valueSchema.fallback !== void 0) dataset.value[key] = /* @__PURE__ */ getFallback(valueSchema);
					else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
						_addIssue(this, "key", dataset, config$1, {
							input: void 0,
							expected: `"${key}"`,
							path: [{
								type: "object",
								origin: "key",
								input,
								key,
								value: input[key]
							}]
						});
						if (config$1.abortEarly) break;
					}
				}
				if (!dataset.issues || !config$1.abortEarly) {
					for (const key in input) if (!Object.prototype.hasOwnProperty.call(this.entries, key)) {
						_addIssue(this, "key", dataset, config$1, {
							input: key,
							expected: "never",
							path: [{
								type: "object",
								origin: "key",
								input,
								key,
								value: input[key]
							}]
						});
						break;
					}
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/strictObject/strictObjectAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function strictObjectAsync(entries$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "strict_object",
		reference: strictObjectAsync,
		expects: "Object",
		async: true,
		entries: entries$1,
		message: message$1,
		async "~run"(dataset, config$1) {
			const input = dataset.value;
			if (input && typeof input === "object") {
				dataset.typed = true;
				dataset.value = {};
				const valueDatasets = await Promise.all(Object.entries(this.entries).map(async ([key, valueSchema]) => {
					if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
						const value$1 = key in input ? input[key] : await /* @__PURE__ */ getDefault(valueSchema);
						return [
							key,
							value$1,
							valueSchema,
							await valueSchema["~run"]({ value: value$1 }, config$1)
						];
					}
					return [
						key,
						input[key],
						valueSchema,
						null
					];
				}));
				for (const [key, value$1, valueSchema, valueDataset] of valueDatasets) if (valueDataset) {
					if (valueDataset.issues) {
						const pathItem = {
							type: "object",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of valueDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = valueDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!valueDataset.typed) dataset.typed = false;
					dataset.value[key] = valueDataset.value;
				} else if (valueSchema.fallback !== void 0) dataset.value[key] = await /* @__PURE__ */ getFallback(valueSchema);
				else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
					_addIssue(this, "key", dataset, config$1, {
						input: void 0,
						expected: `"${key}"`,
						path: [{
							type: "object",
							origin: "key",
							input,
							key,
							value: value$1
						}]
					});
					if (config$1.abortEarly) break;
				}
				if (!dataset.issues || !config$1.abortEarly) {
					for (const key in input) if (!Object.prototype.hasOwnProperty.call(this.entries, key)) {
						_addIssue(this, "key", dataset, config$1, {
							input: key,
							expected: "never",
							path: [{
								type: "object",
								origin: "key",
								input,
								key,
								value: input[key]
							}]
						});
						break;
					}
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/strictTuple/strictTuple.ts
/* @__NO_SIDE_EFFECTS__ */
function strictTuple(items, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "strict_tuple",
		reference: strictTuple,
		expects: "Array",
		async: false,
		items,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (Array.isArray(input)) {
				dataset.typed = true;
				dataset.value = [];
				for (let key = 0; key < this.items.length; key++) {
					const value$1 = input[key];
					const itemDataset = this.items[key]["~run"]({ value: value$1 }, config$1);
					if (itemDataset.issues) {
						const pathItem = {
							type: "array",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of itemDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = itemDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!itemDataset.typed) dataset.typed = false;
					dataset.value.push(itemDataset.value);
				}
				if (!(dataset.issues && config$1.abortEarly) && this.items.length < input.length) _addIssue(this, "type", dataset, config$1, {
					input: input[this.items.length],
					expected: "never",
					path: [{
						type: "array",
						origin: "value",
						input,
						key: this.items.length,
						value: input[this.items.length]
					}]
				});
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/strictTuple/strictTupleAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function strictTupleAsync(items, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "strict_tuple",
		reference: strictTupleAsync,
		expects: "Array",
		async: true,
		items,
		message: message$1,
		async "~run"(dataset, config$1) {
			const input = dataset.value;
			if (Array.isArray(input)) {
				dataset.typed = true;
				dataset.value = [];
				const itemDatasets = await Promise.all(this.items.map(async (item, key) => {
					const value$1 = input[key];
					return [
						key,
						value$1,
						await item["~run"]({ value: value$1 }, config$1)
					];
				}));
				for (const [key, value$1, itemDataset] of itemDatasets) {
					if (itemDataset.issues) {
						const pathItem = {
							type: "array",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of itemDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = itemDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!itemDataset.typed) dataset.typed = false;
					dataset.value.push(itemDataset.value);
				}
				if (!(dataset.issues && config$1.abortEarly) && this.items.length < input.length) _addIssue(this, "type", dataset, config$1, {
					input: input[this.items.length],
					expected: "never",
					path: [{
						type: "array",
						origin: "value",
						input,
						key: this.items.length,
						value: input[this.items.length]
					}]
				});
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/string/string.ts
/* @__NO_SIDE_EFFECTS__ */
function string(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "string",
		reference: string,
		expects: "string",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (typeof dataset.value === "string") dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/symbol/symbol.ts
/* @__NO_SIDE_EFFECTS__ */
function symbol(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "symbol",
		reference: symbol,
		expects: "symbol",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (typeof dataset.value === "symbol") dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/tuple/tuple.ts
/* @__NO_SIDE_EFFECTS__ */
function tuple(items, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "tuple",
		reference: tuple,
		expects: "Array",
		async: false,
		items,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (Array.isArray(input)) {
				dataset.typed = true;
				dataset.value = [];
				for (let key = 0; key < this.items.length; key++) {
					const value$1 = input[key];
					const itemDataset = this.items[key]["~run"]({ value: value$1 }, config$1);
					if (itemDataset.issues) {
						const pathItem = {
							type: "array",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of itemDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = itemDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!itemDataset.typed) dataset.typed = false;
					dataset.value.push(itemDataset.value);
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/tuple/tupleAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function tupleAsync(items, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "tuple",
		reference: tupleAsync,
		expects: "Array",
		async: true,
		items,
		message: message$1,
		async "~run"(dataset, config$1) {
			const input = dataset.value;
			if (Array.isArray(input)) {
				dataset.typed = true;
				dataset.value = [];
				const itemDatasets = await Promise.all(this.items.map(async (item, key) => {
					const value$1 = input[key];
					return [
						key,
						value$1,
						await item["~run"]({ value: value$1 }, config$1)
					];
				}));
				for (const [key, value$1, itemDataset] of itemDatasets) {
					if (itemDataset.issues) {
						const pathItem = {
							type: "array",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of itemDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = itemDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!itemDataset.typed) dataset.typed = false;
					dataset.value.push(itemDataset.value);
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/tupleWithRest/tupleWithRest.ts
/* @__NO_SIDE_EFFECTS__ */
function tupleWithRest(items, rest, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "tuple_with_rest",
		reference: tupleWithRest,
		expects: "Array",
		async: false,
		items,
		rest,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (Array.isArray(input)) {
				dataset.typed = true;
				dataset.value = [];
				for (let key = 0; key < this.items.length; key++) {
					const value$1 = input[key];
					const itemDataset = this.items[key]["~run"]({ value: value$1 }, config$1);
					if (itemDataset.issues) {
						const pathItem = {
							type: "array",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of itemDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = itemDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!itemDataset.typed) dataset.typed = false;
					dataset.value.push(itemDataset.value);
				}
				if (!dataset.issues || !config$1.abortEarly) for (let key = this.items.length; key < input.length; key++) {
					const value$1 = input[key];
					const itemDataset = this.rest["~run"]({ value: value$1 }, config$1);
					if (itemDataset.issues) {
						const pathItem = {
							type: "array",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of itemDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = itemDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!itemDataset.typed) dataset.typed = false;
					dataset.value.push(itemDataset.value);
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/tupleWithRest/tupleWithRestAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function tupleWithRestAsync(items, rest, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "tuple_with_rest",
		reference: tupleWithRestAsync,
		expects: "Array",
		async: true,
		items,
		rest,
		message: message$1,
		async "~run"(dataset, config$1) {
			const input = dataset.value;
			if (Array.isArray(input)) {
				dataset.typed = true;
				dataset.value = [];
				const [normalDatasets, restDatasets] = await Promise.all([Promise.all(this.items.map(async (item, key) => {
					const value$1 = input[key];
					return [
						key,
						value$1,
						await item["~run"]({ value: value$1 }, config$1)
					];
				})), Promise.all(input.slice(this.items.length).map(async (value$1, key) => {
					return [
						key + this.items.length,
						value$1,
						await this.rest["~run"]({ value: value$1 }, config$1)
					];
				}))]);
				for (const [key, value$1, itemDataset] of normalDatasets) {
					if (itemDataset.issues) {
						const pathItem = {
							type: "array",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of itemDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = itemDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!itemDataset.typed) dataset.typed = false;
					dataset.value.push(itemDataset.value);
				}
				if (!dataset.issues || !config$1.abortEarly) for (const [key, value$1, itemDataset] of restDatasets) {
					if (itemDataset.issues) {
						const pathItem = {
							type: "array",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of itemDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = itemDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!itemDataset.typed) dataset.typed = false;
					dataset.value.push(itemDataset.value);
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/undefined/undefined.ts
/* @__NO_SIDE_EFFECTS__ */
function undefined_(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "undefined",
		reference: undefined_,
		expects: "undefined",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.value === void 0) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/undefinedable/undefinedable.ts
/* @__NO_SIDE_EFFECTS__ */
function undefinedable(wrapped, default_) {
	return _standardSchema({
		kind: "schema",
		type: "undefinedable",
		reference: undefinedable,
		expects: `(${wrapped.expects} | undefined)`,
		async: false,
		wrapped,
		default: default_,
		"~run"(dataset, config$1) {
			if (dataset.value === void 0) {
				if (this.default !== void 0) dataset.value = /* @__PURE__ */ getDefault(this, dataset, config$1);
				if (dataset.value === void 0) {
					dataset.typed = true;
					return dataset;
				}
			}
			return this.wrapped["~run"](dataset, config$1);
		}
	});
}

//#endregion
//#region src/schemas/undefinedable/undefinedableAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function undefinedableAsync(wrapped, default_) {
	return _standardSchema({
		kind: "schema",
		type: "undefinedable",
		reference: undefinedableAsync,
		expects: `(${wrapped.expects} | undefined)`,
		async: true,
		wrapped,
		default: default_,
		async "~run"(dataset, config$1) {
			if (dataset.value === void 0) {
				if (this.default !== void 0) dataset.value = await /* @__PURE__ */ getDefault(this, dataset, config$1);
				if (dataset.value === void 0) {
					dataset.typed = true;
					return dataset;
				}
			}
			return this.wrapped["~run"](dataset, config$1);
		}
	});
}

//#endregion
//#region src/schemas/union/utils/_subIssues/_subIssues.ts
/**
* Returns the sub issues of the provided datasets for the union issue.
*
* @param datasets The datasets.
*
* @returns The sub issues.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _subIssues(datasets) {
	let issues;
	if (datasets) for (const dataset of datasets) if (issues) for (const issue of dataset.issues) issues.push(issue);
	else issues = dataset.issues;
	return issues;
}

//#endregion
//#region src/schemas/union/union.ts
/* @__NO_SIDE_EFFECTS__ */
function union(options, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "union",
		reference: union,
		expects: /* @__PURE__ */ _joinExpects(options.map((option) => option.expects), "|"),
		async: false,
		options,
		message: message$1,
		"~run"(dataset, config$1) {
			let validDataset;
			let typedDatasets;
			let untypedDatasets;
			for (const schema of this.options) {
				const optionDataset = schema["~run"]({ value: dataset.value }, config$1);
				if (optionDataset.typed) if (optionDataset.issues) if (typedDatasets) typedDatasets.push(optionDataset);
				else typedDatasets = [optionDataset];
				else {
					validDataset = optionDataset;
					break;
				}
				else if (untypedDatasets) untypedDatasets.push(optionDataset);
				else untypedDatasets = [optionDataset];
			}
			if (validDataset) return validDataset;
			if (typedDatasets) {
				if (typedDatasets.length === 1) return typedDatasets[0];
				_addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(typedDatasets) });
				dataset.typed = true;
			} else if (untypedDatasets?.length === 1) return untypedDatasets[0];
			else _addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(untypedDatasets) });
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/union/unionAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function unionAsync(options, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "union",
		reference: unionAsync,
		expects: /* @__PURE__ */ _joinExpects(options.map((option) => option.expects), "|"),
		async: true,
		options,
		message: message$1,
		async "~run"(dataset, config$1) {
			let validDataset;
			let typedDatasets;
			let untypedDatasets;
			for (const schema of this.options) {
				const optionDataset = await schema["~run"]({ value: dataset.value }, config$1);
				if (optionDataset.typed) if (optionDataset.issues) if (typedDatasets) typedDatasets.push(optionDataset);
				else typedDatasets = [optionDataset];
				else {
					validDataset = optionDataset;
					break;
				}
				else if (untypedDatasets) untypedDatasets.push(optionDataset);
				else untypedDatasets = [optionDataset];
			}
			if (validDataset) return validDataset;
			if (typedDatasets) {
				if (typedDatasets.length === 1) return typedDatasets[0];
				_addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(typedDatasets) });
				dataset.typed = true;
			} else if (untypedDatasets?.length === 1) return untypedDatasets[0];
			else _addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(untypedDatasets) });
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/unknown/unknown.ts
/**
* Creates a unknown schema.
*
* @returns A unknown schema.
*/
/* @__NO_SIDE_EFFECTS__ */
function unknown() {
	return _standardSchema({
		kind: "schema",
		type: "unknown",
		reference: unknown,
		expects: "unknown",
		async: false,
		"~run"(dataset) {
			dataset.typed = true;
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/variant/variant.ts
/* @__NO_SIDE_EFFECTS__ */
function variant(key, options, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "variant",
		reference: variant,
		expects: "Object",
		async: false,
		key,
		options,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (input && typeof input === "object") {
				let outputDataset;
				let maxDiscriminatorPriority = 0;
				let invalidDiscriminatorKey = this.key;
				let expectedDiscriminators = [];
				const parseOptions = (variant$1, allKeys) => {
					for (const schema of variant$1.options) {
						if (schema.type === "variant") parseOptions(schema, new Set(allKeys).add(schema.key));
						else {
							let keysAreValid = true;
							let currentPriority = 0;
							for (const currentKey of allKeys) {
								const discriminatorSchema = schema.entries[currentKey];
								if (currentKey in input ? discriminatorSchema["~run"]({
									typed: false,
									value: input[currentKey]
								}, ABORT_EARLY_CONFIG).issues : discriminatorSchema.type !== "exact_optional" && discriminatorSchema.type !== "optional" && discriminatorSchema.type !== "nullish") {
									keysAreValid = false;
									if (invalidDiscriminatorKey !== currentKey && (maxDiscriminatorPriority < currentPriority || maxDiscriminatorPriority === currentPriority && currentKey in input && !(invalidDiscriminatorKey in input))) {
										maxDiscriminatorPriority = currentPriority;
										invalidDiscriminatorKey = currentKey;
										expectedDiscriminators = [];
									}
									if (invalidDiscriminatorKey === currentKey) expectedDiscriminators.push(schema.entries[currentKey].expects);
									break;
								}
								currentPriority++;
							}
							if (keysAreValid) {
								const optionDataset = schema["~run"]({ value: input }, config$1);
								if (!outputDataset || !outputDataset.typed && optionDataset.typed) outputDataset = optionDataset;
							}
						}
						if (outputDataset && !outputDataset.issues) break;
					}
				};
				parseOptions(this, new Set([this.key]));
				if (outputDataset) return outputDataset;
				_addIssue(this, "type", dataset, config$1, {
					input: input[invalidDiscriminatorKey],
					expected: /* @__PURE__ */ _joinExpects(expectedDiscriminators, "|"),
					path: [{
						type: "object",
						origin: "value",
						input,
						key: invalidDiscriminatorKey,
						value: input[invalidDiscriminatorKey]
					}]
				});
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/variant/variantAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function variantAsync(key, options, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "variant",
		reference: variantAsync,
		expects: "Object",
		async: true,
		key,
		options,
		message: message$1,
		async "~run"(dataset, config$1) {
			const input = dataset.value;
			if (input && typeof input === "object") {
				let outputDataset;
				let maxDiscriminatorPriority = 0;
				let invalidDiscriminatorKey = this.key;
				let expectedDiscriminators = [];
				const parseOptions = async (variant$1, allKeys) => {
					for (const schema of variant$1.options) {
						if (schema.type === "variant") await parseOptions(schema, new Set(allKeys).add(schema.key));
						else {
							let keysAreValid = true;
							let currentPriority = 0;
							for (const currentKey of allKeys) {
								const discriminatorSchema = schema.entries[currentKey];
								if (currentKey in input ? (await discriminatorSchema["~run"]({
									typed: false,
									value: input[currentKey]
								}, ABORT_EARLY_CONFIG)).issues : discriminatorSchema.type !== "exact_optional" && discriminatorSchema.type !== "optional" && discriminatorSchema.type !== "nullish") {
									keysAreValid = false;
									if (invalidDiscriminatorKey !== currentKey && (maxDiscriminatorPriority < currentPriority || maxDiscriminatorPriority === currentPriority && currentKey in input && !(invalidDiscriminatorKey in input))) {
										maxDiscriminatorPriority = currentPriority;
										invalidDiscriminatorKey = currentKey;
										expectedDiscriminators = [];
									}
									if (invalidDiscriminatorKey === currentKey) expectedDiscriminators.push(schema.entries[currentKey].expects);
									break;
								}
								currentPriority++;
							}
							if (keysAreValid) {
								const optionDataset = await schema["~run"]({ value: input }, config$1);
								if (!outputDataset || !outputDataset.typed && optionDataset.typed) outputDataset = optionDataset;
							}
						}
						if (outputDataset && !outputDataset.issues) break;
					}
				};
				await parseOptions(this, new Set([this.key]));
				if (outputDataset) return outputDataset;
				_addIssue(this, "type", dataset, config$1, {
					input: input[invalidDiscriminatorKey],
					expected: /* @__PURE__ */ _joinExpects(expectedDiscriminators, "|"),
					path: [{
						type: "object",
						origin: "value",
						input,
						key: invalidDiscriminatorKey,
						value: input[invalidDiscriminatorKey]
					}]
				});
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/schemas/void/void.ts
/* @__NO_SIDE_EFFECTS__ */
function void_(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "void",
		reference: void_,
		expects: "void",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.value === void 0) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}

//#endregion
//#region src/methods/keyof/keyof.ts
/* @__NO_SIDE_EFFECTS__ */
function keyof(schema, message$1) {
	return /* @__PURE__ */ picklist(Object.keys(schema.entries), message$1);
}

//#endregion
//#region src/methods/message/message.ts
/**
* Changes the local message configuration of a schema.
*
* @param schema The schema to configure.
* @param message_ The error message.
*
* @returns The configured schema.
*/
/* @__NO_SIDE_EFFECTS__ */
function message(schema, message_) {
	return _standardSchema({
		...schema,
		"~run"(dataset, config$1) {
			return schema["~run"](dataset, {
				...config$1,
				message: message_
			});
		}
	});
}

//#endregion
//#region src/methods/omit/omit.ts
/**
* Creates a modified copy of an object schema that does not contain the
* selected entries.
*
* @param schema The schema to omit from.
* @param keys The selected entries.
*
* @returns An object schema.
*/
/* @__NO_SIDE_EFFECTS__ */
function omit(schema, keys) {
	const entries$1 = { ...schema.entries };
	for (const key of keys) delete entries$1[key];
	return _standardSchema({
		...schema,
		entries: entries$1
	});
}

//#endregion
//#region src/methods/parse/parse.ts
/**
* Parses an unknown input based on a schema.
*
* @param schema The schema to be used.
* @param input The input to be parsed.
* @param config The parse configuration.
*
* @returns The parsed input.
*/
function parse(schema, input, config$1) {
	const dataset = schema["~run"]({ value: input }, /* @__PURE__ */ getGlobalConfig(config$1));
	if (dataset.issues) throw new ValiError(dataset.issues);
	return dataset.value;
}

//#endregion
//#region src/methods/parse/parseAsync.ts
/**
* Parses an unknown input based on a schema.
*
* @param schema The schema to be used.
* @param input The input to be parsed.
* @param config The parse configuration.
*
* @returns The parsed input.
*/
async function parseAsync(schema, input, config$1) {
	const dataset = await schema["~run"]({ value: input }, /* @__PURE__ */ getGlobalConfig(config$1));
	if (dataset.issues) throw new ValiError(dataset.issues);
	return dataset.value;
}

//#endregion
//#region src/methods/parser/parser.ts
/* @__NO_SIDE_EFFECTS__ */
function parser(schema, config$1) {
	const func = (input) => parse(schema, input, config$1);
	func.schema = schema;
	func.config = config$1;
	return func;
}

//#endregion
//#region src/methods/parser/parserAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function parserAsync(schema, config$1) {
	const func = (input) => parseAsync(schema, input, config$1);
	func.schema = schema;
	func.config = config$1;
	return func;
}

//#endregion
//#region src/methods/partial/partial.ts
/* @__NO_SIDE_EFFECTS__ */
function partial(schema, keys) {
	const entries$1 = {};
	for (const key in schema.entries) entries$1[key] = !keys || keys.includes(key) ? /* @__PURE__ */ optional(schema.entries[key]) : schema.entries[key];
	return _standardSchema({
		...schema,
		entries: entries$1
	});
}

//#endregion
//#region src/methods/partial/partialAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function partialAsync(schema, keys) {
	const entries$1 = {};
	for (const key in schema.entries) entries$1[key] = !keys || keys.includes(key) ? /* @__PURE__ */ optionalAsync(schema.entries[key]) : schema.entries[key];
	return _standardSchema({
		...schema,
		entries: entries$1
	});
}

//#endregion
//#region src/methods/pick/pick.ts
/**
* Creates a modified copy of an object schema that contains only the selected
* entries.
*
* @param schema The schema to pick from.
* @param keys The selected entries.
*
* @returns An object schema.
*/
/* @__NO_SIDE_EFFECTS__ */
function pick(schema, keys) {
	const entries$1 = {};
	for (const key of keys) entries$1[key] = schema.entries[key];
	return _standardSchema({
		...schema,
		entries: entries$1
	});
}

//#endregion
//#region src/methods/pipe/pipe.ts
/* @__NO_SIDE_EFFECTS__ */
function pipe(...pipe$1) {
	return _standardSchema({
		...pipe$1[0],
		pipe: pipe$1,
		"~run"(dataset, config$1) {
			for (const item of pipe$1) if (item.kind !== "metadata") {
				if (dataset.issues && (item.kind === "schema" || item.kind === "transformation")) {
					dataset.typed = false;
					break;
				}
				if (!dataset.issues || !config$1.abortEarly && !config$1.abortPipeEarly) dataset = item["~run"](dataset, config$1);
			}
			return dataset;
		}
	});
}

//#endregion
//#region src/methods/pipe/pipeAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function pipeAsync(...pipe$1) {
	return _standardSchema({
		...pipe$1[0],
		pipe: pipe$1,
		async: true,
		async "~run"(dataset, config$1) {
			for (const item of pipe$1) if (item.kind !== "metadata") {
				if (dataset.issues && (item.kind === "schema" || item.kind === "transformation")) {
					dataset.typed = false;
					break;
				}
				if (!dataset.issues || !config$1.abortEarly && !config$1.abortPipeEarly) dataset = await item["~run"](dataset, config$1);
			}
			return dataset;
		}
	});
}

//#endregion
//#region src/methods/required/required.ts
/* @__NO_SIDE_EFFECTS__ */
function required(schema, arg2, arg3) {
	const keys = Array.isArray(arg2) ? arg2 : void 0;
	const message$1 = Array.isArray(arg2) ? arg3 : arg2;
	const entries$1 = {};
	for (const key in schema.entries) entries$1[key] = !keys || keys.includes(key) ? /* @__PURE__ */ nonOptional(schema.entries[key], message$1) : schema.entries[key];
	return _standardSchema({
		...schema,
		entries: entries$1
	});
}

//#endregion
//#region src/methods/required/requiredAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function requiredAsync(schema, arg2, arg3) {
	const keys = Array.isArray(arg2) ? arg2 : void 0;
	const message$1 = Array.isArray(arg2) ? arg3 : arg2;
	const entries$1 = {};
	for (const key in schema.entries) entries$1[key] = !keys || keys.includes(key) ? /* @__PURE__ */ nonOptionalAsync(schema.entries[key], message$1) : schema.entries[key];
	return _standardSchema({
		...schema,
		entries: entries$1
	});
}

//#endregion
//#region src/methods/safeParse/safeParse.ts
/**
* Parses an unknown input based on a schema.
*
* @param schema The schema to be used.
* @param input The input to be parsed.
* @param config The parse configuration.
*
* @returns The parse result.
*/
/* @__NO_SIDE_EFFECTS__ */
function safeParse(schema, input, config$1) {
	const dataset = schema["~run"]({ value: input }, /* @__PURE__ */ getGlobalConfig(config$1));
	return {
		typed: dataset.typed,
		success: !dataset.issues,
		output: dataset.value,
		issues: dataset.issues
	};
}

//#endregion
//#region src/methods/safeParse/safeParseAsync.ts
/**
* Parses an unknown input based on a schema.
*
* @param schema The schema to be used.
* @param input The input to be parsed.
* @param config The parse configuration.
*
* @returns The parse result.
*/
/* @__NO_SIDE_EFFECTS__ */
async function safeParseAsync(schema, input, config$1) {
	const dataset = await schema["~run"]({ value: input }, /* @__PURE__ */ getGlobalConfig(config$1));
	return {
		typed: dataset.typed,
		success: !dataset.issues,
		output: dataset.value,
		issues: dataset.issues
	};
}

//#endregion
//#region src/methods/safeParser/safeParser.ts
/* @__NO_SIDE_EFFECTS__ */
function safeParser(schema, config$1) {
	const func = (input) => /* @__PURE__ */ safeParse(schema, input, config$1);
	func.schema = schema;
	func.config = config$1;
	return func;
}

//#endregion
//#region src/methods/safeParser/safeParserAsync.ts
/* @__NO_SIDE_EFFECTS__ */
function safeParserAsync(schema, config$1) {
	const func = (input) => /* @__PURE__ */ safeParseAsync(schema, input, config$1);
	func.schema = schema;
	func.config = config$1;
	return func;
}

//#endregion
//#region src/methods/summarize/summarize.ts
/**
* Summarize the error messages of issues in a pretty-printable multi-line string.
*
* @param issues The list of issues.
*
* @returns A summary of the issues.
*
* @beta
*/
/* @__NO_SIDE_EFFECTS__ */
function summarize(issues) {
	let summary = "";
	for (const issue of issues) {
		if (summary) summary += "\n";
		summary += `× ${issue.message}`;
		const dotPath = /* @__PURE__ */ getDotPath(issue);
		if (dotPath) summary += `\n  → at ${dotPath}`;
	}
	return summary;
}

//#endregion
//#region src/methods/unwrap/unwrap.ts
/**
* Unwraps the wrapped schema.
*
* @param schema The schema to be unwrapped.
*
* @returns The unwrapped schema.
*/
/* @__NO_SIDE_EFFECTS__ */
function unwrap(schema) {
	return schema.wrapped;
}

//#endregion
export { BASE64_REGEX, BIC_REGEX, CUID2_REGEX, DECIMAL_REGEX, DIGITS_REGEX, DOMAIN_REGEX, EMAIL_REGEX, EMOJI_REGEX, HEXADECIMAL_REGEX, HEX_COLOR_REGEX, IMEI_REGEX, IPV4_REGEX, IPV6_REGEX, IP_REGEX, ISO_DATE_REGEX, ISO_DATE_TIME_REGEX, ISO_DATE_TIME_SECOND_REGEX, ISO_TIMESTAMP_REGEX, ISO_TIME_REGEX, ISO_TIME_SECOND_REGEX, ISO_WEEK_REGEX, ISRC_REGEX, JWS_COMPACT_REGEX, KSUID_REGEX, MAC48_REGEX, MAC64_REGEX, MAC_REGEX, NANO_ID_REGEX, OCTAL_REGEX, RFC_EMAIL_REGEX, SLUG_REGEX, ULID_REGEX, UUID_REGEX, ValiError, _addIssue, _cloneDataset, _formatCase, _getByteCount, _getCodePointCount, _getGraphemeCount, _getLastMetadata, _getWordCount, _isLuhnAlgo, _isSameValueZero, _isValidObjectKey, _isValueMatch, _joinExpects, _standardSchema, _stringify, any, args, argsAsync, array, arrayAsync, assert, awaitAsync, base64, bic, bigint, blob, boolean, brand, bytes, cache, cacheAsync, check, checkAsync, checkItems, checkItemsAsync, codePoints, config, creditCard, cuid2, custom, customAsync, date, decimal, deleteGlobalConfig, deleteGlobalMessage, deleteSchemaMessage, deleteSpecificMessage, description, digits, domain, email, emoji, empty, endsWith, entries, entriesFromList, entriesFromObjects, enum_ as enum, enum_, everyItem, exactOptional, exactOptionalAsync, examples, excludes, fallback, fallbackAsync, file, filterItems, findItem, finite, flatten, flavor, forward, forwardAsync, function_ as function, function_, getDefault, getDefaults, getDefaultsAsync, getDescription, getDotPath, getExamples, getFallback, getFallbacks, getFallbacksAsync, getGlobalConfig, getGlobalMessage, getMetadata, getSchemaMessage, getSpecificMessage, getTitle, graphemes, gtValue, guard, hash, hexColor, hexadecimal, imei, includes, instance, integer, intersect, intersectAsync, ip, ipv4, ipv6, is, isOfKind, isOfType, isValiError, isbn, isoDate, isoDateTime, isoDateTimeSecond, isoTime, isoTimeSecond, isoTimestamp, isoWeek, isrc, jwsCompact, keyof, ksuid, lazy, lazyAsync, length, literal, looseObject, looseObjectAsync, looseTuple, looseTupleAsync, ltValue, mac, mac48, mac64, map, mapAsync, mapItems, maxBytes, maxCodePoints, maxEntries, maxGraphemes, maxLength, maxSize, maxValue, maxWords, message, metadata, mimeType, minBytes, minCodePoints, minEntries, minGraphemes, minLength, minSize, minValue, minWords, multipleOf, nan, nanoid, never, nonEmpty, nonNullable, nonNullableAsync, nonNullish, nonNullishAsync, nonOptional, nonOptionalAsync, normalize, notBytes, notCodePoints, notEntries, notGraphemes, notLength, notSize, notValue, notValues, notWords, null_ as null, null_, nullable, nullableAsync, nullish, nullishAsync, number, object, objectAsync, objectWithRest, objectWithRestAsync, octal, omit, optional, optionalAsync, parse, parseAsync, parseBoolean, parseJson, parser, parserAsync, partial, partialAsync, partialCheck, partialCheckAsync, pick, picklist, pipe, pipeAsync, promise, rawCheck, rawCheckAsync, rawTransform, rawTransformAsync, readonly, record, recordAsync, reduceItems, regex, required, requiredAsync, returns, returnsAsync, rfcEmail, safeInteger, safeParse, safeParseAsync, safeParser, safeParserAsync, set, setAsync, setGlobalConfig, setGlobalMessage, setSchemaMessage, setSpecificMessage, size, slug, someItem, sortItems, startsWith, strictObject, strictObjectAsync, strictTuple, strictTupleAsync, string, stringifyJson, summarize, symbol, title, toBigint, toBoolean, toCamelCase, toDate, toKebabCase, toLowerCase, toMaxValue, toMinValue, toNumber, toPascalCase, toSnakeCase, toString, toUpperCase, transform, transformAsync, trim, trimEnd, trimStart, tuple, tupleAsync, tupleWithRest, tupleWithRestAsync, ulid, undefined_ as undefined, undefined_, undefinedable, undefinedableAsync, union, unionAsync, unknown, unwrap, url, uuid, value, values, variant, variantAsync, void_ as void, void_, words };