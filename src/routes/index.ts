import { Bot } from '..'
import { init as initAuth } from './auth.js'
import { init as initLog } from './log.js'
import { init as initStatus } from './status.js'
import { init as initVersion } from './version.js'

export function init(bot: Bot) {
  initAuth(bot)
  initLog(bot)
  initStatus(bot)
  initVersion(bot)
}
