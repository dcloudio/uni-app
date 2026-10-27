import TimePicker from "android.widget.TimePicker"

export class NativeTimePicker {
	$element : UniNativeViewElement;

	constructor(element : UniNativeViewElement, hour: number, minute: number) {
		this.$element = element;
		this.bindView(hour, minute);
	}

	picker : TimePicker | null = null;
	bindView(hour: number, minute: number) {
		this.picker = new TimePicker(this.$element.getAndroidActivity()!);  //构建原生view
		this.$element.bindAndroidView(this.picker!);
		this.setHour(hour)
		this.setMinute(minute)
		this.picker?.setOnTimeChangedListener((_, hourOfDay, minute) => {
			const detail = {"hour": hourOfDay, "minute": minute}
			const event = new UniNativeViewEvent("timechanged", detail)
			this.$element.dispatchEvent(event)
		})
	}

	setHour(hour: number) {
		this.picker?.setHour(hour.toInt())
	}

	setMinute(minute: number) {
		this.picker?.setMinute(minute.toInt())
	}
}
