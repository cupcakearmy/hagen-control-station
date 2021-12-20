import { mkdir } from 'fs/promises'
import { Low, JSONFile } from 'lowdb'
import { join, resolve } from 'path'

const dataDir = resolve('./data')

export type Feeding = {
  timestamp: number
  by: string
}

export type Cleaning = {
  timestamp: number
  by: string
}

export type User = {
  username: string
  id: number
}

export type Data = {
  feeding: Feeding[]
  cleaning: Cleaning[]
  users: User[]
}

export const DB = new Low<Data>(new JSONFile(join(dataDir, 'db.json')))

export async function init() {
  await mkdir(dataDir, { recursive: true })
  await DB.read()
  DB.data ||= {
    cleaning: [],
    feeding: [],
    users: [],
  }
}
