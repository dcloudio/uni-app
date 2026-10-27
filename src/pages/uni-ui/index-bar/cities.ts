export type CityItem = {
  name: string
  pinyin: string
}

export type CityGroup = {
  index: string
  cities: CityItem[]
}

export const cityGroups: CityGroup[] = [
  {
    index: 'A',
    cities: [
      { name: '安庆', pinyin: 'anqing' },
      { name: '安阳', pinyin: 'anyang' },
      { name: '鞍山', pinyin: 'anshan' },
      { name: '安顺', pinyin: 'anshun' },
      { name: '安康', pinyin: 'ankang' },
    ]
  },
  {
    index: 'B',
    cities: [
      { name: '北京', pinyin: 'beijing' },
      { name: '保定', pinyin: 'baoding' },
      { name: '包头', pinyin: 'baotou' },
      { name: '宝鸡', pinyin: 'baoji' },
      { name: '滨州', pinyin: 'binzhou' },
      { name: '本溪', pinyin: 'benxi' },
      { name: '白城', pinyin: 'baicheng' },
      { name: '白山', pinyin: 'baishan' },
      { name: '百色', pinyin: 'baise' },
      { name: '毕节', pinyin: 'bijie' },
      { name: '巴中', pinyin: 'bazhong' },
      { name: '北海', pinyin: 'beihai' },
      { name: '蚌埠', pinyin: 'bengbu' },
    ]
  },
  {
    index: 'C',
    cities: [
      { name: '重庆', pinyin: 'chongqing' },
      { name: '成都', pinyin: 'chengdu' },
      { name: '长沙', pinyin: 'changsha' },
      { name: '长春', pinyin: 'changchun' },
      { name: '沧州', pinyin: 'cangzhou' },
      { name: '常州', pinyin: 'changzhou' },
      { name: '常德', pinyin: 'changde' },
      { name: '承德', pinyin: 'chengde' },
      { name: '赤峰', pinyin: 'chifeng' },
      { name: '郴州', pinyin: 'chenzhou' },
      { name: '池州', pinyin: 'chizhou' },
      { name: '崇左', pinyin: 'chongzuo' },
      { name: '楚雄', pinyin: 'chuxiong' },
    ]
  },
  {
    index: 'D',
    cities: [
      { name: '大连', pinyin: 'dalian' },
      { name: '大庆', pinyin: 'daqing' },
      { name: '大同', pinyin: 'datong' },
      { name: '大理', pinyin: 'dali' },
      { name: '丹东', pinyin: 'dandong' },
      { name: '德州', pinyin: 'dezhou' },
      { name: '德阳', pinyin: 'deyang' },
      { name: '东莞', pinyin: 'dongguan' },
      { name: '东营', pinyin: 'dongying' },
    ]
  },
  {
    index: 'E',
    cities: [
      { name: '鄂州', pinyin: 'ezhou' },
      { name: '恩施', pinyin: 'enshi' },
    ]
  },
  {
    index: 'F',
    cities: [
      { name: '福州', pinyin: 'fuzhou' },
      { name: '抚顺', pinyin: 'fushun' },
      { name: '抚州', pinyin: 'fuzhou2' },
      { name: '阜阳', pinyin: 'fuyang' },
      { name: '阜新', pinyin: 'fuxin' },
      { name: '佛山', pinyin: 'foshan' },
      { name: '防城港', pinyin: 'fangchenggang' },
    ]
  },
  {
    index: 'G',
    cities: [
      { name: '广州', pinyin: 'guangzhou' },
      { name: '贵阳', pinyin: 'guiyang' },
      { name: '桂林', pinyin: 'guilin' },
      { name: '赣州', pinyin: 'ganzhou' },
      { name: '甘南', pinyin: 'gannan' },
      { name: '固原', pinyin: 'guyuan' },
      { name: '广安', pinyin: 'guangan' },
      { name: '广元', pinyin: 'guangyuan' },
    ]
  },
  {
    index: 'H',
    cities: [
      { name: '哈尔滨', pinyin: 'haerbin' },
      { name: '海口', pinyin: 'haikou' },
      { name: '杭州', pinyin: 'hangzhou' },
      { name: '合肥', pinyin: 'hefei' },
      { name: '呼和浩特', pinyin: 'huhehaote' },
      { name: '邯郸', pinyin: 'handan' },
      { name: '汉中', pinyin: 'hanzhong' },
      { name: '菏泽', pinyin: 'heze' },
      { name: '衡水', pinyin: 'hengshui' },
      { name: '衡阳', pinyin: 'hengyang' },
      { name: '黑河', pinyin: 'heihe' },
      { name: '淮安', pinyin: 'huaian' },
      { name: '淮北', pinyin: 'huaibei' },
      { name: '淮南', pinyin: 'huainan' },
      { name: '黄冈', pinyin: 'huanggang' },
      { name: '黄山', pinyin: 'huangshan' },
      { name: '黄石', pinyin: 'huangshi' },
      { name: '惠州', pinyin: 'huizhou' },
      { name: '葫芦岛', pinyin: 'huludao' },
      { name: '湖州', pinyin: 'huzhou' },
      { name: '怀化', pinyin: 'huaihua' },
    ]
  },
  {
    index: 'J',
    cities: [
      { name: '济南', pinyin: 'jinan' },
      { name: '济宁', pinyin: 'jining' },
      { name: '吉林', pinyin: 'jilin' },
      { name: '金华', pinyin: 'jinhua' },
      { name: '锦州', pinyin: 'jinzhou' },
      { name: '晋城', pinyin: 'jincheng' },
      { name: '晋中', pinyin: 'jinzhong' },
      { name: '荆门', pinyin: 'jingmen' },
      { name: '荆州', pinyin: 'jingzhou' },
      { name: '景德镇', pinyin: 'jingdezhen' },
      { name: '九江', pinyin: 'jiujiang' },
      { name: '揭壶', pinyin: 'jiehu' },
    ]
  },
  {
    index: 'K',
    cities: [
      { name: '昆明', pinyin: 'kunming' },
      { name: '开封', pinyin: 'kaifeng' },
      { name: '喀什', pinyin: 'kashi' },
    ]
  },
  {
    index: 'L',
    cities: [
      { name: '兰州', pinyin: 'lanzhou' },
      { name: '拉萨', pinyin: 'lasa' },
      { name: '来宾', pinyin: 'laibin' },
      { name: '莱芜', pinyin: 'laiwu' },
      { name: '廊坊', pinyin: 'langfang' },
      { name: '乐山', pinyin: 'leshan' },
      { name: '丽江', pinyin: 'lijiang' },
      { name: '丽水', pinyin: 'lishui' },
      { name: '连云港', pinyin: 'lianyungang' },
      { name: '凉山', pinyin: 'liangshan' },
      { name: '辽阳', pinyin: 'liaoyang' },
      { name: '辽源', pinyin: 'liaoyuan' },
      { name: '临沧', pinyin: 'lincang' },
      { name: '临汾', pinyin: 'linfen' },
      { name: '临沂', pinyin: 'linyi' },
      { name: '柳州', pinyin: 'liuzhou' },
      { name: '六安', pinyin: 'liuan' },
      { name: '六盘水', pinyin: 'liupanshui' },
      { name: '龙岩', pinyin: 'longyan' },
      { name: '娄底', pinyin: 'loudi' },
      { name: '泸州', pinyin: 'luzhou' },
      { name: '洛阳', pinyin: 'luoyang' },
      { name: '吕梁', pinyin: 'lvliang' },
    ]
  },
  {
    index: 'M',
    cities: [
      { name: '马鞍山', pinyin: 'maanshan' },
      { name: '茂名', pinyin: 'maoming' },
      { name: '眉山', pinyin: 'meishan' },
      { name: '梅州', pinyin: 'meizhou' },
      { name: '绵阳', pinyin: 'mianyang' },
      { name: '牡丹江', pinyin: 'mudanjiang' },
    ]
  },
  {
    index: 'N',
    cities: [
      { name: '南京', pinyin: 'nanjing' },
      { name: '南昌', pinyin: 'nanchang' },
      { name: '南宁', pinyin: 'nanning' },
      { name: '南充', pinyin: 'nanchong' },
      { name: '南通', pinyin: 'nantong' },
      { name: '南阳', pinyin: 'nanyang' },
      { name: '内江', pinyin: 'neijiang' },
      { name: '宁波', pinyin: 'ningbo' },
      { name: '宁德', pinyin: 'ningde' },
    ]
  },
  {
    index: 'P',
    cities: [
      { name: '盘锦', pinyin: 'panjin' },
      { name: '攀枝花', pinyin: 'panzhihua' },
      { name: '平顶山', pinyin: 'pingdingshan' },
      { name: '平凉', pinyin: 'pingliang' },
      { name: '萍乡', pinyin: 'pingxiang' },
      { name: '莆田', pinyin: 'putian' },
    ]
  },
  {
    index: 'Q',
    cities: [
      { name: '青岛', pinyin: 'qingdao' },
      { name: '秦皇岛', pinyin: 'qinhuangdao' },
      { name: '钦州', pinyin: 'qinzhou' },
      { name: '齐齐哈尔', pinyin: 'qiqihaer' },
      { name: '泉州', pinyin: 'quanzhou' },
      { name: '曲靖', pinyin: 'qujing' },
      { name: '衢州', pinyin: 'quzhou' },
    ]
  },
  {
    index: 'R',
    cities: [
      { name: '日照', pinyin: 'rizhao' },
    ]
  },
  {
    index: 'S',
    cities: [
      { name: '上海', pinyin: 'shanghai' },
      { name: '沈阳', pinyin: 'shenyang' },
      { name: '深圳', pinyin: 'shenzhen' },
      { name: '石家庄', pinyin: 'shijiazhuang' },
      { name: '三门峡', pinyin: 'sanmenxia' },
      { name: '三明', pinyin: 'sanming' },
      { name: '三亚', pinyin: 'sanya' },
      { name: '汕头', pinyin: 'shantou' },
      { name: '汕尾', pinyin: 'shanwei' },
      { name: '商洛', pinyin: 'shangluo' },
      { name: '商丘', pinyin: 'shangqiu' },
      { name: '韶关', pinyin: 'shaoguan' },
      { name: '绍兴', pinyin: 'shaoxing' },
      { name: '邵阳', pinyin: 'shaoyang' },
      { name: '朔州', pinyin: 'shuozhou' },
      { name: '四平', pinyin: 'siping' },
      { name: '遂宁', pinyin: 'suining' },
      { name: '宿迁', pinyin: 'suqian' },
      { name: '宿州', pinyin: 'suzhou2' },
      { name: '苏州', pinyin: 'suzhou' },
    ]
  },
  {
    index: 'T',
    cities: [
      { name: '天津', pinyin: 'tianjin' },
      { name: '太原', pinyin: 'taiyuan' },
      { name: '台州', pinyin: 'taizhou' },
      { name: '泰安', pinyin: 'taian' },
      { name: '泰州', pinyin: 'taizhou2' },
      { name: '唐山', pinyin: 'tangshan' },
      { name: '铁岭', pinyin: 'tieling' },
      { name: '铜川', pinyin: 'tongchuan' },
      { name: '铜陵', pinyin: 'tongling' },
      { name: '铜仁', pinyin: 'tongren' },
      { name: '通化', pinyin: 'tonghua' },
      { name: '通辽', pinyin: 'tongliao' },
    ]
  },
  {
    index: 'W',
    cities: [
      { name: '武汉', pinyin: 'wuhan' },
      { name: '乌鲁木齐', pinyin: 'wulumuqi' },
      { name: '无锡', pinyin: 'wuxi' },
      { name: '威海', pinyin: 'weihai' },
      { name: '潍坊', pinyin: 'weifang' },
      { name: '渭南', pinyin: 'weinan' },
      { name: '温州', pinyin: 'wenzhou' },
      { name: '梧州', pinyin: 'wuzhou' },
      { name: '芜湖', pinyin: 'wuhu' },
      { name: '吴忠', pinyin: 'wuzhong' },
    ]
  },
  {
    index: 'X',
    cities: [
      { name: '西安', pinyin: 'xian' },
      { name: '西宁', pinyin: 'xining' },
      { name: '厦门', pinyin: 'xiamen' },
      { name: '咸宁', pinyin: 'xianning' },
      { name: '咸阳', pinyin: 'xianyang' },
      { name: '湘潭', pinyin: 'xiangtan' },
      { name: '湘西', pinyin: 'xiangxi' },
      { name: '襄阳', pinyin: 'xiangyang' },
      { name: '孝感', pinyin: 'xiaogan' },
      { name: '新乡', pinyin: 'xinxiang' },
      { name: '信阳', pinyin: 'xinyang' },
      { name: '邢台', pinyin: 'xingtai' },
      { name: '兴安盟', pinyin: 'xinganmeng' },
      { name: '宣城', pinyin: 'xuancheng' },
      { name: '许昌', pinyin: 'xuchang' },
      { name: '徐州', pinyin: 'xuzhou' },
    ]
  },
  {
    index: 'Y',
    cities: [
      { name: '银川', pinyin: 'yinchuan' },
      { name: '烟台', pinyin: 'yantai' },
      { name: '延安', pinyin: 'yanan' },
      { name: '延边', pinyin: 'yanbian' },
      { name: '盐城', pinyin: 'yancheng' },
      { name: '阳江', pinyin: 'yangjiang' },
      { name: '阳泉', pinyin: 'yangquan' },
      { name: '扬州', pinyin: 'yangzhou' },
      { name: '宜宾', pinyin: 'yibin' },
      { name: '宜昌', pinyin: 'yichang' },
      { name: '宜春', pinyin: 'yichun' },
      { name: '益阳', pinyin: 'yiyang' },
      { name: '营口', pinyin: 'yingkou' },
      { name: '永州', pinyin: 'yongzhou' },
      { name: '榆林', pinyin: 'yulin' },
      { name: '玉林', pinyin: 'yulin2' },
      { name: '玉溪', pinyin: 'yuxi' },
      { name: '岳阳', pinyin: 'yueyang' },
      { name: '云浮', pinyin: 'yunfu' },
    ]
  },
  {
    index: 'Z',
    cities: [
      { name: '郑州', pinyin: 'zhengzhou' },
      { name: '珠海', pinyin: 'zhuhai' },
      { name: '湛江', pinyin: 'zhanjiang' },
      { name: '张家界', pinyin: 'zhangjiajie' },
      { name: '张家口', pinyin: 'zhangjiakou' },
      { name: '张掖', pinyin: 'zhangye' },
      { name: '漳州', pinyin: 'zhangzhou' },
      { name: '昭通', pinyin: 'zhaotong' },
      { name: '镇江', pinyin: 'zhenjiang' },
      { name: '中山', pinyin: 'zhongshan' },
      { name: '舟山', pinyin: 'zhoushan' },
      { name: '周口', pinyin: 'zhoukou' },
      { name: '株洲', pinyin: 'zhuzhou' },
      { name: '驻马店', pinyin: 'zhumadian' },
      { name: '遵义', pinyin: 'zunyi' },
      { name: '自贡', pinyin: 'zigong' },
      { name: '资阳', pinyin: 'ziyang' },
    ]
  },
]
