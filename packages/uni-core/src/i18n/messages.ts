// This file is created by scripts/i18n.js
// Do not modify this file!!!!!!!!!
import { once } from '@dcloudio/uni-shared'
import {
  LOCALE_EN,
  LOCALE_ES,
  LOCALE_FR,
  LOCALE_ZH_HANS,
  LOCALE_ZH_HANT,
} from '@dcloudio/uni-i18n'
import { useI18n } from './useI18n'

function normalizeMessages(module: string, keys: string[], values: string[]) {
  return keys.reduce<Record<string, string>>((res, name, index) => {
    res[module + name] = values[index]
    return res
  }, {})
}
export const initI18nAppMsgsOnce = /*#__PURE__*/ once(() => {
  const name = 'uni.app.'
  const keys = ['quit']
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, ['Press back button again to exit']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, ['Pulse otra vez para salir']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, [
        "Appuyez à nouveau pour quitter l'application",
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ['再按一次退出应用']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ['再按一次退出應用']),
      false
    )
  }
})
export const initI18nAsyncMsgsOnce = /*#__PURE__*/ once(() => {
  const name = 'uni.async.'
  const keys = ['error']
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, [
        'The connection timed out, click the screen to try again.',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, [
        'Se agotó el tiempo de conexión, haga clic en la pantalla para volver a intentarlo.',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, [
        "La connexion a expiré, cliquez sur l'écran pour réessayer.",
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ['连接服务器超时，点击屏幕重试']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ['連接服務器超時，點擊屏幕重試']),
      false
    )
  }
})
export const initI18nShowActionSheetMsgsOnce = /*#__PURE__*/ once(() => {
  const name = 'uni.showActionSheet.'
  const keys = ['cancel']
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(LOCALE_EN, normalizeMessages(name, keys, ['Cancel']), false)
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(LOCALE_ES, normalizeMessages(name, keys, ['Cancelar']), false)
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(LOCALE_FR, normalizeMessages(name, keys, ['Annuler']), false)
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ['取消']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ['取消']),
      false
    )
  }
})
export const initI18nShowToastMsgsOnce = /*#__PURE__*/ once(() => {
  const name = 'uni.showToast.'
  const keys = ['unpaired']
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, [
        'Please note showToast must be paired with hideToast',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, [
        'Tenga en cuenta que showToast debe estar emparejado con hideToast',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, [
        'Veuillez noter que showToast doit être associé à hideToast',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, [
        '请注意 showToast 与 hideToast 必须配对使用',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, [
        '請注意 showToast 與 hideToast 必須配對使用',
      ]),
      false
    )
  }
})
export const initI18nShowLoadingMsgsOnce = /*#__PURE__*/ once(() => {
  const name = 'uni.showLoading.'
  const keys = ['unpaired']
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, [
        'Please note showLoading must be paired with hideLoading',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, [
        'Tenga en cuenta que showLoading debe estar emparejado con hideLoading',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, [
        'Veuillez noter que showLoading doit être associé à hideLoading',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, [
        '请注意 showLoading 与 hideLoading 必须配对使用',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, [
        '請注意 showLoading 與 hideLoading 必須配對使用',
      ]),
      false
    )
  }
})
export const initI18nShowModalMsgsOnce = /*#__PURE__*/ once(() => {
  const name = 'uni.showModal.'
  const keys = ['cancel', 'confirm']
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, ['Cancel', 'OK']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, ['Cancelar', 'OK']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, ['Annuler', 'OK']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ['取消', '确定']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ['取消', '確定']),
      false
    )
  }
})
export const initI18nChooseImageMsgsOnce = /*#__PURE__*/ once(() => {
  const name = 'uni.chooseImage.'
  const keys = ['cancel', 'sourceType.album', 'sourceType.camera']
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, ['Cancel', 'Album', 'Camera']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, ['Cancelar', 'Álbum', 'Cámara']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, ['Annuler', 'Album', 'Caméra']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ['取消', '从相册选择', '拍摄']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ['取消', '從相冊選擇', '拍攝']),
      false
    )
  }
})
export const initI18nChooseVideoMsgsOnce = /*#__PURE__*/ once(() => {
  const name = 'uni.chooseVideo.'
  const keys = ['cancel', 'sourceType.album', 'sourceType.camera']
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, ['Cancel', 'Album', 'Camera']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, ['Cancelar', 'Álbum', 'Cámara']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, ['Annuler', 'Album', 'Caméra']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ['取消', '从相册选择', '拍摄']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ['取消', '從相冊選擇', '拍攝']),
      false
    )
  }
})
export const initI18nChooseFileMsgsOnce = /*#__PURE__*/ once(() => {
  const name = 'uni.chooseFile.'
  const keys = ['notUserActivation']
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, [
        'File chooser dialog can only be shown with a user activation',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, [
        'El cuadro de diálogo del selector de archivos solo se puede mostrar con la activación del usuario',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, [
        "La boîte de dialogue du sélecteur de fichier ne peut être affichée qu'avec une activation par l'utilisateur",
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ['文件选择器对话框只能在由用户激活时显示']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ['文件選擇器對話框只能在由用戶激活時顯示']),
      false
    )
  }
})
export const initI18nPreviewImageMsgsOnce = /*#__PURE__*/ once(() => {
  const name = 'uni.previewImage.'
  const keys = ['cancel', 'button.save', 'save.success', 'save.fail']
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, [
        'Cancel',
        'Save Image',
        'Saved successfully',
        'Save failed',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, [
        'Cancelar',
        'Guardar imagen',
        'Guardado exitosamente',
        'Error al guardar',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, [
        'Annuler',
        'Guardar imagen',
        'Enregistré avec succès',
        'Échec de la sauvegarde',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, [
        '取消',
        '保存图像',
        '保存图像到相册成功',
        '保存图像到相册失败',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, [
        '取消',
        '保存圖像',
        '保存圖像到相冊成功',
        '保存圖像到相冊失敗',
      ]),
      false
    )
  }
})
export const initI18nSetClipboardDataMsgsOnce = /*#__PURE__*/ once(() => {
  const name = 'uni.setClipboardData.'
  const keys = ['success', 'fail']
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, [
        'Content copied',
        'Copy failed, please copy manually',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, [
        'Contenido copiado',
        'Error al copiar, copie manualmente',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, [
        'Contenu copié',
        'Échec de la copie, copiez manuellement',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ['内容已复制', '复制失败，请手动复制']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ['內容已復制', '復制失敗，請手動復製']),
      false
    )
  }
})
export const initI18nGetClipboardDataMsgsOnce = /*#__PURE__*/ once(() => {
  const name = 'uni.getClipboardData.'
  const keys = ['fail']
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, ['Reading failed, please paste manually']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, ['Error de lectura, pegue manualmente']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, [
        'Échec de la lecture, veuillez coller manuellement',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ['读取失败，请手动粘贴']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ['讀取失敗，請手動粘貼']),
      false
    )
  }
})
export const initI18nScanCodeMsgsOnce = /*#__PURE__*/ once(() => {
  const name = 'uni.scanCode.'
  const keys = ['title', 'album', 'fail', 'flash.on', 'flash.off']
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, [
        'Scan code',
        'Album',
        'Recognition failure',
        'Tap to turn light on',
        'Tap to turn light off',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, [
        'Código de escaneo',
        'Álbum',
        'Échec de la reconnaissance',
        'Toque para encender la luz',
        'Toque para apagar la luz',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, [
        'Code d’analyse',
        'Album',
        'Fallo de reconocimiento',
        "Appuyez pour activer l'éclairage",
        "Appuyez pour désactiver l'éclairage",
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, [
        '扫码',
        '相册',
        '识别失败',
        '轻触照亮',
        '轻触关闭',
      ]),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, [
        '掃碼',
        '相冊',
        '識別失敗',
        '輕觸照亮',
        '輕觸關閉',
      ]),
      false
    )
  }
})
export const initI18nStartSoterAuthenticationMsgsOnce = /*#__PURE__*/ once(
  () => {
    const name = 'uni.startSoterAuthentication.'
    const keys = ['authContent', 'waitingContent']
    if (__UNI_FEATURE_I18N_EN__) {
      useI18n().add(
        LOCALE_EN,
        normalizeMessages(name, keys, [
          'Fingerprint recognition',
          'Unrecognizable',
        ]),
        false
      )
    }
    if (__UNI_FEATURE_I18N_ES__) {
      useI18n().add(
        LOCALE_ES,
        normalizeMessages(name, keys, [
          'Reconocimiento de huellas dactilares',
          'Irreconocible',
        ]),
        false
      )
    }
    if (__UNI_FEATURE_I18N_FR__) {
      useI18n().add(
        LOCALE_FR,
        normalizeMessages(name, keys, [
          "Reconnaissance de l'empreinte digitale",
          'Méconnaissable',
        ]),
        false
      )
    }
    if (__UNI_FEATURE_I18N_ZH_HANS__) {
      useI18n().add(
        LOCALE_ZH_HANS,
        normalizeMessages(name, keys, ['指纹识别中...', '无法识别']),
        false
      )
    }
    if (__UNI_FEATURE_I18N_ZH_HANT__) {
      useI18n().add(
        LOCALE_ZH_HANT,
        normalizeMessages(name, keys, ['指紋識別中...', '無法識別']),
        false
      )
    }
  }
)
export const initI18nPickerMsgsOnce = /*#__PURE__*/ once(() => {
  const name = 'uni.picker.'
  const keys = ['done', 'cancel']
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, ['Done', 'Cancel']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, ['OK', 'Cancelar']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, ['OK', 'Annuler']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ['完成', '取消']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ['完成', '取消']),
      false
    )
  }
})
export const initI18nVideoMsgsOnce = /*#__PURE__*/ once(() => {
  const name = 'uni.video.'
  const keys = ['danmu', 'volume']
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, ['Danmu', 'Volume']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, ['Danmu', 'Volumen']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, ['Danmu', 'Le Volume']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ['弹幕', '音量']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ['彈幕', '音量']),
      false
    )
  }
})
export const initI18nButtonMsgsOnce = /*#__PURE__*/ once(() => {
  const name = 'uni.button.'
  const keys = ['feedback.title', 'feedback.send']
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, ['feedback', 'send']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, ['realimentación', 'enviar']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, ["retour d'information", 'envoyer']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ['问题反馈', '发送']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ['問題反饋', '發送']),
      false
    )
  }
})
export const initI18nChooseLocationMsgsOnce = /*#__PURE__*/ once(() => {
  const name = 'uni.chooseLocation.'
  const keys = ['search', 'cancel']
  if (__UNI_FEATURE_I18N_EN__) {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, ['Find Place', 'Cancel']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ES__) {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, ['Encontrar', 'Cancelar']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_FR__) {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, ['Trouve', 'Annuler']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANS__) {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ['搜索地点', '取消']),
      false
    )
  }
  if (__UNI_FEATURE_I18N_ZH_HANT__) {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ['搜索地點', '取消']),
      false
    )
  }
})
