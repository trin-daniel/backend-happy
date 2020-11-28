import { SqlHelper } from '@infra/database/helpers/sql-helper'

SqlHelper.connect().then(async () => {
  const app = (await import('./config/app')).default
  app.listen(process.env.PORT || 3333, () => console.error(`Server running at http://localhost:${process.env.PORT || 3333}`))
}).catch(console.error)
