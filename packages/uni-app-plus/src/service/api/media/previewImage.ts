import {
  API_PREVIEW_IMAGE,
  API_TYPE_PREVIEW_IMAGE,
  defineAsyncApi,
  PreviewImageProtocol,
  PreviewImageOptions,
  API_CLOSE_PREVIEW_IMAGE,
  API_TYPE_CLOSE_PREVIEW_IMAGE,
} from '@dcloudio/uni-api'

import { isFunction, isPlainObject } from '@vue/shared'

import { initI18nPreviewImageMsgsOnce, useI18n } from '@dcloudio/uni-core'

import { getRealPath } from '../../../platform/getRealPath'

export const previewImage = defineAsyncApi<API_TYPE_PREVIEW_IMAGE>(
  API_PREVIEW_IMAGE,
  (
    { current = 0, indicator = 'number', loop = false, urls, longPressActions },
    { resolve, reject }
  ) => {
    initI18nPreviewImageMsgsOnce()
    const { t } = useI18n()

    urls = urls.map((url) => getRealPath(url))

    const index = Number(current)
    if (isNaN(index)) {
      current = urls.indexOf(getRealPath(current as string))
      current = current < 0 ? 0 : current
    } else {
      current = index
    }

    plus.nativeUI.previewImage(urls, {
      current,
      indicator,
      loop,
      onLongPress: function (res: any) {
        let itemList: string[] = []
        let itemColor = ''

        const hasLongPressActions =
          longPressActions && isPlainObject(longPressActions)

        if (!hasLongPressActions) {
          itemList = [t('uni.previewImage.button.save')]
          itemColor = '#000000'
        } else {
          itemList = longPressActions!.itemList
            ? longPressActions!.itemList
            : []
          itemColor = longPressActions!.itemColor
            ? longPressActions!.itemColor
            : '#000000'
        }

        const options = {
          buttons: itemList.map((item) => ({
            title: item,
            color: itemColor,
          })),
          cancel: t('uni.previewImage.cancel'),
        }

        plus.nativeUI.actionSheet(options, (e) => {
          if (e.index > 0) {
            if (hasLongPressActions) {
              isFunction(longPressActions.success) &&
                longPressActions.success({
                  tapIndex: e.index - 1,
                  index: res.index,
                })

              return
            }
            plus.gallery.save(
              res.url,
              () => {
                plus.nativeUI.toast(t('uni.previewImage.save.success'))
              },
              function () {
                plus.nativeUI.toast(t('uni.previewImage.save.fail'))
              }
            )
          } else if (hasLongPressActions) {
            isFunction(longPressActions.fail) &&
              longPressActions.fail({
                errMsg: 'showActionSheet:fail cancel',
              })
          }
        })
      },
    })
    resolve()
  },
  PreviewImageProtocol,
  PreviewImageOptions
)

export const closePreviewImage = defineAsyncApi<API_TYPE_CLOSE_PREVIEW_IMAGE>(
  API_CLOSE_PREVIEW_IMAGE,
  (_, { resolve, reject }) => {
    try {
      // @ts-expect-error
      plus.nativeUI.closePreviewImage()
      resolve()
    } catch (error) {
      reject()
    }
  }
)
