export type AmapAnchor = {
	x : number;
	y : number;
};

export type AmapMapMarkerCallout = {
	content : string;
	color ?: string | null;
	fontSize ?: number | null;
	borderRadius ?: number | null;
	borderWidth ?: number | null;
	borderColor ?: string | null;
	bgColor ?: string | null;
	padding ?: number | null;
	display ?: string | null;
	textAlign ?: string | null;
};

export type AmapMapMarkerLabel = {
	content : string;
	color ?: string | null;
	fontSize ?: number | null;
	x ?: number | null;
	y ?: number | null;
	borderWidth ?: number | null;
	borderColor ?: string | null;
	bgColor ?: string | null;
	borderRadius ?: number | null;
	padding ?: number | null;
	textAlign ?: string | null;
};

export type AmapMarker = {
	/**
	 * 标记点id，marker点击事件回调会返回此id。建议为每个marker设置上Number类型id，保证更新marker时有更好的性能。最大限制9位数
	 */
	id : number;
	/**
	 * 纬度，浮点数，范围 -90 ~ 90
	 */
	latitude : number;
	/**
	 * 经度，浮点数，范围 -180 ~ 180
	 */
	longitude : number;
	/**
	 * 显示的图标，项目目录下的图片路径，支持相对路径写法，以'/'开头则表示相对小程序根目录；也支持临时路径
	 */
	iconPath : string;
	/**
	 * 标注点名，点击时显示，callout存在时将被忽略
	 * @defaultValue null
	 */
	title ?: string | null;
	/**
	 * 旋转角度，顺时针旋转的角度，范围 0 ~ 360
	 * @defaultValue 0
	 */
	rotate ?: number | null;
	/**
	 * 标注的透明度，范围 0 ~ 1
	 * @defaultValue 1
	 */
	alpha ?: number | null;
	/**
	 * 标注图标宽度
	 * @defaultValue 默认为图片实际宽度
	 */
	width ?: number | null;
	/**
	 * 标注图标高度
	 * @defaultValue 默认为图片实际高度
	 */
	height ?: number | null;
	/**
	 * 无障碍访问，（属性）元素的额外描述
	 * @defaultValue null
	 */
	ariaLabel ?: string | null;
	/**
	 * 经纬度在标注图标的锚点，默认底边中点	{x, y}，x表示横向(0-1)，y表示竖向(0-1)。{x: .5, y: 1} 表示底边中点
	 * @defaultValue [0.5, 1]
	 */
	anchor ?: AmapAnchor | null;
	/**
	 * 自定义标记点上方的气泡窗口
	 * @defaultValue null
	 */
	callout ?: AmapMapMarkerCallout | null;
	/**
	 * 为标记点旁边增加标签
	 * @defaultValue null
	 */
	label ?: AmapMapMarkerLabel | null;
	/**
	 * 自定义点聚合簇效果时使用
	 * @defaultValue null
	 */
	clusterId ?: number | null;
};

