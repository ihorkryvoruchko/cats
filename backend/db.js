import { readFile, writeFile, access, mkdir } from 'node:fs/promises'
import { constants } from 'node:fs'

const PATH = './data/members.json'

export async function checkIfDataAvailable(){
    try {
        await access(PATH, constants.F_OK)
    } catch(error) {
        if (error.code === "ENOENT") {
            await createNewDatabase()
        } else {
            console.error(error)
        }
    }
}

async function createNewDatabase() {
    await mkdir('./data', { recursive: true })
    await writeFile(PATH, JSON.stringify([], null, 2))
}

export async function getAllMembers() {
    const members = await readFile(PATH, 'utf-8')
    
    return JSON.parse(members)
}

export async function createNewMember(member) {
    const members = await getAllMembers()
    const cat = member
    cat.id = Date.now()
    cat.avatarUrl = `https://robohash.org/${cat.name}.png?set=set4`
    cat.status = "active"
    members.push(cat)
    writeFile("./data/members.json", JSON.stringify(members, null, 2), "utf-8")

    return cat
}
