export type GridWrite = {
  property: string
  value: string
  cell?: number
}

export type GridCase = {
  property: string
  note: string
  values: string[]
  title?: string
  cell?: number
  setup?: GridWrite[]
  before?: GridWrite[]
  after?: GridWrite[]
  read?: string[]
  invalid?: string[]
}
