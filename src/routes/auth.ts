import type { Bot } from '..'
import { DB } from '../db.js'
import { Logger } from '../logger.js'
import { messages } from '../messages.js'

export function init(bot: Bot) {
  bot.on('my_chat_member', (ctx) => {
    if (ctx.myChatMember.new_chat_member.status === 'kicked' || ctx.myChatMember.new_chat_member.status === 'left') {
      Logger.info(`User ${ctx.user.username} left chat`)
      if (DB.data?.users) {
        DB.data.users = DB.data.users.filter((u) => u.username !== ctx.user.username)
        DB.write()
      }
    }
  })

  bot.start((ctx) => {
    if (!ctx.from.username) throw new Error('No username')
    ctx.reply(messages.welcome)
    ctx.reply(messages.requestAccess)
  })
}
