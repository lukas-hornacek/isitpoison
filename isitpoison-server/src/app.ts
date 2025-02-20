import express from 'express'
import path from 'path'

const app = express()
const port = 3000

app.use(express.static(path.join(import.meta.dirname, '..', '..', 'isitpoison-client', 'dist')))

app.listen(port, () => {
  console.log(`IsItPoison? listening on port ${port}`)
})