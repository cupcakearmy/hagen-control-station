import { Markup } from 'telegraf'
import type { Bot } from '..'
import { DB } from '../db.js'
import { disappearingMessage } from '../utils.js'

enum LogCommands {
  Fed = 'log:fed',
  Clean = 'log:clean',
  Cancel = 'log:cancel',
}

export async function init(bot: Bot) {
  bot.command('log', (ctx) => {
    ctx.deleteMessage()
    const buttons = Markup.inlineKeyboard([
      [Markup.button.callback('🥜 Fed', LogCommands.Fed)],
      [Markup.button.callback('🛁 Cleaned', LogCommands.Clean)],
      [Markup.button.callback('❌ Cancel', LogCommands.Cancel)],
    ])
    ctx.replyWithMarkdownV2('What do you want to log?', { reply_markup: buttons.reply_markup })
  })

  bot.action(LogCommands.Clean, (ctx) => {
    ctx.deleteMessage()
    DB.data?.cleaning.push({
      timestamp: Date.now(),
      by: ctx.user.username,
    })
    DB.write()
    disappearingMessage(ctx, 'Saved')
  })

  bot.action(LogCommands.Fed, (ctx) => {
    ctx.deleteMessage()
    DB.data?.feeding.push({
      timestamp: Date.now(),
      by: ctx.user.username,
    })
    DB.write()
    disappearingMessage(ctx, 'Saved')
  })

  bot.action(LogCommands.Cancel, (ctx) => {
    ctx.deleteMessage()
    disappearingMessage(ctx, 'Cancelled')
  })
}
