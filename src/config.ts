import dotenv from 'dotenv'
import { Logger } from './logger.js'

dotenv.config()

const token = process.env['BOT_TOKEN']
if (!token) {
  Logger.error('No token found')
  process.exit(1)
}

const password = process.env['HCS_PASSWORD']
if (!password) {
  Logger.error('No password found')
  process.exit(1)
}

export const Config = {
  token,
  password,
}
