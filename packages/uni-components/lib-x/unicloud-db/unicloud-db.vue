<template>
  <uni-cloud-db-element ref="UniCloudDB">
    <slot :data="dataList" :loading="loading" :hasMore="hasMore" :pagination="pagination" :error="error" />
  </uni-cloud-db-element>
</template>

<script lang="uts">
  import { SlotsType } from 'vue'

  const EVENT_LOAD = 'load'
  const EVENT_ERROR = 'error'
  const PAGE_MODE_ADD = 'add'
  const PAGE_MODE_REPLACE = 'replace'
  const LOAD_MODE_AUTO = 'auto'
  const LOAD_MODE_MANUAL = 'manual'
  // const LOAD_MODE_ONREADY = 'onready'

  type SuccessCallback<T> = (res : T | null) => void | null
  type FailCallback = (err : any | null) => void | null
  type CompleteCallback = () => void | null

  type GetSuccessCallback = SuccessCallback<UniCloudDBGetResult>
  type AddSuccessCallback = SuccessCallback<UniCloudDBAddResult>
  type RemoveSuccessCallback = SuccessCallback<UniCloudDBRemoveResult>
  type UpdateSuccessCallback = SuccessCallback<UniCloudDBUpdateResult>

  export type UniCloudDBComponentPaginationType = {
    current : number,
    size : number,
    count : number
  }

  export type UniCloudDBComponentLoadDataOptions = {
    clear ?: boolean | null,
    current ?: number | null,
    success ?: GetSuccessCallback,
    fail ?: FailCallback,
    complete ?: CompleteCallback,
  }

  export type UniCloudDBComponentAddOptions = {
    /**
     * @default true
     */
    showToast ?: boolean | null,
    toastTitle ?: string | null,
    /**
     * @default true
     */
    needLoading ?: boolean | null,
    loadingTitle ?: string | null,
    success ?: AddSuccessCallback,
    fail ?: FailCallback,
    complete ?: CompleteCallback,
  }

  export type UniCloudDBComponentRemoveOptions = {
    confirmTitle ?: string | null,
    confirmContent ?: string | null,
    /**
     * @default true
     */
    needConfirm ?: boolean | null,
    /**
     * @default true
     */
    needLoading ?: boolean | null,
    loadingTitle ?: string | null,
    success ?: RemoveSuccessCallback,
    fail ?: FailCallback,
    complete ?: CompleteCallback,
  }

  export type UniCloudDBComponentUpdateOptions = {
    /**
     * @default true
     */
    showToast ?: boolean | null,
    toastTitle ?: string | null,
    confirmTitle ?: string | null,
    confirmContent ?: string | null,
    /**
     * @default true
     */
    needConfirm ?: boolean | null,
    /**
     * @default true
     */
    needLoading ?: boolean | null,
    loadingTitle ?: string | null,
    success ?: UpdateSuccessCallback,
    fail ?: FailCallback,
    complete ?: CompleteCallback,
  }

  @Suppress("UNCHECKED_CAST")
  function cast_callback<T>(options : any | null) : T | null {
    return options as T | null
  }

  export class UniCloudDBElement extends UniViewElement {
    constructor(data : INodeData, pageNode : PageNode) {
      super(data, pageNode)
    }

    dataList : Array<UTSJSONObject> = []

    loadData(options : UTSJSONObject = {}) {
      this.onLoadData({
        clear: options.getBoolean('clear'),
        current: options.getNumber('current'),
        success: cast_callback<GetSuccessCallback>(options['success']),
        fail: cast_callback<FailCallback>(options['fail']),
        complete: cast_callback<CompleteCallback>(options['complete'])
      } as UniCloudDBComponentLoadDataOptions)
    }

    loadMore() {
      this.onLoadMore()
    }

    add(value : UTSJSONObject, options : UTSJSONObject) {
      this.onAdd(value, {
        showToast: options.getBoolean('showToast') ?? true,
        toastTitle: options.getString('toastTitle'),
        needLoading: options.getBoolean('needLoading') ?? true,
        loadingTitle: options.getString('loadingTitle'),
        success: cast_callback<AddSuccessCallback>(options['success']),
        fail: cast_callback<FailCallback>(options['fail']),
        complete: cast_callback<CompleteCallback>(options['complete'])
      } as UniCloudDBComponentAddOptions)
    }

    remove(id : any, options : UTSJSONObject) {
      this.onRemove(id, {
        confirmTitle: options.getString('confirmTitle'),
        confirmContent: options.getString('confirmContent'),
        needConfirm: options.getBoolean('needConfirm') ?? true,
        needLoading: options.getBoolean('needLoading') ?? true,
        loadingTitle: options.getString('loadingTitle'),
        success: cast_callback<RemoveSuccessCallback>(options['success']),
        fail: cast_callback<FailCallback>(options['fail']),
        complete: cast_callback<CompleteCallback>(options['complete'])
      } as UniCloudDBComponentRemoveOptions)
    }

    update(id : string, value : UTSJSONObject, options : UTSJSONObject) {
      this.onUpdate(id, value, {
        showToast: options.getBoolean('showToast') ?? true,
        toastTitle: options.getString('toastTitle'),
        confirmTitle: options.getString('confirmTitle'),
        confirmContent: options.getString('confirmContent'),
        needConfirm: options.getBoolean('needConfirm') ?? true,
        needLoading: options.getBoolean('needLoading') ?? true,
        loadingTitle: options.getString('loadingTitle'),
        success: cast_callback<UpdateSuccessCallback>(options['success']),
        fail: cast_callback<FailCallback>(options['fail']),
        complete: cast_callback<CompleteCallback>(options['complete'])
      } as UniCloudDBComponentUpdateOptions)
    }

    onLoadData! : (_ : UniCloudDBComponentLoadDataOptions) => void
    onLoadMore! : () => void
    onAdd! : (value : UTSJSONObject, options : UniCloudDBComponentAddOptions) => void
    onUpdate!: (id : string, value : UTSJSONObject, options : UniCloudDBComponentUpdateOptions) => void
    onRemove!: (id : any, options : UniCloudDBComponentRemoveOptions) => void
  }

  export default {
    name: 'UniCloudDB',
    rootElement: {
      name: 'uni-cloud-db-element',
      class: UniCloudDBElement
    },
    slots: Object as SlotsType<{
      default : {
        data : Array<UTSJSONObject>,
        loading : boolean,
        hasMore : boolean,
        pagination : UniCloudDBComponentPaginationType,
        error : UniCloudError | null
      }
    }>,
    props: {
      collection: {
        type: Object,
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
        type: Object,
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
        type: Boolean,
        default: false
      },
      gettree: {
        type: Object,
        default: ''
      },
      gettreepath: {
        type: Boolean,
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
      groupby: {
        type: String,
        default: ''
      },
      groupField: {
        type: String,
        default: ''
      },
      distinct: {
        type: Boolean,
        default: false
      },
      pageIndistinct: {
        type: Boolean,
        default: false
      },
      foreignKey: {
        type: String,
        default: ''
      },
      loadtime: {
        type: String,
        default: 'auto'
      },
      manual: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dataList: [] as Array<UTSJSONObject>,
        loading: false,
        hasMore: false,
        isEnded: false,
        pagination: {
          current: 1,
          size: 20,
          count: 0,
        } as UniCloudDBComponentPaginationType,
        error: null as UniCloudError | null
      }
    },
    created() {
      this.pagination.current = this.pageCurrent
      this.pagination.size = this.pageSize

      this.$watch(
        () : any => [
          this.pageCurrent,
          this.pageSize,
          this.collection,
          this.field,
          this.getcount,
          this.orderby,
          this.where,
          this.groupby,
          this.groupField,
          this.distinct
        ],
        (newValue : Array<any>, oldValue : Array<any>) => {
          this.pagination.size = this.pageSize
          if (newValue[0] !== oldValue[0]) {
            this.pagination.current = this.pageCurrent
          }

          if (this.loadtime == LOAD_MODE_MANUAL) {
            return
          }

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

          this.get(false)
        }
      )

      if (!this.manual && this.loadtime == LOAD_MODE_AUTO) {
        this.get(false)
      }
    },
    mounted() {
      const uniCloudDBElement = this.$refs.get('UniCloudDB') as UniCloudDBElement
      // TODO 暂不支持Web平台 ?.bind(this);
      uniCloudDBElement.dataList = this.dataList;
      uniCloudDBElement.onLoadData = this.loadData;
      uniCloudDBElement.onLoadMore = this.loadMore;
      uniCloudDBElement.onAdd = this.add;
      uniCloudDBElement.onUpdate = this.update;
      uniCloudDBElement.onRemove = this.remove;
    },
    methods: {
      loadData(options : UniCloudDBComponentLoadDataOptions) {
        if (this.loading) {
          return
        }
        this.loading = true

        this.error = null

        let clear = (options.clear != null && options.clear == true)
        if (clear == true) {
          if (this.pageData == PAGE_MODE_REPLACE) {
            this.clear()
          }
          this.reset()
        }
        if (options.current != null) {
          this.pagination.current = options.current!
        }

        this.getExec().then((res : UniCloudDBGetResult) => {
          this._getSuccess(res, clear)
          options.success?.(res)
        }).catch((err : any | null) => {
          this._requestFail(err, options.fail)
        }).finally(() => {
          this.loading = false
          options.complete?.()
        })

        // this.get(clear).then((res) => {
        //   options.success?.(res)
        // }).catch((err : any | null) => {
        //   options.fail?.(err)
        // }).finally(() => {
        //   this.loading = false
        //   options.complete?.()
        // })
      },
      loadMore() {
        if (this.isEnded || this.loading) {
          return
        }

        if (this.pageData == PAGE_MODE_ADD) {
          this.pagination.current++
        }

        this.get(false)
      },
      refresh() {
        this.clear()
        this.get(false)
      },
      clear() {
        this.isEnded = false
        this.dataList.length = 0
      },
      reset() {
        this.pagination.current = 1
      },
      get(clear : boolean) {
        this.getExec().then((res : UniCloudDBGetResult) => {
          this._getSuccess(res, clear)
        }).catch((err : any | null) => {
          this._requestFail(err, null)
        })
      },
      _getSuccess(res : UniCloudDBGetResult, clear : boolean) {
        const data = res.data
        const count = res.count

        this.isEnded = (count !== null) ? (this.pagination.current * this.pagination.size >= count) : (data.length < this.pageSize)
        this.hasMore = !this.isEnded

        if (this.getcount && count != null) {
          this.pagination.count = count
        }

        this._dispatchEvent(EVENT_LOAD, data)

        if (clear || this.pageData == PAGE_MODE_REPLACE) {
          this.dataList = data
        } else {
          this.dataList.push(...data)
        }
      },
      add(value : UTSJSONObject, options : UniCloudDBComponentAddOptions) {
        this._needLoading(options.needLoading, options.loadingTitle)
        const db = uniCloud.databaseForJQL()
        db.collection(this._getMainCollection()).add(value).then<void>((res : UniCloudDBAddResult) => {
          options.success?.(res)
          this._isShowToast(options.showToast, options.toastTitle, 'add success')
        }).catch((err) => {
          this._requestFail(err, options.fail)
        }).finally(() => {
          this._requestComplete(options.complete, options.needLoading)
        })
      },
      update(id : string, value : UTSJSONObject, options : UniCloudDBComponentUpdateOptions) {
        if (options.needConfirm == true) {
          uni.showModal({
            title: options.confirmTitle,
            content: options.confirmContent,
            showCancel: true,
            success: (res) => {
              if (res.confirm) {
                this._update(id, value, options)
              }
            }
          })
        } else {
          this._update(id, value, options)
        }
      },
      remove(id : any, options : UniCloudDBComponentRemoveOptions) {
        const ids = Array.isArray(id) ? (id as Array<any>) : [id]
        if (options.needConfirm == true) {
          uni.showModal({
            title: options.confirmTitle,
            content: options.confirmContent,
            showCancel: true,
            success: (res) => {
              if (res.confirm) {
                this._remove(ids, options)
              }
            }
          })
        } else {
          this._remove(ids, options)
        }
      },
      _update(id : string, value : UTSJSONObject, options : UniCloudDBComponentUpdateOptions) {
        this._needLoading(options.needLoading, options.loadingTitle)
        const db = uniCloud.databaseForJQL()
        db.collection(this._getMainCollection()).doc(id).update(value).then((res) => {
          options.success?.(res)
          this._isShowToast(options.showToast, options.toastTitle, 'update success')
        }).catch((err) => {
          this._requestFail(err, options.fail)
        }).finally(() => {
          this._requestComplete(options.complete, options.needLoading)
        })
      },
      _remove(ids : Array<any>, options : UniCloudDBComponentRemoveOptions) {
        this._needLoading(options.needLoading, options.loadingTitle)
        const db = uniCloud.databaseForJQL()
        const dbCommand = db.command
        db.collection(this._getMainCollection()).where({
          _id: dbCommand.in(ids)
        }).remove().then((res) => {
          options.success?.(res)
          if (this.pageData == PAGE_MODE_REPLACE) {
            this.refresh()
          } else {
            this._removeData(ids)
          }
        }).catch((err) => {
          this._requestFail(err, options.fail)
        }).finally(() => {
          this._requestComplete(options.complete, options.needLoading)
        })
      },
      _removeData(ids : Array<any>) {
        const il = ids.slice(0)
        const dl = this.dataList
        for (let i = dl.length - 1; i >= 0; i--) {
          const index = il.indexOf(dl[i]['_id'])
          if (index >= 0) {
            dl.splice(i, 1)
            il.splice(index, 1)
          }
        }
      },
      _isShowToast(showToast ?: boolean | null, title ?: string | null, defaultTitle : string) {
        if (showToast == true) {
          uni.showToast({
            title: title ?? defaultTitle
          })
        }
      },
      _needLoading(needLoading ?: boolean | null, title ?: string | null) {
        if (needLoading == true) {
          uni.showLoading({
            mask: true,
            title: title ?? ''
          })
        }
      },
      _requestFail(err ?: any | null, callback ?: FailCallback) {
        callback?.(err)
        this.error = err as UniCloudError
        this.$emit(EVENT_ERROR, err)
      },
      _requestComplete(callback ?: CompleteCallback, needLoading ?: boolean | null) {
        callback?.()
        if (needLoading == true) {
          uni.hideLoading()
        }
      },
      getExec() : Promise<UniCloudDBGetResult> {
        return this.getTemp()
      },
      getTemp() : Promise<UniCloudDBGetResult> {
        let db = uniCloud.databaseForJQL()

        let collection = Array.isArray(this.collection) ? db.collection(...(this.collection as Array<any>)) : db.collection(this.collection)

        let filter : UniCloudDBFilter | null = null
        if (this.foreignKey.length > 0) {
          filter = collection.foreignKey(this.foreignKey)
        }

        if (typeof this.where == 'string') {
          const whereString = this.where as string
          if (whereString.length > 0) {
            filter = (filter != null) ? filter.where(this.where) : collection.where(this.where)
          }
        } else if (typeof this.where == 'object') {
          filter = (filter != null) ? filter.where(this.where) : collection.where(this.where)
        }

        let query : UniCloudDBQuery | null = null
        if (this.field.length > 0) {
          query = (filter != null) ? filter.field(this.field) : collection.field(this.field)
        }
        if (this.groupby.length > 0) {
          if (query != null) {
            query = query.groupBy(this.groupby)
          } else if (filter != null) {
            query = filter.groupBy(this.groupby)
          }
        }
        if (this.groupField.length > 0) {
          if (query != null) {
            query = query.groupField(this.groupField)
          } else if (filter != null) {
            query = filter.groupField(this.groupField)
          }
        }
        if (this.distinct == true) {
          if (query != null) {
            query = query.distinct(this.field)
          } else if (filter != null) {
            query = filter.distinct(this.field)
          }
        }
        if (this.orderby.length > 0) {
          if (query != null) {
            query = query.orderBy(this.orderby)
          } else if (filter != null) {
            query = filter.orderBy(this.orderby)
          }
        }

        const size = this.pagination.size
        const current = this.pagination.current
        if (query != null) {
          query = query.skip(size * (current - 1)).limit(size)
        } else if (filter != null) {
          query = filter.skip(size * (current - 1)).limit(size)
        } else {
          query = collection.skip(size * (current - 1)).limit(size)
        }

        const getOptions = {}
        const treeOptions = {
          limitLevel: this.limitlevel,
          startWith: this.startwith
        }
        if (this.getcount == true) {
          getOptions['getCount'] = this.getcount
        }
        if (typeof this.gettree == 'string') {
          const getTreeString = this.gettree as string
          if (getTreeString.length > 0) {
            getOptions['getTree'] = treeOptions
          }
        } else if (typeof this.gettree == 'object') {
          getOptions['getTree'] = treeOptions
        }
        if (this.gettreepath == true) {
          getOptions['getTreePath'] = treeOptions
        }

        return query.get(getOptions)
      },
      _getMainCollection() : string {
        if (typeof this.collection === 'string') {
          return (this.collection as string).split(',')[0]
        }

        if (Array.isArray(this.collection)) {
          const array = this.collection as Array<any>
          const index = array[0] as UTSJSONObject
          const collection = index.getString('$db[0].$param[0]')
          return collection ?? ''
        }

        return ''
      },
      _dispatchEvent(type : string, data : Array<UTSJSONObject>) {
        this.$emit(type, data, this.isEnded, {
          current: this.pagination.current,
          size: this.pagination.size,
          count: this.pagination.count
        })
      }
    }
  }
</script>