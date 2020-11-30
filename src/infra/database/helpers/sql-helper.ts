import { existsSync, mkdirSync } from 'fs'
import { createPool, Pool } from 'mysql2/promise'
import { open, Database } from 'sqlite'
import sqlite3 from 'sqlite3'
import path from 'path'

class SqlConnection {
  private client1: Pool
  private client2: Database<sqlite3.Database, sqlite3.Statement>

  async connect () {
    if (process.env.MODE === 'production') {
      this.client1 = createPool({
        host: process.env.HOST,
        port: 3306,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        waitForConnections: true
      })
    } else {
      const dir = existsSync(path.resolve(__dirname, '..', 'sqlite'))
      if (!dir) {
        mkdirSync(path.resolve(__dirname, '..', 'sqlite'))
      }
      this.client2 = await open({
        driver: sqlite3.Database,
        filename: path.resolve(__dirname, '..', 'sqlite', 'development.sqlite')
      })
      await this.client2.migrate({
        migrationsPath: path.resolve(__dirname, '..', 'sql')
      })
    }
  }

  async disconnect () {
    if (this.client1.getConnection()) {
      await this.client1.end()
      this.client1 = null
    }
    if (this.client2.getDatabaseInstance()) {
      await this.client2.close()
      this.client2 = null
    }
  }

  async insertOne (sql: string, args?: Array<any>) {
    if (this.client1 && process.env.MODE === 'production') {
      const row = await this.client1.query(sql, args)
      return row
    }
    if (this.client2 && !process.env.MODE) {
      const row = await this.client2.run(sql, args)
      return row.lastID
    }
  }

  async selectOne (sql: string, args?: Array<any>) {
    if (this.client1 && process.env.MODE === 'production') {
      const row = await this.client1.query(sql, args)
      return row[0][0]
    }
    if (this.client2 && !process.env.MODE) {
      const row = await this.client2.get(sql, args)
      return row
    }
  }

  async delete (sql: string, args?: Array<any>) {
    if (this.client1 && process.env.MODE === 'production') {
      await this.client1.query(sql, args)
    }
    if (this.client2 && !process.env.MODE) {
      await this.client2.run(sql, args)
    }
  }
}

export const SqlHelper = new SqlConnection()
