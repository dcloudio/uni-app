export const chooseLocationPlugin = () => {
	uni.chooseLocation({
    latitude: 39.951372,
    longitude: 116.39747,
    keyword: '公园',
    success(res){
      console.log('chooseLocation in plugin complete success', res);
    },
    fail(err){
      console.log('chooseLocation in plugin complete fail', err);
    },
    complete(res){
      console.log('chooseLocation in plugin complete res', res);
    }
  })
};
