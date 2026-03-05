export const platform_iOS: string = 'iOS';
export const platform_Android: string = 'Android';
export const platform_Harmony: string = 'Harmony';

/**
 * 对比版本号，如需要，请自行修改判断规则
 * 支持比对	("3.0.0.0.0.1.0.1", "3.0.0.0.0.1")	("3.0.0.1", "3.0")	("3.1.1", "3.1.1.1") 之类的
 * @param {Object} v1
 * @param {Object} v2
 * v1 > v2 return 1
 * v1 < v2 return -1
 * v1 == v2 return 0
 */
export function compare(v_1: string = '0', v_2: string = '0') {
	const v1: string[] = String(v_1).split('.');
	const v2: string[] = String(v_2).split('.');
	const minVersionLens = Math.min(v1.length, v2.length);

	let result = 0;
	for (let i = 0; i < minVersionLens; i++) {
		const curV1 = Number(v1[i]);
		const curV2 = Number(v2[i]);

		if (curV1 > curV2) {
			result = 1;
			break;
		} else if (curV1 < curV2) {
			result = -1;
			break;
		}
	}

	if (result === 0 && v1.length !== v2.length) {
		const v1BiggerThenv2 = v1.length > v2.length;
		const maxLensVersion = v1BiggerThenv2 ? v1 : v2;
		for (let i = minVersionLens; i < maxLensVersion.length; i++) {
			const curVersion = Number(maxLensVersion[i]);
			if (curVersion > 0) {
				v1BiggerThenv2 ? (result = 1) : (result = -1);
				break;
			}
		}
	}

	return result;
}