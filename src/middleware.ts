import ms from 'ms'
import { Bot } from '.'
import { Config } from './config.js'
import { DB } from './db.js'
import { Logger } from './logger.js'
import { messages } from './messages.js'

export function init(bot: Bot) {
  // Logger
  bot.use(async (ctx, next) => {
    const now = Date.now()
    await next()
    const elapsed = Date.now() - now
    Logger.info(`Processed: ${ctx.updateType} (${ms(elapsed)})`)
  })

  // Auth
  bot.use(async (ctx, next) => {
    ctx.authenticated = false
    const username = ctx.chat && ctx.chat.type === 'private' && ctx.chat.username
    if (!username) {
      ctx.reply('No username')
      return
    }

    const user = DB.data?.users.find((u) => u.username === username)
    if (user) {
      ctx.authenticated = true
      ctx.user = user
    } else {
      const message = (ctx.updateType === 'message' && 'text' in ctx.message! && ctx.message.text) || ''
      switch (message.toLowerCase().trim()) {
        case '/start':
        case '/help':
          break
        case Config.password:
          const user = {
            username,
            id: ctx.chat.id,
          }
          DB.data?.users.push(user)
          DB.write()
          ctx.authenticated = true
          ctx.user = user
          ctx.deleteMessage()
          ctx.reply(messages.gainedAccess)
          break
        default:
          if (ctx.updateType === 'message') ctx.reply(messages.invalidPassword)
          return
      }
    }

    await next()
  })
}
