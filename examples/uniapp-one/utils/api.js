import request from './request'

const baseURL = `https://petrify.cc`
// const baseURL = 'http://192.168.29.238:7001'
request.config.baseURL = baseURL

const dailyRequest = (id) => request.post('/v1/daily', {
  url: `/api/4/news/${id}`
})

const api = {
  // picture
  getNewIds: () => request.get(`/v1/one?${encodeURI('url=/api/hp/idlist/0?version=3.5.0&platform=android')}`),
  getHomeData: (id) => request.get(`/v1/one?${encodeURI('url=/api/hp/detail/' + id + '?version=3.5.0&platform=android')}`),
  // read
  getReadList: () => request.get(`/v1/one?${encodeURI('url=/api/reading/index/?version=3.5.0&platform=android')}`),
  getReadDetail: (type, id) => request.get(`/v1/one?${encodeURI('url=/api/' + type + '/' + id + '?version=3.5.0&platform=android')}`),
  getReadComment: (id) => request.get(`/v1/one?${encodeURI('url=/api/comment/praiseandtime/essay/' + id + '/0?version=3.5.0&platform=android')}`),
  getMovieList: () => request.post('/v1/two', {
    url: '/api/channel/movie/more/0?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android'
  }),
  getMovieDetail: (id) => request.get(`/v1/one?${encodeURI('url=/api/movie/' + id + '/story/1/0?version=3.5.0&platform=android')}`),
  getWeather: (location) => request.get(`/v1/weather?location=${location}`),
  // 知乎日报
  getZhList: () => dailyRequest('latest'),
  getZhDtl: (id) => dailyRequest(id)
}

export default api
