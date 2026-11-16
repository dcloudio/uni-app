import { reactive } from 'vue'

export type TemplateValue = string | number | boolean
export type TemplateDescription = string | { value?: string; kind?: string }

export interface TemplatePlatformVersion {
  unixVaporVer?: string;
  unixVer?: string;
}

export interface TemplatePlatforms {
  app?: { android?: TemplatePlatformVersion; ios?: TemplatePlatformVersion; harmony?: TemplatePlatformVersion };
  harmony?: TemplatePlatformVersion;
  mp?: { [name: string]: TemplatePlatformVersion | undefined };
  /** 兼容语法库中部分事件数据多包了一层 uniPlatform 的旧格式。 */
  uniPlatform?: TemplatePlatforms;
  web?: TemplatePlatformVersion;
}

export interface TemplateOption {
  name: string;
  description?: TemplateDescription;
  uniPlatform?: TemplatePlatforms;
  type?: string;
  values?: TemplateOption[];
}

export interface TemplateAttribute {
  name: string;
  type?: string;
  docType?: string;
  uniPlatform?: TemplatePlatforms;
  description?: TemplateDescription;
  /** 存在此字段的属性不生成控制项或初始值。 */
  deprecated?: boolean | TemplateDescription | null;
  /** 语法库声明了但当前属性不支持的平台；至少有一个平台支持时仍生成属性。 */
  unsupportedPlatforms?: string[];
  defaultValue?: TemplateValue | null;
  valueSet?: string;
  values?: TemplateOption[];
}

export interface ComponentSyntax {
  name: string;
  description?: TemplateDescription;
  attributes?: TemplateAttribute[];
  hasGeneralEvents?: boolean;
  uniPlatform?: TemplatePlatforms;
}

export type TemplateModel = { [name: string]: TemplateValue }

export interface TemplateChange {
  name: string;
  value: TemplateValue;
}

export interface TemplateControl {
  min?: number;
  max?: number;
  step?: number;
  live?: boolean;
}

export interface PlatformSupport {
  /** 是否存在平台元数据；没有元数据时不应据此判定不支持。 */
  hasMetadata: boolean;
  /** 只要声明的平台中有一个支持，就保留属性或候选值。 */
  supported: boolean;
  /** 是否存在不支持的平台；即使该平台不在界面提示范围内也保留此状态。 */
  hasUnsupportedPlatforms: boolean;
  /** 已声明但不支持的平台名称。 */
  unsupportedPlatforms: string[];
}

function isPlatformTarget(value: TemplatePlatformVersion | undefined): boolean {
  return value != null
}

function isSupportedVersion(target: TemplatePlatformVersion): boolean {
  const version = target.unixVaporVer !== undefined ? target.unixVaporVer : target.unixVer
  return typeof version == 'string' && version.trim() != '' && version.trim().toLowerCase() != 'x'
}

function platformName(group: string, name?: string): string {
  if (group == 'web') return 'Web'
  if (group == 'app') {
    const labels: { [name: string]: string } = { android: 'Android', ios: 'iOS', harmony: 'Harmony' }
    return 'App-' + (labels[name ?? ''] ?? name ?? '未知')
  }
  if (group == 'mp') return name == null ? 'mp' : 'mp-' + name
  return name == null ? group : group + '-' + name
}

/** 将 uniPlatform 中已声明的目标平台展开；缺失平台不当作不支持。 */
export function getPlatformSupport(platforms?: TemplatePlatforms): PlatformSupport {
  if (platforms == null) return { hasMetadata: false, supported: true, hasUnsupportedPlatforms: false, unsupportedPlatforms: [] }
  const targetStates: { [name: string]: boolean } = {}
  function addTarget(name: string, target?: TemplatePlatformVersion): void {
    if (!isPlatformTarget(target)) return
    targetStates[name] = targetStates[name] === true || isSupportedVersion(target)
  }
  function collect(value: TemplatePlatforms): void {
    addTarget(platformName('web'), value.web)
    if (value.app != null) {
      for (const name of Object.keys(value.app)) {
        const version = value.app[name as 'android' | 'ios' | 'harmony']
        addTarget(platformName('app', name), version)
      }
    }
    addTarget(platformName('app', 'harmony'), value.harmony)
    if (value.mp != null) {
      for (const name of Object.keys(value.mp)) {
        const version = value.mp[name]
        addTarget(platformName('mp', name), version)
      }
    }
    if (value.uniPlatform != null) {
      collect(value.uniPlatform)
    }
  }
  collect(platforms)
  const names = Object.keys(targetStates)
  if (names.length == 0) return { hasMetadata: false, supported: true, hasUnsupportedPlatforms: false, unsupportedPlatforms: [] }
  const unsupportedNames = names.filter((name) => !targetStates[name])
  const unsupportedPlatforms = unsupportedNames.filter((name) =>
    !name.startsWith('mp-') || name == 'mp-weixin' || name == 'mp-alipay')
  return {
    hasMetadata: true,
    supported: unsupportedNames.length < names.length,
    hasUnsupportedPlatforms: unsupportedNames.length > 0,
    unsupportedPlatforms
  }
}

export function isPlatformSupported(platforms?: TemplatePlatforms): boolean {
  return getPlatformSupport(platforms).supported
}

export function isEventAttribute(attribute: TemplateAttribute): boolean {
  const type = (attribute.type ?? '').trim().toLowerCase()
  return attribute.name.startsWith('[event]') || type.includes('=>') ||
    ['event', 'eventhandle', 'eventhandler'].includes(type)
}

/** 保留语法顺序和其他元数据，不修改源 JSON。 */
export function filterSyntaxAttributes(syntax: ComponentSyntax): ComponentSyntax {
  const attributes: TemplateAttribute[] = []
  for (const attribute of syntax.attributes ?? []) {
    if (Object.keys(attribute).includes('deprecated')) continue
    const support = getPlatformSupport(attribute.uniPlatform)
    if (!support.supported) continue
    const values = attribute.values?.filter((option) =>
      option.uniPlatform === undefined || isPlatformSupported(option.uniPlatform))
    // 所有候选项均被排除时不能把枚举退化为任意文本输入。
    if (attribute.values != null && attribute.values.length > 0 && values?.length == 0) continue
    const removedDefault = attribute.values?.some((option) => option.name === attribute.defaultValue) &&
      !values?.some((option) => option.name === attribute.defaultValue)
    attributes.push({ ...attribute, ...(support.unsupportedPlatforms.length > 0 ? { unsupportedPlatforms: support.unsupportedPlatforms } : {}),
      ...(values == null ? {} : { values }),
      ...(removedDefault ? { defaultValue: values?.[0]?.name } : {}) })
  }
  return { ...syntax, attributes }
}

export type TemplateInputType = 'input' | 'switch' | 'slider' | 'combobox'

export function getTemplateInputType(attribute: TemplateAttribute): TemplateInputType | null {
  if (isEventAttribute(attribute)) return null
  const type = (attribute.docType ?? attribute.type ?? '').trim().toLowerCase()
  if (attribute.values != null && attribute.values.length > 0) {
    // values 也用于描述数组、对象字段，不能将这种结构当作字符串枚举。
    if (attribute.values.some((option) => option.values != null || option.type != null)) return null
    if (type.includes('[]') || type.includes('array') || type.includes('object')) return null
    return 'combobox'
  }
  if (type == 'boolean' || (['boolean | string', 'string | boolean'].includes(type) && typeof attribute.defaultValue == 'boolean')) return 'switch'
  if (type == 'number' || (['string | number', 'number | string', 'string|number', 'number/string'].includes(type) && typeof attribute.defaultValue == 'number')) return 'slider'
  if (type == 'string' || type == 'string | null' || (type.includes('string') && typeof attribute.defaultValue == 'string' && !type.includes('[]') && !type.includes('array') && !type.includes('object'))) {
    return attribute.valueSet == 'string.ColorString' || attribute.name.toLowerCase().includes('color') ? 'combobox' : 'input'
  }
  return null
}

export function createTemplateDefaults(syntax: ComponentSyntax): TemplateModel {
  const values: TemplateModel = {}
  for (const attribute of filterSyntaxAttributes(syntax).attributes ?? []) {
    if (!isEditableAttribute(attribute)) continue
    const input = getTemplateInputType(attribute)
    if (input == null) continue
    const fallback = attribute.values?.[0]?.name
    const declared = attribute.defaultValue
    values[attribute.name] = declared ?? fallback ??
      (input == 'switch' ? false : (input == 'slider' ? 0 : ''))
  }
  return values
}

export function isEditableAttribute(attribute: TemplateAttribute): boolean {
  return !isEventAttribute(attribute) && !Object.keys(attribute).includes('deprecated')
}

export function createTemplateModel(syntax: ComponentSyntax): TemplateModel {
  return reactive(createTemplateDefaults(syntax)) as TemplateModel
}

export function resetTemplateModel(model: TemplateModel, syntax: ComponentSyntax): void {
  const defaults = createTemplateDefaults(syntax)
  Object.keys(model).forEach((key: string) => { delete model[key] })
  Object.assign(model, defaults)
}

export function updateTemplateModel(model: TemplateModel, change: TemplateChange): void {
  model[change.name] = change.value
}
