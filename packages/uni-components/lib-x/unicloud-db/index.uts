type SuccessCallback<T> = (res : T | null) => void | null
type FailCallback = (err : any | null) => void | null
type CompleteCallback = () => void | null

export type MixinDatacomPaginationType = {
  current : number,
  size : number,
  count : number
}

export type MixinDatacomGetOptions = {
  collection ?: UTSJSONObject,
  field ?: string,
  orderBy ?: string,
  where ?: any,
  pageData ?: string,
  pageCurrent ?: number,
  pageSize ?: number,
  getCount ?: boolean,
  getTree ?: any,
  getTreePath ?: UTSJSONObject,
  startWith ?: string,
  limitLevel ?: number,
  groupBy ?: string,
  groupField ?: string,
  distinct ?: boolean,
  pageIndistinct ?: boolean,
  foreignKey ?: string,
  loadtime ?: string,
  manual ?: boolean
}

export type MixinDatacomEasyGetOptions = {
  success ?: SuccessCallback<UniCloudDBGetResult>,
  fail ?: FailCallback,
  complete ?: CompleteCallback,
}

export const mixinDatacom = defineMixin({
  slots: Object as SlotsType<{
    default : {
      data : Array<UTSJSONObject>,
      loading : boolean,
      hasMore : boolean,
      pagination : MixinDatacomPaginationType,
      error : UniCloudError | null
    }
  }>,
  props: {
    localdata: {
      type: Array as PropType<Array<UTSJSONObject>>,
      default: [] as Array<UTSJSONObject>
    },
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
      mixinDatacomResData: [] as Array<UTSJSONObject>, // 请求返回的数据，调用 loadData 后会更新
      mixinDatacomLoading: false, // 网络请求状态
      mixinDatacomHasMore: false, // 是否有更多数据
      mixinDatacomPage: {
        current: 1,
        size: 20,
        count: 0,
      } as MixinDatacomPaginationType, // 分页信息，详情见 created 生命周期
      mixinDatacomError: null as UniCloudError | null, // 请求出错时的错误消息
    }
  },
  created() {
    this.mixinDatacomPage.current = this.pageCurrent
    this.mixinDatacomPage.size = this.pageSize

    const PROPS_NAME = ['', '', 'collection', 'field', 'getcount', 'orderby', 'where', 'groupby', 'groupField', 'distinct']

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
        this.mixinDatacomPage.size = this.pageSize
        if (newValue[0] !== oldValue[0]) {
          this.mixinDatacomPage.current = this.pageCurrent
        }

        let needReset = false
        let changed : Array<string> = []
        for (let i = 2; i < newValue.length; i++) {
          if (newValue[i] !== oldValue[i]) {
            needReset = true
            changed.push(PROPS_NAME[i])
          }
        }

        this.onMixinDatacomPropsChange(needReset, changed)
      }
    )
  },
  methods: {
    // props发生变化时被调用，在组件中覆盖此方法
    // 非 pageCurrent，pageSize 改变时 needReset=true,需要重置数据
    // changed，发生变化的属性名，类型为Array，例如 ['collection', 'action']
    onMixinDatacomPropsChange(_ : boolean, changed : Array<string>) {
    },
    mixinDatacomEasyGet(options ?: MixinDatacomEasyGetOptions) {
      if (this.mixinDatacomLoading) {
        return
      }

      this.mixinDatacomLoading = true
      this.mixinDatacomError = null

      this.mixinDatacomGet(null).then((res : UniCloudDBGetResult) => {
        const data = res.data
        const count = res.count

        if (this.getcount && count != null) {
          this.mixinDatacomPage.count = count
        }

        this.mixinDatacomHasMore = !((count != null) ? (this.mixinDatacomPage.current * this.mixinDatacomPage.size >= count) : (data.length < this.pageSize))
        this.mixinDatacomResData = data

        options?.success?.(res)
      }).catch((err : any | null) => {
        this.mixinDatacomError = err as UniCloudError
        options?.fail?.(err)
      }).then(() => {
        this.mixinDatacomLoading = false
        options?.complete?.()
      }, () => {
        this.mixinDatacomLoading = false
        options?.complete?.()
      })
    },
    mixinDatacomGet(options: MixinDatacomGetOptions | null) : Promise<UniCloudDBGetResult> {
      let db = uniCloud.databaseForJQL()

      let collection = Array.isArray(this.collection) ? db.collection(...(this.collection as Array<any>)) : db.collection(this.collection)

      let filter : UniCloudDBFilter | null = null
      if (this.foreignKey.length > 0) {
        filter = collection.foreignKey(this.foreignKey)
      }

      const where : any = options?.where ?? this.where
      if (typeof where == 'string') {
        const whereString = where as string
        if (whereString.length > 0) {
          filter = (filter != null) ? filter.where(where) : collection.where(where)
        }
      } else {
        filter = (filter != null) ? filter.where(where) : collection.where(where)
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

      const size = this.mixinDatacomPage.size
      const current = this.mixinDatacomPage.current
      if (query != null) {
        query = query.skip(size * (current - 1)).limit(size)
      } else if (filter != null) {
        query = filter.skip(size * (current - 1)).limit(size)
      } else {
        query = collection.skip(size * (current - 1)).limit(size)
      }

      const getOptions = {} as UTSJSONObject
      const treeOptions = {
        limitLevel: this.limitlevel,
        startWith: this.startwith
      }
      const getCount : boolean = options?.getCount ?? this.getcount
      if (this.getcount == true) {
        getOptions['getCount'] = getCount
      }

      const getTree : any = options?.getTree ?? this.gettree
      if (typeof getTree == 'string') {
        const getTreeString = getTree as string
        if (getTreeString.length > 0) {
          getOptions['getTree'] = treeOptions
        }
      } else if (typeof getTree == 'object') {
        getOptions['getTree'] = treeOptions
      } else {
        getOptions['getTree'] = getTree
      }

      const getTreePath = options?.getTreePath ?? this.gettreepath
      if (typeof getTreePath == 'string') {
        const getTreePathString = getTreePath as string
        if (getTreePathString.length > 0) {
          getOptions['getTreePath'] = getTreePath
        }
      } else {
        getOptions['getTreePath'] = getTreePath
      }

      return query.get(getOptions)
    }
  }
})