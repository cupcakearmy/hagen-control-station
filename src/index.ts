import { Context, Telegraf } from 'telegraf'
import { Config } from './config.js'
import { init as initCron } from './cron.js'
import { init as initDB, User } from './db.js'
import { Logger } from './logger.js'
import { init as initMiddleware } from './middleware.js'
import { init as initRoutes } from './routes/index.js'
import { Version } from './routes/version.js'

export interface HCSContext extends Context {
  user: User
  authenticated: boolean
}

export const bot = new Telegraf<HCSContext>(Config.token)
export type Bot = typeof bot

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

async function init() {
  await initDB()
  initMiddleware(bot)
  initRoutes(bot)
  initCron()

  await bot.launch()
  Logger.info('Bot started')
  Logger.info(`Version: ${Version}`)
}
init()
