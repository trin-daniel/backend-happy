import { existsSync, mkdirSync } from 'fs'
import { createPool, Pool } from 'mysql2/promise'
import { open, Database } from 'sqlite'
import sqlite3 from 'sqlite3'
import path from 'path'

class SqlConnection {
  private client1: Pool
  private client2: Database<sqlite3.Database, sqlite3.Statement>

  async createDir (): Promise<void> {
    const dir = existsSync(path.resolve(__dirname, '..', 'sqlite'))
    if (!dir) {
      mkdirSync(path.resolve(__dirname, '..', 'sqlite'))
    }
  }

  async connect (): Promise<void> {
    switch (process.env.MODE) {
      case 'production':
        this.client1 = createPool({
          host: process.env.HOST,
          port: 3306,
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
          waitForConnections: true
        })
        break
      default:
        await this.createDir()
        this.client2 = await open({
          driver: sqlite3.Database,
          filename: path.resolve(__dirname, '..', 'sqlite', 'development.sqlite')
        })
        await this.client2.migrate({
          migrationsPath: path.resolve(__dirname, '..', 'sql')
        })
        break
    }
  }

  async disconnect (): Promise<void> {
    switch (process.env.MODE) {
      case 'production':
        await this.client1.end()
        break
      default:
        await this.client2.close()
        break
    }
  }

  async insertOne (sql: string, args?: Array<any>) {
    switch (process.env.MODE) {
      case 'production':
        const row = await this.client1.query(sql, args)
        return row
      default:
        const rowDev = await this.client2.run(sql, args)
        return rowDev
    }
  }

  async selectOne (sql: string, args?: Array<any>) {
    switch (process.env.MODE) {
      case 'production':
        const row = await this.client1.query(sql, args)
        return row[0][0]
      default:
        const rowDev = await this.client2.get(sql, args)
        return rowDev
    }
  }

  async selectAll (sql: string, args?: Array<any>) {
    switch (process.env.MODE) {
      case 'production':
        const row = await this.client1.query(sql, args)
        return row[0]
      default:
        const rowDev = await this.client2.all(sql, args)
        return rowDev
    }
  }

  async delete (sql: string): Promise<void> {
    switch (process.env.MODE) {
      case 'production':
        await this.client1.query(sql)
        break
      default:
        await this.client2.run(sql)
        break
    }
  }
}

export const SqlHelper = new SqlConnection()
