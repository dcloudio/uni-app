import { isArray } from '@vue/shared'

export const API_LOAD_SUB_PACKAGE = 'loadSubPackage'
// export type API_TYPE_LOAD_SUB_PACKAGE = typeof uni.loadSubPackage
export const LoadSubPackageProtocol: ApiProtocol<any> = {
  root: {
    type: String,
    required: true,
  },
}
export const LoadSubPackageOptions: ApiOptions<any> = {
  formatArgs: {
    root(value: string | undefined) {
      const subPackages = __uniConfig.subPackages
      if (!isArray(subPackages) || subPackages.length === 0) {
        return 'no subPackages'
      }
      if (!subPackages.find((subPackage) => subPackage.root === value)) {
        return 'root `' + value + '` is not found'
      }
    },
  },
}
