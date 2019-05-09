import normalizePreviewImageArgs from '../../helpers/normalize-preview-image-args'
export const protocols = {
  previewImage: {
    args (fromArgs) {
      normalizePreviewImageArgs(fromArgs)
      return {
        indicator: false,
        loop: false
      }
    }
  }
}
export const todos = []
export const canIUses = []
