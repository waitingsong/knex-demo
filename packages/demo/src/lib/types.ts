
export interface OnQueryData {
  __knexUid: string // "__knexUid3"
  __knexTxId: undefined | string // "trx2"
  __knexQueryUid?: string // 'mXxtvuJLHkZI816UZic57'
  bindings: unknown[] | undefined
  cancelOnTimeout?: boolean
  method?: string // 'select', 'raw'
  options?: Record<string, unknown>
  sql: string // 'select *....', 'COMMIT;'
  timeout?: boolean
}

export interface OnQueryRespRaw <T = unknown> {
  __knexUid: string // '__knexUid3'
  __knexTxId: string | undefined // 'trx2'
  __knexQueryUid?: string // 'vFFCb1Utd8Aosbumkfm_v'
  bindings: unknown[] | undefined
  cancelOnTimeout?: boolean
  method?: string // 'select', 'raw'
  options?: Record<string, unknown>
  queryContext: unknown
  response: QueryResponse<T>
  returning?: string
  sql: string // 'select * from "tb_user" where "uid" = $1 for update'
  timeout?: boolean
}
export interface QueryResponse <T = unknown> {
  _parsers: unknown[] | unknown
  _types: unknown
  command: string // 'SELECT', 'DROP'
  fields: Record<string, string | number>[]
  oid?: unknown
  rowAsArray: boolean
  rowCount: number | null // 1
  RowCtor: unknown
  rows: Record<string, T>[]
}

export interface OnQueryErrorData {
  __knexUid: string // "__knexUid2"
  __knexTxId: undefined | string
  __knexQueryUid: string | undefined // 'rhS1Gw1-uA79HFgn1Ob9g'
  bindings: unknown[]
  cancelOnTimeout: boolean
  method: string
  options: Record<string, unknown>
  queryContext: unknown
  sql: string // 'select "*x" from "tb_user"'
  timeout: boolean
}

export interface OnQueryErrorErr {
  code: string // '42703'
  column: unknown
  constraint: unknown
  dataType: unknown
  detail: unknown
  file: string // 'parse_relation.c'
  hint: unknown
  internalPosition: unknown
  internalQuery: unknown
  length: number
  line: string // '3514'
  message?: string
  name: 'error'
  position: string // '8'
  routine: string // 'errorMissingColumn'
  schema: unknown
  severity: string // 'ERROR'
  stack?: string
  table: unknown
  where: unknown
}

