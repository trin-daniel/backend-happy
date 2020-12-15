import { createConnection, Connection } from 'mysql2/promise'

class SqlConnection {
  private client: Connection

  async connect (): Promise<void> {
    this.client = await createConnection({
      host: process.env.HOST || '0.0.0.0',
      port: 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '16503323',
      database: process.env.MYSQL_DATABASE || 'Development',
      waitForConnections: true
    })
  }

  async disconnect (): Promise<void> {
    await this.client.end()
    this.client = null
  }

  async isConnected () {
    !this.client && await this.connect()
  }

  async insertOne (sql: string, args?: Array<any>) {
    await this.isConnected()
    await this.client.query(sql, args)
  }

  async selectOne (sql: string, args?: Array<any>) {
    await this.isConnected()
    const [row] = await this.client.query(sql, args)
    return row[0]
  }

  async selectAll (sql: string, args?: Array<any>) {
    await this.isConnected()
    const [row] = await this.client.query(sql, args)
    return row
  }

  async delete (sql: string): Promise<void> {
    await this.isConnected()
    await this.client.query(sql)
  }
}

export const SqlHelper = new SqlConnection()
