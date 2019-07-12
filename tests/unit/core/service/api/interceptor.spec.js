import {
    expect
} from 'chai'

describe('接口`addInterceptor`', () => {
    it('同步拦截器 invoke', done => {
        const setStorageInterceptor = {
            invoke(args) {
                args.data = 2
            }
        }
        uni.addInterceptor('setStorage', setStorageInterceptor)

        uni.setStorage({
            key: 'test',
            data: 1
        }).then(function() {
            expect(uni.getStorageSync('test')).eq(2)
            uni.removeInterceptor('setStorage')
            return uni.setStorage({
                key: 'test',
                data: 1
            })
        }).then(function() {
            expect(uni.getStorageSync('test')).eq(1)
            done()
        })
    })
    it('同步拦截器 callback', done => {
        const setStorageInterceptor = {
            success(res) {
                res.data = 2
            },
            complete(res) {
                res.data = 3
            }
        }
        uni.addInterceptor('setStorage', setStorageInterceptor)
        uni.setStorage({
            key: 'test',
            data: 1,
            success(res) {
                expect(res.data).eq(2)
            },
            complete(res) {
                uni.removeInterceptor('setStorage')
                expect(res.data).eq(3)
                done()
            }
        })
    })
    it('异步拦截器 invoke', done => {
        const setStorageInterceptor = {
            invoke(args) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        args.data = 2
                        resolve(args)
                    }, 200)
                })
            }
        }
        uni.addInterceptor('setStorage', setStorageInterceptor)

        uni.setStorage({
            key: 'test',
            data: 1
        }).then(function() {
            expect(uni.getStorageSync('test')).eq(2)
            uni.removeInterceptor('setStorage')
            return uni.setStorage({
                key: 'test',
                data: 1
            })
        }).then(function() {
            expect(uni.getStorageSync('test')).eq(1)
            done()
        })
    })
    it('异步拦截器 callback', done => {
        const setStorageInterceptor = {
            success(res) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        res.data = 2
                        resolve(res)
                    }, 200)
                })
            },
            complete(res) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        res.data = 3
                        resolve(res)
                    }, 1000)
                })
            }
        }
        uni.addInterceptor('setStorage', setStorageInterceptor)
        uni.setStorage({
            key: 'test',
            data: 1,
            success(res) {
                expect(res.data).eq(2)
            },
            complete(res) {
                expect(res.data).eq(3)
                uni.setStorage({
                    key: 'test',
                    data: 1
                }).then(function(res) {
                    uni.removeInterceptor('setStorage')
                    expect(res[1].data).eq(2)
                    done()
                })
            }
        })

    })
    it('全局拦截器 promiseInterceptor', done => {
        uni.addInterceptor(uni.interceptors.promiseInterceptor)
        uni.setStorageSync('test', 1)
        uni.getStorage({
            key: 'test'
        }).then(res => {
            expect(res.data).eq(1)
            uni.removeInterceptor(uni.interceptors.promiseInterceptor)
            uni.getStorage({
                key: 'test'
            }).then(res => {
                expect(res[1].data).eq(1)
                done()
            })
        })

    })
})
