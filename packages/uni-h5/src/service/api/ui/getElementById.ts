import { defineSyncApi } from '@dcloudio/uni-api'

type GetElementById = (id: string) => Element | null

export const getElementById = defineSyncApi<GetElementById>(
  'getElementById',
  (id: string) => {
    const uniPageBody = document.querySelector('uni-page-body')
    return uniPageBody ? uniPageBody.querySelector(`#${id}`) : null
  }
)
