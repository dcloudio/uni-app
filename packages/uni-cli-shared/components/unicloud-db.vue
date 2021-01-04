<template>
  <view>
    <slot
      :options="options"
      :data="dataList"
      :pagination="paginationInternal"
      :loading="loading"
      :hasMore="hasMore"
      :error="errorMessage"
    />
  </view>
</template>

<script>
const events = {
  load: 'load',
  error: 'error'
}
const pageMode = {
  add: 'add',
  replace: 'replace'
}

const attrs = [
  'pageCurrent',
  'pageSize',
  'collection',
  'action',
  'field',
  'getcount',
  'orderby',
  'where'
]

export default {
  name: 'UniClouddb',
  props: {
    options: {
      type: [Object, Array],
      default () {
        return {}
      }
    },
    collection: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: ''
    },
    field: {
      type: String,
      default: ''
    },
    orderby: {
      type: String,
      default: ''
    },
    where: {
      type: [String, Object],
      default: ''
    },
    pageData: {
      type: String,
      default: 'add'
    },
    pageCurrent: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    },
    getcount: {
      type: [Boolean, String],
      default: false
    },
    getone: {
      type: [Boolean, String],
      default: false
    },
    gettree: {
      type: [Boolean, String],
      default: false
    },
    startwith: {
      type: String,
      default: ''
    },
    limitlevel: {
      type: Number,
      default: 10
    },
    manual: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      hasMore: false,
      dataList: this.getone ? undefined : [],
      paginationInternal: {
        current: this.pageCurrent,
        size: this.pageSize,
        count: 0
      },
      errorMessage: ''
    }
  },
  created () {
    this._isEnded = false

    this.$watch(() => {
      var al = []
      attrs.forEach(key => {
        al.push(this[key])
      })
      return al
    }, (newValue, oldValue) => {
      this.paginationInternal.size = this.pageSize

      let needReset = false
      for (let i = 2; i < newValue.length; i++) {
        if (newValue[i] !== oldValue[i]) {
          needReset = true
          break
        }
      }
      if (needReset) {
        this.clear()
        this.reset()
      }
      if (newValue[0] !== oldValue[0]) {
        this.paginationInternal.current = this.pageCurrent
      }

      this._execLoadData()
    })

    // #ifdef H5
    if (process.env.NODE_ENV === 'development') {
      this._debugDataList = []
      if (!window.unidev) {
        window.unidev = {
          clientDB: {
            data: []
          }
        }
      }
      window.unidev.clientDB.data.push(this._debugDataList)
    }
    // #endif

    // #ifdef MP-TOUTIAO
    let changeName
    const events = this.$scope.dataset.eventOpts
    for (var i = 0; i < events.length; i++) {
      const event = events[i]
      if (event[0].includes('^load')) {
        changeName = event[1][0][0]
      }
    }
    if (changeName) {
      let parent = this.$parent
      let maxDepth = 16
      this._changeDataFunction = null
      while (parent && maxDepth > 0) {
        const fun = parent[changeName]
        if (fun && typeof fun === 'function') {
          this._changeDataFunction = fun
          maxDepth = 0
          break
        }
        parent = parent.$parent
        maxDepth--
      }
    }
    // #endif

    if (!this.manual) {
      this.loadData()
    }
  },
  // #ifdef H5
  beforeDestroy () {
    if (process.env.NODE_ENV === 'development' && window.unidev) {
      var cd = this._debugDataList
      var dl = window.unidev.clientDB.data
      for (var i = dl.length - 1; i >= 0; i--) {
        if (dl[i] === cd) {
          dl.splice(i, 1)
          break
        }
      }
    }
  },
  // #endif
  methods: {
    loadData (args1, args2) {
      let callback = null
      if (typeof args1 === 'object') {
        if (args1.clear) {
          this.clear()
          this.reset()
        }
        if (args1.current !== undefined) {
          this.paginationInternal.current = args1.current
        }
        if (typeof args2 === 'function') {
          callback = args2
        }
      } else if (typeof args1 === 'function') {
        callback = args1
      }

      this._execLoadData(callback)
    },
    loadMore () {
      if (this._isEnded) {
        return
      }
      this._execLoadData()
    },
    refresh () {
      this.clear()
      this._execLoadData()
    },
    clear () {
      this._isEnded = false
      this.dataList = []
    },
    reset () {
      this.paginationInternal.current = 1
    },
    add (value, {
      toastTitle,
      success,
      fail,
      complete
    } = {}) {
      uni.showLoading()
      /* eslint-disable no-undef */
      const db = uniCloud.database()
      db.collection(this.collection).add(value).then((res) => {
        success && success(res)
        uni.showToast({
          title: toastTitle || '新增成功'
        })
      }).catch((err) => {
        fail && fail(err)
        uni.showModal({
          content: err.message,
          showCancel: false
        })
      }).finally(() => {
        uni.hideLoading()
        complete && complete()
      })
    },
    remove (id, {
      action,
      success,
      fail,
      complete,
      confirmTitle,
      confirmContent
    } = {}) {
      if (!id || !id.length) {
        return
      }
      uni.showModal({
        title: confirmTitle || '提示',
        content: confirmContent || '是否删除该数据',
        showCancel: true,
        success: (res) => {
          if (!res.confirm) {
            return
          }
          this._execRemove(id, action, success, fail, complete)
        }
      })
    },
    update (id, value, {
      toastTitle,
      success,
      fail,
      complete
    } = {}) {
      uni.showLoading()
      /* eslint-disable no-undef */
      const db = uniCloud.database()
      return db.collection(this.collection).doc(id).update(value).then((res) => {
        success && success(res)
        uni.showToast({
          title: toastTitle || '修改成功'
        })
      }).catch((err) => {
        fail && fail(err)
        uni.showModal({
          content: err.message,
          showCancel: false
        })
      }).finally(() => {
        uni.hideLoading()
        complete && complete()
      })
    },
    _execLoadData (callback) {
      if (this.loading) {
        return
      }
      this.loading = true
      this.errorMessage = ''

      this._getExec().then((res) => {
        this.loading = false
        const {
          data,
          count
        } = res.result
        this._isEnded = data.length < this.pageSize
        this.hasMore = !this._isEnded

        const data2 = this.getone ? (data.length ? data[0] : undefined) : data

        callback && callback(data2, this._isEnded)
        this._dispatchEvent(events.load, data2)

        if (this.getone || this.pageData === pageMode.replace) {
          this.dataList = data2
        } else {
          this.dataList.push(...data2)
          if (this.dataList.length) {
            this.paginationInternal.current++
          }
        }

        if (this.getcount) {
          this.paginationInternal.count = count
        }

        // #ifdef H5
        if (process.env.NODE_ENV === 'development') {
          this._debugDataList.length = 0
          const formatData = JSON.parse(JSON.stringify(this.dataList))
          if (Array.isArray(this.dataList)) {
            this._debugDataList.push(...formatData)
          } else {
            this._debugDataList.push(formatData)
          }
        }
        // #endif
      }).catch((err) => {
        this.loading = false
        this.errorMessage = err
        callback && callback()
        this.$emit(events.error, err)
        if (process.env.NODE_ENV === 'development') {
          console.error(err)
        }
      })
    },
    _getExec () {
      /* eslint-disable no-undef */
      let db = uniCloud.database()

      if (this.action) {
        db = db.action(this.action)
      }

      db = db.collection(this.collection)

      if (!(!this.where || !Object.keys(this.where).length)) {
        db = db.where(this.where)
      }
      if (this.field) {
        db = db.field(this.field)
      }
      if (this.orderby) {
        db = db.orderBy(this.orderby)
      }

      const {
        current,
        size
      } = this.paginationInternal
      const getOptions = {}
      if (this.getcount) {
        getOptions.getCount = this.getcount
      }
      if (this.gettree) {
        getOptions.getTree = {
          limitLevel: this.limitlevel,
          startWith: this.startwith
        }
      }
      db = db.skip(size * (current - 1)).limit(size).get(getOptions)

      return db
    },
    _execRemove (id, action, success, fail, complete) {
      if (!this.collection || !id) {
        return
      }

      const ids = Array.isArray(id) ? id : [id]
      if (!ids.length) {
        return
      }

      uni.showLoading({
        mask: true
      })

      /* eslint-disable no-undef */
      const db = uniCloud.database()
      const dbCmd = db.command

      let exec = db
      if (action) {
        exec = exec.action(action)
      }

      exec.collection(this.collection).where({
        _id: dbCmd.in(ids)
      }).remove().then((res) => {
        success && success(res.result)
        if (this.pageData === pageMode.replace) {
          this.refresh()
        } else {
          this.removeData(ids)
        }
      }).catch((err) => {
        fail && fail(err)
        uni.showModal({
          content: err.message,
          showCancel: false
        })
      }).finally(() => {
        uni.hideLoading()
        complete && complete()
      })
    },
    removeData (ids) {
      const il = ids.slice(0)
      const dl = this.dataList
      for (let i = dl.length - 1; i >= 0; i--) {
        const index = il.indexOf(dl[i]._id)
        if (index >= 0) {
          dl.splice(i, 1)
          il.splice(index, 1)
        }
      }
    },
    _dispatchEvent (type, data) {
      if (this._changeDataFunction) {
        this._changeDataFunction(data, this._isEnded)
      } else {
        this.$emit(type, data, this._isEnded)
      }
    }
  }
}
</script>
