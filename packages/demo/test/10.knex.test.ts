import { basename } from '@waiting/shared-core'

import {
  OnQueryData,
  OnQueryErrorData,
  OnQueryErrorErr,
  OnQueryRespRaw,
  QueryResponse,
} from '../src/index'

import { inst } from './test.config'

// eslint-disable-next-line import/order
import assert = require('power-assert')


const filename = basename(__filename)

describe(filename, () => {

  after(async () => {
    await inst.destroy()
  })

  describe('Should read table with tables param in object works', () => {
    it('tb_user', async () => {
      const knex = inst
      const trx = await knex.transaction()
      await knex('tb_user')
        .transacting(trx)
        .forUpdate()
        .select('*')
        .where('uid', 1)
        .on('query', (data: OnQueryData) => {
          console.log('01:', data.__knexTxId)
          assert(data.__knexTxId) // 'trx2'
        })
        .then(async (rows) => {
          await trx.commit()
          return rows
        })

      await knex('tb_user_ext')
        .select('*')
        .on('query', (data: OnQueryData) => {
          console.log('02:', data.__knexTxId)
          assert(! data.__knexTxId)
        })

    })

  })
})

