import express from 'express'
import cors from 'cors'
import db from './data/members.json' with {type: "json"}
import {writeFile} from 'fs/promises'

const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/members', (req, res) => {
    res.json(db)
})

app.post('/api/members', (req, res) => {
    const cat = req.body
    cat.id = Date.now()
    cat.avatarUrl = `https://robohash.org/${cat.name}.png?set=set4`
    cat.status = "active"
    db.push(cat)
    writeFile("./data/members.json", JSON.stringify(db, null, 2), "utf-8")
    res.json(cat)
})

app.listen(PORT, () => {
    console.log("der Server löuft auf " + PORT)
})