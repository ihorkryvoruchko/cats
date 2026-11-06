import express from 'express'
import cors from 'cors'
import { clanRouter } from './src/router/clan.router.js'
import { catRouter } from './src/router/cat.router.js'
import { districtRouter } from './src/router/district.router.js'
import { rankRouter } from './src/router/rank.router.js'
import { fightRouter } from './src/router/fight.router.js'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(clanRouter)
app.use(catRouter)
app.use(districtRouter)
app.use(rankRouter)
app.use(fightRouter)

app.listen(PORT, () => {
    console.log("der Server läuft auf " + PORT)
})