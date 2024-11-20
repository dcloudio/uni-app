import { registerSystemRoute } from "@dcloudio/uni-runtime";
import uniChooseLocationPage from "@/uni_modules/uni-chooseLocation/pages/chooseLocation/chooseLocation.vue";
import {
  ChooseLocation,
  ChooseLocationOptions,
  ChooseLocationSuccessImpl,
  ChooseLocationFailImpl
} from "../interface.uts";

export const chooseLocation: ChooseLocation = function (options: ChooseLocationOptions) {
  registerSystemRoute("uni:chooseLocation", uniChooseLocationPage);

  const uuid = Date.now() + '' + Math.floor(Math.random() * 1e7)
  const baseEventName = `uni_choose_location_${uuid}`
  const readyEventName = `${baseEventName}_ready`
  const optionsEventName = `${baseEventName}_options`
  const successEventName = `${baseEventName}_success`
  const failEventName = `${baseEventName}_fail`

  uni.$on(readyEventName, () => {
    uni.$emit(optionsEventName, JSON.parse(JSON.stringify(options)));
  })
  uni.$on(successEventName, (result: UTSJSONObject) => {
    let name = result['name'] as string;
    let address = result['address'] as string;
    let latitude = result.getNumber('latitude') as number;
    let longitude = result.getNumber('longitude') as number;
    options.success?.(new ChooseLocationSuccessImpl(name, address, latitude, longitude))
  })
  uni.$on(failEventName, () => {
    options.fail?.(new ChooseLocationFailImpl())
  })
  uni.openDialogPage({
    url: `uni:chooseLocation?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
    fail(err) {
      options.fail?.(new ChooseLocationFailImpl(`showActionSheet failed, ${err.errMsg}`, 4))
      uni.$off(readyEventName)
      uni.$off(successEventName)
      uni.$off(failEventName)
    }
  })
};
