import { Knex } from 'knex'

import { inst } from './test.config'
import { UserDo, UserExtDo } from './test.model'

// eslint-disable-next-line import/order
import assert = require('power-assert')


type TableName = string

export async function dropTables(tbs: readonly string[]): Promise<void> {
  for await (const tb of tbs) {
    // await dbh.schema.dropTableIfExists(tb).then()
    await inst.raw(`DROP TABLE IF EXISTS "${tb}" CASCADE;`).then()
  }
}

export async function initDb(): Promise<void> {

  await dropTables(['tb_user', 'tb_user_ext'])

  const iso = await getTransactionIsolation(inst)
  console.log(`transaction_isolation: ${iso}`)
  await setTimeZone(inst, 'Asia/Chongqing') // 'UTC'

  await initTable()
  await initUser()
  await initUserExt()
  // await inst.destroy()
}

async function initTable(): Promise<void> {
  await inst.schema
    .createTable('tb_user', (tb) => {
      tb.increments('uid').primary()
      tb.string('name', 30)
      tb.timestamp('ctime', { useTz: false })
    })
    .createTable('tb_user_ext', (tb) => {
      tb.integer('uid').primary()
      tb.foreign('uid')
        .references('tb_user.uid') //
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tb.integer('age')
      tb.string('address', 255)
    })
    .catch((err: Error) => {
      assert(false, err.message)
    })

}


async function initUser(): Promise<void> {

  // insert
  await inst('tb_user')
    .insert([
      { name: 'user1', ctime: new Date() }, // ms
      {
        name: 'user2',
        ctime: 'now()', // us
      },
    ])
    .returning('*')
    .then((rows) => {
      validateUserRows(rows)
      return rows
    })
    .catch((err: Error) => {
      assert(false, err.message)
    })

}

export function validateUserRows(rows: Partial<UserDo>[]): void {
  assert(Array.isArray(rows) && rows.length > 0)

  rows.forEach((row) => {
    assert(row && row.uid)
    assert(typeof row.ctime === 'object')

    switch (row.uid) {
      case 1:
        assert(row.name === 'user1', JSON.stringify(row))
        break
      case 2:
        assert(row.name === 'user2', JSON.stringify(row))
        break
      default:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        assert(false, `Should row.uid be 1 or 2, but got ${row.uid}`)
        break
    }
  })
}

async function initUserExt(): Promise<void> {

  // insert
  await inst('tb_user_ext')
    .insert([
      { uid: 1, age: 10, address: 'address1' },
      { uid: 2, age: 10, address: 'address1' },
    ])
    .returning('*')
    .then((rows) => {
      validateUserExtRows(rows)
      return rows
    })
    .catch((err: Error) => {
      assert(false, err.message)
    })

  const countRes = await inst('tb_user_ext').count().then()
  assert(
    countRes && countRes[0] && countRes[0].count === '2',
    'Should count be "2"',
  )

  // validate insert result
  await inst('tb_user_ext').select('*')
  // await ref_tb_user_ext().select('*')
    .then((rows) => {
      validateUserExtRows(rows)
      return rows
    })
    .catch((err: Error) => {
      assert(false, err.message)
    })

}

export function validateUserExtRows(rows: Partial<UserExtDo>[]): void {
  assert(Array.isArray(rows) && rows.length > 0)

  rows.forEach((row) => {
    assert(row && row.uid)

    switch (row.uid) {
      case 1:
        assert(row.age === 10, JSON.stringify(row))
        break
      case 2:
        assert(row.age === 10, JSON.stringify(row))
        break
      default:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        assert(false, `Should row.uid be 1 or 2, but got ${row.uid}`)
        break
    }
  })
}


async function getTransactionIsolation(dbh: Knex): Promise<string> {
  return await dbh.raw('SHOW TRANSACTION ISOLATION LEVEL')
    .then((rows) => {
      return rows.rows[0] ? rows.rows[0].transaction_isolation : 'N/A'
    })
}

async function setTimeZone(dbh: Knex, zone: string): Promise<string> {
  // available select  pg_timezone_names()
  await dbh.raw(`SET TIME ZONE '${zone}'`)
    .then((rows) => {
      return rows.rows[0] ? rows.rows[0].transaction_isolation : 'N/A'
    })
  return await dbh.raw('SHOW TIME ZONE')
    .then((rows) => {
      return rows.rows[0] ? rows.rows[0].TimeZone : 'N/A'
    })
}

