/**
 * copy from @uts/shared
 */

export enum IDENTIFIER {
  UTSJSONObject = 'UTSJSONObject',
  JSON = 'JSON',
  UTS = 'UTS',
  VUE = 'vue',
  GLOBAL_THIS = 'globalThis',
  UTS_TYPE = 'UTSType',
  UTS_METADATA = '$UTSMetadata$',
  TEMP_UTS_METADATA = '$TempUTSMetadata$',
  JSON_FIELD = 'JSON_FIELD',
}

export enum UTS_CLASS_METADATA_KIND {
  CLASS = 0,
  INTERFACE,
  TYPE,
}
