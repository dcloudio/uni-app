import { ApiProtocol } from '../type'

export const LoadSubPackageProtocol: ApiProtocol = {
  root: {
    type: String,
    required: true,
    validator(value) {
      const subPackages = __uniConfig.subPackages
      if (!Array.isArray(subPackages) || subPackages.length === 0) {
        return 'no subPackages'
      }
      if (!subPackages.find((subPackage) => subPackage.root === value)) {
        return 'root `' + value + '` is not found'
      }
    },
  },
}
