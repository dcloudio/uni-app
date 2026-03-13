<template>
  <view>
    <slot :data="dataList" :loading="loading" :hasMore="hasMore" :pagination="pagination" :error="error" />
  </view>
</template>

<script lang="uts" setup>
  import { UniCloudDBElement } from './global.uts'

  defineOptions({
    name: 'unicloud-db',
    // @ts-ignore
    rootElement: {
      class: UniCloudDBElement
    }
  })

  const slots = defineSlots<{
    default(props: {
      data : Array<UTSJSONObject>,
      loading : boolean,
      hasMore : boolean,
      pagination : UniCloudDBComponentPaginationType,
      error : UniCloudError | null
    }): any
  }>()

  interface UniCloudDBProps {
    collection : String | any;
    field : String;
    orderby : String;
    where : String | any;
    pageData : String;
    pageCurrent : Number;
    pageSize : Number;
    getcount : Boolean;
    gettree : String | any;
    gettreepath : Boolean;
    startwith : String;
    limitlevel : Number;
    groupby : String;
    groupField : String;
    distinct : Boolean;
    pageIndistinct : Boolean;
    foreignKey : String;
    loadtime : String;
    manual : Boolean;
    ssrKey : String
  }

  const props = withDefaults(defineProps<UniCloudDBProps>(), {
    collection: '',
    field : '',
    orderby : '',
    where : '',
    pageData : 'add',
    pageCurrent : 1,
    pageSize : 20,
    getcount : false,
    gettree : '',
    gettreepath : false,
    startwith : '',
    limitlevel : 10,
    groupby : '',
    groupField : '',
    distinct : false,
    pageIndistinct : false,
    foreignKey : '',
    loadtime : 'auto',
    manual : false,
    ssrKey : '',
  })

  const dataList = ref<Array<UTSJSONObject>>([])
  const loading = ref(false)
  const hasMore = ref(false)
  const isEnded = ref(false)
  const pagination = ref<UniCloudDBComponentPaginationType>({
    current: 1,
    size: 20,
    count: 0,
  })
  const error = ref<UniCloudError | null>(null)

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

  type UniCloudDBComponentPaginationType = {
    current : number,
    size : number,
    count : number
  }

  type UniCloudDBComponentLoadDataOptions = {
    clear ?: boolean | null,
    current ?: number | null,
    success ?: GetSuccessCallback,
    fail ?: FailCallback,
    complete ?: CompleteCallback,
  }

  type UniCloudDBComponentAddOptions = {
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

  type UniCloudDBComponentRemoveOptions = {
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

  type UniCloudDBComponentUpdateOptions = {
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

  function cast_callback<T>(options : any | null) : T | null {
    return options as T | null
  }

  const emit = defineEmits<{
    'load' : UniCloudDBGetResult
  }>()

  const loadData = async (options : UniCloudDBComponentLoadDataOptions) : Promise<void> => {
    const clear = (options.clear != null && options.clear == true)
    if (clear == true) {
      if (props.pageData == PAGE_MODE_REPLACE) {
        clear()
      }
      reset()
    }
    await get(options)
  }

  const loadMore = () => {
    if (isEnded || loading) {
      return
    }

    if (props.pageData == PAGE_MODE_ADD) {
      pagination.value.current++
    }

    get(null)
  }

  const refresh = () => {
    clear()
    get(null)
  }

  const clear = () => {
    isEnded.value = false
    dataList.value.length = 0
  }

  const reset = () => {
    pagination.value.current = 1
  }

  const get = async (options ?: UniCloudDBComponentLoadDataOptions | null) : Promise<void> => {
    let loadAfterClear = false
    if (options != null && options.clear != null && options.clear == true) {
      loadAfterClear = true
    }
    if (options != null && options.current != null) {
      pagination.value.current = options.current!
    }

    error.value = null
    loading.value = true
    await getExec().then((res : UniCloudDBGetResult) => {
      const data = res.data
      const count = res.count

      isEnded.value = (count != null) ? (pagination.value.current * pagination.value.size >= count) : (data.length < props.pageSize)
      hasMore.value = !isEnded

      if (props.getcount && count != null) {
        pagination.value.count = count
      }

      _dispatchEvent(EVENT_LOAD, data)

      if (loadAfterClear || props.pageData == PAGE_MODE_REPLACE) {
        dataList.value = data
      } else {
        dataList.value.push(...data)
      }

      options?.success?.(res)
    }).catch((err : any | null) => {
      _requestFail(err, null)
      options?.fail?.(err)
    }).then(() => {
      loading.value = false
      options?.complete?.()
    }, () => {
      loading.value = false
      options?.complete?.()
    })
  }

  const add = (value : UTSJSONObject, options : UniCloudDBComponentAddOptions) => {
    _needLoading(options.needLoading, options.loadingTitle)
    const db = uniCloud.databaseForJQL()
    db.collection(_getMainCollection()).add(value).then<void>((res : UniCloudDBAddResult) => {
      options.success?.(res)
      _isShowToast(options.showToast ?? false, options.toastTitle ?? 'add success')
    }).catch((err) => {
      _requestFail(err, options.fail)
    }).then(() => {
      _requestComplete(options.complete, options.needLoading)
    }, () => {
      _requestComplete(options.complete, options.needLoading)
    })
  }

  const update = (id : string, value : UTSJSONObject, options : UniCloudDBComponentUpdateOptions) => {
    if (options.needConfirm == true) {
      uni.showModal({
        title: options.confirmTitle,
        content: options.confirmContent,
        showCancel: true,
        success: (res) => {
          if (res.confirm) {
            _update(id, value, options)
          }
        }
      })
    } else {
      _update(id, value, options)
    }
  }

  const remove = (id : any, options : UniCloudDBComponentRemoveOptions) => {
    const ids = Array.isArray(id) ? (id as Array<any>) : [id]
    if (options.needConfirm == true) {
      uni.showModal({
        title: options.confirmTitle,
        content: options.confirmContent,
        showCancel: true,
        success: (res) => {
          if (res.confirm) {
            _remove(ids, options)
          }
        }
      })
    } else {
      _remove(ids, options)
    }
  }

  const _update = (id : string, value : UTSJSONObject, options : UniCloudDBComponentUpdateOptions) => {
    _needLoading(options.needLoading, options.loadingTitle)
    const db = uniCloud.databaseForJQL()
    db.collection(_getMainCollection()).doc(id).update(value).then((res) => {
      options.success?.(res)
      _isShowToast(options.showToast ?? false, options.toastTitle ?? 'update success')
    }).catch((err : any | null) => {
      _requestFail(err, options.fail)
    }).then(() => {
      _requestComplete(options.complete, options.needLoading)
    }, () => {
      _requestComplete(options.complete, options.needLoading)
    })
  }

  const _remove = (ids : Array<any>, options : UniCloudDBComponentRemoveOptions) => {
    _needLoading(options.needLoading, options.loadingTitle)
    const db = uniCloud.databaseForJQL()
    const dbCommand = db.command
    db.collection(_getMainCollection()).where({
      _id: dbCommand.in(ids)
    }).remove().then((res) => {
      options.success?.(res)
      if (props.pageData == PAGE_MODE_REPLACE) {
        refresh()
      } else {
        _removeData(ids)
      }
    }).catch((err : any | null) => {
      _requestFail(err, options.fail)
    }).then(() => {
      _requestComplete(options.complete, options.needLoading)
    }, () => {
      _requestComplete(options.complete, options.needLoading)
    })
  }

  const _removeData = (ids : Array<any>) => {
    const il = ids.slice(0)
    const dl = dataList.value
    for (let i = dl.length - 1; i >= 0; i--) {
      const index = il.indexOf(dl[i]['_id'])
      if (index >= 0) {
        dl.splice(i, 1)
        il.splice(index, 1)
      }
    }
  }

  const _isShowToast = (showToast : boolean, title : string) => {
    if (showToast == true) {
      uni.showToast({
        title: title
      })
    }
  }

  const _needLoading = (needLoading ?: boolean | null, title ?: string | null) => {
    if (needLoading == true) {
      uni.showLoading({
        mask: true,
        title: title ?? ''
      })
    }
  }

  const _requestFail = (err ?: any | null, callback ?: FailCallback | null) => {
    callback?.(err)
    error.value = err as UniCloudError
    emit(EVENT_ERROR, err)
  }

  const _requestComplete = (callback ?: CompleteCallback | null, needLoading ?: boolean | null) => {
    callback?.()
    if (needLoading == true) {
      uni.hideLoading()
    }
  }

  const getExec = () : Promise<UniCloudDBGetResult> => {
    return getTemp()
  }

  const getTemp = () : Promise<UniCloudDBGetResult> => {
    let db = uniCloud.databaseForJQL()

    let collection = Array.isArray(props.collection) ? db.collection(...(props.collection as Array<any>)) : db.collection(props.collection)

    let filter : UniCloudDBFilter | null = null
    if (props.foreignKey.length > 0) {
      filter = collection.foreignKey(props.foreignKey)
    }

    if (typeof props.where == 'string') {
      const whereString = props.where as string
      if (whereString.length > 0) {
        filter = (filter != null) ? filter.where(props.where) : collection.where(props.where)
      }
    } else if (typeof props.where == 'object') {
      filter = (filter != null) ? filter.where(props.where) : collection.where(props.where)
    }

    let query : UniCloudDBQuery | null = null
    if (props.field.length > 0) {
      query = (filter != null) ? filter.field(props.field) : collection.field(props.field)
    }
    if (props.groupby.length > 0) {
      if (query != null) {
        query = query.groupBy(props.groupby)
      } else if (filter != null) {
        query = filter.groupBy(props.groupby)
      }
    }
    if (props.groupField.length > 0) {
      if (query != null) {
        query = query.groupField(props.groupField)
      } else if (filter != null) {
        query = filter.groupField(props.groupField)
      }
    }
    if (props.distinct == true) {
      if (query != null) {
        query = query.distinct(props.field)
      } else if (filter != null) {
        query = filter.distinct(props.field)
      }
    }
    if (props.orderby.length > 0) {
      if (query != null) {
        query = query.orderBy(props.orderby)
      } else if (filter != null) {
        query = filter.orderBy(props.orderby)
      } else {
        query = collection.orderBy(props.orderby)
      }
    }

    const size = pagination.value.size
    const current = pagination.value.current
    const skipSize = size * (current - 1)
    if (query != null) {
      query = query.skip(skipSize).limit(size)
    } else if (filter != null) {
      query = filter.skip(skipSize).limit(size)
    } else {
      query = collection.skip(skipSize).limit(size)
    }

    const getOptions = {}
    const treeOptions = {
      limitLevel: props.limitlevel,
      startWith: props.startwith
    }
    if (props.getcount == true) {
      getOptions['getCount'] = props.getcount
    }
    if (typeof props.gettree == 'string') {
      const getTreeString = props.gettree as string
      if (getTreeString.length > 0) {
        getOptions['getTree'] = treeOptions
      }
    } else if (typeof props.gettree == 'object') {
      getOptions['getTree'] = treeOptions
    }
    if (props.gettreepath == true) {
      getOptions['getTreePath'] = treeOptions
    }

    return query.get(getOptions)
  }

  const _getMainCollection = () : string => {
    if (typeof props.collection === 'string') {
      return (props.collection as string).split(',')[0]
    }

    if (Array.isArray(props.collection)) {
      const array = props.collection as Array<any>
      const index = array[0] as UTSJSONObject
      const collection = index.getString('$db[0].$param[0]')
      return collection ?? ''
    }

    return ''
  }

  const _dispatchEvent = (type : string, data : Array<UTSJSONObject>) => {
    emit(type, data, isEnded, {
      current: pagination.value.current,
      size: pagination.value.size,
      count: pagination.value.count
    })
  }

  onMounted(() => {
    const proxy = getCurrentInstance()?.proxy
    if (proxy?.$el) {
      let udb = (proxy.$el as unknown as UniCloudDBElement)
      udb.onLoadData = (options : any) => {
        loadData(options)
      }
      udb.onLoadMore = () => {
        loadMore()
      }
      udb.onAdd = (value : any, options: any) => {
        add(value, options)
      }
      udb.onRemove = (id : any, options: any) => {
        remove(id, options)
      }
      udb.onUpdate = (id : string, value : any, options: any) => {
        update(id, value, options)
      }
    }
    // const uniCloudDBElement = this.$refs['UniCloudDB'] as UniCloudDBElement
    // uniCloudDBElement.dataList = this.dataList;
  })

  watch(
    () : any => [
      props.pageCurrent,
      props.pageSize,
      props.collection,
      props.field,
      props.getcount,
      props.orderby,
      props.where,
      props.groupby,
      props.groupField,
      props.distinct
    ],
    (newValue : Array<any>, oldValue : Array<any>) => {
      pagination.value.size = props.pageSize
      if (newValue[0] !== oldValue[0]) {
        pagination.value.current = props.pageCurrent
      }

      if (props.loadtime == LOAD_MODE_MANUAL) {
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
        clear()
        reset()
      }

      get(null)
    }
  )

  const initData = () => {
    if (!props.manual && props.loadtime == LOAD_MODE_AUTO && dataList.value.length == 0) {
      if (typeof props.collection == 'string') {
        const collectionString = props.collection as string
        if (collectionString.length == 0) {
          return
        }
      } else if (Array.isArray(props.collection)) {
        const collectionArray = props.collection as Array<any>
        if (collectionArray.length == 0) {
          return
        }
      }
      get(null)
    }
  }

  pagination.value.current = props.pageCurrent
  pagination.value.size = props.pageSize

  initData()
</script>