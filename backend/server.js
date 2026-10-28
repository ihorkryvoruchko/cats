import express from 'express'
import cors from 'cors'
import {checkIfDataAvailable, getAllMembers, createNewMember} from './db.js'

checkIfDataAvailable()

const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/members', async (req, res) => {
    const members = await getAllMembers()
    
    res.json(members)
})

app.post('/api/members', async (req, res) => {
    const cat = await createNewMember(req.body)

    res.json(cat)
})

app.listen(PORT, () => {
    console.log("der Server läuft auf " + PORT)
})