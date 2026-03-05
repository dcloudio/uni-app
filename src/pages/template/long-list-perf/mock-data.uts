// 列表项数据类型
export type ListItemData = {
	id: number,
	type: number,
	title: string,
	desc: string,
	author: string,
	timestamp: number,
	image: string,
	images: string[],
	gridImages: string[],
	rating: number,
	videoUrl: string,
	videoPoster: string,
	playCount: number,
	likeCount: number
}

// 预生成4000条数据
function generateData(): ListItemData[] {
	const result: ListItemData[] = []
	const baseTime = 1705000000000 // 固定基准时间戳

	for (let i = 0; i < 4000; i++) {
		const type = (i % 5) + 1
		const idx = i + 1

		// 生成3张图片URL - 使用不同颜色和文字标识
		const images: string[] = []
		images.push(`https://web-ext-storage.dcloud.net.cn/hello-uni-app-x/long-list-perf/200x150/3498db/white/T${type}-${idx}-A.webp`)
		images.push(`https://web-ext-storage.dcloud.net.cn/hello-uni-app-x/long-list-perf/200x150/e74c3c/white/T${type}-${idx}-B.webp`)
		images.push(`https://web-ext-storage.dcloud.net.cn/hello-uni-app-x/long-list-perf/200x150/2ecc71/white/T${type}-${idx}-C.webp`)

		// 生成9张九宫格图片
		const gridImages: string[] = []
		const colors = ['e74c3c', 'e67e22', 'f1c40f', '2ecc71', '1abc9c', '3498db', '9b59b6', '34495e', '95a5a6']
		for (let k = 0; k < 9; k++) {
			gridImages.push(`https://web-ext-storage.dcloud.net.cn/hello-uni-app-x/long-list-perf/120x120/${colors[k]}/white/${idx}-G${k + 1}.webp`)
		}

		const item: ListItemData = {
			id: i,
			type: type,
			title: `#${idx} ${type==1?'单图':type==2?'三图':type==3?'九宫':type==4?'卡片':'视频'}`,
			desc: `第${idx}条数据内容摘要，测试长文本显示效果。这里多加一点文字让它看起来更长一些。`,
			author: `User-${idx}`,
			timestamp: baseTime - i * 3600000,
			image: `https://web-ext-storage.dcloud.net.cn/hello-uni-app-x/long-list-perf/120x120/9b59b6/white/T${type}-${idx}.webp`,
			images: images,
			gridImages: gridImages,
			rating: Math.floor(Math.random() * 5) + 1,
			videoUrl: (i%2==1)? '/static/test-video/10second-demo.mp4': 'https://web-ext-storage.dcloud.net.cn/uni-app-x/video/uts-5-16.mp4',
			videoPoster: `https://web-ext-storage.dcloud.net.cn/hello-uni-app-x/long-list-perf/400x200/1abc9c/white/Video-${idx}.webp`,
			playCount: i * 100 + 500,
			likeCount: i * 10 + 50
		}
		result.push(item)
	}

	return result
}

let _mockListData: ListItemData[] | null = null
export function generateMockList() {
  if (_mockListData == null) {
    _mockListData = generateData()
  }
  return _mockListData!
}
