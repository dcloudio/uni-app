import { abilityAccessCtrl, ApplicationStateChangeCallback, bundleManager, common, Permissions } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import { geoLocationManager } from '@kit.LocationKit';
import { UTSHarmony } from '@dcloudio/uni-app-x-vapor-runtime';
import { AMapPrivacyAgreeStatus, AMapPrivacyInfoStatus, AMapPrivacyShowStatus } from '@amap/amap_lbs_common';
import { AMapLocationManagerImpl } from '@amap/amap_lbs_location';

const APPROXIMATE: Permissions = 'ohos.permission.APPROXIMATELY_LOCATION';
const PRECISE: Permissions = 'ohos.permission.LOCATION';
const BACKGROUND: Permissions = 'ohos.permission.LOCATION_IN_BACKGROUND';
const KEEP_RUNNING: Permissions = 'ohos.permission.KEEP_BACKGROUND_RUNNING';

export class AmapLocationFailure extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.name = 'AmapLocationFailure';
    this.code = code;
  }
}

export class AmapLocationEnvironment {
  private context: common.UIAbilityContext;
  private access = abilityAccessCtrl.createAtManager();
  private permissionPrompt: Promise<void> | null = null;
  private promptRequestsPrecise: boolean = false;
  private generation: number = 0;
  private sdkInitialized: boolean = false;

  constructor(context: common.UIAbilityContext) {
    this.context = context;
  }

  isForeground(): boolean {
    try {
      return UTSHarmony.getCurrentWindow().isWindowShowing();
    } catch (_) {
      return false;
    }
  }

  observeVisibility(callback: (visible: boolean) => void): () => void {
    const app = this.context.getApplicationContext();
    const mainWindow = UTSHarmony.getCurrentWindow();
    // The driver subscribes while starting a foreground request. Report an intervening hide,
    // but do not signal a second start when the initial window is still visible.
    let visible = true;
    let appForeground = true;
    let disposed = false;
    let timer: number = -1;
    const cancelCheck = (): void => { clearTimeout(timer); timer = -1; };
    const publish = (next: boolean): void => {
      if (disposed || visible === next) return;
      visible = next;
      callback(next);
    };
    // onApplicationForeground can run before the main window actually shows. Recheck
    // briefly in case its SHOWN event also precedes isWindowShowing() becoming true.
    const checkShown = (remaining: number): void => {
      cancelCheck();
      if (disposed || !appForeground) return;
      if (this.isForeground()) {
        publish(true);
      } else if (remaining > 0) {
        timer = setTimeout((): void => checkShown(remaining - 1), 32);
      }
    };
    const hidden = (): void => { cancelCheck(); publish(false); };
    const onWindowEvent = (event: window.WindowEventType): void => {
      if (event === window.WindowEventType.WINDOW_SHOWN) checkShown(60);
      else if (event === window.WindowEventType.WINDOW_HIDDEN || event === window.WindowEventType.WINDOW_DESTROYED) hidden();
    };
    const listener: ApplicationStateChangeCallback = {
      onApplicationForeground: (): void => { appForeground = true; checkShown(60); },
      onApplicationBackground: (): void => { appForeground = false; hidden(); }
    };
    mainWindow.on('windowEvent', onWindowEvent);
    try {
      app.on('applicationStateChange', listener);
    } catch (error) {
      mainWindow.off('windowEvent', onWindowEvent);
      throw error as Error;
    }
    if (!this.isForeground()) { publish(false); checkShown(60); }
    return (): void => {
      if (disposed) return;
      disposed = true;
      cancelCheck();
      try { mainWindow.off('windowEvent', onWindowEvent); }
      finally { app.off('applicationStateChange', listener); }
    };
  }

  async prepare(highAccuracy: boolean, background: boolean, allowPrompt: boolean): Promise<void> {
    const generation = this.generation;
    this.requireForeground();
    const key = this.readConfiguration(background);
    this.requireLocationEnabled();
    await this.ensureForegroundPermission(highAccuracy, allowPrompt, generation);
    // The system dialog can outlive the request, a privacy reset or a switch to another app.
    this.requireCurrentRequest(generation);
    this.requireForeground();
    this.requireLocationEnabled();
    if (background && !this.hasPermission(BACKGROUND)) {
      throw new AmapLocationFailure(1505004, '请在系统设置中将此应用的位置权限改为“始终允许”，然后重新启动后台定位');
    }
    if (!this.sdkInitialized) {
      try {
        AMapLocationManagerImpl.setApiKey(key);
      } catch (_) {
        throw new AmapLocationFailure(1505605, '无法设置鸿蒙高德定位 Key');
      }
      AMapLocationManagerImpl.updatePrivacyShow(AMapPrivacyShowStatus.DidShow, AMapPrivacyInfoStatus.DidContain, this.context);
      AMapLocationManagerImpl.updatePrivacyAgree(AMapPrivacyAgreeStatus.DidAgree, this.context);
      this.sdkInitialized = true;
    }
  }

  revokePrivacy(): void {
    this.generation++;
    if (this.sdkInitialized) {
      this.sdkInitialized = false;
      AMapLocationManagerImpl.updatePrivacyAgree(AMapPrivacyAgreeStatus.NotAgree, this.context);
    }
  }

  private requireCurrentRequest(generation: number): void {
    if (generation !== this.generation) {
      throw new AmapLocationFailure(1505004, '授权状态已重置，本次定位已取消');
    }
  }

  private requireForeground(): void {
    if (!this.isForeground()) {
      throw new AmapLocationFailure(1505602, '请回到应用前台后发起定位');
    }
  }

  private requireLocationEnabled(): void {
    if (!geoLocationManager.isLocationEnabled()) {
      throw new AmapLocationFailure(1505003, '系统定位服务已关闭');
    }
  }

  private readConfiguration(background: boolean): string {
    let flags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_HAP_MODULE |
      bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_METADATA;
    if (background) flags |= bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_REQUESTED_PERMISSION;
    const info = bundleManager.getBundleInfoForSelfSync(flags);
    const entry = info.hapModulesInfo.find((module) => module.type === bundleManager.ModuleType.ENTRY);
    const key = entry?.metadata.find((item) => item.name === 'AMAP_API_KEY')?.value?.trim() ?? '';
    if (key.length === 0 || /\s/.test(key) ||
      /^your[_ -]/i.test(key) || key.startsWith('<') || key.startsWith('${')) {
      throw new AmapLocationFailure(1505605, '请在宿主 entry 模块的 metadata 中填写 AMAP_API_KEY');
    }
    if (background) {
      const declared = info.reqPermissionDetails;
      if (!declared.some((item) => item.name === KEEP_RUNNING) ||
        !declared.some((item) => item.name === BACKGROUND) || !this.hasPermission(KEEP_RUNNING)) {
        throw new AmapLocationFailure(1505602, '后台定位需要在宿主应用中声明 KEEP_BACKGROUND_RUNNING 和 LOCATION_IN_BACKGROUND');
      }
    }
    return key;
  }

  private hasPermission(permission: Permissions): boolean {
    return this.access.checkAccessTokenSync(this.context.applicationInfo.accessTokenId, permission) ===
      abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED;
  }

  private async ensureForegroundPermission(highAccuracy: boolean, allowPrompt: boolean, generation: number): Promise<void> {
    if (this.hasPermission(APPROXIMATE) && (!highAccuracy || this.hasPermission(PRECISE))) return;
    if (allowPrompt) {
      // A precise request arriving during an approximate-only prompt can upgrade after it completes.
      if (this.permissionPrompt !== null) {
        const includesPrecise = this.promptRequestsPrecise;
        await this.permissionPrompt;
        this.requireCurrentRequest(generation);
        if (highAccuracy && !includesPrecise && this.hasPermission(APPROXIMATE) && !this.hasPermission(PRECISE)) {
          this.requireForeground();
          await this.requestPermission(true);
        }
      } else {
        await this.requestPermission(highAccuracy);
      }
    }
    this.requireCurrentRequest(generation);
    if (!this.hasPermission(APPROXIMATE)) {
      throw new AmapLocationFailure(1505004, '应用没有定位权限');
    }
    if (highAccuracy && !this.hasPermission(PRECISE)) {
      throw new AmapLocationFailure(1505800, '请在系统设置中为此应用开启精确位置');
    }
  }

  private requestPermission(precise: boolean): Promise<void> {
    if (this.permissionPrompt !== null) return this.permissionPrompt;
    const permissions: Permissions[] = precise ? [APPROXIMATE, PRECISE] : [APPROXIMATE];
    this.promptRequestsPrecise = precise;
    const prompt = this.access.requestPermissionsFromUser(this.context, permissions).then((): void => {
      // Always read the current token grants after the dialog (including approximate-only consent).
    }).catch((): void => {
      throw new AmapLocationFailure(1505004, '无法申请定位权限，请检查宿主权限声明和系统设置');
    }).finally((): void => {
      this.permissionPrompt = null;
    });
    this.permissionPrompt = prompt;
    return prompt;
  }
}
