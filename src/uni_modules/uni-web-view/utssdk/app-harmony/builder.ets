import { webview } from '@kit.ArkWeb';
import { deviceInfo, BusinessError } from '@kit.BasicServicesKit';
import { abilityAccessCtrl, common, Permissions } from '@kit.AbilityKit'
import { bundleManager } from '@kit.AbilityKit';
import { createTelSchemeHandler } from './webview'
import { getRealPath, getAbilityContext, UTSHarmony } from '@dcloudio/uni-app-x-runtime'

interface Detail {}

interface Event {
  detail: Detail
}

interface PostMessageToServiceEventDetailArgsDataOptions {
  timestamp: number
}

interface PostMessageToServiceEventDetailArgsData {
  options: PostMessageToServiceEventDetailArgsDataOptions
  name: string,
  arg: ESObject
}

interface PostMessageToServiceEventDetailArgs {
  data: PostMessageToServiceEventDetailArgsData,
  webviewIds: string[]
}

interface PostMessageToServiceEventDetail {
  type: string,
  args: PostMessageToServiceEventDetailArgs
}

export interface PostMessageToServiceEvent extends Event {
  detail: PostMessageToServiceEventDetail
}

interface TitleUpdateEventDetail {
  title?: string
}

export interface TitleUpdateEvent extends Event {
  detail: TitleUpdateEventDetail
}

interface LoadEventDetail {
  src: string
  /**
   * @deprecated
   */
  url: string
}

export interface LoadEvent extends Event {
  detail: LoadEventDetail
}

interface MessageEventDetail {
  data: Array<ESObject>
}

export interface MessageEvent extends Event {
  detail: MessageEventDetail
}

interface LoadingEventDetail {
  src: string
  /**
   * @deprecated
   */
  url: string
}

export interface LoadingEvent extends Event {
  detail: LoadingEventDetail
}

interface DownloadEventDetail {
  /**
   * 下载链接
   */
  url: string
  /**
   * 用户代理
   */
  userAgent: string
  /**
   * 指示回复的内容该以何种形式展示，是以内联的形式（即网页或者页面的一部分），还是以附件的形式下载并保存到本地
   */
  contentDisposition: string
  /**
   * 媒体类型
   */
  mimetype: string
  /**
   * 文件大小
   */
  contentLength: number
}

export interface DownloadEvent extends Event {
  detail: DownloadEventDetail
}

interface ErrorEventDetail {
  errSubject: string
  /**
   * 统一错误码
   * 100001 ssl error
   * 100002 page error
   * 100003 http error
   */
  errCode: 100001 | 100002 | 100003
  /**
   * 统一错误描述信息
   */
  errMsg: string
  /**
   * 加载错误的网页链接，非完整链接，仅包含scheme://authority部分
   */
  url: string
  /**
   * 加载错误的网页链接，完整链接
   */
  fullUrl: string
  /**
   * 加载错误的网页链接，完整链接
   */
  src: string
}

export interface ErrorEvent extends Event {
  detail: ErrorEventDetail
}

const getSslErrorMessage = (event: SslError): string => {
  switch (event) {
    case SslError.Invalid:
      return 'SSL certificate is invalid'
    case SslError.HostMismatch:
      return 'Hostname mismatch'
    case SslError.DateInvalid:
      return 'The certificate date is invalid.'
    case SslError.Untrusted:
      return 'The certificate authority is not trusted.'
    default:
      return 'SSL error'
  }
}

@Component
export struct WebView {
  @Prop webId?: string
  @Prop @Watch('setSrc') src: string
  @Prop bounces: boolean = true
  @Prop @Watch('setBarAccess') horizontalScrollBarAccess?: boolean = true
  @Prop @Watch('setBarAccess') verticalScrollBarAccess?: boolean = true
  @Prop disableUserSelectMenu?: boolean = false
  @Prop attributeUpdater?: object
  delegate!: webview.WebDownloadDelegate
  controller: webview.WebviewController = new webview.WebviewController()
  onAboutToAppear?: (instance: WebView) => void
  onMessage?: (event: MessageEvent) => void = undefined
  onTitleUpdate?: (event: TitleUpdateEvent) => void = undefined
  onPostMessageToService?: (event: PostMessageToServiceEvent) => void = undefined
  onContentHeightChange?: (contentHeight: number) => void = undefined
  onLoad?: (event: LoadEvent) => void = undefined
  onLoading?: (event: LoadingEvent) => void = undefined
  onDownload?: (event: DownloadEvent) => void = undefined
  onError?: (event: ErrorEvent) => void = undefined
  handleAreaChange?: (oldValue: Area, newValue: Area) => void
  handleScroll?: (event: OnScrollEvent) => void
  onControllerAttached?: () => void

  private needSetSrc = false
  private isAttached = false

  build() {
    Web({
      src: this.src ?? '',
      controller: this.controller,
      renderMode: RenderMode.SYNC_RENDER
    })
      .id(this.webId)
      .attributeModifier(this.attributeUpdater)
      .backgroundColor(Color.Transparent)
      .overScrollMode(this.bounces ? OverScrollMode.ALWAYS : OverScrollMode.NEVER)
      .keyboardAvoidMode(WebKeyboardAvoidMode.RESIZE_VISUAL)
      .geolocationAccess(true)
      .domStorageAccess(true)
      .fileAccess(true)
      .metaViewport(true)
      .imageAccess(true)
      .onlineImageAccess(true)
      .mediaPlayGestureAccess(false)
      .darkMode(WebDarkMode.Auto)
      .horizontalScrollBarAccess(this.horizontalScrollBarAccess)
      .verticalScrollBarAccess(this.verticalScrollBarAccess)
      .mixedMode(MixedMode.All)
      .editMenuOptions({
        onCreateMenu: (menuItems: Array<TextMenuItem>): Array<TextMenuItem> => {
          return this.disableUserSelectMenu ? [] : menuItems
        },
        onMenuItemClick(menuItem: TextMenuItem, textRange: TextRange): boolean {
          return false
        }
      } as EditMenuOptions)
      .onPermissionRequest((event) => {
        const request = event.request
        const requestedResources = request.getAccessibleResource()
        const permissions: Permissions[] = []
        const resources: ProtectedResourceType[] = []
        if (requestedResources.includes(ProtectedResourceType.VIDEO_CAPTURE)) {
          permissions.push('ohos.permission.CAMERA')
          resources.push(ProtectedResourceType.VIDEO_CAPTURE)
        }
        if (requestedResources.includes(ProtectedResourceType.AUDIO_CAPTURE)) {
          permissions.push('ohos.permission.MICROPHONE')
          resources.push(ProtectedResourceType.AUDIO_CAPTURE)
        }
        if (permissions.length > 0) {
          const context = getContext(this) as common.UIAbilityContext;
          const atManager = abilityAccessCtrl.createAtManager();
          atManager.requestPermissionsFromUser(context, permissions).then((data) => {
            const granted: ProtectedResourceType[] =
              resources.filter((resource, index) => data.authResults[index] === 0)
            if (granted.length === 0) {
              request.deny()
              return
            }
            request.grant(granted)
          }).catch((error: BusinessError) => {
            console.error(`Failed to request permissions from user. Code is ${error.code}, message is ${error.message}`);
            request.deny()
          })
        }
      })
      .onControllerAttached(() => {
        this.isAttached = true
        if (this.needSetSrc) {
          this.needSetSrc = false
          this.setSrc()
        }

        try {
          this.controller.setDownloadDelegate(this.delegate)
          const userAgent = `${this.controller.getUserAgent()} ${UTSHarmony.getUserAgent()}`
          this.controller.setCustomUserAgent(userAgent)
          // TODO 调用 setCustomUserAgent 后必须重新 loadUrl，否则 controller 上方法会失效
          this.controller.loadUrl(getRealPath(this.src))
          this.controller.setWebSchemeHandler('tel', createTelSchemeHandler())
        } catch (error) {
          // TODO: Implement error handling.
        }
        this.onControllerAttached?.()
      })
      .onLoadIntercept((event) => {
        const context = this.getUIContext().getHostContext()
        let url = event.data.getRequestUrl()
        if (context) {
          let internalHtmlDirs = [
            context.filesDir,
            context.getApplicationContext().filesDir,
            context.resourceDir,
            context.getApplicationContext().resourceDir
          ].filter(item => !!item).map(item => item + '/uni-app-x/apps')
          try {
            if (deviceInfo.sdkApiVersion < 21) {
              if (
                url.startsWith('file:/') &&
                  (url.includes(context.tempDir) || url.includes(context.getApplicationContext().tempDir) ||
                  url.includes(context.cacheDir) || url.includes(context.getApplicationContext().cacheDir))
              ) {
                internalHtmlDirs = []
              }
              this.controller?.setPathAllowingUniversalAccess(internalHtmlDirs)
            } else {
              internalHtmlDirs.push(
                context.cacheDir,
                context.getApplicationContext().cacheDir,
                context.tempDir,
                context.getApplicationContext().tempDir
              )
              this.controller?.setPathAllowingUniversalAccess(internalHtmlDirs)
            }
          } catch (error) {
            console.error('[runtime-harmony] Webview setPathAllowingUniversalAccess error: ' + error)
          }
        }
        // 兼容 mailto:// 等协议
        if (!(/https{0,1}:\/\//.test(url) || url.startsWith('file:/')) && /\w+:/.test(url)) {
          const scheme = (url.match(/(\w+:)\w/) ?? [])[1]
          if (scheme) {
            url = url.replace(scheme, scheme + '//')
          }
          try {
            let canOpen = bundleManager.canOpenLink(url);
            if (canOpen) {
              getAbilityContext()?.openLink(url)
              return true
            } else {
              // console.error('Webview failed to open link: ' + url)
            }
          } catch (e) {
            // console.error('Webview failed to open link: ' + url + '. ' + e)
          }
        }
        return false
      })
      .onTitleReceive(event => {
        this.onTitleUpdate?.({
          detail: {
            title: event?.title
          }
        })
      })
      .onConsole(event => {
        if (event) {
          console.log('getMessage: ' + JSON.stringify(event.message.getMessage()))
        }
        return false
      })
      .onAlert((event) => {
        if (event) {
          AlertDialog.show({
            message: event.message,
            autoCancel: false,
            alignment: DialogAlignment.Center,
            confirm: {
              value: 'OK',
              action: () => {
                event.result.handleConfirm()
              }
            }
          })
        }
        return true;
      })
      .onErrorReceive(event => {
        const errorInfo = event.error.getErrorInfo()
        this.onError?.({
          detail: {
            errSubject: 'uni-web-view',
            errCode: 100002,
            errMsg: errorInfo,
            url: event.request.getRequestUrl(),
            fullUrl: this.controller.getUrl(),
            src: this.src
          }
        })
      })
      .onHttpErrorReceive((event) => {
        this.onError?.({
          detail: {
            errSubject: 'uni-web-view',
            errCode: 100003,
            errMsg: 'http error',
            url: event.request.getRequestUrl(),
            fullUrl: this.controller.getUrl(),
            src: this.src
          }
        })
      })
      .onSslErrorEventReceive((event) => {
        event.handler.handleConfirm()
        this.onError?.({
          detail: {
            errSubject: 'uni-web-view',
            errCode: 100001,
            errMsg: getSslErrorMessage(event.error),
            url: this.controller.getOriginalUrl(),
            fullUrl: this.controller.getUrl(),
            src: this.src
          }
        })
      })
      .javaScriptProxy({
        object: {
          postMessage: (data: string) => {
            this.onMessage?.({ detail: { data: [(typeof data === 'string' ? JSON.parse(data) : data).data ?? ''] } })
          },
          postMessageToService: (data: string) => {
            this.onPostMessageToService?.({ detail: typeof data === 'string' ? JSON.parse(data) : data })
          },
          onContentHeightChange: (contentHeight: number) => {
            this.onContentHeightChange?.(contentHeight)
          }
        },
        name: '__uniapp_x_',
        methodList: ['postMessage', 'postMessageToService', 'onContentHeightChange'],
        controller: this.controller
      })
      .onGeolocationShow((event) => {
        const context = getContext(this) as common.UIAbilityContext;
        const atManager = abilityAccessCtrl.createAtManager();
        atManager.requestPermissionsFromUser(context,
          ["ohos.permission.APPROXIMATELY_LOCATION", "ohos.permission.LOCATION"]).then((data) => {
          if (data.authResults.some(item => item === 0)) {
            event.geolocation.invoke(event.origin, true, true);
          } else {
            event.geolocation.invoke(event.origin, false, false);
          }
        }).catch((error: BusinessError) => {
          console.error(`Failed to request permissions from user. Code is ${error.code}, message is ${error.message}`);
          event.geolocation.invoke(event.origin, false, false);
        })
      })
      .onPageEnd((event) => {
        const url = event.url
        this.onLoad?.({
          detail: {
            src: url,
            url: url
          }
        })
      })
      .onPageBegin((event) => {
        this.onLoading?.({
          detail: {
            src: event.url,
            url: event.url
          }
        })
      })
      .onDownloadStart((event) => {
        this.onDownload?.({
          detail: {
            url: event.url,
            userAgent: event.userAgent,
            contentDisposition: event.contentDisposition,
            mimetype: event.mimetype,
            contentLength: event.contentLength
          }
        })
      })
      .onAreaChange(this.handleAreaChange)
      .onScroll((e) => {
        this.handleScroll?.(e)
      })
      .javaScriptOnDocumentEnd([
        {
          script: `(() => {
    try {
        let __uniapp_lastHeight = null
        function triggerOnContentHeightChange(newHeight) {
          if (__uniapp_lastHeight == null) {
            __uniapp_lastHeight = newHeight
            window.__uniapp_x_.onContentHeightChange(newHeight);
          } else if (newHeight !== __uniapp_lastHeight) {
            __uniapp_lastHeight = newHeight
            window.__uniapp_x_.onContentHeightChange(newHeight);
          }
        }

        // 创建一个 ResizeObserver 实例
        const resizeObserver = new ResizeObserver(entries => {
          for (let entry of entries) {
            // 检查 body 元素的尺寸是否发生变化
            if (entry.target === document.body) {
              const bodyHeight = document.body.scrollHeight;
              triggerOnContentHeightChange(bodyHeight)
            }
          }
        });

        // 将 ResizeObserver 实例绑定到 body 元素上
        resizeObserver.observe(document.body);
    } catch (err) {
        console.log(err);
    }
})()`,
          scriptRules: ["*"]
        }
      ])
  }

  aboutToAppear(): void {
    this.onAboutToAppear?.(this)
  }

  aboutToDisappear(): void {
    try {
      this.controller.deleteJavaScriptRegister('__uniapp_x_')
    } catch (e) {
    }
  }

  setSrc() {
    if (!this.src) {
      return
    }
    if (!this.isAttached) {
      this.needSetSrc = true
      return
    }
    this.controller.loadUrl(getRealPath(this.src))
  }

  setBarAccess() {
    if (this.isAttached) {
      this.controller.refresh()
    }
  }
}

@Builder
export function buildWeb(params: ESObject) {
  Flex() {
    WebView({
      webId: params.id,
      src: params.src,
      bounces: params.bounces,
      horizontalScrollBarAccess: params.horizontalScrollBarAccess,
      verticalScrollBarAccess: params.verticalScrollBarAccess,
      disableUserSelectMenu: params.disableUserSelectMenu,
      attributeUpdater: params.attributeUpdater,
      delegate: params.delegate,
      controller: params.controller,
      onAboutToAppear: params.onAboutToAppear,
      onMessage: params.onMessage,
      onTitleUpdate: params.onTitleUpdate,
      onPostMessageToService: params.onPostMessageToService,
      onContentHeightChange: params.onContentHeightChange,
      onLoad: params.onLoad,
      onLoading: params.onLoading,
      onDownload: params.onDownload,
      onError: params.onError,
      handleAreaChange: params.handleAreaChange,
      handleScroll: params.handleScroll,
      onControllerAttached: params.onControllerAttached,
    })
  }.width('100%').height('100%')
}
