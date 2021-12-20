import { Bot } from '..'

export const Version = process.env['npm_package_version']

export function init(bot: Bot) {
  bot.command('/version', async (ctx) => {
    // ctx.reply('Version: ' + version)
    ctx.reply(`Version: ${Version}`)
  })
}
