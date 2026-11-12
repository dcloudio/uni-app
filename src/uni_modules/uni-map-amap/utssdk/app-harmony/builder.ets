import { MapViewComponent } from '@amap/amap_lbs_map3d';
import { HarmonyAmapController } from './controller';
import { AmapViewState, TextOverlay, ControlOverlay, AccessibleMarker } from './native-types';

export interface AmapBuildParams { controller: HarmonyAmapController; onAttached?: () => void }

@Component
struct AmapNativeView {
  controller: HarmonyAmapController | undefined = undefined;
  onAttached?: () => void;
  @State private snapshot: AmapViewState = new AmapViewState();
  private observer: (state: AmapViewState) => void = (state: AmapViewState): void => { this.snapshot = state; };

  aboutToAppear(): void {
    this.onAttached?.();
    this.controller?.setUIContext(this.getUIContext());
    this.controller?.subscribe(this.observer);
  }
  aboutToDisappear(): void { this.controller?.unsubscribe(this.observer); }

  private alignment(value: string): TextAlign {
    if (value === 'left') return TextAlign.Start;
    if (value === 'right') return TextAlign.End;
    return TextAlign.Center;
  }

  @Builder
  textOverlay(index: number) {
    // Read the @State snapshot in each expression. Capturing a plain item in a
    // stable-key ForEach closure would retain obsolete positions and content.
    if (index < this.snapshot.overlays.length) {
      Text(this.snapshot.overlays[index].content)
      .fontColor(this.snapshot.overlays[index].color)
      .fontSize(this.snapshot.overlays[index].fontSize)
      .textAlign(this.alignment(this.snapshot.overlays[index].textAlign))
      .backgroundColor(this.snapshot.overlays[index].bgColor)
      .border({ width: this.snapshot.overlays[index].borderWidth, color: this.snapshot.overlays[index].borderColor, radius: this.snapshot.overlays[index].borderRadius })
      .padding(this.snapshot.overlays[index].padding)
      .constraintSize({ maxWidth: '90%' })
      .position({ x: this.snapshot.overlays[index].x, y: this.snapshot.overlays[index].y })
      .translate({ x: this.snapshot.overlays[index].callout ? '-50%' : 0, y: this.snapshot.overlays[index].callout ? '-100%' : 0 })
      .zIndex(this.snapshot.overlays[index].callout ? 30 : 20)
      .hitTestBehavior(this.snapshot.overlays[index].callout ? HitTestMode.Default : HitTestMode.None)
      .onClick(() => {
        const item = this.snapshot.overlays[index];
        if (item != null && item.callout) this.controller?.clickCallout(item.markerId);
      })
    }
  }

  build() {
    Stack({ alignContent: Alignment.TopStart }) {
      if (this.snapshot.mountMap) {
        // A new authorization generation must get a fresh native component even
        // when revoke + grant are coalesced into the same ArkUI update turn.
        ForEach([this.snapshot.mapName], (mapName: string) => {
          MapViewComponent({ mapViewName: mapName, type: 'native' })
            .width('100%').height('100%').zIndex(0)
        }, (mapKey: string): string => mapKey)
        ForEach(this.snapshot.accessibleMarkers, (accessibleItem: AccessibleMarker, accessibleIndex: number) => {
          if (accessibleIndex < this.snapshot.accessibleMarkers.length) {
            Button('')
            .width(this.snapshot.accessibleMarkers[accessibleIndex].width).height(this.snapshot.accessibleMarkers[accessibleIndex].height)
            .position({ x: this.snapshot.accessibleMarkers[accessibleIndex].x, y: this.snapshot.accessibleMarkers[accessibleIndex].y })
            .backgroundColor(Color.Transparent)
            .borderRadius(0)
            .accessibilityText(this.snapshot.accessibleMarkers[accessibleIndex].text)
            .accessibilityLevel('yes')
            .zIndex(10)
            .onClick(() => {
              const currentMarker = this.snapshot.accessibleMarkers[accessibleIndex];
              if (currentMarker != null) this.controller?.clickMarker(currentMarker.id);
            })
          }
        }, (accessibleKeyItem: AccessibleMarker, accessibleKeyIndex: number): string => accessibleKeyItem.key + '_' + accessibleKeyIndex.toString())
        if (this.snapshot.locationVisible) {
          Button('')
            .width(28).height(28)
            .position({ x: this.snapshot.locationX - 14, y: this.snapshot.locationY - 14 })
            .backgroundColor(Color.Transparent)
            .accessibilityText('当前位置')
            .zIndex(15)
            .onClick(() => { this.controller?.clickLocation(); })
        }
        ForEach(this.snapshot.overlays, (textItem: TextOverlay, textIndex: number) => {
          this.textOverlay(textIndex)
        }, (textKeyItem: TextOverlay, textKeyIndex: number): string => textKeyItem.key + '_' + textKeyIndex.toString())
        ForEach(this.snapshot.controls, (controlItem: ControlOverlay, controlIndex: number) => {
          if (controlIndex < this.snapshot.controls.length) {
            Image(this.snapshot.controls[controlIndex].image)
            .width(this.snapshot.controls[controlIndex].width).height(this.snapshot.controls[controlIndex].height)
            .position({ x: this.snapshot.controls[controlIndex].x, y: this.snapshot.controls[controlIndex].y })
            .objectFit(ImageFit.Fill)
            .zIndex(40)
            .hitTestBehavior(this.snapshot.controls[controlIndex].clickable ? HitTestMode.Default : HitTestMode.None)
            .onClick(() => {
              const currentControl = this.snapshot.controls[controlIndex];
              if (currentControl != null && currentControl.clickable) this.controller?.clickControl(currentControl.id);
            })
          }
        }, (controlKeyItem: ControlOverlay, controlKeyIndex: number): string => controlKeyItem.key + '_' + controlKeyIndex.toString())
      }
    }
    .width('100%').height('100%').clip(true)
    .onAreaChange((_previous: Area, current: Area) => {
      this.onAttached?.();
      this.controller?.setLayout(parseFloat(current.width.toString()), parseFloat(current.height.toString()),
        parseFloat((current.globalPosition.x ?? 0).toString()), parseFloat((current.globalPosition.y ?? 0).toString()));
    })
  }
}

@Builder
export function buildAmap(params: AmapBuildParams) {
  AmapNativeView({ controller: params.controller, onAttached: params.onAttached })
}
