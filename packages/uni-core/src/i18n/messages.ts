// This file is created by scripts/i18n.js
// Do not modify this file!!!!!!!!!
import {
  LOCALE_EN,
  LOCALE_ES,
  LOCALE_FR,
  LOCALE_ZH_HANS,
  LOCALE_ZH_HANT,
} from '@dcloudio/uni-i18n'
import { useI18n } from './useI18n'
const i18n = useI18n()
function normalizeMessages(
  namespace: string,
  messages: Record<string, string>
) {
  return Object.keys(messages).reduce<Record<string, string>>((res, name) => {
    res[namespace + name] = messages[name]
    return res
  }, {})
}
export function initI18nAppMsgs() {
  const name = 'uni.app.'
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(
      LOCALE_EN,
      normalizeMessages(name, { quit: 'Press back button again to exit' })
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(
      LOCALE_ES,
      normalizeMessages(name, { quit: 'Pulse otra vez para salir' })
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(
      LOCALE_FR,
      normalizeMessages(name, {
        quit: "Appuyez à nouveau pour quitter l'application",
      })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, { quit: '再按一次退出应用' })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, { quit: '再按一次退出應用' })
    )
  }
}
export function initI18nAsyncMsgs() {
  const name = 'uni.async.'
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(
      LOCALE_EN,
      normalizeMessages(name, {
        error: 'The connection timed out, click the screen to try again.',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(
      LOCALE_ES,
      normalizeMessages(name, {
        error:
          'Se agotó el tiempo de conexión, haga clic en la pantalla para volver a intentarlo.',
      })
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(
      LOCALE_FR,
      normalizeMessages(name, {
        error: "La connexion a expiré, cliquez sur l'écran pour réessayer.",
      })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, { error: '连接服务器超时，点击屏幕重试' })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, { error: '連接服務器超時，點擊屏幕重試' })
    )
  }
}
export function initI18nShowActionSheetMsgs() {
  const name = 'uni.showActionSheet.'
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(LOCALE_EN, normalizeMessages(name, { cancel: 'Cancel' }))
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(LOCALE_ES, normalizeMessages(name, { cancel: 'Cancelar' }))
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(LOCALE_FR, normalizeMessages(name, { cancel: 'Annuler' }))
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(LOCALE_ZH_HANS, normalizeMessages(name, { cancel: '取消' }))
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(LOCALE_ZH_HANT, normalizeMessages(name, { cancel: '取消' }))
  }
}
export function initI18nShowToastMsgs() {
  const name = 'uni.showToast.'
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(
      LOCALE_EN,
      normalizeMessages(name, {
        unpaired: 'Please note showToast must be paired with hideToast',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(
      LOCALE_ES,
      normalizeMessages(name, {
        unpaired:
          'Tenga en cuenta que showToast debe estar emparejado con hideToast',
      })
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(
      LOCALE_FR,
      normalizeMessages(name, {
        unpaired: 'Veuillez noter que showToast doit être associé à hideToast',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, {
        unpaired: '请注意 showToast 与 hideToast 必须配对使用',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, {
        unpaired: '請注意 showToast 與 hideToast 必須配對使用',
      })
    )
  }
}
export function initI18nShowLoadingMsgs() {
  const name = 'uni.showLoading.'
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(
      LOCALE_EN,
      normalizeMessages(name, {
        unpaired: 'Please note showLoading must be paired with hideLoading',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(
      LOCALE_ES,
      normalizeMessages(name, {
        unpaired:
          'Tenga en cuenta que showLoading debe estar emparejado con hideLoading',
      })
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(
      LOCALE_FR,
      normalizeMessages(name, {
        unpaired:
          'Veuillez noter que showLoading doit être associé à hideLoading',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, {
        unpaired: '请注意 showLoading 与 hideLoading 必须配对使用',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, {
        unpaired: '請注意 showLoading 與 hideLoading 必須配對使用',
      })
    )
  }
}
export function initI18nShowModalMsgs() {
  const name = 'uni.showModal.'
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(
      LOCALE_EN,
      normalizeMessages(name, { cancel: 'Cancel', confirm: 'OK' })
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(
      LOCALE_ES,
      normalizeMessages(name, { cancel: 'Cancelar', confirm: 'OK' })
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(
      LOCALE_FR,
      normalizeMessages(name, { cancel: 'Annuler', confirm: 'OK' })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, { cancel: '取消', confirm: '确定' })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, { cancel: '取消', confirm: '確定' })
    )
  }
}
export function initI18nChooseImageMsgs() {
  const name = 'uni.chooseImage.'
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(
      LOCALE_EN,
      normalizeMessages(name, {
        cancel: 'Cancel',
        'sourceType.album': 'Album',
        'sourceType.camera': 'Camera',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(
      LOCALE_ES,
      normalizeMessages(name, {
        cancel: 'Cancelar',
        'sourceType.album': 'Álbum',
        'sourceType.camera': 'Cámara',
      })
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(
      LOCALE_FR,
      normalizeMessages(name, {
        cancel: 'Annuler',
        'sourceType.album': 'Album',
        'sourceType.camera': 'Caméra',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, {
        cancel: '取消',
        'sourceType.album': '从相册选择',
        'sourceType.camera': '拍摄',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, {
        cancel: '取消',
        'sourceType.album': '從相冊選擇',
        'sourceType.camera': '拍攝',
      })
    )
  }
}
export function initI18nChooseVideoMsgs() {
  const name = 'uni.chooseVideo.'
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(
      LOCALE_EN,
      normalizeMessages(name, {
        cancel: 'Cancel',
        'sourceType.album': 'Album',
        'sourceType.camera': 'Camera',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(
      LOCALE_ES,
      normalizeMessages(name, {
        cancel: 'Cancelar',
        'sourceType.album': 'Álbum',
        'sourceType.camera': 'Cámara',
      })
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(
      LOCALE_FR,
      normalizeMessages(name, {
        cancel: 'Annuler',
        'sourceType.album': 'Album',
        'sourceType.camera': 'Caméra',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, {
        cancel: '取消',
        'sourceType.album': '从相册选择',
        'sourceType.camera': '拍摄',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, {
        cancel: '取消',
        'sourceType.album': '從相冊選擇',
        'sourceType.camera': '拍攝',
      })
    )
  }
}
export function initI18nPreviewImageMsgs() {
  const name = 'uni.previewImage.'
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(
      LOCALE_EN,
      normalizeMessages(name, {
        cancel: 'Cancel',
        'button.save': 'Save Image',
        'save.success': 'Saved successfully',
        'save.fail': 'Save failed',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(
      LOCALE_ES,
      normalizeMessages(name, {
        cancel: 'Cancelar',
        'button.save': 'Guardar imagen',
        'save.success': 'Guardado exitosamente',
        'save.fail': 'Error al guardar',
      })
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(
      LOCALE_FR,
      normalizeMessages(name, {
        cancel: 'Annuler',
        'button.save': 'Guardar imagen',
        'save.success': 'Enregistré avec succès',
        'save.fail': 'Échec de la sauvegarde',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, {
        cancel: '取消',
        'button.save': '保存图像',
        'save.success': '保存图像到相册成功',
        'save.fail': '保存图像到相册失败',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, {
        cancel: '取消',
        'button.save': '保存圖像',
        'save.success': '保存圖像到相冊成功',
        'save.fail': '保存圖像到相冊失敗',
      })
    )
  }
}
export function initI18nSetClipboardDataMsgs() {
  const name = 'uni.setClipboardData.'
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(LOCALE_EN, normalizeMessages(name, { success: 'Content copied' }))
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(
      LOCALE_ES,
      normalizeMessages(name, { success: 'Contenido copiado' })
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(LOCALE_FR, normalizeMessages(name, { success: 'Contenu copié' }))
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(LOCALE_ZH_HANS, normalizeMessages(name, { success: '内容已复制' }))
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(LOCALE_ZH_HANT, normalizeMessages(name, { success: '內容已復制' }))
  }
}
export function initI18nScanCodeMsgs() {
  const name = 'uni.scanCode.'
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(
      LOCALE_EN,
      normalizeMessages(name, {
        title: 'Scan code',
        album: 'Album',
        fail: 'Recognition failure',
        'flash.on': 'Tap to turn light on',
        'flash.off': 'Tap to turn light off',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(
      LOCALE_ES,
      normalizeMessages(name, {
        title: 'Código de escaneo',
        album: 'Álbum',
        fail: 'Échec de la reconnaissance',
        'flash.on': 'Toque para encender la luz',
        'flash.off': 'Toque para apagar la luz',
      })
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(
      LOCALE_FR,
      normalizeMessages(name, {
        title: 'Code d’analyse',
        album: 'Album',
        fail: 'Fallo de reconocimiento',
        'flash.on': "Appuyez pour activer l'éclairage",
        'flash.off': "Appuyez pour désactiver l'éclairage",
      })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, {
        title: '扫码',
        album: '相册',
        fail: '识别失败',
        'flash.on': '轻触照亮',
        'flash.off': '轻触关闭',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, {
        title: '掃碼',
        album: '相冊',
        fail: '識別失敗',
        'flash.on': '輕觸照亮',
        'flash.off': '輕觸關閉',
      })
    )
  }
}
export function initI18nStartSoterAuthenticationMsgs() {
  const name = 'uni.startSoterAuthentication.'
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(
      LOCALE_EN,
      normalizeMessages(name, { authContent: 'Fingerprint recognition' })
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(
      LOCALE_ES,
      normalizeMessages(name, {
        authContent: 'Reconocimiento de huellas dactilares',
      })
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(
      LOCALE_FR,
      normalizeMessages(name, {
        authContent: "Reconnaissance de l'empreinte digitale",
      })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, { authContent: '指纹识别中...' })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, { authContent: '指紋識別中...' })
    )
  }
}
export function initI18nPickerMsgs() {
  const name = 'uni.picker.'
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(
      LOCALE_EN,
      normalizeMessages(name, { done: 'Done', cancel: 'Cancel' })
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(
      LOCALE_ES,
      normalizeMessages(name, { done: 'OK', cancel: 'Cancelar' })
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(
      LOCALE_FR,
      normalizeMessages(name, { done: 'OK', cancel: 'Annuler' })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, { done: '完成', cancel: '取消' })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, { done: '完成', cancel: '取消' })
    )
  }
}
export function initI18nVideoMsgs() {
  const name = 'uni.video.'
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(
      LOCALE_EN,
      normalizeMessages(name, { danmu: 'Danmu', volume: 'Volume' })
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(
      LOCALE_ES,
      normalizeMessages(name, { danmu: 'Danmu', volume: 'Volumen' })
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(
      LOCALE_FR,
      normalizeMessages(name, { danmu: 'Danmu', volume: 'Le Volume' })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, { danmu: '弹幕', volume: '音量' })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, { danmu: '彈幕', volume: '音量' })
    )
  }
}
export function initI18nButtonMsgs() {
  const name = 'uni.button.'
  if (__UNI_FEATURE_I18N_EN__) {
    i18n.add(
      LOCALE_EN,
      normalizeMessages(name, {
        'feedback.title': 'feedback',
        'feedback.send': 'send',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    i18n.add(
      LOCALE_ES,
      normalizeMessages(name, {
        'feedback.title': 'realimentación',
        'feedback.send': 'enviar',
      })
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    i18n.add(
      LOCALE_FR,
      normalizeMessages(name, {
        'feedback.title': "retour d'information",
        'feedback.send': 'envoyer',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    i18n.add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, {
        'feedback.title': '问题反馈',
        'feedback.send': '发送',
      })
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    i18n.add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, {
        'feedback.title': '問題反饋',
        'feedback.send': '發送',
      })
    )
  }
}
