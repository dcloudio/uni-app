import { common } from '@kit.AbilityKit';
import { image } from '@kit.ImageKit';
import { display } from '@kit.ArkUI';
import { http } from '@kit.NetworkKit';
import { fileIo } from '@kit.CoreFileKit';
import { BitmapDescriptor, BitmapDescriptorFactory } from '@amap/amap_lbs_map3d';

export interface ImageAsset {
  pixelMap: image.PixelMap;
  descriptor: BitmapDescriptor;
  // Public dimensions are logical pixels (vp); the bitmap is in physical pixels.
  width: number;
  height: number;
}

export class AmapImageError extends Error {
  code: number = 500006;

  constructor(message: string) {
    super(message);
    this.name = 'AmapImageError';
  }
}

class ImageJob {
  promise: Promise<ImageAsset>;
  resolve: ((asset: ImageAsset) => void) | null = null;
  reject: ((error: AmapImageError) => void) | null = null;
  request: http.HttpRequest | null = null;
  done: boolean = false;

  constructor() {
    this.promise = new Promise<ImageAsset>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

interface ImageInput {
  source: image.ImageSource;
  file: fileIo.File | null;
}

/** Owns both decoded image memory and SDK descriptors for one map instance. */
export class AmapImageStore {
  private context: common.UIAbilityContext;
  private resolvePath: (src: string) => string;
  private density: number = 1;
  private disposed: boolean = false;
  private assets: Map<string, ImageAsset> = new Map<string, ImageAsset>();
  private jobs: Map<string, ImageJob> = new Map<string, ImageJob>();

  constructor(context: common.UIAbilityContext, resolvePath: (src: string) => string) {
    this.context = context;
    this.resolvePath = resolvePath;
    const density = display.getDefaultDisplaySync().densityPixels;
    if (Number.isFinite(density) && density > 0) this.density = density;
  }

  load(src: string, width?: number, height?: number): Promise<ImageAsset> {
    if (this.disposed) return Promise.reject(new AmapImageError('Map image store is disposed'));
    if (src.length === 0) return Promise.reject(new AmapImageError('Image path is empty'));
    if ((width !== undefined && (!Number.isFinite(width) || width <= 0)) ||
      (height !== undefined && (!Number.isFinite(height) || height <= 0))) {
      return Promise.reject(new AmapImageError('Image dimensions must be positive finite numbers'));
    }
    const key = JSON.stringify([src, width ?? 0, height ?? 0]);
    const cached = this.assets.get(key);
    if (cached !== undefined) return Promise.resolve(cached);
    const existing = this.jobs.get(key);
    if (existing !== undefined) return existing.promise;
    const job = new ImageJob();
    this.jobs.set(key, job);
    this.decode(src, width, height, job).then((asset: ImageAsset) => {
      this.complete(key, job, asset);
    }).catch((error: Error) => {
      this.fail(key, job, new AmapImageError(error.message));
    });
    return job.promise;
  }

  loadArrow(src: string | null = null): Promise<ImageAsset> {
    if (src !== null && src.length > 0) return this.load(src);
    if (this.disposed) return Promise.reject(new AmapImageError('Map image store is disposed'));
    const key = '$amap-default-arrow';
    const cached = this.assets.get(key);
    if (cached !== undefined) return Promise.resolve(cached);
    const existing = this.jobs.get(key);
    if (existing !== undefined) return existing.promise;
    const job = new ImageJob();
    this.jobs.set(key, job);
    this.createArrow().then((asset: ImageAsset) => {
      this.complete(key, job, asset);
    }).catch((error: Error) => {
      this.fail(key, job, new AmapImageError(error.message));
    });
    return job.promise;
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.jobs.forEach((job: ImageJob) => {
      job.done = true;
      try {
        job.request?.destroy();
      } catch (_) {
        // It may already have completed while dispose is running.
      }
      job.request = null;
      job.reject?.(new AmapImageError('Map was destroyed while loading an image'));
      job.resolve = null;
      job.reject = null;
    });
    this.jobs.clear();
    this.assets.forEach((asset: ImageAsset) => this.release(asset));
    this.assets.clear();
  }

  private complete(key: string, job: ImageJob, asset: ImageAsset): void {
    if (job.done || this.disposed) {
      this.release(asset);
      return;
    }
    job.done = true;
    this.jobs.delete(key);
    this.assets.set(key, asset);
    job.resolve?.(asset);
    job.resolve = null;
    job.reject = null;
  }

  private fail(key: string, job: ImageJob, error: AmapImageError): void {
    if (job.done) return;
    job.done = true;
    this.jobs.delete(key);
    job.reject?.(error);
    job.resolve = null;
    job.reject = null;
  }

  private release(asset: ImageAsset): void {
    try {
      asset.descriptor.recycle();
    } catch (_) {
      // Continue releasing the separately owned PixelMap.
    }
    asset.pixelMap.release().catch(() => {});
  }

  private assertActive(job: ImageJob): void {
    if (this.disposed || job.done) throw new AmapImageError('Image load was cancelled');
  }

  private async input(src: string, job: ImageJob): Promise<ImageInput> {
    const resolved = this.resolvePath(src);
    if (/^https?:\/\//i.test(resolved)) {
      const request = http.createHttp();
      job.request = request;
      try {
        const response = await request.request(resolved, {
          method: http.RequestMethod.GET,
          expectDataType: http.HttpDataType.ARRAY_BUFFER,
          connectTimeout: 10000,
          readTimeout: 10000
        });
        this.assertActive(job);
        if (response.responseCode < 200 || response.responseCode >= 300) {
          throw new AmapImageError('Image request failed with HTTP ' + response.responseCode);
        }
        if (!(response.result instanceof ArrayBuffer) || response.result.byteLength === 0) {
          throw new AmapImageError('Image response is empty or invalid');
        }
        return { source: image.createImageSource(response.result), file: null };
      } finally {
        try {
          request.destroy();
        } catch (_) {
          // dispose may already have cancelled this native request.
        }
        job.request = null;
      }
    }
    const rawPrefix = /^(resource:\/\/RAWFILE\/|rawfile:\/\/|rawfile\/)/i;
    if (rawPrefix.test(resolved)) {
      const path = resolved.replace(rawPrefix, '');
      const bytes = await this.context.resourceManager.getRawFileContent(path);
      this.assertActive(job);
      return {
        source: image.createImageSource(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)),
        file: null
      };
    }
    // file:// URIs, including content-granted file URIs, are accepted by fileIo.
    // resolvePath is supplied by UTS so packaged static and temporary paths use
    // the same application-specific resolution as other uni-app x resources.
    const file = await fileIo.open(resolved, fileIo.OpenMode.READ_ONLY);
    try {
      this.assertActive(job);
      return { source: image.createImageSource(file.fd), file: file };
    } catch (error) {
      await fileIo.close(file);
      throw new AmapImageError((error as Error).message);
    }
  }

  private async decode(src: string, width: number | undefined, height: number | undefined,
    job: ImageJob): Promise<ImageAsset> {
    const input = await this.input(src, job);
    let pixelMap: image.PixelMap | null = null;
    try {
      this.assertActive(job);
      const info = await input.source.getImageInfo();
      if (info.size.width <= 0 || info.size.height <= 0) {
        throw new AmapImageError('Image has invalid dimensions');
      }
      let physicalWidth = width === undefined ? info.size.width : Math.max(1, Math.round(width * this.density));
      let physicalHeight = height === undefined ? info.size.height : Math.max(1, Math.round(height * this.density));
      if (width !== undefined && height === undefined) {
        physicalHeight = Math.max(1, Math.round(physicalWidth * info.size.height / info.size.width));
      } else if (height !== undefined && width === undefined) {
        physicalWidth = Math.max(1, Math.round(physicalHeight * info.size.width / info.size.height));
      }
      // ImageKit decodes raster images and SVG; malformed/unsupported content
      // fails through the same 500006 path instead of manufacturing a bitmap.
      pixelMap = await input.source.createPixelMap({
        desiredSize: { width: physicalWidth, height: physicalHeight },
        desiredPixelFormat: image.PixelMapFormat.RGBA_8888
      });
      this.assertActive(job);
      // SDK 11.2.1's async factory releases its input; ArkUI also uses this PixelMap.
      const descriptor = BitmapDescriptorFactory.fromPixelMapSync(pixelMap);
      if (descriptor === undefined) throw new AmapImageError('Unable to create map image descriptor');
      const asset: ImageAsset = {
        pixelMap: pixelMap,
        descriptor: descriptor,
        width: physicalWidth / this.density,
        height: physicalHeight / this.density
      };
      pixelMap = null;
      return asset;
    } finally {
      if (pixelMap !== null) await pixelMap.release().catch(() => {});
      await input.source.release().catch(() => {});
      if (input.file !== null) await fileIo.close(input.file).catch(() => {});
    }
  }

  private async createArrow(): Promise<ImageAsset> {
    const size = Math.max(1, Math.round(64 * this.density));
    const pixels = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const vx = x * 64 / size;
        const vy = y * 64 / size;
        const inShaft = vx >= 10 && vx <= 38 && vy >= 27 && vy <= 37;
        const inHead = vx >= 30 && vx <= 54 && Math.abs(vy - 32) <= (54 - vx);
        if (inShaft || inHead) {
          const offset = (y * size + x) * 4;
          pixels[offset] = 255;
          pixels[offset + 1] = 255;
          pixels[offset + 2] = 255;
          pixels[offset + 3] = 255;
        }
      }
    }
    const pixelMap = await image.createPixelMap(pixels.buffer, {
      size: { width: size, height: size },
      pixelFormat: image.PixelMapFormat.RGBA_8888,
      alphaType: image.AlphaType.PREMUL,
      editable: false
    });
    try {
      const descriptor = BitmapDescriptorFactory.fromPixelMapSync(pixelMap);
      if (descriptor === undefined) throw new AmapImageError('Unable to create arrow descriptor');
      return { pixelMap: pixelMap, descriptor: descriptor, width: 64, height: 64 };
    } catch (error) {
      await pixelMap.release();
      throw new AmapImageError((error as Error).message);
    }
  }
}
