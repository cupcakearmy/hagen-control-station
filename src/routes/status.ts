import { DB } from '../db.js'
import { Bot } from '../index.js'
import { format, getLatest } from '../utils.js'

export function getLatests() {
  const fed = getLatest(DB.data?.feeding || [])
  const clean = getLatest(DB.data?.cleaning || [])
  return { fed, clean }
}

export function init(bot: Bot) {
  bot.command('status', (ctx) => {
    ctx.deleteMessage()
    const { fed, clean } = getLatests()
    let msg = ''
    msg += '**🥜 Fed**\n'
    msg += fed ? `${format(fed.timestamp)} by ${fed.by}` : '🥲 Never'
    msg += '\n\n**🛁 Cleaned**\n'
    msg += clean ? `${format(clean.timestamp)} by ${clean.by}` : '🥲 Never'
    ctx.replyWithMarkdownV2(msg)
  })
}
