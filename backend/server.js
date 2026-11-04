import express from 'express'
import cors from 'cors'
import { clanRouter } from './src/router/clan.router.js'
import { catRouter } from './src/router/cat.router.js'
import { districtRouter } from './src/router/district.router.js'

const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(clanRouter)
app.use(catRouter)
app.use(districtRouter)

app.listen(PORT, () => {
    console.log("der Server läuft auf " + PORT)
})