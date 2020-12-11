import { createPool, Pool } from 'mysql2/promise'

class SqlConnection {
  private client: Pool

  async connect (): Promise<void> {
    switch (process.env.MODE) {
      case 'production':
        this.client = createPool({
          host: process.env.HOST,
          port: 3306,
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
          waitForConnections: true
        })
        break
      default:
        this.client = createPool({
          host: '0.0.0.0',
          port: 3306,
          user: 'root',
          password: '16503323',
          database: 'Development',
          waitForConnections: true
        })
        break
    }
  }

  async disconnect (): Promise<void> {
    switch (process.env.MODE) {
      case 'production':
        await this.client.end()
        break
      default:
        await this.client.end()
        break
    }
  }

  async insertOne (sql: string, args?: Array<any>) {
    switch (process.env.MODE) {
      case 'production':
        const row = await this.client.query(sql, args)
        return row
      default:
        const rowDev = await this.client.query(sql, args)
        return rowDev
    }
  }

  async selectOne (sql: string, args?: Array<any>) {
    switch (process.env.MODE) {
      case 'production':
        const row = await this.client.query(sql, args)
        return row[0][0]
      default:
        const rowDev = await this.client.query(sql, args)
        return rowDev[0][0]
    }
  }

  async selectAll (sql: string, args?: Array<any>) {
    switch (process.env.MODE) {
      case 'production':
        const row = await this.client.query(sql, args)
        return row[0]
      default:
        const rowDev = await this.client.query(sql, args)
        return rowDev[0]
    }
  }

  async delete (sql: string): Promise<void> {
    switch (process.env.MODE) {
      case 'production':
        await this.client.query(sql)
        break
      default:
        await this.client.query(sql)
        break
    }
  }
}

export const SqlHelper = new SqlConnection()
