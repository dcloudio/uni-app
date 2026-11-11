import { ref, reactive, computed, watch, nextTick } from 'vue'

export type PaginationType = {
  current : number,
  size : number,
  count : number
}

export type LoadMoreType = {
  contentdown : string,
  contentrefresh : string,
  contentnomore : string
}

export type SelectedItemType = {
  name : string,
  value : string,
}

export type GetCommandOptions = {
  collection ?: UTSJSONObject,
  field ?: string,
  orderby ?: string,
  where ?: any,
  pageData ?: string,
  pageCurrent ?: number,
  pageSize ?: number,
  getCount ?: boolean,
  getTree ?: any,
  getTreePath ?: UTSJSONObject,
  startwith ?: string,
  limitlevel ?: number,
  groupby ?: string,
  groupField ?: string,
  distinct ?: boolean,
  pageIndistinct ?: boolean,
  foreignKey ?: string,
  loadtime ?: string,
  manual ?: boolean
}

// dataPicker 属性定义，供页面/组件 defineProps 展开使用
export const dataPickerProps = {
  /**
   * @description 本地候选数据；数据项默认使用 text、value、children、disable 字段
   * @default []
   */
  localdata: {
    type: Array as PropType<Array<UTSJSONObject>>,
    default: [] as Array<UTSJSONObject>
  },
  /**
   * @description uniCloud 数据库集合名称，或表名数组
   * @default ""
   */
  collection: {
    type: [String, Object],
    default: ''
  },
  /**
   * @description JQL 查询字段，多个字段用 `,` 分割；需将值字段映射为 `value`、文字字段映射为 `text`
   * @default ""
   */
  field: {
    type: String,
    default: ''
  },
  /**
   * @description 排序字段及正序倒序设置
   * @default ""
   */
  orderby: {
    type: String,
    default: ''
  },
  /**
   * @description 查询条件
   * @default ""
   */
  where: {
    type: [String, Object],
    default: ''
  },
  /**
   * @description 多次加载结果的处理方式
   * @default "add"
   */
  pageData: {
    type: String,
    default: 'add'
  },
  /**
   * @description 当前页码
   * @default 1
   */
  pageCurrent: {
    type: Number,
    default: 1
  },
  /**
   * @description 每页数据条数
   * @default 20
   */
  pageSize: {
    type: Number,
    default: 20
  },
  /**
   * @description 是否返回总数
   * @default false
   */
  getcount: {
    type: Boolean,
    default: false
  },
  /**
   * @description 树形查询配置
   * @default ""
   */
  gettree: {
    type: [String, Object],
    default: ''
  },
  /**
   * @description 按节点路径回显的查询配置
   * @default ""
   */
  gettreepath: {
    type: [String, Object],
    default: ''
  },
  /**
   * @description 树形查询的起始条件
   * @default ""
   */
  startwith: {
    type: String,
    default: ''
  },
  /**
   * @description 最大级联层级
   * @default 10
   */
  limitlevel: {
    type: Number,
    default: 10
  },
  /**
   * @description 分组字段
   * @default ""
   */
  groupby: {
    type: String,
    default: ''
  },
  /**
   * @description 分组后返回的字段
   * @default ""
   */
  groupField: {
    type: String,
    default: ''
  },
  /**
   * @description 是否对查询字段去重
   * @default false
   */
  distinct: {
    type: Boolean,
    default: false
  },
  /**
   * @description 分页查询是否去重
   * @default false
   */
  pageIndistinct: {
    type: Boolean,
    default: false
  },
  /**
   * @description JQL 外键字段
   * @default ""
   */
  foreignKey: {
    type: String,
    default: ''
  },
  /**
   * @description 数据加载时机，默认自动加载
   * @default "auto"
   */
  loadtime: {
    type: String,
    default: 'auto'
  },
  /**
   * @description 是否手动加载数据
   * @default false
   */
  manual: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否预加载数据
   * @default false
   */
  preload: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否启用分布查询
   * @default true
   */
  stepSearh: {
    type: Boolean,
    default: true
  },
  /**
   * @description 分布查询的当前字段名称
   * @default ""
   */
  selfField: {
    type: String,
    default: ''
  },
  /**
   * @description 分布查询的父字段名称
   * @default ""
   */
  parentField: {
    type: String,
    default: ''
  },
  /**
   * @description 是否多选
   * @default false
   */
  multiple: {
    type: Boolean,
    default: false
  },
  /**
   * @description 当前值的兼容属性
   * @default ""
   */
  value: {
    type: [String, Object],
    default: ''
  },
  /**
   * @description v-model 绑定值
   * @default ""
   */
  modelValue: {
    type: [String, Object],
    default: ''
  },
  /**
   * @description 自定义节点文字字段和值字段，例如 { text: 'name', value: 'id' }
   */
  defaultProps: {
    type: Object as PropType<UTSJSONObject>,
  },
  /**
   * @description 层级 tab 未选择时的占位文字
   * @default ""
   */
  tabPlaceholder: {
    type: String,
    default: ''
  }
}

// dataPicker 组合式返回值类型
export type DataPickerInstance = {
  loading : boolean
  error : UniCloudError | null
  treeData : Array<UTSJSONObject>
  selectedIndex : number
  selectedNodes : Array<UTSJSONObject>
  selectedPages : Array<Array<UTSJSONObject>>
  selectedValue : string
  selectedPaths : Array<UTSJSONObject>
  pagination : PaginationType
  mappingTextName : string
  mappingValueName : string
  currentDataList : Array<UTSJSONObject>
  isLocalData : boolean
  isCloudData : boolean
  isCloudDataList : boolean
  isCloudDataTree : boolean
  dataValue : any
  hasCloudTreeData : boolean
  hasModelValue : boolean
  hasCloudDataValue : boolean
  onPropsChange : () => void
  onTabSelect : (index : number) => void
  onNodeClick : (nodeData : UTSJSONObject) => void
  getChangeNodes : () => Array<UTSJSONObject>
  onFinish : () => void
  emitNodeClick : (nodeData : UTSJSONObject) => void
  loadData : () => void
  loadLocalData : () => void
  loadCloudDataList : () => void
  loadCloudDataTree : () => void
  loadCloudDataNode : (nodeData : UTSJSONObject) => void
  loadCloudDataPath : () => void
}

// dataPicker props 参数类型
export type DataPickerPropsType = {
  localdata : Array<UTSJSONObject>
  collection : any
  field : string
  orderby : string
  where : any
  pageData : string
  pageCurrent : number
  pageSize : number
  getcount : boolean
  gettree : any
  gettreepath : any
  startwith : string
  limitlevel : number
  groupby : string
  groupField : string
  distinct : boolean
  pageIndistinct : boolean
  foreignKey : string
  loadtime : string
  manual : boolean
  preload : boolean
  stepSearh : boolean
  selfField : string
  parentField : string
  multiple : boolean
  value : any
  modelValue : any
  defaultProps : UTSJSONObject | null
  tabPlaceholder : string
}

// dataPicker 组合式逻辑，替换原 dataPicker mixin
export function useDataPicker(props : DataPickerPropsType) : DataPickerInstance {
  const loading = ref(false)
  const error = ref<UniCloudError | null>(null)
  const treeData = ref<Array<UTSJSONObject>>([])
  const selectedIndex = ref(0)
  const selectedNodes = ref<Array<UTSJSONObject>>([])
  const selectedPages = ref<Array<Array<UTSJSONObject>>>([])
  const selectedValue = ref('')
  const selectedPaths = ref<Array<UTSJSONObject>>([])
  const pagination = ref({
    current: 1,
    size: 20,
    count: 0
  } as PaginationType)

  function checkIsNotNull(value : any) : boolean {
    if (typeof value == 'string') {
      const valueString = value as string
      return (valueString.length > 0)
    } else if (value instanceof UTSJSONObject) {
      return true
    }
    return false
  }

  // 层级 tab 未选中时的占位节点，文字由外部 tabPlaceholder 属性传入
  function createDefaultSelectedNode() : UTSJSONObject {
    return {
      text: props.tabPlaceholder,
      value: ''
    } as UTSJSONObject
  }

  const mappingTextName = computed<string>(() : string => {
    return (props.defaultProps != null) ? ((props.defaultProps!['text'] as string) || 'text') : 'text'
  })
  const mappingValueName = computed<string>(() : string => {
    return (props.defaultProps != null) ? ((props.defaultProps!['value'] as string) || 'value') : 'value'
  })
  const currentDataList = computed<Array<UTSJSONObject>>(() : Array<UTSJSONObject> => {
    if (selectedIndex.value > selectedPages.value.length - 1) {
      return [] as Array<UTSJSONObject>
    }
    return selectedPages.value[selectedIndex.value]
  })
  const isLocalData = computed<boolean>(() : boolean => {
    return props.localdata.length > 0
  })
  const isCloudData = computed<boolean>(() : boolean => {
    return checkIsNotNull(props.collection)
  })
  const isCloudDataList = computed<boolean>(() : boolean => {
    return (isCloudData.value && (props.parentField.length == 0 && props.selfField.length == 0))
  })
  const isCloudDataTree = computed<boolean>(() : boolean => {
    return (isCloudData.value && props.parentField.length > 0 && props.selfField.length > 0)
  })
  const dataValue = computed<any>(() : any => {
    return hasModelValue.value ? props.modelValue : props.value
  })
  const hasCloudTreeData = computed<boolean>(() : boolean => {
    return treeData.value.length > 0
  })
  const hasModelValue = computed<boolean>(() : boolean => {
    if (typeof props.modelValue == 'string') {
      const valueString = props.modelValue as string
      return (valueString.length > 0)
    } else if (Array.isArray(props.modelValue)) {
      const valueArray = props.modelValue as Array<string>
      return (valueArray.length > 0)
    }
    return false
  })
  const hasCloudDataValue = computed<boolean>(() : boolean => {
    if (typeof dataValue.value == 'string') {
      const valueString = dataValue.value as string
      return (valueString.length > 0)
    }
    return false
  })

  function onPropsChange() {
    selectedIndex.value = 0
    treeData.value = []
    selectedNodes.value = []
    selectedPages.value = []
    selectedPaths.value = []

    // 加载数据
    nextTick(() => {
      loadData()
    })
  }

  function onTabSelect(index : number) {
    selectedIndex.value = index
  }

  function onNodeClick(nodeData : UTSJSONObject) {
    if (nodeData['disable'] as Boolean) {
      return
    }

    const isLeaf = checkIsLeafNode(nodeData)

    trimSelectedNodes(nodeData)

    dataPicker.emitNodeClick(nodeData)

    if (isLocalData.value) {
      if (isLeaf || !checkHasChildren(nodeData)) {
        dataPicker.onFinish()
      }
    } else if (isCloudDataList.value) {
      dataPicker.onFinish()
    } else if (isCloudDataTree.value) {
      if (isLeaf) {
        dataPicker.onFinish()
      } else if (!checkHasChildren(nodeData)) {
        // 尝试请求一次，如果没有返回数据标记为叶子节点
        loadCloudDataNode(nodeData)
      }
    }
  }

  function getChangeNodes() : Array<UTSJSONObject> {
    const nodes : Array<UTSJSONObject> = []
    selectedNodes.value.forEach((node : UTSJSONObject) => {
      const newNode : UTSJSONObject = {}
      newNode[mappingTextName.value] = node[mappingTextName.value]
      newNode[mappingValueName.value] = node[mappingValueName.value]
      nodes.push(newNode)
    })
    return nodes
  }

  function onFinish() { }

  function emitNodeClick(_nodeData : UTSJSONObject) { }

  // 加载数据(自动判定环境)
  function loadData() {
    error.value = null;
    if (isLocalData.value) {
      loadLocalData()
    } else if (isCloudDataList.value) {
      loadCloudDataList()
    } else if (isCloudDataTree.value) {
      loadCloudDataTree()
    }
  }

  // 加载本地数据
  function loadLocalData() {
    treeData.value = props.localdata
    // 优先回显已上次选择结果
    if (selectedPaths.value.length > 0) {
      pushSelectedTreeNodes(selectedPaths.value, treeData.value)
    } else {
      // 回显 props 的 value 属性
      if (Array.isArray(dataValue.value)) {
        const value = dataValue.value as Array<UTSJSONObject> || []
        selectedPaths.value = value.slice(0)
        pushSelectedTreeNodes(value, props.localdata)
      } else {
        pushSelectedNodes(props.localdata)
      }
    }
  }

  // 加载 Cloud 数据 (单列)
  function loadCloudDataList() {
    loadCloudData(null, (data : Array<UTSJSONObject>) => {
      treeData.value = data
      pushSelectedNodes(data)
    })
  }

  // 加载 Cloud 数据 (树形)
  function loadCloudDataTree() {
    let commandOptions = {
      field: cloudDataPostField(),
      where: cloudDataTreeWhere(),
      getTree: true
    } as GetCommandOptions
    if (checkIsNotNull(props.gettree)) {
      commandOptions.startwith = `${props.selfField}=='${dataValue.value as string}'`
    }
    loadCloudData(commandOptions, (data : Array<UTSJSONObject>) => {
      treeData.value = data
      if (selectedPaths.value.length > 0) {
        pushSelectedTreeNodes(selectedPaths.value, data)
      } else {
        pushSelectedNodes(data)
      }
    })
  }

  // 加载 Cloud 数据 (节点)
  function loadCloudDataNode(nodeData : UTSJSONObject) {
    const commandOptions = {
      field: cloudDataPostField(),
      where: cloudDataNodeWhere()
    } as GetCommandOptions
    loadCloudData(commandOptions, (data : Array<UTSJSONObject>) => {
      nodeData['children'] = data
      if (data.length == 0) {
        nodeData['isleaf'] = true
        dataPicker.onFinish()
      } else {
        pushSelectedNodes(data)
      }
    })
  }

  // 回显 Cloud Tree Path
  function loadCloudDataPath() {
    if (!hasCloudDataValue.value) {
      return
    }

    const command : GetCommandOptions = {}

    // 单列
    if (isCloudDataList.value) {
      // 根据 field's as value标识匹配 where 条件
      let where : Array<string> = [];
      let whereField = getForeignKeyByField();
      if (whereField.length > 0) {
        where.push(`${whereField} == '${dataValue.value as string}'`)
      }

      let whereString = where.join(' || ')
      if (checkIsNotNull(props.where)) {
        whereString = `(${props.where as string}) && (${whereString})`
      }

      command.field = cloudDataPostField()
      command.where = whereString
    }

    // 树形
    if (isCloudDataTree.value) {
      command.field = cloudDataPostField()
      command.getTreePath = {
        startWith: `${props.selfField}=='${dataValue.value as string}'`
      }
    }

    loadCloudData(command, (data : Array<UTSJSONObject>) => {
      extractTreePath(data, selectedPaths.value)
    })
  }

  function loadCloudData(options ?: GetCommandOptions, callback ?: ((data : Array<UTSJSONObject>) => void)) {
    error.value = null

    try {
      if(!uniCloud || !uniCloud.databaseForJQL()) {
        callback?.([])
        return
      }
    } catch (_) {
      callback?.([])
      return
    }

    if (loading.value) {
      return
    }
    loading.value = true

    getCommand(options).then((response : UniCloudDBGetResult) => {
      callback?.(response.data)
    }).catch((err : any | null) => {
      error.value = err as UniCloudError
    }).finally(() => {
      loading.value = false
    })
  }

  function cloudDataPostField() : string {
    let fields = [props.field];
    if (props.parentField.length > 0) {
      fields.push(`${props.parentField} as parent_value`)
    }
    return fields.join(',')
  }

  function cloudDataTreeWhere() : string {
    let result : Array<string> = []
    let selectedNodes2 = selectedNodes.value.length > 0 ? selectedNodes.value : selectedPaths.value
    let parentField = props.parentField
    if (parentField.length > 0) {
      result.push(`${parentField} == null || ${parentField} == ""`)
    }
    if (selectedNodes2.length > 0) {
      for (var i = 0; i < selectedNodes2.length - 1; i++) {
        const parentFieldValue = (selectedNodes2[i]['value'] as string) || ''
        result.push(`${parentField} == '${parentFieldValue}'`)
      }
    }

    let where : Array<string> = []
    if (checkIsNotNull(props.where)) {
      where.push(`(${props.where as string})`)
    }

    if (result.length > 0) {
      where.push(`(${result.join(' || ')})`)
    }

    return where.join(' && ')
  }

  function cloudDataNodeWhere() : string {
    const where : Array<string> = []
    if (selectedNodes.value.length > 0) {
      const value = (selectedNodes.value[selectedNodes.value.length - 1]['value'] as string) || ''
      where.push(`${props.parentField} == '${value}'`)
    }

    let whereString = where.join(' || ')
    if (checkIsNotNull(props.where)) {
      return `(${props.where as string}) && (${whereString})`
    }

    return whereString
  }

  function getWhereByForeignKey() : string {
    let result : Array<string> = []
    let whereField = getForeignKeyByField();
    if (whereField.length > 0) {
      result.push(`${whereField} == '${dataValue.value as string}'`)
    }

    if (checkIsNotNull(props.where)) {
      return `(${props.where}) && (${result.join(' || ')})`
    }

    return result.join(' || ')
  }

  function getForeignKeyByField() : string {
    const fields = props.field.split(',')
    let whereField = ''
    for (let i = 0; i < fields.length; i++) {
      const items = fields[i].split('as')
      if (items.length < 2) {
        continue
      }
      if (items[1].trim() === 'value') {
        whereField = items[0].trim()
        break
      }
    }
    return whereField
  }

  function getCommand(options ?: GetCommandOptions) : Promise<UniCloudDBGetResult> {
    let db = uniCloud.databaseForJQL()

    let collection = Array.isArray(props.collection) ? db.collection(...(props.collection as Array<any>)) : db.collection(props.collection)

    let filter : UniCloudDBFilter | null = null
    if (props.foreignKey.length > 0) {
      filter = collection.foreignKey(props.foreignKey)
    }

    const where : any = options?.where ?? props.where
    if (typeof where == 'string') {
      const whereString = where as string
      if (whereString.length > 0) {
        filter = (filter != null) ? filter.where(where) : collection.where(where)
      }
    } else {
      filter = (filter != null) ? filter.where(where) : collection.where(where)
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
      }
    }

    const size = pagination.value.size
    const current = pagination.value.current
    if (query != null) {
      query = query.skip(size * (current - 1)).limit(size)
    } else if (filter != null) {
      query = filter.skip(size * (current - 1)).limit(size)
    } else {
      query = collection.skip(size * (current - 1)).limit(size)
    }

    const getOptions = {}
    const treeOptions = {
      limitLevel: props.limitlevel,
      startWith: options?.startwith ?? props.startwith
    }
    if (props.getcount == true) {
      getOptions['getCount'] = props.getcount
    }

    const getTree : any = options?.getTree ?? props.gettree
    if (typeof getTree == 'string') {
      const getTreeString = getTree as string
      if (getTreeString.length > 0) {
        getOptions['getTree'] = treeOptions
      }
    } else if (typeof getTree == 'object') {
      getOptions['getTree'] = treeOptions
    } else {
      getOptions['getTree'] = treeOptions
    }

    const getTreePath = options?.getTreePath ?? props.gettreepath
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

  function checkIsLeafNode(nodeData : UTSJSONObject) : boolean {
    if (selectedIndex.value >= props.limitlevel) {
      return true
    }

    if (nodeData['isleaf'] as Boolean) {
      return true
    }

    return false
  }

  function checkHasChildren(nodeData : UTSJSONObject) : boolean {
    const children = (nodeData['children'] as Array<any>) || ([] as Array<any>)
    return children.length > 0
  }

  function pushSelectedNodes(nodes : Array<UTSJSONObject>) {
    selectedNodes.value.push(createDefaultSelectedNode())
    selectedPages.value.push(nodes)
    selectedIndex.value = selectedPages.value.length - 1
  }

  function trimSelectedNodes(nodeData : UTSJSONObject) {
    selectedNodes.value.splice(selectedIndex.value)
    selectedNodes.value.push(nodeData)

    if (selectedPages.value.length > 0) {
      selectedPages.value.splice(selectedIndex.value + 1)
    }

    const children = (nodeData['children'] as Array<UTSJSONObject>) || ([] as Array<UTSJSONObject>)
    if (children.length > 0) {
      selectedNodes.value.push(createDefaultSelectedNode())
      selectedPages.value.push(children)
    }

    selectedIndex.value = selectedPages.value.length - 1
  }

  function pushSelectedTreeNodes(paths : Array<UTSJSONObject>, nodes : Array<UTSJSONObject>) {
    let children : Array<UTSJSONObject> = nodes
    paths.forEach((node : UTSJSONObject) => {
      const findNode = children.find((item : UTSJSONObject) : boolean => {
        return (item[mappingValueName.value] == node[mappingValueName.value])
      })
      if (findNode != null) {
        selectedPages.value.push(children)
        selectedNodes.value.push(node)
        children = (findNode['children'] as Array<UTSJSONObject>) || ([] as Array<UTSJSONObject>)
      }
    })
    selectedIndex.value = selectedPages.value.length - 1
  }

  function extractTreePath(nodes : Array<UTSJSONObject>, result : Array<UTSJSONObject>) {
    if (nodes.length == 0) {
      return
    }

    const node = nodes[0]
    result.push(node)

    const children = node['children'] as Array<UTSJSONObject>
    if (Array.isArray(children) && children!.length > 0) {
      extractTreePath(children!, result)
    }
  }

  const dataPicker : DataPickerInstance = reactive({
    loading: loading,
    error: error,
    treeData: treeData,
    selectedIndex: selectedIndex,
    selectedNodes: selectedNodes,
    selectedPages: selectedPages,
    selectedValue: selectedValue,
    selectedPaths: selectedPaths,
    pagination: pagination,
    mappingTextName: mappingTextName,
    mappingValueName: mappingValueName,
    currentDataList: currentDataList,
    isLocalData: isLocalData,
    isCloudData: isCloudData,
    isCloudDataList: isCloudDataList,
    isCloudDataTree: isCloudDataTree,
    dataValue: dataValue,
    hasCloudTreeData: hasCloudTreeData,
    hasModelValue: hasModelValue,
    hasCloudDataValue: hasCloudDataValue,
    onPropsChange: onPropsChange,
    onTabSelect: onTabSelect,
    onNodeClick: onNodeClick,
    getChangeNodes: getChangeNodes,
    onFinish: onFinish,
    emitNodeClick: emitNodeClick,
    loadData: loadData,
    loadLocalData: loadLocalData,
    loadCloudDataList: loadCloudDataList,
    loadCloudDataTree: loadCloudDataTree,
    loadCloudDataNode: loadCloudDataNode,
    loadCloudDataPath: loadCloudDataPath
  }) as DataPickerInstance

  pagination.value.current = props.pageCurrent
  pagination.value.size = props.pageSize

  watch(
    () : Array<any> => [
      props.pageCurrent,
      props.pageSize,
      props.localdata,
      props.value,
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

      dataPicker.onPropsChange()
    }
  )

  return dataPicker
}
