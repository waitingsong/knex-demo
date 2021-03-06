import { knex, Knex } from 'knex'


export const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : 'localhost',
    port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
    database: process.env.POSTGRES_DB ? process.env.POSTGRES_DB : 'db_ci_test',
    user: process.env.POSTGRES_USER ? process.env.POSTGRES_USER : 'postgres',
    password: process.env.POSTGRES_PASSWORD ? process.env.POSTGRES_PASSWORD : 'postgres',
    requestTimeout: 3000,
  },
  acquireConnectionTimeout: 5000,
  asyncStackTraces: false,
  debug: false,
  pool: { min: 2, max: 10 },
}
export const inst = knex(config)

