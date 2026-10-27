export const COLLECTION_NAME = 'opendb-contacts'

export type GenderType = {
  text : string,
  value : number,
}

export const GenderList = [
  {
    text: "未知",
    value: 0
  },
  {
    text: "男",
    value: 1
  },
  {
    text: "女",
    value: 2
  },
] as GenderType[]

export const UNICLOUD_DB_CONTACTS_ADD = 'unicloud-db-contacts-add'
export const UNICLOUD_DB_CONTACTS_UPDATE = 'unicloud-db-contacts-update'
export const UNICLOUD_DB_CONTACTS_DELETE = 'unicloud-db-contacts-delete'
