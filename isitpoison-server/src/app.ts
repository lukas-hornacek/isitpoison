import express from 'express'
import path from 'path'

import { canteen_router } from './routers/canteen_router.js'

const app = express()
const port = 3000

app.use(express.static(path.join(import.meta.dirname, '..', '..', 'isitpoison-client', 'dist')))

app.use('/canteen', canteen_router)

app.listen(port, () => {
  console.log(`IsItPoison? listening on port ${port}`)
})